const signUpInsert = (data) => {
  return `insert into moments_login (first_name, last_name, mobile_number, email_id, city, password ) values ('${data.firstName}',
    '${data.lastName}',${data.mobileNumber},'${data.emailId}','${data.city}','${data.password}')`;
};

const emailExists = (email) => {
  return `select id, email_id from moments_login where email_id = '${email}' limit 1`;
};

export { signUpInsert, emailExists };
