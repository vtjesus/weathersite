import scss from "./WeadPage.module.scss";
import "keen-slider/keen-slider.min.css";
import { useKeenSlider } from "keen-slider/react";
import { useGetForecastQuery } from "../../../redux/api/forecatch";

type WeadPageProps = {
  city: string;
};

const WeadPage = ({ city }: WeadPageProps) => {
  const { data } = useGetForecastQuery(
    { query: city, days: 10 },
    { skip: !city.trim() }
  );

  const [ref1] = useKeenSlider<HTMLDivElement>({
    loop: true,
    mode: "free",
    slides: {
      perView: 3,
      spacing: 15,
    },
  });
  const [ref2] = useKeenSlider<HTMLDivElement>({
    loop: true,
    slides: {
      origin: "center",
      perView: 2,
      spacing: 10,
    },
    vertical: true,
  });

  if (!data) return <p>Loading forecast...</p>;

  const formatTime = (timeString: string) => {
    const date = new Date(timeString);
    return date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
  };

  return (
    <div className={scss.WeadPage}>
      <div className="container">
        <div className={scss.content}>
          <div className={scss.head}>
            <div ref={ref1} className="keen-slider">
              {data.forecast.forecastday[0]?.hour.map(
                (hour: any, index: number) => (
                  <div
                    key={index}
                    className={`keen-slider__slide ${scss.hourSlide}`}
                  >
                    <img
                      src={`https:${hour.condition.icon}`}
                      alt={hour.condition.text}
                    />
                    <p>{formatTime(hour.time)}</p>
                  </div>
                )
              )}
            </div>
          </div>

          <div className={scss.foot}>
            <div ref={ref2} className="keen-slider">
              {data.forecast.forecastday.map((day: any) => (
                <div key={day.date} className={scss.dayForecast}>
                  <img
                    src={`https:${day.day.condition.icon}`}
                    alt={day.day.condition.text}
                  />
                  <p>{day.date}</p>
                  <div style={{ margin: "10px" }}></div>
                  <p>{day.day.avgtemp_c}°C</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WeadPage;
