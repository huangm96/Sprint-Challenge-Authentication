const db = require("../database/dbConfig.js");

module.exports = {
  findAll,
    findById,
    addUser,
  findBySth
};

function findAll() {
  return db("users").select("id", "username");
}

function findById(id) {
  return db("users")
    .where({ id })
    .first();
}
function findBySth(sth) {
    return db('users').where({ sth }).first();
}

function addUser(user) {
  return db("users")
    .insert(user, "id")
    .then(ids => {
      const [id] = ids;
      return findById(id);
    });
}
