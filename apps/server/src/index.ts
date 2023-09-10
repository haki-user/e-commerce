import express from 'express';
import cors from 'cors';
import * as dotenv from 'dotenv';
import helmet from 'helmet';

import connectDB from './config/db';

import itemsRouter from './routers/items';
import authRouter from './routers/auth';
import cartRouter from './routers/cart.routes';
import orderRouter from './routers/order.routes'; 
import productRouter from './routers/product.routes';

dotenv.config();
connectDB();

const PORT: number = parseInt(process.env.PORT as string, 10);
if(!PORT) {
    process.exit(1);
}

const app = express();

app.use(helmet());
app.use(cors());
app.use(express.json());
app.use('/api/items', itemsRouter); 
app.use('/api/auth', authRouter);
app.use('/api/cart', cartRouter);
app.use('/api/orders', orderRouter);
app.use('/api/products', productRouter);

app.listen(PORT,  () => {
    console.log(`Listening on port  ${PORT}`);
});
