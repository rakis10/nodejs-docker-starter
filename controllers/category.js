const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('./db.sqlite'); // Replace with your database path

async function selectCategories (){
  const categories = await new Promise((resolve, reject) => {
    db.all('SELECT * FROM category', (err, rows) => {
      if (err) reject(err);
      resolve(rows);
    });
  });
  return categories;
}
module.exports = {
  getCategories: async (req, res) => {
    res.render('category/view.ejs');
  },
  getCategoriesData: async (req, res) => {
    try {
      res.render('category/data.ejs', { categories: await selectCategories() });
    } catch (err) {
      console.error(err);
      res.status(500).send('Error retrieving categories');
    }
  },
  getCategoryById: async (req, res) => {
    try {
      const categoryId = req.params.id;
      const category = await new Promise((resolve, reject) => {
        db.all('SELECT * FROM category WHERE id = ?', [categoryId], (err, rows) => {
          if (err) reject(err);
          resolve(rows);
        });
      });

      if (!category.length) {
        return res.status(404).send('Category not found');
      }

      res.render('categories-detail.ejs', { category: category[0] });
    } catch (err) {
      console.error(err);
      res.status(500).send('Error retrieving category');
    }
  },
  createCategory: async (req, res) => {
    try {
      const payload = req.body;
      console.log(payload)
      const newCategory = await new Promise((resolve, reject) => {
        db.run('INSERT INTO category (name) VALUES (?)', [payload.name], function (err) {
          if (err) reject(err);
          resolve(this.lastID);
        });
      });

      res.render('category/data.ejs', { categories: await selectCategories() });
    } catch (err) {
      console.error(err);
      res.status(500).send('Error creating category');
    }
  },
  getEditCategory: async (req, res) => {
    try {
      const categoryId = req.params.id;
      const category = await new Promise((resolve, reject) => {
        db.all('SELECT * FROM category WHERE id = ?', [categoryId], (err, rows) => {
          if (err) reject(err);
          resolve(rows);
        });
      });

      if (!category.length) {
        return res.status(404).send('Category not found');
      }

      res.render('categories-edit.ejs', { category: category[0] });
    } catch (err) {
      console.error(err);
      res.status(500).send('Error retrieving category');
    }
  },
  updateCategory: async (req, res) => {
    try {
      const categoryId = req.params.id;
      const payload = req.body;
      const category = await new Promise((resolve, reject) => {
        db.run('UPDATE category SET name = ? WHERE id = ?', [payload.name, categoryId], function (err) {
          if (err) reject(err);
          resolve(this.changes);
        });
      });

      if (!category) {
        return res.status(404).send('Category not found');
      }

      res.redirect('/category');
    } catch (err) {
      console.error(err);
      res.status(500).send('Error updating category');
    }
  },
  deleteCategory: async (req, res) => {
    try {
      const categoryId = req.params.id;
      const category = await new Promise((resolve, reject) => {
        db.run('DELETE FROM category WHERE id = ?', [categoryId], function (err) {
          if (err) reject(err);
          resolve(this.changes);
        });
      });

      if (!category) {
        return res.status(404).send('Category not found');
      }
      
      res.render('category/data.ejs', { categories: await selectCategories() });
    } catch (err) {
      console.error(err);
      res.status(500).send('Error deleting category');
    }
  }
}