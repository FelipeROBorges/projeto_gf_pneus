import { createContext, useState, useMemo } from "react";
import { createTheme } from "@mui/material/styles";

const defaultMode = "dark";

// Cores exportadas para aplicação
export const tokens = (mode) => ({
  ...(mode === "dark"
    ? {
        grey: {
          100: "#FFFFFF",
          200: "#EEEEEE",
          300: "#E0E0E0",
          400: "#BDBDBD",
          500: "#9E9E9E",
          600: "#757575",
          700: "#616161",
          800: "#424242",
          900: "#212121",
        },
        black: {
          100: "#d7d7d7",
          200: "#afafb0",
          300: "#878788",
          400: "#5f5f61",
          500: "#373739",
          600: "#2c2c2e",
          700: "#212122",
          800: "#161617",
          900: "#0b0b0b",
        },
        primary: {
          100: "#e0cdcc",
          200: "#c29a99",
          300: "#a36866",
          400: "#853533",
          500: "#660300",
          600: "#520200",
          700: "#3d0200",
          800: "#290100",
          900: "#140100",
        },
        yellow: {
          100: "#fff7ec",
          200: "#feefd9",
          300: "#fee8c7",
          400: "#fde0b4",
          500: "#fdd8a1",
          600: "#caad81",
          700: "#988261",
          800: "#655640",
          900: "#332b20",
        },

        indigo: {
          100: "#dfe2e5",
          200: "#c0c5cb",
          300: "#a0a8b0",
          400: "#818b96",
          500: "#616e7c",
          600: "#4e5863",
          700: "#3a424a",
          800: "#272c32",
          900: "#131619",
        },

        greenAccent: {
          100: "#dbefdc",
          200: "#b7dfb9",
          300: "#94cf96",
          400: "#70bf73",
          500: "#4caf50",
          600: "#3d8c40",
          700: "#2e6930",
          800: "#1e4620",
          900: "#0f2310",
        },
        redAccent: {
          100: "#f1d1d0",
          200: "#e3a2a2",
          300: "#d57473",
          400: "#c74545",
          500: "#b91716",
          600: "#941212",
          700: "#6f0e0d",
          800: "#4a0909",
          900: "#250504",
        },

        red: {
          100: "#fad0d0",
          200: "#f5a2a1",
          300: "#f17373",
          400: "#ec4544",
          500: "#e71615",
          600: "#b91211",
          700: "#8b0d0d",
          800: "#5c0908",
          900: "#2e0404",
        },
        blueAccent: {
          100: "#d1e1ee",
          200: "#a2c3dd",
          300: "#74a5cc",
          400: "#4587bb",
          500: "#1769aa",
          600: "#125488",
          700: "#0e3f66",
          800: "#092a44",
          900: "#051522",
        },
        white: {
          100: "#ffffff",
          200: "#ffffff",
          300: "#ffffff",
          400: "#ffffff",
          500: "#ffffff",
          600: "#cccccc",
          700: "#999999",
          800: "#666666",
          900: "#333333",
        },
      }
    : {
        grey: {
          100: "#212121",
          200: "#424242",
          300: "#616161",
          400: "#757575",
          500: "#9E9E9E",
          600: "#BDBDBD",
          700: "#E0E0E0",
          800: "#EEEEEE",
          900: "#F5F5F5",
        },
        black: {
          100: "#0b0b0b",
          200: "#161617",
          300: "#212122",
          400: "#2c2c2e",
          500: "#373739",
          600: "#ffffff",
          700: "#878788",
          800: "#afafb0",
          900: "#d7d7d7",
        },
        primary: {
          100: "#140100",
          200: "#290100",
          300: "#3d0200",
          400: "#520200",
          500: "#660300",
          600: "#853533",
          700: "#a36866",
          800: "#c29a99",
          900: "#e0cdcc",
        },

        red: {
          100: "#2e0404",
          200: "#5c0908",
          300: "#8b0d0d",
          400: "#b91211",
          500: "#e71615",
          600: "#ec4544",
          700: "#f17373",
          800: "#f5a2a1",
          900: "#fad0d0",
        },
        yellow: {
          100: "#332b20",
          200: "#655640",
          300: "#988261",
          400: "#caad81",
          500: "#fdd8a1",
          600: "#fde0b4",
          700: "#fee8c7",
          800: "#feefd9",
          900: "#fff7ec",
        },
        indigo: {
          100: "#131619",
          200: "#272c32",
          300: "#3a424a",
          400: "#4e5863",
          500: "#616e7c",
          600: "#818b96",
          700: "#a0a8b0",
          800: "#c0c5cb",
          900: "#dfe2e5",
        },
        greenAccent: {
          100: "#0f2310",
          200: "#1e4620",
          300: "#2e6930",
          400: "#3d8c40",
          500: "#4caf50",
          600: "#70bf73",
          700: "#94cf96",
          800: "#b7dfb9",
          900: "#dbefdc",
        },
        redAccent: {
          100: "#f1d1d0",
          200: "#e3a2a2",
          300: "#d57473",
          400: "#c74545",
          500: "#b91716",
          600: "#941212",
          700: "#6f0e0d",
          800: "#4a0909",
          900: "#250504",
        },
        blueAccent: {
          100: "#051522",
          200: "#092a44",
          300: "#0e3f66",
          400: "#125488",
          500: "#1769aa",
          600: "#4587bb",
          700: "#74a5cc",
          800: "#a2c3dd",
          900: "#d1e1ee",
        },

        white: {
          100: "#333333",
          200: "#666666",
          300: "#999999",
          400: "#cccccc",
          500: "#ffffff",
          600: "#cccccc",
          700: "#ffffff",
          800: "#ffffff",
          900: "#ffffff",
        },
      }),
});

// mui theme settings
export const themeSettings = (mode) => {
  const colors = tokens(mode);
  return {
    palette: {
      mode: mode,
      ...(mode === "dark"
        ? {
            // paleta de cores dark mode
            primary: {
              main: colors.primary[300],
            },
            secondary: {
              main: colors.grey[100],
            },
            neutral: {
              dark: colors.grey[100],
              main: colors.grey[100],
              light: colors.grey[100],
            },
            background: {
              default: colors.grey[900],
            },
          }
        : {
            // paleta de cores light mode
            primary: {
              main: colors.primary[700],
            },
            secondary: {
              main: colors.redAccent[500],
            },
            neutral: {
              dark: colors.grey[700],
              main: colors.grey[500],
              light: colors.grey[800],
            },
            background: {
              default: "#F5F5F5",
            },
          }),
    },
    typography: {
      fontFamily: ["Source Sans Pro", "sans-serif"].join(","),
      fontSize: 12,
      h1: {
        fontFamily: ["Source Sans Pro", "sans-serif"].join(","),
        fontSize: 40,
      },
      h2: {
        fontFamily: ["Source Sans Pro", "sans-serif"].join(","),
        fontSize: 32,
      },
      h3: {
        fontFamily: ["Source Sans Pro", "sans-serif"].join(","),
        fontSize: 24,
      },
      h4: {
        fontFamily: ["Source Sans Pro", "sans-serif"].join(","),
        fontSize: 20,
      },
      h5: {
        fontFamily: ["Source Sans Pro", "sans-serif"].join(","),
        fontSize: 16,
      },
      h6: {
        fontFamily: ["Source Sans Pro", "sans-serif"].join(","),
        fontSize: 14,
      },
    },
  };
};

// context for color mode
export const ColorModeContext = createContext({
  toggleColorMode: () => {},
});

export const useMode = () => {
  let local_theme;
  try {
    local_theme = JSON.parse(localStorage.getItem("theme"));
  } catch (error) {
    local_theme = defaultMode;
  }

  if (!local_theme) {
    localStorage.setItem("theme", JSON.stringify(defaultMode));
    local_theme = defaultMode;
  }

  const [mode, setMode] = useState(local_theme);

  const colorMode = useMemo(
    () => ({
      toggleColorMode: () => {
        const newMode = mode === "light" ? "dark" : "light";
        setMode(newMode);
        localStorage.setItem("theme", JSON.stringify(newMode));
      },
    }),
    [mode]
  );

  const theme = useMemo(() => createTheme(themeSettings(mode)), [mode]);
  return [theme, colorMode];
};
