//dependencies
const express = require('express');
const app = express();
const methodOverride = require("method-override");
const PORT = 3000
//data
const budget = require('./models/budget.js');


// body-parser
app.use(express.static('public')); //statically match with file named public
app.use(express.json()); // for parsing application/json
app.use(express.urlencoded({ extended: false }));
app.use(methodOverride("_method"));

const sum = () => {
  let bank = 0
  for (let i = 0; i < budget.length; i++) {
    bank += parseFloat(budget[i].amount);
  }
  bank = parseFloat(bank); 

  return bank;
}

// INDEX route
app.get('/budgets', (req, res) => {
  res.render('index.ejs', { 
    budget: budget,
    bank: sum()
  });

});

// new route Note: new route must be above show route
app.get('/budgets/new', (req, res) => {
  res.render('new.ejs');
});

app.post('/budgets' , (req,res) => {
  req.body.amount = parseFloat(req.body.amount); 
  budget.push(req.body)
  res.redirect('/')
})


// SHOW route
app.get('/budgets/:index', (req, res) => {
  res.render('budgets/show.ejs', {
      fruit: budgets[req.params.index],
      title: 'show'
  })
})

// Listener

// Listener
app.listen(PORT, ()=> console.log(`You are listening to the smoothe sounds of port ${PORT}...`))