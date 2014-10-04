module.exports = function(grunt) {

  // Project configuration.
  grunt.initConfig({
    pkg: grunt.file.readJSON('./package.json'),
    concat: {
      options: {
        banner: '/*! <%= pkg.name %> \n by @spencermountain\n <%= grunt.template.today("yyyy-mm-dd") %> */\n',
        footer: ""
      },
      dist: {
        src: [
          './libs/d3_reduced.js',
          './libs/zepto_reduced.js',
          './libs/parseuri.js',
          './libs/colour.js',
          './coffeejs/index.js',
          './coffeejs/timeline.js',
        ],
        dest: './libs/all/all_concat.js'
      }
    },
    uglify: {
      do :{
        src: ['./libs/all/all_concat.js'],
        dest: './libs/all/all_concat.min.js'
      }
    }

  });

  // Load the plugin that provides the "uglify" task.
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-concat');

  grunt.registerTask('default', ['concat', 'uglify']);

};