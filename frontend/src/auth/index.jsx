import { createContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export const AuthContext = createContext({});

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();
  const userToken = JSON.parse(localStorage.getItem("user_token"));

  useEffect(() => {
    const loadUser = async () => {
      if (userToken && !user) {
        try {
          const response = await axios.post(
            `${import.meta.env.VITE_BACKEND_URL}/usuario/signin`,
            {
              email: userToken.email,
              token: userToken.token,
            }
          );
          response.data.acessos.push({
            alterar: true,
            deletar: true,
            cadastrar: true,
            visualizar: true,
            modulo: { sigla: "public" },
          });
          setUser(response.data);
        } catch (error) {
          console.error(error);
          localStorage.setItem("user_token", null);
          navigate("/404");
        }
      }
    };

    loadUser();
  }, [user, userToken, navigate]);

  const signin = async (email, password) => {
    const usersValidation = await axios.post(
      `${import.meta.env.VITE_BACKEND_URL}/usuario/signin`,
      {
        email: email,
        senha: password,
      }
    );

    const result = { status: false, primeiro_acesso: false };

    if (usersValidation.data.primeiro_acesso) {
      navigate(`/login/alterar_senha/${usersValidation.data.token}`);
      result.primeiro_acesso = true;
      return result;
    }

    if (usersValidation.data.error) return result;

    const token = usersValidation.data.token;

    localStorage.setItem("user_token", JSON.stringify({ email, token }));
    setUser(usersValidation.data);
    result.status = true;
    return result;
  };

  const signout = () => {
    setUser(null);
    localStorage.removeItem("user_token");
    navigate("/");
  };

  if (!user && userToken) {
    return null;
  }

  return (
    <AuthContext.Provider value={{ user, signed: !!user, signin, signout }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
