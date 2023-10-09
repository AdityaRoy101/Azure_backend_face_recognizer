const express = require('express');
const bcrypt = require('bcrypt-nodejs');
const cors = require('cors');
const knex = require('knex');

const register = require('./controllers/register');
const signin = require('./controllers/signin');
const profile = require('./controllers/profile');
const image = require('./controllers/image');

const db = knex({
    client: 'pg',
    connection: {
      connectionString : 'postgres://facerecognizer_database_postgres_eiup_user:0zwQGTRB4mungM7F2lxi6xDCE8ghNfy6@dpg-cki3cb212bvs739kh78g-a.oregon-postgres.render.com/facerecognizer_database_postgres_eiup',
      ssl: { rejectUnauthorized: false },
      host: 'dpg-cki3cb212bvs739kh78g-a',
      port : 5432,
      user : 'facerecognizer_database_postgres_eiup_user',
      password : '0zwQGTRB4mungM7F2lxi6xDCE8ghNfy6',
      database : 'facerecognizer_database_postgres_eiup'
    }
});




const app = express();
app.use(express.json());
app.use(cors());

// ===================================================

app.get('/', (req, res) => {
    res.send('success');
})


// const database = {
//     users:[
//         {
//             id: '123',
//             name: 'John',
//             email: 'john@gmail.com',
//             password: 'cookies',
//             entries: 0,
//             joined: new Date()
//         },
//         {
//             id: '124',
//             name: 'sally',
//             email: 'sally@gmail.com',
//             password: 'muffins',
//             entries: 0,
//             joined: new Date()
//         }
//     ],
//     login:[
//         {
//             id: '987',
//             hash: '',
//             email: 'john@gmail.com'
//         }
//     ]
// }



app.post('/signin', (req,res) => { signin.handleSignin(req, res, db, bcrypt) })

app.post('/register', (req,res) => { register.handleRegister(req, res, db, bcrypt) })

app.get('/profile/:id', (req,res) => { profile.handleProfile(req, res, db) })


app.put('/image', (req, res) => { image.handleImage(req, res, db) })
 
app.post('/imageurl', (req, res) => { image.handleApiCall(req, res) })


var port = process.env.PORT || 3000;
app.listen(port, () =>{
    console.log('Server running on Port' + port);
})

/*
    / -->res = Hey server is at Root
    /signin --> POST -->SUCCESS/FAIL
    /register --> POST -->user
    /profile/:userId --> GET = user
    /image --> PUT --> user
*/