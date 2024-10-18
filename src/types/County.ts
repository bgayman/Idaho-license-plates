interface County {
  name: string;
  prefix: string;
  countySeat: City;
  largestCity: City;
  shortDescription: string;
  founding: Founding;
  area: Area;
  population: number;
  coordinates: Coordinate[] | undefined;
}

interface City {
  name: string;
  coordinate: Coordinate;
}

interface Coordinate {
  latitude: number;
  longitude: number;
}

interface Founding {
  dateString: string;
  namedFor: string;
}

interface Area {
  total: Measurement;
  land: Measurement;
  water: Measurement;
}

interface Measurement {
  value: number;
  unit: Unit;
}

interface Unit {
  symbol: string;
}

interface GeoJSON {
  type: string;
  features: Feature[];
}

interface Feature {
  type: string;
  properties: Properties;
  geometry: Geometry;
}

interface Properties {
  name: string;
  namelsad: string;
  state_name: string;
}

interface Geometry {
  type: string;
  coordinates: number[][][];
}

export type { County, GeoJSON, Coordinate };
