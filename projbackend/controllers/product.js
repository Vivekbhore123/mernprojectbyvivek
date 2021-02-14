const Product = require("../models/product");
const formidable = require("formidable");
const _ = require("lodash");
const fs = require("fs"); 

exports.getProductById = (req, res, next, id) => {
  Product.findById(id)
    .populate("category")
    .exec((err, product) => { 
      if (err) {
        return res.status(400).json({
          error: "Product not found",
        });
      }
      req.product = product;
      next();
    });
};

exports.createProduct = (req, res) => {
  let form = new formidable.IncomingForm();
  form.keepExtensions = true;

  form.parse(req, (err, fields, file) => {
    if (err) {
      return res.status(400).json({
        error: "problem with image",
      });
    }
    const { name, description, price, category, stock } = fields;
    if (!name || !description || !price || !category || !stock) {
      return res.status(400).json({
        error: "please include all fields",
      });
    }
    //TODO restrictions on fields
    let product = new Product(fields); 

    //handle file here
    if (file.photo) {
      if (file.photo.size > 3000000) {
        return res.status(400).json({
          error: "file size too large",
        });
      }
      product.photo.data = fs.readFileSync(file.photo.path);
      product.photo.contentType = file.photo.type;
    }

    //save to the db
    product.save((err, product) => {
      if (err) {
        return res.status(400).json({
          error: "saving t_shirt to db failed",
        });
      }
      res.json(product);
    });
  });
};

exports.getProduct = (req, res) => {
  req.product.photo = undefined;
  res.json(req.product);
};

//photo as a middleware
// exports.photo = (req, res, next) => {
//   if (req.product.photo.data) {
//      res.set("Content-Type", req.product.photo.contentType);
//      return res.send(req.product.photo.data);
//    }
//   next();
// };

//photo as a simple controller
exports.photo = (req, res) => {
  if (req.product.photo.data) {
     res.set("Content-Type", req.product.photo.contentType);
     return res.send(req.product.photo.data);
   }
  
};

exports.updateProduct = (req, res) => {
  console.log(`req in updateprod=${req}`);
  let form = new formidable.IncomingForm();
  form.keepExtensions = true;

  form.parse(req, (err, fields, file) => {
    if (err) {
      return res.status(400).json({
        error: "problem with image",
      });
    }
    // const { name, description, price, category, stock } = fields;
    // if (!name || !description || !price || !category || !stock) {
    //   return res.status(400).json({
    //     error: "please include all fields",
    //   });
    // }
    //TODO restrictions on fields
    let product = req.product;
    product = _.extend(product, fields);

    //handle file here
    if (file.photo) {
      if (file.photo.size > 3000000) {
        return res.status(400).json({
          error: "file size too large",
        });
      }
      product.photo.data = fs.readFileSync(file.photo.path);
      product.photo.contentType = file.photo.type;
    }

    //save to the db
    product.save((err, product) => {
      if (err) {
        return res.status(400).json({
          error: "updation of t_shirt in db failed",
        });
      }
      res.json({message: "tshirt updated successfully", product});
    });
  });
};

exports.deleteProduct = (req, res) => {
  let product = req.product;
  product.remove((err, deletedProduct) => {
    if (err) {
      return res.status(400).json({
        error: "failed to delete to product",
      });
    }
    res.json({
      message: "deletion was successful",
      deletedProduct,
    });
  });
};

exports.allProducts = (req, res) => {
//   let limit = req.query.limit ? parseInt(req.query.limit) : 1
let sortBy = req.query.sortBy ? req.query.sortBy : "_id"
// .limit(limit)
 Product.find()
 .select("-photo")
 .populate("category")
.sort([[sortBy,"asc"]])
.exec((err,products)=>{
  if (err || !products) {
    return res.status(400).json({
      error: "No products were found",
    });
  }
  res.json(products);
 })
};

exports.getAllUniqueCategories=(req, res)=>{
Product.distinct("category", {}, (err, category) => {
  if (err) {
    return res.status(400).json({
      error: "no category found"
    });
  }
  res.json(category);
});
}


exports.updateStock = (req, res, next) => {
  let myOperations = req.body.order.products.map((prod) => {
    return {
      updateOne: {
        filter: { _id: prod._id },
        update: { $inc: { stock: -prod.count, sold: +prod.count } },
      },
    };
  });

  Product.bulkWrite(myOperations, {}, (err, products) => {
    if (err) {
      return res.status(400).json({
        error: "Bulk operation failed",
      });
    }
    next();
  });
};

