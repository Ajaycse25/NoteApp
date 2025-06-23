const express = require("express");
const {
  createNote,
  getNotes,
  deleteNote,
  updateNote,
} = require("../Controller/noteController");

const {verifyAccessToken} = require("../Middlewares/verifyAccessToken");

const noteRouter = express.Router();

noteRouter.post("/notes", verifyAccessToken, createNote);
noteRouter.get("/notes", verifyAccessToken, getNotes);
noteRouter.put("/notes/:id", verifyAccessToken, updateNote);
noteRouter.delete("/notes/:id", verifyAccessToken, deleteNote);

module.exports = noteRouter;
