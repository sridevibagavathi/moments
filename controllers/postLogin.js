import { emailExists } from "../queries/signUp";
import pgConnection from "../services/postgres";
import statusCode from "../utils/httpStatusCode.json";
import logoutValidator from "../validators/logout"

const logout = async (req, res) => {
  try {
    const { emailId } = req.body;
    const validator = logoutValidator({ emailId })
    if (validator.error) return res.status(statusCode.BAD_REQUEST).send({ success: false, errorMessage: validator.error })
    const emailCheckQuery = emailExists(emailId);
    const result = await pgConnection(emailCheckQuery);
    if (!result.rows.length)
      return res
        .status(statusCode.CONFLICT)
        .send({ success: false, message: `Email not exists` });
    return res.send({ success: true, message: `User logged out successfully` });
  } catch (e) {
    return res.status(statusCode.CONFLICT).send({ success: false, message: e });
  }
};

export { logout };
