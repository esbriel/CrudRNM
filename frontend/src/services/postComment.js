import config from "../config";

export const postComment = async (body) => {
  const response = await fetch(config.SERVER_HOST + "/comments", {
    method: "POST",
    body: body,
    headers: {
      "Content-Type": "application/json",
    },
  });

  const comments = await response.json();
  return comments;
};
