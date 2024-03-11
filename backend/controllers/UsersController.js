import Users from "../models/Users.js";
import Roles from "../models/Roles.js";
import argon2 from "argon2";
export const getAllUser = async (req, res) => {
  await Users.findAll({
    include: [
      {
        model: Roles,
      },
    ],
  })
    .then((data) => {
      return res.status(200).json({
        status: "success",
        message: "Data has been successfully retrieved",
        data: data,
      });
    })
    .catch((err) => {
      return res.status(400).json({
        status: "failed",
        message: err.message,
      });
    });
};
export const getUserById = async (req, res) => {
  await Users.findOne({
    where: {
      uuid: req.params.uuid,
    },
    include: [
      {
        model: Roles,
      },
    ],
  })
    .then((data) => {
      if (!data || data === null)
        return res.status(404).json({
          status: "failed",
          message: "Data not found",
        });
      return res.status(200).json({
        status: "success",
        message: "Data has been successfully retrieved",
        data: data,
      });
    })
    .catch((err) => {
      return res.status(400).json({
        status: "failed",
        message: err.message,
      });
    });
};
export const createUser = async (req, res) => {
  const email = await Users.findOne({
    where: {
      email: req.body.email,
    },
  });
  const noHp = await Users.findOne({
    where: {
      no_hp: req.body.noHp,
    },
  });

  if (email)
    return res.status(400).json({
      status: "failed",
      message: "Email already exist",
      typeError: "email"
    });
  if (noHp)
    return res.status(400).json({
      status: "failed",
      message: "No Hp already exist",
      typeError: "noHp"
    });
  if (req.body.password !== req.body.confirmPassword) {
    return res.status(400).json({
      status: "failed",
      message: "Password and Confirm Password not matched",
    });
  }
  const hash = await argon2.hash(req.body.password);
  await Users.create({
    name: req.body.name,
    email: req.body.email,
    no_hp: req.body.noHp,
    password: hash,
    roleId: !req.body.roleId && 1,
  })
    .then((data) => {
      return res.status(200).json({
        status: "success",
        message: "Data has been successfully created",
        data,
      });
    })
    .catch((err) => {
      return res.status(400).json({
        status: "failed",
        message: err.message,
      });
    });
};
export const updateUser = async (req, res) => {
  const data = await Users.findOne({
    where: {
      uuid: req.params.uuid,
    },
  });
  if (!data || data === null)
    return res.status(404).json({
      status: "failed",
      message: "Data not found",
    });

  let hashPassworrd;
  if (req.body.password) {
    hashPassworrd = await argon2.hash(req.body.password);
  } else {
    hashPassworrd = data.password;
  }

  await Users.update(
    {
      name: req.body.name,
      email: req.body.email,
      password: hashPassworrd,
      no_hp: req.body.noHp,
      role_id: req.body.roleId,
    },
    {
      where: {
        uuid: data.uuid,
      },
    }
  )
    .then(() => {
      return res.status(200).json({
        status: "success",
        message: "Data has been successfully updated",
      });
    })
    .catch((err) => {
      return res.status(400).json({
        status: "failed",
        message: err.message,
      });
    });
};
export const deleteUser = async (req, res) => {
  const data = await Users.findOne({
    where: {
      uuid: req.params.uuid,
    },
  });
  if (!data || data === null)
    return res.status(404).json({
      status: "failed",
      message: "Data not found",
    });
  await Users.destroy({
    where: {
      uuid: data.uuid,
    },
  })
    .then(() => {
      return res.status(200).json({
        status: "success",
        message: "Data has been successfully deleted",
      });
    })
    .catch((err) => {
      return res.status(400).json({
        status: "failed",
        message: err.message,
      });
    });
};
