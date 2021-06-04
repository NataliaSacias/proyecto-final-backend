import { Request, Response } from 'express'
import { getRepository } from 'typeorm'  // getRepository"  traer una tabla de la base de datos asociada al objeto
import { Usuario } from './entities/Usuario'
import { Exception } from './utils'
import { Productos } from './entities/Productos'
import jwt from "jsonwebtoken"


export const createUser = async (req: Request, res:Response): Promise<Response> =>{

	// important validations to avoid ambiguos errors, the client needs to understand what went wrong
	if(!req.body.nombre) throw new Exception("Please provide a nombre")
	if(!req.body.apellido) throw new Exception("Please provide a apellido")
	if(!req.body.email) throw new Exception("Please provide an email")
	if(!req.body.password) throw new Exception("Please provide a password")

	const userRepo = getRepository(Usuario)
	// fetch for any user with this email
	const user = await userRepo.findOne({ where: {email: req.body.email }})
	if(user) throw new Exception("Users already exists with this email")

	const newUser = getRepository(Usuario).create(req.body);  //Creo un usuario
	const results = await getRepository(Usuario).save(newUser); //Grabo el nuevo usuario 
	return res.json(results);
}

export const getUsers = async (req: Request, res: Response): Promise<Response> =>{
		const users = await getRepository(Usuario).find();
		return res.json(users);
}


export const añadirProductos = async (req: Request, res:Response): Promise<Response> =>{

	// important validations to avoid ambiguos errors, the client needs to understand what went wrong
	if(!req.body.stock) throw new Exception("Ingrese el stock")
	if(!req.body.precio) throw new Exception("Igrese el precio")
	if(!req.body.nombre) throw new Exception("Igrese el nombre")
	if(!req.body.descripcion) throw new Exception("Ingrese una descipción")
	if(!req.body.fotoDePortada) throw new Exception("Ingrese una imagen")

	const productoRepo = getRepository(Productos)
	// fetch for any user with this email
	const producto = await productoRepo.findOne({ where: {nombre: req.body.nombre }})
	if(producto) throw new Exception("Ya existe un producto con ese nombre")

	const newProduct = getRepository(Productos).create(req.body);  //Creo un producto
	const results = await getRepository(Productos).save(newProduct); //Grabo el nuevo producto 
	return res.json(results);
}

export const listarProductos = async (req: Request, res: Response): Promise<Response> =>{
		const productos = await getRepository(Productos).find();
		return res.json(productos);
}


// ********************** TOKEN **********************

export const login = async (req: Request, res: Response): Promise<Response> =>{
		
	if(!req.body.email) throw new Exception("Please specify an email on your request body", 400)
	if(!req.body.password) throw new Exception("Please specify a password on your request body", 400)

	const userRepo = await getRepository(Usuario)

	// We need to validate that a user with this email and password exists in the DB
	const user = await userRepo.findOne({ where: { email: req.body.email, password: req.body.password }})
	if(!user) throw new Exception("Invalid email or password", 401)

	// this is the most important line in this function, it create a JWT token
	const token = jwt.sign({ user }, process.env.JWT_KEY as string);
	
	// return the user and the recently created token to the client
	return res.json({ user, token });
}