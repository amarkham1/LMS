const express = require("express");
const bodyParser = require("body-parser");
const bcrypt = require("bcrypt-nodejs");
const cors = require("cors");
const knex = require("knex");

const register = require("./controllers/register");
const signin = require("./controllers/signin");
const profile = require("./controllers/profile");
const deals = require("./controllers/deals");
const dealedit = require("./controllers/dealedit");
const dealneg = require("./controllers/dealneg");
const property = require("./controllers/property");
const propertyedit = require("./controllers/propertyedit");
const adddealmodal = require("./controllers/adddealmodal");
const units = require("./controllers/units");

const local = true;

if (local = true) {
	const db = knex({
		client: 'pg',
		connection: {
			host: '127.0.0.1',
			user: 'user',
			password: '',
			database: 'lmstest',
		}
	});
} else {
	const db = knex({
		client: "pg",
		connection: {
			connectionString: process.env.DATABASE_URL,
			ss1: true
		}
	});
}

const app = express();

app.use(cors());
app.use(bodyParser.json());

app.get("/", (req, res) => {
	res.send("it is working");
});
app.post("/signin", signin.handleSignin(db, bcrypt));
app.post("/register", (req, res) => {
	register.handleRegister(req, res, db, bcrypt);
});
app.get("/profile/:id", (req, res) => {
	profile.handleProfileGet(req, res, db);
});
app.get("/deals", (req, res) => {
	deals.handleDealsGet(req, res, db);
});
app.get("/deals/:id", (req, res) => {
	deals.handleDealIDGet(req, res, db);
});
app.post("/dealsedit", (req, res) => {
	dealedit.handleDealEdit(req, res, db);
});
app.post("/dealneg/:id", (req, res) => {
	dealneg.handleDealNegEdit(req, res, db);
});
app.get("/dealneg/:id", (req, res) => {
	dealneg.handleDealNegGet(req, res, db);
});
app.get("/property", (req, res) => {
	property.handlePropertyGet(req, res, db);
});
app.get("/property/:id", (req, res) => {
	property.handlePropertyIDGet(req, res, db);
});
app.post("/propertyedit", (req, res) => {
	propertyedit.handlePropertyEdit(req, res, db);
});
app.post("/units", (req, res) => {
	units.handleUnits(req, res, db);
});
app.get("/adddealmodal/tenant", (req, res) => {
	adddealmodal.handleAddDealModalTenant(req, res, db);
});
app.get("/adddealmodal/property", (req, res) => {
	adddealmodal.handleAddDealModalProperty(req, res, db);
});
app.post("/adddealmodal/unit", (req, res) => {
	adddealmodal.handleAddDealModalUnit(req, res, db);
});
app.get("/adddealmodal/llbroker", (req, res) => {
	adddealmodal.handleAddDealModalLLBroker(req, res, db);
});
app.get("/adddealmodal/ttbroker", (req, res) => {
	adddealmodal.handleAddDealModalTTBroker(req, res, db);
});

app.listen(process.env.PORT || 3000, () => {
	console.log(`app is running on port ${process.env.PORT}`);
});
