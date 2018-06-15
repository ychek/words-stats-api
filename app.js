'use strict';

const express = require('express');
const { Trie } = require('./bll/trie');
const { PerformanceLogger } = require('./bll/performanceLogger');
const dataManager = require('./bll/dataManager');

const app = express();
const port = process.env.PORT || 5555;


// Create an empty Trie
const trie = new Trie();

app.get('/api/words-counter', (req, res) => {

    try {
        const input = req.query.input;

        dataManager.processInput(input, trie);

        // Here we could sent a json status info that say that it could take some minutes to process the text if is a big file
        res.sendStatus(200);
    }
    catch (ex) {
        res.sendStatus(500);
    }

});

app.get('/api/words-statistics', (req, res) => {
    try {
        const word = req.query.word.trim().toLowerCase();

        const perfTimer = new PerformanceLogger(word);

        const wordCount = trie.getWordCount(word);

        perfTimer.printWordLookupTime();

        res.send({word: word, count: wordCount === -1 ? 0 : wordCount});
    }
    catch (ex) {
        res.sendStatus(500)
    }

});

app.listen(port, () => console.log(`Listening on port ${port}`));
