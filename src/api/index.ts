import axios from "axios";

const http = axios.create({
  baseURL: "https://api.themoviedb.org/3/",
  params: {
    language: "pt-BR",
    page: 1,
    // sort_by: "vote_average.desc",
    "vote_count.gte": 50,
  },
  headers: {
    Authorization: `Bearer ${import.meta.env.VITE_API_AUTHORIZATION}`,
    "Content-Type": "application/json",
  },
});

export default http;
