$(document).ready(function(){



  $(".btn").click((event) => {
    let printChar = $(event.target).attr("id");
     $("#bodyImage").hide("slow");
     console.log(printChar);
     dataGetter();
   });

  let marvel = [];
  let teamArray = [];
  let genderArray = [];
  let characterArray = [];




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

  const writeDOM = () => {
    console.log("inside writeDOM", characterArray);
  };



//////////////////// Promise.all

const dataGetter = () => {
  Promise.all([loadTeams(), loadGenders(), loadCharacters()])
  .then((results) =>{
    results.forEach((ajaxCall)=>{
    marvel.push(ajaxCall);
    });
    teamArray = marvel[0];
    genderArray = marvel[1];
    characterArray = marvel[2];

    writeDOM(characterArray);
  })
  .catch((error) =>{
    console.log(error);
  });
};


}); //ends doc.ready