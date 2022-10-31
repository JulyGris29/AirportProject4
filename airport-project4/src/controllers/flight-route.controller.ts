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
  Flight,
  Route,
} from '../models';
import {FlightRepository} from '../repositories';

export class FlightRouteController {
  constructor(
    @repository(FlightRepository) protected flightRepository: FlightRepository,
  ) { }

  @get('/flights/{id}/route', {
    responses: {
      '200': {
        description: 'Flight has one Route',
        content: {
          'application/json': {
            schema: getModelSchemaRef(Route),
          },
        },
      },
    },
  })
  async get(
    @param.path.string('id') id: string,
    @param.query.object('filter') filter?: Filter<Route>,
  ): Promise<Route> {
    return this.flightRepository.route(id).get(filter);
  }

  @post('/flights/{id}/route', {
    responses: {
      '200': {
        description: 'Flight model instance',
        content: {'application/json': {schema: getModelSchemaRef(Route)}},
      },
    },
  })
  async create(
    @param.path.string('id') id: typeof Flight.prototype.id,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Route, {
            title: 'NewRouteInFlight',
            exclude: ['id'],
            optional: ['flightId']
          }),
        },
      },
    }) route: Omit<Route, 'id'>,
  ): Promise<Route> {
    return this.flightRepository.route(id).create(route);
  }

  @patch('/flights/{id}/route', {
    responses: {
      '200': {
        description: 'Flight.Route PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async patch(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Route, {partial: true}),
        },
      },
    })
    route: Partial<Route>,
    @param.query.object('where', getWhereSchemaFor(Route)) where?: Where<Route>,
  ): Promise<Count> {
    return this.flightRepository.route(id).patch(route, where);
  }

  @del('/flights/{id}/route', {
    responses: {
      '200': {
        description: 'Flight.Route DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.string('id') id: string,
    @param.query.object('where', getWhereSchemaFor(Route)) where?: Where<Route>,
  ): Promise<Count> {
    return this.flightRepository.route(id).delete(where);
  }
}
