// Uncomment these imports to begin using these cool features!

// import {inject} from '@loopback/context';
import {inject} from '@loopback/core';
import {getModelSchemaRef, post, requestBody} from '@loopback/rest';
import {Pet, PetStoreService} from '../services';

export class PetStoreController {
  constructor(
    @inject('services.PetStoreService')
    protected petStoreService: PetStoreService,
  ) {}

  @post('/pets', {
    responses: {
      '200': {
        description: 'new pet',
        schema: getModelSchemaRef(Pet),
      },
    },
  })
  async createPet(
    @requestBody({
      content: {'application/json': {schema: {'x-ts-type': Pet}}},
      // content: {'application/json': {schema: getModelSchemaRef(Pet)}},
    })
    newPet: Pet,
  ): Promise<Pet> {
    return await this.petStoreService.addPet(newPet);
  }
}
