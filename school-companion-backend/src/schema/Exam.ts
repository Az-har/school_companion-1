import { gql } from "apollo-server-core";

export default gql`
  type Exam {
      id: ID!
      name: String!
      subjects: [Subject!]!
      students: [Student!]!
  }
`;