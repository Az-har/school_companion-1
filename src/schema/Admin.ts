import { gql } from "apollo-server-core";

export default gql`
  type Admin {
    id: ID!
    email: String!
    school: School!
    verified: Boolean!
  }

  input LoginOrSignUpAdminInput {
    email: String!
    password: String!
  }

  type AdminAuthPayload {
    token: String!
    user: Admin!
  }
`;
