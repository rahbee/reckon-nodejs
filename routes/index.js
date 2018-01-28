import express from 'express';
import homeController from '../controllers/home';
import searchController from '../controllers/search';

const router = express.Router();

/* GET index page. */
router.get('/', homeController.index);

/* GET search text */
router.get('/search', searchController.index);

export default router;
