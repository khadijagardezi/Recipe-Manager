/** @format */

let recipes = JSON.parse(localStorage.getItem("recipes")) || [];
let recipeEditingIndex = null;

const recipeForm = document.getElementById("recipe-form");
const recipesContainer = document.getElementById("recipes-container");
const searchInput = document.getElementById("search");

function renderRecipes(filter = "") {
  recipesContainer.innerHTML = "";
  recipes
    .filter((recipe) =>
      recipe.name.toLowerCase().includes(filter.toLowerCase())
    )
    .forEach((recipe, index) => {
      // creating the card
      const recipeCard = `
        <div class="col-lg-6 d-flex">
          <div class="card">
            <div class="card-body">
              <h5 class="card-title">${recipe.name}</h5>
              <p class="card-text"><strong>Ingredients:</strong> ${recipe.ingredients.join(
                ", "
              )}</p>
              <p class="card-text"><strong>Steps:</strong> ${recipe.steps.join(
                "<br>"
              )}</p>
            <button class="btn btn-warning" onclick="editRecipe(${index})">Edit</button>
              <button class="btn btn-danger" onclick="deleteRecipe(${index})">Delete</button>
            </div>
          </div>
        </div>
      `;
      recipesContainer.innerHTML += recipeCard;
    });
}

renderRecipes();

function saveRecipe(e) {
    //prevent from re-loads
  e.preventDefault();
  const name = document.getElementById("recipe-name").value;
  const ingredients = document.getElementById("recipe-ingredients").value.split(",");
  const steps = document.getElementById("recipe-steps").value.split("\n");
  // recipe obj
  const recipe = { name, ingredients, steps };

  if (recipeEditingIndex !== null) {
    recipes[recipeEditingIndex] = recipe;
    recipeEditingIndex = null;
  } else {
    recipes.push(recipe);
  }
  localStorage.setItem("recipes", JSON.stringify(recipes));
  // Resets all input fields in the form
  recipeForm.reset();
  // Refreshes the recipe list
  renderRecipes();
}

function deleteRecipe(index) {
  recipes.splice(index, 1);
    localStorage.setItem("recipes", JSON.stringify(recipes));
    recipeForm.reset();
  renderRecipes();
}

function editRecipe(index) {
  const recipe = recipes[index];
  document.getElementById("recipe-name").value = recipe.name;
  document.getElementById("recipe-ingredients").value =
    recipe.ingredients.join(",");
  document.getElementById("recipe-steps").value = recipe.steps.join("\n");
  recipeEditingIndex = index;
}

recipeForm.addEventListener("submit", saveRecipe);
searchInput.addEventListener("input", () => renderRecipes(searchInput.value));

