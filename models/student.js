/**
 * Students model,
 * provides a data structure for mongoose to import data into MongoDB database.
 * @module model/student
 */

const mongoose = require("mongoose");

/**
 * The attendence schema, defines the overall information of
 * the attendence of the module. (part of module detail schema)
 */
const attendenceSchema = mongoose.Schema({
  lecture: String,
  presence: Boolean,
});

/**
 * The submission schema, defines the information of a submission. (part of module detail schema)
 */
const submissionSchema = mongoose.Schema({
  name: String,
  deadline: Date,
  submissionDate: Date,
});

/**
 * The forum posting schema, defines the information of a forum posting. (part of module detail schema)
 */
const forumPostingSchema = mongoose.Schema({
  title: String,
  body: String,
});

/**
 * The module detail schema, defines the details of a module. (part of module schema)
 */
const moduleDetailsSchema = mongoose.Schema({
  examGrade: Number,
  courseworkGrade: Number,
  attendence: [attendenceSchema],
  submissions: [submissionSchema],
  forumPostings: [forumPostingSchema],
});

/**
 * The module schema, defines the information of a module. (part of year schema)
 */
const moduleSchema = mongoose.Schema({
  code: String,
  name: String,
  moduleOverallGrade: Number,
  details: moduleDetailsSchema,
});

/**
 * The year schema, defines the information of a year. (part of student schema)
 */
const resultSchema = mongoose.Schema({
  year: {
    type: String,
    required: true,
  },
  grade: {
    type: Number,
    required: true,
  },
  modules: [moduleSchema],
});

/**
 * The student schema, defines the information of the student.
 */
const studentSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: true,
    maxlength: 50,
  },
  lastName: {
    type: String,
    required: true,
    maxlength: 50,
  },
  email: {
    type: String,
    required: true,
    minlength: 5,
    maxlength: 255,
    unique: true,
  },
  studentId: {
    type: String,
    required: true,
    minlength: 1,
    maxlength: 100,
    unique: true,
  },
  overallGrade: {
    type: Number,
    required: true,
    min: 0,
    max: 100,
  },
  imageUrl: {
    type: String,
  },
  thumbnailUrl: {
    type: String,
  },
  results: [resultSchema],
});

/**
 * The mongoose student model
 */
const Student = mongoose.model("Student", studentSchema);

exports.Student = Student;
