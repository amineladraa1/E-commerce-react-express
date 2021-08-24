import Product from "../models/product.js";
import formidable from "formidable";
import _ from "lodash";
import fs from "fs";

export const productById = async (req, res, next, id) => {
  try {
    const product = await Product.findById(id);
    req.product = product;
    next();
  } catch (error) {
    res.status(400).json({ error: error });
  }
};

export const fetchone = (req, res) => {
  req.product.photo = undefined;
  return res.json(req.product);
};

export const remove = async (req, res) => {
  let product = req.product;
  try {
    const result = await product.remove();
    res.json({ result, message: "product removed successfully" });
  } catch (error) {
    res.status(400).json({ error: error });
  }
};

export const createProduct = (req, res) => {
  var form = new formidable.IncomingForm();
  form.KeepExtensions = true;
  form.parse(req, async (err, fields, files) => {
    if (err)
      return res.status(400).json({ error: "image could not be uploaded" });
    const { name, description, price, quantity, shipping } = fields;
    if (!name || !description || !price || !quantity || !shipping) {
      return res.status(400).json({ error: "all fields are required" });
    }

    const product = new Product(fields);

    if (files.photo > 1000000)
      return res.status(400).json({ error: "image exceeds 1 mb" });
    if (files.photo) {
      product.photo.data = fs.readFileSync(files.photo.path);
      product.photo.contentType = files.photo.type;
    }

    try {
      const NewProduct = await product.save();
      res.json(NewProduct);
    } catch (error) {
      res.status(400).json({ error: error });
    }
  });
};
export const updateProduct = (req, res) => {
  var form = new formidable.IncomingForm();
  form.KeepExtensions = true;
  form.parse(req, async (err, fields, files) => {
    if (err)
      return res.status(400).json({ error: "image could not be uploaded" });
    const { name, description, price, quantity, shipping } = fields;
    if (!name || !description || !price || !quantity || !shipping) {
      return res.status(400).json({ error: "all fields are required" });
    }

    let product = req.product;
    product = _.extend(product, fields);

    if (files.photo > 1000000)
      return res.status(400).json({ error: "image exceeds 1 mb" });
    if (files.photo) {
      product.photo.data = fs.readFileSync(files.photo.path);
      product.photo.contentType = files.photo.type;
    }

    try {
      const NewProduct = await product.save();
      res.json(NewProduct);
    } catch (error) {
      res.status(400).json({ error: error });
    }
  });
};

// *by sell : /products?sortBy=sold&order=desc&limit=4
// *by arrival : /products?sortBy=createdAt&order=desc&limit=4

export const fetchAll = async (req, res) => {
  const order = req.query.order ? req.query.order : "asc";
  const sortBy = req.query.sortBy ? req.query.sortBy : "_id";
  const limit = req.query.limit ? parseInt(req.query.limit) : 6;
  try {
    const data = await Product.find()
      .populate("category")
      .select("-photo")
      .sort([[sortBy, order]])
      .limit(limit);
    res.json(data);
  } catch (error) {
    res.status(404).json({ error: "no product by those criteria" });
  }
};

export const fetchRelated = async (req, res) => {
  const limit = req.query.limit ? parseInt(req.query.limit) : 6;
  try {
    const data = await Product.find({
      _id: { $ne: req.product },
      category: req.product.category,
    })
      .limit(limit)
      .populate("category", "_id name");
    res.json(data);
  } catch (error) {
    res.status(400).json({ error: "products not found !!" });
  }
};

export const listCategories = async (req, res) => {
  try {
    const data = await Product.distinct("category", {});
    res.json(data);
  } catch (error) {
    res.status(400).json({ error: "no categorys yet !!" });
  }
};

export const listBySearch = (req, res) => {
  let order = req.body.order ? req.body.order : "desc";
  let sortBy = req.body.sortBy ? req.body.sortBy : "_id";
  let limit = req.body.limit ? parseInt(req.body.limit) : 100;
  let skip = parseInt(req.body.skip);
  let findArgs = {};

  // console.log(order, sortBy, limit, skip, req.body.filters);
  // console.log("findArgs", findArgs);

  for (let key in req.body.filters) {
    if (req.body.filters[key].length > 0) {
      if (key === "price") {
        // gte -  greater than price [0-10]
        // lte - less than
        findArgs[key] = {
          $gte: req.body.filters[key][0],
          $lte: req.body.filters[key][1],
        };
      } else {
        findArgs[key] = req.body.filters[key];
      }
    }
  }

  Product.find(findArgs)
    .select("-photo")
    .populate("category")
    .sort([[sortBy, order]])
    .skip(skip)
    .limit(limit)
    .exec((err, data) => {
      if (err) {
        return res.status(400).json({
          error: "Products not found",
        });
      }
      res.json({
        size: data.length,
        data,
      });
    });
};

export const photo = (req, res, next) => {
  if (req.product.photo.data) {
    res.set("Content-Type", req.product.photo.contentType);
    res.send(req.product.photo.data);
  }
  next();
};
