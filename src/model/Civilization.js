/**
 * Created by osak on 16/06/29.
 */
    
import {RED, GREEN, BLUE, ORANGE, YELLOW} from './CreditType';
import * as Freezer from '../util/Freezer';

class Civilization {
    constructor(name, cost, credits, discountBy, description, victoryPoint, prevCivilization, evolutionDiscount, bonus) {
        this.name = name;
        this.cost = cost;
        this.credits = credits;
        this.discountBy = discountBy;
        this.description = description;
        this.victoryPoint = victoryPoint;
        this.prevCivilization = prevCivilization;
        this.evolutionDiscount = evolutionDiscount;
        this.bonus = bonus || null;
    }
    
    discountedCost(credits, acquired) {
        let discountCredits = Math.max.apply(null, this.discountBy.map((d) => credits.get(d)));
        let discountEvolution = acquired.indexOf(this.prevCivilization) != -1 ? this.evolutionDiscount : 0;
        return Math.max(this.cost - discountCredits - discountEvolution, 0);
    }

    toString() {
        return '[Civilization: ' + this.name + ']';
    }
}

let _list = [];
function register(name, cost, credits, discountBy, description, victoryPoint, prevCivilization, evolutionDiscount, bonus) {
    let civ = Freezer.deepFreeze(new Civilization(name, cost, credits, discountBy, description, victoryPoint, prevCivilization, evolutionDiscount, bonus));
    _list.push(civ);
    return civ;
}

export const MetalWorking = register('MetalWorking', 90, new Map([[ORANGE, 10], [RED, 5]]), [ORANGE], 'On conflict, units without MetalWorking dies first', 1, null, null);
export const Military = register('Military', 120, new Map([[RED, 10], [ORANGE, 5]]), [RED], 'Players without Military play first', 3, MetalWorking, 10, {Ignore: ['Diplomacy']});
export const AdvancedMilitary = register('Advanced Military', 240, new Map([[RED, 20], [GREEN, 5]]), [RED], 'On conflict, a player may eliminate his units from ground-adjacent area', 6, Military, 20);
export const WrittenRecord = register('Written Record', 60, new Map([[RED, 5], [GREEN, 5]]), [RED, GREEN], 'You may gain additional 10 credits in arbitrarily combination', 1, null, null);
export const Cartography = register('Cartography', 160, new Map([[BLUE, 5], [GREEN, 10]]), [GREEN], 'You may acquire additional trade cards from stack 2 / 5 tokens, and / or stack 7 / 13 tokens', 3, WrittenRecord, 10);
export const Library = register('Library', 220, new Map([[BLUE, 5], [GREEN, 20]]), [GREEN], 'You may discount the cost of any other Civilization that you purchase in the same turn as this card by 40', 6, Cartography, 20);
export const Pottery = register('Pottery', 60, new Map([[BLUE, 5], [ORANGE, 10]]), [ORANGE], '(Nothing)', 1, null, null, {Famine: -5});
export const Agriculture = register('Agriculture', 120, new Map([[ORANGE, 10], [GREEN, 5]]), [ORANGE], 'The population limit of 0, 1, and 2 areas is increased by 1 for you', 3, Pottery, 10, {Famine: 5});
export const Democracy = register('Democracy', 220, new Map([[BLUE, 5], [RED, 20]]), [RED], 'Shortage in tax collection does not trigger revolt', 6, Agriculture, 20, {'Civil War': -10, 'Civil Disorder': -1});
export const Sculpture = register('Sculpture', 50, new Map([[BLUE, 10], [RED, 5]]), [BLUE], '(Nothing)', 1, null, null, {'Tyranny': -5});
export const Architecture = register('Architecture', 140, new Map([[BLUE, 10], [GREEN, 5]]), [BLUE], 'Once per turn, during city construction, you may choose to pay up to half tokens from treasury', 3, Sculpture, 10, null);
export const Mining = register('Mining', 230, new Map([[ORANGE, 20], [GREEN, 5]]), [ORANGE], 'You may acquire additional trade cards from stack 6 or 8 in 13 tokens per card. Also treasury tokens are worth 2 points when purchase civilization', 6, Architecture, 20, {'Slave Revolt': 1});
export const Astronavigation = register('Astronavigation', 80, new Map([[YELLOW, 5], [GREEN, 10]]), [GREEN], 'Your ships are allowed to move through open seas', 1, null, null, null);
export const Calendar = register('Calendar', 180, new Map([[RED, 5], [GREEN, 10]]), [GREEN], '(Nothing)', 3, Astronavigation, 10, {Famine: -5, Cyclone: -2});
export const PublicWorks = register('Public Works', 230, new Map([[ORANGE, 5], [RED, 20]]), [RED], 'Your cities may contain up to 1 your unit.', 6, Calendar, 20, {Ignore: ['Provincial Empire']});
export const Coinage = register('Coinage', 90, new Map([[RED, 5], [GREEN, 10]]), [GREEN], 'You may increase or decrease tax rate by 1', 1, null, null, {Corruption: 5});
export const TradeRoutes = register('Trade Routes', 180, new Map([[ORANGE, 10], [YELLOW, 5]]), [ORANGE], 'You may trash any number of trade cards and acquire twice treasures as sum of face values of trashed cards', 3, Coinage, 10, null);
export const TradeEmpire = register('Trade Empire', 260, new Map([[ORANGE, 20], [RED, 5]]), [ORANGE], 'You may substitute a commodity card to other card at most the same face value', 6, TradeRoutes, {Cyclone: 1, 'Epidemic (primary)': 5});
export const Monarchy = register('Monarchy', 60, new Map([[YELLOW, 5], [RED, 10]]), [RED], 'You may increace tax rate by 1', 1, null, null, {'Barbarian Hordes': -5, Tyranny: 5});
export const Law = register('Law', 150, new Map([[YELLOW, 5], [RED, 10]]), [RED], '(Nothing)', 3, Monarchy, 10, {Tyranny: -5, 'Civil Disorder': -1, Corruption: -5});
export const CulturalAscendancy = register('Cultural Ascendancy', 280, new Map([[BLUE, 20], [YELLOW, 5]]), [BLUE], 'Players are not allowed to cause conflict in areas containing your units', 6, Law, 20, {'City Support': 1});
export const Deism = register('Deism', 70, new Map([[ORANGE, 5], [YELLOW, 5]]), [YELLOW], '(Nothing)', 1, null, null, {'Superstition': -1});
export const Fundamentalism = register('Fundamentalism', 150, new Map([[BLUE, 5], [GREEN, 10]]), [YELLOW], 'Once per turn, you may destruct all tokens in a ground-adjacent area to an area containing your tokens', 3, Deism, 10, {Ignore: ['Fundamentalism'], Regression: 1});
export const Monotheism = register('Monotheism', 240, new Map([[RED, 5], [YELLOW, 20]]), [YELLOW], 'You may annex all tokens in ground-adjacent areas to an area containing your tokens', 6, Fundamentalism, 20, {Ignore: ['Monotheism'], null, 'Iconoclasm and Heresy': 1});
export const ClothMaking = register('Cloth Making', 50, new Map([[BLUE, 5], [ORANGE, 10]]), [ORANGE], 'Your ships may move up to 5 areas', 1, null, null, null);
export const NavalWarfare = register('Naval Warfare', 160, new Map([[RED, 10], [ORANGE, 5]]), [RED], 'Your ships may contain up to 6 units. Also you may remove your ships on conflict.', 3, ClothMaking, 10, {'Piracy (primary)': -1, Ignore: ['Piracy (secondary)'], 'Civil Disorder': 1});
export const Diaspora = register('Diaspora', 270, new Map([[BLUE, 5], [YELLOW, 20]]), [YELLOW], 'You may choose up to 5 tokens and move them to anywhere else in the board', 6, NavalWarfare, 20, null);
export const Urbanism = register('Urbanism', 50, new Map([[RED, 10], [GREEN, 5]]), [RED], 'Once per turn, you may use up to 4 tokens from ground-adjacent area to construct a city', 1, null, null, null);
export const Diplomacy = register('Diplomacy', 160, new Map([[BLUE, 10], [RED, 5]]), [BLUE], 'Players are not allowed to move tokens to your city', 3, Urbanism, 10, {Ignore: ['Diplomacy'], Treachery: 1});
export const ProvincialEmpire = register('Provincial Empire', 260, new Map([[YELLOW, 5], [RED, 20]]), [RED], 'You may choose up to 5 players in adjacent areas to your units. These players must give you commodity cards with face value of at least 2.', 6, Diplomacy, 20, {Ignore: ['Provincial Empire'], 'Barbarian Hordes': 5, Tyranny: 5});
export const DrammaAndPoetry = register('Dramma and Poetry', 80, new Map([[BLUE, 10], [YELLOW, 5]]), [BLUE], '(Nothing)', 1, null, null, {'Civil War': -5, 'Civil Disorder': -1});
export const Rhetoric = register('Retoric', 130, new Map([[BLUE, 10], [RED, 5]]), [BLUE], 'You may acquire additional trade cards from stack 3 in 9 tokens per card', 3, DrammaAndPoetry, 10, null);
export const Politics = register('Politics', 230, new Map([[BLUE, 20], [GREEN, 5]]), [BLUE], 'You may choose one of following: - Gain 5 treasuries / - Annex all units in a ground-adjacent area and consume the same amount treasuries as total points of annexed units', 6, Rhetoric, {Ignore: ['Politics'], 'Barbarian Hordes': 5});
export const Empiricism = register('Empiricism', 60, new Map([[BLUE, 5], [RED, 5], [ORANGE, 5], [YELLOW, 5], [GREEN, 10]]), [GREEN], '(Nothing)', 1, null, null, null);
export const Medicine = register('Medicine', 140, new Map([[ORANGE, 5], [GREEN, 10]]), [GREEN], '(Nothing)', 3, Empiricism, 10, {Epidemic: -5});
export const Anatomy = register('Anatomy', 270, new Map([[ORANGE, 5], [GREEN, 20]]), [GREEN], 'When you purchase this card, you may acquire a green card of less than 100 undiscounted costs', 6, Medicine, 20, {'Epidemic (secondary)': -5});
export const Masonry = register('Masonry', 60, new Map([[ORANGE, 10], [GREEN, 5]]), [ORANGE], '(Nothing)', 1, null, null, {Cyclone: -1});
export const Engineering = register('Engineering', 160, new Map([[ORANGE, 10], [GREEN, 10]]), [ORANGE, GREEN], 'Other players need 8 tokens to attack your cities and your city is replaced by 6 tokens. You need 6 tokens to attack others\' cities and their cities are replaced by 5 tokens.', 3, Masonry, 10, {Ignore: ['Engineering'], Earthquake: 'Your city is reduced instead of destroyed', Flood: -5});
export const RoadBuilding = register('Roadbuilding', 220, new Map([[ORANGE, 20], [GREEN, 5]]), [ORANGE], 'Your units may move up to 2 areas on ground', 6, Engineering, 20, {'Commodity stocks': 1, 'Epidemic (primary)': 5});
export const Music = register('Music', 80, new Map([[BLUE, 10], [YELLOW, 5]]), [BLUE], '(Nothing)', 1, null, null, {'Civil War': -5, 'Civil Disorder': -1});
export const Enlightenment = register('Enlightenment', 160, new Map([[ORANGE, 5], [YELLOW, 10]]), [YELLOW], '(Nothing)', 3, Music, 10, {Superstition: -1, 'Slave Revolt': -1, 'Epidemic (primary)': -5, Regression: 'For each step backward, you may destroy two cities instead'});
export const Philosophy = register('Phylosophy', 220, new Map([[YELLOW, 20], [GREEN, 20]]), [YELLOW, GREEN], '(Nothing)', 6, Enlightenment, 20, {'Iconoclasm and Heresy': -2, Ignore: ['Fundamentalism'], 'Civil War': 5});
export const Mythology = register('Mythology', 60, new Map([[YELLOW, 10], [RED, 5]]), [YELLOW], '(Nothing)', 1, null, null, {'Slave Revolt': -1});
export const Literacy = register('Literacy', 110, new Map([[BLUE, 10], [RED, 10], [ORANGE, 5], [YELLOW, 5], [GREEN, 5]]), [BLUE, RED], '(Nothing)', 3, Mythology, 10, null);
export const Mathematics = register('Mathematics', 250, new Map([[BLUE, 20], [RED, 5], [ORANGE, 5], [YELLOW, 5], [GREEN, 20]]), [BLUE, GREEN], '(Nothing)', 6, Literacy, 20, null);
export const Mysticism = register('Mysticism', 50, new Map([[BLUE, 5], [YELLOW, 5]]), [BLUE, YELLOW], '(Nothing)', 1, null, null, {Superstition: -1});
export const Monument = register('Monument', 180, new Map([[ORANGE, 10], [YELLOW, 10]]), [ORANGE, YELLOW], 'You may gain up to 20 credits', 3, Mysticism, 10, null);
export const WonderOfTheWorld = register('Wonder of the World', 290, new Map([[BLUE, 20], [ORANGE, 20]]), [BLUE, ORANGE], 'You may acquire 1 additional commodity card with face value of higher than number of your cities. / This card counts as city during A.S.T. alteration', 6, Monument, {Corruption: 5});
export const Theocracy = register('Theocracy', 80, new Map([[YELLOW, 5], [RED, 5]]), [RED, YELLOW], '(Nothing)', 1, null, null, {Ignore: ['Iconoclasm and Heresy by discarding 2 commodities']});
export const UniversalDoctorine = register('Universal Doctorine', 160, new Map([[YELLOW, 10], [RED, 5]]), [YELLOW], 'You may annex a pirate city or 5 barbarians', 3, Theocracy, 10, {Superstition: 1});
export const Theology = register('Theology', 250, new Map([[YELLOW, 20], [GREEN, 5]]), [YELLOW], '(Nothing)', 6, UniversalDoctorine, 20, {'Iconoclasm and Heresy': -3, Ignore: ['Monotheism']});

export const List = Freezer.deepFreeze(_list);
