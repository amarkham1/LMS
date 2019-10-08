const handlePropertyGet = (req, res, db) => {
  db.select("*")
    .from("properties")
    .then(property => {
      res.json(property);
    })
    .catch(err => res.status(err.status || 500).json("error getting properties"));
};

const handlePropertyIDGet = (req, res, db) => {
  const { id } = req.params;
  if (!id) {
    return res.status(400).json("property does not exist");
  }
  db.select("*")
    .from("properties")
    .where("id", "=", id)
    .then(property => {
      res.json(property);
    })
    .catch(err => res.status(err.status || 500).json("error getting property"));
};

module.exports = {
  handlePropertyGet,
  handlePropertyIDGet
};
