import express from "express";
import { createMovie, getMovies, getSingleMovie, getPaginatedMovies} from "../controller/movieController.js";
const router = express.Router();

router.post("/add-movie", createMovie);
router.get("/get-all", getMovies);
router.get("/get-single", getSingleMovie);
router.get("/get-paginated", getPaginatedMovies);

export default router;
