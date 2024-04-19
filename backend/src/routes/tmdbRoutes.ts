import express, { Request, Response, NextFunction } from 'express';
import { discoverMovies, discoverRandomMovies } from '../controllers/movieController';
import { createOptionsDiscover} from '../services/tmdb';

const router = express.Router();

router.post('/discover/movies', async (req, res) => {
    const { genre, years, rounds } = req.body;
    console.log('genre:', genre);
    console.log('years:', years);
    console.log('rounds:', rounds);

    const movies = await discoverMovies(genre, years, rounds);
    res.json(movies);

});



router.get('/discover/movies', async (req: Request, res: Response, next: NextFunction) => {
    try {
        const genre = req.query.genre as string[];
        const years = req.query.years as string[];
        const rounds = Number(req.query.rounds);

        const movies = await discoverMovies(genre, years, rounds);
        res.json(movies);
    } catch (error) {
        console.error(error);
        next(error);
    }
});

router.get('/discover/movies/random', async (req: Request, res: Response, next: NextFunction) => {
    try {
        const genre = req.query.genre as string[];
        const years = req.query.years as string[];
        const rounds = Number(req.query.rounds);

        const movies = await discoverMovies(genre, years, rounds);
        res.json(movies);
    } catch (error) {
        console.error(error);
        next(error);
    }
});




export default router;