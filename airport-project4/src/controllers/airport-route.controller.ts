import {
  repository,
} from '@loopback/repository';
import {
  param,
  get,
  getModelSchemaRef,
} from '@loopback/rest';
import {
  Airport,
  Route,
} from '../models';
import {AirportRepository} from '../repositories';

export class AirportRouteController {
  constructor(
    @repository(AirportRepository)
    public airportRepository: AirportRepository,
  ) { }

  @get('/airports/{id}/route', {
    responses: {
      '200': {
        description: 'Route belonging to Airport',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Route)},
          },
        },
      },
    },
  })
  async getRoute(
    @param.path.string('id') id: typeof Airport.prototype.id,
  ): Promise<Route> {
    return this.airportRepository.route(id);
  }
}
