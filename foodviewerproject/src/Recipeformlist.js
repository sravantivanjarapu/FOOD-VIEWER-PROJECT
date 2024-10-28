import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const RecipeList = () => {
    const [recipes, setRecipes] = useState([]);
    const [search, setSearch] = useState('');

    useEffect(() => {
        const fetchRecipes = async () => {
            const { data } = await axios.get('http://localhost:5000/recipes');
            setRecipes(data);
        };
        fetchRecipes();
    }, []);

    const filteredRecipes = recipes.filter(recipe =>
        recipe.title.toLowerCase().includes(search.toLowerCase()) ||
        recipe.ingredients.some(ingredient => ingredient.toLowerCase().includes(search.toLowerCase()))
    );

    return (
        <div>
            <h1>Recipe List</h1>
            <input
                type="text"
                placeholder="Search..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
            />
            <ul>
                {filteredRecipes.map(recipe => (
                    <li key={recipe.id}>
                        <Link to={`/recipes/${recipe.id}`}>{recipe.title}</Link>
                    </li>
                ))}
            </ul>
            <Link to="/recipes/new">Add New Recipe</Link>
        </div>
    );
};

export default RecipeList;
