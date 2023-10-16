import { ChangeEvent, FC, useEffect, useState } from "react";

import { Box, Button, CircularProgress, Grid, TextField, Typography, useTheme } from "@mui/material";
import { Send } from "@mui/icons-material";
import { useSendMessage } from "../../hooks";

type Message = {
    sender: 'bot' | 'user',
    message: string
    error: boolean
}

interface IMessageBox {
    defaultMessage: string
}

const MessageBox: FC<IMessageBox> = ({ defaultMessage }) => {
    const theme = useTheme()

    const [messages, setMessages] = useState<Array<Message>>([])
    const [message, setMessage] = useState<string | null>(null)

    const { mutateAsync: sendMessage, isLoading } = useSendMessage()

    useEffect(() => {
        if (!defaultMessage || messages.length !== 0) return

        botSendMessage(defaultMessage)
    }, [])

    const botSendMessage = (message: string) => {
        sendMessage(message)
            .then((data) => {
                setMessages((prev) => ([
                    ...prev,
                    {
                        message: typeof data === 'string' ? data : '',
                        sender: 'bot',
                        error: false
                    }
                ]))
                setMessage(null)
            })
            .catch((error) => {
                setMessages((prev) => ([
                    ...prev,
                    {
                        message: typeof error === 'string' ? error : 'Failed to generate response!',
                        sender: 'bot',
                        error: true
                    }
                ]))
                setMessage(null)
            })
    }

    const handleMessageInput = (e: ChangeEvent<HTMLInputElement>) => {
        setMessage(e.target.value)
    }

    const handleSendMessage = () => {
        if (!message) return

        setMessages((prev) => ([
            ...prev,
            {
                message,
                sender: 'user',
                error: false
            }
        ]))

        botSendMessage(message)
    }

    return (
        <>
            {
                isLoading &&
                <Box 
                    position={'absolute'}
                    bottom={'4rem'}
                    right={'50%'}
                    display={'flex'}
                    justifyContent={'center'}
                    alignItems={'center'}
                    color={'GrayText'}
                    sx={{
                        transform: 'translateX(-50%)'
                    }}
                >
                    <CircularProgress />
                    Typing...
                </Box>
            }

            <Box
                height={'calc(100% - 23px)'}
                display={'grid'}
                gridTemplateRows={'auto max-content'}
            >
                <Box
                    display={'grid'}
                    mt={1.5}
                    mb={1.5}
                    sx={{
                        gridGap: '1rem',
                        gridAutoRows: 'max-content'
                    }}
                >
                    {messages.map(({ message, sender, error }, index) => (
                        <Box
                            key={index}
                            maxWidth={'70%'}
                            width={'fit-content'}
                            p={1.25}
                            borderRadius={'.5rem'}
                            sx={{
                                backgroundColor: sender === 'user' ? theme.palette.primary.main : theme.palette.primary.contrastText,
                                color: sender === 'bot' ? theme.palette.primary.main : theme.palette.primary.contrastText,
                                border: `1px solid ${theme.palette.primary.main}`,
                                justifySelf: sender === 'user' ? 'flex-end' : 'flex-start',
                                borderColor: error ? theme.palette.secondary.main : 'inherit',
                            }}
                        >
                            <Typography color={error ? theme.palette.secondary.main : 'inherit'}>
                                {message}
                            </Typography>
                        </Box>
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
                                disabled={isLoading}
                            />
                        </Grid>
                        <Grid item xs={2}>
                            <Button
                                fullWidth
                                color="primary"
                                variant="contained"
                                endIcon={<Send />}
                                onClick={handleSendMessage}
                                disabled={isLoading}
                            >
                                Send
                            </Button>
                        </Grid>
                    </Grid>
                </Box>
            </Box>
        </>
    );
}

export default MessageBox;