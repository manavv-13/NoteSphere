const express = require("express");
const router = express.Router();
const { body, validationResult } = require("express-validator");
const Note = require("../models/Note");
const fetchuser = require("../middlewares/fetchuser");

// Get All notes of the user - Login Required
router.get("/fetchNotes", fetchuser, async (req, res) => {
  let success=false;
  try {
    const note = await Note.find({ user: req.user });
    res.json(note);
  } catch (err) {
    res.status(400).json({ success,msg: "Some Error Occured", error: err.message });
  }
});

//CRUD :-

//Create a note for a user - Login Required
router.post(
  "/addNote",
  [
    body("title").notEmpty().withMessage("Title is required"),
    body("content").notEmpty().withMessage("Content is required"),
  ],
  fetchuser,
  async (req, res) => {
    const user = req.user;
    const errors = validationResult(req);
    let success=false;
    if (!errors.isEmpty()) {
      return res.status(400).json({success, msg: "Invalid Input Fields", errors: errors.array() });
    }
    try {
      const { title, content, tag } = req.body;
      const newNote = new Note({ user, title, content, tag });
      await newNote.save();
      res.json({ success:true,msg:"Note Added", newNote });
    } catch (err) {
      res
        .status(400)
        .json({ success,msg: "Some Error Occured", error: err.message });
    }
  }
);

//Update a note of a user - Login Required
router.put("/updateNote/:id", fetchuser, async (req, res) => {
  const currNote = await Note.findOne({ _id: req.params.id });
  const currUser = req.user;
  let success=false;
  const { title, content, tag } = req.body;

  if (!currNote) {
    return res.status(404).json({ success,msg: "Note doesn't exist!" });
  }
  try {
    if (
      title !== currNote.title ||
      content !== currNote.content ||
      tag !== currNote.tag
    ) {
      if (currUser.toString() !== currNote.user.toString())
        return res.status(401).json({ success, msg: "Access Denied!" });

      const updatedNote = await Note.findOneAndUpdate(
        { _id: req.params.id },
        { $set: { title, content, tag } },
        { new: true, runValidators: true }
      );
      res.json({ success:true,msg:"Note Updated!",updatedNote });
    } else res.json("No Change Detected");
  } catch (err) {
    res.status(400).json({ success,msg: "Some Error Occured", error: err.message });
  }
});

//Delete a note of a user - Login Required
router.delete("/deleteNote/:id", fetchuser, async (req, res) => {
  let success=false;
  try {
    const currNote = await Note.findOne({ _id: req.params.id });
    const currUser = req.user;

    if (!currNote) {
      return res.status(404).json({ success,msg: "Note doesn't exist!" });
    }

    if (currUser.toString() !== currNote.user.toString())
      return res.status(401).json({ success, msg: "Access Denied!" });

    const deletedNote = await Note.findOneAndDelete({ _id: req.params.id });
    res.json({ success:true,msg:"Note Deleted!",deletedNote });
  } catch (err) {
    res.status(400).json({ success,msg: "Some Error Occured", error: err.message });
  }
});
module.exports = router;
