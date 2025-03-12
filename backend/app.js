const express = require('express')
var cors = require('cors')
const app = express()
const main = require('./database');
const auth = require('./routes/auth');
const note = require('./routes/note');
const config = require('./config');

app.use(cors())
app.use(express.json());
main();


app.get('/', (req, res) => {
  res.send("Hello");
})

app.use("/api/auth",auth);
app.use("/api/notes",note);

app.listen(config.PORT, () => {
  console.log(`App listening on port ${config.PORT}`)
})