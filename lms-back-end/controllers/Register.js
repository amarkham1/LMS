const handleRegister = (req, res, db, bcrypt) => {
  const { email, firstName, lastName, password } = req.body;
  if (!email || !firstName || !lastName || !password) {
    return res.status(400).json("incorrect form submission");
  }
  /*db.transaction(trx => {
    trx.from('users')
    .where({email: email})
    .then(exists => {
      res.json(email);
    })
  })*/
  const hash = bcrypt.hashSync(password);
  db.transaction(trx => {
    trx
      .insert({
        hash: hash,
        email: email
      })
      .into("login")
      .returning("email")
      .then(loginEmail => {
        return trx("users")
          .returning("*")
          .insert({
            email: loginEmail[0],
            firstname: firstName,
            lastname: lastName,
            joined: new Date()
          })
          .then(user => {
            res.json(user[0]);
          });
      })
      .then(trx.commit)
      .catch(trx.rollback);
  }).catch(err => res.status(err.status || 500).json("unable to register"));
};

module.exports = {
  handleRegister: handleRegister
};
