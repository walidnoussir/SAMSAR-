import mongoose from "mongoose";

const propertySchema = new mongoose.Schema(
  {
    // =========================
    // Property Information
    // =========================

    title: {
      type: String,
      required: [true, "Property title is required"],
      trim: true,
      minlength: [5, "Title must be at least 5 characters"],
      maxlength: [100, "Title cannot exceed 100 characters"],
    },

    description: {
      type: String,
      required: [true, "Property description is required"],
      trim: true,
      minlength: [10, "Description must be at least 10 characters"],
      maxlength: [2000, "Description cannot exceed 2000 characters"],
    },

    price: {
      type: Number,
      required: [true, "Property price is required"],
      min: [0, "Price cannot be negative"],
    },

    propertyType: {
      type: String,
      required: [true, "Property type is required"],
      enum: {
        values: ["Apartment", "House", "Studio", "Villa", "Room"],
        message: "Invalid property type",
      },
    },

    // =========================
    // Location
    // =========================

    location: {
      city: {
        type: String,
        required: [true, "City is required"],
        trim: true,
      },

      address: {
        type: String,
        required: [true, "Address is required"],
        trim: true,
      },

      latitude: {
        type: Number,
        required: [true, "Latitude is required"],
        min: [-90, "Invalid latitude"],
        max: [90, "Invalid latitude"],
      },

      longitude: {
        type: Number,
        required: [true, "Longitude is required"],
        min: [-180, "Invalid longitude"],
        max: [180, "Invalid longitude"],
      },
    },

    // =========================
    // Property Details
    // =========================

    bedrooms: {
      type: Number,
      min: [0, "Bedrooms cannot be negative"],
      default: 0,
    },

    bathrooms: {
      type: Number,
      min: [0, "Bathrooms cannot be negative"],
      default: 0,
    },

    surface: {
      type: Number,
      min: [0, "Surface cannot be negative"],
      default: 0,
    },

    // =========================
    // Media
    // =========================

    images: {
      type: [String],
      default: [],
    },

    video: {
      type: String,
      default: "",
    },

    // =========================
    // Status
    // =========================

    status: {
      type: String,
      enum: {
        values: ["available", "rented"],
        message: "Invalid property status",
      },
      default: "available",
    },

    // =========================
    // Owner
    // =========================

    owner: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: [true, "Property owner is required"],
    },
  },
  {
    timestamps: true,
  },
);

// Indexes for search/filtering
propertySchema.index({ "location.city": 1 });
propertySchema.index({ propertyType: 1 });
propertySchema.index({ status: 1 });
propertySchema.index({ owner: 1 });

const Property = mongoose.model("Property", propertySchema);

export default Property;
