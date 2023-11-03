"use strict";

const db = require("../db");
const bcrypt = require("bcrypt");
const {sqlForPartialUpdate} = require("../helpers/sql");
const {
    NotFoundError,
    UnauthorizedError,
    BadRequestError,
} = require("../expressError");

const {BCRYPT_WORK_FACTOR} = require("../config.js");

/** METHODS FOR USERS: authenticate, register, findAll, get, update, remove
 *                     addFavorite, getUserFavorites, removeFavorite
 */

class User {
    /** Authenticate user with username and password
     *  Returns {username, first_name, last_name, email, administrator}
     *  Throws UnauthorizedError if user is not found or if password is invalid
     */
    static async authenticate(username, password) {
        // look for user
        const result = await db.query(
                `SELECT id, 
                        username,
                        password,
                        first_name AS "firstName",
                        last_name AS "lastName",
                        email,
                        administrator
                 FROM users
                 WHERE username = $1`,
            [username],
        );

        const user = result.rows[0];

        if (user) {
            // compare hashed password to a new hash from password
            const isValid = await bcrypt.compare(password, user.password);
            if (isValid === true) {
                delete user.password;
                return user;
            }
        }
        throw new UnauthorizedError("Invalid username or password");
    }

    /** Register user with data 
     *  Returns {id, username, password, firstName, lastName, email, administrator}
     *  Throws BadRequestError on duplicates
    */
    static async register({username, password, firstName, lastName, email, administrator}) {
        const duplicateCheck = await db.query(
                `SELECT username
                 FROM users
                 WHERE username = $1`,
            [username],
        );

        if (duplicateCheck.rows[0]) {
            throw new BadRequestError(`Duplicate username: ${username}`);
        }

        const hashedPassword = await bcrypt.hash(password, BCRYPT_WORK_FACTOR);

        const result = await db.query(
                `INSERT INTO users
                            (username, 
                             password,
                             first_name,
                             last_name,
                             email,
                             administrator)
                 VALUES ($1, $2, $3, $4, $5, $6)
                 RETURNING username, first_name AS "firstName", last_name AS "lastName", email, administrator`,
            [
                username,
                hashedPassword,
                firstName, 
                lastName,
                email,
                administrator,
            ],     
        );

        const user = result.rows[0];
        return user
    }

    /** Find all users
     *  Returns {id, username, first_name, last_name, email, administrator}
     */
    static async findAll() {
        const result = await db.query(
                `SELECT id,
                        username,
                        first_name AS "firstName",
                        last_name AS "lastName",
                        email,
                        administrator
                 FROM users
                 ORDER BY username`,
        );
        return result.rows;
    }

    /** Given a username, return data about that user
     *  Returns {id, username, first_name, last_name, email, administrator}
     */
    static async get(username) {
        const userRes = await db.query(
                `SELECT username,
                        first_name AS "firstName",
                        last_name AS "lastName",
                        email,
                        administrator
                 FROM users
                 WHERE username = $1`,
            [username],
        );

        const user = userRes.rows[0];

        if (!user) throw new NotFoundError(`No user: ${username}`);

        const userCommentsRes = await db.query(
                    `SELECT c.id,
                            c.comment_text,
                            c.username,
                            c.post_id
                     FROM comments AS c
                     WHERE c.username = $1`,
                [username],
        );
        user.comments = userCommentsRes.rows;
        return user;
    }

    /** Updates the user data with 'data'
     *  This is a "partial update" -- it's fine if data doesn't contain all of the fields;
     *  this only changes the provided ones
     *  Data can include {password, firstName, lastName, email, administrator}
     *  Returns {id, username, firstName, lastName, email, administrator}
     *  Throws NotFoundError if not found
     */
    static async update(username, data) {
        if(data.password) {
            data.password = await bcrypt.hash(data.password, BCRYPT_WORK_FACTOR);
        }
        const {setCols, values} = sqlForPartialUpdate(
            data,
            {
                firstName: "first_name",
                lastName: "last_name",
            }
        );
        const usernameVarIdx = "$" + (values.length + 1);

        const querySql = `UPDATE users
                          SET ${setCols}
                          WHERE username = ${usernameVarIdx}
                          RETURNING username,
                                    id, 
                                    first_name AS "firstName",
                                    last_name AS "lastName",
                                    email,
                                    administrator`;
        const result = await db.query(querySql, [...values, username]);
        const user = result.rows[0];

        if (!user) throw new NotFoundError(`No user: ${username}`);

        delete user.password;
        return user;
    }

      /** Delete a given user from database 
       *  Returns undefined 
       *  Throws NotFoundError if user is not found
       */
      static async remove(username) {
        let result = await db.query(
                `DELETE
                 FROM users
                 WHERE username = $1
                 RETURNING username`,
            [username],
        );
        const user = result.rows[0];

        if (!user) throw new NotFoundError(`No user found: ${username}`)
    }

    /** Adds a blog post to user's favorites list 
     *  Throws NotFoundError if user or post cannot be found
     */
    static async addFavorite(username, postId) {
        const preCheck = await db.query(
                `SELECT id
                 FROM blog_posts
                 WHERE id = $1`,
            [postId],
        );
        const post = preCheck.rows[0];
        if (!post) throw new NotFoundError(`No post found: ${postId}`);

        const preCheck2 = await db.query(
                `SELECT username
                 FROM users
                 WHERE usernamd = $1`,
            [username],
        );
        const user = preCheck2.rows[0];
        if(!user) throw new NotFoundError(`No user found: ${username}`);

        await db.query(
                `INSERT INTO favorites (post_id, username)
                 VALUES ($1, $2)`,
            [postId, username],
        );
    }

    /** Gets all favorites associated with a user */
    static async getUserFavorites(username) {
        let res = await db.query(
                `SELECT username,
                        post_id AS "postId"
                 FROM favorites
                 WHERE username = $1`,
            [username],
        );
        const favorites = res.rows;
        return favorites;
    }

    /** Removes a blog post from user's favorites list */
    static async removeFavorite(username, postId) {
        await db.query(
                `DELETE
                 FROM favorites
                 WHERE username = $1
                 AND post_id = $2`,
            [username, postId],
        );
    }
}

module.exports = User;

