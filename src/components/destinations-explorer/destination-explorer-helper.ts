import {
  PlaceTypes,
  type Destinations,
} from "@/components/destinations-explorer/types";

class DestinationExplorerHelper {
  getLocations = (inputValue: string, destinationsJson: Destinations[]) => {
    if (!inputValue) {
      return null;
    }
    return destinationsJson.filter((destination) => {
      const fullDestination = this.getPlaceFullName(destination);
      return fullDestination.toUpperCase().includes(inputValue.toUpperCase());
    });
  };

  getPlaceFullName = (destination: Destinations) => {
    switch (destination.type) {
      case PlaceTypes.PLACE_TYPE_AIRPORT:
        return `${destination.name.toUpperCase()} (${destination.iata.toUpperCase()})`;
      case PlaceTypes.PLACE_TYPE_CITY:
      case PlaceTypes.PLACE_TYPE_AIRPORT:
      default:
        return destination.name.toUpperCase();
    }
  };
}

const destinationExplorerHelper = new DestinationExplorerHelper();
export default destinationExplorerHelper;
