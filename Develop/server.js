const express = require('express');
const api = require('./routes/apiRoutes');
const docRoutes = require('./routes/docRoutes')

const PORT = 3001;

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/api', api);
app.use('/', docRoutes);

app.use(express.static('public'));

// app.get('/', (req, res) =>
//   res.sendFile(path.join(__dirname, '/public/index.html'))
// );

// GET Route for feedback page
// app.get('/feedback', (req, res) =>
//   res.sendFile(path.join(__dirname, '/public/notes'))
// );

app.listen(PORT, () =>
  console.log(`App listening at http://localhost:${PORT}`)
);
