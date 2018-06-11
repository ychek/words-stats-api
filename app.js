'use strict';

const express = require('express');
const { Trie } = require('./bll/trie');
const parser = require('./bll/parser');

const app = express();
const port = process.env.PORT || 5555;

// Create an empty Trie
const trie = new Trie();

app.get('/api/words-counter', (req, res) => {

    const input = req.query.input;

    parser.processInput(input, trie);

    // Here we could sent a json status info that say that it could take some minutes to process the text if is a big file
    res.sendStatus(200);

});

app.get('/api/words-statistics', (req, res) => {

    const word = req.query.word;

    const occurence = trie.getWordOccurrence(word);

    res.send({ word: word , count: occurence === -1 ? 0 : occurence });

});

app.listen(port, () => console.log(`Listening on port ${port}`));
