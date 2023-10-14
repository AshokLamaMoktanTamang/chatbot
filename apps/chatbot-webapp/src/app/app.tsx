import { Routes, Route } from "react-router-dom";

import { CssBaseline, ThemeProvider } from "@mui/material";

import { theme } from "../assets/theme";
import Layout from "../layout";
import ChatBox from "../components/ChatBox";

export function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route path="" element={<ChatBox />} />
        </Route>
      </Routes>
    </ThemeProvider>
  );
}

export default App;
