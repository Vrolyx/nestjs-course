import {Inject, Injectable, NotFoundException, Scope} from '@nestjs/common';
import {Coffee} from "./entities/coffee.entity";
import {InjectRepository} from "@nestjs/typeorm";
import {Connection, Repository} from "typeorm";
import {CreateCoffeeDto} from "./dto/create-coffee.dto";
import {UpdateCoffeeDto} from "./dto/update-coffee.dto";
import {PaginationQueryDto} from "../common/dto/pagination-query.dto";
import {Flavor} from "./entities/flavor.entity";

@Injectable({ scope: Scope.DEFAULT })
export class CoffeesService {
    constructor(
        @InjectRepository(Coffee) private readonly coffeeRepository: Repository<Coffee>,
        @InjectRepository(Flavor) private readonly flavorRepository: Repository<Flavor>
    ) {
    }

    async findAll(paginationQuery: PaginationQueryDto): Promise<Coffee[]> {
        const {limit, offset} = paginationQuery;
        return await this.coffeeRepository.find({
            relations: ['flavors'],
            skip: offset,
            take: limit,
        });
    }

    async findOne(id: string): Promise<Coffee> {
        const coffee = await this.coffeeRepository.findOne(id, {
            relations: ['flavors'],
        });
        if(!coffee) {
            throw new NotFoundException(`Coffee #${id} not found!`);
        }
        return coffee;
    }

    async create(createCoffeeDto: CreateCoffeeDto) {
        const flavors = await Promise.all(
            createCoffeeDto.flavors.map(name => this.preloadFlavorByName(name)),
        );

        const coffee = this.coffeeRepository.create({
            ...createCoffeeDto,
            flavors,
        });
        return await this.coffeeRepository.save(coffee);
    }

    async update(id: string, updateCoffeeDto: UpdateCoffeeDto) {
        const flavors =
            updateCoffeeDto.flavors &&
            (await Promise.all(
                updateCoffeeDto.flavors.map(name => this.preloadFlavorByName(name)),
            ));

        const coffee = await this.coffeeRepository.preload({
            id: +id,
            ...updateCoffeeDto,
            flavors
        });
        if (!coffee) {
            throw new NotFoundException(`Coffee #${id} not found`);
        }

        return this.coffeeRepository.save(coffee);
    }

    async remove(id: string) {
        const coffee = await this.findOne(id);
        return this.coffeeRepository.remove(coffee);
    }

    private async preloadFlavorByName(name: string): Promise<Flavor> {
        const existingFlavor = await this.flavorRepository.findOne({ name });
        if (existingFlavor) {
            return existingFlavor;
        }
        return this.flavorRepository.create({ name });
    }
}
