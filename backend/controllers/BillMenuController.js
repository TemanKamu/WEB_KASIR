import BillMenu from "../models/BillMenu.js";
import BillDetails from "../models/BillDetails.js";
import Menu from "../models/Menu.js";
import { Op } from "sequelize";
const countDetailPrice = () => {};
export const getAllBillMenu = async (req, res) => {
  await BillMenu.findAll({
    include: [
      {
        model: Menu,
      },
    ],
    where: {
      noTransaction: req.params.uuid,
    },
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

export const createBillMenu = async (req, res) => {
  const { noTransaction, menuId, amount, price, charge } = req.body;

  await BillMenu.create({
    userId: req.session.userId,
    noTransaction: noTransaction,
    menuId: menuId,
    amount: amount,
    price: price,
  })
    .then(async (data) => {
      const menu = await Menu.findAll({
        where: {
          id: data.menuId,
        },
      });
      return res.status(200).json({
        status: "success",
        message: "Data has been successfully created",
        data: {
          noTransaction: data.noTransaction,
          menuId: data.menuId,
          amount: data.amount,
          price: data.price,
          menu,
        },
      });
    })
    .catch((err) => {
      return res.status(400).json({
        status: "failed",
        message: err.message,
      });
    });
  // const latestBillMenu = await BillMenu.findOne({
  //   order: [["id", "DESC"]],
  // });

  // let noTransactionGenerator;
  // let noTransactionBefore;
  // let dataNow;
  // if (charge) {
  //   await BillDetails.create({
  //     userId: userId,
  //     billMenuId: dataNow.id,
  //     noTransaction: noTransactionBefore,
  //     total_price: detailCount.data.total,
  //     cash: detailCount.data.tunai,
  //     change: detailCount.data.kembali,
  //     tax: detailCount.data.tax,
  //   })
  //     .then((value) => {
  //       noTransactionBefore = "";
  //       dataNow = "";
  //       return res.status(200).json({
  //         status: "success",
  //         message: "Data has been successfully created",
  //         data: value,
  //       });
  //     })
  //     .catch((err) => {
  //       return res.status(400).json({
  //         status: "failed",
  //         message: err.message,
  //       });
  //     });
  // } else {
  //   if (!dataNow && !noTransactionBefore) {
  //     noTransactionGenerator = !latestBillMenu
  //       ? "NO_TRANSACTION_1"
  //       : `NO_TRANSACTION_${Number(latestBillMenu.id) + 1}`;
  //     noTransactionBefore = noTransactionGenerator;
  //     await BillMenu.create({
  //       noTransaction: noTransactionGenerator,
  //       menuId: menuId,
  //       amount: amount,
  //       price: price,
  //     })
  //       .then((value) => {
  //         dataNow = value;
  //         noTransactionBefore = value.noTransaction;
  //         return res.status(200).json({
  //           status: "success",
  //           message: "Data has been successfully created",
  //           data: value,
  //         });
  //       })
  //       .catch((err) => {
  //         return res.status(400).json({
  //           status: "failed",
  //           message: err.message,
  //         });
  //       });
  //   } else {
  //     await BillMenu.create({
  //       menuId: menuId,
  //       amount: amount,
  //       price: price,
  //       noTransaction: dataNow.noTransaction,
  //     })
  //       .then((value) => {
  //         return res.status(200).json({
  //           status: "success",
  //           message: "Data has been successfully created",
  //           data: value,
  //         });
  //       })
  //       .catch((err) => {
  //         return res.status(400).json({
  //           status: "failed",
  //           message: err.message,
  //         });
  //       });
  //   }
  // }
};

export const updateBillMenuCount = async (req, res) => {
  const { id } = req.params;
  const { type } = req.body;
  const menu = await BillMenu.findOne({
    where: {
      [Op.and]: [
        {
          menuId: id,
        },
        {
          noTransaction: req.body.noTransaction,
        },
      ],
    },
  });
  if (!menu || menu === null) {
    return res.status(404).json({
      status: "failed",
      message: "Data not found",
      data: id,
    });
  }
  let countAmount;

  if (type === "-") {
    countAmount = menu.amount - 1;
  } else {
    countAmount = menu.amount + 1;
  }

  await BillMenu.update(
    {
      amount: countAmount,
    },
    {
      where: {
        menuId: id,
      },
    }
  )
    .then(() => {
      return res.status(200).json({
        status: "success",
        message: "Data has been successfully updated",
        data: countAmount,
      });
    })
    .catch((err) => {
      return res.status(400).json({
        status: "failed",
        message: err.message,
      });
    });
};
export const deleteBillMenu = async (req, res) => {
  const { id } = req.params;
  try {
    const menu = await BillMenu.findByPk(id);

    if (!menu) {
      return res.status(404).json({
        status: "failed",
        message: "Data not found",
        data: id,
      });
    }

    await menu.destroy();

    return res.status(200).json({
      status: "success",
      message: "Data has been successfully deleted",
    });
  } catch (err) {
    return res.status(500).json({
      status: "failed",
      message: err.message,
    });
  }
};

export const deleteBillMenuAll = async (req, res) => {
  const { uuid } = req.params;
  const menu = await BillMenu.findAll({
    where: {
      noTransaction: uuid,
    },
  });
  if (!menu || menu === null) {
    return res.status(404).json({
      status: "failed",
      message: "Data not found",
      data: id,
    });
  }
  await BillMenu.destroy({
    where: {
      noTransaction: uuid,
    },
  })
    .then(() => {
      return res.status(200).json({
        status: "success",
        message: "All Data has been successfully deleted",
      });
    })
    .catch((err) => {
      return res.status(400).json({
        status: "failed",
        message: err.message,
      });
    });
};
