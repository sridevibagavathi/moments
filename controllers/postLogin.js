import { emailExists } from "../queries/signUp";
import pgConnection from "../services/postgres";
import statusCode from "../utils/httpStatusCode.json";

const logout = async (req, res) => {
  try {
    const { emailId } = req.body;
    const emailCheckQuery = emailExists(emailId);
    const result = await pgConnection(emailCheckQuery);
    if (!result.rows.length)
      return res
        .status(statusCode.CONFLICT)
        .send({ sucess: false, message: `Email not exists` });
    return res.send({ sucess: true, message: `User logged out successfully` });
  } catch (e) {
    return res.status(statusCode.CONFLICT).send({ sucess: false, message: e });
  }
};

export { logout };
