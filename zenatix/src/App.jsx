import "./App.css";
import axios from "axios";
import { useEffect } from "react";
import { useState } from "react";
import PokemonThumb from "./components/PokemonThumb";
import Pagination from "./components/Pagination";
function App() {
  const [allPokemons1, setAllPokemons1] = useState([]);
  const [currentPageUrl, setCurrentPageUrl] = useState(
    "https://pokeapi.co/api/v2/pokemon"
  );
  const [loadMore, setLoadMore] = useState("");
  const [previous, setPrevious] = useState("");
  const [loading, setloading] = useState(true);
  const handleFilter = (v) => {
    const fdata = allPokemons1.filter((e) => {
      return e.types[0].type.name === v;
    });
    setAllPokemons1(fdata);
  };
  useEffect(() => {
   
    let cancel;
    axios.get(currentPageUrl, {
      cancelToken: new axios.CancelToken(c => cancel = c)
    }).then(({data}) => {
      setloading(false)
      setLoadMore(data.next)
      setPrevious(data.previous)
      function createPokemonObject(results) {
      // console.log("results",results)
      results.map(async (pokemon) => {
        const res = await fetch(
          `https://pokeapi.co/api/v2/pokemon/${pokemon.name}`
        );
        const data = await res.json();
        setAllPokemons1( e=>[...e,data]);
        // await allPokemons1.sort((a, b) => a.id - b.id);
      });
    }
    // console.log(allPokemons1);
    createPokemonObject(data.results);
  });

    return () => cancel()
  }, [currentPageUrl]);

  function gotoNextPage() {
    setCurrentPageUrl(loadMore);
  }

  function gotoPrevPage() {
    setCurrentPageUrl(previous);
  }

  return (
    <div className="App">
      <h1>POKEMON</h1>
      <div>
        <input type="search" />
        <select name="" id="" onChange={(e) => handleFilter(e.target.value)}>
          <option value="">Type:filter</option>
          <option value="normal">normal</option>
          <option value="regular">regular</option>
          <option value="fire">fire</option>
          <option value="grass">grass</option>
          <option value="water">water</option>
        </select>
      </div>
      <div className="Pokemon">
        {loading ? (
          <h2>Loading...</h2>
        ) : (
          allPokemons1.map((pokemonStats, index) => (
            <PokemonThumb
              key={index}
              id={pokemonStats.id}
              image={pokemonStats.sprites.other.dream_world.front_default}
              name={pokemonStats.name}
              type={pokemonStats.types[0].type.name}
            />
          ))
        )}
      </div>
      <div>
        <Pagination
          gotoNextPage={loadMore ? gotoNextPage : null}
          gotoPrevPage={previous ? gotoPrevPage : null}
        />
      </div>
    </div>
  );
}

export default App;
