import Admin from "./Admin";
import Employee from "./Employee";
import School from "./School";
import Query from "./Query";
import Mutation from "./Mutation";
import Student from "./Student";
import Subject from "./Subject";
import Department from "./Department";
import Section from "./Section";
import  StudentAttendance  from "./StudentAttendance";
import  ExamMarks  from "./ExamMarks";
import Exam  from "./Exam";
import { gql } from "apollo-server-core";

const scalars = [
  gql`
    scalar JSON
  `,
];

export default [
  ...scalars,
  Admin,
  Employee,
  School,
  Query,
  Mutation,
  Student,
  Subject,
  Section,
  Department,
  ExamMarks,
  Exam,
  StudentAttendance
];
