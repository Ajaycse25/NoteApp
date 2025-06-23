const Note = require("../Models/noteSchema");
const { randomUUID } = require("crypto");

function generateUUID() {
  return randomUUID();
}

console.log(generateUUID());

const createNote = async (req, res) => {
  console.log(req.body);
  const { title, content } = req.body;
  // console.log(req.user)
  const userId = req.user.id;
  if (!title || !content) {
    return res.status(400).json({ message: "Title and content are required" });
  }
  const noteId = generateUUID();
  try {
    const newNote = await Note.create({ title, content, userId, noteId });
    res.status(201).json(newNote);
  } catch (error) {
    console.error("Error creating note:", error);
    res.status(500).json({ message: "Failed to create note" });
  }
};

const getNotes = async (req, res) => {
  console.log("Fetching notes for user:", req.user.id);
  const userId = req.user.id;

  try {
    const notes = await Note.find({ userId });
    res.status(200).json(notes);
  } catch (error) {
    console.error("Error fetching notes:", error);
    res.status(500).json({ message: "Failed to fetch notes" });
  }
};

const updateNote = async (req, res) => {
  const { title, content } = req.body;
  const userId = req.user._id;
  const noteId = req.params.id;

  try {
    const updatedNote = await Note.findOneAndUpdate(
      { _id: noteId, user: userId },
      { title, content },
      { new: true }
    );
    if (!updatedNote) {
      return res.status(404).json({ message: "Note not found" });
    }
    res.status(200).json(updatedNote);
  } catch (error) {
    console.error("Error updating note:", error);
    res.status(500).json({ message: "Failed to update note" });
  }
};

const deleteNote = async (req, res) => {
  console.log("deleting notes for user:", req.user.id);

  const userId = req.user.id;
  // const userId = req.user._id;
  const noteId = req.params.id;
  console.log("Deleting note:", noteId);

  try {
    const deletedNote = await Note.findOneAndDelete({
      noteId,
      userId,
    });
    if (!deletedNote) {
      return res.status(404).json({ message: "Note not found" });
    }
    res.status(204).send();
  } catch (error) {
    console.error("Error deleting note:", error);
    res.status(500).json({ message: "Failed to delete note" });
  }
};

module.exports = {
  createNote,
  getNotes,
  updateNote,
  deleteNote,
};
