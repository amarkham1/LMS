const express = require('express');
const bodyParser = require('body-parser');
const bcrypt = require('bcrypt-nodejs');
const cors = require('cors');
const knex = require('knex');

const register = require('./controllers/register');
const signin = require('./controllers/signin');
const profile = require('./controllers/profile');
const deals = require('./controllers/deals');
const dealedit = require('./controllers/dealedit');
const adddealmodal = require('./controllers/adddealmodal');

const db = knex({
  client: 'pg',
  connection: {
    host : '127.0.0.1',
    user : 'andrewmarkham',
    password : '',
    database : 'lms'
  }
});

const app = express();

app.use(cors())
app.use(bodyParser.json());

app.get('/', (req, res)=> { res.send(database.users) })
app.post('/signin', signin.handleSignin(db, bcrypt))
app.post('/register', (req, res) => { register.handleRegister(req, res, db, bcrypt) })
app.get('/profile/:id', (req, res) => { profile.handleProfileGet(req, res, db)})
app.get('/deals', (req, res) => { deals.handleDealsGet(req, res, db)})
app.post('/dealsedit', (req, res) => { dealedit.handleDealEdit(req, res, db)})
app.get('/adddealmodal/tenant', (req, res) => { adddealmodal.handleAddDealModalTenant(req, res, db)})
app.get('/adddealmodal/property', (req, res) => { adddealmodal.handleAddDealModalProperty(req, res, db)})
app.post('/adddealmodal/unit', (req, res) => { adddealmodal.handleAddDealModalUnit(req, res, db)})
app.get('/adddealmodal/llbroker', (req, res) => { adddealmodal.handleAddDealModalLLBroker(req, res, db)})
app.get('/adddealmodal/ttbroker', (req, res) => { adddealmodal.handleAddDealModalTTBroker(req, res, db)})


app.listen(3000, ()=> {
  console.log('app is running on port 3000');
})