import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, HasOneRepositoryFactory} from '@loopback/repository';
import {MongodbDataSource} from '../datasources';
import {Flight, FlightRelations, Route} from '../models';
import {RouteRepository} from './route.repository';

export class FlightRepository extends DefaultCrudRepository<
  Flight,
  typeof Flight.prototype.id,
  FlightRelations
> {

  public readonly route: HasOneRepositoryFactory<Route, typeof Flight.prototype.id>;

  constructor(
    @inject('datasources.mongodb') dataSource: MongodbDataSource, @repository.getter('RouteRepository') protected routeRepositoryGetter: Getter<RouteRepository>,
  ) {
    super(Flight, dataSource);
    this.route = this.createHasOneRepositoryFactoryFor('route', routeRepositoryGetter);
    this.registerInclusionResolver('route', this.route.inclusionResolver);
  }
}
