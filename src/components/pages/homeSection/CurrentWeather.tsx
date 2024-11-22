import { useGetCurrentWeatherQuery } from "../../../redux/api/current";
import { useGetTimeZoneQuery } from "../../../redux/api/time";
import scss from "./Currentweath.module.scss";

type CurrentWeatherProps = {
  city: string;
};

const CurrentWeather = ({ city }: CurrentWeatherProps) => {
  const { data } = useGetCurrentWeatherQuery(
    { query: city },
    { skip: !city.trim() }
  );
  const { data: timeData } = useGetTimeZoneQuery(
    { query: city },
    { skip: !city.trim() }
  );

  const formatDateTime = (timeString: string | undefined) => {
    if (!timeString) return "Invalid time";
    const date = new Date(timeString);
    const options: Intl.DateTimeFormatOptions = {
      hour: "2-digit",
      minute: "2-digit",
      weekday: "long",
      day: "numeric",
      month: "short",
      year: "2-digit",
    };
    return new Intl.DateTimeFormat("en-US", options).format(date);
  };

  const formattedTime = formatDateTime(timeData?.location?.localtime);

  return (
    <div className={scss.CurrrentWeather}>
      <div className="container">
        {data?.current ? (
          <div className={scss.content}>
            <div className={scss.hero}>
              <h1 className={scss.temp}>
                <span>{data.current.temp_c}°</span>
              </h1>
              <div className={scss.city}>
                <h1>
                  <span>{city}</span>
                </h1>
                <h4>
                  <span>{formattedTime}</span>
                </h4>
              </div>
              <div className={scss.weather}>
                <img
                  src={`https:${data.current.condition.icon}`}
                  alt={data.current.condition.text}
                />
                <p>{data.current.condition.text}</p>
              </div>
            </div>
          </div>
        ) : (
          <p>{city}</p>
        )}
      </div>
    </div>
  );
};

export default CurrentWeather;
