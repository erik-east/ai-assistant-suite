import {
  PlaceTypes,
  type Locations,
} from "@/components/location-explorer/types";

class LocationExplorerHelper {
  getLocations = (inputValue: string, locationsJson: Locations[]) => {
    if (!inputValue) {
      return null;
    }
    return locationsJson.filter((location) => {
      const fullLocationName = this.getPlaceFullName(location);
      return fullLocationName.toUpperCase().includes(inputValue.toUpperCase());
    });
  };

  getPlaceFullName = (location: Locations) => {
    switch (location.type) {
      case PlaceTypes.PLACE_TYPE_AIRPORT:
        return `${location.name.toUpperCase()} (${location.iata.toUpperCase()})`;
      case PlaceTypes.PLACE_TYPE_CITY:
      case PlaceTypes.PLACE_TYPE_AIRPORT:
      default:
        return location.name.toUpperCase();
    }
  };
}

const locationExplorerHelper = new LocationExplorerHelper();
export default locationExplorerHelper;
