const express = require("express");
const userController = require("../controllers/userControllers");
const authController = require("../controllers/authController");

const router = express.Router();
// users/signup
router.post("/signup", authController.signup);
router.post("/login", authController.login);

router.get("/logout", authController.logout);

router.post("/forgetPassword", authController.forgetPassword);
router.patch("/resetPassword/:token", authController.resetPassword);

router.patch(
	"/updateMyPassword/",
	authController.protect,
	authController.updatePassword
);
// updating current login user his profile
router.get(
	"/me",
	authController.protect,
	userController.getMe,
	userController.getUser
);
router.patch("/updateMe", authController.protect, userController.updateMe);
router.delete("/deleteMe", authController.protect, userController.deleteMe);
router
	.route("/")
	.get(userController.getAllUsers)
	.post(userController.createUser);
router
	.route("/:id")
	.get(userController.getUser)
	.patch(userController.updateUser)
	.delete(
		authController.protect,
		authController.restrictTo("admin"),
		userController.deleteUser
	);

module.exports = router;
