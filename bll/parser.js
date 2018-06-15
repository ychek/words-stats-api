'use strict';

class InputParser {

    constructor() {

    }

    getParsedData(str) {

        return this.parseStream(this.removeNonAlphaNumChars(this.replaceLineEnding(str)));

    };

    replaceLineEnding(str) {

        //For Unix & OSx, Windows, and Classic Mac
        return str.replace(/\r\n?|\n|\r|\t/gi, " ");
    };

    // keep spaces and words only
    removeNonAlphaNumChars(str) {

        return str.replace(/[^\w\s]|[_*]/gi, ' ');

    };


    parseStream(str) {

        return str.toLowerCase().split(' ');

    };

}

module.exports = { InputParser };