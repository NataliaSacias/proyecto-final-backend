
/**
 * Public Routes are those API url's that anyone can request
 * whout having to be logged in, for example:
 * 
 * POST /user is the endpoint to create a new user or "sign up".
 * POST /token can be the endpoint to "log in" (generate a token)
 */
import { Router } from 'express';
import { safe } from './utils';
import { createUser } from './actions';
import { añadirProductos } from './actions';
import { listarProductos } from './actions';
import * as actions from './actions';



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

export default router;
