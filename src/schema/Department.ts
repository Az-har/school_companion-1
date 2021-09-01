import { gql } from "apollo-server-core";

export default gql`
  type Department {
    id: ID!
    name: String!
    section: [Section!]!
  }
`;
