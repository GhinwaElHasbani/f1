# f1
A single page application that presents a list that shows the F1 world champions starting from 2005 until now.

The site consists of 2 main pages:
1- The landing page which contains currently, a header and the list of seasons in F1 from 2005 till now.
Since the API to get the seasons for a specific series doesn't allow a filter, from to, to be able to get the list of seasons from 2005, the list is statically added.
The team shown under each season is the champion of this seasons. The driver photo is being retrieved from Wikipedia, open source, so the screen won’t be very boring.
This list is displayed as a grid on a large screen, but one card per line with a vertical scroll on mobile screen.
Clicking on one of the cards, will navigate the user to the modules under the selected season. By default, the list of races will be displayed.
2- The home page which contains a table for each module.
In the header, there is the menu. The menu items are the modules under a specific series, specific season. The menu is in the header on large screen, and in a toggleable side bar on a small screen.
A back button is there too to go back to the seasons list.
For an easy switch between seasons, a dropdown of available seasons exists in the header, that refreshes the data on change.
In the body of the screen, a table for each module is available with the data available for the selected module. The table is always paginated, 10 rows by default, with a button at the bottom in case not all the records are rendered.
The row in the table can be expanded to show extra data. In this website, the races table only is expandable to show for each race, the list of results with the teams and positions.
The row where the position 1 was for the world champion of the season is highlighted in red.
NB. The list of 2021 races aren’t all expandable, because the season is still ongoing.
A link to the details is in the last column of the table for all modules.

Structural wise:
1-	From the app module, the routing paths are added to the landing and the home module.
2-	In the landing module, a component to seasons list is created to be displayed by default.
3-	In the home module, a component for each module exists. A module component has a base class ModuleBaseClass, that does all the job to render the data in a table. This class has also a base class DataTableBaseClass that does the default job to fill the table. 
4-	In the shared module, all the needed components, services, interceptors, guards… implemented under shared are exported to all modules. 
There are:
-	Base classes: DataTableBaseClass, ModuleBaseClass, HelpersBaseClass, HttpManagerClass, HttpBaseClass, ModuleBaseClass.
-	Shared component: CustomCardComponent (used in the seasons list and in the expanded section of the races table), CustomDataTableComponent (used in all modules screens), MenuHeaderComponent (used in the landing page and home page) …
-	Configs, constants, enums, models…
-	Guards: SeasonsGuard, SeriesGuard: implemented so the user can’t insert any season or series in the url
-	Interceptiors: SpinnerInterceptor (to show hide spinner on calling and receiving APIs), BadRequestsInterceptor (to show error message when receiving an error from backend), JsonFormatterInterceptor (to append the .json to the APIs when calling http://ergast.com/mrd/ so it returned a json response)
-	Services: WikiService, SpinnerService, SectionService (it manages the section changes) …

Extra:
-	Caching: The APIs to get data that doesn’t change a lot, is cached using a caching service. In case we need to improve the caching too, the cachingObject in the service can be saved to the local storage too, so it won’t be rendered again on refresh or other tab.
-	Translation: The site currently supports only English, but the ground for translation to other languages is there, it only requires a json file for the other language in the folder translation under assets
-	Comments: In the code, there are inline comments to understand the logic or the implementation, or the purpose of the variables. Most of the methods and variables names are self-explanatory.
-	For the styling, used sass, extension for CSS3. A global styles folder exists under assets, applied to the whole site. The angular material custom theme is there too.
-	All libraries are latest.
-	Some of the unit tests are there, and some automation test scripts are implemented using cypress

Run the website:
-	To run the website locally:
Prepare the environment, install angular, visual studio code, run in terminal: 
npm install
npm run start (kept the default port 4200)
open ‘http://localhost:4200’
-	To run the unit tests:
Write in the terminal: npm run test
-	To run the automation tests:
Write in the terminal: npm run e2e


