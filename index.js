const inputTo = document.querySelector(".hero-input");
const buttonTo = document.querySelector(".hero-fav-button");
const searchHero = document.getElementById("searchHero");
var btnFav = [];
const searchResults = document.getElementById("searchResults");
const apiUrl="https://www.superheroapi.com/api.php/4851243658306665/search/";

// XMLHttpRequest request
searchHero.addEventListener("keyup", function () {
  // Fetching the search result value
  var typedWords = this.value;
  // Fetching the XMLHTTPREQUEST
  var xheroRequest = new XMLHttpRequest();
  //As per document , max characters 3 are filtered for search Results, Otherwise ""
  if (typedWords.length < 2) {
    searchResults.innerHTML = "";
    return;
  }
// API call using XMLHttpRequest 
  xheroRequest.open("GET", apiUrl + typedWords, true );
  //Sending the Request Using Send() Function
  xheroRequest.send();
  // This is function of response recieved 
  xheroRequest.onreadystatechange = function () 
  {
      //Parsing the response
      const response = JSON.parse(xheroRequest.responseText);
     //Fetching the results from the searchResults typed characters
      const favResults = response.results;
      searchResults.innerHTML = "";

      //Apepending the selected Superhero into as list item
      for (let ele of favResults) {
        var li = document.createElement("li");
        li.classList.add("search-item");
        li.innerHTML ='<a href="" class="searchResults" id="' +ele.id +'">' +ele.name +'<img src="' +ele.image.url +'" alt="" class="image-size"></a></><div class ="add" id="' +ele.id +'" data-name="' + ele.name +'" data-photo="' +ele.image.url + '"> Add </div>'; 
        searchResults.appendChild(li);
      }
      //If Clicked then adding that to our list item
      let resultHeros = document.getElementsByClassName("searchResults");
      for (let j of resultHeros) {
        j.addEventListener("click", function (event) {
          event.preventDefault();
          localStorage.setItem("heroSelected", this.id);
          location.replace("./heroDetails.html");
        });
      }

      // adding suerhero to the fav list
      btnFav = document.getElementsByClassName("add");
      for (let i of btnFav) {
        i.addEventListener("click", function ()
        {
          if (i.innerHTML == "<div>Added</div>") 
          {
            i.innerHTML = "<div>Add</div>";
            function remove(value) {
              return this.id != value.id;
            }
            // saving the data in local storage
            let oldItems = JSON.parse(localStorage.getItem("favHeroes")) || [];
            newItems = oldItems.filter(remove.bind(i));
            localStorage.setItem("favHeroes", JSON.stringify(newItems));
            return;
          }
          i.innerHTML = "<div>Added</div>";
          let favItem = {
            id: this.id,
            name: this.dataset.name,
            photoUrl: this.dataset.photo,
          };
          let oldItems = JSON.parse(localStorage.getItem("favHeroes")) || [];
          oldItems.push(favItem);
          localStorage.setItem("favHeroes", JSON.stringify(oldItems));
        });
      }
  };
 
});


