
import "../style/PokemonThumb.css"
const PokemonThumb = ({id, image, name, type, _callback }) => {
    return (
        <div className="data">
            <div className="number"><small>#0{id}</small></div>
            <img src={image} alt={name} className="pokemon_image"/>
            <div className="detail-wrapper">
                <h3>{name}</h3>
                <small>Type: {type}</small>
            </div>
        </div>
    )
}

export default PokemonThumb