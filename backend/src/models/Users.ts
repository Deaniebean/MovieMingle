import mongoose from 'mongoose';

const UserSchema = new mongoose.Schema({
  username: {
    type: String,
    required: [true, "Please enter a username"],
    unique: [true, "This username already exists"],
  },
  password: {
    type: String,
    required: [true, "Please enter a password"],
    unique: false
  },
});
const User = mongoose.model('User', UserSchema);
export default User;