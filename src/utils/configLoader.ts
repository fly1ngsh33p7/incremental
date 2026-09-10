import resources from '@/config/resources.json';
import productions from '@/config/productions.json';
import celestialBodies from '@/config/celestialBodies.json';
import type { Resource, Production, CelestialBody, ResourceAmount } from '@/types/gameTypes';

export const loadResources = ( resources: Resource[] ): ResourceAmount[] => {
    const resourceAmounts: ResourceAmount[] = resources.map(resource => ({
        resource: resource,
        amount: 0, // Initiale Menge auf 0 setzen
    }));
    return resourceAmounts;
};
export const loadProductions = (): Production[] => {
    return productions.map(parseSingleProduction);
};


const parseSingleProduction = (production: any): Production => {
    return {
        id: production.id,
        name: production.name,
        description: production.description,
        cost: production.cost.map((costItem: any) => ({
            resource: resources.find((res: Resource) => res.id === costItem.resourceId)!,
            amount: costItem.amount,
        })),
        productionTime: production.productionTime,
        output: production.output.map((outputItem: any) => ({
            resource: resources.find((res: Resource) => res.id === outputItem.resourceId)!,
            amount: outputItem.amount,
        })),
        active: production.active, // Standardmäßig auf false setzen
        progress: production.progress,   // Standardmäßig auf 0 setzen
        isBuilt: production.isBuilt, // Standardmäßig auf false setzen
    };
}

export const loadCelestialBodies = (): CelestialBody[] => celestialBodies as CelestialBody[];
