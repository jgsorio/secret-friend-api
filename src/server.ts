import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import http from 'http';
import https from 'https';
import siteRoutes from './routes/site';
import adminRoutes from './routes/admin';
import requestIntercepter from './middlewares/requestIntercepter';

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.all('*', requestIntercepter);
app.use('/', siteRoutes);
app.use('/admin', adminRoutes);


const runServer = (port: number, server: http.Server | https.Server) => {
    server.listen(port, () => {
        console.log(`Server running on port ${port}`);
    });
};

const regularServer = http.createServer(app);
if (process.env.NODE_ENV === 'production') {
    // TODO: Implement production server
}

const serverPort: number = process.env.PORT ? parseInt(process.env.PORT) : 9000;
runServer(serverPort, regularServer);
