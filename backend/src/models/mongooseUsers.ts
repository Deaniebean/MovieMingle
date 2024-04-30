// I added my own unique id to store in the Session, this will be used to to save movies for a specific user
// (the Unique_id from Mongodb would make testing with jest unnecessarily complicated)
import mongoose from 'mongoose';

const UserSchema = new mongoose.Schema({
  uuid: {
    type: String,
    required: [true, "Please enter a UUID"],
    unique: [true, "This UUID already exists"],
  },
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