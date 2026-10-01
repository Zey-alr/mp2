import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'
import type { Meal } from '../types/Meal'

function ListView() {
  const [meals, setMeals] = useState<Meal[]>([])
  const [search, setSearch] = useState('')
  const [sortBy, setSortBy] = useState('name')
  const [order, setOrder] = useState('asc')

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

  const filteredMeals = meals.filter((meal) =>
        meal.strMeal.toLowerCase().includes(search.toLowerCase())
    )

    const sortedMeals = [...filteredMeals].sort((a, b) => {
        let valueA
        let valueB

        if (sortBy === 'name') {
            valueA = a.strMeal
            valueB = b.strMeal
        } else {
            valueA = a.strCategory
            valueB = b.strCategory
        }

        if (order === 'asc') {
            return valueA.localeCompare(valueB)
        } else {
            return valueB.localeCompare(valueA)
        }
    })

  return (
    <div className="page">
      <h2>Meal List</h2>
      <div className="controls">
            <input
                type="text"
                placeholder="Search meals..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
            />

            <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
            >
                <option value="name">Name</option>
                <option value="category">Category</option>
            </select>

            <select
                value={order}
                onChange={(e) => setOrder(e.target.value)}
            >
                <option value="asc">Ascending</option>
                <option value="desc">Descending</option>
            </select>
        </div>


        <div className="meal-list">
            {sortedMeals.map((meal) => (
                <div key={meal.idMeal}>
                    <Link to={`/meal/${meal.idMeal}`}>
                        <h3>{meal.strMeal}</h3>
                    </Link>

                    <p>Category: {meal.strCategory}</p>
                    <p>Area: {meal.strArea}</p>
                </div>
            ))}
        </div>
    </div>
  )
}

export default ListView