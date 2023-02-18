import axios from "axios";

/* Axios request */

// query for random verb
export const getWordCongfig = api_key => {
  const options = {
    method: "GET",
    url: "https://wordsapiv1.p.rapidapi.com/words/?partOfSpeech=verb",
    params: { random: "true" },
    headers: {
      "X-RapidAPI-Key": api_key,
      "X-RapidAPI-Host": "wordsapiv1.p.rapidapi.com"
    }
  };
  return axios.request(options);
};
