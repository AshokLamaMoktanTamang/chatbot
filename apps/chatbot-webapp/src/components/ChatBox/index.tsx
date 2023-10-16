import { ChangeEvent, useState } from "react";

import { Box, Button, Divider, Stack, Tooltip, Typography } from "@mui/material";
import { UploadFile } from "@mui/icons-material";

import FileInput from "../FileInput";

import { useUploadPdfFile } from "../../hooks";
import axios from "axios";

const ChatBox = () => {
    const [file, setFile] = useState<File | null>(null)
    const [parsedContent, setParsedContent] = useState<string | null>(null)

    const { mutate: uploadFile, isLoading } = useUploadPdfFile()

    const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
        const f = e.target.files && e.target.files[0]

        setFile(f)
    }

    const parseFile = async () => {
        if (!file) return

        const formData = new FormData();
        formData.append('pdfFile', file);

        uploadFile(formData)
    }

    return (
        <Box height={'100%'} width={'100%'} sx={{ overflowY: 'scroll' }}>
            <Typography
                variant="h2"
                component={'h2'}
            >
                Welcome to chatbot!
            </Typography>

            <Divider />

            <Box
                display={'flex'}
                justifyContent={'center'}
                alignItems={'center'}
                height={'100%'}
            >
                {!file && <FileInput onChange={handleFileChange} />}

                {
                    file &&
                    <Stack direction={'row'} flexWrap={'wrap'}>
                        <Button>
                            {file.name}
                        </Button>
                        <Tooltip title="Process data">
                            <Button variant="contained" onClick={parseFile}>
                                <UploadFile />
                            </Button>
                        </Tooltip>
                    </Stack>
                }
            </Box>
        </Box>
    );
}

export default ChatBox;