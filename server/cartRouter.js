const express = require('express');
const handler = require('./handler');
const fs = require('fs');
const router = express.Router();
const logCart = require('./logCart');

router.get('/', (req, res) => {
    fs.readFile('server/db/userCart.json', (err, data) => {
        if (err) {
            console.log(err);
            res.send({ result: 0, text: err });
            return;
        }

        res.send(data);
    })
});

router.post('/', (req, res) => {
    handler(req, res, 'add', 'server/db/userCart.json');
});

router.put('/:id', (req, res) => {
    handler(req, res, 'change', 'server/db/userCart.json');
});

router.delete('/:id', (req, res) => {
    fs.readFile('server/db/userCart.json', (err, data) => {
        if (err) {
            console.log(err);
            res.send({ result: 0, text: err });
            return;
        }
        let cart = JSON.parse(data)
        const find = cart.contents.find(el => el.id_product === +req.params.id);
        let newCart;
        if (find.quantity > 1) {
            find.quantity += req.body.quantity;
        } else {
            cart.contents.splice(cart.contents.indexOf(find), 1);
        }

        newCart = JSON.stringify(cart, null, 4);
        fs.writeFile('server/db/userCart.json', newCart, (err) => {
            if (err) {
                console.log(err);
                res.send({ result: 0, text: err });
                return;
            }
            // console.log(req.route.methods);
            res.send({ result: 1 });
            logCart(req.route.methods,find);
        });
    })

});
module.exports = router;