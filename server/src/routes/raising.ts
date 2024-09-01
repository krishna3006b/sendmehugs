import { Router } from 'express';
import { createRaising, getRaising, getRaisings, removeRaising, updateRaising } from '../controllers/raising';

const raisingRouter = Router();

raisingRouter
    .get('/', getRaisings)
    .get('/:id',getRaising)
    .post('/', createRaising)
    .put('/:id',updateRaising)
    .delete('/:id',removeRaising)

export default raisingRouter