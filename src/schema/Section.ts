import { gql } from "apollo-server-core";

export default gql`
  type Section {
    id: ID!
    name: String!
    department: Department!
  }

  input CreateSectionInput {
    name: String!
    departmentId: String!
  }
`;
