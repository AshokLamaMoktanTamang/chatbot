import { FC } from 'react';
import { useSnackbar, SnackbarKey } from 'notistack';

import { IconButton } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';

interface ISnackBarCloseButton {
    snackbarKey: SnackbarKey
}

const SnackBarCloseButton: FC<ISnackBarCloseButton> = ({ snackbarKey }) => {
    const { closeSnackbar } = useSnackbar();

    return (
        <IconButton onClick={() => closeSnackbar(snackbarKey)} color='inherit'>
            <CloseIcon />
        </IconButton>
    );
}

export default SnackBarCloseButton;