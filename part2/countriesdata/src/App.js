import { useState, useEffect } from "react";
import axios from "axios";
const API_KEY = process.env.REACT_APP_API_KEY;

const MultipleCountries = ({
  countries,
  setDisplayedCountriesHandler,
  setIsMultipleHandler,
}) => {
  if (countries.length > 10) {
    return <p>Too many matches, specify another filter</p>;
  }

  const onClickHandler = (event) => {
    let selectedCountry = countries.filter(
      (country) => country.name.common === event.target.value
    );
    setIsMultipleHandler(false);
    setDisplayedCountriesHandler(selectedCountry);
  };

  return (
    <>
      {countries.map((country) => {
        return (
          <div>
            {country.name.common}
            <button
              key={country.name.common}
              value={country.name.common}
              onClick={onClickHandler}
            >
              show
            </button>
          </div>
        );
      })}
    </>
  );
};

const SingleCountry = ({ country }) => {
  const [weatherData, setWeatherData] = useState({});
  if (country.length === 0) {
    return;
  }

  const singleCountry = country[0];
  const languages = [];
  const lat = country[0].latlng[0];
  const lon = country[0].latlng[1];

  Object.keys(singleCountry.languages).forEach(function (key) {
    languages.push(singleCountry.languages[key]);
  });

  const weatherApi = () => {
    const promise = axios.get(
      `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=${API_KEY}`
    );
    promise
      .then((response) => {
        let data = response.data;
        setWeatherData({
          temp: data.main.temp,
          wind: data.wind.speed,
          icon: data.weather[0].icon,
        });
      })
      .catch((error) => {
        console.log(error);
      });
  };
  if (Object.keys(weatherData).length === 0) {
    weatherApi();
  }

  return (
    <>
      <h2>{singleCountry.name.common}</h2>
      <p>capital {singleCountry.capital}</p>
      <p> area {singleCountry.area}</p>
      <h3>languages:</h3>
      <ul>
        {languages.map((language) => (
          <li>{language}</li>
        ))}
      </ul>
      <img src={singleCountry.flags.png} alt="Country Flag" />
      <h2>Weather in {singleCountry.capital[0]}</h2>
      <p>temperature {weatherData.temp} Celsius</p>
      <img
        src={`http://openweathermap.org/img/wn/${weatherData.icon}@2x.png`}
      ></img>
      <p>wind {weatherData.wind} m/s</p>
    </>
  );
};

function App() {
  const [countries, setCountries] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [isMultiple, setIsMultiple] = useState(false);
  const [displayedCountries, setDisplayedCountries] = useState([]);

  useEffect(() => {
    const promise = axios.get("https://restcountries.com/v3.1/all");
    promise.then((response) => {
      setCountries(response.data);
    });
  }, []);

  const searchFilterQuery = (event) => {
    setSearchQuery(event.target.value);
    const filteredCountries = countries.filter((country) =>
      country.name.common.toLowerCase().includes(searchQuery.toLowerCase())
    );
    setDisplayedCountries(filteredCountries);
    switch (true) {
      case filteredCountries.length > 1:
        setIsMultiple(true);
        break;
      case filteredCountries.length === 1:
        setIsMultiple(false);
        break;
      default:
        return <></>;
    }
  };
  return (
    <>
      <label>find countries</label>
      <input type="text" onChange={searchFilterQuery} />
      {isMultiple ? (
        <MultipleCountries
          countries={displayedCountries}
          setDisplayedCountriesHandler={setDisplayedCountries}
          setIsMultipleHandler={setIsMultiple}
        />
      ) : (
        <SingleCountry country={displayedCountries} />
      )}
    </>
  );
}

export default App;
