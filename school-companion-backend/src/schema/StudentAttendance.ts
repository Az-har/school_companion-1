import { gql } from "apollo-server-core";

export default gql`
 type StudentAttendance {
     id: ID!
     student: Student!
 }
`;