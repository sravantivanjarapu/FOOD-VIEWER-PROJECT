const { Pool } = require('pg');
const pool = new Pool({
    connectionString: process.env.DATABASE_URL,
});

const Recipe = {
    getAll: async () => {
        const { rows } = await pool.query('SELECT * FROM recipes');
        return rows;
    },
    getById: async (id) => {
        const { rows } = await pool.query('SELECT * FROM recipes WHERE id = $1', [id]);
        return rows[0];
    },
    create: async (recipe) => {
        const { title, ingredients, instructions, image } = recipe;
        const { rows } = await pool.query(
            'INSERT INTO recipes (title, ingredients, instructions, image) VALUES ($1, $2, $3, $4) RETURNING *',
            [title, ingredients, instructions, image]
        );
        return rows[0];
    },
    update: async (id, recipe) => {
        const { title, ingredients, instructions, image } = recipe;
        const { rows } = await pool.query(
            'UPDATE recipes SET title = $1, ingredients = $2, instructions = $3, image = $4, updated_at = CURRENT_TIMESTAMP WHERE id = $5 RETURNING *',
            [title, ingredients, instructions, image, id]
        );
        return rows[0];
    },
    delete: async (id) => {
        await pool.query('DELETE FROM recipes WHERE id = $1', [id]);
    }
};

module.exports = Recipe;

