const userModel = require('../Models/user.model');
const bcryptjs = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { promisify } = require('util');

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

exports.login = async (req, res) => {
    let { email, password } = req.body;
    if (!email || !password) return res.status(400).json({ message: "you must provide email and password..." });

    try {
        let user = await userModel.findOne({ email: email });
        if (!user) return res.status(404).json({ message: "User is not found..." });

        let isValid = await bcryptjs.compare(password, user.password);
        if (!isValid) return res.status(400).json({ message: "invalid email or password" });

        //! Generate Token
        const token = jwt.sign({ id: user._id, userName: user.userName, email: user.email, role: user.role },
            process.env.MY_SECRET,
            { expiresIn: '6h' }
        );
        const refreshToken = jwt.sign({ id: user._id, userName: user.userName, email: user.email, role: user.role },
            process.env.MY_RefreshSECRET,
            { expiresIn: '4d' }
        );
        await userModel.findByIdAndUpdate(user._id, { refreshToken })
        // await userModel.findOneAndUpdate({_id: user._id}, {refreshToken})
        res.status(200).json({ message: "Success", token, refreshToken })
    } catch (error) {
        res.status(400).json({ message: "from catch login" })
    }
}

exports.refreshToken = async (req , res ) => {
    let { refreshToken } = req.body;
    if (!refreshToken) return res.status(400).json({ message: "you must provide refreshToken" });

    try {
        let decoded = await promisify(jwt.verify)(refreshToken, process.env.MY_RefreshSECRET);
        console.log(decoded)
        let user = await userModel.findOne({ _id: decoded.id })
        if (!user || user.refreshToken != refreshToken) return res.status(400).json({ message: "dosen't match" });

        const token = jwt.sign({ id: user._id, userName: user.userName, email: user.email, role: user.role },
            process.env.MY_SECRET,
            { expiresIn: '6h' }
        );
        res.status(200).json({ message: "Success", token })
    } catch (error) {
        res.status(400).json({ message: "file" })
    }
}