import React, { useEffect } from "react";
import { useState } from "react";
import styles from "./foodDetails.module.css";
import ItemList from "./ItemList";

export default function FoodDetails({ foodId }) {
  const [food, setFood] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const URL = `https://api.spoonacular.com/recipes/${foodId}/information`;
  const API_KEY = "2973335d6bad40caaf4875ac8721e8dc";

  useEffect(() => {
    async function fetchFood() {
      const res = await fetch(`${URL}?apiKey=${API_KEY}`);
      const data = await res.json();
      // console.log(data);
      setFood(data);
      setIsLoading(false);
      // The fetched food data is set to the food state using setFood.
    }

    fetchFood();
  }, [foodId]);

  const price = food.pricePerServing
    ? (food.pricePerServing / 100).toFixed(2)
    : "N/A";

  return (
    <div>
      <div className={styles.recipeCard}>
        <h1 className={styles.recipeName}>{food.title}</h1>
        <img className={styles.recipeImage} src={food.image} alt="" />
        <div className={styles.recipeDetails}>
          <span>
            <strong>⌚{food.readyInMinutes}Minutes</strong>
          </span>
          <span>
            <strong>👪 Serves {food.servings} </strong>
          </span>
          <span>
            <strong>
              {food.vegetarian ? "🥕 vegetatrian" : "🍖 non-vegetarian"}
            </strong>
          </span>
          <span>
            <strong>{food.vagan ? "🐮 Vagan" : ""}</strong>
          </span>
        </div>
        <div>
          💲
          <span>
            <strong>{price} Per serving </strong>
          </span>
        </div>

        <h2>Ingredients</h2>
        <ItemList isLoading={isLoading} food={food} />
        <h2>Instructions</h2>
        <div className={styles.recipeInstructions}>
          <ol>
            {isLoading ? (
              <p>Loading...</p>
            ) : (
              food.analyzedInstructions[0].steps.map((step) => (
                <li key={step.number}>{step.step}</li>
              ))
            )}
          </ol>
        </div>
      </div>
    </div>
  );
}
