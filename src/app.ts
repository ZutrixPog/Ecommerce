import express, {Application} from "express";
import morgan from "morgan";
import bodyParser from 'body-parser';

import adminRouter from './routes/admin';
import orderRouter from './routes/order';
import getShopRouter from './routes/shop';
import userRouter from './routes/user';

const PORT = process.env.PORT || 8085;

const app: Application = express();

app.use(morgan('tiny'));
app.use(express.static("public"));
app.use(bodyParser.json());

app.use("/admin", adminRouter);
app.use("/order", orderRouter);
app.use("/shop", getShopRouter());
app.use("/user", userRouter);

app.listen(PORT, () => {
    console.log(`server is running on ${PORT}`);
});
