import { Injectable } from '@nestjs/common';
import {CoffeesService} from "../coffees/coffees.service";
import {Event} from "../events/entities/event.entity";
import {Connection} from "typeorm";

@Injectable()
export class CoffeesRatingService {
    constructor(
        private readonly coffeesService: CoffeesService,
        private readonly connection: Connection,
    ) {}

    async recommendCoffee(coffeeId: string) {
        const coffee = await this.coffeesService.findOne(coffeeId);

        const queryRunner = this.connection.createQueryRunner();

        await queryRunner.connect();
        await queryRunner.startTransaction();
        try {
            coffee.recommendations++;

            const recommendEvent = new Event();
            recommendEvent.name = 'recommend_coffee';
            recommendEvent.type = 'coffee';
            recommendEvent.payload = { coffeeId: coffee.id };

            await queryRunner.manager.save(coffee);
            await queryRunner.manager.save(recommendEvent);

            await queryRunner.commitTransaction();
        } catch (err) {
            await queryRunner.rollbackTransaction();
        } finally {
            await queryRunner.release();
        }
    }
}
