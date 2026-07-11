const userModel = require('../Models/user.model');

exports.saveUser = async (req, res) => {
    let user = req.body;
    try {
        let newUswer = await userModel.create(user);
        res.status(201).json({ message: 'created successfully', data: newUswer });
    } catch (error) {
        res.status(400).json({ message: 'fail' });
    }
}
exports.getAllUsers = async (req, res) => {
    try {
        let users = await userModel.find();
        res.status(200).json({ message: "successfully ", users });
    } catch (error) {
        res.status(400).json({ message: "fail" })
    }
}
exports.getUserById = async (req, res) => {
    let { id } = req.params;
    try {
        let user = await userModel.findById(id);
        if (!user) {
            return res.status(404).json({ message: "this user is not found " });
        }
        res.status(200).json({ message: "successfully", data: user });
    } catch (error) {
        res.status(400).json({ message: "fail" })
    }
}
exports.updateUser = async (req, res) => {
    let { id } = req.params;
    let newUser = req.body;
    try {
        let user = await userModel.findByIdAndUpdate(id, newUser, { new: true })
        if (!user) {
            return res.status(404).json({ message: "this user is not found " })
        }
        res.status(201).json({ message: "updated successfully", data: user })
    } catch (error) {
        res.status(400).json({ message: 'fail' })
    }
}
exports.deleteUser = async (req, res) => {
    let { id } = req.params;
    try {
        let user = await userModel.findByIdAndDelete(id);
        if (!user) {
            return res.status(404).json({ message: 'user is not found' })
        }
        res.status(204).json();
    } catch (error) {
        res.status(400).json({ message: "fail" })
    }
}