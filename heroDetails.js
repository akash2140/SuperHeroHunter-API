const inputTo = document.querySelector(".hero-input");
const buttonTo = document.querySelector(".hero-fav-button");
const heroNames= document.getElementById("name");
const photo = document.getElementById("photo");
const power = document.getElementById("power");

// fetching the api
var xhttpRequest = new XMLHttpRequest();
//Sending the XHR request to get the details of hero selected
xhttpRequest.open("GET","https://www.superheroapi.com/api.php/4851243658306665/" +  localStorage.getItem("heroSelected"),true);
xhttpRequest.send();

xhttpRequest.onreadystatechange = function () {
    const response = JSON.parse(xhttpRequest.responseText);
    //Fetching the details of superhero and populating in a format
    heroNames.innerHTML = response.name;
    photo.setAttribute("src", response.image.url);
    var powerFormat="<h1>POWER</h1><h3>Intelligence: ";
    var strengthFormat="</h3><h3>strength: ";
    var speedFormat="</h3><h3>Speed: ";
    var durabilityFormat="</h3><h3>Durability: ";
    var powerF="</h3><h3>Power: ";
    var combatFormat="</h3><h3>Combat: ";
    power.innerHTML =powerFormat +response.powerstats.intelligence +strengthFormat +response.powerstats.strength +speedFormat +response.powerstats.speed +durabilityFormat +response.powerstats.durability +powerF + response.powerstats.power + combatFormat + response.powerstats.combat +  "</h4>"; 
};
