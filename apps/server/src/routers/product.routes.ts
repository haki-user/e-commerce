import express, { Router } from 'express';
import authMiddleware from '../middlewares/auth';
import { createProductController, updateProductController, deleteProductController, getAllProductsController, getProductByIdController } from '../controllers/product';

const router: Router = express.Router();

router.get('/',  getAllProductsController);
router.get('/:id', getProductByIdController);
router.post('/', authMiddleware, createProductController);
router.put('/:id', authMiddleware, updateProductController);
router.delete('/:id', authMiddleware, deleteProductController);

export default router;