const baseURL = 'https://pokeapi.co/api/v2/pokemon/';


// SEARCH FORM
const pokeSearch = document.querySelector('.search');
const searchForm = document.querySelector('form');
const submitBtn = document.querySelector('.submit');

// RESULTS SECTION
const section = document.querySelector('section');

// EVENT LISTENER
searchForm.addEventListener('submit', fetchResults);

// FETCH RESULTS
function fetchResults(e) {
    e.preventDefault();

    url = baseURL + pokeSearch.value;

    console.log(url);

    fetch(url)
        .then(function(result){
            return result.json();
        }).then(function(json){
            console.log(json);
            // console.log(json.types[0].type.name);
            displayResults(json);    
        });

}

function displayResults(json){
    while(section.firstChild){                  // 
        section.removeChild(section.firstChild);
    }

    let backgroundChange = document.getElementById('backgroundTwo');
   backgroundChange.style.backgroundImage = "url('assets/open_pokeball.png')";

   let searchText = document.getElementById('searchText');
   searchText.style.top = '-2em';

   let search = document.getElementById('search');
   search.style.top = '-3em';

   let submit = document.getElementById('submit');
   submit.style.top = '-2em';
    

    let name = document.createElement('p');     // creates new tag elements
    let weight = document.createElement('p');
    let type = document.createElement('p');
    let img = document.createElement('img');

    img.src = json.sprites.front_default;       // assigns the front default picture to the img source 
    img.alt = 'assets/pokemon_logo.png';        // if there is an issue with the img url then it takes a pokemon logo picture 


    let pokeName = json.name.toString();      // makes sure that the pokemon name is a string
    
    let capName;        // place holder variable

    for(letter in pokeName){            // capitalizes the first letter in the pokemon name
        if(letter == 0){
            capName = pokeName[letter].toUpperCase();
        } else {
            capName = capName + pokeName[letter];
        }
    }

    name.textContent = capName;     // assigns the capitalized name to the p tag

    let weightLBS = json.weight * 0.220462;
    weight.textContent = 'Weight: ' + weightLBS.toFixed(1) + ' lbs';      // assigns the weight to the p tag

    type.textContent = 'Type: ';

    if(json.types.length > 1){
        for(let j = 0; j < json.types.length; j++){
            type.textContent += json.types[j].type.name;
            if(j < json.types.length - 1){
                type.textContent += ', ';
            } else {
                
            }

        }
    } else{
        type.textContent += json.types[0].type.name;      // assigns the type to the p tag
    }
    

    name.setAttribute('class','pokeName');
    weight.setAttribute('class','pokeWeight');
    type.setAttribute('class','pokeType');
    img.setAttribute('class','pokeImg');

    section.appendChild(img);       //sends all of the tags into the section tags
    section.appendChild(name);
    section.appendChild(type);
    section.appendChild(weight);

}




