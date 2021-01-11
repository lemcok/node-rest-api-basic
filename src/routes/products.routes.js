import { Router } from 'express';
import * as productsCtrl from '../controllers/products.controller';
import { authJwt } from '../middlewares';

const router = Router();

router.get('/', productsCtrl.getProducts);

router.post('/', [authJwt.verifyToken, authJwt.isAdminOrSeller], productsCtrl.createProducts);

router.get('/:id', productsCtrl.getProductById);

router.put('/:id', [authJwt.verifyToken, authJwt.isAdmin], productsCtrl.updateProductById);

router.delete('/:id', [authJwt.verifyToken, authJwt.isAdmin], productsCtrl.deleteProductById);



export default router;