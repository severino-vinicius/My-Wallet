const url = 'https://economia.awesomeapi.com.br/json/all';

const getAwesomeAPIData = async () => {
  const response = await fetch(url);
  const dataResponse = await response.json();

  return dataResponse;
};

export default getAwesomeAPIData;
