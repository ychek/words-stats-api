'use strict';

const http = require('http');
const https = require('https');
const fs = require("fs");
const readline = require('readline');
const stream = require('stream');
const { PerformanceLogger }  = require('./performanceLogger');
const { InputParser } = require('./parser');
const { Loader } = require('./loader');

class DataProcessor {

    constructor(input, trie) {
        this.input = input;
        this.trie = trie;
        this.parser = new InputParser();
        this.perfLogger = new PerformanceLogger(this.input);
        this.loader = new Loader(this.trie);
        this.currChunksCounts = 1;

    }

    // Process the file by Download the file chunk by chunk
    // as a stream (because it could be a huge file)
    processRemoteData() {

        this.perfLogger.printBeginProcessingRemote();

        let transferProtocol = http;

        if (this.input.indexOf('https') >= 0) {
            transferProtocol = https
        }
        transferProtocol.get(this.input).on('response', (response) => this._downloadFileInChunks(response));
    }

    // Process the file chunk by chunk and process it
    // as a stream (because it could be a huge file)
    processLocalData() {

        this.perfLogger.printBeginProcessingLocal();

        const stats = fs.statSync(this.input);

        if (stats.isFile()) {

            const inStream = fs.createReadStream(this.input);
            const outStream = new stream();
            const rl = readline.createInterface(inStream, outStream);

            rl.on('line', (line) => {

                this.perfLogger.printChunksStatus(this.currChunksCounts);
                this.currChunksCounts++;
                this._writeWordsToDataStructure(this.parser.getParsedData(line));
                // console.log(process.memoryUsage()); //FOR DEBUG

            });

            rl.on('close', () => {
                this.perfLogger.printLocalFileCountingTime();
            });
        }
    }

    processStringData() {
        this.perfLogger.printStringInputCountingTime();
        this._writeWordsToDataStructure(this.parser.getParsedData(this.input));
    }

    _downloadFileInChunks(response) {
        response.on('data', (data) => this._readStream(data));
        response.on('end', () => this.perfLogger.printRemoteFileProcessingTime());

    }

    _readStream(stream) {
        this.perfLogger.printChunksStatus(this.currChunksCounts, 40000);
        this.currChunksCounts++;
        const arrayOfWord = this.parser.getParsedData(stream.toString('utf8'));
        // console.log(process.memoryUsage()); //FOR DEBUG
        this._writeWordsToDataStructure(arrayOfWord);
    }


    _writeWordsToDataStructure(arrayOfWords) {

        this.loader.loadWordsIntoTrie(arrayOfWords);

    }

}

module.exports = { DataProcessor };
