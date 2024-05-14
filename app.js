const express = require("express");
const sequelize = require("./sequelize");
const bodyParser = require("body-parser");

const app = express();

const vendorRoutes = require("./routes/vendor");

app.use(bodyParser.json());

app.use("/api", vendorRoutes);

app.use((error, req, res, next) => {
  // console.log("Request Body:", req.body);
  // console.log("Error:", error.stack);
  const status = error.statusCode || 500;
  const message = error.message;
  res.status(status).json({ status: status, message: message });
});

// Sync all models with the database
sequelize
  // .sync({ force: true })
  .sync()
  .then(() => {
    console.log("Database synced");
  })
  .catch((err) => {
    console.error("Error syncing database:", err);
  });

app.listen(8000, () => {
  console.log("Server is running on port 8000");
});
