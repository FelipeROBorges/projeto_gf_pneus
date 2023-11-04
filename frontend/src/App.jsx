import RoutesApp from "./routes";
import { CssBaseline, ThemeProvider } from "@mui/material";
import { ColorModeContext, useMode } from "./theme";
import AuthProvider from "./auth";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import ptLocale from "date-fns/locale/pt";
import { ToastContainer } from "react-toastify";

function App() {
  const [theme, colorMode] = useMode();
  const theme_browser = JSON.parse(localStorage.getItem("theme"));

  return (
    <LocalizationProvider dateAdapter={AdapterDateFns} adapterLocale={ptLocale}>
      <ToastContainer
        position="bottom-right"
        autoClose={3000}
        limit={5}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme={theme_browser}
      />
      <AuthProvider>
        <ColorModeContext.Provider value={colorMode}>
          <ThemeProvider theme={theme}>
            <CssBaseline />
            <RoutesApp />
          </ThemeProvider>
        </ColorModeContext.Provider>
      </AuthProvider>
    </LocalizationProvider>
  );
}

export default App;
