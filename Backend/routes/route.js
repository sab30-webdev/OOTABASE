const express = require("express");
const router = express.Router();
const sql = require("mssql");
const config = require("../config");

router.post("/booktable", (req, res) => {
  sql.connect(config, (err) => {
    if (err) console.error(err);

    const { t_status, tno, cname, cphone } = req.body;

    try {
      var request = new sql.Request();
      request.query(
        `UPDATE TABLELIST SET t_status=${t_status} WHERE tno=${tno};
        INSERT INTO CUSTOMER VALUES(${tno},'${cname}',${cphone},'')`,
        (err, data) => {
          res.send(`Updated Table status for table ${tno}`);
        }
      );
    } catch (error) {
      console.error(error);
    }
  });
});

router.get("/menu", (req, res) => {
  sql.connect(config, (err) => {
    if (err) console.error(err);

    try {
      var request = new sql.Request();
      request.query(`SELECT * FROM MENU`, (err, data) => {
        res.send(data.recordset);
      });
    } catch (error) {
      console.error(error);
    }
  });
});

router.post("/order", (req, res) => {
  sql.connect(config, (err) => {
    if (err) console.error(err);

    const { tno, itemid, qty, price, orderid, i_status } = req.body;

    try {
      var request = new sql.Request();
      request.query(
        `INSERT INTO ORDER_ITEM VALUES(${tno},${itemid},${qty},${price},'${orderid}',${i_status});
      UPDATE CUSTOMER SET orderid = '${orderid}' where tno=${tno}`,
        (err, data) => {
          if (err) return res.send(err);
          else return res.send("Success");
        }
      );
    } catch (error) {
      console.error(error);
    }
  });
});

module.exports = router;
