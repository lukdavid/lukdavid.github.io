'use strict';

const animationIds = ["portrait"]

function Router(routes) {
    try {
        if (!routes) {
            throw 'error: routes param is mandatory';
        }
        this.constructor(routes);
        this.init();
    } catch (e) {
        console.error(e);   
    }
}

Router.prototype = {
    routes: undefined,
    rootElem: undefined,
    constructor: function (routes) {
        this.routes = routes;
        this.rootElem = document.getElementById('app');
    },
    init: function () {
        var r = this.routes;
        (function(scope, r) { 
            window.addEventListener('hashchange', function (e) {
                scope.hasChanged(scope, r);
            });
        })(this, r);
        this.hasChanged(this, r);
    },
    hasChanged: function(scope, r){
        if (window.location.hash.length > 0) {
            for (var i = 0, length = r.length; i < length; i++) {
                var route = r[i];
                if(route.isActiveRoute(window.location.hash.substr(1))) {
                    // console.log(`Has changed to : ${route.htmlName}`)
                    scope.goToRoute(route.htmlName);
                }
            }
        } else {
            for (var i = 0, length = r.length; i < length; i++) {
                var route = r[i];
                if(route.default) {
                    scope.goToRoute(route.htmlName, true);
                }
            }
        }
    },
    goToRoute: function (htmlName, isDefault) {
        (function(scope) { 
            var url = 'views/' + htmlName,
                xhttp = new XMLHttpRequest();
            xhttp.onreadystatechange = function () {
                // console.log("onReadyStateChange")
                // console.log(this.readyState, this.status)
                if (this.readyState === 4 && [0, 200].includes(this.status)) {
                    // status 0 : when in local
                    scope.rootElem.innerHTML = this.responseText;
                    if (isDefault){
                        animationIds.forEach(id => document.getElementById(id).classList.add("animated"))
                    }
                }
            };
            xhttp.open('GET', url, true);
            xhttp.send();
        })(this);
    }
};