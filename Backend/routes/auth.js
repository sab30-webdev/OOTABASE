const express = require("express");
const router = express.Router();
const sql = require("mssql");
const config = require("../config");

router.post("/admin", (req, res) => {
  sql.connect(config, (err) => {
    if (err) console.error(err);

    const { uid, name, job } = req.body;

    try {
      var request = new sql.Request();
      request.query(
        `INSERT INTO USERS VALUES('${uid}','${name}','${job}','','') `,
        (err, data) => {
          if (err) {
            res.send("fail");
          } else {
            res.send("success");
          }
        }
      );
    } catch (error) {
      console.error(error);
    }
  });
});

router.post("/register", (req, res) => {
  sql.connect(config, (err) => {
    if (err) console.error(err);

    const { uid, username, password } = req.body;

    try {
      var request = new sql.Request();
      request.query(
        `UPDATE USERS SET username='${username}', password='${password}' WHERE uid=${uid}`,
        (err, data) => {
          if (err) {
            res.send("Register Fail");
          } else {
            res.send("Register Success");
          }
        }
      );
    } catch (error) {
      console.error(error);
    }
  });
});

router.post("/login", (req, res) => {
  sql.connect(config, (err) => {
    if (err) console.error(err);

    const { username, password, job } = req.body;

    try {
      var request = new sql.Request();
      request.query(
        `SELECT * FROM USERS WHERE username='${username}' AND password='${password}' AND job='${job}'`,
        (err, data) => {
          if (data.recordset.length > 0) {
            return res.send("Login Success");
          }
          res.send("Not Authorized");
        }
      );
    } catch (error) {
      console.error(error);
    }
  });
});

module.exports = router;
