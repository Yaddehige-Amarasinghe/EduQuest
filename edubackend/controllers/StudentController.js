const express = require("express");
const Student = require("../models/StudentModel");

const router = express.Router();

router.post("/add", async (req, res) => {
  try {
    const { name, email, age, course } = req.body;
    const existingStudent = await Student.findOne({ email });
    if (existingStudent) return res.status(400).json({ message: "Student already exists" });

    const newStudent = new Student({ name, email, age, course });
    await newStudent.save();

    res.status(201).json({ message: "Student added successfully", student: newStudent });
  } catch (err) {
    res.status(500).json({ message: "Error adding student", error: err.message });
  }
});

router.get("/profile/:id", async (req, res) => {
  try {
    const student = await Student.findById(req.params.id).select("-password");
    if (!student) return res.status(404).json({ message: "Student not found" });

    res.status(200).json(student);
  } catch (err) {
    res.status(500).json({ message: "Error fetching student profile", error: err.message });
  }
});

module.exports = router;
