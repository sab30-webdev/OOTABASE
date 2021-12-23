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

router.post("/delmenu", (req, res) => {
  sql.connect(config, (err) => {
    if (err) console.error(err);

    const { itemid } = req.body;
    console.log("itemid", itemid);

    try {
      var request = new sql.Request();
      request.query(
        `DELETE FROM MENU WHERE  itemid=${itemid} `,
        (err, data) => {
          if (err) {
            res.send("Fail");
          } else {
            res.send("Delete successful");
          }
        }
      );
    } catch (error) {
      console.error(error);
    }
  });
});
// INSERT TO MENU
router.post("/insertmenu", (req, res) => {
  sql.connect(config, (err) => {
    if (err) console.error(err);

    const { itemid, Iname, price } = req.body;
    console.log("uid", itemid);

    try {
      var request = new sql.Request();
      request.query(
        `INSERT INTO MENU VALUES(${itemid},'${Iname}',${price}) `,
        (err, data) => {
          if (err) {
            res.send("Fail");
          } else {
            res.send("Inserted Successfully");
          }
        }
      );
    } catch (error) {
      console.error(error);
    }
  });
});

// STAFF PART

router.get("/staff", (req, res) => {
  sql.connect(config, (err) => {
    if (err) console.error(err);

    try {
      var request = new sql.Request();
      request.query(`SELECT * FROM USERS`, (err, data) => {
        res.send(data.recordset);
      });
    } catch (error) {
      console.error(error);
    }
  });
});

router.post("/delstaff", (req, res) => {
  sql.connect(config, (err) => {
    if (err) console.error(err);

    const { uid } = req.body;
    console.log("uid", uid);

    try {
      var request = new sql.Request();
      request.query(`DELETE FROM USERS WHERE  uid=${uid} `, (err, data) => {
        if (err) {
          res.send("Fail");
        } else {
          res.send("Delete successful");
        }
      });
    } catch (error) {
      console.error(error);
    }
  });
});

// KITCHEN PART

router.get("/kitchen", (req, res) => {
  sql.connect(config, (err) => {
    if (err) console.error(err);

    try {
      var request = new sql.Request();
      request.query(
        `SELECT TNo,IName,O.itemid,Qty,orderid FROM ORDER_ITEM O,MENU M where I_Status=0 and O.itemid=M.itemid`,
        (err, data) => {
          res.send(data.recordset);
        }
      );
    } catch (error) {
      console.error(error);
    }
  });
});

router.post("/delkitchen", (req, res) => {
  sql.connect(config, (err) => {
    if (err) console.error(err);

    const { itemid, orderid } = req.body;
    console.log(req.body);
    try {
      var request = new sql.Request();
      request.query(
        `UPDATE ORDER_ITEM SET I_Status=1 WHERE  itemid=${itemid} and orderid=${orderid}`,
        (err, data) => {
          if (err) {
            res.send("Fail");
          } else {
            res.send("Delete successful");
          }
        }
      );
    } catch (error) {
      console.error(error);
    }
  });
});
module.exports = router;
