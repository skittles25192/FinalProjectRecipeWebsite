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
        }
     catch (error) {
        alert('Error loading header and footer or Product Details: ' + error);
    }
}

function addProductToCart(product) {
    const currentCart = getLocalStorage('FavoritesList') || [];
    const updatedCart = [...currentCart, product];
    setLocalStorage('FavoritesList', updatedCart);
    updateCartCount();
    ShoppingCart();

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


                <div class = "meal-item" data-id = "${meal.idMeal}">
                        <div id="flip" class = "meal-img">
                            <img  src = "${meal.strMealThumb}" alt = "food">
                        </div>
                        <div class = "meal-name">
                            <h3>${meal.strMeal}</h3>
                            <a href = "#" class = "recipe-btn">Get Recipe</a>
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
    e.preventDefault();
    if(e.target.classList.contains('recipe-btn')){
        let mealItem = e.target.parentElement.parentElement;
    fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${mealItem.dataset.id}`)
        .then(response => response.json())
        .then(data => mealRecipeModal(data.meals));
}
}

// create a modal
function mealRecipeModal(meal){
    console.log(meal);
    meal = meal[0];
    let html = `
    <a id="heart" href="#"> <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M6.28 3c3.236.001 4.973 3.491 5.72 5.031.75-1.547 2.469-5.021 5.726-5.021 2.058 0 4.274 1.309 4.274 4.182 0 3.442-4.744 7.851-10 13-5.258-5.151-10-9.559-10-13 0-2.676 1.965-4.193 4.28-4.192zm.001-2c-3.183 0-6.281 2.187-6.281 6.192 0 4.661 5.57 9.427 12 15.808 6.43-6.381 12-11.147 12-15.808 0-4.011-3.097-6.182-6.274-6.182-2.204 0-4.446 1.042-5.726 3.238-1.285-2.206-3.522-3.248-5.719-3.248z"/></svg></a>
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
    const favoritebutton = document.getElementById('heart');
    favoritebutton.addEventListener('click', function(){ addProductToCart(meal)});




}

function ShoppingCart() {
    const cartItems = getLocalStorage('FavoritesList');
    const cartElement = document.querySelector('.product-list');  
    renderListWithTemplate(cartItemTemplate, cartElement, cartItems);
    //functionality to add total
    const itemCount = cartItems ? cartItems.length : 0;
    //Add the subtotal to the cart page
   
  }


  function cartItemTemplate(item) {
    const newItem =  

`<div id="list_container"
<div class="meal-item" data-id = "${item.idMeal}">
    <img style="border-radius: 50%; height: 100px; width: 100px" src = "${item.strMealThumb}" alt = "food"/>
    </div>
     
   
    <div class="meal-name">
    <h3>${item.strMeal}</h3>
    </div>
    </div>
    </div>`

   
  
  ;
  
    return newItem;
  }


  function renderListWithTemplate(templateFn, parentElement, list, position = 'afterbegin', clear = true) {

    if (clear) {
      parentElement.innerHTML = '';
    }
    const htmlStrings =  list.map(templateFn);
    parentElement.insertAdjacentHTML(position, htmlStrings.join(''));
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
ShoppingCart();
