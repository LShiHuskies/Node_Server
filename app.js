// const http = require('http');
// const routes = require('./routes');
const path = require('path');

const express = require('express');
const bodyParser = require('body-parser');

const errorController = require('./controllers/error');
const sequelize = require('./util/database');
const Product = require('./models/product');
const User = require('./models/user');
const Cart = require('./models/cart');
const CartItem = require('./models/cart-item');
const Order = require('./models/order');
const OrderItem = require('./models/order-item');

const app = express();

app.set('view engine', 'ejs');
app.set('views', 'views');

const adminRoutes = require('./routes/admin');
const shopRoutes = require('./routes/shop');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));


app.use((req, res, next) => {
    User.findById(1).then(user => {
        console.log('Hello sfsdfdsf', user);
        req.user = user;
        next();
    }).catch(err => console.log(err));
})





app.use('/admin', adminRoutes);
app.use(shopRoutes);

app.use(errorController.get404);

Product.belongsTo(User, { constraints: true, onDelete: 'CASCADE' });
User.hasMany(Product);
User.hasOne(Cart);
Cart.belongsTo(User);
Cart.belongsToMany(Product, { through: CartItem });
Product.belongsToMany(Cart, { through: CartItem });
Order.belongsTo(User);
User.hasMany(Order);
Order.belongsToMany(Product, { through: OrderItem });

sequelize
    .sync()
    .then(result => {
        return User.create({ name: 'Louis', email: 'test@test.com' });
        // return User.findById(1);
    })
    .then(user => {
        console.log('HERE RIGHT NOW', user)
        if (!user) {
            return User.create({ name: 'Louis', email: 'test@test.com' });
        }
        return user.createCart();
    })
    .then(user => {
        app.listen(3000);
    })
    .catch(err => {
        console.error(err);
    });
