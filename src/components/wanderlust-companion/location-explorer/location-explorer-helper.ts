import { type Location } from "@/constants/locations-json";

class LocationExplorerHelper {
  getFilteredLocations = (inputValue: string, locations: Location[]) => {
    if (!inputValue) {
      return null;
    }
    return locations
      .filter((location) =>
        location.fullName.toUpperCase().includes(inputValue.toUpperCase())
      )
      .slice(0, 5);
  };
}

const locationExplorerHelper = new LocationExplorerHelper();
export default locationExplorerHelper;
