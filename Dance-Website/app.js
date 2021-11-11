const express = require("express");
const path = require("path");
const app = express();
// getting-started.js
const mongoose = require('mongoose');
const bodyparser = require("body-parser")

main().catch(err => console.log(err));

async function main() {
  await mongoose.connect('mongodb://localhost/contactDance');
}
const port = 8000;
// , {useNewUrlParser: true} 

// Define Mongoose Schema 
const contactSchema = new mongoose.Schema({
    name: String,
    phone: String,
    email: String,
    address: String,
    desc: String
  });

const Contact = mongoose.model('Contact', contactSchema);



// Express Specific Stuff 
app.use('/static', express.static('static')) // For serving static files
app.use(express.urlencoded())



// Pug Specific Stuff 
app.set('view engine', 'pug') // Set the template engine as pug
app.set('views', path.join(__dirname, 'views')) // Set the views directory



// Endpoints
app.get('/', (req, res)=>{
    const params = {}
    res.status(200).render('home.pug', params);
})

app.get('/contact', (req, res)=>{
    const params = {}
    res.status(200).render('contact.pug', params);
})

app.post('/contact', (req, res)=>{
    var myData = new Contact(req.body);
    myData.save().then(()=>{
        res.send("This item has been saved to the database")
    }).catch(()=>{
        res.status(400).send("Item was not saved to the database")
    });
})



// Start the server 
app.listen(port, ()=>{
    console.log(`The application started succesfully on port ${port}`);
});

