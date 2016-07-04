/**
 * Created by osak on 16/06/29.
 */
    
import {RED, GREEN, BLUE, ORANGE, YELLOW} from './CreditType';
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

let MetalWorking = register('MetalWorking', 90, new Map([[ORANGE, 10], [RED, 5]]), [ORANGE], 'On conflict, units without MetalWorking dies first', 1, null, null);
let Military = register('Military', 120, new Map([[RED, 10], [ORANGE, 5]]), [RED], 'Players without Military should play first', 3, MetalWorking, 10);
let AdvancedMilitary = register('Advanced Military', 240, new Map([[RED, 20], [GREEN, 5]]), [RED], 'On conflict, a player may eliminate his units from ground-adjacent area', 6, Military, 20);
let WrittenRecord = register('Written Record', 60, new Map([[RED, 5], [GREEN, 5]]), [RED, GREEN], 'You may gain additional 10 credits in arbitrarily combination', 1, null, null);
let Cartography = register('Cartography', 160, new Map([[BLUE, 5], [GREEN, 10]]), [GREEN], 'You may acquire additional trade cards from stack 2 / 5 tokens, and / or stack 7 / 13 tokens', 3, WrittenRecord, 10);
let Library = register('Library', 220, new Map([[BLUE, 5], [GREEN, 20]]), [GREEN], 'You may discount the cost of any other Civilization that you purchase in the same turn as this card by 40', 6, Cartography, 20);

export const List = Freezer.deepFreeze(_list);
