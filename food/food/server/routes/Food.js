import express from "express";
import {getFoodItems,getFoodById,delete_food,add_food_items,update_food } from "../controllers/Food.js";

const router = express.Router();

router.post("/add", add_food_items);
router.get("/", getFoodItems);
router.get("/:fid", getFoodById);
router.delete("/:fid", delete_food);
router.put("/edit/:fid", update_food);

export default router;
