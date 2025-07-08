import {User} from "../models/mongooseUsers";
import UserModel from "../models/userModel";
import logger from "../config/logger";

export const saveUserInDb = async (userModel:  UserModel): Promise<void> => {

    logger.debug("saveUserInMongo");
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
