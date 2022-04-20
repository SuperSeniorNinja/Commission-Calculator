<?php
	/*
	Plugin Name: Commission calculator for Spencer Smith
	Plugin URI: https://predrag.com
	description: All-in-one commission calculator which helps people conduct their commission fees.
	Version: 1.0
	Author: Mr. Predrag
	Author URI: https://predrag.com
	License: GPL2
	*/

	define( 'CC_VERSION', '1.0.0' );
	define( 'CC__MINIMUM_WP_VERSION', '1.0' );
	define( 'CC__PLUGIN_DIR', plugin_dir_path( __FILE__ ) );
	define( 'CC__PLUGIN_URI', plugin_dir_url( __FILE__ ) );
	define( 'CC_DELETE_LIMIT', 100000 );

	//activation & deactivation hook functions if needed.
	register_activation_hook( __FILE__, 'commission_calculator_activation_function' );
	register_deactivation_hook( __FILE__, 'commission_calculator_deactivation_function' );

	/*function commission_calculator_activation_function(){
		echo "plugin activation triggered";exit();
	}

	function commission_calculator_deactivation_function(){
		echo "plugin deactivation triggered";exit();
	}*/

	//register shortcode for the commission calculator
	function commission_calculator_shortcode_function(){

		//Here we load calculator templates
		require_once( CC__PLUGIN_DIR . 'calculator.php');

		//check if shortcode works properly
		/*$shortcode_test_html = "<h1>Shortcode works here!</h1>";
		return $shortcode_test_html;*/
	}

	function register_shortcodes(){
		add_shortcode('calculator_shortcode', 'commission_calculator_shortcode_function');
	}

	add_action( 'init', 'register_shortcodes' );

	/*require_once( CC__PLUGIN_URI . 'class.CC.php' );
	require_once( CC__PLUGIN_URI . 'class.CC-widget.php' );
	require_once( CC__PLUGIN_DIR . 'class.CC-rest-widget.php' );*/

?>