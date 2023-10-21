import { useState, useEffect } from 'react';
import './DetailView.css';

function DetailView(props) {
  const [pokemonData, setPokemonData] = useState({});

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(props.pokemonsUrl);
        const json = await response.json();
        setPokemonData({
          image: json.sprites.other['official-artwork'].front_default,
          id: json.id,
          name: json.name,
          types: json.types.map(typeEntry => typeEntry.type.name),
        });
      } catch (error) {
        console.log('error', error);
      }
    };

    fetchData();
  }, []);

  return (
    <div className='card'>
      <img src={pokemonData.image} alt='pokemonImage' className='images'></img>
      <p className='pokeId'>#{pokemonData.id}</p>
      <p className='pokeName'>{pokemonData.name}</p>
      {pokemonData.types &&
        pokemonData.types.map((type, i) => {
          return (
            <div className='pokeType' key={i}>
              {type}
            </div>
          );
        })}
    </div>
  );
}

export default DetailView;
