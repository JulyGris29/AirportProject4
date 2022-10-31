import {Entity, model, property, hasMany} from '@loopback/repository';
import {Airport} from './airport.model';

@model()
export class Route extends Entity {
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
  airportDeparture: string;

  @property({
    type: 'string',
    required: true,
  })
  airportDestination: string;

  @property({
    type: 'number',
    required: true,
  })
  estimmatedTime: number;

  @hasMany(() => Airport)
  airports: Airport[];

  @property({
    type: 'string',
  })
  flightId?: string;

  constructor(data?: Partial<Route>) {
    super(data);
  }
}

export interface RouteRelations {
  // describe navigational properties here
}

export type RouteWithRelations = Route & RouteRelations;
