'use strict';

// Represent a node in the trie
class Node {

    constructor(key, parent=null, terminates=false) {
        this.key = key;
        this.parent = parent;
        this.children = new Map();

        // For memory optimisation I could remove 'terminates' and 'wordCount' properties from the constructor (and add them in the insertWord() function only on terminating words)
        // but for convenience I wanted that each Node objects look the same.

        this.terminates = false; // True if the node is the last char in a word
        this.wordCount = 0;
    }
}


// Trie (Prefix Tree) data structure
class Trie {

    constructor(){
        this.root = new Node('');
    }

    // Insert word into the trie
    insertWord(word) {

        if (!word) {
            throw "word can't be 'undefined', 'null' or 'empty string'";
        }
        let node = this.root;

        for (let i = 0; i < word.length; i++){
            const char = word[i];

            if (node.children.get(char)) {
                node = node.children.get(char);

            } else {

                node.children.set(char, new Node(char, node));
                node = node.children.get(char);
            }

        }

        node.terminates = true;
        // increment the word occurrence counter
        node.wordCount++
    }


    // Find specific word in the trie and return a node reference that is the last char in the word
    findWord(word) {
        if (!word) {
            throw "word can't be 'undefined', 'null' or 'empty string'";
        }

        let node = this.root;

        for (let i = 0; i < word.length; i++){
            const char = word[i];

            if (node.children.get(char)) {
                node = node.children.get(char);
            } else {
                return null;
            }
        }

        return node;

    }

    // Get the number of time that word occurs in the trie
    getWordCount(word) {
        const node = this.findWord(word);
        if (node != null && node.terminates) {

            return node.wordCount
        }
        return -1
    }


    // Return an array with all whole words (terminating words) in the trie.
    getAllWordsCounts() {

        const result = [];
        const currWord = '';
        this._traverseTrie(this.root, currWord, result);
        return result

    }

    // pre-order traversal
    _traverseTrie(node, currWord, result) {

        if (!node) {
            return
        }

        for (let [key, child] of node.children) {
            if (child.terminates) {
                result.push({word: currWord + key, count: child.wordCount});
            }
            this._traverseTrie(child, currWord + key, result)
        }

    }


}

module.exports = { Node, Trie };

