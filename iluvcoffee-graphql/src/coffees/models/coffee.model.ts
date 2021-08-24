import {Field, Int, ObjectType} from "@nestjs/graphql";
import {FlavorModel} from "./flavor.model";

@ObjectType()
export class CoffeeModel {
    @Field(Type => Int)
    id: number;

    @Field({nullable: true})
    title: string;

    @Field({nullable: true})
    description: string;

    @Field({nullable: true})
    brand: string;

    @Field({nullable: true})
    recommendations: number;

    @Field(type => [FlavorModel])
    flavors: FlavorModel[];
}