var myApp = angular.module('testApp',['ngRoute']);


myApp.config(['$routeProvider', function($routeProvider){
    $routeProvider
    .when("/", {
        templateUrl: "templates/routes/home.html"
    })
    .when("/directive", {
        templateUrl: "templates/routes/directive.html"
    })
    .when('/interpolation', {
        templateUrl: "templates/routes/interpolation.html",
        controller: "interpolation"
    })

}]);

//CONTROLLERS
myApp.controller('interpolation', ['$scope', function($scope)   {

    //Interpolation with knowledge of Object structure
    $scope.interpWithK = function(string, obj) {
		console.log(string, obj);
		for (key in obj.contact) {
			propName = "{"+key+"}";
			propValue = obj.contact[key]
			string = string.replace(propName, propValue);
		}
		return string;
	}

    //Interpolation without knowledge of object structure
    $scope.interpWithoutK = function(string, obj) {
		console.log(string, obj);
		for (key in obj) {
            for (subkey in obj[key]){
                propName = "{"+subkey+"}";
                propValue = obj[key][subkey];
                string = string.replace(propName, propValue);
            }
		}
		return string;
	}

    var personObj = {
        contact : {name: "john", weather: "damn hot!"}
    }

    var replaceString = "Hi my name is {name} and its {weather} outside.";
    var withString = $scope.interpWithK(replaceString, personObj);
    var withoutString = $scope.interpWithoutK(replaceString, personObj);

    $("#messageWithK").text(withString);
    $("#messageWithoutK").text(withoutString);
}]);


//DIRECTIVES
myApp.directive('irBoxes', function()	{
    return{
        scope : {
            count:"@"
        },
        templateUrl: "templates/directives/irBoxes.html",
        link: function(scope, element, attrs)   {
            scope.range = Array(parseInt(scope.count,10)).fill(0);
        }
    }
})
