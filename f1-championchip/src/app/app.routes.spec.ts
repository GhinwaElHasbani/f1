import { routes } from "./app-routing.module";
import { ROUTES_ENUM } from "./shared/enums";

describe('AppRoutes', () => {

    it('should contain path to landing', () => {
        let pathes = routes?.map(m => m.path);

        expect(pathes).toContain(ROUTES_ENUM.LANDING);
    });

    it('should contain path to home', () => {
        let pathes = routes?.map(m => m.path);

        expect(pathes).toContain(ROUTES_ENUM.HOME);
    });

    it('should have animation name for the landing route', () => {
        let landingPath = routes?.find(f => f.path == ROUTES_ENUM.LANDING);

        expect(landingPath?.data).toBeTruthy();
        expect(landingPath?.data?.animation).toContain('LandingPage');
    });

    it('should have animation name for the home route', () => {
        let homePath = routes?.find(f => f.path == ROUTES_ENUM.HOME);

        expect(homePath?.data).toBeTruthy();
        expect(homePath?.data?.animation).toContain('HomePage');
    });

    it('should contain default path', () => {
        let defaultRoute = routes.find(f => f.path == '**' && f.pathMatch == 'full');

        expect(defaultRoute).toBeTruthy();
    });
});
