import { APP_SERIES } from '../shared/constants';
import { ROUTES_ENUM } from '../shared/enums';
import { routes } from './home-routing.module';
import { CircuitsComponent } from './circuits/circuits.component';
import { ConstructorsComponent } from './constructors/constructors.component';
import { DriversComponent } from './drivers/drivers.component';
import { RacesComponent } from './races/races.component';

describe('HomeRoutes', () => {

    it('should contain path to modules under specific series and season', () => {
        let pathes = routes.map(m => m.path);
        expect(pathes).toContain(':series/:season');
    });

    it('should contain path to modules under specific series and season with children routes', () => {
        let route = routes.find(f => f.path == ':series/:season');
        expect(route?.children?.length).toBeGreaterThan(0);
    });

    it('should contain path under specific series and season with default route to races module', () => {
        let route = routes.find(f => f.path == ':series/:season');
        expect(route?.children).toContain({ path: '', redirectTo: ROUTES_ENUM.RACES });
    });

    it('should a child route to races module', () => {
        let route = routes.find(f => f.path == ':series/:season');

        expect(route?.children).toContain({ path: ROUTES_ENUM.RACES, component: RacesComponent });
    });

    it('should a child route to drivers module', () => {
        let route = routes.find(f => f.path == ':series/:season');

        expect(route?.children).toContain({ path: ROUTES_ENUM.DRIVERS, component: DriversComponent });
    });

    it('should a child route to constructors module', () => {
        let route = routes.find(f => f.path == ':series/:season');

        expect(route?.children).toContain({ path: ROUTES_ENUM.CONSTRUCTORS, component: ConstructorsComponent });
    });

    it('should a child route to circuits module', () => {
        let route = routes.find(f => f.path == ':series/:season');

        expect(route?.children).toContain({ path: ROUTES_ENUM.CIRCUITS, component: CircuitsComponent });
    });

});
