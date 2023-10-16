import express, { Request, Response } from 'express';
import cors from 'cors';
import dotenv from 'dotenv'
import pdfParse from 'pdf-parse';
import expressFileUpload from 'express-fileupload'
import OpenAI from "openai";
import * as path from 'path';

import config from './config';

const app = express();

dotenv.config()
app.use(cors({
  origin: ['http://localhost:3333'],
  methods: 'GET,POST',
}));
app.use(expressFileUpload())
app.use(express.json());
app.use('/assets', express.static(path.join(__dirname, 'assets')));

app.get('/api', (_req, res) => {
  res.send({ message: 'Welcome to chatbot-api!' });
});

app.post('/upload-pdf', (req: Request, res: Response) => {
  try {
    if (!(req as any).files || !(req as any).files.pdfFile) {
      return res.status(400).json({ message: 'No PDF file uploaded' });
    }

    const pdfBuffer = (req as any).files.pdfFile.data;
    pdfParse(pdfBuffer)
      .then((data) => {
        res.json(data.text);
      })
      .catch((error: Error) => {
        res.status(500).json({ message: error || 'Error parsing PDF' });
      });
  } catch (error) {
    res.status(500).json({ message: 'Error parsing PDF' });
  }
});

const openai = new OpenAI({
  apiKey: config.openAiApiKey,
  organization: "org-5E5KeWbH0RL9mhJ045L9lL72",
});

app.post('/chatbot', async (req: Request, res: Response) => {
  try {
    const message = req.body.message;
    const response = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [
        {
          "role": "user",
          "content": message || ''
        }
      ],
      temperature: 1,
      max_tokens: 256,
      top_p: 1,
      frequency_penalty: 0,
      presence_penalty: 0,
    });

    res.json({ response });
  } catch (error) {
    res.status(500).json({ error: error || 'Chatbot response error' });
  }
});

const port = process.env.PORT || 3001;
const server = app.listen(port, () => {
  console.log(`Listening at http://localhost:${port}/api`);
});
server.on('error', console.error);
