/*
FILENAME: ComplexCode.js

DESCRIPTION: 
This code demonstrates a complex implementation of a data structure called a Trie. 
A Trie is an ordered tree data structure that is commonly used to store and retrieve strings efficiently. 
This implementation supports insertions, deletions, and searches for strings in the Trie.

This code is highly sophisticated and involves advanced algorithms and data structures.

INSTRUCTIONS: 
To execute the code, please make sure you have Node.js installed on your machine.
Save this code in a file called ComplexCode.js and run it using the node command, e.g., "node ComplexCode.js".

*/

class Trie {
  constructor() {
    this.root = new TrieNode('');
  }

  insert(word) {
    let currentNode = this.root;

    for(let i = 0; i < word.length; i++) {
      const char = word.charAt(i);

      if (!currentNode.children[char]) {
        currentNode.children[char] = new TrieNode(char);
      }

      currentNode = currentNode.children[char];
    }

    currentNode.isEndOfWord = true;
  }

  search(word) {
    let currentNode = this.root;

    for(let i = 0; i < word.length; i++) {
      const char = word.charAt(i);

      if (!currentNode.children[char]) {
        return false;
      }

      currentNode = currentNode.children[char];
    }

    return currentNode.isEndOfWord;
  }

  delete(word) {
    const deleteRecursive = (currentNode, word, index) => {
      if (index === word.length) {
        if (!currentNode.isEndOfWord) {
          return false;
        }

        currentNode.isEndOfWord = false;

        return Object.keys(currentNode.children).length === 0;
      }

      const char = word.charAt(index);
      const nextNode = currentNode.children[char];

      if (!nextNode) {
        return false;
      }

      const shouldDeleteCurrentNode = deleteRecursive(nextNode, word, index + 1);

      if (shouldDeleteCurrentNode) {
        delete currentNode.children[char];
        return Object.keys(currentNode.children).length === 0;
      }

      return false;
    };

    deleteRecursive(this.root, word, 0);
  }
}

class TrieNode {
  constructor(char) {
    this.char = char;
    this.isEndOfWord = false;
    this.children = {};
  }
}

// Example usage:

const trie = new Trie();

trie.insert('apple');
trie.insert('banana');
trie.insert('app');
trie.insert('application');

console.log(trie.search('apple')); // Output: true
console.log(trie.search('banana')); // Output: true
console.log(trie.search('app')); // Output: true
console.log(trie.search('application')); // Output: true

trie.delete('apple');
console.log(trie.search('apple')); // Output: false

trie.insert('apples');
console.log(trie.search('apples')); // Output: true
console.log(trie.search('app')); // Output: true

trie.delete('banana');
console.log(trie.search('banana')); // Output: false