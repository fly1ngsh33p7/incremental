export type CostFunction = (
    initialCost: number,
    amount: number,
) => number;

/**
 * ResourceTaxonomy enables a distinction between different taxonomies of resources (as in different groups of Resources that all belong to the same "group", e.g. SENSOR contains earthbound and space-based sensors), e.g. to make different ResourceManagerGroups for different taxonomies of resources.
 */
export enum ResourceTaxonomy {
    BASE = 0,
    TECHNOLOGY = 1,
    SENSOR = 2,
}

export class Resource {
    name: string;
    taxonomy: ResourceTaxonomy;
    amount: number = 0;
    initialCost: number;
    isUnlocked: boolean;

    // Costs
    costFunction: CostFunction;

    constructor(
        name: string,
        taxonomy: ResourceTaxonomy,
        amount: number,
        initialCost: number,
        isUnlocked: boolean,
        costFunction: CostFunction = (initialCost, amount) =>
            Math.round(initialCost * Math.pow(2, amount)), // Default: double the cost for each additional unit
    ) {
        this.name = name;
        this.taxonomy = taxonomy;
        this.amount = amount;
        this.initialCost = initialCost;
        this.isUnlocked = isUnlocked;
        this.costFunction = costFunction;
    }

    addAmount(amount: number): void {
        // Increase the amount of the resource by the specified amount
        // FIXME: this triggers a cost increase - should it?
        this.amount += amount;

        console.log(this.toString());
    }

    decreaseAmount(amount: number): void {
        this.amount -= amount;
    }

    getCurrentCost(): number {
        return this.costFunction(this.initialCost, this.amount);
    }

    getCostFormula(): string {
        // This is a bit tricky since the formula is now arbitrary.
        // You could return a string representation of the function or a description.
        return `Custom cost function: ${this.costFunction.toString()}`;
    }

    toString(): string {
        return `Resource: { Name: \"${this.name}\", Amount: ${this.amount}, Initial Cost: ${this.initialCost}, Current Cost: ${this.getCurrentCost()} }`;
    }
}
