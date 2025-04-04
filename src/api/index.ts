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
    Authorization: `Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIzNzg0NGMxN2ZlMDJjNTU1MDE4YWQ1OGQ5N2M1NWI0MiIsIm5iZiI6MTc0MTM1NTE1My4xNDUsInN1YiI6IjY3Y2FmODkxZGJhMTQ5MTYwNjJiNWQ3ZCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.VaZ8PakoAmOpnnzUTeWm1Lo0K78HXbq7Fy3i56fU08M`,
    "Content-Type": "application/json",
  },
});

export default http;
