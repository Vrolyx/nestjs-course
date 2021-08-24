import {forwardRef, Module, Scope} from '@nestjs/common';
import {CoffeesController} from "./coffees.controller";
import {CoffeesService} from "./coffees.service";
import {TypeOrmModule} from "@nestjs/typeorm";
import {Coffee} from "./entities/coffee.entity";
import {Flavor} from "./entities/flavor.entity";
import {Event} from "../events/entities/event.entity"
import {COFFEE_BRANDS} from "./coffees.constants";
import {Connection} from "typeorm";
import {ConfigModule} from "@nestjs/config";
import coffeesConfig from './config/coffees.config';
import {CoffeeRatingModule} from "../coffee-rating/coffee-rating.module";

@Module({
    imports: [
        TypeOrmModule.forFeature([
        Coffee,
        Flavor,
        Event]),
        ConfigModule.forFeature(coffeesConfig),
        CoffeeRatingModule
    ],
    controllers: [CoffeesController],
    providers: [
        CoffeesService,
        {
            provide: COFFEE_BRANDS,
            useFactory: async (connection: Connection): Promise<string[]> => {
                return await Promise.resolve(['buddy brew', 'nescafe']);
            },
            scope: Scope.TRANSIENT
        }
    ],
    exports: [CoffeesService],
})
export class CoffeesModule {}
