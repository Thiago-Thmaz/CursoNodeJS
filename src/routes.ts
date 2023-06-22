//"dev": "ts-node-dev --transpile-only src/server.ts"

import {Router} from 'express';
import multer from 'multer';

import { CreateUserController } from './controllers/user/CreateUserController'
import { AuthUserController } from './controllers/user/AuthUserController'
import { DetailUseController } from './controllers/user/DetailUserController'

import { CreateCategoryController } from './controllers/category/CreateCategoryController';
import { ListCategoryController } from './controllers/category/ListCategoryController'

import { CreateProductController } from './controllers/Product/CreateProductController';

import { isAuthenticated } from './Middlewares/isAuthenticated';

import uploadConfig from './config/multer'

//-- ROTAS USER --

const router = Router();

//-- MULTER 
const upload = multer(uploadConfig.upload("./tmp"))

//Criar um user
router.post('/users', new CreateUserController().handle)
//Logar um user
router.post('/session', new AuthUserController().handle)
//Info de user
router.get('/me', isAuthenticated, new DetailUseController().Handle )

//-- ROTAS CATEGORIA -- 

//Criar uma Categoria
router.post('/category', isAuthenticated, new CreateCategoryController().handle)
//Listar Categorias
router.get('/category', isAuthenticated, new ListCategoryController().Handle )

// -- ROTAS PRODUCT

//Cradastrar produto
router.post('/product', isAuthenticated, upload.single('file'), new CreateProductController().handle )



export { router};