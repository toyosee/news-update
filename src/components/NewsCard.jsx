import React from "react";

const NewsCard = ({ article }) => {
  return (
    <div className="bg-white shadow-md rounded-lg overflow-hidden">
      <img
        src={article.multimedia?.[0]?.url || "https://via.placeholder.com/150"}
        alt={article.title}
        className="w-full h-48 object-cover"
      />
      <div className="p-4">
        <h2 className="text-lg font-bold">{article.title}</h2>
        <p className="text-gray-700 mt-2">{article.abstract}</p>
        <a
          href={article.url}
          target="_blank"
          rel="noopener noreferrer"
          className="block mt-4 text-blue-500 font-medium"
        >
          Read More
        </a>
      </div>
    </div>
  );
};

export default NewsCard;