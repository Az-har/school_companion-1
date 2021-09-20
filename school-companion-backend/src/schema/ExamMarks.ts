import { gql } from "apollo-server-core";

export default gql`
  type ExamMarks {
    id: ID!
    exam: Exam!
    student: Student!
    teacher: Employee!
    subject: Subject!
  }
`;
