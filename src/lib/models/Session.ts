import mongoose from "mongoose";

interface Session extends mongoose.Document {
  user_id: string;
  active_expires: number;
  idle_expires: number;
}

const SessionSchema = new mongoose.Schema<Session>(
  {
    _id: {
      type: String,
      required: true,
    },
    user_id: {
      type: String,
      required: true,
    },
    active_expires: {
      type: Number,
      required: true,
    },
    idle_expires: {
      type: Number,
      required: true,
    },
  } as const,
  { _id: false }
);

export default mongoose.models.Session ||
  mongoose.model<Session>("Session", SessionSchema);
