const passwordExists = (email, password) => {
    return `select email_id from moments_login where email_id = '${email}' and password = '${password}' limit 1`
}

const idAndEmailExists = (email, id) => {
    return `select id, email_id from moments_login where email_id = '${email}' and id = ${id} limit 1`
}

export {
    passwordExists,
    idAndEmailExists
}