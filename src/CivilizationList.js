/**
 * Created by osak on 16/06/29.
 */

const CivilizationList = [
    {
        name: 'Test1',
        cost: 100,
        credits: [
            {color: 'red', amount: 20}
        ],
        discountBy: ['yellow']
    },
    {
        name: 'Test2',
        cost: 150,
        credits: [
            {color: 'orange', amount: 20},
            {color: 'blue', amount: 5}
        ],
        discountBy: ['red', 'green']
    }
];

export default CivilizationList;
