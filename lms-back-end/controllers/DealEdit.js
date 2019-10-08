const handleDealEdit = (req, res, db) => {
  const { tenant, property, unit, llbroker, ttbroker } = req.body;
  if (!tenant || !property || !unit || !llbroker || !ttbroker) {
    return res.status(400).json("incorrect form submission");
  }
  db.transaction(trx => {
    trx
      .insert({
        tenant: tenant,
        property: property,
        unit: unit,
        llbroker: llbroker,
        ttbroker: ttbroker,
        creationdate: new Date()
      })
      .into("deals")
      .returning("*")
      .then(deal => {
        res.json(deal[0]);
      })
      .then(trx.commit)
      .catch(trx.rollback);
  }).catch(err => res.status(err.status || 500).json("unable to register"));
};

module.exports = {
  handleDealEdit: handleDealEdit
};
