
angular.module('starter', ['ionic', 'starter.controllers', 'starter.services'])

.run(function($ionicPlatform) {
  $ionicPlatform.ready(function() {
    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs)
    if (window.cordova && window.cordova.plugins && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
      cordova.plugins.Keyboard.disableScroll(true);

    }
    if (window.StatusBar) {
      // org.apache.cordova.statusbar required
      StatusBar.styleLightContent();
    }
  });
})

.config(function($stateProvider, $urlRouterProvider) {

  // Ionic uses AngularUI Router which uses the concept of states
  // Learn more here: https://github.com/angular-ui/ui-router
  // Set up the various states which the app can be in.
  // Each state's controller can be found in controllers.js
  $stateProvider

  // setup an abstract state for the tabs directive
    .state('tab', {
    url: '/tab',
    abstract: true,
    templateUrl: 'templates/tabs.html'
  })

  // Each tab has its own nav history stack:

  .state('tab.dash', {
    url: '/dash',
    views: {
      'tab-dash': {
        templateUrl: 'templates/tab-dash.html',
        controller: 'DashCtrl'
      }
    }
  })

  .state('tab.chats', {
      url: '/chats',
      views: {
        'tab-chats': {
          templateUrl: 'templates/tab-chats.html',
          controller: 'ChatsCtrl'
        }
      }
    })
    .state('tab.chat-detail', {
      url: '/chats/:chatId',
      views: {
        'tab-chats': {
          templateUrl: 'templates/chat-detail.html',
          controller: 'ChatDetailCtrl'
        }
      }
    })

  .state('tab.account', {
    url: '/account',
    views: {
      'tab-account': {
        templateUrl: 'templates/tab-account.html',
        controller: 'AccountCtrl'
      }
    }
  });

  // if none of the above states are matched, use this as the fallback
  $urlRouterProvider.otherwise('/tab/dash');

});

angular.module('starter', ['ionic', 'ionic.contrib.ui.tinderCards'])
 
.directive('noScroll', function() {
    return {
        restrict: 'A',
        link: function($scope, $element, $attr) {
            $element.on('touchmove', function(e) {
                e.preventDefault();
            });
        }
    }
})

.controller('CardsCtrl', function($scope, $http) {

    $scope.cards = [];
    $scope.cardsLoaded = false;
  
    $scope.addCard = function(image) {
      var newCard;
      newCard = {
        'image': image
      };
      $scope.cards.unshift(angular.extend({}, newCard));
    };
  
    $scope.addCards = function(count) {
      $http.get('http://www.reddit.com/r/aww.json?results=' + count).then(function(users) {
              //console.log("Users data are " + users.name);

              

      //console.log(users.data.data.children[1].data.thumbnail);
     // users.data.data.children[1].data.
          
    // console.log(users.data.data.children.length);

        $scope.cardsLoaded = true;
        angular.forEach(users.data.data.children, function(card) {
          if (card.data.post_hint == 'image'){
             $scope.addCard(card.data.url);
           }
        });
      });
    };
  
    $scope.addCards(20);
  
    $scope.cardLike = function(card) {
      $scope.addCards(1);
    };
  
    $scope.cardDislike = function(card) {
      $scope.addCards(1);
    };
  
    $scope.removeCard = function($index) {
      $scope.cards.splice($index, 1);
    };
  
    $scope.fadeCard = function($index) {
      this.swipeCard.el.style.opacity = 0
    }
  
  })
;