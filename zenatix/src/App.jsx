import { useEffect } from 'react';
import PokemonThumb from './components/PokemonThumb'
import './App.css';
import { useState } from 'react';

function App() {
  const[allPokemons, setAllPokemons] = useState([])
   const [loadMore, setLoadMore] = useState('https://pokeapi.co/api/v2/pokemon?limit=20')

   const handleFilter=(v)=>{
    // console.log(v);
    const data = allPokemons.filter((e)=>{
      return e.types[0].type.name === v
    })
    console.log(data);
   }
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
      <div>
      <input type="search"/>
      <select name="" id="" onClick={(e)=>handleFilter(e.target.value)}>
        <option value="">Type:filter</option>
        <option value="normal">normal</option>
        <option value="regular">regular</option>
        <option value="fire">fire</option>
        <option value="grass">grass</option>
        <option value="water">water</option>
      </select>
      </div>
      <div className='Pokemon'>
      {allPokemons.map( (pokemonStats, index) => 
            <PokemonThumb
              key={index}
              id={pokemonStats.id}
              image={pokemonStats.sprites.other.dream_world.front_default}
              name={pokemonStats.name}
              type={pokemonStats.types[0].type.name}
            />)}
      </div>
      <div>
      <button className="load-more" onClick={() => getAllPokemons()}>Load more</button>
      </div>
    </div>
  );
}

export default App;
