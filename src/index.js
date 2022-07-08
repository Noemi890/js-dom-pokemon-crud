const pokeForm = document.querySelector(".poke-form");
const pokeList = document.querySelector(".poke-list");
const emptyHeart = '../utilities/heart-thin.png'
const filledHeart = '../utilities/red-heart.png'
const state = []

const getAllPokemon = () => {
  fetch('http://localhost:3000/pokemons')
  .then(response => response.json())
  .then((data) => {
    data.forEach(pokemon => {
      pokemon.liked = false
      console.log(data)
      state.push(pokemon)
    })
  })
  .then(() => addPokemons(state))
}

function addPokemon(pokemon) {
  const liEl = document.createElement("li");
  const imgEl = document.createElement("img");
  const h2El = document.createElement("h2");
  const deletePokemon = document.createElement('button')
  const likePokemon = document.createElement('img')

  liEl.classList.add("pokemon");
  imgEl.src = pokemon.image;

  h2El.innerText = pokemon.name;

  deletePokemon.setAttribute('class', 'delete')
  deletePokemon.style.width = '100%'
  deletePokemon.innerHTML = 'delete'
  deletePokemon.addEventListener('click', (event) => {
    event.preventDefault()
    fetch(`http://localhost:3000/pokemons/${pokemon.id}`, {
      method: 'DELETE'
    })
    .then (removeFromState(pokemon))
    .then (console.log('my state', state))
    .then (getAllPokemon())
  })

  likePokemon.src = emptyHeart
  likePokemon.style.width = '30px'
  likePokemon.style.marginLeft = '65px'
  likePokemon.style.marginTop = '10px'
  likePokemon.style.cursor = 'pointer'

  likePokemon.addEventListener('click', (event) => {
    event.preventDefault()
    likePokemon.src = (!pokemon.liked) ? filledHeart : emptyHeart
    pokemon.liked = (!pokemon.liked) ? true : false
  })

  liEl.append(imgEl, h2El, deletePokemon, likePokemon);
  pokeList.append(liEl);
}

function addPokemons(pokemons) {
  pokemons.forEach(pokemon => {
    addPokemon(pokemon)})
}

function listenToAddPokemonForm() {
  pokeForm.addEventListener("submit", function (event) {
    event.preventDefault();
    const pokemon = {
      name: pokeForm.name.value,
      image: pokeForm.image.value
    }
    addToState(pokemon)
    fetch('http://localhost:3000/pokemons', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    }, 
    body: JSON.stringify(pokemon)
    })
    .then(res => res.json())
    .then(pokemon => addPokemon(pokemon))
    })
  pokeForm.reset()
}

const addToState = (pokemon) => {
  state.push(pokemon)
}

const removeFromState = (pokemon) => {
  const remove = state.find(pokemon)
  state.splice(remove, 1)
}

function init() {
  listenToAddPokemonForm();
  getAllPokemon()
}

init();
