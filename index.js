import express from "express";
const app = express();
require("dotenv").config();
import compression from "compression";
import preLoginRoutes from "./routes/preLoginRoutes";
import postLoginRoutes from "./routes/postLoginRoutes";
import momentsRoutes from "./routes/momentsRoutes";
import bodyParser from "body-parser";
import auth from "./middleware/auth";
const PORT = process.env.PORT;
const urlencodedParser = bodyParser.urlencoded({ extended: false }); // to support URL-encoded bodies

app.use(compression()); //Compress all routes
app.use("/", urlencodedParser, preLoginRoutes);
app.use(auth);
app.use("/", urlencodedParser, postLoginRoutes);
app.use("/", urlencodedParser, momentsRoutes);
app.listen(PORT, () => {
  console.log(`App listening in port ${PORT}`);
});
