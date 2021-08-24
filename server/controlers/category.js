import { errorHandler } from "../helpers/errorHelper.js";
import Category from "../models/category.js";

export const create = async (req, res) => {
  const category = new Category(req.body);
  try {
    const data = await category.save();
    return data && res.json({ data });
  } catch (error) {
    res.status(400).json({ error: errorHandler(error) });
  }
};

export const categoryById = async (req, res, next, id) => {
  try {
    const category = await Category.findById(id);
    req.category = category;
    next();
  } catch (error) {
    res.status(400).json({ error: "category does not exist" });
  }
};

export const fetchOne = (req, res) => {
  return res.json(req.category);
};

export const update = async (req, res) => {
  const category = req.category;
  category.name = req.body.name;
  try {
    const updated = await category.save();
    res.json(updated);
  } catch (error) {
    res.status(400).json({ error: error });
  }
};
export const remove = async (req, res) => {
  const category = req.category;
  category.name = req.body.name;
  try {
    const deleted = await category.remove();
    res.json({ message: "deleted successfully" });
  } catch (error) {
    res.status(400).json({ error: error });
  }
};
export const fetchAll = async (req, res) => {
  try {
    const all = await Category.find();
    res.send(all);
  } catch (error) {
    res.status(400).json({ error: error });
  }
};
