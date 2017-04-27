$(document).ready(function(){



  $(".btn").click((event) => {
     $("#bodyImage").hide("slow");
     dataGetter();
   });

  let marvel = [];

  const writeToDOM = (marvel) => {
    console.log(marvel);
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

const dataGetter = (teamId) => {
  Promise.all([loadTeams(), loadGenders(), loadCharacters()])
  .then((results) =>{
    results.forEach((ajaxCall)=>{
      ajaxCall.forEach((mutant) =>{
        marvel.push(mutant);
      });
    });
  })
  .catch((error) =>{
    console.log(error);
  });
  writeToDOM(marvel);
};


}); //ends doc.ready