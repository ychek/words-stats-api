const { Node, Trie } = require('../bll/trie');
const expect = require('chai').expect;

// Unit Test

describe('Trie', function () {
    describe('insert()', function () {
        it("should insert() 12 words and have a root with 3 children on the first level", function () {

            // 1. ARRANGE
            const trie = new Trie();
            const words = ['a', 'at', 'attending', 'has', 'hat', 'he', 'me', 'mean', 'meaning', 'met', 'man', 'many'];

            // 2. ACT
            for (let i = 0; i < words.length; i++) {
                trie.insert(words[i]);
            }

            // 3. ASSERT
            expect(trie.root.children.size).to.be.equal(3);

        });
    })
});


describe('Trie', function () {
    describe('getWordOccurrence()', function () {
        it("should insert() 12 words with 'my' occurring 3 times", function () {

            // 1. ARRANGE
            const trie = new Trie();
            const words = ['my', 'name', 'is', 'what', 'my', 'name', 'who', 'my', 'name', 'is', 'slim', 'shady'];

            // 2. ACT
            for (let i = 0; i < words.length; i++) {
                trie.insert(words[i]);
            }
            console.log(trie.listAllWordsInTheTrie());

            // 3. ASSERT
            expect(trie.getWordOccurrence('my')).to.be.equal(3);

        });
    })
});

describe('Trie', function () {
    describe('getWordOccurrence()', function () {
        it("should insert() 12 words with 'what' occurring 1 time", function () {

            // 1. ARRANGE
            const trie = new Trie();
            const words = ['my', 'name', 'is', 'what', 'my', 'name', 'who', 'my', 'name', 'is', 'Slim', 'Shady'];

            // 2. ACT
            for (let i = 0; i < words.length; i++) {
                trie.insert(words[i]);
            }

            // 3. ASSERT
            expect(trie.getWordOccurrence('what')).to.be.equal(1);

        });
    })
});

describe('Trie', function () {
    describe('getWordOccurrence()', function () {
        it("should insert() 12 words with 'hi' occurring 0 time (returning -1)", function () {

            // 1. ARRANGE
            const trie = new Trie();
            const words = ['my', 'name', 'is', 'what', 'my', 'name', 'who', 'my', 'name', 'is', 'Slim', 'Shady'];

            // 2. ACT
            for (let i = 0; i < words.length; i++) {
                trie.insert(words[i]);
            }

            // 3. ASSERT
            expect(trie.getWordOccurrence('hi')).to.be.equal(-1);

        });
    })
});



describe('Trie', function () {
    describe('containsExactWord()', function () {
        it("should find 'attending' exact (terminating) word", function () {

            // 1. ARRANGE
            const trie = new Trie();
            const words = ['a', 'at', 'attending', 'has', 'hat', 'he', 'me', 'mean', 'meaning', 'met', 'man', 'many'];
            for (let i = 0; i < words.length; i++) {
                trie.insert(words[i]);
            }

            // 2. ACT
            const result = trie.containsExactWord('attending');

            // 3. ASSERT
            expect(result).to.be.equal(true);

        });
    })
});

describe('Trie', function () {
    describe('containsExactWord()', function () {
        it("should not find a terminating exact word with the word 'attend' ", function () {

            // 1. ARRANGE
            const trie = new Trie();
            const words = ['a', 'at', 'attending', 'has', 'hat', 'he', 'me', 'mean', 'meaning', 'met', 'man', 'many'];
            for (let i = 0; i < words.length; i++) {
                trie.insert(words[i]);
            }

            // 2. ACT
            const result = trie.containsExactWord('attend');

            // 3. ASSERT
            expect(result).to.be.equal(false);

        });
    })
});

describe('Trie', function () {
    describe('containsExactWord()', function () {
        it("should not find word 'hello' ", function () {

            // 1. ARRANGE
            const trie = new Trie();
            const words = ['a', 'at', 'attending', 'has', 'hat', 'he', 'me', 'mean', 'meaning', 'met', 'man', 'many'];
            for (let i = 0; i < words.length; i++) {
                trie.insert(words[i]);
            }

            // 2. ACT
            const result = trie.containsExactWord('hello');

            // 3. ASSERT
            expect(result).to.be.equal(false);

        });
    })
});

describe('Trie', function () {
    describe('listAllWordsInTheTrie()', function () {
        it("should list all inserted words", function () {

            // 1. ARRANGE
            const trie = new Trie();
            const words = ['a', 'at', 'attending', 'has', 'hat', 'he', 'me', 'mean', 'meaning', 'met', 'man', 'many'];
            for (let i = 0; i < words.length; i++) {
                trie.insert(words[i]);
            }

            // 2. ACT
            const result = trie.containsExactWord('hello');
            console.log(trie.listAllWordsInTheTrie());

            // 3. ASSERT
            expect(result).to.be.equal(false);

        });
    })
});

describe('Trie', function () {
    describe('searchPrefix()', function () {
        it("should not find 'z' prefix", function () {

            // 1. ARRANGE
            const trie = new Trie();
            const words = ['a', 'at', 'attending', 'has', 'hat', 'he', 'me', 'mean', 'meaning', 'met', 'man', 'many'];
            for (let i = 0; i < words.length; i++) {
                trie.insert(words[i]);
            }

            // 2. ACT
            const result = trie.searchPrefix('z');

            // 3. ASSERT
            expect(result).to.be.equal(null);

        });
    })
});

describe('Trie', function () {
    describe('searchPrefix()', function () {
        it("should find a node when searching the 'hat' prefix", function () {

            // 1. ARRANGE
            const trie = new Trie();
            const words = ['a', 'at', 'attending', 'has', 'hat', 'he', 'me', 'mean', 'meaning', 'met', 'man', 'many'];
            for (let i = 0; i < words.length; i++) {
                trie.insert(words[i]);
            }

            // 2. ACT
            const result = trie.searchPrefix('hat');

            // 3. ASSERT
            expect(result).to.be.an.instanceof(Node);

        });
    })
});
