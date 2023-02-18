import { useState } from "react";
import reactLogo from "./assets/react.svg";
import "./App.css";
import axios from "axios";

function App() {
  const [count, setCount] = useState(0);
  const [book, setBook] = useState("");

  const api_key = import.meta.env.VITE_WORDS_API_KEY;

  const handleClick = () => {
    // set up query for a verb
    const getWord = () => {
      const options = {
        method: "GET",
        url: "https://wordsapiv1.p.rapidapi.com/words/?partOfSpeech=verb",
        params: { random: "true" },
        headers: {
          "X-RapidAPI-Key": api_key,
          "X-RapidAPI-Host": "wordsapiv1.p.rapidapi.com"
        }
      };
      displayWordInfo(options);
    };

    // If an example sentence exists for this verb, display on UI
    const displayWordInfo = options => {
      axios
        .request(options)
        .then(response => {
          console.log("results:", response.data.results);

          const results = response.data.results;
          const filteredWords = results
            .filter(word => word.hasOwnProperty("examples"))
            .map(({ examples }) => examples);

          filteredWords.length === 0 ? getWord() : setBook(filteredWords[0]);
        })
        .catch(error => {
          console.error(error);
        });
    };

    getWord();
  };

  return (
    <div className='App'>
      <div>
        <a href='https://vitejs.dev' target='_blank' rel='noreferrer'>
          <img src='/vite.svg' className='logo' alt='Vite logo' />
        </a>
        <a href='https://reactjs.org' target='_blank' rel='noreferrer'>
          <img src={reactLogo} className='logo react' alt='React logo' />
        </a>
      </div>
      <h1>Vite + React</h1>
      <p>{book}</p>
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
