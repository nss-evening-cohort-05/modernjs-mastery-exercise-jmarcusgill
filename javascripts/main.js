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
    return new Promise((resolve, reject) =>{
      $.ajax("./db/teams.json")
      .done((data1) => resolve(data1.teams))
      .fail((error1) => reject(error1));
    });
  };

  const loadGenders = () => {
    return new Promise((resolve, reject) =>{
      $.ajax("./db/genders.json")
      .done((data2) => (data2.genders))
      .fail((error2) => (error2));
    });
  };

  const loadCharacters = () => {
    return new Promise((resolve, reject) =>{
      $.ajax("./db/characters.json")
      .done((data3) => (data3.characters))
      .fail((error3) => (error3));
    });
  };

//////////////////// Promise.all

  const dataGetter = () => {
    Promise.all([loadTeams(), loadGenders(), loadCharacters()])
    .then((resultz) => {
      resultz.forEach((ajaxCalls) => {
          ajaxCalls.forEach((mutant) => {
            marvel.push(ajaxCalls);
          });
      });
    });
      console.log(resultz);
      // writeToDOM(marvel);
  };


}); //ends doc.ready