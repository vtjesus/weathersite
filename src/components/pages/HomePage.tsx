import { useState } from "react";
import { useGetForecastQuery } from "../../redux/api/forecatch"; // RTK Query API
import Search from "./homeSection/Search";
import CurrentWeather from "./homeSection/CurrentWeather";
import scss from "./HomePage.module.scss";

const HomePage = () => {
  const [selectedCity, setSelectedCity] = useState<string>("");
  const [days, setDays] = useState<number>(1);

  const { data, isLoading } = useGetForecastQuery({
    query: selectedCity || "London",
    days,
  });

  return (
    <div className={scss.back}>
      <Search onCitySelect={setSelectedCity} />
      <div className={scss.ras}>
        <CurrentWeather city={selectedCity} />
        <div className={scss.daysButtons}>
          {[1, 3, 7, 14].map((option) => (
            <button
              key={option}
              onClick={() => setDays(option)}
              className={days === option ? scss.activeButton : ""}
            >
              {option} Days
            </button>
          ))}
        </div>
        <div className={scss.forecastList}>
          {isLoading && <p>Loading...</p>}
          {data?.forecast.forecastday.map((day) => (
            <div key={day.date} className={scss.forecastItem}>
              <p>
                <strong>{day.date}</strong>
              </p>
              <p>{day.day.avgtemp_c}°C</p>
              <img src={day.day.condition.icon} alt={day.day.condition.text} />
              <p>{day.day.condition.text}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default HomePage;
