const mongoose = require("mongoose");

const ProductSchema = new mongoose.Schema(
  {
    productName: {
      type: String,
      required: [true, "Please provide product name"],
      minLength: 3,
    },
    description: {
      type: String,
      required: [true, "Please provide product description"],
      maxLength: [1000, "Description can not be more than 1000 characters"],
    },
    image: {
      type: String,
      required: [true, "Please provide product image"],
    },
    price: {
      type: Number,
      required: true,
      default: 0,
    },
    colors: {
      type: [String],
      default: ["#222"],
      required: true,
    },
    featured: {
      type: Boolean,
      default: false,
    },
    freeShipping: {
      type: Boolean,
      default: false,
    },
    inStock: {
      type: Number,
      required: true,
      default: 15,
    },
    averageRating: {
      type: Number,
      default: 0,
    },
    numOfReviews: {
      type: Number,
      default: 0,
    },
    category: {
      type: mongoose.Types.ObjectId,
      ref: "Category",
      required: [true, "Please provide category"],
    },
    cloudinary_id: {
      type: String,
    },
    user: {
      type: mongoose.Types.ObjectId,
      ref: "User",
      required: true,
    },
    supplier: {
      type: mongoose.Types.ObjectId,
      ref: "Supplier",
      required: [true, "Please provide supplier"],
    },
  },
  { timestamps: true, toJSON: { virtuals: true }, toObject: { virtuals: true } }
);

ProductSchema.virtual("reviews", {
  ref: "Review",
  localField: "_id",
  foreignField: "product",
  justOne: true,
});

ProductSchema.pre("remove", async function () {
  this.model("Review").deleteMany({ product: _id });
});

module.exports = mongoose.model("Product", ProductSchema);
