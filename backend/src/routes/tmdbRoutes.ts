import express, { Request, Response, NextFunction } from 'express';
import { discoverMovies, discoverRandomMovies, createOptions} from '../services/tmdb';
import axios from 'axios';

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
        // discoverRandomMovies requires totalPages as an argument, so we need to get it first.
        // Here, we're assuming that the first page of results always exists and has the total_pages property.
        const firstPageOptions = createOptions(1);
        const firstPageResponse = await axios.request(firstPageOptions);
        const totalPages = firstPageResponse.data.total_pages;

        const movies = await discoverRandomMovies(totalPages);
        res.json(movies);
    } catch (error) {
        console.error(error);
        next(error);
    }
});



export default router;