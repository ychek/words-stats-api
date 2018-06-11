'use strict';

// Represent a node in the trie
class Node {

    constructor(key, parent=null, terminates=false, count=0) {
        this.key = key;
        this.parent = parent;
        this.children = new Map();

        // For memory optimisation I could remove 'terminates' and 'count' properties from the constructor (and add them in the insert() function only on terminating words)
        // but for convenience I wanted that each node look the same in mather of properties.

        this.terminates = false; // the char is the end of a word
        this.count = count;
    }
}


// Trie (Prefix Tree) data structure
class Trie {

    constructor(){
        this.root = new Node('');

    }

    // Insert word into the trie
    insert(word) {

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
        node.count++
    }


    // Search for a prefix or a whole key in the trie and return a node reference where the search ends
    searchPrefix(word) {
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

    // Get the number of time that word occurs
    getWordOccurrence(word) {
        const node = this.searchPrefix(word);
        if (node != null && node.terminates) {

            return node.count
        }
        return -1
    }

    // Search if an exact word is in the trie. (if the word is terminating)
    containsExactWord(word) {

        const node = this.searchPrefix(word);
        return node != null && node.terminates

    }


    // Return an array with all whole words (terminating words) in the trie.
    listAllWordsInTheTrie() {

        const result = [];
        const currWord = '';
        this._listWords(this.root, currWord, result);
        return result

    }

    // pre-order traversal
    _listWords(node, currWord, result) {

        if (!node) {
            return
        }

        for (let [key, child] of node.children) {
            if (child.terminates) {
                result.push({word: currWord + key, count: child.count});
            }
            this._listWords(child, currWord + key, result)
        }

    }


}

module.exports = { Node, Trie };

