'use strict';

class Loader {
    constructor(trie){
        this.trie = trie
    }

    loadWordsIntoTrie(wordsArray) {
        for (let i = 0; i < wordsArray.length; i++) {
            let word = wordsArray[i];
            if (word !== '') {
                this.trie.insertWord(word);
            }
        }
    };
}

module.exports = { Loader };