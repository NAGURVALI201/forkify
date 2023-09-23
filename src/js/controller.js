import * as model from './model.js';
import { CLOSE_FORM_SEC } from './config.js';
import recipeView from './views/recepieView.js';
import searchView from './views/searchView.js';
import resultsView from './views/resultsView.js';
import paginationView from './views/paginationView.js';
import bookmarkView from './views/bookmarkView.js';
import addRecipeView from './views/addRecipeView.js';

// if (module.hot) {
//   module.hot.accept();
// }

import 'core-js/stable';
//polyfilling reset of all
import 'regenerator-runtime/runtime';
// polyfilling aysnc await
// console.log(icons);
// All the icons are loading from dist folder so the current icons are not found by npm so we will import it and set the icons path to the import icons variable
const recipeContainer = document.querySelector('.recipe');

// https://forkify-api.herokuapp.com/v2

///////////////////////////////////////
const controlRecipe = async function () {
  try {
    const id = window.location.hash.slice(1);
    // console.log(id);

    if (!id) return;
    recipeView.spinner();

    // updating the selected recipe in the page in the recipe list(for highlighting)
    resultsView.update(model.getSearchResultsPage());

    //  update the bookmarks
    bookmarkView.update(model.state.bookmark);

    // 1.loading the receipe
    await model.loadRecipe(id);

    // 2.rendering recipe
    recipeView.render(model.state.recipe);
  } catch (err) {
    recipeView.renderError();
  }
};

const controlSearchResults = async function () {
  try {
    resultsView.spinner();
    // 1) get the query
    const query = searchView.getQuery();
    if (!query) return;

    // 2) search the query
    await model.loadSearchResults(query);

    // 3) Render the query

    // resultsView.render(model.state.search.results);
    resultsView.render(model.getSearchResultsPage());

    // 4) pagination of the results
    paginationView.render(model.state.search);
  } catch (err) {
    // console.log(err);
    resultsView.renderError();
  }
};

const controlPagination = function (gotoPage) {
  // now we should move to that page and rendor the buttons
  // 1) move to that page
  resultsView.render(model.getSearchResultsPage(gotoPage));
  // 2) render New buttons
  paginationView.render(model.state.search);
};

const controlServings = function (newServings) {
  // when we click on (-,+) in the serving it should update them.
  // 1) update the servings recipe
  model.updateServings(newServings);
  // 2) update the view of recipe
  // recipeView.render(model.state.recipe);
  recipeView.update(model.state.recipe);
};

const controlAddBookmark = function () {
  // 1) adding and removing bookmark
  !model.state.recipe.bookmarked
    ? model.addBookmark(model.state.recipe)
    : model.deleteBookMark(model.state.recipe.id);
  // 2) updating the UI to which bookmark is added
  recipeView.update(model.state.recipe);
  // 3) render the book
  bookmarkView.render(model.state.bookmark);
};

const controlBookmarks = function () {
  bookmarkView.render(model.state.bookmark);
};

const controlAddRecipe = async function (recipe) {
  try {
    // render the spinner
    addRecipeView.spinner();

    await model.addRecipe(recipe);

    // render in the recipe view
    recipeView.render(model.state.recipe);

    // render success message
    addRecipeView.renderSuccess();

    // Adding it to the bookmark
    bookmarkView.render(model.state.bookmark);

    // changing the url in browser using history api
    window.history.pushState(null, '', `#${model.state.recipe.id}`);

    // console.log(model.state.recipe);
    // closing the from window after sometime
    setTimeout(function () {
      addRecipeView.toggleWindow();
    }, CLOSE_FORM_SEC * 1000);
  } catch (err) {
    // console.log('💥', err.message);
    addRecipeView.renderError(err.message);
  }
};

const newFeature = function () {
  console.log('Welcome to the code base');
};
const init = function () {
  bookmarkView.addHandlerRender(controlBookmarks);
  recipeView.addHandlerRender(controlRecipe);
  recipeView.addHandlerUpdateServings(controlServings);
  recipeView.addHandlerAddBookmark(controlAddBookmark);
  searchView.addHandlerSearch(controlSearchResults);
  paginationView.addHandlerClick(controlPagination);
  addRecipeView.addHandlerUpload(controlAddRecipe);
};
init();
