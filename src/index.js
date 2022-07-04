const pokeForm = document.querySelector(".poke-form");
const pokeList = document.querySelector(".poke-list");
const state = []

const getAllPokemon = () => {
  fetch('http://localhost:3000/pokemons')
  .then(response => response.json())
  .then((data) => {
    data.forEach(pokemon => {
      state.push(pokemon)
    })
  })
  .then(() => addPokemons(state))
}

function addPokemon(pokemon) {
  const liEl = document.createElement("li");
  const imgEl = document.createElement("img");
  const h2El = document.createElement("h2");
  const deletePokemon = document.createElement('span')
  const likePokemon = document.createElement('input')

  liEl.classList.add("pokemon");
  imgEl.src = pokemon.image;

  h2El.innerText = pokemon.name;

  deletePokemon.setAttribute('class', 'delete')
  deletePokemon.innerHTML = 'X'

  likePokemon.type = 'checkbox'

  liEl.append(imgEl, h2El, deletePokemon, likePokemon);
  pokeList.append(liEl);
}

function addPokemons(pokemons) {
  pokemons.forEach(pokemon => addPokemon(pokemon))
}

function listenToAddPokemonForm() {
  pokeForm.addEventListener("submit", function (event) {
    event.preventDefault();
    const pokemon = {
      name: pokeForm.name.value,
      image: pokeForm.image.value
    }
  })
}

    // CREATE
//     fetch("http://localhost:3000/pokemons", {
//       method: "POST",
//       headers: {
//         "Content-Type": "application/json"
//       },
//       body: JSON.stringify(pokemon)
//     })
//       .then(res =>  res.json())
//       .then(pokemon => addPokemon(pokemon));
//       })

//     pokeForm.reset()
// }

function init() {
  listenToAddPokemonForm();
  getAllPokemon()
}

init();
