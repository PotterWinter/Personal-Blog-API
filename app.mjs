import express from "express";
import cors from "cors";
import connectionPool from "./utils/db.mjs";

const app = express();
const port = process.env.PORT || 4000;

app.use(cors());
app.use(express.json());

app.get("/test", (req, res) => {
  res.send("Hello TechUp!");
});

app.post("/posts", async (req, res) => {
  const newPost = req.body;
  if (
    !newPost.title ||
    !newPost.image ||
    !newPost.category_id ||
    !newPost.description ||
    !newPost.content ||
    !newPost.status_id
  ) {
    return res.status(400).json({
      message:
        "Server could not create post because there are missing data from client",
    });
  }
  try {
    await connectionPool.query(
      `insert into posts (title,image,category_id,description,content,status_id) 
      values ($1, $2, $3, $4, $5, $6)`,
      [
        newPost.title,
        newPost.image,
        newPost.category_id,
        newPost.description,
        newPost.content,
        newPost.status_id,
      ]
    );
    return res.status(201).json({ message: "Created post sucessfully" });
  } catch (e) {
    return res.status(500).json({
      message: "Server could not create post because database connection",
    });
  }
});

app.listen(port, () => {
  console.log(`Server is running at ${port}`);
});
