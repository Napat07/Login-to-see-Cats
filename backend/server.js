const express = require('express');
const session = require('express-session')
const soap = require('soap');
const cors = require('cors')
const bodyParser = require('body-parser')
let router = express.Router();
const url = 'https://passport.psu.ac.th/authentication/authentication.asmx?wsdl';
const app = express();
const routes = require('./routes')

const env = require('dotenv').config()

app.use(cors({ origin: ['http://localhost:3000'], methods: ['GET', 'POST'], credentials: true }));
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
app.use('/api', bodyParser.json(), router);  
app.use('/api', bodyParser.urlencoded({ extended: false }), router);

app.use(session({
   secret: 'keyboard cat', cookie: { maxAge: 60000 },
   resave: false, saveUninitialized: false
}))

let bears = [
   { 'id': 0, 'name': 'Cat', 'weight': 007, 'img': 'https://i.pinimg.com/736x/60/d9/26/60d9269a5ada1ee5e2f5161d036209e5.jpg' },
    { 'id': 1, 'name': 'Catcat', 'weight': 111, 'img': 'https://i.pinimg.com/originals/f3/bd/84/f3bd8497e15399201b634714ec5ed390.jpg' },
    { 'id': 2, 'name': 'Cat3', 'weight': 213, 'img': 'https://i.imgur.com/gdWIxn2.jpg' },
    { 'id': 3, 'name': 'Cat4', 'weight': 652, 'img': 'https://lh3.googleusercontent.com/ObdbSatQvNUymufVs3vL5YmhGdvs3w5vvTciaGLFQOZoREVAEIIueioFOrWk9je_fqxR' },
    { 'id': 4, 'name': 'Cat5', 'weight': 43, 'img': 'https://images.unsplash.com/photo-1548681528-6a5c45b66b42?ixlib=rb-1.2.1&w=1000&q=80' },
    { 'id': 5, 'name': 'Cat6', 'weight': 34, 'img': 'https://fsb.zobj.net/crop.php?r=DIRnAiiiyJkFkfpMsvWknlEIXkuYLfYvI-s3DG3Afrdgn54EWiIqaNqyjomP1mJo8-iAIaZo8J6kdNhqsDwLm8b90xiYYxYOirvHOlW-SCHgqgsNsidIfDxCmtJjgK5LfIQkKEU3uxI1Yv1H' }

];

router.route('/bears')
   // get all bears
   .get((req, res) => res.json(bears))
   // insert a new bear
   .post((req, res) => {
      var bear = {};
      bear.id = bears.length > 0 ? bears[bears.length - 1].id + 1 : 0;
      bear.name = req.body.name
      bear.weight = req.body.weight
      bear.img = req.body.img
      bears.push(bear);
      res.json({ message: 'Bear created!' })
   })

router.route('/bears/:bear_id')
   .get((req, res) => {
      let id = req.params.bear_id
      let index = bears.findIndex(bear => (bear.id === +id))
      res.json(bears[index])                   // get a bear
   })
   .put((req, res) => {                               // Update a bear
      let id = req.params.bear_id
      let index = bears.findIndex(bear => (bear.id === +id))
      bears[index].name = req.body.name;
      bears[index].weight = req.body.weight;
      bears[index].img = req.body.img;
      res.json({ message: 'Bear updated!' + req.params.bear_id });
   })
   .delete((req, res) => {                   // Delete a bear
      // delete     bears[req.params.bear_id]
      let id = req.params.bear_id
      let index = bears.findIndex(bear => bear.id === +id)
      bears.splice(index, 1)
      res.json({ message: 'Bear deleted: ' + req.params.bear_id });
   })




app.get('/', routes.index);
app.get('/login/callback', routes.loginCallback);
app.get('/logout', routes.logout);

const out = `
<html>
<style>
body {
  text-align: center;
}
</style>
<body>
<img src="https://www.computing.psu.ac.th/th/wp-content/uploads/2018/03/Logo-PSU-TH-01.png" width="450" height="270"/>
  <h2>PSU Passport Authentication (SOAP) </h2>
 <form action="/psupassport" method="post">
 Username: <input type="text" name="username" /> <br>
 Password: <input type="password" name="password" /> <br>
 <input type="submit" value="Submit">
</form>
</body>
</html> 
`
app.get('/psupassport', (req, res) => {
   res.send(out)
})
app.post('/psupassport', (req, res) => {
   soap.createClient(url, (err, client) => {
      if (err) {
         res.redirect("http://localhost:80")
      }
      else {
         let user = {}
         user.username = req.body.username
         user.password = req.body.password

         client.GetStaffDetails(user, function (err, response) {

            if (err) {
               res.redirect("http://localhost:80")
            }
            else {
               console.log(response);
               if (response.GetStaffDetailsResult.string[0]) {
                  req.session.access_token = '123'
                  req.session.expires = 60000
                  res.redirect("http://localhost:3000/#cat")
               } else {
                  res.redirect("http://localhost:80")
               }
            }
         });
      }
   });
})

app.get('/test', (req, res) => {
   if (req.session.access_token)
      return res.sendStatus(200)
   res.sendStatus(401)
})


app.listen(process.env.PORT, () => console.log('server running ' + process.env.PORT));
