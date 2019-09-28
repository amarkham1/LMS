const handleUnits = (req, res, db) => {
  const { propertyname, units, rentablearea, storeys } = req.body;
  if (!propertyname || !units || !rentablearea || !storeys) {
    return res.status(400).json('incorrect form submission');
  }
  const unitgla = Math.round(rentablearea / storeys);
  const unitsInsert = units.map(units =>
    ({ propertyname: propertyname, unit: units, gla: unitgla }));
  console.log(unitsInsert);

    db.transaction(trx => {
      trx.insert(unitsInsert)
      .into('units')
      .returning('*')
      .then(unit => {
            res.json(unit);
      })
      
      .then(trx.commit)
      .catch(trx.rollback)
    })
    .catch(function(error) { console.log('Error', error); });
}

module.exports = {
  handleUnits: handleUnits
};