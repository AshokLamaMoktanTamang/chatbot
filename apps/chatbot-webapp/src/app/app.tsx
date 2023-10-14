import { CssBaseline, ThemeProvider } from "@mui/material";

import { theme } from "../assets/theme";
import Layout from "../layout";

export function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Layout />
    </ThemeProvider>
  );
}

export default App;
