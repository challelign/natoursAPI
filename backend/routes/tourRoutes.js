const express = require("express");
const tourController = require("./../controllers/tourControllers");
const authController = require("./../controllers/authController");

const router = express.Router();

router
  .route("/top-5-cheaps")
  .get(tourController.aliasTopTours, tourController.getAllTours);
router
  .route("/")
  .get(authController.protect, tourController.getAllTours)
  .post(tourController.createTour);

router
  .route("/:id")
  .get(tourController.getTour)
  .patch(tourController.updateTour)
  .delete(
    authController.protect,
    authController.restrictTo("lead-guide", "admin"),
    tourController.deleteTour
  );

module.exports = router;
