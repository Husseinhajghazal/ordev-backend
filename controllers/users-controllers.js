const { validationResult } = require("express-validator");
const NewError = require("../models/new-error");
const User = require("../models/user");

const createUser = async (req, res, next) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return next(new NewError(errors.array()[0].msg, 422));
  }

  const { firstname, lastname, email, role } = req.body;

  const createdUser = new User(firstname, lastname, email, role, "Active");

  createdUser
    .save()
    .then()
    .catch((e) =>
      next(new NewError("Creating user failed, try again later.", 500))
    );

  res.status(201).json({
    message: "User has been created successfully.",
    createdUser,
  });
};

const editUser = async (req, res, next) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return next(new NewError(errors.array()[0].msg, 422));
  }

  const id = req.params.id;
  let user;
  try {
    const [row] = await User.getUserById(id);
    user = row[0];
  } catch (e) {
    return next(
      new NewError("Fetching user failed, please try again later.", 500)
    );
  }

  if (!user) {
    return next(new NewError("Could not find user for this id.", 404));
  }

  const { firstname, lastname, email, role } = req.body;

  user = new User(firstname, lastname, email, role, "Active");

  try {
    user.update(id);
  } catch (e) {
    return next(
      new NewError("Updating user failed, please try again later.", 500)
    );
  }

  res.status(201).json({
    message: "User has been updated successfully.",
    user,
  });
};

const getAllUsers = async (req, res, next) => {
  let users;
  try {
    const [rows] = await User.getAllUsers();
    users = rows;
  } catch (e) {
    return next(
      new NewError("Fetching users failed, please try again later.", 500)
    );
  }

  res.status(200).json({
    users,
  });
};

const getOneUser = async (req, res, next) => {
  const id = req.params.id;
  let user;
  try {
    const [row] = await User.getUserById(id);
    user = row[0];
  } catch (e) {
    return next(
      new NewError("Fetching user failed, please try again later.", 500)
    );
  }

  if (!user) {
    return next(new NewError("Could not find user for this id.", 404));
  }

  res.status(200).json({
    user,
  });
};

const deleteUser = async (req, res, next) => {
  const id = req.params.id;
  let user;
  try {
    const [row] = await User.getUserById(id);
    user = row[0];
  } catch (e) {
    return next(new NewError("Something went wrong, try again later.", 500));
  }

  if (!user) {
    return next(new NewError("Could not find user for this id.", 404));
  }

  try {
    await User.deleteById(id);
  } catch (e) {
    return next(new NewError("Deleting user failed, try again later.", 500));
  }

  res.status(200).json({
    message: "User has been deleted",
    user,
  });
};

exports.getAllUsers = getAllUsers;
exports.getOneUser = getOneUser;
exports.createUser = createUser;
exports.deleteUser = deleteUser;
exports.editUser = editUser;
