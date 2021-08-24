import {CoffeesService} from "./coffees.service";
import {Args, Mutation, Query, Resolver} from "@nestjs/graphql";
import {CoffeeModel} from "./models/coffee.model";
import {CreateCoffeeInput} from "./inputs/create-coffee.input";
import {CreateCoffeeDto} from "./dto/create-coffee.dto";
import {CoffeesRatingService} from "../coffee-rating/coffee-rating.service";
import {UpdateCoffeeInput} from "./inputs/update-coffee.input";
import {UpdateCoffeeDto} from "./dto/update-coffee.dto";

@Resolver()
export class CoffeesResolver {

    constructor(
        private readonly coffeesService: CoffeesService,
        private readonly coffeesRatingService: CoffeesRatingService,
    ) {
    }

    @Query(() => CoffeeModel)
    async coffee(@Args('id', { type: () => String }) id: string): Promise<CoffeeModel> {
        const coffee = await this.coffeesService.findOne(id);

        return coffee as CoffeeModel;
    }

    @Mutation(() => CoffeeModel)
    async createCoffee(@Args('createCoffeeInput') createCoffeeInput: CreateCoffeeInput): Promise<CoffeeModel> {
        return this.coffeesService.create(createCoffeeInput as CreateCoffeeDto);
    }

    @Mutation(() => CoffeeModel)
    async updateCoffee(
        @Args('coffeeId') coffeeId: string,
        @Args('updateCoffeeInput') updateCoffeeInput: UpdateCoffeeInput,
    ): Promise<CoffeeModel> {
        await this.coffeesService.update(coffeeId, (updateCoffeeInput as UpdateCoffeeDto));
        return this.coffeesService.findOne(coffeeId);
    }

    @Mutation(() => CoffeeModel)
    async recommendCoffee(@Args('coffeeId') coffeeId: string): Promise<CoffeeModel> {
        await this.coffeesRatingService.recommendCoffee(coffeeId);

        return this.coffeesService.findOne(coffeeId);
    }
}