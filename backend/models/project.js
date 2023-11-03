"use strict";

const db = require("../db");
const {BadRequestError, NotFoundError} = require("../expressError");
const {sqlForPartialUpdate} = require("../helpers/sql");

/** METHODS FOR PROJECTS */

class Project {
    /** Creates a project (from data), update db, return new project data
     *  Data should include {id, title, description, url}
     *  Throws BadRequestError if project already in database
     */
    static async create ({title, description, url}) {
        const duplicateCheck = await db.query(
                `SELECT title
                 FROM projects
                 WHERE title = $1`,
            [title],
        );
        if (duplicateCheck.rows[0]) throw new BadRequestError(`Duplicate project: ${title}`);
        const result = await db.query(
                `INSERT INTO projects
                 (title, description, url)
                 VALUES ($1, $2. $3)
                 RETURNING id, title, description, url`,
            [
                title, 
                description,
                url
            ],
        );
        const project = result.rows[0];

        return project;
    }

    /** Finds all projects
     *  searchFilters (optional): title
     *  Returns {id, title, description, url}
     */
    static async findAll(searchFilter = {}) {
        let query = `SELECT id,
                            title,
                            description, 
                            url
                     FROM projects`;
        let whereExpressions = [];
        let queryValues = [];

        const {title} = searchFilter;

        // For each search term, add to whereExpressions and queryValues
        // to generate the right SQL

        if (title) {
            queryValues.push(`%${title}%`);
            whereExpressions.push(`title ILIKE $${queryValues.length}`);
        }

        if (whereExpressions.length > 0) {
            query += " WHERE " + whereExpressions.join(" AND ");
        }

        // Finalize query and return results

        query += " ORDER BY title";
        const projectsRes = await db.query(query, queryValues);
        return projectsRes.rows;
    }

    /** Given a project_id, return data about project
     *  Returns {id, title, description, url}
     *  Throws NotFoundError if project not found
     */
    static async get(id) {
        const projectRes = await db.query(
                `SELECT id,
                        title,
                        description,
                        url
                 FROM projects
                 WHERE id = $1`,
            [id],
        );
        const project = projectRes.row[0];
        if (!project) throw new NotFoundError(`No project found: ${id}`);

        return project;
    }

    /** Update project data with `data`
     *  This is a partial update -- it's fine if data doesn't contain all the fields
     *  this only changes the provided ones
     *  Data can include {title, description, url}
     *  Returns {id, title, data, url}
     *  Throws NotFoundError if project not found
     */
    static async update(id, data) {
        const {setCols, values} = sqlForPartialUpdate(data, {});

        const idVarIdx = "$" + (values.length + 1);
        const querySql = `UPDATE projects
                          SET  ${setCols}
                          WHERE id = ${idVarIdx}
                          RETURNING id,
                                    title,
                                    description,
                                    url`
        const result = await db.query(querySql, [...values, id]);
        const project = result.rows[0];

        if (!project) throw new NotFoundError(`No project found: ${id}`);

        return project;
    }

    /** Deletes a given project from database; returns undefined
     *  Throws NotFoundError if project not found
     */
    static async remove(id) {
        const result = await db.query(
                `DELETE
                 FROM projects
                 WHERE id = $1
                 RETURNING id`,
            [id],
        );
        const project = result.rows[0];

        if (!project) throw new NotFoundError(`No project found: ${id}`);
    }
}

module.exports = Project;