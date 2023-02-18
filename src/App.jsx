import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "./assets/vite.svg";
import "./App.css";
import { getWordCongfig } from "./api/api";

function App() {
  const [count, setCount] = useState(0);
  const [sentence, setSentence] = useState("");

  const api_key = import.meta.env.VITE_WORDS_API_KEY;

  const handleClick = () => {
    // Gets a random word using the imported `getWordInfo` function
    const getWord = () => {
      getWordCongfig(api_key)
        .then(response => {
          console.log("results:", response.data.results);
          getData(response);
        })
        .catch(err => console.error(err));
    };

    // Get a word that has an example sentence
    const getData = response => {
      const results = response.data.results;

      // Get a filtered array of words with the "example" property
      const filteredWords = results
        .filter(word => word.hasOwnProperty("examples"))
        .map(({ examples }) => examples);

      // if there are no filtered words, trigger `getWord()` again.
      // Otherwise, set state to an existing sentence.
      filteredWords.length === 0 ? getWord() : setSentence(filteredWords[0]);
    };

    getWord();
  };

  return (
    <div className='App'>
      <div>
        <a href='https://vitejs.dev' target='_blank' rel='noreferrer'>
          <img src={viteLogo} className='logo' alt='Vite logo' />
        </a>
        <a href='https://reactjs.org' target='_blank' rel='noreferrer'>
          <img src={reactLogo} className='logo react' alt='React logo' />
        </a>
      </div>
      <h1>Vite + React</h1>
      <p>{sentence}</p>
      <button type='button' onClick={handleClick}>
        Random
      </button>
      <div className='card'>
        <button onClick={() => setCount(count => count + 1)}>
          count is {count}
        </button>
        <p>
          Edit <code>src/App.jsx</code> and save to test HMR
        </p>
      </div>
      <p className='read-the-docs'>
        Click on the Vite and React logos to learn more
      </p>
    </div>
  );
}

export default App;
