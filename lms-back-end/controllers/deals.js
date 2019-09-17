const handleDealsGet = (req, res, db) => {
  db.select('*').from('deals')
    .then(deals => {
        res.json(deals)
    })
    .catch(err => res.status(400).json('error getting deals'))
}

const handleDealIDGet = (req, res, db) => {
  const { id } = req.params;
  if (!id) {
    return res.status(400).json('deal does not exist');
  }
  db.select('*').from('deals')
    .where('id', '=', id)
    .then(deal => {
      res.json(deal)
    })
    .catch(err => res.status(400).json('error getting deal'))
}

module.exports = {
  handleDealsGet,
  handleDealIDGet
}