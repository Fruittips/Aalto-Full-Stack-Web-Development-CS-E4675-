const jwt = require("jsonwebtoken");
const logger = require("./logger");

const requestLogger = (request, response, next) => {
  logger.info("Method:", request.method);
  logger.info("Path:  ", request.path);
  logger.info("Body:  ", request.body);
  logger.info("---");
  next();
};

const unknownEndpoint = (request, response) => {
  response.status(404).send({ error: "Unknown Endpoint" });
};

const userExtractor = async (request, response, next) => {
  const getTokenFrom = (request) => {
    const authorization = request.get("authorization");
    if (authorization && authorization.toLowerCase().startsWith("bearer ")) {
      return authorization.substring(7);
    }
    return null;
  };

  const token = await getTokenFrom(request);

  if (!token) {
    return response.sendStatus(401);
  }

  const decodedToken = jwt.verify(token, process.env.SECRET);

  if (!decodedToken.id) {
    return response.status(401).json({ error: "token missing or invalid" });
  }
  request.user = decodedToken.id;
  next();
};

const errorHandler = (error, request, response, next) => {
  if (error.name === "CastError") {
    return response.status(400).send({ error: "Malformatted Id" });
  } else if (error.name === "ValidationError") {
    return response.status(400).json({ error: error.message });
  } else if (error.name === "JsonWebTokenError") {
    return response.status(401).json({ error: "invalid token" });
  }
  next(error);
};

module.exports = {
  requestLogger,
  unknownEndpoint,
  errorHandler,
  userExtractor,
};
