const User = require('../Models/userModel');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const config = require('../config');

const registerUser = (req,res) => {
    let hashedPassword = bcrypt.hashSync(req.body.password, 8);
    let newUser = new User ({
        name: req.body.name,
        email:req.body.email,
        password: hashedPassword
    });
    newUser.save((err,User)=> {

        var token = jwt.sign({id: User._id},config.secretKey,{expiresIn: 86400});

        if(err) {
            res.status(500).send(err);
        }else {
            console.log(jwt.decode(token,{complete: true}))
            res.status(200).send({auth:true, token,token})
        }
    })
}

const getRegisteredUser = (req,res) => {
    var token = req.token;
    var decoded = req.decoded;
    if(!token) {
        res.status(401).send({auth: false,message: 'Token cannot be verified.'})
    }else {
        User.findById(decoded.id,{password:0}, (err,User) => {
            if(err){
                res.status(500).send('There was an error finding the user')
            }else if(!User) {
                res.status(404).send('User does not exist!')
            }else {
                res.status(200).send(User);
            }
        })
    }
}

const loginUser = (req,res) => {
    User.findOne({email:req.body.email},(err,User) =>{
        if(err){
            res.status(500).send('There was an error with the login');
        }else if(!User){
            res.status(404).send('Sorry, that user does not exist');
        }else {
            var passwordIsValid = bcrypt.compareSync(req.body.password,User.password);
            if(!passwordIsValid){
                res.status(401).send({auth:false,token:null})
            } else {
                var token = jwt.sign({id:User._id},config.secretKey,{expiresIn:86400});
                res.status(200).send({auth:true, token:token});
            }
        }
    })
}

module.exports.registerUser = registerUser;
module.exports.getRegisteredUser = getRegisteredUser;
module.exports.loginUser = loginUser;


