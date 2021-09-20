import { gql } from "apollo-server-core";

export default gql`
  type Department {
    id: ID!
    name: String!
    sections: [Section!]!
  }

  input CreateDepartmentInput {
    name: String!
    createSections: [String!]
  }
`;
