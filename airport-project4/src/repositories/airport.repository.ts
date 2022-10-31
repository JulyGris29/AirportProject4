import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, BelongsToAccessor} from '@loopback/repository';
import {MongodbDataSource} from '../datasources';
import {Airport, AirportRelations, Route} from '../models';
import {RouteRepository} from './route.repository';

export class AirportRepository extends DefaultCrudRepository<
  Airport,
  typeof Airport.prototype.id,
  AirportRelations
> {

  public readonly route: BelongsToAccessor<Route, typeof Airport.prototype.id>;

  constructor(
    @inject('datasources.mongodb') dataSource: MongodbDataSource, @repository.getter('RouteRepository') protected routeRepositoryGetter: Getter<RouteRepository>,
  ) {
    super(Airport, dataSource);
    this.route = this.createBelongsToAccessorFor('route', routeRepositoryGetter,);
    this.registerInclusionResolver('route', this.route.inclusionResolver);
  }
}
