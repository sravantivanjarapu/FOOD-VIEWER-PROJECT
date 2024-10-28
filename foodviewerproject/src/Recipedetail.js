import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams, Link } from 'react-router-dom';

const RecipeDetail = () => {
    const { id } = useParams();
    const [recipe, setRecipe] = useState(null);

    useEffect(() => {
        const fetchRecipe = async () => {
            const { data } = await axios.get(`http://localhost:5000/recipes/${id}`);
            setRecipe(data);
        };
        fetchRecipe();
    }, [id]);

    const handleDelete = async () => {
        await axios.delete(`http://localhost:5000/recipes/${id}`);
        window.location.href = '/';
    };

    return (
        <div>
            {recipe && (
                <>
                    <h1>{recipe.title}</h1>
                    <img src={recipe.image} alt={recipe.title} />
                    <h2>Ingredients</h2>
                    <ul>
                        {recipe.ingredients.map((ingredient, index) => (
                            <li key={index}>{ingredient}</li>
                        ))}
                    </ul>
                    <h2>Instructions</h2>
                    <p>{recipe.instructions}</p>
                    <Link to={`/recipes/${id}/edit`}>Edit Recipe</Link>
                    <button onClick={handleDelete}>Delete Recipe</button>
                </>
            )}
        </div>
    );
};

export default RecipeDetail;
