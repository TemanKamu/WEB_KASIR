import BillDetails from "../models/BillDetails.js";
import BillMenu from "../models/BillMenu.js";
import Users from "../models/Users.js";
import Menu from "../models/Menu.js";
import CategoryMenu from "../models/CategoryMenu.js";
export const getAllBillDetails = async (req, res) => {
  await BillDetails.findAll({
    include: [
      {
        model: Users,
      },
      {
        model: BillMenu,
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
export const getBillDetailsById = async (req, res) => {
  const billMenu = await BillMenu.findAll({
    where: {
      noTransaction: req.params.uuid,
      userId: req.session.userId,
    },
    include: [
      {
        model: Menu,
      },
    ],
  });
  await BillDetails.findOne({
    include: [
      {
        model: Users,
      },
      {
        model: BillMenu,
        include: [
          {
            model: Menu,
          },
        ],
      },
    ],
    where: {
      noTransaction: req.params.uuid,
      userId: req.session.userId,
    },
  }).then((data) => {
    if (!data) {
      return res.status(404).json({
        status: "failed",
        message: "Data not found",
      });
    }
    return res.status(200).json({
      status: "success",
      message: "Data has been successfully retrieved",
      data: {
        billDetail: data,
        billMenu: billMenu,
      },
    });
  });
};
export const createBillDetail = async (req, res) => {
  const { userId, billMenuId, noTransaction, totalPrice, cash, change, tax } =
    req.body;

  await BillDetails.create({
    userId: req.session.userId,
    billMenuId,
    noTransaction,
    total_price: totalPrice,
    cash,
    change,
  })
    .then((value) => {
      return res.status(200).json({
        status: "success",
        message: "Data has been successfully created",
        data: value,
      });
    })
    .catch((err) => {
      return res.status(400).json({
        status: "failed",
        message: err.message,
      });
    });
};
export const deleteBillDetail = async (req, res) => {
  const data = await BillDetails.findOne({
    where: {
      noTransaction: req.params.uuid,
    },
  });
  if (!data || data === null)
    return res.status(404).json({
      status: "failed",
      message: "Data not found",
    });

  await BillMenu.destroy({
    where: {
      noTransaction: data.noTransaction,
    },
  })
    .then(async (data) => {
      BillDetails.destroy({
        where: {
          noTransaction: data.noTransaction,
        },
      });
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
