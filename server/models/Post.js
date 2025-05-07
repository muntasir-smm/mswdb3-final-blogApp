// server/models/Post.js

import mongoose from "mongoose";

const postSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "Please provide a title"],
      trim: true,
      maxlength: [120, "Title cannot be more than 120 characters"],
    },
    content: {
      type: String,
      required: [true, "Please provide content"],
    },
    excerpt: {
      type: String,
      maxlength: 200,
    },
    coverImage: {
      public_id: String,
      url: String,
    },
    tags: [
      {
        type: String,
        trim: true,
      },
    ],
    author: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    likes: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      },
    ],
    likesCount: {
      type: Number,
      default: 0,
    },
    status: {
      type: String,
      enum: ["draft", "published", "flagged"],
      default: "draft",
    },
    createdAt: {
      type: Date,
      default: Date.now,
    },
    updatedAt: {
      type: Date,
    },
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

// Update timestamp before save
postSchema.pre("save", function (next) {
  this.updatedAt = Date.now();
  next();
});

// Virtual populate comments
postSchema.virtual("comments", {
  ref: "Comment",
  foreignField: "post",
  localField: "_id",
});

// Auto-generate excerpt
postSchema.pre("save", function (next) {
  if (this.isModified("content")) {
    this.excerpt = this.content.substring(0, 200) + "...";
  }
  next();
});

export default mongoose.model("Post", postSchema);
