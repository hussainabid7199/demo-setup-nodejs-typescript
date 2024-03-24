require('dotenv').config({ path: './.env' });
import express from "express";
import * as bodyParser from "body-parser";
import cookieParser from "cookie-parser";
import cors from "cors";
import connectDatabase from "./connection/database";
import ErrorHandler from './helper/ErrorHandler';
import routes from "./routes";


// Database connection
const connectionString: string = process.env.DB_URL || "";
connectDatabase(connectionString);


const app = express();
app.use(cookieParser());


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json());


let baseUrl: string = process.env.BASE_URL || "default_value";

app.use(cors({
    "origin": baseUrl,
    "methods": ['GET', 'PUT', 'POST', 'PATCH', 'DELETE'],
    "preflightContinue": true,
    "optionsSuccessStatus": 204,
    "allowedHeaders": ['Content-Type','Authorization', 'clientId'],
    "credentials": true
}));


app.use(ErrorHandler);

app.get("/", (req, res) => {
    return res.status(200).send("Welcome to the ESS");
});

app.use(routes);



let port = process.env.PORT;
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
