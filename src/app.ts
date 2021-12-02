import path from "path";
import express, { Application } from "express";
import dotenv from "dotenv";
import session from "express-session";
import MongoStore from "connect-mongo";
import connectDB from "./config/db.config";
import passport from "passport";
import { engine } from "express-handlebars";
import morgan from "morgan";
import indexRouter from "./routes/index.routes";
import authRouter from "./routes/auth.roues";
import passportConfig from "./config/passport.config";
import storyRouter from "./routes/story.routes";
import handlebarsHelpers from "./helpers/hadlebars.helpers";
import methodOverride from "method-override";

//load config
dotenv.config({ path: path.join(__dirname, "config/config.env") });

//Passport config
passportConfig(passport);
//connect to mongo
connectDB();

const app: Application = express();

if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}
//Handlebars
const partailsPath = path.join(__dirname, "views", "partials");
//HandleBars Helpers
const { formatDate, stripTags, truncate, editIcon, select } = handlebarsHelpers;
app.engine(
  "handlebars",
  engine({
    partialsDir: partailsPath,
    helpers: {
      formatDate,
      stripTags,
      truncate,
      select,
      editIcon,
    },
  })
);
app.set("view engine", "handlebars");
app.set("views", path.join(__dirname, "./views"));

//middlewares
app.use(express.urlencoded({ extended: true }));
app.use(
  methodOverride((req, res) => {
    if (req.body && typeof req.body === "object" && "_method" in req.body) {
      let method = req.body._method;
      delete req.body._method;
      return method;
    }
  })
);
app.use(
  session({
    secret: "lol",
    resave: false,
    saveUninitialized: false,
    store: MongoStore.create({ mongoUrl: process.env.MONGO_URI }),
  })
);
app.use(passport.initialize());
app.use(passport.session());
//set Global var
app.use((req, res, next) => {
  res.locals.user = req.user || null;
  next();
});
//Static folder
app.use(express.static(path.join(__dirname, "public")));
//Routes
app.use("/", indexRouter);
app.use("/auth", authRouter);
app.use("/stories", storyRouter);

const port = process.env.PORT || 3000;

app.listen(port, () =>
  console.log(`running in ${process.env.NODE_ENV} mode on port ${port}`)
);
