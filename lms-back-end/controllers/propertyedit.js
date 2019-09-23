const handlePropertyEdit = (req, res, db, bcrypt) => {
  const { propertyname, address, city, rentablearea, storeys, siteareasf, yearbuilt, yearacquired } = req.body;
  if (!propertyname || !address || !city || !rentablearea || !storeys) {
    return res.status(400).json('incorrect form submission');
  }
    db.transaction(trx => {
      trx.insert({
        propertyname: propertyname,
        address: address,
        city: city,
        rentablearea: rentablearea,
        storeys: storeys,
        siteareasf: siteareasf,
        yearbuilt: yearbuilt,
        yearacquired: yearacquired,
      })
      .into('properties')
      .returning('*')
      .then(property => {
            res.json(property[0]);
          })
      .then(trx.commit)
      .catch(trx.rollback)
    })
    .catch(err => res.status(400).json('unable to register'))
}

module.exports = {
  handlePropertyEdit: handlePropertyEdit
};