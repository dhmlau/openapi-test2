import {inject, Provider} from '@loopback/core';
import {getService} from '@loopback/service-proxy';
import {DsDataSource} from '../datasources';

export interface PetStoreService {
  // this is where you define the Node.js methods that will be
  // mapped to REST/SOAP/gRPC operations as stated in the datasource
  // json file.
  addPet(newPet: Pet): Promise<Pet>;
}

export class Pet {
  id: number;
  name: string;
  category: Category; //need to change
  photoUrl: string[];
  tags: Tag[];
  status: string;
}
export interface Category {
  id: number;
  name: string;
}
export interface Tag {
  id: number;
  name: string;
}
export class PetStoreServiceProvider implements Provider<PetStoreService> {
  constructor(
    // ds must match the name property in the datasource json file
    @inject('datasources.ds')
    protected dataSource: DsDataSource = new DsDataSource(),
  ) {}

  value(): Promise<PetStoreService> {
    return getService(this.dataSource);
  }
}
