const express = require('express');
const app = express();
const morgan = require('morgan');
const mongoose = require('mongoose');
const cors = require('cors');

app.use(cors());
app.options('*', cors());
mongoose.set('useFindAndModify', false);

require('dotenv/config');
const api = process.env.API_URL;
const productsRouter = require('./routes/products');
const categoriesRouter = require('./routes/categories');
const usersRouter = require('./routes/users');

//Middleware
app.use(express.json());
app.use(morgan('tiny'));


app.use(`${api}/products`, productsRouter);
app.use(`${api}/categories`, categoriesRouter);
app.use(`${api}/users`, usersRouter);

// app.get(`${api}/products`,(req, res) =>{
//     const product = {
//         id: 1,
//         name: 'cheese whiz',
//         image: 'fountain of cheese'
//     }
//     res.send(product);
// })

// app.post(`${api}/products`,(req, res) =>{
//     const newProduct = req.body;
//     console.log(newProduct);
//     res.send(newProduct);
// })



mongoose.connect(process.env.CONNECTION_STRING, {

    useNewUrlParser: true,
    useUnifiedTopology: true,
    dbName: 'ClarkDB'
})
.then(()=>{
    console.log('database aye');
})
.catch((err) => {
    console.log('err');
})

app.listen(3000, ()=>{
    console.log(api, 'Server be aye http://localhost:3000')
})
