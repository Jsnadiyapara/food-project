import usercrud from "../models/userModel.js";

export const getUser = async (req, res) => {
    try {
        const userlist = await usercrud.find();
        return res.status(200).json(userlist);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const getUserById = async (req, res) => {
    try {
        const id = req.params._id;
        const user = await usercrud.findById(id);
        return res.status(200).json(user);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const delete_user = async (req, res) => {
    try {
        const id = req.params._id;
        const user = await usercrud.deleteOne({ _id: id });
        return res.status(200).json({ message: "User deleted successfully", user });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const add_user = async (req, res) => {
    try {
        const newUser = new usercrud(req.body);
        const savedUser = await newUser.save();
        res.status(201).json({ message: "User added successfully", savedUser });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const update_user = async (req, res) => {
    try {
        const id = req.params._id;
        const updatedUser = await usercrud.findOneAndUpdate({ _id: id }, { $set: req.body }, { new: true });
        res.status(201).json({ message: "User updated successfully", updatedUser });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
