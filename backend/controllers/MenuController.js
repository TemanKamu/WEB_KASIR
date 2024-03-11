import Menu from "../models/Menu.js";
import CategoryMenu from "../models/CategoryMenu.js";
import fs from "fs";
import path from "path";
import { Sequelize } from "sequelize";
import { Op } from "sequelize";
import { v4 as uuidv4 } from 'uuid';
export const getAllMenu = async (req, res) => {
  const userId = req.session.userId;
  await Menu.findAll({
    include: [
      {
        model: CategoryMenu,
      },
    ],
    where: {
      userId: userId,
    },
    order: [
      [
        Sequelize.literal(
          "FIELD(`category_menu`.`name`, 'FOOD', 'DRINK', 'SNACK', 'DESSERT')"
        ),
      ],
    ],
  })
    .then((data) => {
      const apiData = data.map((menuItem) => ({
        id: menuItem.id,
        name: menuItem.name,
        desc: menuItem.desc,
        priceFormat: `Rp, ${menuItem.price.toLocaleString()}`,
        price: menuItem.price,
        picture: menuItem.picture,
        picture_url: menuItem.picture_url,
        categoryId: menuItem.categoryId,
        category_menu: menuItem.category_menu,
      }));
      return res.status(200).json({
        status: "success",
        message: "Data has been successfully retrieved",
        data: apiData,
        userId: userId,
      });
    })
    .catch((err) => {
      return res.status(400).json({
        status: "failed",
        message: err.message,
      });
    });
};
export const getMenuById = async (req, res) => {
  await Menu.findOne({
    where: {
      [Op.and]: [{ id: Number(req.params.id) }, { userId: req.session.userId }],
    },
    include: [
      {
        model: CategoryMenu,
      },
    ],
  })
    .then((data) => {
      if (!data || data === null)
        return res.status(404).json({
          status: "failed",
          message: "Data not found",
          dataClient: {
            id: Number(req.params.id),
            userId: req.session.userId,
          },
        });
      const apiData = {
        id: data.id,
        name: data.name,
        desc: data.desc,
        priceFormat: `Rp, ${data.price.toLocaleString()}`,
        price: data.price,
        picture: data.picture,
        picture_url: data.picture_url,
        categoryId: data.categoryId,
        category_menu: data.category_menu,
      };
      return res.status(200).json({
        status: "success",
        message: "Data has been successfully retrieved",
        data: apiData,
      });
    })
    .catch((err) => {
      return res.status(400).json({
        status: "failed",
        message: err.message,
      });
    });
};
export const getMenuByCategory = async (req, res) => {
  const userId = req.session.userId;
  await Menu.findAll({
    where: {
      [Op.and]: [{ categoryId: req.params.id }, { userId: userId }],
    },
    include: [
      {
        model: CategoryMenu,
      },
    ],
  })
    .then((data) => {
      const apiData = data.map((menuItem) => ({
        id: menuItem.id,
        name: menuItem.name,
        desc: menuItem.desc,
        priceFormat: `Rp, ${menuItem.price.toLocaleString()}`,
        price: menuItem.price,
        picture: menuItem.picture,
        picture_url: menuItem.picture_url,
        categoryId: menuItem.categoryId,
        category_menu: menuItem.category_menu,
      }));
      return res.status(200).json({
        status: "success",
        message: "Data has been successfully retrieved",
        data: apiData,
        userId: userId,
      });
    })
    .catch((err) => {
      return res.status(400).json(err);
    });
};
export const getMenuBySearch = async (req, res) => {
  const userId = req.session.userId;
  await Menu.findAll({
    where: {
      userId: userId,
      name: { [Op.like]: `%${req.params.menu}%` },
    },
    include: [
      {
        model: CategoryMenu,
      },
    ],
  })
    .then((data) => {
      const apiData = data.map((menuItem) => ({
        id: menuItem.id,
        name: menuItem.name,
        desc: menuItem.desc,
        priceFormat: `Rp, ${menuItem.price.toLocaleString()}`,
        price: menuItem.price,
        picture: menuItem.picture,
        picture_url: menuItem.picture_url,
        categoryId: menuItem.categoryId,
        category_menu: menuItem.category_menu,
      }));
      return res.status(200).json({
        status: "success",
        message: "Data has been successfully retrieved",
        data: apiData,
        userId: userId,
      });
    })
    .catch((err) => {
      return res.status(400).json({
        status: "failed",
        message: err.message,
      });
    });
};
export const createMenu = async (req, res) => {
  if (!req.files || req.files === null)
    return res.status(400).json({
      status: "failed",
      message: "Image is required",
    });

  const file = req.files.image;
  const ext = path.extname(file.name);
  const fileName = uuidv4() + ext;
  const fileSize = file.data.length;
  const urlImage = `${req.protocol}://${req.get(
    "host"
  )}/images/menu/${fileName}`;
  const allowedExt = [".jpg", ".svg", ".png", ".jpeg"];
  if (!allowedExt.includes(ext.toLowerCase())) {
    return res.status(400).json({
      status: "failed",
      message: "Extension not allowed",
    });
  }
  file.mv(`./public/images/menu/${fileName}`, (err) => {
    if (err) {
      return res.status(500).json({
        status: "failed",
        message: err.message,
      });
    }

    Menu.create({
      name: req.body.name,
      desc: req.body.desc,
      price: req.body.price,
      picture: fileName,
      picture_url: urlImage,
      categoryId: req.body.categoryId ? req.body.categoryId : 1,
      userId: req.session.userId,
    })
      .then((data) => {
        const apiData = {
          id: data.id,
          name: data.name,
          desc: data.desc,
          price: `Rp, ${data.price.toLocaleString()}`,
          picture: data.picture,
          picture_url: data.picture_url,
          categoryId: data.categoryId,
        };
        return res.status(200).json({
          status: "success",
          message: "Data has been successfully created",
          data: apiData,
          userId: req.session.userId,
        });
      })
      .catch((err) => {
        return res.status(400).json({
          status: "failed",
          message: err.message,
        });
      });
  });
};
export const updateMenu = async (req, res) => {
  const menu = await Menu.findOne({
    where: {
      [Op.and]: [
        { id: parseInt(req.params.id) },
        { userId: req.session.userId },
      ],
    },
  });
  if (!menu || menu === null)
    return res.status(404).json({
      status: "failed",
      message: "Data not found",
      dataMenu: {
        menuId: parseInt(req.params.id),
        userId: req.session.userId,
      },
    });

  let fileName;
  let urlImage;
  if (req.files) {
    const file = req.files.image;
    const ext = path.extname(file.name);
    fileName = uuidv4() + ext;
    const fileSize = file.data.length;
    urlImage = `${req.protocol}://${req.get("host")}/images/menu/${fileName}`;
    const allowedExt = [".jpg", ".svg", ".png", ".jpeg"];
    if (!allowedExt.includes(ext.toLowerCase())) {
      return res.status(400).json({
        status: "failed",
        message: "Extension not allowed",
      });
    }
    fs.unlinkSync(`./public/images/menu/${menu.picture}`);
    file.mv(`./public/images/menu/${fileName}`, (err) => {
      if (err) {
        return res.status(500).json({
          status: "failed",
          message: err.message,
        });
      }
    });
  } else {
    fileName = menu.picture;
    urlImage = menu.picture_url;
  }

  Menu.update(
    {
      name: req.body.name,
      desc: req.body.desc,
      price: req.body.price,
      picture: fileName,
      picture_url: urlImage,
      categoryId: req.body.categoryId,
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
        message: "Data has been successfully created",
      });
    })
    .catch((err) => {
      return res.status(400).json({
        status: "failed",
        message: err.message,
      });
    });
};
export const deleteMenu = async (req, res) => {
  const menu = await Menu.findOne({
    where: {
      [Op.and]: [{ id: req.params.id }, { userId: req.session.userId }],
    },
  });
  if (!menu || menu === null)
    return res.status(404).json({
      status: "failed",
      message: "Data not found",
    });
  if (fs.existsSync(`./public/images/menu/${menu.picture}`)) {
    fs.unlinkSync(`./public/images/menu/${menu.picture}`);
  }
  menu
    .destroy()
    .then((data) => {
      return res.status(200).json({
        status: "success",
        message: "Data has been successfully deleted",
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
