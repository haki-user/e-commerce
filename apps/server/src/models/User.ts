import mongoose, { Document, Schema } from "mongoose";

export interface IUser extends Document {
  firstName: string;
  lastName: string;
  username: string;
  password: string;
}

const userSchema = new Schema({
  firstName: { type: String, required: true, trim: true, minlength: 3 },
  lastName: { type: String, required: true, trim: true, minlength: 3 },
  username: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    minlength: 3,
  },
  password: { type: String, required: true, trim: true, minlength: 3 },
});

const User = mongoose.model<IUser>("User", userSchema);

export default User;
