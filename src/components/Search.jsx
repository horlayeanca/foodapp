import React, { useEffect } from "react";
import { useState } from "react";
import styles from "./search.module.css";

const URL = "https://api.spoonacular.com/recipes/complexSearch";
const API_KEY = "2973335d6bad40caaf4875ac8721e8dc";
export default function Search({ foodData, setFoodData }) {
  // This is a simple search component that allows users to search for food items.
  const [query, setQuery] = useState("pizza");
  useEffect(() => {
    async function fetchFood() {
      const res = await fetch(`${URL}?apiKey=${API_KEY}&query=${query}`);
      const data = await res.json();
      setFoodData(data.results);
      // The fetched data is set to the foodData state using setFoodData.
    }
    fetchFood();
  }, [query]);
  return (
    <div className={styles.searchContainer}>
      <input
        className={styles.input}
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        type="text"
        placeholder="Search for food..."
      />
    </div>
  );
}
