const axios = require("axios");
const baseUrl = "http://localhost:3080/api";

export default {
  // tweet table apis
  addTweet: function (body) {
    return axios.post(baseUrl + "/tweet/add", body);
  },
  getTweets: function (username) {
    return axios.get(
      baseUrl + "/tweet/getTweets",
      { params: { username: username } },
      headers
    );
  },
  getPeopleToFollow: function (username) {
    return axios.get(baseUrl + "/user/getPeopleToFollow", {
      params: { username: username },
    });
  },

  // user table apis
  verifyUsernameAvailable: function (body) {
    return axios.post(baseUrl + "/user/usernameAvailable", body, {
      headers: headers,
    });
  },

  signup: function (body) {
    return axios.post(baseUrl + "/user/signup", body, { headers: headers });
  },

  signin: function (body) {
    return axios.post(baseUrl + "/user/signin", body, { headers: headers });
  },

  follow: function (body) {
    return axios.post(baseUrl + "/user/follow", body, { headers: headers });
  },
};

const headers = {
  headers: {
    Authorization: `${localStorage.getItem("token")}`,
  },
};
