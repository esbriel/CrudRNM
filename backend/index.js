const express = require("express");
const morgan = require("morgan");
const cors = require("cors");
const { port } = require("./config");
const { getConnection } = require("./dbConnection");

const app = express();

app.use(morgan("dev"));
app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.json({ status: "ok" });
});

app.get("/comments", async (req, res) => {
  try {
    const connection = await getConnection();
    const [rows] = await connection.query("SELECT * FROM comments ORDER BY created_at DESC");
    res.json(rows);
    connection.release();
  } catch (error) {
    console.error("Error al obtener los comentarios:", error);
    res.status(500).json({ error: "Error al obtener los comentarios" });
  }
});

app.post("/comments", async (req, res) => {
  const { name, message } = req.body;

  if (!name || !message) {
    return res
      .status(400)
      .json({ error: "Nombre y comentario son requeridos" });
  }

  try {
    const conexion = await getConnection();
    const result = await conexion.query(
      "INSERT INTO comments (name, message) VALUES (?, ?)",
      [name, message]
    );

    const insertedId = result[0].insertId;

    const [rows] = await conexion.query(
      "SELECT * FROM comments WHERE id = ?",
      [insertedId]
    );

    conexion.release();
    res.status(201).json(rows[0]);
  } catch (error) {
    console.error("Error al insertar el comentario:", error);
    return res.status(500).json({ error: "Error al insertar el comentario" });
  }
});

app.listen(port, () => {
  console.log("Servidor ejecuntandose en el puerto", port);
});
