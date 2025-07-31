import React, { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import ProductCard from '../Components/ProductCard';

const SearchPage = () => {
  const [searchParams] = useSearchParams();
  const query = searchParams.get('q') || '';
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!query) return;
    setLoading(true);
    fetch(`https://dummyjson.com/products/search?q=${encodeURIComponent(query)}`)
      .then((res) => res.json())
      .then((data) => {
        setResults(data.products || []);
        setLoading(false);
      })
      .catch((err) => {
        console.error('Error fetching search results:', err);
        setLoading(false);
      });
  }, [query]);

  return (
    <div className="px-4 py-6">
      <h2 className="text-xl font-semibold mb-4">
        Search results for: <span className="text-blue-600">"{query}"</span>
      </h2>

      {loading ? (
        <p className="text-center text-gray-600">Loading...</p>
      ) : results.length === 0 ? (
        <p className="text-center text-red-500">No products found.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {results.map((result) => (
            <ProductCard key={result.id} product={result} />
          ))}
        </div>
      )}
    </div>
  );
};

export default SearchPage;
