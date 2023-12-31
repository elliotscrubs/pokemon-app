import { useState, useEffect } from 'react';
import './Card.css';

function Card(props) {
  const [pokemonData, setPokemonData] = useState({});

  useEffect(() => {
    const url = `https://pokeapi.co/api/v2/pokemon/${props.id}`;

    const fetchData = async () => {
      try {
        const response = await fetch(url);
        const json = await response.json();
        setPokemonData({
          image: json.sprites.other['official-artwork'].front_default,
          id: json.id,
          name: json.name,
          types: json.types.map(typeEntry => typeEntry.type.name),
          url: url
        });
      } catch (error) {
        console.log('error', error);
      }
    };
    fetchData();
  }, []);

  const updater = () => {
    props.handleSearchChange(pokemonData.url)
    }
  

  return (
    <div className='card'>
      <img
        onClick={updater}
        src={pokemonData.image}
        alt='pokemonImage'
        className='images'></img>
      <p className='pokeId'>#{pokemonData.id}</p>
      <p className='pokeName'>{pokemonData.name}</p>
      {pokemonData.types &&
        pokemonData.types.map((type, i) => {
          return <div key={i}>{type}</div>;
        })}
    </div>
  );
}

export default Card;
