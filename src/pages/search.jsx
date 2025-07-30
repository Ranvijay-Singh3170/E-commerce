import React, { useEffect, useState } from 'react'
import { useParams, useSearchParams } from 'react-router-dom';
import ProductCard from '../Components/ProductCard';

const SearchPage = () => {
     const [searchParams] = useSearchParams();
  const query = searchParams.get('q') || '';
  const [results, setResults] = useState([]);
  
  
   useEffect(() => {
    if (!query) return;
    fetch(`https://dummyjson.com/products/search?q=${encodeURIComponent(query)}`)
      .then((res) => res.json())
      .then((data) => {
        setResults(data.products || []);
      })
      .catch((err) => console.error('Error fetching search results:', err));
  }, [query]);


  return (
    <div className='grid grid-cols-4 gap-4 rounded-xl mt-10 mx-5'>
        {results.map((result) => (
            <ProductCard key={result.id} product={result} />
        ))}
    </div>
  )
}

export default SearchPage