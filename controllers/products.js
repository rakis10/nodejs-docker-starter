const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('./db.sqlite'); // Replace with your database path
async function selectProducts (){
  const products = await new Promise((resolve, reject) => {
    db.all('SELECT * FROM product', (err, rows) => {
      if (err) reject(err);
      resolve(rows);
    });
  });
  return products;
}
module.exports = {
  getProductsData: async (req, res) => {
    try {
      res.render('products-data.ejs', { products: await selectProducts()});
    } catch (err) {
      console.error(err);
      res.status(500).send('Error retrieving products');
    }
  },
  getProducts: async (req, res) => {
    try {
      const products = await new Promise((resolve, reject) => {
        db.all('SELECT * FROM product', (err, rows) => {
          if (err) reject(err);
          resolve(rows);
        });
      });
      res.render('products.ejs', { products });
    } catch (err) {
      console.error(err);
      res.status(500).send('Error retrieving products');
    }
  },

  getProductById: async (req, res) => {
    try {
      const productId = req.params.id;
      const product = await new Promise((resolve, reject) => {
        db.all('SELECT * FROM product WHERE id = ?', [productId], (err, rows) => {
          if (err) reject(err);
          resolve(rows);
        });
      });

      if (!product.length) {
        return res.status(404).send('Product not found');
      }

      res.render('products-detail.ejs', { product: product[0] });
    } catch (err) {
      console.error(err);
      res.status(500).send('Error retrieving product');
    }
  },

  createProduct: async (req, res) => {
    try {
      const payload = req.body;
      // console.log(payload)
      
      const newProduct = await new Promise((resolve, reject) => {
        db.run('INSERT INTO product (name, category, price) VALUES (?, ?, ?)', Object.values(payload), (err) => {
          if (err) reject(err);
          resolve(db.lastInsertRowid); // Get the ID of the inserted product
        });
      });
      try {
        const products = await new Promise((resolve, reject) => {
          db.all('SELECT * FROM product', (err, rows) => {
            if (err) reject(err);
            resolve(rows);
          });
        });
        res.render('products-data.ejs', { products });
      } catch (err) {
        console.error(err);
        res.status(500).send('Error retrieving products');
      }
    } catch (err) {
      console.error(err);
      res.status(400).send('Error creating product');
    }
  },
  getEditProduct: async (req, res) => {
    try {
      const productId = req.params.id;
      const product = await new Promise((resolve, reject) => {
        db.all('SELECT * FROM product WHERE id = ?', [productId], (err, rows) => {
          if (err) reject(err);
          resolve(rows);
        });
      });

      if (!product.length) {
        return res.status(404).send('Product not found');
      }

      res.render('edit-product.ejs', { product: product[0] });
    } catch (err) {
      console.error(err);
      res.status(500).send('Error retrieving product');
    }
  },
  updateProduct: async (req, res) => {
    try {
      const productId = req.params.id;
      const updatedProduct = await new Promise((resolve, reject) => {
        db.run('UPDATE product SET name = ?, status = ?, category = ?, price = ? WHERE id = ?', [
          req.body.name,
          req.body.status,
          req.body.category,
          req.body.price,
          productId,
        ], (err) => {
          if (err) reject(err);
          resolve(db.changes > 0); // Check if any rows were updated
        });
      });

      try {
        const products = await new Promise((resolve, reject) => {
          db.all('SELECT * FROM product', (err, rows) => {
            if (err) reject(err);
            resolve(rows);
          });
        });
        res.render('products-data.ejs', { products });
      } catch (err) {
        console.error(err);
        res.status(500).send('Error retrieving products');
      }
    } catch (err) {
      console.error(err);
      res.status(500).send('Error updating product');
    }
  },

  deleteProduct: async (req, res) => {
    try {
      const productId = req.params.id;
      await new Promise((resolve, reject) => {
        db.run('DELETE FROM product WHERE id = ?', [productId], (err) => {
          if (err) reject(err);
          resolve();
        });
      });

      res.setHeader('HX-Trigger', 'prodFetch');
      res.status(200).send({ message: 'Product deleted successfully'});
    } catch (err) {
      console.error(err);
      res.status(500).send('Error deleting product');
    }
  },
};
