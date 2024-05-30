import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import axios from "axios";
import { AspectRatio } from "./ui/aspect-ratio";
import { Button } from "./ui/button";

function SingleMovie() {
  const [movie, setMovie] = useState({});
  const { id } = useParams();

  const getTheMovie = async () => {
    const options = {
      method: "GET",
      url: `https://streaming-availability.p.rapidapi.com/shows/${id}`,
      params: {
        series_granularity: "episode",
        output_language: "en",
      },
      headers: {
        "X-RapidAPI-Key": import.meta.env.VITE_X-RAPIDAPI-KEY,
        "X-RapidAPI-Host": import.meta.env.VITE_X-RAPIDAPI-HOST
      },
    };

    try {
      const response = await axios.request(options);
      setMovie(response.data);
      // console.log(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    // getTheMovie();
  }, [id]);

  return (
    <div className=" bg-slate-900">
      <div className="flex justify-center items-center">
        <Button>
          <Link to="/">Back</Link>
        </Button>
      </div>
      <main>
        <section className="flex justify-center items-center">
          <figure className="w-[300px] 2xl:w-[900px] p-4" key={movie.imdbId}>
            <AspectRatio ratio={16 / 9}>
              <img
                src={
                  Object.keys(movie).length > 0
                    ? movie.imageSet.horizontalPoster.w1080
                    : ""
                }
                alt=""
                className=" rounded-xl"
              />
            </AspectRatio>
            <div className="flex items-center flex-wrap">
              <h1 className="text-purple-600 font-semibold text-5xl md:text-6xl 2xl:text-6xl py-4">
                {movie.title}
              </h1>
              <div className="flex justify-center items-center">
                {Object.keys(movie).length > 0
                  ? movie.genres.map((gen, i) => {
                      return (
                        <h2 className="p-1 text-slate-500">#{gen.name}</h2>
                      );
                    })
                  : ""}
              </div>
            </div>
            <h1 className="text-white text-2xl md:text-4xl 2xl:text-4xl py-4">
              <span className="pr-3 text-purple-600 text-xl md:text-2xl 2xl:text-2xl">
                Original Title :
              </span>
              {movie.originalTitle}
            </h1>
            <div className="flex items-center flex-wrap">
              <span className="pr-3 text-purple-600 text-xl md:text-2xl 2xl:text-2xl">directors :</span>
              {Object.keys(movie).length > 0
                ? movie.directors.map((gen, i) => {
                    return (
                      <h1 className=" text-white font-semibold text-xl md:text-3xl 2xl:text-3xl">
                        {gen}
                      </h1>
                    );
                  })
                : ""}
            </div>
            <h1 className="text-yellow-500 text-lg md:text-xl 2xl:text-xl py-3">
              <span className="pr-3 text-purple-600 text-xl md:text-2xl 2xl:text-2xl">Overview :</span>
              {movie.overview}
            </h1>
            <h1 className="text-white text-xl md:text-2xl 2xl:text-2xl">
              <span className="pr-3 text-purple-600 text-lg md:text-xl 2xl:text-xl">Imdb Id :</span>
              {movie.imdbId}
            </h1>
            <h1 className="text-white text-xl md:text-2xl 2xl:text-2xl">
              <span className="pr-3 text-purple-600 text-lg md:text-xl 2xl:text-xl">Tmdb Id :</span>
              {movie.tmdbId}
            </h1>
            <h1 className="text-white text-xl md:text-2xl 2xl:text-2xl">
              <span className="pr-3 text-purple-600 text-lg md:text-xl 2xl:text-xl">
                ReleaseYear :
              </span>
              {movie.releaseYear}
            </h1>
            <h1 className="text-white text-xl md:text-2xl 2xl:text-2xl">
              <span className="pr-3 text-purple-600 text-lg md:text-xl 2xl:text-xl">Rating :</span>
              {movie.rating}
            </h1>
            <div className="flex items-center flex-wrap">
              <span className="pr-3 text-purple-600 text-2xl">cast :</span>
              {Object.keys(movie).length > 0
                ? movie.cast.map((gen, i) => {
                    return (
                      <h1 className=" text-yellow-500 font-semibold text-lg md:text-2xl 2xl:text-2xl px-1 md:px-2 2xl:px-2">
                        {gen} ,
                      </h1>
                    );
                  })
                : ""}
            </div>
          </figure>
        </section>
      </main>
    </div>
  );
}

export default SingleMovie;
