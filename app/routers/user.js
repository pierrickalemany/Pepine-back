import { Router } from 'express';
import userController from '../controllers/api/user.js';
import userHasProduct from '../controllers/api/userHasProduct.js';

const router = Router();

/**
 * POST api/user
 * @summary Create user
 * @tags User
 * @param   {[User]}  request.body      [user description]
 * @return  {[User]} 200 -              [success response]
 * @return {[object]}  500 -            [internal server error]
 */
router.post('/', userController.create);

/**
 * POST api/user/product
 * @summary Create user_has_product
 * @tags User
 * @param   {[User]}  request.body      [user description]
 * @return  {[User]} 200 -              [success response]
 * @return {[object]}  500 -            [internal server error]
 */
router.post('/product', userHasProduct.create);

/**
 * PATCH api/user/{id}
 * @summary Update user
 * @tags User
 *
 * @param   {[number]} id.path          [id description]
 * @param   {[User]}  request.body      [user description]
 *
 * @return  {[User]} 200 -              [success response]
 * @return {[object]}  500 -            [internal server error]
 */
router.patch('/:id', userController.update);

export default router;
