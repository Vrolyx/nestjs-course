import {
    Body,
    Controller,
    Delete, forwardRef,
    Get, Inject,
    Param,
    Patch,
    Post,
    Query, SetMetadata, UsePipes, ValidationPipe,
} from '@nestjs/common';
import {CoffeesService} from "./coffees.service";
import {Coffee} from "./entities/coffee.entity";
import {CreateCoffeeDto} from "./dto/create-coffee.dto";
import {UpdateCoffeeDto} from "./dto/update-coffee.dto";
import {PaginationQueryDto} from "../common/dto/pagination-query.dto";
import {Public} from "../common/decorators/public.decorator";
import {ParseIntPipe} from "../common/pipes/parse-int.pipe";
import {Protocol} from "../common/decorators/protocol.decorator";
import {ApiForbiddenResponse} from "@nestjs/swagger";
import {CoffeesRatingService} from "../coffee-rating/coffee-rating.service";

@UsePipes(ValidationPipe)
@Controller('coffees')
export class CoffeesController {

    constructor(
        private readonly coffeesService: CoffeesService,
        private readonly coffeeRatingService: CoffeesRatingService) {
    }

    @ApiForbiddenResponse({status:403, description:'Forbidden.'})
    @Public()
    @Get()
    async findAll(
        @Protocol('https') protocol: string,
        @Query() paginationQuery: PaginationQueryDto
    ): Promise<Coffee[]> {
        return await this.coffeesService.findAll(paginationQuery);
    }

    @Get(':id')
    async findOne(@Param('id', ParseIntPipe) id: number): Promise<Coffee> {
        return await this.coffeesService.findOne(id.toString());
    }

    @Post(':id/recommend')
    async recommendCoffee(@Param('id', ParseIntPipe) id: number): Promise<void> {
        return await this.coffeeRatingService.recommendCoffee(id.toString());
    }

    @Post()
    create(@Body() createCoffeeDto: CreateCoffeeDto) {
        return this.coffeesService.create(createCoffeeDto);
    }

    @Patch(':id')
    update(@Param('id') id: string, @Body(ValidationPipe) updateCoffeeDto: UpdateCoffeeDto) {
        return this.coffeesService.update(id, updateCoffeeDto);
    }

    @Delete(':id')
    remove(@Param('id') id: string) {
        return this.coffeesService.remove(id);
    }
}
