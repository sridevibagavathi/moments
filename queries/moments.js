const add = (data) => {
  return `insert into moments (title, tags, image, created_by, user_id ) values ('${data.title
    }',
    '${data.tags}','${JSON.stringify(data.image)}','${data.createdBy}',${data.userId
    })`;
};

const get = (searchValue, orderBy, orderByValue, limit, offset) => {
  let query = `select id, title, tags, image from moments where active = 1`
  if (searchValue) query += `and title ilike ${searchValue}`
  query += ` order by ${orderBy} ${orderByValue} offset ${offset} limit ${limit}`;
  return query
};

const getCount = (searchValue) => {
  let query = `select count(*) from moments where active = 1`;
  if (searchValue) query += `and title ilike ${searchValue}`
  return query
};

const update = (data, id) => {
  let query = `update moments set updated_by = '${data.updatedBy
    }', user_id = ${data.userId} `;

  if (data.title) query += `, title = '${data.title}'`
  if (data.tags) query += `, tags = '${data.tags
    }'`
  if (data.image) query += `, image = '${JSON.stringify(data.image)}'`

  query += ` where id = ${id} and active = 1`
  return query
};

const momentIdExists = (id) => {
  return `select id from moments where id = ${id} and active = 1 limit 1`;
};

const archive = (id) => {
  return `update moments set active = 0 where id = ${id} and active = 1`;
};

export { add, get, getCount, update, momentIdExists, archive };
