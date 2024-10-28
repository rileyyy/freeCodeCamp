// stat elements
const pokeName = document.getElementById('pokemon-name');
const pokeId = document.getElementById('pokemon-id');
const pokeImg = document.getElementById('sprite');
const pokeTypes = document.getElementById('types');
const height = document.getElementById('height');
const weight = document.getElementById('weight');
const hp = document.getElementById('hp');
const attack = document.getElementById('attack');
const defense = document.getElementById('defense');
const specialAttack = document.getElementById('special-attack');
const specialDefense = document.getElementById('special-defense');
const speed = document.getElementById('speed');

// other elements
const textInput = document.getElementById('search-input');
const searchButton = document.getElementById('search-button');

const allPokemon = [];
const stats = {
   name: '',
   id: 0,
   img: '',
   types: [],
   height: 0,
   weight: 0,
   hp: 0,
   attack: 0,
   defense: 0,
   specialAttack: 0,
   specialDefense: 0,
   speed: 0,
};

fetch('https://pokeapi-proxy.freecodecamp.rocks/api/pokemon')
   .then((res) => res.json())
   .then((data) => {
      data.results.map(({id, name, url}) => {
         allPokemon.push({id: id, name: name, url: url});
      });
   })
   .catch((err) => console.log(err));

searchButton.addEventListener('click', () => lookupPokemon());
textInput.addEventListener('keypress', e => 
  { if (e.key === 'Enter') lookupPokemon(); });

function lookupPokemon() {
   if (textInput.value === '')
   {
      alert('Please enter a Pokemon name or ID');
      return;
   };

   let found = false;
   const sanitizedInput = textInput.value.sanitize();
   allPokemon.forEach(pokemon => {
      if (pokemon.id == sanitizedInput
         || pokemon.name == sanitizedInput)
      {
         found = true;
         fetch(pokemon.url)
            .then((res) => res.json())
            .then((data) => {
               parseStats(data);
               updateStatsDisplay();
            })
            .catch((err) => console.log(err))
      }
   });

   if (!found) {
      alert('Pokémon not found');
   }
}

String.prototype.sanitize = function() {
   return this.toLowerCase().replace(/[^a-z0-9]/g, '-').replace('--', '-');
 };

function parseStats(data) {
   stats.name = data.name;
   stats.id = data.id;
   stats.img = data.sprites.front_default;
   stats.types = data.types.map((type) => type.type.name);
   stats.height = data.height;
   stats.weight = data.weight;
   stats.hp = data.stats[0].base_stat;
   stats.attack = data.stats[1].base_stat;
   stats.defense = data.stats[2].base_stat;
   stats.specialAttack = data.stats[3].base_stat;
   stats.specialDefense = data.stats[4].base_stat;
   stats.speed = data.stats[5].base_stat;
}

function updateStatsDisplay() {
   pokeName.textContent = stats.name;
   pokeId.textContent = `#${stats.id}`;
   pokeImg.src = stats.img;
   height.textContent = `Height: ${stats.height}`;
   weight.textContent = `Weight: ${stats.weight}`;
   hp.textContent = stats.hp;
   attack.textContent = stats.attack;
   defense.textContent = stats.defense;
   specialAttack.textContent = stats.specialAttack;
   specialDefense.textContent = stats.specialDefense;
   speed.textContent = stats.speed;

   pokeImg.classList.remove('invisible');

   pokeTypes.innerHTML = '';
   stats.types.forEach((type) => {
      const typeElement = document.createElement('span');
      typeElement.textContent = type;
      typeElement.classList.add(`type`);
      typeElement.classList.add(`${type}`);
      pokeTypes.appendChild(typeElement);
   });
}