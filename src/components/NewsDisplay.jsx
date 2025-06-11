import React from "react";

const DEFAULT_IMAGE = "https://via.placeholder.com/300x200?text=No+Image+Available";

const NewsDisplay = ({ news }) => {
  if (!news || news.length === 0) {
    return <p className="text-center text-gray-400 text-lg mt-6">No news available.</p>;
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 p-6">
      {news.map((article, index) => {
        const isDisabled = !article.url || article.url.trim() === "" || article.url === "null";

        return (
          <div
            key={index}
            className={`relative bg-white shadow-xl rounded-lg overflow-hidden transform transition duration-300 border border-gray-200 
            ${isDisabled ? "opacity-50 grayscale pointer-events-none" : "hover:scale-105 hover:shadow-2xl"}`}
          >
            <img
              src={article.multimedia?.[0]?.url || DEFAULT_IMAGE}
              alt={article.title || "No image available"}
              className="w-full h-48 object-cover"
            />
            <div className="p-5">
              <h2 className="text-xl font-bold text-gray-900">{article.title}</h2>
              <p className="text-gray-700 mt-3">{article.abstract}</p>

              {isDisabled ? (
                <p className="text-gray-500 mt-4 italic">No URL available for this article</p>
              ) : (
                <a
                  href={article.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block mt-4 text-blue-600 font-medium hover:underline transition-all"
                >
                  Read More →
                </a>
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default NewsDisplay;