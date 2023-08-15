import { connectToDatabase } from "../config.js"; 
import { ObjectId } from 'mongodb';


export const createMovie = (req, res) => {
  const { name } = req.body;
  if (name) {
    const movieData = {
      name: name,
    };

    connectToDatabase()
      .then((db) => {
        const moviesCollection = db.collection("movies");

        moviesCollection
          .insertOne(movieData)
          .then(() => {
            res
              .status(201)
              .json({ message: `Movie '${name}' added successfully` });
          })
          .catch((err) => {
            console.error("Error inserting movie:", err);
            res
              .status(500)
              .json({ error: "An error occurred while adding the movie" });
          });
      })
      .catch((err) => {
        console.error("Error connecting to database:", err);
        res.status(500).json({
          error: "An error occurred while connecting to the database",
        });
      });
  } else {
    res.status(400).json({ error: "Movie name is required" });
  }
};

// get movies

export const getMovies = (req, res) => {
  connectToDatabase()
    .then((db) => {
      const moviesCollection = db.collection("movies");

      moviesCollection
        .find({})
        .toArray()
        .then((movies) => {
          res.status(200).json(movies);
        })
        .catch((err) => {
          console.error("Error fetching movies:", err);
          res
            .status(500)
            .json({ error: "An error occurred while fetching movies" });
        });
    })
    .catch((err) => {
      console.error("Error connecting to database:", err);
      res
        .status(500)
        .json({ error: "An error occurred while connecting to the database" });
    });
};


//get single movie
export const getSingleMovie = (req, res) => {
  const movieId = req.query.id;

  if (!movieId) {
    return res
      .status(400)
      .json({ error: "Movie ID is required in query parameter 'id'" });
  }


  const objectIdMovieId = new ObjectId(movieId);

  connectToDatabase()
    .then((db) => {
      const moviesCollection = db.collection("movies");

      moviesCollection
        .findOne({ _id: objectIdMovieId })
        .then((movie) => {
          if (!movie) {
            return res.status(404).json({ error: "Movie not found" });
          }
          res.status(200).json(movie);
        })
        .catch((err) => {
          console.error("Error fetching single movie:", err);
          res
            .status(500)
            .json({ error: "An error occurred while fetching the movie" });
        });
    })
    .catch((err) => {
      console.error("Error connecting to database:", err);
      res
        .status(500)
        .json({ error: "An error occurred while connecting to the database" });
    });
};


// for pagination


export const getPaginatedMovies = (req, res) => {
  const page = parseInt(req.query.page) || 1;
  const size = parseInt(req.query.size) || 10;

  const skip = (page - 1) * size;

  connectToDatabase()
    .then((db) => {
      const moviesCollection = db.collection("movies");

      moviesCollection
        .find({})
        .skip(skip)
        .limit(size)
        .toArray()
        .then((movies) => {
          res.status(200).json(movies);
        })
        .catch((err) => {
          console.error("Error fetching paginated movies:", err);
          res
            .status(500)
            .json({ error: "An error occurred while fetching paginated movies" });
        });
    })
    .catch((err) => {
      console.error("Error connecting to database:", err);
      res
        .status(500)
        .json({ error: "An error occurred while connecting to the database" });
    });
};
