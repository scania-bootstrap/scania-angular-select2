# scania-angular-select2 [![Join the chat at https://gitter.im/scania-bootstrap/scania-angular-select2](https://badges.gitter.im/Join%20Chat.svg)](https://gitter.im/scania-bootstrap/scania-angular-select2?utm_source=badge&utm_medium=badge&utm_campaign=pr-badge&utm_content=badge)
AngularJS directive for <a href="https://github.com/ivaynberg/select2">Select2</a><br/>

Scania-angular-select2 directive gives you a customizable select box with support for searching, tagging, ng-model, ng-repeat,
native HTML select and option tags, infinite scrolling, and many other highly used options. See select2 API documentationfor the list of options


###<a href="http://embed.plnkr.co/L3YYgq7TEM2mBG9s9we1/preview">Demo</a>

# Getting Started

##Requirements
<a href="https://scania.github.io/corporate-ui-docs/">Scania Corporate UI</a><br/>
<a href="https://github.com/ivaynberg/select2">Select2 V3.5.2</a><br/>
<a href="https://github.com/jashkenas/underscore">Underscore</a><br/>
<a href="http://jquery.com/">JQuery</a><br/>

## Installation

     npm install scania-angular-select2

This will install `scania-angular-select2` and all dependencies including `corporate-ui` in your `node_modules` directory

OR
     bower install scania-angular-select2
     npm install corporate-ui

This will install `scania-angular-select2` and all dependencies execpt `corporate-ui` in your `bower_components` directory
and `corporate-ui` in your `node_modules` directory

#Usage

Add the following script to your index.html file and you are good to go :<br/>

    ROOT_DIR = `bower_components` or `node_modules`

    <link rel="stylesheet" href="<ROOT_DIR>/bootstrap/dist/css/bootstrap.min.css">
    <link href="<ROOT_DIR>/scania-angular-select2/css/corporate-ui-sc-select.css">
    <link rel="stylesheet" href="<ROOT_DIR>/select2/select2.css"/><br/>
    <link href="<ROOT_DIR>/scania-angular-select2/css/corporate-ui-sc-select.css">
    <link rel="stylesheet" href="node_modules/corporate-ui/dist/css/corporate-ui.css">

    <script type="text/javascript" src="<ROOT_DIR>/jquery/jquery.js"></script>
    <script type="text/javascript" src="<ROOT_DIR>/underscore/underscore.js"></script>
    <script src="<ROOT_DIR>/select2/select2.js"></script>
    <script src="<ROOT_DIR>/scania-angular-select2/src/scania-angular-select2.js"></script>


Don't forget to copy the following images to your app root.

         select2.png
         select2x2.png
         select2-spinner.gif

Next inject the directive into your app

    angular.module('yourapp', ['scania.angular.select2']);


##Required Atributes

The following attributes are required on a select tag <br/>

           id="your component id"<br/>
           class="sc-multiselect"<br/>
           sc-select2 (scania-angular-select2 directive)



A complete example can be found <a href="http://embed.plnkr.co/L3YYgq7TEM2mBG9s9we1/preview">here</a>

# Examples

## Single select with Auto Tokenization

        <input type="text" id="single-select-tagging" style="width: 100%"
               data-placeholder="Type to add a tag"
               data-create-search-choice="vm.createSearchChoice"
               data-item-id="id"
               data-label="name"
               data="{{vm.items}}"
               ng-model="vm.selectedItemForSingleTokkenization"
               sc-input-select/>

## Single select with default item selected

     <select ng-options="item as item.name for item in vm.items track by item.id"
             id="my-single3" style="width: 100%"
             data-placeholder="Select Item"
             ng-model="vm.selectedItem"
             data-value="id"
             sc-single-select>
     </select>

 ## Single select with a custom container css class

    <select id="my-single7" style="width: 100%"
            data-placeholder="With custom container css"
            data-container-css-class="container-css-class"
            sc-single-select>
        <option ng-bind="options.placeholder"></option>
        <option ng-repeat="item in vm.items" ng-model="item">
            {{item.name}}
        </option>
    </select>

## Simple Multiselect

    <select id="my-multi1" style="width: 100%" multiple="multiple"
            data-placeholder="Select Items"
            sc-multi-select>
        <option ng-repeat="item in vm.items" ng-selected="item.selected" ng-model="item">
            {{item.name}}
        </option>
    </select>




## Multiselect with <code>ng-change</code> event listener and default selection

    <select ng-options="item as item.name for item in vm.items track by item.id"
        ng-change="vm.selectionChanged()"
        ng-model="vm.selectedItems"
        data-value="id"
        id="my-multi3" style="width: 100%"
        multiple="multiple"
        data-placeholder="With ng-chnage"
        data-container-css-class="select-all"
        sc-multi-select>
    </select>
