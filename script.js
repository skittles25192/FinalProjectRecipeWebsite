const searchBtn = document.getElementById('search-btn');
const mealList = document.getElementById('meal');
const mealDetailsContent = document.querySelector('.meal-details-content');
const recipeCloseBtn = document.getElementById('recipe-close-btn');

// event listeners
searchBtn.addEventListener('click', getMealList);
mealList.addEventListener('click', getMealRecipe);
recipeCloseBtn.addEventListener('click', () => {
    mealDetailsContent.parentElement.classList.remove('showRecipe');
    
});


// get meal list that matches with the ingredients
function getMealList(){
    let searchInputTxt = document.getElementById('search-input').value.trim();
    fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?i=${searchInputTxt}`)
    .then(response => response.json())
    .then(data => {
        let html = "";
        if(data.meals){
            data.meals.forEach(meal => {

                html += `

<div class="mealcard">

                <div class = "meal-item" data-id = "${meal.idMeal}">
                        <div id="flip" class = "meal-img">
                            <img  src = "${meal.strMealThumb}" alt = "food">
                        </div>
                        <div class = "meal-name">
                            <h3>${meal.strMeal}</h3>
                            <a href = "#" class = "recipe-btn">Get Recipe</a>
                        </div>
                 </div>



                <div class = "recipe-div" style="height:500px;">
                    <div class="heart">
                    <button id="like"><?xml version="1.0" encoding="UTF-8"?>
                    <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="45px" height="45px" viewBox="0 0 45 45" version="1.1">
                    <g id="surface1">
                    <path style="background-color: #b54507; stroke:none;fill-rule:nonzero;fill:rgb(255, 0, 0);fill-opacity:1;" d="M 11.773438 5.625 C 17.84375 5.625 21.097656 12.171875 22.5 15.058594 C 23.90625 12.15625 27.128906 5.644531 33.234375 5.644531 C 37.09375 5.644531 41.25 8.097656 41.25 13.484375 C 41.25 19.9375 32.355469 28.207031 22.5 37.859375 C 12.640625 28.203125 3.75 19.9375 3.75 13.484375 C 3.75 8.46875 7.433594 5.625 11.773438 5.625 Z M 11.777344 1.875 C 5.808594 1.875 0 5.976562 0 13.484375 C 0 22.222656 10.445312 31.160156 22.5 43.125 C 34.554688 31.160156 45 22.222656 45 13.484375 C 45 5.964844 39.191406 1.894531 33.234375 1.894531 C 29.105469 1.894531 24.898438 3.847656 22.5 7.964844 C 20.089844 3.828125 15.894531 1.875 11.777344 1.875 Z M 11.777344 1.875 "/>
                    </g>
                    </svg> 
                    <span id="like_text"></span>
                    </button>


                    </div>
                    <div class="div_tittle"><h2 class = "recipe-title">${meal.strMeal}</h2>
                    <p class = "recipe-category">${meal.strCategory}</p></div>
                
                    <div class = "recipe-instruct">
                        <h3>Instructions:</h3>
                        <p>${meal.strInstructions}</p>
                    </div>
                    <div class = "recipe-meal-img">
                        <img src = "${meal.strMealThumb}" alt = "">
                    </div>
                    <div class = "recipe-link">
                        <a href = "${meal.strYoutube}" target = "_blank">Watch Video</a>
                    </div>
                </div>

</div>
                    
                `;
            });
            mealList.classList.remove('notFound');
        } else{
            html = "Sorry, we didn't find any meal!";
            mealList.classList.add('notFound');
        }

        mealList.innerHTML = html;
    });
}


// get recipe of the meal
function getMealRecipe(e){    
        let mealItem = e;
        fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${mealItem.dataset.id}`)
        .then(response => response.json())
        .then(data => mealRecipeModal(data.meals));
}

// create a modal
function mealRecipeModal(meal){
    console.log(meal);
    meal = meal[0];
    let html = `
        <h2 class = "recipe-title">${meal.strMeal}</h2>
        <p class = "recipe-category">${meal.strCategory}</p>
        <div class = "recipe-instruct">
            <h3>Instructions:</h3>
            <p>${meal.strInstructions}</p>
        </div>
        <div class = "recipe-meal-img">
            <img src = "${meal.strMealThumb}" alt = "">
        </div>
        <div class = "recipe-link">
            <a href = "${meal.strYoutube}" target = "_blank">Watch Video</a>
        </div>
    `;
    mealDetailsContent.innerHTML = html;
    mealDetailsContent.parentElement.classList.add('showRecipe');
}

getMealList()

let buton = document.getElementById("like");
let times = 0
let text = document.getElementById("like_text");
buton.addEventListener("click", changetext);
     function changetext(){
        times +=1;
        if ((times % 2) === 1){
        document.getElementById("like_text").innerHTML = "like";
        }
        else if ((times % 2) === 0) {
        document.getElementById("like_text").innerHTML = "dislike";
        } 
        
}

