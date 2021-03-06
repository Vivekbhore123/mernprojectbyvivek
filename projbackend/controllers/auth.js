const User=require("../models/user");
const { check, validationResult } = require("express-validator");
var jwt = require("jsonwebtoken");
var expressJwt = require("express-jwt");

// exports.signup = (req, res) => {
//     console.log("REQ BODY",req.body);  //using body-parser
//   res.json({
//     message: "signup works"
//   });
// };



exports.signup = (req, res) => {
  const user = new User(req.body);
const errors = validationResult(req);
if (!errors.isEmpty()) {
  return res.status(422).json({
    error: errors.array()[0].msg,
    param: errors.array()[0].param
  });
}
user.save((err, user) => {
  if (err) {
    return res.status(400).json({
      err: "NOT able to save user in DB"
    });
  }
  res.json({
    name:user.name,
    email:user.email,
    id:user._id
  })
})
}

exports.signin = (req, res) => {
  const { email, password } = req.body;
const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(422).json({
      error: errors.array()[0].msg,
    });
  }
const user = new User(req.body);
  User.findOne({ email }, (err, user) => {
    if (err || !(user)) {
      return res.status(400).json({
        error: "USER email does not exists",
      });
    }

    if (!user.authenticate(password)) {  
      return res.status(401).json({
        error: "Email and password do not match",
      });
    }

    //create token
    const token = jwt.sign({ _id: user._id }, process.env.SECRET);
    //put token in cookie
    res.cookie("token", token, { expire: new Date() + 9999 });

    //send response to front end
    const { _id, name, email, role } = user;
    return res.json({ token, user: { _id, name, email, role } });
  });
};


exports.signout = (req, res) => {
  //   res.send("user sign out");
  res.clearCookie("token");
  res.json({
    message: "User has been signed out successfully"
  });
};


//protected routes (default express middleware)
exports.isSignedIn = expressJwt({
 secret: process.env.SECRET,
 userProperty : "auth"
});


//custom middleware
exports.isAuthenticated = (req,res,next)=>{
 let checker = req.profile && req.auth && req.profile._id == req.auth._id;
 
 if(!checker){
 return res.status(403).json({
 error:"ACCESS DENIED VIVEK"
})
}
next();
}



exports.isAdmin = (req,res,next)=>{
 if(req.profile.role===0){
   return res.status(403).json({
     error:"you are not admin access denied"
   })
 }
next();
}