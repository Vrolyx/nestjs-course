import {forwardRef, Module} from '@nestjs/common';
import { CoffeesRatingService } from './coffee-rating.service';
import {CoffeesModule} from "../coffees/coffees.module";
import {DatabaseModule} from "../database/database.module";

@Module({
      imports: [
          DatabaseModule.register({
              type: 'postgres',
              host: 'localhost',
              username: 'postgres',
              password: 'pass123',
              port: 5432,
          }),
          forwardRef(() => CoffeesModule) // Avoid circulair dependencies
    ],
    providers: [CoffeesRatingService],
    exports: [CoffeesRatingService]
})
export class CoffeeRatingModule {}
