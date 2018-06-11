'use strict';

const MAX_URL_SIZE = 2083;
const MAX_UNIX_PATH_SIZE = 4096;
const fs = require('fs');
const loader = require('./loader');
const http = require('http');
const https = require('https');

const processInput = (input, trie) => {

    // from url
    if (_isURL(input)) {

        let transfertProtocol = http;

        if (input.indexOf('https') >= 0) {
            transfertProtocol = https
        }
        // Dowload the file chunk by chunk and process it as a stream (because it could be a huge file)
        const get = transfertProtocol.get(input).on('response', function (response) {
            response.on('data', function (chunk) {
                _parseText(chunk.toString('utf8'), trie);

                //for info to see what's going on
                console.log('BODY: ' + chunk);
                console.log(trie.listAllWordsInTheTrie());
            });
        });


        // load from local file
    } else if (_isPathToLocalDirectory(input)) {

        const stats = fs.statSync(input);

        if (stats.isFile()) {

            fs.readFile(input, 'utf8', function (err, data) {

                _parseText(data, trie);

                //for info to see what's going on
                console.log('FILE: ' + data);
                console.log(trie.listAllWordsInTheTrie());
            });

        }

        // it's a normal string
    } else {

        _parseText(input, trie);
        console.log(trie.listAllWordsInTheTrie())
    }

};


const _parseText = (text, trie) => {

    const withoutLineEnding = _replaceLineEnding(text);

    const arrayOfWords = _parseStream(_removeNonAlphaNumChar(withoutLineEnding));
    loader.loadWordsIntoTrie(arrayOfWords, trie);


};


const _replaceLineEnding = (str) => {

    //For Unix & OSx, Windows, and Classic Mac
    return str.replace(/\r\n?|\n|\r|\t/gi, " ");
};

// keep spaces and words only
const _removeNonAlphaNumChar = (str) => {

    return str.replace(/[^\w\s]|[_?]/gi, ' ');

};

const _isURL = (str) => {

    if (str.length > MAX_URL_SIZE) {
        return false;
    }

    const pattern = /(https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|www\.[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9]\.[^\s]{2,}|www\.[a-zA-Z0-9]\.[^\s]{2,})/;

    return pattern.test(str);

};


const _isPathToLocalDirectory = (str) => {

    if (str.length > MAX_UNIX_PATH_SIZE) {
        return false;
    }

    const pattern = /^(.+)\/([^\/]+)$/;


    return pattern.test(str);


};


const _parseStream = (stream) => {

    return _removeNonAlphaNumChar(stream).split(' ');

};



module.exports = { processInput };

