import express from 'express';
import morgan from 'morgan';
import cors from 'cors';
import authRoutes from './routes/auth';

const app = express();
const origin = "https://minai621-probable-happiness-w4459475xqvfxjw-3000.preview.app.github.dev";

app.use(express.json());
app.use(morgan('dev'));
app.use(cors({
  origin
}))

app.get('/', (_, res) => res.send('running'));
app.use('/api/auth', authRoutes )

let port = 4000;

app.listen(port, async () => {
  console.log(`Server running at http://localhost:${port}`);
});
