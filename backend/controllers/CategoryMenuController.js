import CategoryMenu from "../models/CategoryMenu.js";
import fs from "fs";
import path from "path";
import { Op } from "sequelize";
export const getAllCategoryMenu = async (req, res) => {
  await CategoryMenu.findAll()
    .then((data) => {
      res.status(200).json({
        status: "success",
        message: "Data has been successfully retrieved",
        data: data,
        userId: req.session.userId,
      });
    })
    .catch((err) => {
      res.status(400).json({
        status: "failed",
        message: err.message,
      });
    });
};
export const getCategoryMenuById = async (req, res) => {
  await CategoryMenu.findOne({
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
      res.status(200).json({
        status: "success",
        message: "Data has been successfully retrieved",
        data: data,
      });
    })
    .catch((err) => {
      res.status(400).json({
        status: "failed",
        message: err.message,
      });
    });
};
export const createCategoryMenu = async (req, res) => {
  if (!req.files || req.files === null)
    return res.status(400).json({
      status: "failed",
      message: "Image is required",
    });
  // name category
  const name = req.body.name.toUpperCase();
  // picture
  const file = req.files.image;
  const ext = path.extname(file.name);
  const fileName = file.md5 + ext;
  const fileSize = file.data.length;
  const urlImage = `${req.protocol}://${req.get(
    "host"
  )}/images/category/${fileName}`;
  const allowedExt = [".jpg", ".svg", ".png", ".jpeg"];
  if (!allowedExt.includes(ext.toLowerCase()))
    return res.status(400).json({
      status: "failed",
      message: "Extension not allowed",
    });
  file.mv(`./public/images/category/${fileName}`, async (err) => {
    if (err)
      return res.status(500).json({
        status: "failed",
        message: err.message,
      });
    await CategoryMenu.create({
      name: name,
      picture: fileName,
      picture_url: urlImage,
      userId: req.session.userId,
    })
      .then((data) => {
        res.status(200).json({
          status: "success",
          message: "Data has been successfully created",
          data: data,
        });
      })
      .catch((err) => {
        res.status(400).json({
          status: "failed",
          message: err.message,
        });
      });
  });
};
export const updateCategoryMenu = async (req, res) => {
  const category = await CategoryMenu.findOne({
    where: {
      id: req.params.id,
    },
  });
  if (!category || category === null)
    return res.status(404).json({
      status: "failed",
      message: "Data not found",
    });
  let fileName;
  let urlImage;
  // name category
  const name = req.body.name.toUpperCase();
  if (req.files) {
    const file = req.files.image;
    const ext = path.extname(file.name);
    fileName = file.md5 + ext;
    urlImage = `${req.protocol}://${req.get(
      "host"
    )}/images/category/${fileName}`;
    const allowedType = [".jpg", ".jpeg", ".png", ".svg"];

    if (!allowedType.includes(ext.toLowerCase()))
      return res.status(400).json({
        status: "failed",
        message: "Extension not allowed",
      });

    fs.unlinkSync(`./public/images/category/${category.picture}`);
    file.mv(`./public/images/category/${fileName}`, async (err) => {
      if (err)
        return res.status(500).json({
          status: "failed",
          message: err.message,
        });
    });
  }

  await CategoryMenu.update(
    {
      name: name,
      picture: fileName,
      picture_url: urlImage,
      userId: req.session.userId,
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
export const deleteCategoryMenu = async (req, res) => {
  const category = await CategoryMenu.findOne({
    where: {
      id: req.params.id,
    },
  });
  if (!category || category === null)
    return res.status(404).json({
      status: "failed",
      message: "Data not found",
    });
  fs.unlinkSync(`./public/images/category/${category.picture}`);
  await CategoryMenu.destroy({
    where: {
      id: req.params.id,
    },
  })
    .then(() => {
      res.status(200).json({
        status: "success",
        message: "Data has been successfully deleted",
      });
    })
    .catch((err) => {
      res.status(400).json({
        status: "failed",
        message: err.message,
      });
    });
};
