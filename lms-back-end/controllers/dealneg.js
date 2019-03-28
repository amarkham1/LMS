const handleDealNegEdit = (req, res, db) => {
  const { 
    dealid,
    propertyname,
    unit,
    gla,
    status,
    /* add status and active */
    cdate,
    fdate,
    rent1,
    rent1start,
    rent1months,
    rent1end,
    ti,
    intcomm,
    extcomm,
    llw,
    gfrent,
    gfrentstart,
    gfrentend,
  } = req.body;
  if (!dealid || !propertyname || !unit || !gla || !status || !cdate || !fdate || !rent1 || !rent1end || !rent1start || !rent1months || !ti || !llw || !intcomm || !extcomm || !gfrent || !gfrentstart || !gfrentend) {
    return res.status(400).json('incorrect form submission');
  }

  console.log('gla', gla, '   ti', ti, '   intcomm', intcomm, '   extcomm', extcomm, '   llw', llw, '    gf rent', gfrent);
  dealcosts = gla * (Number(ti) + Number(intcomm) + Number(extcomm) + Number(llw) + Number(gfrent));

    db.transaction(trx => {
      trx.insert({
        dealid: dealid,
        unit: unit,
        propertyname: propertyname,
        gla: gla,
        status: status,
        cdate: cdate,
        fdate: fdate,
        currdate: new Date(),
        rent1: rent1,
        rent1months: rent1months,
        rent1start: rent1start,
        rent1end: rent1end,
        ti: ti,
        intcomm: intcomm,
        extcomm: extcomm,
        llw: llw,
        gfrent: gfrent,
        gfrentstart: gfrentstart,
        gfrentend: gfrentend,
        dealcosts: dealcosts,
      })
      .into('dealdetail')
      .returning('*')
      .then(dealneg => {
            res.json(dealneg[0]);
          })
      .then(trx.commit)
      .catch(trx.rollback)
    })
    .catch(err => res.status(400).json(err))
}

const handleDealNegGet = (req, res, db) => {
  const { id } = req.params;
  if (!id) {
    return res.status(400).json('deal does not exist');
  }
  db.select('*').from('dealdetail')
    .where('dealid', '=', id)
    .then(dealneg => {
      res.json(dealneg)
    })
    .catch(err => res.status(400).json('error getting deal negotiation'))
}

module.exports = {
  handleDealNegEdit: handleDealNegEdit,
  handleDealNegGet: handleDealNegGet
};