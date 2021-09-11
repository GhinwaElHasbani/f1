import { MenuItem } from "../shared/components/sidenav-menu/menu-items.model";

export const homeMenuItems: MenuItem[] = [
    {
        label: "modules.races.title",
        link: "/home/:series/:season/races"
    },  
    {
        label: "modules.drivers.title",
        link: "/home/:series/:season/drivers"
    },
    {
        label: "modules.constructors.title",
        link: "/home/:series/:season/constructors"
    },
    {
        label: "modules.circuits.title",
        link: "/home/:series/:season/circuits"
    }
];
