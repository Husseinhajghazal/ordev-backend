const express = require("express");
const { body } = require("express-validator");
const usersControllers = require("../controllers/users-controllers");

const router = express.Router();

router.get("/", usersControllers.getAllUsers);

router.post(
  "/",
  [
    body("firstname").trim().notEmpty().withMessage("First name required"),
    body("lastname").trim().notEmpty().withMessage("Last name required"),
    body("email")
      .trim()
      .notEmpty()
      .withMessage("email required")
      .isEmail()
      .withMessage("Please enter a valid email."),
    body("role").trim().notEmpty().withMessage("Role required"),
  ],
  usersControllers.createUser
);

router.put(
  "/:id",
  [
    body("firstname").trim().notEmpty().withMessage("First name required"),
    body("lastname").trim().notEmpty().withMessage("Last name required"),
    body("email")
      .trim()
      .notEmpty()
      .withMessage("email required")
      .isEmail()
      .withMessage("Please enter a valid email."),
    body("role").trim().notEmpty().withMessage("Role required"),
  ],
  usersControllers.editUser
);

router.get("/:id", usersControllers.getOneUser);

router.delete("/:id", usersControllers.deleteUser);

module.exports = router;
