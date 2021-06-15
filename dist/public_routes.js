"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
exports.__esModule = true;
/**
 * Public Routes are those API url's that anyone can request
 * whout having to be logged in, for example:
 *
 * POST /user is the endpoint to create a new user or "sign up".
 * POST /token can be the endpoint to "log in" (generate a token)
 */
var express_1 = require("express");
var utils_1 = require("./utils");
var actions_1 = require("./actions");
var actions_2 = require("./actions");
var actions_3 = require("./actions");
var actions = __importStar(require("./actions"));
var mercadopago = require('mercadopago');
var bodyParser = require('body-parser');
var express = require('express');
mercadopago.configurations.setAccessToken("TEST-4572519004823516-061514-a6deb6f6fb9a5c182042b1f86c230ae9-171807171");
//middleware de mercado pago para los parametros de la vista
var app = express();
// parse application/x-www-form-urlencoded
var mwmercadopago = app.use(bodyParser.urlencoded({ extended: false }));
var router = express_1.Router();
// signup route, creates a new user in the DB
router.post('/login', utils_1.safe(actions.login));
router.post('/user', utils_1.safe(actions_1.createUser));
router.post('/productos', utils_1.safe(actions_2.añadirProductos));
router.get('/productos', utils_1.safe(actions_3.listarProductos));
router.get('/productos/:id', utils_1.safe(actions.verDetalleProducto));
router["delete"]('/user/:id', utils_1.safe(actions.deleteUser));
router["delete"]('/productos/:id', utils_1.safe(actions.deleteProducto));
router.post('/user/email', utils_1.safe(actions.cambioDePass));
router.post('/comprar', mwmercadopago, function (req, res) {
    var preference = {
        items: [{
                title: req.body.title,
                unit_price: parseInt(req.body.price),
                quantity: 1
            }]
    };
    mercadopago.preferences.create(preference)
        .then(function (response) {
        console.log(response);
        res.redirect(response.body.init_point);
    })["catch"](function (error) {
        console.log(error);
    });
});
exports["default"] = router;
