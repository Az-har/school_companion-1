import { gql } from "apollo-server-core";

export default gql`
  type Mutation {
    # Admin
    signUpAdmin(data: LoginOrSignUpAdminInput!): AdminAuthPayload!
    loginAdmin(data: LoginOrSignUpAdminInput!): AdminAuthPayload!
    createSchool(data: CreateSchoolInput!): School!
    # Teacher, Employee & Admin
    createEmployee(data: CreateEmployeeInput!, schoolId: String!): Employee!
    createEmployees(data: [CreateEmployeeInput!]!, schoolId: String!): Int!
    createDepartment(
      data: CreateDepartmentInput!
      schoolId: String!
    ): Department!

    # Student

    # createStudent(data: CreateStudentInput!): Student!
    # createStudents(data: CreateStudentsInput!): [Student!]!
    # createEmployee(data: CreateEmployeeInput!): Employee!

    # # update
    # updateSchool(data: UpdateSchoolInput!): School!
    # updateStudent(data: UpdateStudentInput!): Student!
    # updateStudents(data: UpdateStudentsInput!): [Student!]!
    # updateEmployee(data: UpdateEmployeeInput!): Employee!
    # updateEmployees(data: UpdateEmployeesInput!): [Employee!]!
    # # delete
    # deleteSchool(data: DeleteSchoolInput!): School!
    # deleteStudent(data: DeleteStudentInput!): Student!
    # deleteStudents(data: DeleteStudentsInput!): [Student!]!
    # deleteEmployee(data: DeleteEmployeeInput!): Employee!
    # deleteEmployees(data: DeleteEmployeesInput!): [Employee!]!
  }
`;
