"use strict";

const db = require("../db");
const {NotFoundError} = require("../expressError");
const {sqlForPartialUpdate} = require("../helpers/sql");

/** METHODS FOR COMMENTS */

class Comment {
    /** Creates a comment (from data), update db, return new comment data
     *  Data should include {commentText, username, postId}
     *  Returning {id, commentText, username, postId}
     */
    static async create({commentText, username, postId}) {
        const result = await db.query(
                `INSERT INTO comments
                 (comment_text, username, post_id)
                 VALUES ($1, $2, $3)
                 RETURNING id, comment_text AS "commentText", username, post_id AS "postId"`,
            [
                commentText,
                username,
                postId
            ],
        );
        const comment = result.rows[0];
        return comment;
    }

    /** Finds all comments
     *  Returns {id, commentText, username, postId}
     */
    static async findAll() {
        let query = `SELECT id,
                            comment_text AS "commentText",
                            username,
                            post_id AS "postId"
                     FROM comments`;
        query += " ORDER BY id";
        const commentRes = await db.query(query);
        return commentRes.rows;
    }

    /** Given a comment id, return data about a comment
     *  Returns {id, commentText, username, postId}
     *  Throws NotFoundError if comment is not found
     */
    static async get(id) {
        const commentRes = await db.query(
                `SELECT id,
                        comment_text AS "commentText",
                 FROM comments
                 WHERE id = $1`,
            [id],
        );
        const comment = commentRes.rows[0];

        if (!comment) throw new NotFoundError(`No comment found: ${id}`);

        return comment;
    }

    /** Update commentText with data
     *  Returns {id, commentText, username, postId}
     *  Throws NotFoundError if comment is not found
     */
    static async update(id, data) {
        const {setCols, values} = sqlForPartialUpdate(
            data,
            {
                commentText: "comment_text",
                username: "username",
                postId: "post_id",
            }
        );
        const idVarIdx = "$" + (values.length + 1);
        const querySql = `UPDATE comments
                          SET ${setCols}
                          WHERE id = ${idVarIdx}
                          RETURNING id,
                                    comment_text AS "commentText",
                                    username,
                                    post_id AS "postId"`
        const result = await db.query(querySql, [...values, id]);
        const comment = result.rows[0];

        if(!comment) throw new NotFoundError(`No comment found: ${id}`);

        return comment;
    }

    /** Deletes a given comment from database; returns undefined
     *  Throws NotFoundError if comment is not found
     */
    static async remove(id) {
        const result = await db.query(
                `DELETE 
                 FROM comments
                 WHERE id = $1
                 RETURNING id`,
            [id]
        );
        const comment = result.rows[0];
        if (!comment) throw new NotFoundError(`No comment found: ${id}`);
    }
}

module.exports = Comment;