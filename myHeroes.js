const inputTo = document.querySelector(".hero-input");
const buttonTo = document.querySelector(".hero-fav-button");
const heroNames= document.getElementById("name");
const photo = document.getElementById("photo");
const power = document.getElementById("power");
const favHeroContainer = document.getElementById("fav-hero-container");
const body = document.getElementsByTagName("body")[0];
var favHeroes = JSON.parse(localStorage.getItem("favHeroes"));
//Iterating over the list of our superheroes 
  for (let i of favHeroes) {
    let div = document.createElement("div");
    div.innerHTML ='<img src="' +  i.photoUrl +'" alt="" class="heroImage"><h3>' +i.name + '</h3><div class="removeFav" data-id="' +i.id +'">Remove</div>';
    favHeroContainer.appendChild(div);
  }

  // for removing the superhero from list
  const removeButtons = document.getElementsByClassName("removeFav");
  for (let i of removeButtons) {
    i.addEventListener("click", function () {
      function remove(value) {
        return this.dataset.id != value.id;
      }
      favHeroes = favHeroes.filter(remove.bind(i));
      localStorage.setItem("favHeroes", JSON.stringify(favHeroes));
      location.reload();
    });
  
}
