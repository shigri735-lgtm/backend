import mongoose from "mongoose";

const timelineSchema = new mongoose.Schema({
  title: {
    type: String,
  },
  description: {
    type: String,
  },
  clientName: {
    type: String,
    required: [true, "Client name required!"],
  },
  review: {
    type: String,
    required: [true, "Review text required!"],
  },
  company: {
    type: String,
  },
  role: {
    type: String,
  },
  timeline: {
    from: {
      type: String,
    },
    to: {
      type: String,
    },
  },
});

export const Timeline = mongoose.model("Timeline", timelineSchema);
