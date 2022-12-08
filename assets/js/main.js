const pokemonList = document.getElementById('pokemonList')
const loadMoreButton = document.getElementById('loadMoreButton')

const maxRecords = 386
const limit = 9
let offset = 0;

function convertPokemonToLi(pokemon) {
    return `
            <li class="${pokemon.type}" onclick="openModal(${pokemon.number})">${pokemon.name}
                        <ol class="types">
                            ${pokemon.types.map((type) => `<li class="type">${type}</li>`).join('')}
                        </ol>
                        <img src="${pokemon.photo}" alt="${pokemon.name}">
                        <img class="grey-ball" src="assets/img/grey-ball.png">
                    </li>
        
            `
    }

    function loadPokemonItens(offset, limit) {
        pokeApi.getPokemons(offset, limit).then((pokemons = []) => {
            const newHtml = pokemons.map(convertPokemonToLi).join('')
            pokemonList.innerHTML += newHtml
        })
    }
    
    loadPokemonItens(offset, limit)
    
  function LoadMorePokemons() {
        offset += limit
        const qtdRecordsWithNexPage = offset + limit
    
        if (qtdRecordsWithNexPage >= maxRecords) {
            const newLimit = maxRecords - offset
            loadPokemonItens(offset, newLimit)
    
            loadMoreButton.parentElement.removeChild(loadMoreButton)
        } else {
            loadPokemonItens(offset, limit)
        }
    }