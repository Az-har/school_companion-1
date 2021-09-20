import { gql } from "apollo-server-core";

export default gql`
  type School {
    id: ID!
    name: String!
    about: String
    school_logo: String
  }

  input CreateSchoolInput {
    name: String!
    about: String!
    school_logo: String!
  }
`;
