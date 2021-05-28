import express from 'express';
import bodyParser from 'body-parser';
import tests from './routes/tests';
import cors from 'cors';

const server = express();

server

  .disable('x-powered-by')

  .use(cors({
    origin: true
  }))

  .use(express.static(process.env.RAZZLE_PUBLIC_DIR))

  .use(bodyParser.json())

  .get('/health', (req, res) => {
    res.json({
      health: 'ok'
    }, 200);
  })

  .use(tests)

export default server;