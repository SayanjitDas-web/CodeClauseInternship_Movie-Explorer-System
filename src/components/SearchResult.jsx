import { Button } from "./ui/button";

import { AspectRatio } from "./ui/aspect-ratio";

import { useNavigate } from "react-router-dom";
import Spinner from "./Spinner";

function SearchResult({ result = [] }) {
  const navigate = useNavigate();
  return (
    <div className=" min-h-[555px] flex flex-wrap justify-center items-center">
      {result.length > 0 ? (
        result.map((movie) => {
          return (
            <figure
              className="w-[300px] p-4 hover:border hover:border-purple-600 rounded-xl"
              key={movie.imdbId}
            >
              <AspectRatio ratio={16 / 9}>
                <img
                  src={movie.imageSet.horizontalPoster.w1080}
                  alt=""
                  className=" rounded-xl"
                />
              </AspectRatio>
              <div className="flex items-center flex-wrap">
                <h1 className="text-purple-600 text-xl pr-2">{movie.title}</h1>
                <div className="flex justify-center items-center">
                  {movie.genres.map((gen, i) => {
                    return <h2 className="p-1 text-slate-500">#{gen.name}</h2>;
                  })}
                </div>
              </div>
              <Button onClick={() => navigate(`movie/${movie.imdbId}`)}>
                More info
              </Button>
            </figure>
          );
        })
      ) : (
        <Spinner />
      )}
    </div>
  );
}

export default SearchResult;
