import { emailExists, signUpInsert } from "../queries/signUp";
import { passwordExists } from "../queries/login";
import pgConnection from "../services/postgres";
import statusCode from "../utils/httpStatusCode.json";
import JWT from "jsonwebtoken";
const RS256_PRIVATE_KEY = process.env.RS256_PRIVATE_KEY;
const TOKEN_EXPIRY_HOURS = process.env.JWT_TOKEN_EXPIRY_HOURS;
import { JwtAlgorithm } from "../data/consts";
import signUpValidator from "../validators/signUp"
import loginValidator from "../validators/login"

const signUp = async (req, res) => {
  try {
    const data = req.body;
    const validator = signUpValidator(data)
    if (validator.error) return res.status(statusCode.BAD_REQUEST).send({ success: false, errorMessage: validator.error })
    const emailCheckQuery = emailExists(data.emailId);
    const result = await pgConnection(emailCheckQuery);
    if (result.rows.length)
      return res
        .status(statusCode.CONFLICT)
        .send({ success: false, message: `Email already exists` });
    const insertQuery = signUpInsert(data);
    const inserted = await pgConnection(insertQuery);
    return res.send({
      success: true,
      message: inserted.rowCount
        ? `User created successfully!!`
        : `Sorry unable to create user!!`,
    });
  } catch (e) {
    return res.status(statusCode.CONFLICT).send({ success: false, message: e });
  }
};

const login = async (req, res) => {
  try {
    const { emailId, password } = req.body;
    const validator = loginValidator({ emailId, password })
    if (validator.error) return res.status(statusCode.BAD_REQUEST).send({ success: false, errorMessage: validator.error })
    const emailCheckQuery = emailExists(emailId);
    const emailCheck = await pgConnection(emailCheckQuery);
    if (!emailCheck.rowCount)
      return res
        .status(statusCode.BAD_REQUEST)
        .send({ success: false, message: `Wrong credentials` });
    const passwordCheckQuery = passwordExists(emailId, password);
    const passwordCheck = await pgConnection(passwordCheckQuery);
    if (!passwordCheck.rowCount)
      return res
        .status(statusCode.BAD_REQUEST)
        .send({ success: false, message: `Wrong credentials` });
    const token = JWT.sign({ emailId, password }, RS256_PRIVATE_KEY, {
      algorithm: JwtAlgorithm,
      expiresIn: TOKEN_EXPIRY_HOURS,
    });
    return res.send({
      success: true,
      token,
      userId: emailCheck.rows[0].id,
      emailId,
    });
  } catch (e) {
    return res.status(statusCode.CONFLICT).send({ success: false, message: e });
  }
};

export { signUp, login };
