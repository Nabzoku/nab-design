'use strict';
function rand(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}
function getRandomLetter() {
  const alphabet = [
    'a',
    'b',
    'c',
    'd',
    'e',
    'f',
    'g',
    'h',
    'i',
    'j',
    'k',
    'l',
    'm',
    'n',
    'o',
    'p',
    'q',
    'r',
    's',
    't',
    'u',
    'v',
    'w',
    'x',
    'y',
    'z',
  ];
  return alphabet[rand(0, alphabet.length - 1)];
}
function getRandomWord(word) {
  const text = word.innerHTML;

  let finalWord = '';
  for (let i = 0; i < text.length; i++) {
    finalWord += text[i] == ' ' ? ' ' : getRandomLetter();
  }

  return finalWord;
}

const word = document.querySelector('h2');
let interv = 'undefined';
let canChange = false;
let globalCount = 0;
let count = 0;
const INITIAL_WORD = word.innerHTML;
let isGoing = false;

function init() {
  if (isGoing) return;

  isGoing = true;
  const randomWord = getRandomWord(word);
  word.innerHTML = randomWord;

  interv = setInterval(function () {
    let finalWord = '';
    for (let x = 0; x < INITIAL_WORD.length; x++) {
      if (x <= count && canChange) {
        finalWord += INITIAL_WORD[x];
      } else {
        finalWord += getRandomLetter();
      }
    }
    word.innerHTML = finalWord;
    if (canChange) {
      count++;
    }
    if (globalCount >= 20) {
      canChange = true;
    }
    if (count >= INITIAL_WORD.length) {
      clearInterval(interv);
      count = 0;
      canChange = false;
      globalCount = 0;
      isGoing = false;
    }
    globalCount++;
  }, 50);
}
init();
document.addEventListener('DOMContentLoaded', function () {
  const sections = document.querySelectorAll('section[id]');

  window.addEventListener('scroll', navHighlighter);
  function navHighlighter() {
    let scrollY = window.pageYOffset;
    sections.forEach((current) => {
      const sectionHeight = current.offsetHeight;
      const sectionTop =
        current.getBoundingClientRect().top + window.pageYOffset - 50;
      let sectionId = current.getAttribute('id');
      if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
        document
          .querySelector('.nav-bar a[href*=' + sectionId + ']')
          .classList.add('active');
      } else {
        document
          .querySelector('.nav-bar a[href*=' + sectionId + ']')
          .classList.remove('active');
      }
    });
  }
});
