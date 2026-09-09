import resources from '@/config/resources.json';
import productions from '@/config/productions.json';
import celestialBodies from '@/config/celestialBodies.json';
import type { Resource, Production, CelestialBody } from '@/types/gameTypes';

export const loadResources = (): Resource[] => resources as Resource[];
export const loadProductions = (): Production[] => productions as Production[];
export const loadCelestialBodies = (): CelestialBody[] => celestialBodies as CelestialBody[];
