'use strict';

class InputDetector {

    constructor(inputString) {

        this.MAX_URL_SIZE = 2083;
        this.MAX_UNIX_PATH_SIZE = 4096;
        this.inputString = inputString;
    }

    isURL() {

        if (this.inputString.length > this.MAX_URL_SIZE) {
            return false;
        }
        // match 'http://www.example.com' or 'https://hello.com' etc...
        const pattern = /(https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|www\.[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9]\.[^\s]{2,}|www\.[a-zA-Z0-9]\.[^\s]{2,})/;

        return pattern.test(this.inputString);

    };

    isLocalFilePath() {

        if (this.inputString.length > this.MAX_UNIX_PATH_SIZE) {
            return false;
        }
        // match '/path/to/my/file/' or './path/to/file.txt' or '../path/to/file'
        const pattern = /^(.+)\/([^\/]+)$/;


        return pattern.test(this.inputString);


    };

}

module.exports = { InputDetector };