"use strict";

const jsonschema = require("jsonschema");
const express = require("express");
const {BadRequestError} = require("../expressError");
const Comment = require("../models/comment");
const commentNewSchema = require("../schemas/commentNewSchema");
const commentUpdateSchema = require("../schemas/commentUpdateSchema");
const commentSearchSchema = require("../schemas/commentSearchSchema");

const router = express.Router({mergeParams:true});

/** ROUTES FOR COMMENTS */

/** POST / {comment} => {comment}
 *  Adds a comment to database 
 *  Comment should be {commentText, username, postId}
 *  Returns {id, commentText, username, postId}
 */
router.post("/", async function (req) {
    try {
        const validator = jsonschema.validate(req.body, commentNewSchema);
        if (!validator.valid) {
            const errs = validator.errors.map(e => e.stack);
            throw new BadRequestError(errs);
        }
        const comment = await Comment.create(req.body);
        return res.status(201).json({comment});
    } catch(err) {
        return next(err);
    }
});

/** GET / => {comments: {id, commentText, username, postId}}
 *  Gets all comments
 */
router.get("/", async function (req, res, next) {
    const q = req.query;
    try {
        const validator = jsonschema.validate(q, commentSearchSchema);
        if (!validator.valid) {
            const errs = validator.errors.map(e => e.stack);
            throw new BadRequestError(errs);
        }
        const comments = await Comment.findAll(q);
        return res.json({comments});
    } catch (err) {
        return next(err);
    }
});

/** GET /[commentId] => {comment}
 *  Gets specific comment by its id
 *  Returns {id, commentText, username, postId}
 */
router.get("/:id", async function (req, res, next) {
    try {
        const comment = await Comment.get(req.params.id);
        return es.json({comment});
    } catch (err) {
        return next(err);
    }
});

/** PATCH /comments/[commentId] {fld} => {comment}
 *  Updates a comment given its id and new data
 *  Data can include: {commentText}
 *  Returns (id, commentText, username, postId)
 */
router.patch("/:id", async function (req, res, next) {
    try {
        const validator = jsonschema.validate(req.body, commentUpdateSchema);
        if (!validator.valid) {
            const errs = validator.errors.map(e => e.stack);
            throw new BadRequestError(errs);
        }
        const comment = await Comment.update(req.params.id, req.body);
        return res.json({review});
    } catch (err) {
        return next(err);
    }
});

/** DELETE /[commentId] => {deleted: id}
 *  Deletes a comment from database given its id
 *  Returns undefined
 */
router.delete("/:id", async function (req, res, next) {
    try {
        await Comment.remove(req.params.id);
        return res.json({deleted: +req.params.id});
    } catch (err) {
        return next(err);
    }
});

module.exports = router;
