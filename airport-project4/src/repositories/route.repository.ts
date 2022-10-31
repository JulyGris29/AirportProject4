import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, HasManyRepositoryFactory} from '@loopback/repository';
import {MongodbDataSource} from '../datasources';
import {Route, RouteRelations, Airport} from '../models';
import {AirportRepository} from './airport.repository';

export class RouteRepository extends DefaultCrudRepository<
  Route,
  typeof Route.prototype.id,
  RouteRelations
> {

  public readonly airports: HasManyRepositoryFactory<Airport, typeof Route.prototype.id>;

  constructor(
    @inject('datasources.mongodb') dataSource: MongodbDataSource, @repository.getter('AirportRepository') protected airportRepositoryGetter: Getter<AirportRepository>,
  ) {
    super(Route, dataSource);
    this.airports = this.createHasManyRepositoryFactoryFor('airports', airportRepositoryGetter,);
    this.registerInclusionResolver('airports', this.airports.inclusionResolver);
  }
}
