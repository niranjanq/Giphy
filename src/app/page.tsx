// pages/index.tsx
"use client";
import { useState, ChangeEvent, useEffect } from "react";
import Image from "next/image";
import InfiniteScroll from "react-infinite-scroll-component";
import Loader from "./components/Loader";
import Navbar from "./components/Navbar";
import { auth } from "./firebase/firebase.config";

interface Gif {
  id: string;
  title: string;
  images: {
    fixed_height: {
      url: string;
    };
  };
}

// Function to extract the first three words from the title
const extractFirstThreeWords = (title: string): string => {
  const words = title.split(" ");
  const truncatedWords = words.slice(0, 3);
  return truncatedWords.join(" ");
};

const Home: React.FC = () => {
  const [query, setQuery] = useState<string>("");
  const [searchResults, setSearchResults] = useState<Gif[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [hasMore, setHasMore] = useState<boolean>(true);
  const [offset, setOffset] = useState<number>(0);
  const [isUser, setIsUser] = useState(false);
  const [loadingstate, setLoadingstate] = useState(true);

  const searchGifs = async (searchQuery: string, loadMore = false) => {
    try {
      setLoading(true);
      const apiKey = process.env.NEXT_PUBLIC_GIPHY_API_KEY;
      const limit = 10;
      const apiUrl = `https://api.giphy.com/v1/gifs/search?q=${searchQuery}&api_key=${apiKey}&limit=${limit}&offset=${
        loadMore ? offset + limit : 0
      }`;
      const response = await fetch(apiUrl, { next: { revalidate: 20 } });
      const result = await response.json();
      const newResults = result.data;

      if (loadMore) {
        setSearchResults((prevResults) => [...prevResults, ...newResults]);
        setOffset((prevOffset) => prevOffset + limit);
      } else {
        setSearchResults(newResults);
        setOffset(limit);
      }

      setHasMore(newResults.length === limit);
    } catch (error) {
      console.error("Error fetching GIFs:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = () => {
    if (query.trim() !== "") {
      searchGifs(query);
    }
  };

  const fetchMoreData = () => {
    if (auth.currentUser == null) {
      alert("You Have TO Sign In First");
      return;
    }
    if (!loading && hasMore) {
      searchGifs(query, true);
    }
  };

  useEffect(() => {
    const hotSearch = setTimeout(() => {
      if (auth.currentUser == null) {
        console.log("You Have TO Sign In First");
        return;
      }
      if (query.trim() !== "") {
        searchGifs(query);
      }
    }, 800);
    return () => clearInterval(hotSearch);
  }, [query]);

  useEffect(() => {
    auth.onAuthStateChanged((user) => {
      if (user != null) {
        setIsUser(true);
      }
      setLoadingstate(false);
    });
  }, []);

  return (
    <>
      <Navbar isUser={isUser} setIsUser={setIsUser} />
      <div className="min-h-screen flex flex-col items-center justify-center relative">
        {(loading || loadingstate) && <Loader />}
        <h1 className="text-4xl font-bold font-sans mb-4 mt-16 text-cyan-400 shadow-cyan-100">
          Vortex Vibes
        </h1>
        <div className="flex items-center justify-center mb-8">
          <input
            type="text"
            value={query}
            onChange={(e: ChangeEvent<HTMLInputElement>) =>
              setQuery(e.target.value)
            }
            placeholder="Search GIFs..."
            className="p-2 font-mono bg-white rounded-l text-black"
          />
          {/* <button
            onClick={handleSearch}
            className="bg-blue-500 text-white p-2 rounded-r hover:bg-blue-600 "
          >
            Search
          </button> */}
        </div>
        <p className="mb-6 text-cyan-600 font-bold shadow-cyan-100 text-center">
          Dive into the Gif Universe with Whirlwind Wonders and Delightful
          Surprises!
        </p>
        {!isUser&&<p className="text-sm text-white "> You have to signed in to search</p>}

        <InfiniteScroll
          dataLength={searchResults.length}
          next={fetchMoreData}
          hasMore={hasMore}
          loader={<Loader />}
          endMessage={
            <p className="text-gray-500 text-sm">No more GIFs to load.</p>
          }
          className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4"
        >
          {searchResults.map((gif) => (
            <div key={gif.id} className="flex flex-col items-center">
              <img
                src={gif.images.fixed_height.url}
                alt={gif.title}
                width={200}
                height={200}
                className="rounded  w-[200px] h-[200px]"
              />
              <div className="flex items-center">
                <p className="mt-2 font-mono text-center">
                  {extractFirstThreeWords(gif.title)}
                </p>
              </div>
            </div>
          ))}
        </InfiniteScroll>
      </div>
    </>
  );
};

export default Home;
