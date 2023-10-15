import { ChangeEventHandler, FC } from "react";

import { CloudUpload } from "@mui/icons-material";
import { Button, styled } from "@mui/material";

const VisuallyHiddenInput = styled('input')({
    clip: 'rect(0 0 0 0)',
    clipPath: 'inset(50%)',
    height: 1,
    overflow: 'hidden',
    position: 'absolute',
    bottom: 0,
    left: 0,
    whiteSpace: 'nowrap',
    width: 1,
});

interface IFileInput {
    onChange: ChangeEventHandler<HTMLInputElement>
}

const FileInput: FC<IFileInput> = ({onChange}) => {
    return (
        <Button component="label" variant="contained" startIcon={<CloudUpload />}>
            Upload a PDF file
            <VisuallyHiddenInput
                type="file"
                accept="application/pdf"
                onChange={onChange}
            />
        </Button>
    );
}

export default FileInput;