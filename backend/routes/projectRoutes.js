"use strict";

/** ROUTES FOR PROJECTS */

const jsonschema = require("jsonschema");
const express = require("express");
const {BadRequestError} = require("../expressError");
const Project = require("../models/project");
const projectNewSchema = require("../schemas/projectNewSchema.json");
const projectUpdateSchema = require("../schemas/projectUpdateSchema.json");
const projectSearchSchema = require("../schemas/projectSearchSchema.json");

const router = express.Router({mergeParams: true});

/** POST / {project} => {project}
 *  Adds a project to database
 *  Project should be {title, description, url}
 *  Returns {id,title, description, url}
 */
router.post ("/", async function (req, res, next) {
    try {
        const validator = jsonschema.validate(req.body, projectNewSchema);
        if (!validator.valid) {
            const errs = validator.errors.map(e => e.stack);
            throw new BadRequestError(errs);
        }
        const project = await Project.create(req.body);
        return res.status(201).json({project});
    } catch (err) {
        return next(err);
    }
});

/** GET / => {projects: {id, title, description, url}}
 *  Gets all projects or search results
 *  Can provide search filter in query: title
 */
router.get("/", async function (req, res, next) {
    const q = req.query;
    try {
        const validator = jsonschema.validate(q, projectSearchSchema);
        if (!validator.valid) {
            const errs = validator.errors.map(e => e.stack);
            throw new BadRequestError(errs);
        }
        const projects = await Project.findAll(q);
        return res.json({projects});
    } catch (err) {
        return next(err);
    }
});

/** GET /[projectId] => {project}
 *  Gets specific project by its id
 *  Returns {id, title, description, url}
 */
router.get("/:id", async function (req, res, next) {
    try {
        const project = await Project.get(req.params.id);
        return res.json({project});
    } catch (err) {
        return next(err);
    }
});

/** PATCH /[projectId] {fld1, fld2} => {project}
 *  Update a project given its id and new data
 *  Data can include {title, description, url}
 *  Returns {id, title, description, url}
 */
router.patch("/:id", async function (req, res, next) {
    try {
        const validator = jsonschema.validate(req.body, projectUpdateSchema);
        if (!validator.valid) {
            const errs = validator.errors.map(e => e.stack);
            throw new BadRequestError(errs);
        }
        const project = await Project.update(req.params.id, req.body);
        return res.json({project});
    } catch (err) {
        return next(err);
    }
});

/** DELETE /[projectId] => {deleted: id}
 *  Deletes a project from database given its id
 *  Returns undefined
 */
router.delete("/:id", async function (req, res, next) {
    try {
        await Project.remove(req.params.id);
        return res.json({deleted: +req.params.id});
    } catch (err) {
        return next(err);
    }
});

module.exports = router;