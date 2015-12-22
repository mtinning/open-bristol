module.exports = function(grunt) {
  require('load-grunt-tasks')(grunt); //npm install --save-dev load-grunt-tasks

  var path = require('path'),
      destPath = "../OpenBristol.Web",
      appPath = "./src/app/";

  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    browserify: {
      dist: {
        options: {
          transform: [
            ["babelify", {
              presets: ["es2015"]
            }]
          ],
          browserifyOptions: {
            paths: [
              './node_modules/',
              appPath
            ]
          }
        },
        files: {
          "../OpenBristol.Web/dist/boot.js": [ appPath + "/boot.js" ]
        }
      }
    },
    watch: {
      html: {
        files: [ appPath + "/**/*.html" ],
        tasks: ["scripts"],
        options: {
          spawn: false
        }
      },
      scripts: {
        files: [ appPath + "/**/*.js" ],
        tasks: ["html"],
        options: {
          spawn: false
        }
      },
      css: {
        files: [ appPath + "/**/*.css" ],
        tasks: ["css"],
        options: {
          spawn: false
        }
      }
    },
    copy: {
      html: {
        files: [ {
          expand: true,
          cwd: appPath,
          src: ["**/*.html"],
          dest: destPath + "/views/"
        }, {
          expand: true,
          cwd: "./src",
          src: ["index.html"],
          dest: destPath + "/views/"
        }]
      },
      scripts: {
        files: [ {
          expand: true,
          cwd: appPath,
          src: ["**/*.js"],
          dest: destPath + "/scripts/"
        } ]
      },
      css: {
        files: [ {
          expand: true,
          cwd: appPath,
          src: ["**/*.css"],
          dest: destPath + "/css/"
        } ]
      }
    }
  });

  grunt.loadNpmTasks("grunt-browserify");
  grunt.loadNpmTasks("grunt-contrib-watch");
  grunt.loadNpmTasks("grunt-contrib-copy");

  grunt.registerTask("html", ["copy:html"]);
  grunt.registerTask("scripts", ["browserify"]);
  grunt.registerTask("css", ["copy:css"]);

  grunt.registerTask("watch:all", ["watch:html", "watch:scripts", "watch:css"]);

  grunt.registerTask("dev", ["html", "scripts", "css"])
  grunt.registerTask('default', ["dev", "watch"]);
}
