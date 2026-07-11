const mongoose = require('mongoose');
const bcryptjs = require('bcryptjs');


const userSchema = mongoose.Schema({
    userName: {
        type: String,
        minLength: 4,
        maxLength: 20,
        required: true
    },
    email: {
        type: String,
        requried: true,
    },
    password: {
        type: String,
        requried: true
    }
})

userSchema.pre('save', async function(){
    // console.log(this)
    const salt = await bcryptjs.genSalt(10);
    const hashedPassword= await bcryptjs.hash( this.password, salt);
    this.password = hashedPassword;
})

const userModel = mongoose.model('User' , userSchema);

module.exports = userModel;