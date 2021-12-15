const add = (data) => {
    return `insert into moments (title, tags, image, created_by, user_id ) values ('${data.title}',
    '${data.tags}','${JSON.stringify(data.image)}','${data.createdBy}',${data.userId})`
}

const get = (searchValue, orderBy, orderByValue, limit, offset) => {
    return `select id, title, tags, image from moments where title ilike ${searchValue} and active = 1 order by ${orderBy} ${orderByValue} offset ${offset} limit ${limit}`
}

const getCount = (searchValue) => {
    return `select count(*) from moments where title ilike ${searchValue} and active = 1`
}

const update = (data, id) => {
    return `update moments set title = '${data.title}', tags = '${data.tags}', image = '${JSON.stringify(data.image)}', updated_by = '${data.updatedBy}', user_id = ${data.userId} where id = ${id} and active = 1`
}

const momentIdExists = (id) => {
    return `select id from moments where id = ${id} and active = 1 limit 1`
}

const archive = (id) => {
    return `update moments set active = 0 where id = ${id} and active = 1`
}

export {
    add,
    get,
    getCount,
    update,
    momentIdExists,
    archive
}