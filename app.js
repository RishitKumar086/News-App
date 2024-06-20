"use strict";

import { API_KEY } from "./config.js";

const newsForm = document.querySelector(".news-form");
const newsContainer = document.querySelector(".news-container");

newsForm.addEventListener("submit", async (e) => {
  e.preventDefault();
  const searchQuery = e.target[0].value.trim(); // Trim whitespace from the search query
  if (searchQuery) {
    try {
      const data = await fetchNews(searchQuery);
      renderNews(data.articles);
    } catch (error) {
      console.error("Error fetching news:", error);
      // Optionally handle error display or message to the user
    }
  }
});

const fetchNews = async function (query) {
  try {
    const response = await fetch(
      `https://newsapi.org/v2/everything?q=${query}&apiKey=${process.env.API_KEY}`
    );
    if (!response.ok) {
      throw new Error(`Failed to fetch: ${response.status}`);
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching news:", error);
    throw error; // Re-throw the error to propagate it to the caller
  }
};

const renderNews = function (articles) {
  newsContainer.classList.remove("hidden");
  const newsList = newsContainer.querySelector(".news-list");
  newsList.innerHTML = ""; // Clear previous content

  const numberOfArticlesToBeRendered = 15;
  articles.slice(0, numberOfArticlesToBeRendered).forEach((article) => {
    const html = `<li class="news-item">
      <h2><a href="${article.url}" target="_blank">${article.title}</a></h2>
    </li>`;
    newsList.insertAdjacentHTML("beforeend", html);
  });
};
