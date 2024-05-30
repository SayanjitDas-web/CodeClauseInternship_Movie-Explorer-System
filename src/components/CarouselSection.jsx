import { useEffect, useRef, useState } from "react";
import Autoplay from "embla-carousel-autoplay";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { Skeleton } from "@/components/ui/skeleton";

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { Button } from "./ui/button";
import { MoveRight } from "lucide-react";
import { useNavigate } from "react-router-dom";

function CarouselSection({ dbArr = [] }) {
  const [individualArr, setIndividualArr] = useState([]);
  const navigate = useNavigate();

  const plugin = useRef(Autoplay({ delay: 2000, stopOnInteraction: true }));

  function getRandomElements(arr = [], num) {
    if (arr) {
      if (num > arr.length) {
        throw new Error(
          "Number of elements requested is more than the array length"
        );
      }

      const shuffledArray = arr.slice();
      for (let i = shuffledArray.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [shuffledArray[i], shuffledArray[j]] = [
          shuffledArray[j],
          shuffledArray[i],
        ];
      }

      return shuffledArray.slice(0, num);
    }
  }

  useEffect(() => {
    setIndividualArr(dbArr);
  }, [dbArr, dbArr.length]);

  return (
    <>
      <section className="w-full flex-col justify-center items-center mt-4">
        <h1 className=" pl-[4%] md:pl-[10%] 2xl:pl-[10%] text-2xl md:text-5xl 2xl:text-5xl font-semibold text-purple-600 my-5 md:my-5 2xl:my-6">
          Explore Movies
        </h1>
        <div className="flex justify-center items-center">
          <Carousel
            plugins={[plugin.current]}
            className="w-[80%] h-[200px] md:h-[550px] 2xl:h-[550px] shadow-[0_2.8px_2.2px_rgba(0,_0,_0,_0.034),_0_6.7px_5.3px_rgba(0,_0,_0,_0.048),_0_12.5px_10px_rgba(0,_0,_0,_0.06),_0_22.3px_17.9px_rgba(0,_0,_0,_0.072),_0_41.8px_33.4px_rgba(0,_0,_0,_0.086),_0_100px_80px_rgba(0,_0,_0,_0.12)]"
            onMouseEnter={plugin.current.stop}
            onMouseLeave={plugin.current.reset}
          >
            <CarouselContent>
              {dbArr.length > 0 ? dbArr.map((movie, index) => (
                <CarouselItem
                  key={index}
                  className="relative h-[200px] md:h-[550px] 2xl:h-[550px]"
                >
                  <div className="absolute ml-3 bottom-3 z-10 flex items-center">
                    <Button
                      className=" md:text-xl 2xl:text-xl md:px-7 2xl:px-7 md:py-7 2xl:py-7 flex justify-center items-center"
                      variant="secondary"
                      onClick={() => navigate(`movie/${movie.imdbId}`)}
                    >
                      <span>Explore</span>
                      <MoveRight className="ml-3" />
                    </Button>
                    <h1 className=" text-purple-500 text-4xl font-bold pl-3 md:block 2xl:block hidden">
                      {movie.title}
                    </h1>
                  </div>
                  <div className=" absolute w-full h-full bg-gradient-to-t from-black to-transparent"></div>
                  <img
                    src={movie.imageSet.horizontalPoster.w1080}
                    alt=""
                    className="w-full h-full object-center"
                  />
                </CarouselItem>
              )): Array.from({ length: 1 }).map((_, index) => (
                <CarouselItem
                  key={index}
                  className="relative h-[200px] md:h-[550px] 2xl:h-[550px]"
                >
                  <Skeleton className="w-full h-full" />
                </CarouselItem>
              ))}
            </CarouselContent>
            <div>
              <CarouselPrevious className="hidden" />
              <CarouselNext className="hidden" />
            </div>
          </Carousel>
        </div>
      </section>
      <section>
        <h1 className=" pl-[4%] md:pl-[10%] 2xl:pl-[10%] text-2xl md:text-5xl 2xl:text-5xl font-semibold text-purple-600 my-5 md:my-5 2xl:my-6">
          Top Rated Movies
        </h1>
        <div className="w-full flex flex-wrap justify-center items-center py-2">
          {dbArr.length > 0
            ? individualArr.map((movie, i) => {
                if (movie.rating > 65) {
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
                        <h1 className="text-purple-600 text-xl pr-2">
                          {movie.title}
                        </h1>
                        <div className="flex justify-center items-center">
                          {movie.genres.map((gen, i) => {
                            return (
                              <h2 className="p-1 text-slate-500">
                                #{gen.name}
                              </h2>
                            );
                          })}
                        </div>
                      </div>
                      <Button onClick={() => navigate(`movie/${movie.imdbId}`)}>
                        More info
                      </Button>
                    </figure>
                  );
                }
              })
            : Array.from({ length: 4 }).map((_, index) => (
                <div className="flex flex-col space-y-3 m-3 p-2" key={index}>
                  <Skeleton className="h-[125px] w-[250px] rounded-xl" />
                  <div className="space-y-2">
                    <Skeleton className="h-4 w-[250px]" />
                    <Skeleton className="h-4 w-[200px]" />
                  </div>
                </div>
              ))}
        </div>
      </section>
    </>
  );
}

export default CarouselSection;
