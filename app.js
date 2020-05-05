const search = document.getElementById('search'),
    random = document.getElementById('random'),
    submitForm = document.getElementById('submit'),
    heading = document.getElementById('result-heading'),
    mealsElement = document.getElementById('meals'),
    meals = document.getElementById('meals'),
    mealElement = document.getElementById('single-meal');


// Search Event Listener 
submitForm.addEventListener('submit', (e) => {

    const meal = search.value;

    fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${meal}`)
        .then(res => res.json())
        .then(data => updateUI(data.meals, meal));

    e.preventDefault();
});


// Updating UI after search
function updateUI(meals, meal) {

    mealsElement.innerHTML = '';

    if (meals === null) {                                                          // If searched meal does not exist

        heading.innerHTML = '<p>There are no search results. Try again!<p>';

    } else {

        heading.innerHTML = `<h2>Search results for: ${meal}</h2>`;
        meals.forEach(current => {
            mealsElement.innerHTML +=
                `<div class="meal">
            <img src="${current.strMealThumb}" alt="${current.strMeal}" />
            <div class="meal-info" id="${current.idMeal}">
                <h3>${current.strMeal}</h3>
            </div>
        </div>`;
        });
    }
}


// Meal Event Listener
meals.addEventListener('click', (e) => {

    if (e.target.parentElement.classList.contains('meal-info') || e.target.parentElement.classList.contains('meal')) {

        const mealId = e.target.getAttribute('id') || e.target.parentElement.getAttribute('id');

        fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${mealId}`)
            .then(res => res.json())
            .then(data => singleMealUI(data.meals[0]));
    }
});


// Random button Event Listener
random.addEventListener('click', () => {

    mealsElement.innerHTML = '';
    heading.innerHTML = ``;

    fetch('https://www.themealdb.com/api/json/v1/1/random.php')
        .then(res => res.json())
        .then(data => singleMealUI(data.meals[0]));
});


// Updating single meal UI
function singleMealUI(meal) {

    const ingredients = [];

    for (var i = 1; i < 20; i++) {

        if (meal[`strIngredient${i}`]) {

            ingredients.push(`${meal[`strIngredient${i}`]} - ${meal[`strMeasure${i}`]}`);
        }
    }

    mealElement.innerHTML = `<div class="single-meal">
        <h1>${meal.strMeal}</h1>
        <img src="${meal.strMealThumb}" alt="${meal.strMeal}" />
        <div class="single-meal-info">
            ${meal.strCategory ? `<p>${meal.strCategory}</p>` : ''}
        ${meal.strArea ? `<p>${meal.strArea}</p>` : ''}
        </div>
        <div class="main">
            <p>${meal.strInstructions}</p>
            <h2>Ingredients</h2>
            <ul>
              ${ingredients.map(ing => `<li>${ing}</li>`).join('')}
            </ul>
        </div>
    </div>`;
}







