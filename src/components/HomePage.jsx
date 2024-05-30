import { useEffect, useState } from "react";
import { Filter, MoveLeft, Search } from "lucide-react";
import CarouselSection from "./CarouselSection";
import axios from "axios";
import SearchResult from "./SearchResult";
import { Button } from "./ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

function HomePage() {
  const [isSearch, setIsSearch] = useState(false);
  const [movieDb, setMovieDb] = useState([]);
  const [searchResult, setSearchResult] = useState([]);
  const [searchVal, setSearchVal] = useState("");
  const [getGener, setGetGener] = useState("");
  const [getCountry, setGetCountry] = useState(null);
  // const [sortBy, setSortBy] = useState("");
  const [countries, setCountries] = useState({});
  const [geners, setGeners] = useState([]);

  const getMovieDb = async () => {
    const options = {
      method: "GET",
      url: "https://streaming-availability.p.rapidapi.com/shows/search/filters",
      params: {
        country: "in",
        series_granularity: "show",
        genres: getGener,
        order_direction: "asc",
        order_by: "original_title",
        genres_relation: "and",
        output_language: "en",
        show_type: "movie",
      },
      headers: {
        "X-RapidAPI-Key": import.meta.env.VITE_X-RAPIDAPI-KEY,
        "X-RapidAPI-Host": import.meta.env.VITE_X-RAPIDAPI-HOST
      },
    };

    try {
      const response = await axios.request(options);
      setMovieDb(response.data.shows);
      console.log(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  const getCountries = async () => {
    const options = {
      method: "GET",
      url: "https://streaming-availability.p.rapidapi.com/countries",
      params: {
        output_language: "en",
      },
      headers: {
        "X-RapidAPI-Key": import.meta.env.VITE_X-RAPIDAPI-KEY,
        "X-RapidAPI-Host": import.meta.env.VITE_X-RAPIDAPI-HOST
      },
    };

    try {
      const response = await axios.request(options);
      setCountries(response.data);
      // console.log(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  const getGeners = async () => {
    const options = {
      method: "GET",
      url: "https://streaming-availability.p.rapidapi.com/genres",
      params: {
        output_language: "en",
      },
      headers: {
        "X-RapidAPI-Key": import.meta.env.VITE_X-RAPIDAPI-KEY,
        "X-RapidAPI-Host": import.meta.env.VITE_X-RAPIDAPI-HOST
      },
    };

    try {
      const response = await axios.request(options);
      setGeners(response.data);
      console.log(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  const handleSearch = async () => {
    setIsSearch(true);
    const options = {
      method: 'GET',
      url: 'https://streaming-availability.p.rapidapi.com/shows/search/title',
      params: {
        country: getCountry ? getCountry : "in",
        title: searchVal,
        series_granularity: 'show',
        show_type: 'movie',
        output_language: 'en'
      },
      headers: {
        "X-RapidAPI-Key": import.meta.env.VITE_X-RAPIDAPI-KEY,
        "X-RapidAPI-Host": import.meta.env.VITE_X-RAPIDAPI-HOST
      },
    };
    
    try {
      if(searchVal !== ""){
        const response = await axios.request(options);
        setSearchResult(response.data)
        console.log(searchVal)
        console.log(response.data);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const handleBack = () => {
    setIsSearch(false)
    setSearchVal("")
  }

  // useEffect(() => {
  //   getMovieDb()
  //   if(geners.length === 0){
  //     getGeners()
  //   }
  //   if(countries.length === 0){
  //     getCountries()
  //   }
  // }, [getGener, setGeners]);

  return (
    <div className=" bg-slate-900">
      <header>
        <section className=" flex justify-center items-center">
          <div className="flex justify-between items-center w-[350px] py-1 border border-white rounded-xl shadow-[0_3px_10px_rgb(0,0,0,0.2)]">
            <input
              type="text"
              className="w-[79%] h-[40px] text-lg text-center bg-transparent text-white rounded-xl outline-none border-0 pl-2"
              placeholder="search movies here.."
              onChange={(e) => setSearchVal(e.target.value)}
              value={searchVal}
            />
            <Dialog>
              <DialogTrigger asChild>
                <Filter stroke="white" className="w-[10%]" />
              </DialogTrigger>
              <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                  <DialogTitle>Set Filter</DialogTitle>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="country" className="text-right">
                      Country
                    </Label>
                    <Select
                      id="country"
                      defaultValue="in"
                      onValueChange={(val) => setGetCountry(val)}
                    >
                      <SelectTrigger className="w-[180px]">
                        <SelectValue placeholder="Select a Country" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectGroup>
                          {Object.keys(countries).length > 0 ? (
                            Object.keys(countries).map((key, i) => {
                              return (
                                <SelectItem
                                  value={countries[key].countryCode}
                                  key={i}
                                >
                                  {countries[key].name}
                                </SelectItem>
                              );
                            })
                          ) : (
                            <SelectLabel>Countries</SelectLabel>
                          )}
                        </SelectGroup>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </DialogContent>
            </Dialog>
            <Search stroke="white" className="w-[11%]" onClick={handleSearch} />
          </div>
        </section>
        <div className="flex justify-center items-center p-4">
          <Select
            id="gener"
            defaultValue="action"
            onValueChange={(val) => setGetGener(val)}
          >
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Select a gener" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                {geners.length > 0 ? (
                  geners.map((gen, i) => {
                    return (
                      <SelectItem value={gen.id} key={i}>
                        {gen.name}
                      </SelectItem>
                    );
                  })
                ) : (
                  <SelectItem value="action">Action</SelectItem>
                )}
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>
      </header>
      {isSearch ? (
        <div className="flex justify-center items-center p-3">
          <Button onClick={handleBack}>
            <MoveLeft stroke="white" className="mr-2" />
            Back
          </Button>
        </div>
      ) : (
        ""
      )}
      {isSearch ? <SearchResult result={searchResult} /> : <CarouselSection dbArr={movieDb} />}
      
    </div>
  );
}

export default HomePage;
