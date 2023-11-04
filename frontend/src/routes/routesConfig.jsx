import * as React from "react";
import { Route } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import Login from "../scenes/login";
import Cadastrar from "../components/crud/Cadastrar";
import Alterar from "../components/crud/Alterar";
import Visualizar from "../components/crud/Visualizar";
import Index from "../components/crud/Index";
import DashbordServidor from "../scenes/dashboards/dashbord_ordem_servico";
import HigherOrderComponent from "../components/HigherOrderComponent";
import * as Acesso from "../scenes/administrativo/acesso";
import * as Perfil from "../scenes/administrativo/perfil";
import * as Usuario from "../scenes/administrativo/usuario";
import * as Modulo from "../scenes/administrativo/modulo";
import * as Operacao from "../scenes/administrativo/operacoes";
import * as Servico from "../scenes/gf_pneus/servico";
import * as OrdemServico from "../scenes/gf_pneus/ordem_servico";
import * as OrdemServicoAConcluir from "../scenes/gf_pneus/ordem_servico_aconcluir";

export const routesConfig = [
  {
    path: "/perfil",
    props: Perfil,
  },
  {
    path: "/usuario",
    props: Usuario,
  },

  {
    path: "/acesso",
    props: Acesso,
  },
  {
    path: "/servico",
    props: Servico,
  },
  {
    path: "/ordem_servico",
    props: OrdemServico,
  },
];

export const ComponentPrivate = ({ Item, type }) => {
  const { signed, user } = useAuth();

  if (signed > 0) {
    const access = user.acessos.find(
      (acesso) => acesso.modulo.sigla === Item.props.props.module
    );
    if (access) {
      return access[type] ? renderContent() : <DashbordServidor />;
    } else {
      return <DashbordServidor />;
    }
  } else {
    return <Login />;
  }

  function renderContent() {
    if (typeof Item === "function") {
      return <Item />;
    } else {
      return Item;
    }
  }
};

export const staticRoutes = (collapsed_prop) => [
  <Route
    key={1 + "_modulo"}
    path="/modulo"
    element={
      <ComponentPrivate
        Item={
          <HigherOrderComponent
            Component={Index}
            props={{ ...Modulo.indexProps, collapsed_prop }}
          />
        }
        type={"visualizar"}
      />
    }
  />,
  <Route
    key={1 + "_ordem_servico_aconcluir"}
    path="/ordem_servico_aconcluir"
    element={
      <ComponentPrivate
        Item={
          <HigherOrderComponent
            Component={Index}
            props={{ ...OrdemServicoAConcluir.indexProps, collapsed_prop }}
          />
        }
        type={"visualizar"}
      />
    }
  />,
  <Route
    key={1 + "operacao"}
    path="/operacao"
    element={
      <ComponentPrivate
        Item={
          <HigherOrderComponent
            Component={Index}
            props={{ ...Operacao.indexProps, collapsed_prop }}
          />
        }
        type={"visualizar"}
      />
    }
  />,
];

export const generateRoutes = (routesConfig, collapsed_prop) => (
  <React.Fragment>
    {routesConfig.map((route, index) => (
      <React.Fragment key={index + "_" + route.path}>
        <Route
          key={index + "_index"}
          path={"/" + route.path}
          element={
            <ComponentPrivate
              Item={
                <HigherOrderComponent
                  Component={Index}
                  props={{ ...route.props.indexProps, collapsed_prop }}
                />
              }
              type={"visualizar"}
            />
          }
        />
        <Route
          key={index + "_cadastrar"}
          path={"/" + route.path + "/cadastrar"}
          element={
            <ComponentPrivate
              Item={
                <HigherOrderComponent
                  Component={Cadastrar}
                  props={route.props.cadastrarProps}
                />
              }
              admin={true}
              type={"cadastrar"}
            />
          }
        />
        <Route
          key={index + "_alterar"}
          path={"/" + route.path + "/alterar/:id"}
          element={
            <ComponentPrivate
              Item={
                <HigherOrderComponent
                  Component={Alterar}
                  props={route.props.alterarProps}
                />
              }
              admin={true}
              type={"alterar"}
            />
          }
        />
        <Route
          key={index + "_visualizar"}
          path={"/" + route.path + "/visualizar/:id"}
          element={
            <ComponentPrivate
              Item={
                <HigherOrderComponent
                  Component={Visualizar}
                  props={route.props.visualizarProps}
                />
              }
              admin={true}
              type={"visualizar"}
            />
          }
        />
      </React.Fragment>
    ))}
    {staticRoutes(collapsed_prop)}
  </React.Fragment>
);

export default {
  routesConfig,
  generateRoutes,
};
