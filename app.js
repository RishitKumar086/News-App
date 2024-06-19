"use strict";
import { API_KEY } from "./config.js";

const newsForm = document.querySelector(".news-form");
const newsContainer = document.querySelector(".news-container");

newsForm.addEventListener("submit", async (e) => {
  e.preventDefault();
  // console.log(e.target[0].value);
  const searchQuery = e.target[0].value;
  const data = await fetchNews(searchQuery);
  // console.log(data.articles);
  renderNews(data.articles);
  return;
});

const fetchNews = async function () {
  const request = await fetch(
    `https://newsapi.org/v2/everything?q=trading&apiKey=${API_KEY}`
  );
  // console.log(request);
  const data = await request.json();
  return data;
};

const renderNews = function (data) {
  newsContainer.classList.remove("hidden");
  const newsList = newsContainer.querySelector(".news-list");
  const numberOfArticlesToBeRendered = 15;
  data.slice(0, numberOfArticlesToBeRendered).forEach((element) => {
    const html = `<li class="news-item"><p>Author:${element.author}</p>
    <h2><a href="${element.url}" target="_blank">${element.title}</a></h2>
    </li>`;
    newsList.insertAdjacentHTML("beforeend", html);
  });
};
