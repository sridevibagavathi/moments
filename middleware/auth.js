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

// export default class Auth {
//     public async handle({ request, response }: HttpContextContract, next: () => Promise<void>) {
//         const authHeader = request.header('authorization')
//         if (!authHeader)
//             return response.unauthorized({
//                 success: false,
//                 message: 'Missing JWT Token',
//             })

//         try {
//             const decoded = JWT.verify(authHeader.split(' ')[1], JWT_SECRET_KEY) as JWTPayload
//             const isVerified = decoded.claims.verified

//             if (!isVerified)
//                 return response.unauthorized({
//                     success: false,
//                     message: 'User not verified',
//                 })

//             if (request.ctx) request.ctx.token = { parsed: decoded, base64: authHeader }
//         } catch (err) {
//             return response.unauthorized({
//                 success: false,
//                 message: `Error verifying JWT Token: ${err.message}`,
//             })
//         }

//         await next()
//         return response.send(await Compression.zipResponse(response))
//     }
// }
