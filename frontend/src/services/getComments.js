import config from "../config";

export const getComments = async () => {
  try {
    const response = await fetch(config.SERVER_HOST + "/comments");
    if (!response.ok) {
      throw new Error("Error al obtener los comentarios");
    }
    const comments = await response.json();
    return comments;
  } catch (error) {
    console.error("Error al obtener los comentarios:", error);
    throw error;
  }
};
