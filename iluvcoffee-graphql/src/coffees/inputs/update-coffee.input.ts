import {CreateCoffeeInput} from "./create-coffee.input";
import {InputType, PartialType} from "@nestjs/graphql";

@InputType()
export class UpdateCoffeeInput extends PartialType(CreateCoffeeInput) { }
