const User = require("../models/User");
const catchAsync = require("../utils/catchAsync");
const AppError = require("../utils/AppError");

exports.addUser = catchAsync(async (req, res, next) => {
  const { username, age } = req.body;
  if (!username || !age)
    return next(new AppError("Please fill all the required fields!"), 400);
  const user = await User.create({
    username,
    age,
  });
  res.status(201).json(user);
});

exports.getAllUsers = catchAsync(async (req, res, next) => {
  const users = await User.find({});
  if (!users.length) return next(new AppError("There are no users yet!", 400));
  res.status(200).json(users);
});
