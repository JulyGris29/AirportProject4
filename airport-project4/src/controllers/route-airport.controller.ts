import {
  Count,
  CountSchema,
  Filter,
  repository,
  Where,
} from '@loopback/repository';
import {
  del,
  get,
  getModelSchemaRef,
  getWhereSchemaFor,
  param,
  patch,
  post,
  requestBody,
} from '@loopback/rest';
import {
  Route,
  Airport,
} from '../models';
import {RouteRepository} from '../repositories';

export class RouteAirportController {
  constructor(
    @repository(RouteRepository) protected routeRepository: RouteRepository,
  ) { }

  @get('/routes/{id}/airports', {
    responses: {
      '200': {
        description: 'Array of Route has many Airport',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Airport)},
          },
        },
      },
    },
  })
  async find(
    @param.path.string('id') id: string,
    @param.query.object('filter') filter?: Filter<Airport>,
  ): Promise<Airport[]> {
    return this.routeRepository.airports(id).find(filter);
  }

  @post('/routes/{id}/airports', {
    responses: {
      '200': {
        description: 'Route model instance',
        content: {'application/json': {schema: getModelSchemaRef(Airport)}},
      },
    },
  })
  async create(
    @param.path.string('id') id: typeof Route.prototype.id,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Airport, {
            title: 'NewAirportInRoute',
            exclude: ['id'],
            optional: ['routeId']
          }),
        },
      },
    }) airport: Omit<Airport, 'id'>,
  ): Promise<Airport> {
    return this.routeRepository.airports(id).create(airport);
  }

  @patch('/routes/{id}/airports', {
    responses: {
      '200': {
        description: 'Route.Airport PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async patch(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Airport, {partial: true}),
        },
      },
    })
    airport: Partial<Airport>,
    @param.query.object('where', getWhereSchemaFor(Airport)) where?: Where<Airport>,
  ): Promise<Count> {
    return this.routeRepository.airports(id).patch(airport, where);
  }

  @del('/routes/{id}/airports', {
    responses: {
      '200': {
        description: 'Route.Airport DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.string('id') id: string,
    @param.query.object('where', getWhereSchemaFor(Airport)) where?: Where<Airport>,
  ): Promise<Count> {
    return this.routeRepository.airports(id).delete(where);
  }
}
