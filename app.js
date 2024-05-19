require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const db = require('./models');
const routes = require('./routes/routes');
const cors = require('cors')

const app = express();

app.use(cors())
app.use(
 bodyParser.urlencoded({
   extended: false
 })
);

app.use(bodyParser.json());

const sequelize = db.sequelize;
sequelize
 .sync()
 .then(() => {
   console.log('Database & tables created!');
 })
 .catch(err => {
   console.log(err);
 });

app.use(routes);
require("./routes/routes");

app.use((err, req, res, next) => {
 if (err.name === 'UnauthorizedError') {
   res.status(401).send('Invalid Token...');
 }
 next();
});


app.get("/", (req, res) => {
    res.send("Welcome to the Yukimito server WAHAHA!");
  });


// Start server
const PORT = process.env.PORT;
app.listen(PORT, () => {
 console.log(`Server is running on port ${PORT}.`);
});