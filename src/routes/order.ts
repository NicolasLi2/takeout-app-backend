import express from 'express';
import { createOrder, getOrder } from '../controller/order.js';

const router = express.Router();

router.post('/create-order', createOrder);
router.get('/get-order/:orderId', getOrder);

export default router;
