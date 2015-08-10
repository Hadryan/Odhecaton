module.exports = function(config) {
  config.set({

    basePath: '',

    frameworks: ['jasmine'],

    files: [
      'app/bower_components/jquery/dist/jquery.js',
      'app/bower_components/angular/angular.js',
      'app/bower_components/angular-resource/angular-resource.js',
      'app/bower_components/angular-route/angular-route.js',
      'app/bower_components/angular-sanitize/angular-sanitize.js',
      'app/bower_components/angular-material/angular-material.js',
      'app/bower_components/angular-animate/angular-animate.js',
      'app/bower_components/angular-aria/angular-aria.js',
      'app/bower_components/ngInfiniteScroll/build/ng-infinite-scroll.js',
      'app/bower_components/angular-mocks/angular-mocks.js',
      'app/bower_components/angular-material/angular-material-mocks.js',
      'app/js/**/*.js',
      'test/unit/**/*.js',
      'app/templates/*.html'
    ],

    preprocessors: {
      'app/templates/*.html': 'ng-html2js'
    },

    ngHtml2JsPreprocessor: {
      stripPrefix: 'app/',
    },

    browsers: ['PhantomJS'],

    logLevel: config.LOG_INFO,

    autoWatch: true,

    singleRun: false
  });
};
