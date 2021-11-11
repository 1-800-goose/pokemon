"use strict";
(function() {

  /**
   * Name: Robin Luo
   * Date: November 5, 2021
   * Section: CSE 154 AB
   * This is the index.js script for interactivity on my pokemon generator website. It primarily
   * contains the API base url, selected pokemon names from the datbase, and functions
   * for buttons response.
   */

  window.addEventListener("load", init);

  const BASE_URL = "https://pokeapi.co/api/v2/pokemon/";

  // list of cool pokemon i enjoy
  const POKEMON = ["clefairy", "venipede", "chansey", "pikachu", "bulbasaur", "charmander",
  "squirtle", "ditto", "drifloon", "snorunt", "oddish", "cutiefly", "wooper", "wailord", "gengar",
  "gastly", "haunter", "quagsire", "snorlax", "kartana", "porygon", "magnemite", "parasect",
  "rotom"];

  /** this function initiates the code when the page loads */
  function init() {
    id("time").addEventListener("click", time);
    id("add").addEventListener("click", add);
    id("subtract").addEventListener("click", subtract);
    id("different").addEventListener("click", different);
    id("evil").addEventListener("click", evil);
    id("reset").addEventListener("click", reset);
  }

  /** this function toggles "daytime" or "nighttime" for the page theme */
  function time() {
    id("photos").classList.toggle("night");
    id("body").classList.toggle("nightbkgd");
    id("header").classList.toggle("nighttxt");
    let button1 = qs('button');
    button1.classList.toggle("nightbtn");
    button1.classList.toggle("nightbtnhvr");
    button1.classList.toggle("nightbtnact");
  }

  /** this function selects a random pokemon from my POKEMON list and adds it to the page */
  function add() {
    let select = Math.floor((POKEMON.length) * Math.random());
    fetch(BASE_URL + POKEMON[select])
      .then(statusCheck)
      .then(resp => resp.json())
      .then(displayPokemon)
      .catch(handleError);
  }

  /**
   * this function displays the selected pokemon on the page
   * @param {object} response - data recieved from the Pokemon API about a selected pokemon
   */
  function displayPokemon(response) {
    let pokemon = document.createElement("img");
    pokemon.src = response.sprites.front_default;
    pokemon.alt = response.name;
    if(id("photos").childNodes.length==0) {
      id("photos").appendChild(pokemon);
    }
    id("photos").insertBefore(pokemon, id("photos").firstChild);
  }

  /** this function takes away the last added pokemon */
  function subtract() {
    if (id("photos").lastChild !== null) {
      id("photos").removeChild(id("photos").lastChild);
    }
  }

  /** this function changes the last added pokemon to a different one */
  function different() {
    if (id("photos").lastChild !== null) {
      id("photos").removeChild(id("photos").lastChild);
    }
    add();
  }

  /**
   * this function will change all the pokemon on the page to buzzwole by calling the replace
   * function to replace all the images
   */
  function evil() {
    fetch(BASE_URL + "buzzwole")
      .then(statusCheck)
      .then(resp => resp.json())
      .then(replace)
      .catch(handleError);
  }

  /**
   * this function handles the error case, and displays an error message
   */
  function handleError() {
    let msg = gen("p");
    msg.textContent = "ERROR: pokemon offline!";
    id("photos").appendChild(msg);
  }

  /**
   * this function replaces all the images with buzzwole, an evil pokemon
   * @param {object} evilPokemon - data recieved from the Pokemon API about buzzwole
   */
  function replace(evilPokemon) {
    let images = qsa("img");
    for (let i = 0; i < images.length; i++) {
      images[i].src = evilPokemon.sprites.front_default;
      images[i].alt = evilPokemon.name;
    }
  }

  /** this function removes all the pokemon from the page */
  function reset() {
    let all = id("photos");
    all.innerHTML = "";
  }

  /* ------------------------------ Helper Functions  ------------------------------ */

  /**
   * Returns a new element with the given tag name.
   * @param {string} tagName - HTML tag name for new DOM element.
   * @returns {object} New DOM object for given HTML tag.
   */
  function gen(tagName) {
    return document.createElement(tagName);
  }

  /**
   * Helper function to return the response's result text if successful, otherwise
   * returns the rejected Promise result with an error status and corresponding text
   * @param {object} res - response to check for success/error
   * @return {object} - valid response if response was successful, otherwise rejected
   *                    Promise result
   */
  async function statusCheck(res) {
    if (!res.ok) {
      throw new Error(await res.text());
    }
    return res;
  }

  /**
   * Returns the element that has the ID attribute with the specified value.
   * @param {string} id - element ID
   * @return {object} DOM object associated with id.
   */
  function id(id) {
    return document.getElementById(id);
  }

  /**
   * Returns the first element that matches the given CSS selector.
   * @param {string} query - CSS query selector.
   * @returns {object[]} array of DOM objects matching the query.
   */
  function qs(query) {
    return document.querySelector(query);
  }

  /**
   * Returns the array of elements that match the given CSS selector.
   * @param {string} query - CSS query selector
   * @returns {object[]} array of DOM objects matching the query.
   */
  function qsa(query) {
    return document.querySelectorAll(query);
  }
})();
