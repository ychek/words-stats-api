# Word Statistics API

### Requirements
- node v8.11.2 (LTS)
- yarn v1.6.0 or npm 5.6.0


### Explanation
- I am using a Trie (prefix tree) to store the words and the counts of each input.
- Each Node keep a count of that word.
- The trie is perfect here because we can do fast search operation of a word and then get the occurrence for that word, it's even better than an hashmap (a bad hash function or a lot of hash collision could reduce the performance of the HashTable, not the case with a Trie)
- With the Trie structure to store words, memory is not an issue when processing natural language input.
especially in the case of natural language for which many words derive from each other) i.e: house-> housekeeper
- Added a Unit test for the data structure part

### Assumptions

- The input text it's a language. a word is an alpha numeric sequence of characters (all the ponctuations chars are skiped)
- There is enough memory to store the data structure on the server (not an issue because not taking a lot of space)
- There is enough space to store local files to be processed.
- The path and urls exist
- The counted words are case insensitive


### Installation

* Install project dependencies

```
yarn
```
or
```
npm install
```

Run the API:
```
yarn dev
```
or
```
npm run dev
```

Run the unit test

```
yarn test
```
or
```
npm run test
```

### Usage

#### Add to the words counter:

* Simple string in a get request:

```
http://localhost:5555/api/words-counter?input=Hi! My name is (what?), my name is (who?), my name is Slim Shady
```
```
http://localhost:5555/api/words-counter?input=Hi!%20My%20name%20is%20(what?),%20my%20name%20is%20(who?),%20my%20name%20is%20Slim%20Shady
```

* URL (http or https)

```
http://localhost:5555/api/words-counter?input=http://www.gutenberg.org/files/57290/57290-0.txt
```
```
http://localhost:5555/api/words-counter?input=https://stackoverflow.com/questions/11227809/why-is-it-faster-to-process-a-sorted-array-than-an-unsorted-array
```

* Local Path:

```
http://localhost:5555/api/words-counter?input=./assets/SampleTextFile_1000kb.txt
```
```
http://localhost:5555/api/words-counter?input=./assets/book.txt
```

```
http://localhost:5555/api/words-counter?input=/etc/hosts
```

#### Get the occurrence of a word:

```
http://localhost:5555/api/words-statistics?word=hello
```
```
http://localhost:5555/api/words-statistics?word=the
```


#### Enjoy!