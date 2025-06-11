import { useState, useEffect } from "react";
import "./App.css";
// import Globe from "react-globe.gl"
import NewsDisplay from "./components/NewsDisplay";

// Define the categories for news selection - a list of strings
const categories = [
  "All", "Science", "World", "Politics", "Technology", "Health",
  "Arts", "Automobiles", "Books", "Business", "Fashion", "Food",
  "Insider", "Magazine", "Movies", "National", "Obituaries",
  "Opinion", "Sports", "Theater", "Travel", "Upshot"
];

// Function to toggle dark mode based on localStorage
const toggleMode = () => {
    return localStorage.getItem("theme") === "dark";
  }

function App() {
  const [news, setNews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [searchTerm, setSearchTerm] = useState("");
  const [darkMode, setDarkMode] = useState(toggleMode());



  const API_KEY = import.meta.env.VITE_NYT_API_KEY;
  const BASE_URL = import.meta.env.VITE_NYT_BASE_URL || "https://api.nytimes.com/svc/topstories/v2";

  const fetchNews = async (category) => {
    setLoading(true);
    setError(null);
    try {
      const endpoint = category === "All" ? "home" : category.toLowerCase();
      const API_URL = `${BASE_URL}/${endpoint}.json?api-key=${API_KEY}`;

      const response = await fetch(API_URL);
      if (!response.ok) throw new Error(`HTTP Error: ${response.status}`);

      const data = await response.json();
      setNews(data.results || []);
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchNews(selectedCategory);
  }, [selectedCategory]);

    // Remember theme in localStorage
  useEffect(() => {
    localStorage.setItem("theme", darkMode ? "dark" : "light");
  }, [darkMode]);

  // Filter news based on search term
  const filteredNews = news.filter(article =>
    article.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    article.abstract.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className={`flex flex-col min-h-screen ${darkMode ? "bg-gray-900 text-white" : "bg-gray-100 text-black"}`}>
      <header className={`header ${darkMode ? "bg-gray-800" : "bg-blue-600"} text-white text-center py-5 shadow-lg flex justify-between items-center px-6 sticky top-0 z-50`}>
        <h1 className="text-4xl font-bold">🌎 World Trending News</h1>
        {/* Dark Mode Toggle Button */}
        <button
          onClick={() => setDarkMode(!darkMode)}
          className={`mt-3 px-4 py-2 rounded-full text-sm font-medium transition-all ${
            darkMode ? "bg-gray-500 hover:bg-gray-400" : "bg-gray-700 hover:bg-gray-900"
          }`}
        >
          {darkMode ? "Light Mode" : "Dark Mode"}
        </button>
      </header>

      {/* 🔍 Search Box */}
      <div className="flex justify-center mt-6">
        <input
          type="text"
          placeholder="Search for news..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="px-4 py-2 w-3/4 md:w-1/2 bg-gray-800 text-white border border-blue-500 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      {/* 🏷️ Category Selection Badges */}
      <div className="flex justify-center flex-wrap gap-3 mt-6">
        {categories.sort().map((category) => (
          <button
            key={category}
            onClick={() => setSelectedCategory(category)}
            className={`px-4 py-2 rounded-full font-medium transition-all ${
              selectedCategory === category ? "bg-blue-700 text-white shadow-md scale-105" : "bg-gray-700 hover:bg-gray-600 text-gray-300"
            }`}
          >
            {category}
          </button>
        ))}
      </div>

      <main className="flex-grow">
        {loading ? (
          <p className={`text-center animate-pulse mt-8 ${darkMode ? "text-white" : "text-gray-700"}`}>
            ⏳ Loading news...
          </p>
        ) : error ? (
          <p className="text-center text-red-400 mt-8">{error}</p>
        ) : (
          <NewsDisplay news={filteredNews} />
        )}
        <button
          onClick={() => fetchNews(selectedCategory)}
          className="block mx-auto mt-6 mb-6 px-6 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-700 transition-all shadow-lg"
        >
          🔄 Refresh News
        </button>
      </main>

      <footer className={`bg-gray-800 text-center p-4 mt-auto ${darkMode ? "text-white" : "text-gray-300"}`}>
        <p>Powered by New York Times API</p>
        <p>© {new Date().getFullYear()} World News | Developed by Elijah Abolaji</p>
        <p>📧 Contact: tyabolaji@gmail.com</p>
      </footer>
    </div>
  );
}

export default App;