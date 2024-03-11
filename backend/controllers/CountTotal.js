export const countDetail = (req, res) => {
  let { menu, tunai } = req.body;
  let subTotal = [];
  let totalNotTax = 0;
  menu.map((value) => {
    subTotal.push(Number(value.price) * Number(value.amount));
  });
  subTotal.map((value) => {
    totalNotTax = totalNotTax + value;
  });
  const total = totalNotTax;
  const kembali = tunai - total;

  if (kembali < 0) {
    return res.status(404).json({
      status: 404,
      message: "Uang anda kurang",
    });
  } else {
    return res.status(200).json({
      status: "success",
      message: "Data has been successfully retrieved",
      data: [
        {
          tunai: tunai,
          kembali: kembali,
          total: total,
        },
        {
          formatedData: {
            tunai: Number(tunai).toLocaleString("id-ID", {
              style: "currency",
              currency: "IDR",
            }),
            kembali: kembali.toLocaleString("id-ID", {
              style: "currency",
              currency: "IDR",
            }),
            total: total.toLocaleString("id-ID", {
              style: "currency",
              currency: "IDR",
            }),
          },
        },
      ],
    });
  }
};
