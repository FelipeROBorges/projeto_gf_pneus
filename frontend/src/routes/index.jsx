import React from "react";
import { Routes, Route } from "react-router-dom";
import Login from "../scenes/login";
import useAuth from "../hooks/useAuth";
import TopbarWrapper from "../scenes/global/TopbarWrapper";
import { MyProSidebarProvider } from "../scenes/global/sidebar/sidebarContext";
import DashbordServidor from "../scenes/dashboards/dashbord_ordem_servico";
import * as RoutesConfig from "./routesConfig.jsx";
import PageNotFound from "../components/PageNotFound";
import "react-toastify/dist/ReactToastify.css";

const Private = ({ Item, admin }) => {
  const { signed, user } = useAuth();
  if (signed > 0)
    if (admin) return user.perfil == "admin" ? <Item /> : <DashbordServidor />;
    else return <Item />;
  else return <Login />;
};

function RoutesApp() {
  const [collapsed_prop, setCollapsed_prop] = React.useState(false);

  return (
    <>
      <MyProSidebarProvider
        collapsed_prop={collapsed_prop}
        setCollapsed_prop={setCollapsed_prop}
      >
        <div className="app">
          <main className="content">
            <TopbarWrapper />
            <Routes>
              {RoutesConfig.generateRoutes(
                RoutesConfig.routesConfig,
                collapsed_prop
              )}
              <Route path="/home" element={<DashbordServidor />} />
              <Route
                path="/"
                element={<Private Item={DashbordServidor} admin={false} />}
              />
              <Route path="*" element={<PageNotFound />} />
            </Routes>
          </main>
        </div>
      </MyProSidebarProvider>
    </>
  );
}

export default RoutesApp;
