# NestJS Course

## Inhoud

#### iluvcoffee: REST API met TypeORM + PostgreSQL koppeling (bevat ook de onderstaande onderdelen die zijn behandeld in de course);


- (Validation)pipes;
- Middleware;
- Filters;
- Guards;
- Interceptors;
- Decorators;
- Unittests;
- Migrations;
- Events.


#### iluvcoffee-mongoose: REST API met TypeORM + MongoDB koppeling;


#### iluvcoffee-graphql: Eigen prototype van een GraphQL API met TypeORM + PostgreSQL koppeling.


## Project setup
1. Clone deze repository;
2. Open de folder van het project dat je wil openen;
3. Run `npm install` in de root van de folder;
4. Run `cp .env.dist .env`;
5. Run `docker-compse up -d`.

## Running the app

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

## Test

```bash
# unit tests
$ npm run test

# e2e tests
$ npm run test:e2e

# test coverage
$ npm run test:cov
```

## REST API Documentatie

Zie http://localhost:3000/api voor de swagger documentatie (alleen beschikbaar in iluvcoffee).

Gebruik de API_KEY in de .env als authenticatie header in de API requests. (alleen nodig voor iluvcoffee)

## GraphQL API documentatie

Open de GraphQL playground op http://localhost:3000/graphql

Documentatie/schemas zijn terug te vinden in de tab rechts onder "docs" en "schemas".
Hierin zijn de beschikbare models terug te vinden.

Hieronder zijn een aantal voorbeeld queries terug te vinden. De resolver is terug te vinden in de src/coffees/coffees.resolver.ts

### Voorbeeld queries

#### updateCoffee

```
mutation {
  updateCoffee(coffeeId: "1", updateCoffeeInput: {
    title: "Dark roast"
    recommendations: "0"
  }){
    title
    brand
    recommendations
    flavors {
      name
    }
  }
}
```

#### createCoffee
Query:
```
mutation createCoffee($createCoffeeInput: CreateCoffeeInput!){
  createCoffee(createCoffeeInput: $createCoffeeInput) {
    id
    brand
    flavors {
      name
    }
  }
}
```
Variabelen:
```
{
  "createCoffeeInput": {
    "title": "Donkere koffie",
    "brand": "Appie huismerk",
    "flavors": ["Sterk", "Noten"]
  }
}
```

#### recommendCoffee
```
mutation {
  recommendCoffee(coffeeId: "1" ){
    id
    recommendations
    flavors {
      name
    }
  }
}
```

#### coffee (query)
```
query {
  coffee(id: "1"){
    id
    title
    description
    brand
    recommendations
    flavors {
      name
    }
  }
}
```
