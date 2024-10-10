import Food from "../models/Food.js";

export const getFoodItems = async (req, res) => {
    try {
        const foodList = await Food.find();
        return res.status(200).json(foodList);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
export const getFoodById = async (req, res) => {
    try {
        const id = req.params.fid;
        // console.log(id);
        const food = await Food.findOne({ fid: id });
        return res.status(200).json(food);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
export const delete_food = async (req, res) => {
    try {
        const id = req.params.fid;
        const food = await Food.deleteOne({ fid: id });
        return res.status(200).json({ message: "FoodItem deleted successfully", food });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
export const add_food_items = async (req, res) => {
    try {
        const foodData = new Food(req.body);
        const createdFoods = await foodData.save();
        res.status(201).json({ message: " FoodItem Added Successfully", createdFoods });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
export const update_food = async (req, res) => {
    try {
        const id = req.params.fid;
        const updatedFoods = await Food.findOneAndUpdate({ fid:id },{ $set:req.body});
        res.status(201).json({ message: "FoodItem Updated Successfully", updatedFoods });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};


