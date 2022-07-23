import mongoose from "mongoose";

const WordsSchema = new mongoose.Schema(
  {
    englishWord: {
      type: String,
      required: true,
      unique: true,
    },
    ukraineWord: {
      type: String,
    },
    learned: {
      type: Boolean,
      default: false,
    },
    isTop3000: {
      type: Boolean,
      default: false,
    },
    imageUrl: String,
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("Words", WordsSchema);
