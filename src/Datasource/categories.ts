import Database from './db';

const db = Database.getInstance().getDB();

export default {
    tagToCategory: async (id: any) => {
        const query = "SELECT * FROM categories WHERE id = $1";
        const values = [id];

        const category = await db.query(query, values);
        return category.rows[0].name;
    },

    categoryToTag: async (name: string) => {
        const query = "SELECT * FROM categories WHERE name = $1";
        const values = [name];

        const category = await db.query(query, values);
        return category.rows[0].id;
    }
}