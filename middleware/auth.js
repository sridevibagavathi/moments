import JWT from "jsonwebtoken";
import { JwtAlgorithm } from "../data/consts";
import statusCode from "../utils/httpStatusCode.json";
const RS256_PUBLIC_KEY = process.env.RS256_PUBLIC_KEY;

const auth = (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (!authHeader)
    return res.status(statusCode.UNAUTHORIZED).send({
      success: false,
      message: "Missing JWT Token",
    });
  try {
    const decoded = JWT.verify(authHeader.split(" ")[1], RS256_PUBLIC_KEY, {
      algorithms: [JwtAlgorithm],
    });
    req.token = { parsed: decoded, base64: authHeader };
  } catch (err) {
    return res.status(statusCode.UNAUTHORIZED).send({
      success: false,
      message: `Error verifying JWT Token: ${err.message}`,
    });
  }
  next();
};

export default auth;