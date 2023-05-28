export interface Destinations {
  entityId: string;
  parentId: string;
  name: string;
  type: string;
  iata: string;
  coordinates: {
    latitude: number;
    longitude: number;
  };
}

export enum PlaceTypes {
  PLACE_TYPE_CITY = "PLACE_TYPE_CITY",
  PLACE_TYPE_AIRPORT = "PLACE_TYPE_AIRPORT",
  PLACE_TYPE_COUNTRY = "PLACE_TYPE_COUNTRY",
}
