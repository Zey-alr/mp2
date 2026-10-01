import { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import axios from 'axios'
import type { Meal } from '../types/Meal'

function DetailView() {
  const { id } = useParams()
  const navigate = useNavigate()
  const [meals, setMeals] = useState<Meal[]>([])
  const [meal, setMeal] = useState<Meal | null>(null)

  useEffect(() => {
    axios
      .get(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`)
      .then((response) => {
        setMeal(response.data.meals?.[0] || null)
      })
      .catch((error) => {
        console.error('Error fetching meal:', error)
      })
  }, [id])

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

  if (!meal) {
        return <p>Loading meal...</p>
    }

  const currentIndex = meals.findIndex(
        (item) => item.idMeal === meal.idMeal
    )

    const goToPrevious = () => {
        if (currentIndex > 0) {
            const previousMeal = meals[currentIndex - 1]
            navigate(`/meal/${previousMeal.idMeal}`)
        }
    }

    const goToNext = () => {
        if (currentIndex < meals.length - 1) {
            const nextMeal = meals[currentIndex + 1]
            navigate(`/meal/${nextMeal.idMeal}`)
        }
    }

  const ingredients = []

    for (let i = 1; i <= 20; i++) {
        const ingredient = meal[`strIngredient${i}`]
        const measure = meal[`strMeasure${i}`]

        if (ingredient && ingredient.trim() !== '') {
            ingredients.push({
                ingredient: ingredient,
                measure: measure || ''
            })
        }
    }

  return (
        <div className="page">
            <div className="detail-card">
                <div className="detail-top">
                    <img
                        className="detail-image"
                        src={meal.strMealThumb}
                        alt={meal.strMeal}
                    />

                    <div className="detail-info">
                        <h2>{meal.strMeal}</h2>

                        <p>
                            <strong>Category:</strong> {meal.strCategory}
                        </p>

                        <p>
                            <strong>Area:</strong> {meal.strArea}
                        </p>

                        <h3>Ingredients</h3>

                        <ul>
                            {ingredients.map((item, index) => (
                                <li key={index}>
                                    {item.measure} {item.ingredient}
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>

                <div className="instructions">
                    <h3>Instructions</h3>
                    <p>{meal.strInstructions}</p>
                </div>

                <div className="detail-buttons">
                    <button
                        onClick={goToPrevious}
                        disabled={currentIndex <= 0}
                    >
                        ← Previous
                    </button>

                    <button
                        onClick={goToNext}
                        disabled={
                            currentIndex === -1 ||
                            currentIndex >= meals.length - 1
                        }
                    >
                        Next →
                    </button>
                </div>
            </div>
        </div>
    )
}

export default DetailView