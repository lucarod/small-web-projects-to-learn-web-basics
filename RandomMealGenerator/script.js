const mealContent = document.getElementById('meal-content')
const buttons = document.querySelectorAll('.generate-meal-button')
buttons.forEach((button) => {
    button.addEventListener('click', getMeal)
})

async function getMeal() {
    try{
        const mealResponse = await fetch('https://www.themealdb.com/api/json/v1/1/random.php')
        const mealData = await mealResponse.json()
        const [meal] = mealData.meals
        showMeal(meal)
    }
    catch(err) {
        console.log(err)
    }
}

function showMeal(meal) {
    const mealName = meal.strMeal
    const mealIngredients = getIngredients(meal)
    const mealInstructions = meal.strInstructions
    const mealImage = meal.strMealThumb

    const filledInnerHTML = `
    <div id="meal-description">
        <h2 id="meal-name">${mealName}</h2>
        <div id="meal-ingredients">
            <h3>Ingredients</h3>
            <ul id="ingredient-list" class="meal-steps">
                ${mealIngredients.map(ingredient => `<li>${ingredient}</li>`).join('')}
            </ul>
        </div>
        <p id="meal-instructions">${mealInstructions}</p>
    </div>
    <div id="meal-media">
        <img id="meal-image" src="${mealImage}" alt="Meal Image">
        ${meal.strYoutube ? `
		<div id="meal-video">
            <iframe width="420" height="240"
            src="https://www.youtube.com/embed/${meal.strYoutube.slice(-11)}">
            </iframe>
		</div>` : ''}
    </div>
    `;

    mealContent.innerHTML = filledInnerHTML
}

function getIngredients(meal) {
    let ingredients = []
    for (let i = 1; i <= 20; i++) {
        if(meal[`strIngredient${i}`]) {
            ingredients.push(`${meal[`strIngredient${i}`]} - ${meal[`strMeasure${i}`]}`)
        } else {
            break
        }
    }
    return ingredients
}