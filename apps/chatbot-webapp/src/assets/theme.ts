import { createTheme, styled } from '@mui/material/styles';
import { MaterialDesignContent } from 'notistack'

export const theme = createTheme({
  palette: {
    primary: {
      light: '#484848',
      main: '#212121',
      dark: '#111111',
      contrastText: '#fafafa',
    },
    secondary: {
      light: '#ff6659',
      main: '#d32f2f',
      dark: '#9a0007',
      contrastText: '#fff',
    },
  },
  components: {
    MuiPaper: {
      styleOverrides: {
        root: {
          backgroundColor: '#F2F2F2',
        }
      }
    },
    MuiTypography: {
      styleOverrides: {
        root: {
          fontSize: '1rem'
        },
        h6: {
          fontSize: '1.3rem'
        },
        h2: {
          fontSize: '1.25rem'
        }
      }
    },
    MuiLinearProgress: {
      styleOverrides: {
        root: {
          backgroundColor: 'transparent'
        }
      }
    },
    MuiCssBaseline: {
      styleOverrides: {
        body: {
          height: '100vh',
          overflow: 'hidden',
          fontFamily: 'Roboto,Helvetica,Arial,sans-serif',
          webkitFontSmoothing: 'antialiased',
        },
        '*': {
          padding: 0,
          margin: 0,
          boxSizing: 'border-box'
        },
        'html': {
          fontSize: '15px'
        }
      }
    }
  },
});

export const StyledMaterialDesignContent = styled(MaterialDesignContent)(() => ({
  '&.notistack-MuiContent-success': {
    backgroundColor: theme.palette.success,
  },
  '&.notistack-MuiContent-error': {
    backgroundColor: theme.palette.error,
  },
  '&.notistack-MuiContent-info': {
    backgroundColor: theme.palette.info,
  },
  '&.notistack-MuiContent-default': {
    backgroundColor: theme.palette.primary,
  },
  '&.notistack-MuiContent-warning': {
    backgroundColor: theme.palette.warning,
  },
}));

