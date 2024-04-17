import express, { Request, Response, NextFunction } from 'express';
import { getMovies } from '../services/tmdb';

const router = express.Router();


router.get('/trending', async (req: Request, res: Response, next: NextFunction) => {
    try {
        const movies = await getMovies();
        console.log(movies);
        res.json(movies);
    } catch (error) {
        console.error(error);
        next(error);
    }
});
export default router;