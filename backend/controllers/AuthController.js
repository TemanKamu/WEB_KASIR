import Users from "../models/Users.js";
import Roles from "../models/Roles.js";
import argon2 from "argon2";

export const Login = async (req, res) => {
  const user = await Users.findOne({
    where: {
      email: req.body.email,
    },
  });

  if (!user || user === null)
    return res.status(400).json({
      status: "failed",
      message: "User not found",
      typeError: "user"
    });

  const roleUser = await Roles.findOne({
    where: {
      id: user.roleId,
    },
  });
  const match = await argon2.verify(user.password, req.body.password);
  if (!match)
    return res.status(400).json({
      status: "failed",
      message: "Wrong password",
      typeError: "password" 
    });
  req.session.userUUID = user.uuid;
  req.session.userId = user.id;
  const uuid = user.uuid;
  const name = user.name;
  const email = user.email;
  const role = roleUser.name;
  return res.status(200).json({
    status: "success",
    message: "Login success",
    data: {
      uuid,
      name,
      email,
      role,
    },
  });
};
export const  LoginSession = async (req, res) => {
  if (!req.session.userId) {
    return res.status(403).json({
      status: "failed",
      message: "Please login first",
      typeError: "session"
    });
  }
  const user = await Users.findOne({
    attributes: ['id','uuid','name','email','roleId'],
    where: {
      uuid: req.session.userUUID,
    },
  });

  if (!user || user === null)
    return res.status(400).json({
      status: "failed",
      message: "User not found",
    });

    return res.status(200).json(user)
};
export const Logout = async (req, res) => {
  req.session.destroy((err) => {
    if (err) {
      return res.status(400).json({
        status: "failed",
        message: err.message,
      });
    }
    return res.status(200).json({
      status: "success",
      message: "Logout success",
    });
  });
};
