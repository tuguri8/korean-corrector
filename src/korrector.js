const Hangul = require('hangul-js');
const fs = require('fs');
const path = require('path');

function leven_distance(firstWord, secondWord) {
      if (!firstWord.length) return secondWord.length;
      if (!secondWord.length) return firstWord.length;

      return Math.min(
          leven_distance(firstWord.substr(1), secondWord) + 1,
          leven_distance(secondWord.substr(1), firstWord) + 1,
          leven_distance(firstWord.substr(1), secondWord.substr(1)) + (firstWord[0] !== secondWord[0] ? 1 : 0)
      );
}

const getDistance = (fWord, sWord, chosung=true) => {
  if (chosung) {
    return leven_distance(Hangul.d(fWord).toString().replace(/,/g,''),Hangul.d(sWord).toString().replace(/,/g,''));
  } else {
    return leven_distance(fWord,sWord);
  }
};

const correct = (word, arr, chosung=true) => {
  let changed = 99999;
  let changedWord = word;

  if (chosung) {
    arr.reduce((acc,cur) => {
      let value = leven_distance(Hangul.d(word).toString().replace(/,/g,''), Hangul.d(cur).toString().replace(/,/g,''));
      if(value < changed) {
        changed = value;
        changedWord = cur;
      }
      return;
    },[]);
  } else {
    arr.reduce((acc,cur) => {
      let value = leven_distance(word, cur);
      if(value < changed) {
        changed = value;
        changedWord = cur;
      }
      return;
    },[]);
  }
  return changedWord;
};

const correctByDict = (word, chosung=true) => {
  let korean_dict = fs.readFileSync(path.resolve(__dirname, './korean_dict.json', 'utf8'));
  korean_dict = JSON.parse(korean_dict);
  let changed = 99999;
  let changedWord = word;

  if (chosung) {
    korean_dict.reduce((acc,cur) => {
      let value = leven_distance(Hangul.d(word).toString().replace(/,/g,''), Hangul.d(cur).toString().replace(/,/g,''));
      if(value < changed) {
        changed = value;
        changedWord = cur;
      }
      return;
    },[]);
  } else {
    korean_dict.reduce((acc,cur) => {
      let value = leven_distance(word, cur);
      if(value < changed) {
        changed = value;
        changedWord = cur;
      }
      return;
    },[]);
  }
  return changedWord;
};


module.exports = {
  getDistance: getDistance,
  correct: correct,
  correctByDict: correctByDict,
}
