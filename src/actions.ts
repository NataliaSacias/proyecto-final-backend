import { Request, Response } from 'express'
import { getRepository } from 'typeorm'  // getRepository"  traer una tabla de la base de datos asociada al objeto
import { Usuario } from './entities/Usuario'
import { Exception } from './utils'

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

	const productoRepo = getRepository(Usuario)
	// fetch for any user with this email
	const user = await productoRepo.findOne({ where: {email: req.body.email }})
	if(user) throw new Exception("Users already exists with this email")

	const newUser = getRepository(Usuario).create(req.body);  //Creo un usuario
	const results = await getRepository(Usuario).save(newUser); //Grabo el nuevo usuario 
	return res.json(results);
}

export const getProductos = async (req: Request, res: Response): Promise<Response> =>{
		const users = await getRepository(Usuario).find();
		return res.json(users);
}