import express, {Application} from "express";
import morgan from "morgan";
import bodyParser from 'body-parser';
import http2 from 'http2';
import {readFileSync} from 'fs';
import http2Express from "http2-express-bridge";
import path from 'path';

import adminRouter from './routes/admin';
import orderRouter from './routes/order';
import getShopRouter from './routes/shop';
import userRouter from './routes/user';

const PORT = process.env.PORT || 8085;

// const app: Application = http2Express(express);
const app: Application = express();

app.use(morgan('tiny'));
app.use(express.static("public"));
app.use(bodyParser.json());

app.use("/admin", adminRouter);
app.use("/order", orderRouter);
app.use("/shop", getShopRouter());
app.use("/user", userRouter);

console.log(path.resolve(__dirname, './cert/localhost.crt'))
const options = {
    key: readFileSync(path.resolve(__dirname, './cert/CA/localhost/localhost.decrypted.key')),
    cert: readFileSync(path.resolve(__dirname, './cert/CA/localhost/localhost.crt')),
    allowHTTP1: true
};

// const server = http2.createSecureServer(options, app);
// server.listen(PORT, () => {
//     console.log(`server is running on ${PORT}`);
// });
app.listen(PORT, () => {
    console.log(`server is running on ${PORT}`);
});

