const express = require("express");
const userController = require("../controllers/userControllers");
const authController = require("../controllers/authController");

const router = express.Router();

/**
 * @swagger
 * /users:
 *   get:
 *     summary: Get all users
 *     description: Get all users
 *     responses:
 *       '200':
 *         description: OK
 *
 */

/**
 * @swagger
 * /users/login:
 *   post:
 *     summary: Submit a form
 *     description: Submit a form with the provided data
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *                 description: The email of the user
 *               password:
 *                 type: string
 *                 description: The password address of the user
 *             required:
 *               - email
 *               - password
 *     responses:
 *       '200':
 *         description: Successful login
 *       '401':
 *         description: Unauthorized - invalid credentials
 *       '500':
 *         description: Internal server error
 */
// users/signup
router.post("/signup", authController.signup);
router.post("/login", authController.login);

router.get("/logout", authController.logout);

router.post("/forgetPassword", authController.forgetPassword);
router.patch("/resetPassword/:token", authController.resetPassword);

// Middleware function work in sequence so after this middleware all the route require to auth
// protect all the routes after this middleware
router.use(authController.protect);

router.patch(
	"/updateMyPassword/",
	authController.protect,
	authController.updatePassword
);
// updating current login user his profile
router.get("/me", userController.getMe, userController.getUser);
router.patch(
	"/updateMe",
	userController.uploadUserPhoto,
	userController.resizeUserPhoto,
	userController.updateMe
);
router.delete("/deleteMe", userController.deleteMe);
router
	.route("/")
	.get(userController.getAllUsers)
	.post(userController.createUser);
router
	.route("/:id")
	.get(userController.getUser)
	.patch(userController.updateUser)
	.delete(authController.restrictTo("admin"), userController.deleteUser);

module.exports = router;
