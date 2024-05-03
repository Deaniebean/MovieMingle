import User from "../models/mongooseUsers";
import UserModel from "../models/userModel";

type DbStoreFunction = (userModel: UserModel) => void;

export const saveUserInDb = async (userModel:  UserModel): Promise<void> => {
    // create a new user instance and collect the data
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
