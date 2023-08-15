import express from "express";


import movieRoutes from "./routes/movieRoutes.js"
import { connectToDatabase } from "./config.js";

const app = express();
app.use(express.json({ limit: "30mb", extended: true }));
app.use(express.urlencoded({ limit: "30mb", extended: true }));

const PORT = process.env.PORT || 3000;
app.use("/", movieRoutes);

connectToDatabase()
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  })
  .catch((err) => {
    console.error("Error starting server:", err);
  });
