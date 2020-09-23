module.exports = function (io) {
  const express = require('express');
  const router = express.Router();
  // Se puede usar solo una linea: const router = require('express').Router();
  const tweetBank = require('../tweetBank');

  router.get('/', function (req, res, next) {
    let tweets = tweetBank.list();
    res.render('index', { tweets: tweets, showForm: true });

  });
  router.get('/users/:name', function (req, res, next) {
    var name = req.params.name;
    let tweets = tweetBank.find({ "name": name });
    res.render('index', { tweets: tweets, showForm: true, twitero: name });

  });
  router.get('/tweets/:id', function (req, res, next) {
    var id = Number(req.params.id);
    var tweet = tweetBank.find({ "id": id });

    res.render('index', { tweets: tweet, showForm: true });

  });
  router.post('/tweets', function (req, res, next) {
    var name = req.body.name;
    var text = req.body.text;
    let id = tweetBank.add(name, text);
    io.emit('newTweet', { name: name, text: text, id: id });
    res.redirect('/');
  });

  return router
}

