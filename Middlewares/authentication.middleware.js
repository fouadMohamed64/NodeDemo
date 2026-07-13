const jwt = require('jsonwebtoken');
const {promisify} = require('util');

exports.auth =async (req, res, next) => {
    let { authorization } = req.headers;
    if(!authorization) return res.status(400).json({message: "you must provide Authorization Key"});

    try{
        // ! jwt.verify(authorization, 'THIS_IS_MYJSONWEBTOKENSECRETKEY' , ()=>{})
        const decoded = await promisify(jwt.verify)(authorization, process.env.MY_SECRET)
        req.role = decoded.role; // user role => token payload 
        // console.log(decoded);
        // if(!decoded) return res.status(401).json({message: "you must provide valid token"});
        next();
    }catch(error){
        console.log(error)
        res.status(400).json({message: "fail"})
    }
}



// ...roles
// ['admin']
// ['admin', 'user']
exports.restrictTo = (...roles)=>{
    return (req, res, next)=>{
        if(!roles.includes(req.role)) return res.status(401).json({message: "you are un authorized to access this route"});
        next();
    }
}