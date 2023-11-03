"use strict";

/** Methods for Blog Posts */

const db = require("../db");
const {BadRequestError, NotFoundError} = require("../expressError");
const {sqlForPartialUpdate} = require("../helpers/sql");

class Post {
    /** Creates a blog post (from data), update db, return new post data
     *  Data should include {title, content, username}
     */
    static async create({title, content, username}) {
        const duplicateCheck = await db.query(
                `SELECT title
                 FROM blog_posts
                 WHERE title = $1`,
            [title],
        );
        if (duplicateCheck.rows[0]) throw new BadRequestError(`Duplicate title: ${title}`);

        const result = await db.query(
                `INSERT INTO blog_posts
                            (title, content, username)
                 VALUES ($1, $2, $3)
                 RETURNING id, title content, username`,
            [title, content, username],
        );
        const post = result.rows[0];
        return post;
    }

    /** Finds all posts (optional filter on searchFilters)
     *  SearchFilters(all optional): title, username
     *  Returns {id, title, content, username}
     */
    static async findAll(searchFilters = {}) {
        let query = `SELECT id,
                            title,
                            content,
                            username
                     FROM blog_posts`;
        let whereExpressions = [];
        let queryValues = [];

        const {title, username} = searchFilters;

        // For each possible search term, add to whereExpressions and queryValues so 
        // we can generate the right SQL

        if (title) {
            queryValues.push(`%${title}%`);
            whereExpressions.push(`title ILIKE $${queryValues.length}`);
        }

        if (username) {
            queryValues.push(`%${username}%`);
            whereExpressions.push(`username ILIKE $${queryValues.length}`);
        }

        if (whereExpressions.length > 0) {
            query += " WHERE " + whereExpressions.join(" AND ");
        }

        // Finalise query and return results

        query += " ORDER BY title";
        const postsRes = await db.query(query, queryValues);
        return postsRes.rows;
    }

    /** Given a post id, return data about that post
     *  Returns {id, title, content, username}
     *  Throws NotFoundError if post not found
     */
    static async get(id) {
        const postRes = await db.query(
                `SELECT id,
                        title,
                        content,
                        username
                 FROM blog_posts
                 WHERE id = $1`,
            [id],
        );
        const post = postRes.rows[0];

        if (!post) throw new NotFoundError(`No post found: ${id}`);

        const commentsRes = await db.query(
                `SELECT id, comment_text AS "commentText", username, post_id AS "postId"
                 FROM comments
                 WHERE post_id = $1
                 ORDER BY id`,
            [id],
        );
        post.comments = commentsRes.rows;

        return post;
    }

    /** Update post data with `data`
     *  This is a "partial update" -- it's fine if data doesn't contain all the fields;
     *  this only changes the provided ones
     *  Data can include: {id, title, content, username}
     *  Returns {id, title, content, username}
     *  Throws NotFoundError if post not found
     */
    static async update(id, data) {
        const {setCols, values} = sqlForPartialUpdate(data, {});

        const idVarIdx = "$" + (values.length + 1);
        const querySql = `UPDATE blog_posts
                          SET ${setCols}
                          WHERE id = ${idVarIdx}
                          RETURNING id, 
                                    title, 
                                    content, 
                                    username`
        const result = await db.query(querySql, [...values, id]);
        const post = result.rows[0];

        if (!post) throw new NotFoundError(`No post found: ${id}`);

        return post;
    }

    /** Delete given post from database; returns undefined
     *  Throws NotFoundError if post not found
     */
    static async remove(id) {
        const result = await db.query(
                `DELETE
                 FROM blog_posts
                 WHERE id = $1
                 RETURNING id`,
            [id]
        );
        const post = result.rows[0];

        if (!post) throw new NotFoundError(`No post found: ${id}`);
    }
}

module.exports = Post;