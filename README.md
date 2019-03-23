# korean-corrector

레벤슈타인 거리 알고리즘은 맞춤법을 교정하는데 사용될 수 있습니다. 

그러나, 영어와 달리 여러 개의 초성으로 이루어진 한글은, 짧은 단어일 경우 레벤슈타인 거리가 같게 나오는 경우가 많습니다.



레벤슈타인 거리 알고리즘과 [hangul-js](https://github.com/e-/Hangul.js)를 이용하여, 초성 단위로 분리한 두 한글 단어(문장)에 대한 레벤슈타인 거리를 구하고, 가장 거리가 짧은 단어(문장)으로 맞춤법을 고칠 수 있습니다.



## 설치 및 사용방법

```javascript
npm install korean-corrector
```

```javascript
const korrector = require('korean-corrector')
```



## API

#### korrector.getDistance

두 단어(문장) 사이의 레벤슈타인 거리를 반환합니다.

`korrector.getDistance(fisrtWord:String, secondWord:String, chosung:boolean = true)` 

```javascript
const korrector = require('korean-corrector')

korrector.getDistance('공부', '공브'); // 1

korrector.getDistance('학기', '학기르', false) 
// 1 (chosung=false시 초성으로 분리하지 않음)
```



#### korrector.correct

해당 단어(문장) 과 배열의 요소들의 레벤슈타인 거리를 비교하여, 최소가 되는 요소로 변경합니다.

`korrector.correct(word:String, arr:Array, chosung:boolean = true)` 

```javascript
const korrector = require('korean-corrector')

korrector.correct('공불', ['공부','산불','공장']); // 공부

korrector.correct('공불', ['공부','강물','공부방'], false);
// 공부 (chosung=false시 초성으로 분리하지 않음)
```



#### korrector.correctByDict

해당 단어(문장) 과 자주 쓰이는 한국어 낱말 5800개의 레벤슈타인 거리를 비교하여, 최소가 되는 요소로 변경합니다.

> 자주 쓰이는 한국어 낱말 5800
>
> https://ko.wiktionary.org/wiki/%EB%B6%80%EB%A1%9D:%EC%9E%90%EC%A3%BC_%EC%93%B0%EC%9D%B4%EB%8A%94_%ED%95%9C%EA%B5%AD%EC%96%B4_%EB%82%B1%EB%A7%90_5800

`korrector.correct(word:String, chosung:boolean = true)` 

```javascript
const korrector = require('korean-corrector')

korrector.correctByDict('아삐'); // 아빠
```



## 라이센스

MIT @ Han SeungWoo

MIT @ [hangul-js](https://github.com/e-/Hangul.js)

