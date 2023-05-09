const User = require('./../models/userModel');
const catchAsync = require('./../utils/catchAsync');

exports.signup = catchAsync(async (req, res, next) => { 
  const newUser = await User.create({
    name: req.body.name,
    email: req.body.email,
    password: req.body.password,
    passwordConfirm: req.body.passwordConfirm,
  });

  // this also the same but if someone send req.body it will send extra filed different from the field below
  // use the above method always , b/c allowd filed are sent only the listed one
  // const {name ,email, password ,passwordConfirm } = req.body
  // const newUser = await User.create(req.body);


  res.status(201).json({
    status: 'success',
    data: {
      user: newUser,
    },
  });
});
