const axios = require("axios");
const history = require("../data/history");

exports.fetchWebsite = async (req, res) => {
  try {
    let { url } = req.body;

    // validation
    if (!url || url.trim() === "") {
      return res.status(400).send({
        success: false,
        message: "URL is required!!",
      });
    }

    // add https if missing
    if (!url.startsWith("http://") && !url.startsWith("https://")) {
      url = "https://" + url;
    }

    const response = await axios.get(url);

    // save history
    history.unshift(url);

    res.send({
      success: true,
      data: response.data,
    });
  } catch (error) {
    res.status(400).send({
      success: false,
      message: "Invalid URL or cannot fetch content!!",
    });
  }
};

// get history
exports.getHistory = (req, res) => {
  res.send({
    success: true,
    history,
  });
};

// clear history
exports.clearHistory = (req, res) => {
  history.length = 0;
  res.send({
    success: true,
    message: "History cleared",
  });
};