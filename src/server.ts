import 'dotenv/config';
import express, { Application } from 'express';
import cors from 'cors';
import http from 'http';
import https from 'https';

const server: Application = express();
const port: number = process.env.PORT ? Number(process.env.PORT) : 8080;

server.use(cors())
server.use(express.json());

const runServer = (port: number, server: http.Server) => {
  server.listen(port, () => console.info(`Running port ${port}`));
}

let serverApplication = http.createServer(server);

if (process.env.NODE_ENV === 'production') {
  serverApplication = https.createServer(server);
}

runServer(port, serverApplication);
