import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'
import type { Meal } from '../types/Meal'

function GalleryView() {
  const [meals, setMeals] = useState<Meal[]>([])
  const [category, setCategory] = useState('All')

  useEffect(() => {
    axios
      .get('https://www.themealdb.com/api/json/v1/1/search.php?s=')
      .then((response) => {
        setMeals(response.data.meals || [])
      })
      .catch((error) => {
        console.error('Error fetching meals:', error)
      })
  }, [])

  const categories = [
    'All',
    ...new Set(meals.map((meal) => meal.strCategory))
  ]

  const filteredMeals =
    category === 'All'
      ? meals
      : meals.filter((meal) => meal.strCategory === category)

  return (
    <div className="page">
      <h2>Meal Gallery</h2>


        <div className="controls">
            <label>Filter by Category: </label>

            <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
            >
                {categories.map((item) => (
                    <option key={item} value={item}>
                        {item}
                    </option>
                ))}
            </select>
        </div>

      <div className="gallery">
            {filteredMeals.map((meal) => (
                <div className="gallery-item" key={meal.idMeal}>
                    <Link to={`/meal/${meal.idMeal}`}>
                        <img
                            src={meal.strMealThumb}
                            alt={meal.strMeal}
                            
                        />

                        <h3>{meal.strMeal}</h3>
                    </Link>
                    <p>{meal.strCategory}</p>
                </div>
            ))}
        </div>
    </div>
  )
}

export default GalleryView