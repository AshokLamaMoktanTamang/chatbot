import express, { Request, Response } from 'express';
import cors from 'cors';
import pdfParse from 'pdf-parse';
import expressFileUpload from 'express-fileupload'
import * as path from 'path';

const app = express();

app.use(cors({
  origin: ['http://localhost:3333'],
  methods: 'GET,POST',
}));
app.use(expressFileUpload())
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

const port = process.env.PORT || 3001;
const server = app.listen(port, () => {
  console.log(`Listening at http://localhost:${port}/api`);
});
server.on('error', console.error);
