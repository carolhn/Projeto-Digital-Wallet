const URL = 'https://economia.awesomeapi.com.br/json/all';

const currency = async () => {
  const RESULTS = await fetch(URL);
  const RESULT = await RESULTS.json();
  return RESULT;
};

export default currency;
