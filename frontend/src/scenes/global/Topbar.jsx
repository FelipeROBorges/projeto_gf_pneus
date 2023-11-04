import React, { useState, useEffect, useContext } from "react";
import { Box, Button, IconButton, Tooltip, useTheme } from "@mui/material";
import ArrowBackIosRoundedIcon from "@mui/icons-material/ArrowBackIosRounded";
import {
  LightModeOutlined as LightModeOutlinedIcon,
  DarkModeOutlined as DarkModeOutlinedIcon,
  AccessTime as AccessTimeIcon,
  Logout as LogoutIcon,
} from "@mui/icons-material";
import useAuth from "../../hooks/useAuth";
import Countdown from "../../components/CountDown";
import { ColorModeContext, tokens } from "../../theme";
import { useLocation } from "react-router-dom";
import { useNavigate } from "react-router-dom";

const Topbar = () => {
  const { signout } = useAuth();
  const theme = useTheme();
  const [logout, setLogout] = useState(false);
  const location = useLocation();
  JSON.parse(localStorage.getItem("user_token")).token;
  const navigate = useNavigate();
  const isDashboardRoute =
    location.pathname.toLowerCase().includes("dashboard") ||
    location.pathname.toLowerCase().includes("home");

  useEffect(() => {
    if (logout) {
      signout();
      setLogout(false);
    }
  }, [logout, signout]);

  const handleSignout = () => {
    setLogout(true);
  };

  const colors = tokens(theme.palette.mode);
  const colorMode = useContext(ColorModeContext);

  return (
    <Box
      display="flex"
      justifyContent="space-between"
      p={2}
      sx={{
        backgroundColor: "#FDA503",
        padding: "10px 20px",
        boxShadow: "0px 3px 5px rgba(0, 0, 0, 0.25)",
      }}
    >
      {!isDashboardRoute && (
        <Box display="flex" borderRadius="3px">
          <Button
            sx={{
              backgroundColor: "#FFFFFF",
              color: colors.black[500],
              fontWeight: "bold",
              padding: "10px 20px",
              "&:hover": {
                backgroundColor: colors.grey[300],
              },
            }}
            onClick={() => window.history.back()}
            variant="contained"
            startIcon={<ArrowBackIosRoundedIcon />}
          >
            Voltar
          </Button>
        </Box>
      )}
      <Box marginLeft="auto">
        <Tooltip title={"Tempo de Sessão"}>
          <IconButton
            sx={{
              color: colors.white[500],
            }}
          >
            <AccessTimeIcon style={{ margin: "0px 3px 0px 0px" }} />
            <Countdown />
          </IconButton>
        </Tooltip>
        <Tooltip
          sx={{
            color: colors.white[500],
          }}
          title={theme.palette.mode === "dark" ? "Modo Claro" : "Modo Escuro"}
        >
          <IconButton onClick={colorMode.toggleColorMode}>
            {theme.palette.mode === "dark" ? (
              <DarkModeOutlinedIcon />
            ) : (
              <LightModeOutlinedIcon />
            )}
          </IconButton>
        </Tooltip>
        <Tooltip
          title="Sair"
          sx={{
            color: colors.white[500],
          }}
        >
          <IconButton onClick={handleSignout}>
            <LogoutIcon />
          </IconButton>
        </Tooltip>
      </Box>
    </Box>
  );
};

export default Topbar;
