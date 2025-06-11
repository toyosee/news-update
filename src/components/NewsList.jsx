import React from "react";
import NewsCard from "./NewsCard";

const NewsList = ({ news }) => {
  if (!news || news.length === 0) {
    return <p className="text-center text-gray-500">No news available.</p>;
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 p-4">
      {news.map((article, index) => (
        <NewsCard key={index} article={article} />
      ))}
    </div>
  );
};

export default NewsList;