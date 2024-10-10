import express from 'express';
import { createOrder, getOrdersByUser, getOrderById, updateOrderStatus } from '../controllers/orderController.js';

const router = express.Router();

router.post('/', createOrder);
router.get('/user/:userId', getOrdersByUser);
router.get('/:id', getOrderById);
router.put('/:id', updateOrderStatus);

export default router;
