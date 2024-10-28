const Recipe = require('./models/recipeModel');

exports.getAllRecipes = async (req, res) => {
    try {
        const recipes = await Recipe.getAll();
        res.json(recipes);
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch recipes' });
    }
};

exports.getRecipeById = async (req, res) => {
    try {
        const recipe = await Recipe.getById(req.params.id);
        if (!recipe) return res.status(404).json({ error: 'Recipe not found' });
        res.json(recipe);
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch recipe' });
    }
};
exports.createRecipe = async (req, res) => {
    try {
        const newRecipe = await Recipe.create(req.body);
        res.status(201).json(newRecipe);
    } catch (error) {
        res.status(400).json({ error: 'Failed to create recipe' });
    }
};
exports.updateRecipe = async (req, res) => {
    try {
        const updatedRecipe = await Recipe.update(req.params.id, req.body);
        res.json(updatedRecipe);
    } catch (error) {
        res.status(400).json({ error: 'Failed to update recipe' });
    }
};
exports.deleteRecipe = async (req, res) => {
    try {
        await Recipe.delete(req.params.id);
        res.status(204).send();
    } catch (error) {
        res.status(500).json({ error: 'Failed to delete recipe' });
    }
};