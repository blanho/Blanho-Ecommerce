const express = require("express");
const router = express.Router();

const {
  createSupplier,
  deleteSupplier,
  getAllSuppliers,
  getSingleSupplier,
  updateSupplier,
  getSingleSupplierProducts,
} = require("../controllers/supplierController");

const authenticatedUser = require("../middleware/authentication");
const authorizedUser = require("../middleware/authorization");

router
  .route("/")
  .get(authenticatedUser, authorizedUser("admin"), getAllSuppliers)
  .post(authenticatedUser, authorizedUser("admin"), createSupplier);

router
  .route("/:id")
  .patch(authenticatedUser, authorizedUser("admin"), updateSupplier)
  .get(authenticatedUser, authorizedUser("admin"), getSingleSupplier)
  .delete(authenticatedUser, authorizedUser("admin"), deleteSupplier);

router.get(
  "/:id/products",
  authenticatedUser,
  authorizedUser("admin"),
  getSingleSupplierProducts
);

module.exports = router;
