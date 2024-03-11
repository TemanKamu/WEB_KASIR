import React, { useRef } from "react";
import { useReactToPrint } from "react-to-print";
import axios from "axios";

const Bill = ({ handlePrint }) => {
  if (handlePrint === true) {
    useReactToPrint({
      content: () => componentRef.current,
    });
  }
  return (
    <div
      ref={componentRef}
      style={{
        border: "1px solid black",
        padding: "5px",
        width: "50.5mm", // Sesuaikan dengan lebar kertas printer
        margin: "auto",
        marginTop: "10mm",
        textAlign: "center",
      }}
    >
      Nordils bills
      <br />
      <hr />
      Tanggal transaksi: 2022-01-01
      <hr />
      Ayaman kentucky 3x 23.000
    </div>
  );
};

export default Bill;
