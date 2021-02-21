const db = require("../database/dbConfig.js");

module.exports = {
  findAll,
  findById,
  addUser,
  findByUsername
};

function findAll() {
  return db("users").select("id", "username");
}

function findById(id) {
  return db("users")
    .where({ id })
    .first();
}
function findByUsername(username) {
    return db('users').where({ username }).first();
}

function addUser(user) {
  return db("users")
    .insert(user, "id")
    .then(ids => {
      const [id] = ids;
      return findById(id);
    });
}
