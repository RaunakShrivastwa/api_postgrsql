import express from 'express';
import venderController from '../controllers/venderController.js';
const {createVender,deleteVender,getAllVender,singleVender,updateVender} = venderController;

const venderRouter = express.Router();
venderRouter.post('/',createVender);
venderRouter.get('/',getAllVender);
venderRouter.put('/:id',updateVender);
venderRouter.delete('/:id',deleteVender);
venderRouter.get('/:id',singleVender);


export default venderRouter;