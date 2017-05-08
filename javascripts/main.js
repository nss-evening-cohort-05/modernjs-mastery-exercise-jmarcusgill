$(document).ready(function(){


  // Global Variables
  let characterArray = [];
  let printChar = "";

  //Click Event for initiating dataGetter
  $(".btn").click((event) => {
    printChar = $(event.target)[0].innerText;
     $("#bodyImage").hide("slow");
     dataGetter();
   });

  //Writing to DOM
  const writeDOM = (characterArray, teamArray) => {
    let domString = "";
    let counter = 0;

    for (let x = 0; x < characterArray.length; x++) {
      if (printChar === characterArray[x].team_name) {

        if(x%3===0){
          domString += `<div class="row">`;
        }

        domString += `<div class="col-sm-6 col-md-3">`;
        domString += `<div class="thumbnail">`;
        domString += `<h3 class="panel-heading">${characterArray[x].name}</h3>`;

        if (characterArray[x].gender_name === "Female") {
          domString += `<img class="img-circle female" src="${characterArray[x].image}" alt="${characterArray[x].name}">`;
        } else {
          domString += `<img class="img-circle male" src="${characterArray[x].image}" alt="${characterArray[x].name}">`;
        }

        domString += `<div class="caption">`;
        domString += `<p>${characterArray[x].description}</p>`;
        domString += `</div></div></div>`;

        if(x%3===2){
          domString += `</div>`;
        }
      }
    }
    $(".heroes").html(domString);
  };




  //new Promises for 3 json files: teams, genders, characters
  const loadTeams = () => {
    return new Promise ((resolve, reject) =>{
      $.ajax("./db/teams.json")
      .done((data) => resolve(data.teams))
      .fail((error) => reject(error));
    });
  };

  const loadGenders = () => {
    return new Promise ((resolve, reject) =>{
      $.ajax("./db/genders.json")
      .done((data2) => resolve(data2.genders))
      .fail((error2) => reject(error2));
    });
  };

  const loadCharacters = () => {
    return new Promise ((resolve, reject) =>{
      $.ajax("./db/characters.json")
      .done((data3) => resolve(data3.characters))
      .fail((error3) => reject(error3));
    });
  };




  // Promise.all
  const dataGetter = () => {
    Promise.all([loadTeams(), loadGenders(), loadCharacters()])
    .then((results) =>{

      let teamArray = results[0];
      let genderArray = results[1];
      let characterArray = results[2];

      characterArray.forEach((char) =>{
        genderArray.forEach((gender) =>{
          teamArray.forEach((team) =>{

            //create new property, "team_name" that is equal to team.name
            //if team_id is equal to team.id
            if(char.team_id === team.id){
              char.team_name = team.name;
            }
            //create new property, "gender_name" that is equal to gender.id
            //if gender_id is equal to gender.type
            if(char.gender_id === gender.id){
              char.gender_name = gender.type;
            }

            if (char.description === "" && char.gender_id === 0) {
              char.description = "abcde fghij klmno pqrst uvwxy z";
            } else if (char.description === "" && char.gender_id === 1) {
              char.description = "1234567890";
            }
          });
        });
      });
      writeDOM(characterArray, teamArray);
    })
    .catch((error) =>{
      console.log(error);
    });
  };


}); //ends doc.ready