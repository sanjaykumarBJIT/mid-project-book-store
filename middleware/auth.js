const { failure } = require("../util/common");
const jsonwebtoken = require("jsonwebtoken");
const statusCodes = require("../constants/statusCodes");

const isAuthorized = (req, res, next) => {
  try {
    if (!req.headers.authorization) {
      return res
        .status(statusCodes.UNAUTHORIZED)
        .send(failure("Unauthorized access"));
    }
    const jwtToken = req.headers.authorization.split(" ")[1];

    const validate = jsonwebtoken.verify(jwtToken, process.env.SECRET_KEY);

    if (validate) {
      const decoded = jsonwebtoken.decode(jwtToken, (verify = true));
      console.log("Decoded:::::::::::::::::",decoded);
      if (decoded.user.access === "admin") {
        next();
      } else {
        return res
          .status(statusCodes.UNAUTHORIZED)
          .send(failure("Access permission denied"));
      }
    } else {
      throw new Error();
    }
  } catch (error) {
    console.log("Error thrown: ", error);
    if (error instanceof jsonwebtoken.JsonWebTokenError) {
      return res
        .status(statusCodes.UNAUTHORIZED)
        .send(failure("Token is invalid"));
    }

    if (error instanceof jsonwebtoken.TokenExpiredError) {
      return res
        .status(statusCodes.UNAUTHORIZED)
        .send(failure("Token has been expired"));
    }
  }
};

// const isSpamming = (req, res, next) => {};


module.exports = { isAuthorized };
