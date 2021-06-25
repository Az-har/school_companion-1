import { gql } from "apollo-server";

export default gql`
  type Student {
    id: ID!
    name: String!
    email: String!
    bioData: String

    class: Class
    teachers: [Employee]
    subjects: [Subject]
  }

  type Employee {
    id: ID!
    name: String!
    email: String!
    bioData: String
    role: Role!

    subject: Subject
    class: [Class]
    students: [Student]
  }

  type Subject {
    id: ID!
    name: String!
    description: String

    students: [Student]
    teachers: [Employee]
  }

  type Class {
    id: ID!
    name: String!
    section: String!

    students: [Student]
    teachers: [Employee]
  }

  enum Role {
    Staff
    Teacher
    Admin
  }
`;
