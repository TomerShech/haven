import mongoose from "mongoose";

interface Key extends mongoose.Document {
  user_id: string;
  hashed_password: string;
}

const KeySchema = new mongoose.Schema<Key>(
  {
    _id: {
      type: String,
      required: true,
    },
    user_id: {
      type: String,
      required: true,
    },
    hashed_password: { type: String },
  } as const,
  { _id: false }
);

export default mongoose.models.Key || mongoose.model<Key>("Key", KeySchema);
