import { ChangeEvent, FC, useState } from "react";

import { Box, Button, Grid, TextField, Typography } from "@mui/material";
import { Send } from "@mui/icons-material";

type Message = {
    sender: 'bot' | 'user',
    message: string
}

interface IMessageBox {
    defaultMessage: string
}

const MessageBox: FC<IMessageBox> = ({ defaultMessage }) => {
    const [messages, setMessages] = useState<Array<Message>>([])
    const [message, setMessage] = useState<string | null>(null)

    const handleMessageInput = (e: ChangeEvent<HTMLInputElement>) => {
        setMessage(e.target.value)
    }

    const handleSendMessage = () => {

    }

    return (
        <Box
            height={'calc(100% - 23px)'}
            display={'grid'}
            gridTemplateRows={'auto max-content'}
        >
            <Box>
                {messages.map(({ message, sender }, index) => (
                    <Typography key={index}>
                        {message}
                    </Typography>
                ))}
            </Box>

            <Box sx={{ backgroundColor: "background.default" }}>
                <Grid container spacing={2}>
                    <Grid item xs={10}>
                        <TextField
                            size="small"
                            fullWidth
                            placeholder="Type a message"
                            variant="outlined"
                            value={message || ''}
                            onChange={handleMessageInput}
                        />
                    </Grid>
                    <Grid item xs={2}>
                        <Button
                            fullWidth
                            color="primary"
                            variant="contained"
                            endIcon={<Send />}
                            onClick={handleSendMessage}
                        >
                            Send
                        </Button>
                    </Grid>
                </Grid>
            </Box>
        </Box>
    );
}

export default MessageBox;