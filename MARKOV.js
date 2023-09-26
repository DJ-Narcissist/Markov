/** Textual markov chain generator */


class MarkovMachine {

    /** build markov machine; read in text.*/
  
    constructor(text) {
      let words = text.split(/[ \r\n]+/);
      this.words = words.filter(c => c !== "");
      this.makeChains();
    }
  
    /** set markov chains:
     *
     *  for text of "the cat in the hat", chains will be
     *  {"the": ["cat", "hat"], "cat": ["in"], "in": ["the"], "hat": [null]} */
  
    makeChains() {
      this.chains = {};
      for (let i = 0; i < this.words.length - 1; i++) {
        const currentWord = this.words[i];
        const nextWord = this.words[i + 1];
  
        if (!this.chains[currentWord]) {
          this.chains[currentWord] = [];
        }
  
        this.chains[currentWord].push(nextWord);
      }
  
      // Handle the last word (it has no next word)
      const lastWord = this.words[this.words.length - 1];
      this.chains[lastWord] = [null];
    }
  
    /** return random text from chains */
  
    makeText(numWords = 100) {
      const text = [];
      let currentWord = this.getRandomWord();
  
      while (text.length < numWords && currentWord !== null) {
        text.push(currentWord);
        currentWord = this.getNextWord(currentWord);
      }
  
      return text.join(' ');
    }
  
    getRandomWord() {
      const words = Object.keys(this.chains);
      const randomIndex = Math.floor(Math.random() * words.length);
      return words[randomIndex];
    }
  
    getNextWord(word) {
      const possibleNextWords = this.chains[word];
      const randomIndex = Math.floor(Math.random() * possibleNextWords.length);
      return possibleNextWords[randomIndex];
    }
  }
  
  // Example usage:
  const text = "the cat in the hat";
  const markovMachine = new MarkovMachine(text);
  const randomText = markovMachine.makeText(10); // Generate random text with 10 words
  console.log(randomText);
  