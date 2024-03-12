const express = require("express");
const cors = require("cors");
const usersRoutes = require("./routes/users-routes");
const NewError = require("./models/new-error");
const helmet = require("helmet");
const compression = require("compression");

const app = express();

app.use(cors());

app.use(
  helmet({
    crossOriginResourcePolicy: false,
  })
);

app.use(compression());

app.use(express.json());

app.use("/users", usersRoutes);

app.use((req, res, next) => {
  return next(new NewError("Could not find this route.", 404));
});

app.use(async (error, req, res, next) => {
  res.status(error.code || 500);
  res.json({ message: error.message || "An unknown error occurred!" });
});

app.listen(process.env.PORT || 5000, () => {
  console.log(`Server is running on port ${process.env.PORT || 5000}`);
});
