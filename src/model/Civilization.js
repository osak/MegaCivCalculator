/**
 * Created by osak on 16/06/29.
 */
    
import * as CreditType from './CreditType';
import * as Freezer from '../util/Freezer';

class Civilization {
    constructor(name, cost, credits, discountBy, description, victoryPoint, prevCivilization, evolutionDiscount) {
        this.name = name;
        this.cost = cost;
        this.credits = credits;
        this.discountBy = discountBy;
        this.description = description;
        this.victoryPoint = victoryPoint;
        this.prevCivilization = prevCivilization;
        this.evolutionDiscount = evolutionDiscount;
    }
    
    discountedCost(credits, acquired) {
        let discountCredits = Math.max.apply(null, this.discountBy.map((d) => credits.get(d)));
        let discountEvolution = acquired.indexOf(this.prevCivilization) != -1 ? this.evolutionDiscount : 0;
        return Math.max(this.cost - discountCredits - discountEvolution, 0);
    }
}

let _list = [];
function register(name, cost, credits, discountBy, description, victoryPoint, prevCivilization, evolutionDiscount) {
    let civ = Freezer.deepFreeze(new Civilization(name, cost, credits, discountBy, description, victoryPoint, prevCivilization, evolutionDiscount));
    _list.push(civ);
    return civ;
}

let MetalWorking = register('MetalWorking', 90, new Map([[CreditType.ORANGE, 10], [CreditType.RED, 5]]), [CreditType.ORANGE], 'On conflict, units without MetalWorking dies first', 1, null, null);
let Military = register('Military', 120, new Map([[CreditType.RED, 10], [CreditType.ORANGE, 5]]), [CreditType.RED], 'Players without Military should play first', 3, MetalWorking, 10);
let AdvancedMilitary = register('Advanced Military', 240, new Map([[CreditType.RED, 20], [CreditType.GREEN, 5]]), [CreditType.RED], 'On conflict, a player may eliminate his units from ground-adjacent area', 6, Military, 20);

export const List = Freezer.deepFreeze(_list);
