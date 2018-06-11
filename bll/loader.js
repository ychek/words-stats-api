

const loadWordsIntoTrie = (wordsArray, trie) => {
    for (let i = 0; i < wordsArray.length ; i++) {
        let word = wordsArray[i];
        if ( word !== '') {
            trie.insert(word.toLowerCase());
        }
    }
};

module.exports = { loadWordsIntoTrie };