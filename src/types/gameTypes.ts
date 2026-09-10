// Resource
export interface Resource {
  id: string;
  name: string;
  description: string;
  baseValue: number; // Basiswert (z. B. für Handel oder Produktion)
}

export interface ResourceAmount {
  resource: Resource;
  amount: number;
}

// Production
export interface Production {
  id: string;
  name: string;
  description: string;
  cost: ResourceAmount[]; // Kosten zum Bauen
  productionTime: number; // Zeit in Sekunden, bis die Produktion aktiv wird
  output: ResourceAmount[]; // Output pro In-Game-Zeiteinheit (z. B. pro Sekunde)
  active: boolean; // Ist die Produktion aktiv?
  progress: number; // Fortschritt (0-1)
  isBuilt: boolean; // Wurde die Produktion gebaut?
}


// Celestial Body
export interface CelestialBody {
  id: string;
  name: string;
  description: string;
  type: 'planet' | 'moon' | 'asteroid'; // Typ des Himmelskörpers
  orbitalPeriod: number; // Umlaufzeit in Tagen
}

export type CelestialBodyMap = Record<string, CelestialBody>;  // celestialBodyId, CelestialBody