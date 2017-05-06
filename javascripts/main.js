$(document).ready(function(){

  let characterArray = [];

  let printChar = "";



  $(".btn").click((event) => {
    printChar = $(event.target)[0].innerText;
     $("#bodyImage").hide("slow");
     dataGetter();
   });


////////////functions for matching teams and writing to dom



  const writeDOM = (characterArray, teamArray) => {
    let domString = "";
    // console.log(characterArray, teamArray)

    for (let x = 0; x < characterArray.length; x++) {
      if (printChar === characterArray[x].team_name) {
        domString += `<div class="col-xs-4 hero-container">`;
        domString += `<h3>${characterArray[x].name}</h3>`;
        domString += `<section><img class="hero-image" src="${characterArray[x].image}"></section>`;
        domString += `<p class="text-left">${characterArray[x].description}</p>`;
        domString += `</div>`;
      }
    }
    console.log("printChar", printChar);
    console.log(characterArray);
    $(".container").html(domString);


  };




//////////load functions for 3 json files

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




//////////////////// Promise.all

const dataGetter = () => {
  Promise.all([loadTeams(), loadGenders(), loadCharacters()])
  .then((results) =>{
    // results.forEach((ajaxCall)=>{
    // marvel.push(ajaxCall);
    // });
    let teamArray = results[0];
    let genderArray = results[1];
    let characterArray = results[2];


    characterArray.forEach((char) =>{
      genderArray.forEach((gender) =>{
        teamArray.forEach((team) =>{

          if(char.team_id === team.id){
            char.team_name = team.name;
          }
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
    // console.log(characterArray);
    writeDOM(characterArray, teamArray);
  })
  .catch((error) =>{
    console.log(error);
  });
};


}); //ends doc.ready