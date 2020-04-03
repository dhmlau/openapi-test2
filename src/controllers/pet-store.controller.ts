// Uncomment these imports to begin using these cool features!

// import {inject} from '@loopback/context';
import {inject} from '@loopback/core';
import {get, param, post, requestBody} from '@loopback/rest';
import {Pet, PetStoreService} from '../services';

export const PetSchema = {
  type: 'object',
  required: ['id'],
  properties: {
    id: {type: 'number'},
    name: {type: 'string'},
  },
};
export class PetStoreController {
  constructor(
    @inject('services.PetStoreService')
    protected petStoreService: PetStoreService,
  ) {}

  @post('/pets', {
    responses: {
      '200': {
        description: 'new pet',
        schema: PetSchema,
      },
    },
  })
  async createPet(
    @requestBody({
      content: {'application/json': {schema: PetSchema}},
    })
    newPet: Pet,
  ): Promise<Pet> {
    const reqBody = {requestBody: newPet};
    const response = await this.petStoreService.addPet({}, reqBody);
    return response.body;
  }

  @get('/pets/{petId}', {
    responses: {
      '200': {
        description: 'Pet model instance',
        content: {'application/json': {schema: PetSchema}},
      },
    },
  })
  async findPetById(@param.path.number('petId') petId: number): Promise<Pet> {
    const response = await this.petStoreService.getPetById({petId: petId});
    return response.body;
  }
}
