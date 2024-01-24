import mongoose from "mongoose";

interface User extends mongoose.Document {
  name: string;
  username: string;
}

const UserSchema = new mongoose.Schema<User>(
  {
    _id: {
      type: String,
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
    username: {
      type: String,
      required: true,
      unique: true,
    },
  } as const,
  { _id: false, timestamps: true }
);

export default mongoose.models.User || mongoose.model<User>("User", UserSchema);
