const express = require("express");
const tourController = require("./../controllers/tourControllers");
const authController = require("./../controllers/authController");
// const reviewController = require("../controllers/reviewController");
const reviewRouter = require("./../routes/reviewRoutes");
const router = express.Router();
/**
 * @swagger
 * /tours:
 *   get:
 *     summary: Get all tours
 *     description: Get all tours
 *     responses:
 *       '200':
 *         description: OK
 */
/**
 * @swagger
 * /tours/top-5-cheaps:
 *   get:
 *     summary: Get all users
 *     description: Alias Top5 Cheap Tours
 *     responses:
 *       '200':
 *         description: OK
 *
 */

router.use("/:tourId/reviews", reviewRouter);

router
	.route("/top-5-cheaps")
	.get(tourController.aliasTopTours, tourController.getAllTours);

router
	.route("/tours-within/:distance/center/:latlng/unit/:unit")
	.get(tourController.getToursWithin);

router.route("/distances/:latlng/unit/:unit").get(tourController.getDistances);

router
	.route("/")
	.get(tourController.getAllTours)
	.post(tourController.createTour);

router
	.route("/:id")
	.get(tourController.getTour)
	.patch(tourController.updateTour)
	.delete(
		// authController.protect,
		// authController.restrictTo("lead-guide", "admin"),
		tourController.deleteTour
	);

module.exports = router;
