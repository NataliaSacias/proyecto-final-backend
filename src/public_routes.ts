
/**
 * Public Routes are those API url's that anyone can request
 * whout having to be logged in, for example:
 * 
 * POST /user is the endpoint to create a new user or "sign up".
 * POST /token can be the endpoint to "log in" (generate a token)
 */
import { Router, application, Express } from 'express';
import { safe } from './utils';
import { createUser } from './actions';
import { añadirProductos } from './actions';
import { listarProductos } from './actions';
import * as actions from './actions';
var mercadopago = require('mercadopago');
var bodyParser = require('body-parser');
var express = require('express')

mercadopago.configurations.setAccessToken("TEST-4572519004823516-061514-a6deb6f6fb9a5c182042b1f86c230ae9-171807171"); 

//middleware de mercado pago para los parametros de la vista
var app = express()
// parse application/x-www-form-urlencoded
const mwmercadopago =app.use(bodyParser.urlencoded({ extended: false }))


const router = Router();

// signup route, creates a new user in the DB
router.post('/login', safe(actions.login));
router.post('/user', safe(createUser));
router.post('/productos', safe(añadirProductos));
router.get('/productos', safe(listarProductos));
router.get('/productos/:id', safe(actions.verDetalleProducto));
router.delete('/user/:id', safe(actions.deleteUser));
router.delete('/productos/:id', safe(actions.deleteProducto));
router.post('/user/email', safe(actions.cambioDePass));
router.post('/comprar',mwmercadopago,  (req, res) => {
    
	let preference = {
		items: [{
			title: req.body.title,
			unit_price: parseInt(req.body.price),
			quantity: 1,
        }]
}

	mercadopago.preferences.create(preference)
		.then(function (response: { body: { init_point: string; }; }) {
            console.log(response)
            res.redirect(response.body.init_point)
		}).catch(function (error: any) {
			console.log(error);
		});
});


export default router;
