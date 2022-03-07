const express = require('express');
//library cors
const cors = require('cors');

// Routers
const { todosRouter } = require('./routes/todo.routes');

const { sequelize } = require('./utils/database');

// Init express app
const app = express();

app.use(express.json());
app.use(cors());

// Enable JSON incoming data
app.use(express.json());
app.use('*', cors());

// Endpoints
// http://localhost:4000/api/v1/
app.use('/api/v1/todos', todosRouter);

sequelize
  .authenticate()
  .then(() => console.log('Database authenticate'))
  .catch((err) => console.log(err));

//Generate to models
sequelize
  .sync()
  .then(() => console.log('Database synced'))
  .catch((err) => console.log(err));

app.listen(4000, () => {
  console.log('Express app running');
});
