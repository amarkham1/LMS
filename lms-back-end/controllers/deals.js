const handleDealsGet = (req, res, db) => {
  db.select('*').from('deals')
    .then(deals => {
        res.json(deals)
    })
    .catch(err => res.status(400).json('error getting deals'))
}

module.exports = {
  handleDealsGet
}