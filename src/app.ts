import express from 'express';
import cors from 'cors';
import morgan from 'morgan';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const app = express();

app.use(cors());
app.use(express.json());
app.use(morgan('dev'));
app.use('/menu', menuRouter);
app.use('/order', orderRouter);
app.use('/user', userRouter);

const PORT = process.env.PORT || 8000;
app.listen(PORT, () => console.log(`server started at port ${PORT}`));
