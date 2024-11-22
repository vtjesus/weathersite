import { useEffect, useState } from "react";
import { useGetSearchQuery } from "../../../redux/api/search";
import { MdMyLocation } from "react-icons/md";
import TyperWriter from "../../../ui/writer/TyperWriter";
import scss from "./Search.module.scss";

type SearchProps = {
  onCitySelect: (city: string) => void;
};

const Search = ({ onCitySelect }: SearchProps) => {
  const [search, setSearch] = useState<string>("");
  const { data } = useGetSearchQuery(search);
  console.log(data);

  useEffect(() => {
    if (data && data.length > 0) {
      console.log("First city from results:", data[0].name);
      onCitySelect(data[0].name);
    }
  }, [data, onCitySelect]);

  return (
    <div className={scss.Search}>
      <div className="container">
        <div className={scss.content}>
          <div className={scss.search}>
            <input
              type="text"
              placeholder="Search for cities..."
              onChange={(e) => setSearch(e.target.value)}
              value={search}
            />
            <button>
              <span>
                <MdMyLocation />
              </span>
            </button>
          </div>
          <div className={scss.text}>
            <TyperWriter />
          </div>
          <div>
            {data && (
              <ul className={scss.results}>
                {data.map((city) => (
                  <ol
                    key={city.id || city.name}
                    className={scss.resultItem}
                    onClick={() => onCitySelect(city.name)}
                  >
                    {city.name}, {city.region}, {city.country}
                  </ol>
                ))}
              </ul>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Search;
