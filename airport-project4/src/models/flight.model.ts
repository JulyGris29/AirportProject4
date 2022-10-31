import {Entity, model, property, hasOne} from '@loopback/repository';
import {Route} from './route.model';

@model()
export class Flight extends Entity {
  @property({
    type: 'string',
    id: true,
    generated: true,
  })
  id?: string;

  @property({
    type: 'date',
    required: true,
  })
  startDate: string;

  @property({
    type: 'date',
    required: true,
  })
  endDate: string;

  @property({
    type: 'number',
    required: true,
  })
  seatsSold: number;

  @property({
    type: 'string',
    required: true,
  })
  pilot: string;

  @property({
    type: 'string',
    required: true,
  })
  routeId: string;

  @hasOne(() => Route)
  route: Route;

  constructor(data?: Partial<Flight>) {
    super(data);
  }
}

export interface FlightRelations {
  // describe navigational properties here
}

export type FlightWithRelations = Flight & FlightRelations;
