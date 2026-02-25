import { createTheme } from "@mui/material/styles";

export const theme = createTheme({
  palette: {
    primary: { main: "#1565c0" },
    secondary: { main: "#6a1b9a" },
  },
  typography: {
    fontFamily: ["Inter", "system-ui", "Arial"].join(","),
    button: { textTransform: "none", fontWeight: 700 },
  },
  shape: { borderRadius: 12 },
});