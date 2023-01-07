import express from 'express';
import morgan from 'morgan';
import cors from 'cors';
import authRoutes from './routes/auth';
import { AppDataSource } from './data-source';
import dotenv from 'dotenv';

const app = express();
const origin = "https://minai621-probable-happiness-w4459475xqvfxjw-3000.preview.app.github.dev";

app.use(express.json());
app.use(morgan('dev'));
dotenv.config();
app.use(cors({
  origin,
  credentials: true
}))

app.get('/', (_, res) => res.send('running'));
app.use('/api/auth', authRoutes);

let port = 4000;

app.listen(port, async () => {
  console.log(`Server running at http://localhost:${port}`);
  AppDataSource.initialize().then(() => {
    console.log("database initialized")
}).catch(error => console.log(error))

});
