import Roles from "../models/Roles.js";

export const getAllRole = async (req, res) => {
  await Roles.findAll()
    .then(() => {
      return res.status(200).json({
        status: "success",
        message: "Data has been successfully retrieved",
        data: Roles,
      });
    })
    .catch((err) => {
      return res.status(400).json({
        status: "failed",
        message: err.message,
      });
    });
};
export const getRoleById = async (req, res) => {
  await Roles.findOne({
    where: {
      id: req.params.id,
    },
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
export const createRole = async (req, res) => {
  await Roles.create({
    name: req.body.name,
  })
    .then((data) => {
      return res.status(200).json({
        status: "success",
        message: "Data has been successfully created",
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
export const updateRole = async (req, res) => {
  await Roles.update(
    {
      name: req.body.name,
    },
    {
      where: {
        id: req.params.id,
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
export const deleteRole = async (req, res) => {
  const data = await Roles.findOne({
    where: {
      id: req.params.id,
    },
  });

  if (!data || data === null)
    return res.status(404).json({
      status: "failed",
      message: "Data not found",
    });
  await Roles.destroy({
    where: {
      id: data.id,
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
