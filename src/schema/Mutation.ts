import { gql } from "apollo-server-core";

export default gql`
  type Mutation {
    signUpAdmin(input: LoginOrSignUpAdminInput!): AdminAuthPayload!
    loginAdmin(input: LoginOrSignUpAdminInput!): AdminAuthPayload!
  }
`;
