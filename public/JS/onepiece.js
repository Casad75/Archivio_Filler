const all = document.getElementById('all');
const filler = document.getElementById('filler');
const canon = document.getElementById('canon');
const fetchButton = document.getElementById('fetch');
const table = document.getElementById('table');
const dropdown = document.getElementById('drop');
const mangacanon = document.querySelector('.manga');
const mixedcanon = document.querySelector('.mixed');
const fillerclass = document.querySelector('.filler');
const animecanon = document.querySelector('.anime');
const animeNameElement = document.getElementById('drop');
const playIcons = document.querySelectorAll('#table .play-icon');
const animeName = document.getElementById('animeName').getAttribute('data-animeName');




const animeNameMapping = {
  "akame_ga_kill": "Akame-ga-Kill",
  "ansatsu_kyoushitsu_assassination_classroom": "Assassination-Classroom",
  "attack_titan": "LAttacco-dei-Giganti-",
  "angel_beats": "Angel-Beats",
  "black_clover": "Black-Clover",
  "black_lagoon": "Black-Lagoon-ITA",
  "bleach": "Bleach",
  "blue_exorcist": "Ao-no-Exorcist",
  "boruto_naruto_next_generations": "Boruto-Naruto-Next-Generations",
  "cowboy_bebop": "Cowboy-Bebop-ITA",
  "code_geass": "Code-Geass-Hangyaku-no-Lelouch-ITA",
  "death_parade": "Death-Parade-SUB-ITA",
  "death_note": "Death-Note",
  "demon_slayer_kimetsu_no_yaiba": "Demon-Slayer-Kimetsu-no-Yaiba",
  "devilman_crybaby": "Devilman-Crybaby",
  "detective_conan": "Detective-Conan",
  "dr_stone": "Dr-Stone",
  "dragon_ball_z": "Dragon-Ball-Z",
  "erased": "Erased",
  "fairy_tail": "Fairy-Tail",
  "fatestay_night": "FateStay-Night",
  "fire_force": "Fire-Force",
  "fullmetal_alchemist_brotherhood": "Fullmetal-Alchemist-Brotherhood-ITA",
  "gintama": "Gintama",
  "great_teacher_onizuka": "GTO-ITA",
  "haikyuu": "Haikyuu",
  "high_school_dxd": "High-School-DxD",
  "highschoool_dead": "Highschool-of-the-Dead",
  "hunter_x_hunter": "Hunter-x-Hunter-2011",
  "jojos_bizarre_adventure_tv": "Le-Bizzarre-Avventure-di-JoJo",
  "jujutsu_kaisen": "Jujutsu-Kaisen",
  "kurokos_basketball": "Kuroko-no-Basket",
  "mob_psycho_100": "Mob-Psycho-100",
  "my_hero_academia": "Boku-no-Hero-Academia",
  "naruto": "Naruto",
  "one_piece": "One-Piece",
  "one_punch_man": "One-Punch-Man",
  "parasyte_maxim": "Kiseijuu",
  "prison_school": "Prison-School",
  "slam_dunk_0": "Slam-Dunk-ITA",
  "steinsgate": "SteinsGate",
  "sword_art_online": "Sword-Art-Online",
  "tokyo_ghoul_re_0": "Tokyo-Ghoulre",
  "tokyo_ghoul": "Tokyo-Ghoul",
  "vinland_saga": "Vinland-Saga"
};

let count = 0;

const addActive = function(input) {
  input.classList.add('active');
}

const removeActive = function(input) {
  input.classList.remove('active');
}

all.addEventListener('click', function(e) {
  removeActive(filler);
  removeActive(canon);
  addActive(all);
  if (mangacanon) {
    mangacanon.style.display = 'block';
  }
  if (mixedcanon) {
    mixedcanon.style.display = 'block';
  }
  if (fillerclass) {
    fillerclass.style.display = 'block';
  }
  if (animecanon) {
    animecanon.style.display = 'block';
  }
});

filler.addEventListener('click', function(e) {
  removeActive(all);
  removeActive(canon);
  addActive(filler);
  if (mangacanon) {
    mangacanon.style.display = 'none';
  }
  if (mixedcanon) {
    mixedcanon.style.display = 'block';
  }
  if (fillerclass) {
    fillerclass.style.display = 'block';
  }
  if (animecanon) {
    animecanon.style.display = 'none';
  }
});

canon.addEventListener('click', function(e) {
  removeActive(filler);
  removeActive(all);
  addActive(canon);
  if (mangacanon) {
    mangacanon.style.display = 'block';
  }
  if (mixedcanon) {
    mixedcanon.style.display = 'block';
  }
  if (fillerclass) {
    fillerclass.style.display = 'none';
  }
  if (animecanon) {
    animecanon.style.display = 'block';
  }
});

//CAMBIARE IL NUMERO IP CON "LOCALHOST", OPPURE IL NUMERO DELL'IP DEL PC

// Funzione per caricare gli episodi
function loadEpisodes(animeName) {
  const encodedAnimeName = encodeURIComponent(animeName); // Codifica il nome dell'anime per gestire caratteri speciali nell'URL
  fetch(`http://192.168.1.40:3000/${encodedAnimeName}`) // Utilizza l'URL correttamente formato
      .then(response => {
          if (!response.ok) {
              throw new Error('La risposta della rete non è stata positiva');
          }
          return response.json();
      })
      .then(episodes => {
          let output = `<tr id="head">
              <th>Ep</th>
              <th>Titolo</th>
              <th>Tipo</th>
              <th id="date">Data</th>
              <th>Guarda Ep</th> 
          </tr>`;
          episodes.forEach(episode => {
              // Determina la classe da applicare in base alla classe dell'episodio
              let typeClass = '';
              if (episode.class.toLowerCase() === 'red' || episode.class.toLowerCase() === 'green') {
                  typeClass = episode.class.toLowerCase();
              }

              // Formatta la data in formato YYYY-MM-DD
              let formattedDate = new Date(episode.date).toISOString().split('T')[0];
              output += `
              <tr data-streaming-url="${episode.streamingUrl}">
                <td id="number${episode.id}" onclick="seeEpisode('${animeName}', ${episode.id})">${episode.id}</td>
                <td title="epiname">${episode.title}</td>
                <td>
                    <div class="type ${typeClass}">${episode.type}</div>
                </td>
                <td>${formattedDate}</td>
                <td><span class="play-icon"><i class="fa fa-play" data-streaming-url="${episode.streamingUrl}"></i></span></td>
            </tr>`;
          });

          table.innerHTML = output;
          let dropdownOptions = ``;
          episodes.forEach(episode => {
              dropdownOptions += `
              <option class="opt" value="#number${episode.id}">${episode.id}</option>`;
          });
          dropdown.innerHTML = dropdownOptions;
          dropdown.disabled = false;

          const playIcons = document.querySelectorAll('#table .play-icon');
          playIcons.forEach(icon => {
              icon.addEventListener('click', (event) => {
                  event.stopPropagation(); // Evita la propagazione dell'evento alla riga
                  const episodeId = icon.closest('tr').querySelector('td:first-child').textContent; // Ottieni l'id dell'episodio dalla prima cella della riga
                  const formattedAnimeName = animeNameMapping[animeName];
                  const myAnimeFillerUrl = `https://www.animesaturn.bz/ep/${formattedAnimeName}-ep-${episodeId}`; // Costruisci l'URL di AnimeSaturn
                  window.open(myAnimeFillerUrl, '_blank'); // Apri AnimeSaturn con l'anime ed episodio selezionati dall'utente in una nuova scheda
              });
          });
  })
  .catch(err => console.error('Errore Fetch:', err));
}

fetchButton.addEventListener('click', () => loadEpisodes(animeName));