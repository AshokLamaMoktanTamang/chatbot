import { Outlet } from 'react-router-dom'

import { Box } from "@mui/material";

import Background from 'assets/background.svg'

const Layout = () => {
    return (
        <Box
            sx={{
                width: '100%',
                height: '100vh',
                backgroundColor: '#00000077',
                position: 'relative',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                
                '&:before': {
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    width: '100%',
                    height: '100%',
                    content: '""',
                    zIndex: -1,
                    backgroundImage: `url(${Background})`,
                    backgroundRepeat: 'no-repeat',
                    backgroundSize: 'cover',
                }
            }}
        >
            <Box 
                sx={{
                    p: 2,
                    backgroundColor: 'white',
                    borderRadius: '.15rem'
                }}
                width={'100%'}
                maxWidth={'900px'}
                height={'100%'}
                maxHeight={'85vh'}
                m={3}
            >
                <Outlet />
            </Box>
        </Box>
    );
}

export default Layout;