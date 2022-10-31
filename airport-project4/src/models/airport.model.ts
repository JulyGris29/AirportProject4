import {Entity, model, property, belongsTo} from '@loopback/repository';
import {Route} from './route.model';

@model()
export class Airport extends Entity {
  @property({
    type: 'string',
    id: true,
    generated: true,
  })
  id?: string;

  @property({
    type: 'string',
    required: true,
  })
  name: string;

  @property({
    type: 'string',
    required: true,
  })
  city: string;

  @property({
    type: 'string',
    required: true,
  })
  country: string;

  @property({
    type: 'string',
    required: true,
  })
  coordinatesX: string;

  @property({
    type: 'string',
    required: true,
  })
  coordinatesY: string;

  @property({
    type: 'string',
    required: true,
  })
  acronym: string;

  @property({
    type: 'string',
    required: true,
  })
  type: string;

  @belongsTo(() => Route)
  routeId: string;

  constructor(data?: Partial<Airport>) {
    super(data);
  }
}

export interface AirportRelations {
  // describe navigational properties here
}

export type AirportWithRelations = Airport & AirportRelations;
