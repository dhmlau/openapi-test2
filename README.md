# openapi-test

## Access 3rd party REST service with OpenAPI spec

We're going to show how to access 3rd party REST APIs using LoopBack OpenAPI connector in LoopBack 4 application. The Swagger Petstore REST APIs http://petstore.swagger.io:8080/ will be used in this example. Make sure you run the following steps in an existing LB4 application.

### Step 0: Workaround - Save and modify the Petstore OpenAPI spec

The OpenAPI spec for the Petstore is located at: http://petstore.swagger.io:8080/api/v3/openapi.json. Instead of using URL directly, we need to modify the `server` property of the OpenAPI spec. Otherwise, the error `500 Error: only absolute urls are supported error.` will occur.

1. Create a file called `petstore.json` at the root directory of the project.
2. Copy and paste the Petstore OpenAPI spec http://petstore.swagger.io:8080/api/v3/openapi.json to `petstore.json.
3. In `petstore.json`, find the `servers` property and modify:
   from:

```json
"servers": [{"url": "/api/v3"}],
```

to

```json
 "servers": [{"url": "http://petstore.swagger.io:8080/api/v3/"}],
```

### Step 1: Create a Datasource with OpenAPI connector

Run the [DataSource generator](https://loopback.io/doc/en/lb4/DataSource-generator.html) with the OpenAPI connector.

```sh
$ lb4 datasource
? Datasource name: ds
? Select the connector for ds: OpenAPI (supported by StrongLoop)
? HTTP URL/path to Swagger spec file (file name extension .yaml/.yml or .json):
petstore.json
? Validate spec against Swagger spec 2.0?: No
? Security config for making authenticated requests to API:
? Use positional parameters instead of named parameters?: No
   create src/datasources/ds.datasource.config.json
   create src/datasources/ds.datasource.ts
```

### Step 2: Create a Service to interact with the DataSource

Run the [Service generator](https://loopback.io/doc/en/lb4/Service-generator.html) with the `Remote service proxy backed by a data source` option.

```sh
$ lb4 service
? Service type: Remote service proxy backed by a data source
? Please select the datasource DsDatasource
? Service name: PetStoreService
   create src/services/pet-store-service.service.ts
   update src/services/index.ts

Service PetStoreService was created in src/services/
```

### Step 3: Add the functions map to the OpenAPI operations in the PetStoreService

In this example, the PetStoreService maps to two of the endpoints / operations in the OpenAPI spec: `addPet` and `getPetById`.

In [`src/services/pet-store-service.service.ts`](src/services/pet-store-service.service.ts), we are going to add two functions in the `PetStoreService` interface. The corresponding classes for the return types are created.

### Step 4: Create endpoints in PetStoreController

Run `lb4 controller` command.

```sh
$ lb4 controller
? Controller class name: PetStore
Controller PetStore will be created in src/controllers/pet-store.controller.ts

? What kind of controller would you like to generate? Empty Controller
   create src/controllers/pet-store.controller.ts
   update src/controllers/index.ts

Controller PetStore was created in src/controllers/
```

In [`src/controllers/pet-store.controller.ts`](src/controllers/pet-store.controller.ts):

1. Add a constant `PetSchema` which will be used when defining the endpoints.

   ```ts
   export const PetSchema = {
     type: 'object',
     required: ['id'],
     properties: {
       id: {type: 'number'},
       name: {type: 'string'},
     },
   };
   ```

2. Inject the PetStoreService

   ```ts
   export class PetStoreController {
     constructor(
       @inject('services.PetStoreService')
       protected petStoreService: PetStoreService,
     ) {}
     // ...
   }
   ```

3. Add the two functions `createPet` and `findPetById`.
   See [`src/controllers/pet-store.controller.ts`](src/controllers/pet-store.controller.ts) for details.

[![LoopBack](<https://github.com/strongloop/loopback-next/raw/master/docs/site/imgs/branding/Powered-by-LoopBack-Badge-(blue)-@2x.png>)](http://loopback.io/)
