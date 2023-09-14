const mongoose = require("mongoose");

// mongoose.connect(process.env.MONGODB_CONNECT_URL).then(() => {
//   console.log("Mongoose server has started from atlas");
// });

mongoose.connect("mongodb://0.0.0.0:27017/usersDB").then(() => {
  console.log("Mongoose server has started from compass");
});
