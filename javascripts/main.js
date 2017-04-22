$(document).ready(function(){

  let marvelArray = [];


  $(".btn").click((event) => {
     $("#bodyImage").hide("slow");
     dataGetter();
   });


  const loadCharacters = () => {
    return new Promise((resolve, reject) => {
      $.ajax("./db/characters.json")
      .done((data1) => resolve(data1.characters))
      .fail((error1) => reject(error1));
    });
  };

  const loadTeams = () => {
    return new Promise((resolve, reject) => {
      $.ajax("./db/teams.json")
      .done((data2) => resolve(data2.teams))
      .fail((error2) => reject(error2));
    });
  };

  const loadGender = () => {
    return new Promise((resolve, reject) => {
      $.ajax("./db/genders.json")
      .done((data3) => (data3.genders))
      .fail((error3) => (error3));
    });
  };

  const dataGetter = () => {
    Promise.all([loadCharacters(), loadTeams(), loadGender()])
    .then((result) => {
      result.forEach((mutant) => {
        marvelArray.push(mutant);
      });
      writeToDom(marvelArray);
    }).catch((error) => {
      console.log(error);
    });
  };


  const writeToDom = (marvelArray) => {
    console.log(marvelArray);
  };



}); //ends doc.ready