const express = require('express');
const categoryController = require('../controllers/category');

const router = express.Router();

router.get('/', categoryController.getCategories);
router.get('/data', categoryController.getCategoriesData);
router.get('/:id', categoryController.getCategoryById);
router.post('/', categoryController.createCategory);
router.get('/edit/:id', categoryController.getEditCategory);
router.put('/:id', categoryController.updateCategory);
router.delete('/:id', categoryController.deleteCategory);

module.exports = router;