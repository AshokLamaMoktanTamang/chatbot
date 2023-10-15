import { Routes, Route } from "react-router-dom";
import { SnackbarProvider } from "notistack";

import { CssBaseline, ThemeProvider } from "@mui/material";

import ChatBox from "../components/ChatBox";
import SnackBarCloseButton from "../components/SnackBarCloseButton";
import { theme, StyledMaterialDesignContent } from '../assets/theme'
import Layout from "../layout";

export function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <SnackbarProvider
        autoHideDuration={5000}
        maxSnack={3}
        anchorOrigin={{
          horizontal: 'right',
          vertical: 'top'
        }}
        disableWindowBlurListener
        hideIconVariant={true}
        action={
          snackbarKey => <SnackBarCloseButton snackbarKey={snackbarKey} />
        }
        Components={{
          success: StyledMaterialDesignContent,
          error: StyledMaterialDesignContent,
          warning: StyledMaterialDesignContent,
          info: StyledMaterialDesignContent,
          default: StyledMaterialDesignContent,
        }}
        variant='error'
        preventDuplicate
      >
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route path="" element={<ChatBox />} />
          </Route>
        </Routes>
      </SnackbarProvider>
    </ThemeProvider>
  );
}

export default App;
