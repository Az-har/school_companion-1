import { gql } from "apollo-server-core";

export default gql`
  type Employee {
    id: ID!
    name: String!
    email: String!
    bioData: JSON
    bicPic: String
    role: String!
    subject: Subject!
    school: School!
    students: [Student!]
    sections: [Section!]
  }

  input CreateEmployeeInput {
    name: String!
    email: String!
    bio_data: JSON
    bio_pic: String
    role: EmployeeRole!
  }

  enum EmployeeRole {
    EMPLOYEE
    TEACHER
  }
`;
