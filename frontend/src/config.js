const { SERVER_HOST } = import.meta.env;

const config = {
  SERVER_HOST: SERVER_HOST || "http://localhost:3000",
};

export default config;