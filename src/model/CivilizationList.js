/**
 * Created by osak on 16/06/29.
 */
    
import * as CreditType from './CreditType';
import * as Freezer from '../util/Freezer';

class Civilization {
    constructor(name, cost, credits, discountBy, description, victoryPoint) {
        this.name = name;
        this.cost = cost;
        this.credits = credits;
        this.discountBy = discountBy;
        this.description = description;
        this.victoryPoint = victoryPoint;
    }
    
    discountedCost(credits) {
        let discount = Math.max.apply(null, this.discountBy.map((d) => credits.get(d)));
        return Math.max(this.cost - discount, 0);
    }
}

const CivilizationList = Freezer.deepFreeze([
    new Civilization('Test1', 100, [{type: CreditType.RED, amount: 20}], [CreditType.YELLOW], 'Description1', 1),
    new Civilization('Test2', 150, [{type: CreditType.ORANGE, amount: 20}, {type: CreditType.BLUE, amount: 5}], [CreditType.RED, CreditType.GREEN], 'Description2', 3)
]);

export default CivilizationList;
