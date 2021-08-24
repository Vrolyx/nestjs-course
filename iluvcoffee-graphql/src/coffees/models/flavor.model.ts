import {Field, Int, ObjectType} from "@nestjs/graphql";
import {CoffeeModel} from "./coffee.model";


@ObjectType()
export class FlavorModel {
    @Field(type => Int)
    id: number;

    @Field({nullable: true})
    name: string;

    @Field(type => [CoffeeModel])
    coffees: CoffeeModel[];
}