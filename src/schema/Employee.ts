import { gql } from "apollo-server-core";

export default gql`
  type Employee {
    id: ID!
    name: String!
    email: String!
    bio: JSON!
    bio_pic: String!
    role: String!
    subject: Subject!
    school: School!
    students: [Student!]
    sections: [Section!]
  }
`;
