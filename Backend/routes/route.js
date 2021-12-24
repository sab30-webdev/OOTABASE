const express = require("express");
const router = express.Router();
const sql = require("mssql");
const config = require("../config");

router.get("/custinfo/:tno", (req, res) => {
  sql.connect(config, (err) => {
    if (err) console.error(err);

    let { tno } = req.params;

    try {
      var request = new sql.Request();
      request.query(
        `SELECT * FROM CUSTOMER WHERE tno='${tno}'`,
        (err, data) => {
          if (err) return res.send("error");
          res.send(data.recordset);
        }
      );
    } catch (error) {
      console.error(error);
    }
  });
});

router.post("/clear/:tno", (req, res) => {
  sql.connect(config, (err) => {
    if (err) console.error(err);

    let { tno } = req.params;
    let {cname,cphone,billamt}=req.body;

    try {
      var request = new sql.Request();
      request.query(
        `DELETE FROM CUSTOMER WHERE tno=${tno};
        DELETE FROM ORDER_ITEM WHERE tno=${tno};
        UPDATE TABLELIST SET t_status=0 where tno=${tno};
        INSERT INTO TRANSACTIONS (cname,cphone,billamt) VALUES('${cname}',${cphone},${billamt})
        `,
        (err, data) => {
          if (err) return res.send(err);
          res.send("success");
        }
      );
    } catch (error) {
      console.error(error);
    }
  });
});

router.post("/tablecheck", (req, res) => {
  sql.connect(config, (err) => {
    if (err) console.error(err);

    let { tno } = req.body;

    try {
      var request = new sql.Request();
      request.query(`SELECT * FROM TABLELIST WHERE tno=${tno}`, (err, data) => {
        res.send(data.recordset);
      });
    } catch (error) {
      console.error(error);
    }
  });
});

router.get("/bill/:tno", (req, res) => {
  sql.connect(config, (err) => {
    if (err) console.error(err);

    let { tno } = req.params;

    try {
      var request = new sql.Request();
      request.query(
        `SELECT itemname,price,qty,rate FROM ORDER_ITEM O,MENU M WHERE O.itemid=M.itemid AND tno=${tno}`,
        (err, data) => {
          if (err) return res.send(err);
          res.send(data.recordset);
        }
      );
    } catch (error) {
      console.error(error);
    }
  });
});

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
