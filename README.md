# scania-angular-select2

[![Join the chat at https://gitter.im/scania-bootstrap/scania-angular-select2](https://badges.gitter.im/Join%20Chat.svg)](https://gitter.im/scania-bootstrap/scania-angular-select2?utm_source=badge&utm_medium=badge&utm_campaign=pr-badge&utm_content=badge)
AngularJS directive for Select2

Scania angular-select2 directive gives you a customizable select box with support for searching, tagging, ng-model, ng-repeat,
native HTML select and option tags, infinite scrolling, and many other highly used options. See select2 API documentationfor the list of options


###<a href="http://plnkr.co/edit/L3YYgq7TEM2mBG9s9we1?p=preview">Demo</a>

# Getting Started

##Requirements

<a href="https://github.com/ivaynberg/select2">Select2 V3.5.2</a><br/>
<a href="https://github.com/jashkenas/underscore">Underscore</a><br/>
<a href="http://jquery.com/">JQuery</a><br/>

## Installation

     bower install scania-angular-select2

#Usage

##Required Atributes

The following attributes are required on a select tag <br/>

           id="your component id"<br/>
           class="sc-multiselect"<br/>
           sc-select2 (scania angular-select2 directive)

  Add the following script to your index.html file and you are good to go :<br/>

<script type="text/javascript" src="bower_components/jquery/jquery.js"></script>
<script type="text/javascript" src="bower_components/underscore/underscore.js"></script>
    <script src="bower_components/select2/select2.js"></script>
    <script src="bower_components/scania-angular-select2/src/sc-select2.directive.js"></script>

  If you are using bootstrap you will need the less file so go ahead and link sc-select2.directive.less together select2.css

    <link rel="stylesheet" type="bower_components/select2/select2.css"/><br/>
    <link rel="stylesheet" type="bower_components/scania-angular-select2/sc-select2.directive.less"/>

# Examples

## A simple multiselect

     <select id="my-multi1" class="sc-multiselect" style="width: 200px" multiple="multiple"
         data-placeholder="Select Group"
         sc-select2>
         <option ng-repeat="item in vm.items" ng-selected="item.selected" ng-model="item">
            {{item.name}}
         </option>
     </select>

### Require attributes

id="my-multi1"<br/>
class="sc-multiselect"<br/>
multiple="multiple"<br/>
sc-select2 (scania angular-select2 directive)

## A simple multiselect with attribute data-close-on-select="false".

    <select id="my-multi2" class="sc-multiselect" style="width: 200px" multiple="multiple"
        data-placeholder="Select Group"
        data-close-on-select="false"
        sc-select2>
        <option ng-repeat="item in vm.items" ng-selected="item.selected" ng-model="item">
            {{item.name}}
        </option>
    </select>


### Require attributes

id="my-multi2"<br/>
class="sc-multiselect"<br/>
multiple="multiple"<br/>
sc-select2 (scania angular-select2 directive)

## A single select with attribute data-allow-clear="true"

    <select id="my-single1" class="sc-select" style="width: 200px"
        data-placeholder="Select Group"
        data-allow-clear="true"
        sc-select2>
        <option ng-bind="options.placeholder"></option>
        <option ng-repeat="item in vm.items" ng-selected="item.selected" ng-model="item">
            {{item.name}}
        </option>
    </select>


### Require attributes

id="my-single1"<br/>
class="sc-select"<br/>
sc-select2 (scania angular-select2 directive)

## A single select with disabled option

    <select id="my-single2" class="sc-select" style="width: 200px" disabled="true"
        sc-select2>
        <option ng-repeat="item in vm.items" ng-selected="item.selected" ng-model="item">
            {{item.name}}
        </option>
    </select>

### Require attributes

id="my-single2"<br/>
class="sc-select"<br/>
sc-select2 (scania angular-select2 directive)

## Multiselect with ng-change event listener

     <select ng-options="item.name for item in vm.items"
         ng-change="vm.selctionChanged()"
         ng-model="vm.selectedItems"
         id="my-multi3" class="sc-multiselect" style="width: 200px"
         multiple="multiple"
         data-placeholder="Select Group"
         sc-select2>
     </select>
    <span class="text-success" ng-bind="message"></span>


### Require attributes

ng-options<br/>
ng-change<br/>
ng-model<br/>
id="my-multi3"<br/>
class="sc-multiselect"<br/>
multiple="multiple"<br/>
sc-select2 (scania angular-select2 directive)

## A simple multiselect Whit attributes

data-maximum-selection-size="1"
data-minimum-input-length="3"
data-search-input-placeholder="Type your keyword here"


        <select id="my-multi4" class="sc-multiselect" multiple="multiple"
            data-placeholder="Select Group"
            data-maximum-selection-size="1"
            data-minimum-input-length="3"
            data-search-input-placeholder="Type your keyword here"
            sc-select2>
            <option ng-repeat="item in vm.items" ng-model="item">
                {{item.name}}
            </option>
        </select>


### Require attributes

id="my-multi4"<br/>
class="sc-multiselect"<br/>
multiple="multiple"<br/>
sc-select2 (scania angular-select2 directive)

## A single select with ng-selected attribute

     <select id="my-single3" class="sc-select"
          data-placeholder="Select Group"
          sc-select2>
          <option ng-bind="options.placeholder"></option>
          <option ng-repeat="item in vm.items" ng-selected="item.selected" ng-model="item">
                {{item.name}}
          </option>
     </select>

### Require attributes

id="my-single3"<br/>
class="sc-select"<br/>
sc-select2 (scania angular-select2 directive)

## A localized single select with language="sv"

     <select id="my-single4" class="sc-select" style="width: 200px" language="sv"
        data-placeholder="Select Group"
        sc-select2>
        <option ng-bind="options.placeholder"></option>
        <option ng-repeat="item in vm.items" ng-model="item">
            {{item.name}}
        </option>
     </select>

### Require attributes

 id="my-single4"<br/>
class="sc-select"<br/>
sc-select2 (scania angular-select2 directive)