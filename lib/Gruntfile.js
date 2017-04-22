module.exports = function(grunt) {

  require('matchdep').filterDev('grunt-*').forEach(grunt.loadNpmTasks);

  grunt.initConfig({
    jshint: {
      files: ['../javascripts/**/*.js'],
      options: {
        "esnext": true
      }
    },
    watch: {
      javascripts: {
        files: ['../javascripts/**/*.js'],
        tasks: ['jshint']
      }
    }
  });

  grunt.registerTask('default', ['jshint', 'watch']);
};