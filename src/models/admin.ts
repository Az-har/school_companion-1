import { Field, ObjectType } from "type-graphql";
import { Admin } from "@generated/type-graphql";

@ObjectType()
class AdminAuthPayload {
  @Field()
  token: String;
  @Field()
  admin: Admin;
}

export { AdminAuthPayload };
