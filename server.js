const express = require('express');
const webpackDevMiddleware = require('webpack-dev-middleware');
const webpack = require('webpack');
const webpackConfig = require('./webpack.config.js');
const app = express();
const bodyParser = require('body-parser');
const compiler = webpack(webpackConfig);
const dataHelper = require('./dataHelper');
const pool = require('./db');
 
app.use(express.static(__dirname + '/www'));
 
app.use(webpackDevMiddleware(compiler, {
  hot: true,
  filename: 'bundle.js',
  publicPath: '/',
  stats: {
    colors: true,
  },
  historyApiFallback: true,
}));
 
const server = app.listen(3000, () => {
  const host = server.address().address;
  const port = server.address().port;
  console.log('Example app listening at http://%s:%s', host, port);
});

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get('/todos', (req, res) => {
    getTodosAndHttpSend(res);
});

app.post('/todo', (req, res) => {
  // console.log('express todo', req.body);
  const todo = req.body;
  pool.query(
    'UPDATE todo ' +
    'SET todo_name = $1, due_date = $2, is_done = $3, note = $4 ' +
    'WHERE id = $5',
    [todo.name, todo.dueDate, todo.isDone, todo.note, todo.id], 
    (error, result) => {
      if (error) {
        console.error('error running query, update', error);
      }
      getTodoByIdAndHttpSend(res, todo.id);
  });
});

app.put('/todo', (req, res) => {
  // console.log('express put todo', req.body);
  const todo = req.body;
  pool.query(
    'INSERT INTO todo (todo_name, due_date, is_done, note) ' +
    'VALUES ($1, $2, $3, $4)',
    [todo.name, todo.dueDate, todo.isDone, todo.note],
    (error, result) => {
      if (error) {
        console.error('error running query, insert', error);
      }

      getTodosAndHttpSend(res);
    });
});

app.delete('/todo/:uid', (req, res) => {
  const id = req.params.uid;

  pool.query(
    'UPDATE todo ' +
    'SET is_deleted = TRUE ' +
    'WHERE id = $1',
    [id], 
    (error, result) => {
      if (error) {
        console.error('error running query, delete', error);
      }
      getTodosAndHttpSend(res);
  });
})

function getTodosAndHttpSend(res) {
  pool.query('SELECT * FROM todo WHERE is_deleted = FALSE ORDER BY id', (error, result) => {
    if (error) {
      console.error('error running query, select all', error);
    }
    
    res.send(dataHelper.getFormattedTodos(result.rows));
  });
}

function getTodoByIdAndHttpSend(res, id) {
  pool.query('SELECT * FROM todo WHERE id = $1', [id], (error, result) => {
    if (error) {
      console.error('error running query, select by id', error);
    }
  
    res.send(dataHelper.getFormattedTodos(result.rows)[0]);
  });
}