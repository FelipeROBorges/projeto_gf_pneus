import React, { useState, useEffect } from "react";
import { Menu, Sidebar, MenuItem, SubMenu } from "react-pro-sidebar";
import { useProSidebar } from "react-pro-sidebar";
import { useSidebarContext } from "./sidebarContext";
import * as SideBarProps from "./sidebarProps";
import { Link } from "react-router-dom";
import { tokens } from "../../../theme";
import { useTheme, Box, Typography, IconButton } from "@mui/material";
import ProfileImage from "../../../assets/imagesdoperfil.png";
import {
  HomeOutlined as HomeOutlinedIcon,
  AdminPanelSettings as AdminPanelSettingsIcon,
  MenuOutlined as MenuOutlinedIcon,
  CarRepair as CarRepairIcon,
  Commute as CommuteIcon,
} from "@mui/icons-material";

import useAuth from "../../../hooks/useAuth";

const SidebarItem = ({ title, to, icon, selected, setSelected, key }) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  return (
    <MenuItem
      key={key}
      active={selected === title}
      style={{ color: colors.white[500], paddingLeft: "35px" }}
      onClick={() => setSelected(title)}
      icon={icon}
      routerLink={<Link to={to} />}
    >
      <Typography>{title}</Typography>
    </MenuItem>
  );
};

const MyProSidebar = ({ collapsed_prop, setCollapsed_prop }) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [selected, setSelected] = useState("Dashboard");
  const { sidebarRTL, sidebarImage } = useSidebarContext();
  const { collapseSidebar, toggleSidebar, collapsed, broken } = useProSidebar();

  const generateSidebarItems = (items) => {
    return items.map((item, index) => (
      <SidebarItem
        key={`${index}_${item.path.substring(1)}`}
        title={item.title}
        to={item.path}
        icon={item.icon}
        selected={selected}
        setSelected={setSelected}
      />
    ));
  };

  useEffect(() => {
    setCollapsed_prop(collapsed);
  }, [collapsed, setCollapsed_prop]);

  const { signed, user } = useAuth();
  if (!(signed > 0)) return null;

  const modulo_adm = user.acessos.find(
    (acesso) => acesso.modulo.sigla === "adm"
  );
  const modulo_dp = user.acessos.find((acesso) => acesso.modulo.sigla === "dp");
  const modulo_mpf = user.acessos.find(
    (acesso) => acesso.modulo.sigla === "mpf"
  );
  const modulo_crs = user.acessos.find(
    (acesso) => acesso.modulo.sigla === "crs"
  );
  const modulo_gfp = user.acessos.find(
    (acesso) => acesso.modulo.sigla === "gfp"
  );

  return (
    <Box
      sx={{
        position: "sticky",
        display: "flex",
        height: "100vh",
        top: 0,
        bottom: 0,
        zIndex: 10000,
        "& .sidebar": {
          border: "none",
          color: colors.grey[200],
        },
        boxShadow: "2px 0 10px rgba(0, 0, 0, 0.3)",
        "& .menu-icon": {
          color: "#FDA503",
          backgroundColor: `${colors.black[600]} !important`,
          borderRadius: "8px",
          border: `1px solid ${colors.grey[700]}`,
        },
        "& .menu-item": {
          backgroundColor: "transparent !important",
        },
        "& .menu-anchor": {
          color: "inherit !important",
          backgroundColor: `${colors.black[600]} !important`,
        },

        "& .menu-item:hover": {
          backgroundColor: "transparent !important",
        },
        "& .sub-menu:hover": {
          backgroundColor: "transparent !important",
        },
        "& .menu-item.active": {
          color: "#FDA503 !important",
          backgroundColor: "transparent !important",
        },
      }}
    >
      <Sidebar
        breakPoint="md"
        rtl={sidebarRTL}
        backgroundColor={`${colors.black[600]} !important`}
        image={sidebarImage}
      >
        <Menu iconshape="square">
          <MenuItem
            onClick={collapsed ? () => collapseSidebar() : undefined}
            icon={collapsed ? <MenuOutlinedIcon /> : undefined}
            style={{
              margin: "10px 0 20px 0",
              color: colors.white[100],
            }}
          >
            {!collapsed && (
              <Box
                display="flex"
                justifyContent="space-between"
                alignItems="center"
                ml="15px"
              >
                <Typography variant="h4">GF PNEUS</Typography>
                <IconButton
                  onClick={
                    broken ? () => toggleSidebar() : () => collapseSidebar()
                  }
                >
                  <MenuOutlinedIcon />
                </IconButton>
              </Box>
            )}
          </MenuItem>
          {!collapsed && (
            <Box mb="25px">
              <Box
                display="flex"
                justifyContent="center"
                alignItems="center"
                sx={{
                  "& .avater-image": {
                    backgroundColor: colors.primary[500],
                  },
                }}
              >
                <img
                  alt="profile-user"
                  width="100px"
                  height="100px"
                  src={ProfileImage}
                  style={{ cursor: "pointer", borderRadius: "50%" }}
                />
              </Box>
              <Box textAlign="center">
                <Typography
                  variant="h2"
                  color={colors.grey[200]}
                  fontWeight="bold"
                  sx={{ m: "20px 0 0 0" }}
                >
                  {user.nome}
                </Typography>
                <Typography variant="h5" color={colors.grey[200]}>
                  GF PNEUS
                </Typography>
              </Box>
            </Box>
          )}
          <Box>
            <SubMenu
              icon={<HomeOutlinedIcon />}
              label={collapsed ? null : "Dashboards"}
            >
              {generateSidebarItems(SideBarProps.dashbords)}
            </SubMenu>
            {modulo_adm && modulo_adm.visualizar && (
              <SubMenu
                icon={<AdminPanelSettingsIcon />}
                label={collapsed ? null : "Admin"}
              >
                {generateSidebarItems(SideBarProps.admin)}
              </SubMenu>
            )}
            {modulo_gfp && modulo_gfp.visualizar && (
              <SubMenu
                icon={<CarRepairIcon />}
                label={collapsed ? null : "Ordens de Serviço"}
              >
                {generateSidebarItems(SideBarProps.gestao_frota)}
              </SubMenu>
            )}
          </Box>
        </Menu>
      </Sidebar>
    </Box>
  );
};

export default MyProSidebar;
