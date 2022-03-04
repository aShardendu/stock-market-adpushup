import express from 'express';

import { getData, postData, deleteData } from '../controllers/controllers.js';

const router = express.Router();    

router.get('/view', getData);
router.post('/view', postData);
router.delete('/view', deleteData);


export default router;