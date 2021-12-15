import {
  add,
  get,
  getCount,
  update,
  momentIdExists,
  archive,
} from "../queries/moments";
import { emailExists } from "../queries/signUp";
import { idAndEmailExists } from "../queries/login";
import pgConnection from "../services/postgres";
import statusCode from "../utils/httpStatusCode.json";
import {
  addValidator, updateValidator
} from "../validators/moment"
import { Whitelist } from "../data/consts"

const addMoment = async (req, res) => {
  try {
    const data = {
      ...req.body,
      image: req.file, // get single file
      // images: req.files // get multiple file
    };

    if (!(req.file) || !Whitelist.includes(req.file.mimetype)) {
      return res.status(statusCode.BAD_REQUEST).send({ success: false, message: `Image is mandatory & image files allowed with this mimetype ${Whitelist.join(" or ")}` })
    }
    const validator = addValidator(data)
    if (validator.error) return res.status(statusCode.BAD_REQUEST).send({ success: false, errorMessage: validator.error })
    const emailCheckQuery = emailExists(data.createdBy);
    const result = await pgConnection(emailCheckQuery);
    if (!result.rows.length)
      return res
        .status(statusCode.NOT_FOUND)
        .send({ sucess: false, message: `Email not exists` });

    const idEmailQuery = idAndEmailExists(data.createdBy, data.userId);
    const checkIdAgainstEmail = await pgConnection(idEmailQuery);
    if (!checkIdAgainstEmail.rows.length)
      return res
        .status(statusCode.NOT_FOUND)
        .send({ sucess: false, message: `Email-id and userId conflicts` });

    const addMomentQuery = add(data);
    const inserted = await pgConnection(addMomentQuery);
    if (!inserted.rowCount)
      return res.send({ success: false, message: `Error in inserting moment` });

    return res.send({ sucess: true, message: `Moment added successfully` });
  } catch (e) {
    return res
      .status(statusCode.BAD_REQUEST)
      .send({ sucess: false, message: e });
  }
};

const getMoment = async (req, res) => {
  try {
    let { searchValue, orderBy, orderByValue, offset, limit } = req.query;
    searchValue = searchValue ? `'%${searchValue}%'` : "";
    orderBy = orderBy || "id";
    orderByValue = orderByValue ? orderByValue.toLowerCase() : "asc";
    offset = Number(offset) * Number(limit) || 0;
    limit = Number(limit) || 10;

    const getQuery = get(searchValue, orderBy, orderByValue, limit, offset);
    const getCountQuery = getCount(searchValue);
    const [getData, count] = await Promise.all([
      await pgConnection(getQuery),
      await pgConnection(getCountQuery),
    ]);
    return res.send({
      success: true,
      totalCount: Number(count.rows[0].count),
      getData: getData.rows,
    });
  } catch (e) {
    return res
      .status(statusCode.BAD_REQUEST)
      .send({ sucess: false, message: e });
  }
};

const updateMoment = async (req, res) => {
  try {
    const data = {
      ...req.body,
      image: req.file, // get single file
      // images: req.files // get multiple file
    };
    if ((req.file) && !Whitelist.includes(req.file.mimetype)) {
      return res.status(statusCode.BAD_REQUEST).send({ success: false, message: `Image is mandatory & image files allowed with this mimetype ${Whitelist.join(" or ")}` })
    }
    const validator = updateValidator(data)
    if (validator.error) return res.status(statusCode.BAD_REQUEST).send({ success: false, errorMessage: validator.error })
    const emailCheckQuery = emailExists(data.updatedBy);
    const result = await pgConnection(emailCheckQuery);
    if (!result.rows.length)
      return res
        .status(statusCode.NOT_FOUND)
        .send({ sucess: false, message: `Email not exists` });

    const idEmailQuery = idAndEmailExists(data.updatedBy, data.userId);
    const checkIdAgainstEmail = await pgConnection(idEmailQuery);
    if (!checkIdAgainstEmail.rows.length)
      return res
        .status(statusCode.NOT_FOUND)
        .send({ sucess: false, message: `Email-id and userId conflicts` });

    const idQuery = momentIdExists(req.params.id);
    const checkMomentId = await pgConnection(idQuery);
    if (!checkMomentId.rows.length)
      return res
        .status(statusCode.NOT_FOUND)
        .send({ sucess: false, message: `Given moment id does not exists` });

    const updateMomentQuery = update(data, req.params.id);
    const updated = await pgConnection(updateMomentQuery);
    if (!updated.rowCount)
      return res.send({ success: false, message: `Error in updating moment` });

    return res.send({ sucess: true, message: `Moment updated successfully` });
  } catch (e) {
    return res
      .status(statusCode.BAD_REQUEST)
      .send({ sucess: false, message: e });
  }
};

const deleteMoment = async (req, res) => {
  const idQuery = momentIdExists(req.params.id);
  const checkMomentId = await pgConnection(idQuery);
  if (!checkMomentId.rows.length)
    return res
      .status(statusCode.NOT_FOUND)
      .send({ sucess: false, message: `Given moment id does not exists` });
  const deleteMomentQuery = archive(req.params.id);
  const deleted = await pgConnection(deleteMomentQuery);
  if (!deleted.rowCount)
    return res.send({ success: false, message: `Error in deleting moment` });
  return res.send({ sucess: true, message: `Moment deleted successfully` });
};

export { addMoment, getMoment, updateMoment, deleteMoment };
