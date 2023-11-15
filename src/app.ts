import express from 'express';
import cors from 'cors';
import morgan from 'morgan';
import menuRouter from './routes/menu.js';
import orderRouter from './routes/order.js';
import userRouter from './routes/user.js';
import { PrismaClient } from '@prisma/client';

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(morgan('dev'));
app.use('/menu', menuRouter);
app.use('/order', orderRouter);
app.use('/user', userRouter);

const PORT = process.env.PORT || 8000;
app.listen(PORT, () => console.log(`server started at port ${PORT}`));
