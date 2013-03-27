module.exports = function(grunt) {
	'use strict';

	// Project configuration.
	grunt.initConfig({
		pkg: grunt.file.readJSON('package.json'),

		///////////////
		// Server Stuff
		///////////////
		server: {
			script: 'server/index.js'
		},

		regarde: {
			serverjs: {
				files: ['server/*.js', 'server/models/*.js', 'server/routes/*.js' ],
				tasks: ['jshint:server', 'express-server'], 
				spawn: true
			},
			clientjs: {
				files: ['app/scripts/**/**/*.js'],
				tasks: ['jshint:client'],
				spawn: true
			},
			css: {
				files: '**/*.scss',
				events: true
			}
		},

		// watch: {
		// 	server: {
		// 		files:  ['server/*.js', 'server/models/*.js', 'server/routes/*.js'],
		// 		tasks:  ['express-server']
		// 	}
		// },

		jshint: {
			server: ['Gruntfile.js', 'server/**/*.js'],
			client: ['app/scripts/*.js','app/scripts/controllers/*.js'],
			options: {
				curly: true,
				eqeqeq: true,
				immed: true,
				latedef: true,
				newcap: true,
				noarg: true,
				sub: true,
				undef: false,
				boss: true,
				eqnull: true,
				smarttabs: true,
				browser: true,
				node: true,
				strict: true,
				globalstrict: true
			},
			globals: {
				angular: true,
				module: true
			}
		},
		///////////////
		// Build Stuff
		///////////////
		clean: {
			dist: ['dist', 'temp'],
			temp: ['temp']
		},

		copy: {
			temp: {
				files: [
					{expand: true, cwd: 'app/scripts/vendor', src: ['**'], dest: 'temp/app/scripts/vendor'},
					{expand: true, cwd: 'app/', src: ['*'], dest: 'temp/app/'},
					{expand: true, cwd: 'app/fonts', src: ['*'], dest: 'temp/app/fonts'},
					{expand: true, cwd: 'server/views', src: ['**'], dest: 'temp/server/views'},
					{expand: true, cwd: '', src: ['package.json'], dest: 'temp'}
				]
			},
			dist: {
				files: [
					{expand: true, cwd: 'temp', src: ['**'], dest: 'dist/'},
					{expand: true, cwd: 'temp', src: ['**'], dest: 'dist/'}
				]
			}
		},
		
		rev: {
			js: 'temp/app/scripts/*.js',
			css: 'temp/app/styles/*.css'//,
			//img: 'temp/app/img/*'  <---- Usemin doesn't seem to be replacing the names in the css files
		},

		imagemin: {                          // Task
			dist: {                            // Target
				options: {                       // Target options
					optimizationLevel: 3
				},
				files: {                         // Dictionary of files
					'temp/app/img': 'app/img/**'
				}
			}
		},
		
		manifest: {
			generate: {
				options: {
					basePath: "temp",
					//cache: ["scripts/**/*.js", "styles/*.css"]
					//network: ["http://*", "https://*"],
					//preferOnline: true,
					verbose: true,
					timestamp: true
				},
				src: [
						"app/scripts/*.js",
						"app/styles/*.css"
				],
				dest: "temp/app/manifest.appcache"
			}
		},




		useminPrepare: {
				html: ['temp/server/views/index.ejs'],
				options: {
					dest: 'temp/app/'
				}
		},
		
		usemin: {
				html: ['temp/server/views/index.ejs'],
				css: ['temp/app/styles/*.css'],
				options:{
					basedir: 'temp/app',
					dirs: ['temp/app/styles', 'temp/app/scripts', 'temp/app/img']
				}
		}

	});

	grunt.loadNpmTasks('grunt-contrib');
	grunt.loadNpmTasks('grunt-usemin');
	grunt.loadNpmTasks('grunt-rev');
	grunt.loadNpmTasks('grunt-manifest');
	grunt.loadNpmTasks('grunt-express-server');
	grunt.loadNpmTasks('grunt-regarde');


	// Default task(s).
	grunt.registerTask('build', ['clean:dist', 'copy:temp', 'useminPrepare', 'imagemin', 'concat', 'uglify', 'cssmin', 'rev', 'manifest', 'usemin', 'copy:dist', 'clean:temp']);
	grunt.registerTask('default', ['jshint', 'express-server', 'regarde' ]);

};