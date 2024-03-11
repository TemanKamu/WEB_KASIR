import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import FileUpload from "express-fileupload";
import session from "express-session";
import dotenv from "dotenv";
import db from "./config/Database.js";
import SequelizeStore from "connect-session-sequelize";
import UserRoute from "./routes/UserRoute.js";
import RoleRoute from "./routes/RoleRoute.js";
import MenuRoute from "./routes/MenuRoute.js";
import BillMenuRoute from "./routes/BillMenuRoute.js";
import BillDetailRoute from "./routes/BillDetailRoute.js";
import CategoryMenuRoute from "./routes/CategoryMenuRoute.js";
import CountTotalRoute from "./routes/CountTotalRoute.js";
import AuthRoute from "./routes/AuthRoute.js"
// (async () => {
//   db.sync();
// })();

dotenv.config();
const app = express();
app.use(bodyParser.json());
const sessionStore = SequelizeStore(session.Store)
const store = new sessionStore({
  db: db
})
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);

app.use(
  session({
    secret: process.env.SESS_SECRET,
    resave: true,
    saveUninitialized: true,
    store: store,
    cookie: {
      secure: "auto",
    },
  })
);

app.use(FileUpload());
app.use(express.static("public"))
app.use(AuthRoute);
app.use(UserRoute);
app.use(RoleRoute);
app.use(MenuRoute);
app.use(BillMenuRoute);
app.use(BillDetailRoute);
app.use(CategoryMenuRoute);
app.use(CountTotalRoute);

// store.sync();
// https://localhost:5000/count
app.listen(5000, () => console.log("server running on port 5000"));
