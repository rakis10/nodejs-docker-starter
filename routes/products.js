const express = require('express');
const productController = require('../controllers/products');

const router = express.Router();

router.get('/', productController.getProducts);
router.get('/data', productController.getProductsData);
router.get('/:id', productController.getProductById);
router.post('/', productController.createProduct);
router.get('/edit/:id', productController.getEditProduct);
router.put('/:id', productController.updateProduct);
router.delete('/:id', productController.deleteProduct);

module.exports = router;