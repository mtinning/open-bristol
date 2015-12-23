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
              presets: "es2015"
            }]
          ],
        },
        browserifyOptions: {
          paths: ["./node_modules", "./src/app"]
        },
        files: {
          "../OpenBristol.Web/dist/**/*.js": [ "./src/app/**/*.js" ]
        }
      }
    },
    babel: {
      options: {
        presets: ["es2015"]
      },
      dist: {
        files: [{
          expand: true,
          cwd: "src/app",
          src: ["**/*.js"],
          dest: "../OpenBristol.Web/dist"
        }]
      }
    },
    watch: {
      html: {
        files: [ appPath + "/**/*.html" ],
        tasks: ["html"],
        options: {
          spawn: false
        }
      },
      scripts: {
        files: [ appPath + "/**/*.js" ],
        tasks: ["scripts"],
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
          dest: destPath + "/dist/"
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
          dest: destPath + "/dist/"
        } ]
      },
      css: {
        files: [ {
          expand: true,
          cwd: appPath,
          src: ["**/*.css"],
          dest: destPath + "/css/"
        } ]
      },
      dep: {
        files: [ {
          expand: true,
          cwd: "./jspm_packages",
          src: "**",
          dest: destPath + "/dist/jspm_packages"
        }, {
          src: "*.js",
          dest: destPath + "/dist/"
        }]
      }
    }
  });

  grunt.loadNpmTasks("grunt-browserify");
  grunt.loadNpmTasks("grunt-contrib-watch");
  grunt.loadNpmTasks("grunt-contrib-copy");

  grunt.registerTask("html", ["copy:html"]);
  grunt.registerTask("scripts", ["copy:scripts"]);
  grunt.registerTask("css", ["copy:css"]);

  grunt.registerTask("watch:all", ["watch:html", "watch:scripts", "watch:css"]);

  grunt.registerTask("dev", ["copy:dep", "html", "scripts", "css"])
  grunt.registerTask('default', ["dev", "watch"]);
}
