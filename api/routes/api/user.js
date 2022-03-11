const express = require("express");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
const router = express.Router();
const pool = require("../../db");

// get config vars
dotenv.config();

router.get("/", (req, res) => {
  res.send("hello");
});

router.get("/getPeopleToFollow", async (req, res) => {
  try {
    const data = await pool.query(
      "select name,username from users where username <> ($1)",
      [req.query.username]
    );
    // console.log("-------users------", data.rows);
    res.send(data.rows);
  } catch (error) {
    console.log(error);
  }
});

router.post("/usernameAvailable", async (req, res) => {
  try {
    // console.log(req.body);
    const user = await pool.query(
      "select count(username) from users where username = ($1)",
      [req.body.username]
    );

    res.send(user.rows[0].count);
  } catch (error) {
    console.log(error);
  }
});

router.post("/signup", async (req, res) => {
  try {
    // console.log(req.body);
    const { name, username, email, password } = req.body;

    let encryptedPass = password;
    bcrypt.hash(password, 10, function (err, hash) {
      encryptedPass = hash;
    });

    await pool.query(
      "insert into users(username,email,password,name,following) values($1,$2,$3,$4,'{}')",
      [username, email, encryptedPass, name]
    );

    res.send();
  } catch (error) {
    console.log(error);
  }
});

router.post("/signin", async (req, res) => {
  try {
    // console.log(req.body);

    // let encryptedPass;
    // bcrypt.hash(req.body.password, 10, function (err, hash) {
    //   console.log("encrypted", hash);
    //   encryptedPass = hash;
    // });
    // console.log(encryptedPass);

    const record = await pool.query(
      "select password from users where username = ($1)",
      [req.body.username]
    );

    const inputPassword = req.body.password;
    const savedPassword = record.rows[0].password;

    if (!(inputPassword === savedPassword)) {
      res.send(401, "Wrong password!");
    } else {
      const token = generateAccessToken({ username: req.body.username });
      const userRecord = await pool.query(
        "select * from users where username = ($1)",
        [req.body.username]
      );
      const { name, username, email } = userRecord.rows[0];

      res.json({ name, username, email, token });
    }
  } catch (error) {
    console.log(error);
  }
});

router.post("/follow", async (req, res) => {
  try {
    const { username, followUser } = req.body;
    console.log("details", username, followUser);
    const data = await pool.query(
      "select following from users where username = ($1)",
      [username]
    );

    const following = data.rows[0].following;
    following.push(followUser);
    console.log(following);
    await pool.query(
      "update users set following = ($1) where username = ($2)",
      [following, username]
    );
    res.send();
  } catch (error) {
    console.log(error);
  }
});

// router.post("/follow", async (req, res) => {
//   try {
//     console.log(req.body);
//     const user = await pool.query(
//       "select following from users where username = ($1)",
//       [req.body.username]
//     );
//     console.log("user", user.rows);
//     // res.send(user.rows[0].count);
//   } catch (error) {
//     console.log(error);
//   }
// });

function generateAccessToken(username) {
  return jwt.sign(username, process.env.TOKEN_SECRET, { expiresIn: "1800s" });
}

module.exports = router;
