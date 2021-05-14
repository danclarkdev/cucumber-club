import express from 'express';
import bodyParser from 'body-parser';
import tests from './routes/tests';

const server = express();

server

  .disable('x-powered-by')

  .use(express.static(process.env.RAZZLE_PUBLIC_DIR))

  .use(bodyParser.json())

  .get('/health', (req, res) => {
    res.json({
      health: 'ok'
    }, 200);
  })

  .use(tests)

export default server;