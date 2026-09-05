export type CostFunction = (initialCost: number, amount: number) => number;

export class Resource {
    name: string;
    amount: number = 0;
    initialCost: number;

    // Costs
    private costFunction: CostFunction;

    constructor(
        name: string,
        amount: number,
        initialCost: number,
        costFunction: CostFunction = (initialCost, amount) => Math.round(initialCost * Math.pow(2, amount)), // Default: double the cost for each additional unit
    ) {
        this.name = name;
        this.amount = amount;
        this.initialCost = initialCost;
        this.costFunction = costFunction;
    }

    addAmount(amount: number): void {
        // Increase the amount of the resource by the specified amount
        // FIXME: this triggers a cost increase - should it?
        this.amount += amount;

        const cost = this.costFunction(this.initialCost, this.amount);
        console.log(`Added ${amount} to ${this.name}, amount now: ${this.amount}, current cost now: ${cost}`);
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

    isUnlocked(): boolean {
        return this.amount > 0;
    }

    toString(): string {
        return `Resource: {${this.name} Amount: ${this.amount}, Initial Cost: ${this.initialCost}, Current Cost: ${this.getCurrentCost()} }`;
    }
}
