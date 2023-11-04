import { toast } from "react-toastify";
import { Box, Button, TextField, useTheme } from "@mui/material";
import { Formik } from "formik";
import * as yup from "yup";
import Paper from "@mui/material/Paper";
import { useNavigate } from "react-router-dom";
import useAuth from "../../hooks/useAuth";
import Grid from "@mui/material/Grid";
import { tokens } from "../../theme";
import Header from "../../components/Header";
import BackGroudImage from "../../assets/tela_login.jpeg";

function Login() {
  const { signin } = useAuth();
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const navigate = useNavigate();

  const handleFormSubmit = async (values) => {
    try {
      const result = await signin(values.username, values.password);

      if (result.status) {
        navigate("/home");
      } else {
        if (!result.primeiro_acesso)
          toast.error("Credenciais incorretas. Verifique seu e-mail e senha.");
      }
    } catch (error) {
      toast.error(
        "Falha na comunicação. Por favor, tente novamente mais tarde."
      );
    }
  };

  return (
    <Grid container component="main" sx={{ height: "100vh" }}>
      <Grid
        item
        xs={false}
        sm={4}
        md={7}
        sx={{
          position: "relative",
          backgroundImage: `url(${BackGroudImage})`,
          backgroundRepeat: "no-repeat",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      ></Grid>

      <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
        <Box
          sx={{
            my: 30,
            mx: 4,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            marginTop: "280px",
          }}
        >
          <Header title="LOGIN" style={{ textAlign: "center" }} />

          <Formik
            onSubmit={handleFormSubmit}
            initialValues={initialValues}
            validationSchema={checkoutSchema}
          >
            {({
              values,
              errors,
              touched,
              handleBlur,
              handleChange,
              handleSubmit,
            }) => (
              <form onSubmit={handleSubmit}>
                <TextField
                  fullWidth
                  type="text"
                  label="Digite seu E-mail"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.username}
                  name="username"
                  error={!!touched.username && !!errors.username}
                  helperText={touched.username && errors.username}
                  sx={{
                    mt: 1,
                    mb: 2,
                    gridColumn: "span 4",
                    marginBottom: "15px",
                    borderRadius: "5px",
                  }}
                  autoComplete="current-username"
                  InputLabelProps={{
                    shrink: true,
                  }}
                />
                <TextField
                  fullWidth
                  type="password"
                  label="Digite sua Senha"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.password}
                  name="password"
                  error={!!touched.password && !!errors.password}
                  helperText={touched.password && errors.password}
                  sx={{
                    gridColumn: "span 4",
                    borderRadius: "5px",
                  }}
                  autoComplete="current-password"
                  InputLabelProps={{
                    shrink: true,
                  }}
                />
                <Box display="flex" justifyContent="end" mt="20px">
                  <Button
                    type="submit"
                    fullWidth
                    variant="contained"
                    sx={{
                      mt: 3,
                      mb: 2,
                      backgroundColor: "#FDA503",
                    }}
                  >
                    ENTRAR
                  </Button>
                </Box>
              </form>
            )}
          </Formik>
        </Box>
      </Grid>
    </Grid>
  );
}

const checkoutSchema = yup.object().shape({
  username: yup.string().email("Email invalido!").required("Obrigatório!"),
  password: yup.string().required("Obrigatório!"),
});

const initialValues = {
  username: "",
  password: "",
};

export default Login;
