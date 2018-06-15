'use strict';

const { DataProcessor } = require('./dataProcessor');
const { InputDetector } = require('./inputDetector');


const processInput = (input, trie) => {

    const inputDetector = new InputDetector(input);
    const dataProcessor = new DataProcessor(input, trie);

    // from URL
    if (inputDetector.isURL()) {

        dataProcessor.processRemoteData()

    // from local file
    } else if (inputDetector.isLocalFilePath()) {

        dataProcessor.processLocalData()

    // normal string
    } else {
        dataProcessor.processStringData()
    }

};


module.exports = { processInput };

