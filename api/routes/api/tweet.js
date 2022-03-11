const express = require("express");
const router = express.Router();
const pool = require("../../db");
const jwt = require("jsonwebtoken");

router.get("/testApi", async (req, res) => {
  try {
    // console.log(res);
    res.send("test");
  } catch (error) {
    console.log(error);
  }
});

router.get("/getTweets", async (req, res) => {
  try {
    console.log("api call", req.query.username);
    const username = req.query.username;
    const data = await pool.query(
      "select following from users where username = ($1)",
      [username]
    );

    const following = data.rows[0].following;
    console.log("followings - ", following);
    let tweets = [];

    const resolved = Promise.all(
      following.map(async (user) => {
        const data = await pool.query(
          "select * from tweets where username = ($1)",
          [user]
        );

        console.table(data.rows);

        tweets = tweets.concat(data.rows);
      })
    );

    console.log("resolved promises", resolved);
    console.log("tweets", tweets);
    res.send(tweets);
  } catch (error) {
    console.log(error);
  }
});

router.post("/add", async (req, res) => {
  try {
    console.log(req.body);
    const newTweet = pool.query(
      "Insert into tweets(username,tweet) values ($1,$2) returning *",
      [req.body.username, req.body.tweet]
    );

    res.json(newTweet);
  } catch (error) {
    console.log(error);
  }
});

module.exports = router;
