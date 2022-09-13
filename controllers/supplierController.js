const { StatusCodes } = require("http-status-codes");
const { NotFound, BadRequest } = require("../errors");
const Supplier = require("../models/Supplier");

const createSupplier = async (req, res) => {
  const { supplierName, contactName } = req.body;

  if (!supplierName || !contactName) {
    throw new BadRequest("Please provide all values");
  }

  const supplier = await Supplier.create({ ...req.body });
  res.status(StatusCodes.CREATED).json({ supplier });
};

const getAllSuppliers = async (req, res) => {
  const suppliers = await Supplier.find({});
  res.status(StatusCodes.OK).json({ count: suppliers.length, suppliers });
};

const getSingleSupplier = async (req, res) => {
  const { id: supplierId } = req.params;

  const supplier = await Supplier.findOne({ _id: supplierId });

  if (!supplier) {
    throw new NotFound(`Not item can be found with id: ${supplierId}`);
  }

  res.status(StatusCodes.OK).json({ supplier });
};

const updateSupplier = async (req, res) => {
  const { id: supplierId } = req.params;

  const supplier = await Supplier.findOneAndUpdate(
    { _id: supplierId },
    { ...req.body },
    { new: true, runValidators: true }
  );

  if (!supplier) {
    throw new NotFound(`Not item can be found with id: ${supplierId}`);
  }

  res.status(StatusCodes.OK).json({ supplier });
};

const deleteSupplier = async (req, res) => {
  const { id: supplierId } = req.params;

  const supplier = await Supplier.findOne({ _id: supplierId });

  if (!supplier) {
    throw new NotFound(`Not item can be found with id: ${supplierId}`);
  }

  await supplier.remove();

  res.status(StatusCodes.OK).json({ msg: "Deleted Successfully" });
};

module.exports = {
  createSupplier,
  getAllSuppliers,
  getSingleSupplier,
  updateSupplier,
  deleteSupplier,
};
