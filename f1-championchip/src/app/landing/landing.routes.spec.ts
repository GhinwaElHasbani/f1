import { APP_SERIES } from '../shared/constants';
import { routes } from './landing-routing.module';

describe('LandingRoutes', () => {

    it('should contain empty path to landing', () => {
        let pathes = routes.map(m => m.path);
        expect(pathes).toContain('');
    });

    it('should contain empty path with children routes', () => {
        let emptyRoute = routes.find(f => f.path == '');
        expect(emptyRoute?.children?.length).toBeGreaterThan(0);
    });

    it('should contain empty path with a child route to series', () => {
        let emptyRoute = routes.find(f => f.path == '');
        let childrenRoutePathes = emptyRoute?.children?.map(m => m.path);

        expect(childrenRoutePathes).toContain(':series');
    });

    it('should contain empty path with default route to series', () => {
        let emptyRoute = routes.find(f => f.path == '');
        expect(emptyRoute?.children).toContain({ path: '', redirectTo: APP_SERIES[0] });
    });
});
