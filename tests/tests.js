// in order to see the app running inside the QUnit runner
App.rootElement = '#ember-testing';

// Common test setup
App.setupForTesting();
App.injectTestHelpers();

// common QUnit module declaration
module("Integration tests", {
  setup: function() {
    // before each test, ensure the application is ready to run.
    Ember.run(App, App.advanceReadiness);
  },

  teardown: function() {
    // reset the application state between each test
    App.reset();
  }
});

// QUnit test case
test("/", function() {
  // async helper telling the application to go to the '/' route
  visit("/");

  // helper waiting the application is idle before running the callback
  andThen(function() {
    equal(find("h2").text(), "Welcome to Emberoverflow", "Application header is rendered");
    equal(find("ul:not(.nav) > li").length, 2, "There are two items in the list");
  });
});

test("question links on index page lead to questions", function() {
  visit("/");
  click("ul:not(.nav) > li > a:first");

  andThen(function() {
    equal(
      find("h2").length,
      1,
      "Question header is rendered"
    );

    equal(
      find("p").length,
      2,
      "Question and author are rendered"
    );
  });
});

test("user will be able to log in", function() {
  delete localStorage['currentUser'];
  App.set('currentUser', undefined);

  visit("/sign-in");

  fillIn(".form-control", "tomster@hamster.com");
  click("button");

  andThen(function() {
    equal(
      find("p").text(),
      "You are already signed-in!",
      "Signed-in message rendered"
    );
  });
});