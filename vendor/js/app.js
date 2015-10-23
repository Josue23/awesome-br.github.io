(function() {
  var app = angular.module('awesome', ['iso.directives', 'ngRoute']);
  /**
   * widget class directive
   */
  app.directive('widget', function() {
    return {
      restrict: 'C',
      link: function(scope, elem, attrs) {
        $(elem).geopattern(scope.item.name, {
          generator: 'squares'
        });
      }
    };
  });

  /**
   * Configs (routes)
   */
  app.config(['$routeProvider', function($routeProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'views/home.html',
        controller: 'homeController'
      })
      .when('/:sectionName', {
        templateUrl: 'views/section.html',
        controller: 'sectionController'
      });
  }]);

  /**
   * Run (events)
   */
  app.run(['$rootScope', function($rootScope) {
    $rootScope.$on('$routeChangeSuccess', function(scope, data) {
      $rootScope.currentController = data.controller;
    });
  }]);

  /**
   * Main Controller
   */
  app.controller('mainController', ['$scope', '$http', '$timeout', function($scope, $http, $timeout) {

  }]);

 /**
  * Home Controller
  */
  app.controller('homeController', ['$scope', '$http', '$timeout', function($scope, $http, $timeout) {
    var init = function() {
      $http.get('sections.json')
        .then(function(_response) {
          $scope.itens = _response.data;
        });
    };

    $scope.itens = [];

    $scope.formPlaceholder = 'Pesquise pelas tecnologias disponíveis';

    init();
  }])

  /**
   * Section Controller
   */
  app.controller('sectionController', ['$scope', '$http', '$timeout', '$routeParams', function($scope, $http, $timeout, $routeParams) {
    var init = function() {
      var file = 'sections/' + $routeParams.sectionName + '.json';

      $http.get(file)
        .then(function(_response) {
          $scope.itens = _response.data;
        });
    };

    $scope.itens = [];

    $scope.formPlaceholder = 'Pesquise por títulos, tags ou categorias...';

    $scope.setFilter = function(_value) {
      $scope.query = _value;
    }

    $scope.$watch('query', function() {
      $timeout(function() {
        $scope.$emit('iso-method', {
          name: 'arrange',
          params: null
        })
      }, 600);
    });

    init();
  }]);
})();
