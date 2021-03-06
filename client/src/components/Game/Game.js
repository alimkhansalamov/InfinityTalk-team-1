import './Game.css';
import { useEffect, useState } from 'react';

function Game() {
  const tests = [
    {
      emodji: 'ð',
      answer: 'apple'
    }, {
      emodji: 'â―',
      answer: 'ball'
    }, {
      emodji: 'ðĶī',
      answer: 'bone'
    }, {
      emodji: 'ðĨ',
      answer: 'cucumber'
    }, {
      emodji: 'ð',
      answer: 'helicopter'
    }, {
      emodji: 'â­',
      answer: 'star'
    }, {
      emodji: 'ðĨ',
      answer: 'spoon'
    }, {
      emodji: 'ð§ ',
      answer: 'brain'
    }, {
      emodji: 'ðŊ',
      answer: 'honey'
    }, {
      emodji: 'ð§Ģ',
      answer: 'scarf'
    }, {
      emodji: 'ð',
      answer: 'tomato'
    }, {
      emodji: 'ðĨ',
      answer: 'carrot'
    }, {
      emodji: 'ð§',
      answer: 'onion'
    }, {
      emodji: 'ð§',
      answer: 'garlic'
    }, {
      emodji: 'ð―',
      answer: 'corn'
    }, {
      emodji: 'ð',
      answer: 'ear'
    }, {
      emodji: 'ð',
      answer: 'umbrella'
    }, {
      emodji: 'ð',
      answer: 'ruler'
    }, {
      emodji: 'ð',
      answer: 'rocket'
    }, {
      emodji: 'ð',
      answer: 'banana'
    }, {
      emodji: 'ð',
      answer: 'nose'
    }, {
      emodji: 'ðĶ·',
      answer: 'tooth'
    }, {
      emodji: 'ðŠ',
      answer: 'axe'
    }, {
      emodji: 'ðŠ',
      answer: 'chair'
    }, {
      emodji: 'ðŠ',
      answer: 'knife'
    }, {
      emodji: 'ðŠ',
      answer: 'door'
    }, {
      emodji: 'ð§ē',
      answer: 'magnet'
    }, {
      emodji: 'ðŋ',
      answer: 'disk'
    }, {
      emodji: 'ð',
      answer: 'balloon'
    }, {
      emodji: 'ð',
      answer: 'volcano'
    }, {
      emodji: 'ðļ',
      answer: 'guitar'
    }, {
      emodji: 'ðŦ',
      answer: 'chocolate'
    }, {
      emodji: 'ðĨ',
      answer: 'potato'
    }, {
      emodji: 'ð',
      answer: 'bread'
    }, {
      emodji: 'ð',
      answer: 'strawberry'
    }, {
      emodji: 'ð§',
      answer: 'butter'
    }, {
      emodji: 'ð',
      answer: 'cake'
    }, {
      emodji: 'ð°',
      answer: 'newspaper'
    }
  ]

  let currentTestIndex = Math.floor(Math.random()*tests.length);
  const [currentTest, setCurTest] = useState(tests[currentTestIndex])

  let tasksListElement = null;
  useEffect(() => {
    tasksListElement = document.querySelector(`.tasks__list`);

    const tasksListDragOver = (evt) => {
      evt.preventDefault();
      const activeElement = tasksListElement.querySelector(`.selectedx`);
      const currentElement = evt.target;
      const isMoveable = activeElement !== currentElement &&
        currentElement.classList.contains(`tasks__item`);

      if (!isMoveable) {
        return;
      }

      const nextElement = getNextElement(evt.clientY, currentElement);

      if (
        nextElement &&
        activeElement === nextElement.previousElementSibling ||
        activeElement === nextElement
      ) {
        return;
      }

      tasksListElement.insertBefore(activeElement, nextElement);
    }
    tasksListElement.addEventListener('dragover', tasksListDragOver)
  }, [currentTest])

  const tasksListDragStart = (evt) => {
    evt.target.classList.add(`selectedx`);
  }

  const tasksListDragEnd = (evt) => {
    evt.target.classList.remove(`selectedx`);
    let result = ''
    for (let one of tasksListElement.childNodes) {
      result += one.innerText
    }
    if (result.toLowerCase() === currentTest.answer.toLowerCase()) {
      let nextTestIndex = Math.floor(Math.random()*tests.length);
      while (nextTestIndex === currentTestIndex) {
        nextTestIndex = Math.floor(Math.random()*tests.length);
      }
      setCurTest(tests[nextTestIndex])
    }
  }

  const getNextElement = (cursorPosition, currentElement) => {
    const currentElementCoord = currentElement.getBoundingClientRect();
    const currentElementCenter = currentElementCoord.y + currentElementCoord.height / 2;

    const nextElement = (cursorPosition < currentElementCenter) ?
      currentElement :
      currentElement.nextElementSibling;

    return nextElement;
  };

  function shuffle(array) {
    const clone = array.slice()
    clone.sort(() => Math.random() - 0.5);
    console.log(clone.join(''));
    console.log(array.join(''));
    while (clone.join('') === array.join('')) {
      clone.sort(() => Math.random() - 0.5);
    }
    return clone;
  }

  return (
    <div className="App">
      <div className="containerx">
        <section className="tasks">
          <span className="tasks__title" >{currentTest.emodji}</span>

          <ul className="tasks__list" onDragStart={tasksListDragStart} onDragEnd={tasksListDragEnd}>
            {shuffle(currentTest.answer.split('')).map((letter) => {
              return <li className="tasks__item" draggable>{letter.toUpperCase()}</li>
            })}
          </ul>
        </section>
      </div>
    </div>
  );
}

export default Game;
