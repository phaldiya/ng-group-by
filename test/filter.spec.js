'use strict';

const expect = require('chai').expect;
const Filter = require('../src/filter');

describe('ngGroupBy', () => {
  const filter = new Filter();

  it('groupBy filter exists', () => {
    expect(!!filter).to.equal(true);
  });

  it('should be able to filter array document', () => {
    let items = [
      {name: 'Jozy Altidore', team: 'Toronto FC'},
      {name: 'Matt Hedges', team: 'FC Dallas'},
      {name: 'Clint Dempsey', team: 'Seattle Sounders FC'},
      {name: 'Jesse Gonzalez', team: 'FC Dallas'},
      {name: 'Michael Bradley', team: 'Toronto FC'}
    ];

    let groupByKey = "team";
    let expectedResult = [
        {
          "key": "Toronto FC",
          "data": [
            {
              "name": "Jozy Altidore",
              "team": "Toronto FC"
            },
            {
              "name": "Michael Bradley",
              "team": "Toronto FC"
            }
          ]
        },
        {
          "key": "FC Dallas",
          "data": [
            {
              "name": "Matt Hedges",
              "team": "FC Dallas"
            },
            {
              "name": "Jesse Gonzalez",
              "team": "FC Dallas"
            }
          ]
        },
        {
          "key": "Seattle Sounders FC",
          "data": [
            {
              "name": "Clint Dempsey",
              "team": "Seattle Sounders FC"
            }
          ]
        }
      ];

    let results = new Filter(items, groupByKey);
    expect(results).to.deep.equal(expectedResult);
  });

  it('should be able to filter array document with deep group key', () => {
    let items = [
      {name: 'Jozy Altidore', team: {name: 'Toronto FC'}},
      {name: 'Matt Hedges', team: {name: 'FC Dallas'}},
      {name: 'Clint Dempsey', team: {name: 'Seattle Sounders FC'}},
      {name: 'Jesse Gonzalez', team: {name: 'FC Dallas'}},
      {name: 'Michael Bradley', team: {name: 'Toronto FC'}}
    ];

    let groupByKey = "team.name";
    let expectedResult = [
        {
          "key": "Toronto FC",
          "data": [
            {
              "name": "Jozy Altidore",
              "team": {
                "name": "Toronto FC"
              }
            },
            {
              "name": "Michael Bradley",
              "team": {
                "name": "Toronto FC"
              }
            }
          ]
        },
        {
          "key": "FC Dallas",
          "data": [
            {
              "name": "Matt Hedges",
              "team": {
                "name": "FC Dallas"
              }
            },
            {
              "name": "Jesse Gonzalez",
              "team": {
                "name": "FC Dallas"
              }
            }
          ]
        },
        {
          "key": "Seattle Sounders FC",
          "data": [
            {
              "name": "Clint Dempsey",
              "team": {
                "name": "Seattle Sounders FC"
              }
            }
          ]
        }
      ];

    let results = new Filter(items, groupByKey);
    expect(results).to.deep.equal(expectedResult);
  });
});
