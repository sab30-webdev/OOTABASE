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
    let { cname, cphone, billamt } = req.body;

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
        `SELECT M.itemid,itemname,price,qty,rate,i_status FROM ORDER_ITEM O,MENU M WHERE O.itemid=M.itemid AND tno=${tno}`,
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
          if (err) console.log(err);
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
      request.query(`SELECT * FROM MENU ORDER BY ratio DESC`, (err, data) => {
        res.send(data.recordset);
      });
    } catch (error) {
      console.error(error);
    }
  });
});

router.get("/adminmenuview", (req, res) => {
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

router.post("/delmenu", (req, res) => {
  sql.connect(config, (err) => {
    if (err) console.error(err);

    const { itemid } = req.body;

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

    const { itemid, Iname, price, rating } = req.body;

    try {
      var request = new sql.Request();
      request.query(
        `INSERT INTO MENU VALUES(${itemid},'${Iname}',${price},${rating},0,0) `,
        (err, data) => {
          if (err) {
            res.send("Fail");
            console.log(err);
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
        `SELECT tno,itemname,O.itemid,qty,orderid FROM ORDER_ITEM O,MENU M where i_status=0 and O.itemid=M.itemid`,
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

    try {
      var request = new sql.Request();
      request.query(
        `UPDATE ORDER_ITEM SET I_Status=1 WHERE  itemid=${itemid} and orderid='${orderid}'`,
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

router.get("/transact", (req, res) => {
  sql.connect(config, (err) => {
    if (err) console.error(err);

    try {
      var request = new sql.Request();
      request.query(
        `SELECT * FROM TRANSACTIONS order by timestamp desc`,
        (err, data) => {
          res.send(data.recordset);
        }
      );
    } catch (error) {
      console.error(error);
    }
  });
});

function updateRating(itemid, newrating) {
  try {
    var request = new sql.Request();
    request.query(
      `UPDATE MENU SET rating=rating+${newrating}, totalorders=totalorders+1 WHERE itemid=${itemid};
      UPDATE MENU SET ratio=rating/totalorders WHERE itemid=${itemid} `,
      (err, data) => {
        if (err) console.log(err);
      }
    );
  } catch (error) {
    console.log(error);
  }
}

router.post("/depositRating", async (req, res) => {
  sql.connect(config, (err) => {
    if (err) {
      console.error(err);
      res.send(err);
    }
    const ratingObj = req.body;

    for (let id in ratingObj) {
      updateRating(id, ratingObj[id]);
    }
    res.send("success");
  });
});

module.exports = router;
