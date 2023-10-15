import { Box, Button, Divider, Stack, Tooltip, Typography } from "@mui/material";
import { ChangeEvent, useState } from "react";
import FileInput from "../FileInput";
import { UploadFile } from "@mui/icons-material";
import axios from "axios";

const ChatBox = () => {
    const [file, setFile] = useState<File | null>(null)
    const [parsedContent, setParsedContent] = useState<string | null>(null)

    const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
        const f = e.target.files && e.target.files[0]

        setFile(f)
    }

    const parseFile = async () => {
        if (!file) return

        const formData = new FormData();
        formData.append('pdfFile', file);

        try {
            const { data } = await axios.post('http://localhost:3001/upload-pdf', formData);
            setParsedContent(data);
        } catch (error) {
            console.error('Error uploading and parsing PDF:', error);
        }
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