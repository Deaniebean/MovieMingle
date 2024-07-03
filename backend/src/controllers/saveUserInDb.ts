import {User} from "../models/mongooseUsers";
import UserModel from "../models/userModel";

export const saveUserInDb = async (userModel:  UserModel): Promise<void> => {

    console.log("saveUserInMongo");
    const user = new User({
      username: userModel.username,
      password: userModel.password,
      uuid: userModel.uuid,
      watch_list: [],
      history: []
    });

    // save the new user
    await user.save();
  }
