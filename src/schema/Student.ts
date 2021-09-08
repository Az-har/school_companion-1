import { gql } from "apollo-server-core";

export default gql`
  type Student {
    id: ID!
    name: String!
    email: String!
    bio_data: JSON
    bio_pic: String
    teachers: [Employee!]
    section: Section
  }
`;
