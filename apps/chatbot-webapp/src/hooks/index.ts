import { useMutation } from "react-query"
import { useSnackbar } from "notistack"

import { sendMessage, uploadPdf } from "../api"

type HttpResponse = {
    response: {
        data: any
        status: number
        statusText: string
        request: any
        headers: any
        config: any
    }
}

export const useUploadPdfFile = () => {
    const { enqueueSnackbar } = useSnackbar()
    
    return useMutation(uploadPdf, {
        onError: (error: HttpResponse) => {
            enqueueSnackbar(error.response.data.message || 'Failed to save file')
        }
    })
}

export const useSendMessage = () => {
    const { enqueueSnackbar } = useSnackbar()
    
    return useMutation(sendMessage, {
        onError: (error: HttpResponse) => {
            enqueueSnackbar(error.response.data.message || 'Failed to generate response')
        }
    })
}