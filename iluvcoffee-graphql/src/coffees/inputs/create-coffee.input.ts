import {Field, InputType} from "@nestjs/graphql";

@InputType()
export class CreateCoffeeInput {
    @Field()
    readonly title: string;

    @Field()
    readonly brand: string;

    @Field({ nullable: true})
    readonly recommendations?: string;

    @Field(() => [String])
    readonly flavors: string[];
}
