import express, { Request, Response, NextFunction } from 'express';
import { discoverMovies, discoverRandomMovies } from '../controllers/movieController';

const router = express.Router();

router.get('/discover/movies', async (req: Request, res: Response, next: NextFunction) => {
    try {
        const movies = await discoverMovies();
        res.json(movies);
    } catch (error) {
        console.error(error);
        next(error);
    }
});

router.get('/discover/movies/random', async (req: Request, res: Response, next: NextFunction) => {
    try {
        const movies = await discoverMovies();
        res.json(movies);
    } catch (error) {
        console.error(error);
        next(error);
    }
});

export default router;