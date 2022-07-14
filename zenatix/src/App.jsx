// import logo from './logo.svg';
import { useEffect } from 'react';
// import axios from "axios";
import './App.css';
import { useState } from 'react';

function App() {
  const[allPokemons, setAllPokemons] = useState([])
   const [loadMore, setLoadMore] = useState('https://pokeapi.co/api/v2/pokemon?limit=20')

  const getAllPokemons = async () => {
    const res = await fetch(loadMore)
    const data = await res.json()

    setLoadMore(data.next)
    console.log("data",data.next)
    function createPokemonObject(results)  {
      console.log("results",results)
      results.forEach( async (pokemon) => {
        const res = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemon.name}`)
        const data =  await res.json()
        setAllPokemons( currentList => [...currentList, data])
        await allPokemons.sort((a, b) => a.id - b.id)
      })
    }
    console.log(allPokemons);
    createPokemonObject(data.results)
  }
  useEffect(() => {
    getAllPokemons()
   }, [])
  return (
    <div className="App">
      <h1>POKEMON</h1>
      <input type="search" onChange={(e)=>{createPokemonObject(data.results)}}/>
      {allPokemons.map( (pokemonStats, index) => 
            <PokemonThumb
              key={index}
              id={pokemonStats.id}
              image={pokemonStats.sprites.other.dream_world.front_default}
              name={pokemonStats.name}
              type={pokemonStats.types[0].type.name}
            />)}
      <button className="load-more" onClick={() => getAllPokemons()}>Load more</button>
    </div>
  );
}

export default App;
