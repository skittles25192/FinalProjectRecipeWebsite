
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

function updateCartCount() {
    const itemCountElement = document.querySelector('#itemCount');
    const itemCount = JSON.parse(localStorage.getItem('FavoritesList')).length;
  
    if (itemCount) {
      itemCountElement.textContent = itemCount;
    }
  }

async function loadAsyncFn() {
    try {
        updateCartCount();
        const addToCartBtn = document.querySelector('#heart');
        if (addToCartBtn) {
            addToCartBtn.addEventListener('click', () => {
            updateCartCount();
            });
        }
    } catch (error) {
        alert('Error loading header and footer or Product Details: ' + error);
    }
}

function addProductToCart(product) {
    const currentCart = getLocalStorage('FavoritesList') || [];
    const updatedCart = [...currentCart, product];
    setLocalStorage('FavoritesList', updatedCart);
  }

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

</div>
                    
                `;
            });
            mealList.classList.remove('notFound');
        } else{
            html = "Sorry, we didn't find any meal!";
            mealList.classList.add('notFound');
        }

        mealList.innerHTML = html;
        document.getElementById('heart').addEventListener('click', () => addProductToCart(meal));

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

function getLocalStorage(key) {
    return JSON.parse(localStorage.getItem(key));
  }
  // save data to local storage
function setLocalStorage(key, data) {
    localStorage.setItem(key, JSON.stringify(data));
  }

loadAsyncFn();
getMealList();