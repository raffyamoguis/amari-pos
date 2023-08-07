import {
  IconHome2,
  IconBuildingStore,
  IconNurse,
  IconBrandDeliveroo,
  IconBuildingWarehouse,
  IconGitPullRequest,
} from "@tabler/icons-react";


export const navData = [
    {label: "Home", icon: IconHome2, route: "/"},
    {label: "Transactions", icon: IconBuildingStore, route: "/sell"},
    {label: "Medicine", icon: IconNurse, route: "/medicine"},
    {label: "Other Supplies", icon: IconBrandDeliveroo, route: "/othersupplies"},
    {label: "Stocks", icon: IconBuildingWarehouse, route: "/stocks"},
    {label: "Request", icon: IconGitPullRequest, route: "/request"},
]