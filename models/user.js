const db = require("../utils/database");

module.exports = class User {
  constructor(firstname, lastname, email, role, status) {
    this.firstname = firstname;
    this.lastname = lastname;
    this.email = email;
    this.role = role;
    this.status = status;
  }

  save() {
    return db.execute(
      "INSERT INTO user (firstname, lastname, email, role, status) VALUES (?, ?, ?, ?, ?)",
      [this.firstname, this.lastname, this.email, this.role, this.status]
    );
  }

  update(id) {
    return db.execute(
      "UPDATE user SET firstname=?, lastname=?, email=?, role=?, status=? WHERE id=?",
      [this.firstname, this.lastname, this.email, this.role, this.status, id]
    );
  }

  static deleteById(id) {
    return db.execute(`DELETE FROM user WHERE id=${id}`);
  }

  static getAllUsers() {
    return db.execute("SELECT * FROM user");
  }
  static getUserById(id) {
    return db.execute(`SELECT * FROM user WHERE id=${id}`);
  }
};
