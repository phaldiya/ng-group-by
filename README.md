groupBy
=====================

> an angularJS group-by filter, that supports deep document grouping

## Getting started ##

### Prerequisites
If you do not have nodejs installed on your machine, download and install [NodeJS](http://nodejs.org/).<br/>


### Installation
Install ng-group-by npm package [ng-group-by](https://www.npmjs.org/package/ng-group-by)</a>:<br/>

**With Bower:**

```
$ cd <project path>
bower install --save ng-group-by
```

**With NPM:**

```
$ cd <project path>
npm install --save ng-group-by
```


##  How to use


1. Import the ```dist/ng-group-by.min.js``` script and include the module ```ng-group-by``` into app.js

2. **OR** ```require('ng-group-by')``` into app.js.

3. Use it as an angular filter:

```javascript
var ctrl.teamPlayers = [
     {name: 'Jozy Altidore', team: 'Toronto FC'},
     {name: 'Matt Hedges', team: 'FC Dallas'},
     {name: 'Clint Dempsey', team: 'Seattle Sounders FC'},
     {name: 'Jesse Gonzalez', team: 'FC Dallas'},
     {name: 'Michael Bradley', team: 'Toronto FC'}
   ];

// groupBy filter will transform the data into Array of Group Objects. i.e. {key: <GROUP_BY_VALUE>, date: <ARRAY OF OBJECTS>}
/*[
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
      ]*/
```

```html
<!--
to group by all players by team
-->
<div ng-repeat="team in ctrl.teamPlayers | broupBy: 'team'">
  <hi>{{team.key}}</hi> <!-- Team Name i.e. Toronto FC, FC Dallas or Seattle Sounders FC -->
  <div ng-repeat="player in team.data">
  ...
  </div>
</div>

<!--
Want deep document level group by
Ex. Player Object look like this 

{name: 'Jozy Altidore', team: {name: 'Toronto FC'}}
-->
<div ng-repeat="team in ctrl.teamPlayers | broupBy: 'team.name'">
...
</div>
```

## Contributing
* If you planning add some feature please **create issue before**.
* Don't forget about tests.

Clone the project: <br/>
```bash
$ git clone
$ npm install
$ bower install
```
Run the tests:
```bash
$ mocha
```
**Deploy:**<br/>
Run the build task, update version before(bower,package)
```bash
$ gulp build
$ git tag v*.*.*
$ git push origin master --tags
```

## Issues
If you do find an issue or have a question consider posting it on the [Issues](https://github.com/phaldiya/ng-group-by/issues).
