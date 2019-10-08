const handleAddDealModalTenant = (req, res, db) => {
  db.select("tenantname")
    .from("tenants")
    .then(tenants => {
      res.json(tenants);
    })
    .catch(err => res.status(err.status || 500).json("error getting deals"));
};

const handleAddDealModalProperty = (req, res, db) => {
  db.select("propertyname")
    .from("properties")
    .then(properties => {
      res.json(properties);
    })
    .catch(err => res.status(err.status || 500).json("error getting deals"));
};

const handleAddDealModalUnit = (req, res, db) => {
  const { property } = req.body;
  if (!property) {
    return res.status(err.status || 500).json("incorrect form submission");
  }
  db.select("unit")
    .from("units")
    .where("propertyname", "=", property)
    .then(units => {
      res.json(units);
    })
    .catch(err => res.status(err.status || 500).json("error getting deals"));
};

const handleAddDealModalLLBroker = (req, res, db) => {
  db.select("brokername")
    .from("llbroker")
    .then(brokers => {
      res.json(brokers);
    })
    .catch(err => res.status(err.status || 500).json("error getting deals"));
};

const handleAddDealModalTTBroker = (req, res, db) => {
  db.select("brokername")
    .from("ttbroker")
    .then(brokername => {
      res.json(brokername);
    })
    .catch(err => res.status(err.status || 500).json("error getting deals"));
};

module.exports = {
  handleAddDealModalTenant,
  handleAddDealModalProperty,
  handleAddDealModalUnit,
  handleAddDealModalLLBroker,
  handleAddDealModalTTBroker
};
