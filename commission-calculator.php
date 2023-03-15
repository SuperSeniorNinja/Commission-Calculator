<?php
	/*
	Plugin Name: Commission calculator
	Plugin URI: https://example.com
	description: All-in-one commission calculator which helps people conduct their commission fees.
	Version: 1.0
	Author: Mr. Webster
	Author URI: https://example.com
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

	/* Custom Ajax */
	// Localize the script with new data
	$some_object = array(
	    'ajax_url' => admin_url( 'admin-ajax.php' )
	);

	
	function my_theme_wp_enqueue_scripts() {
    	wp_enqueue_script( 'calculator-script4', CC__PLUGIN_URI . 'js/calculator.js', array ( 'jquery' ), 1.0, true);
    	$protocol = isset( $_SERVER['HTTPS'] ) ? 'https://' : 'http://';
     
 		// Output admin-ajax.php URL with same protocol as current pag
 		$params = array(
			'ajaxurl' =>  admin_url( 'admin-ajax.php', $protocol )
		);

 		wp_localize_script( 'calculator-script4', 'ajax_obj', $params);
    }
   add_action('wp_enqueue_scripts', 'my_theme_wp_enqueue_scripts');

   function data_custom_ajax(){    
         $data = $_POST['data'];
         $user_id = $_POST['user_id'];
         $user_login = $_POST['user_login'];
         $user_email = $_POST['user_email'];
         /*$res = stripslashes($data[0]);
         $json = json_decode($res, true);*/

         //remove slashes in the json data

         $total_data_string = json_encode($data, JSON_UNESCAPED_SLASHES);

         //save data to custom table in DB
         global $wpdb;
			$table = $wpdb->prefix.'calculator';
			$data = array('user_id' => $user_id, 'user_login' => $user_login, 'user_email' => $user_email, 'data' => $total_data_string);
			$format = array('%d','%s','%s','%s');
			//check if this user data already exists. If yes, we update. Otherwise, add a new row
			$query = "SELECT * FROM $table WHERE user_id = %d AND user_login = '%s' AND user_email = '%s'";
			$result = $wpdb->get_results(sprintf($query, $user_id, $user_login, $user_email));

			if($result && count($result) > 0){//data exists
				$row_id = $result[0]->id;
				$data_update = array('data' => $total_data_string);
				$data_where = array('id' => $row_id);
				$wpdb->update($table , $data_update, $data_where);
				$response = "updated";
			}
			else{ //add a new row
				$wpdb->insert($table,$data,$format);
				$my_id = $wpdb->insert_id;
				$response = "added".$my_id;
			}

         echo json_encode(array("response"=>$response));
         die;
    }

    add_action('wp_ajax_nopriv_data_custom_ajax', 'data_custom_ajax');
    add_action('wp_ajax_data_custom_ajax', 'data_custom_ajax');

   
   //when collaborator/co-worker is trying share link.
   add_action('parse_request', 'my_custom_url_handler');

	function my_custom_url_handler() {
	   $request_uri = $_SERVER["REQUEST_URI"];
	   $user_id;
	   if( isset($_GET["user_id"]) && strpos( $request_uri, "/share/?" ) !== false) {
		   $user_id = $_GET["user_id"];

		   //save data to custom table in DB
	      global $wpdb;
			$table = $wpdb->prefix.'calculator';
			$data = array('user_id' => $user_id, 'user_login' => $user_login, 'user_email' => $user_email, 'data' => $total_data_string);
			$format = array('%d','%s','%s','%s');
			//check if this user data already exists. If yes, we update. Otherwise, add a new row
			$query = "SELECT * FROM $table WHERE user_id = %d";
			$result = $wpdb->get_results(sprintf($query, $user_id));

			//extract information
			$user_id = $result[0]->user_id;
			$user_login = $result[0]->user_login;
			$user_email = $result[0]->user_email;
			$data = $result[0]->data;
			$json_data = json_decode($data, true);
			//var_dump($json_data); exit();

			//load styles for the share 
			/*wp_enqueue_style( 'calculator-style1', CC__PLUGIN_URI . 'css/bootstrap.min.css', false, '1.0', 'all');
			wp_enqueue_style( 'calculator-style2', CC__PLUGIN_URI . 'css/calculator_style.css', false, '1.0', 'all' );
			wp_enqueue_style( 'calculator-style3', CC__PLUGIN_URI . 'vendor/chart/chart.css', false, '1.0', 'all' );*/
			//Here we load/include share page for the visitor
			//require_once( ABSPATH . '/wp-includes/pluggable.php' );
			//require_once( CC__PLUGIN_DIR . 'test.php');

			wp_enqueue_script( 'calculator-script4', CC__PLUGIN_URI . 'js/calculator.js', array ( 'jquery' ), 1.0, true);
	    	$protocol = isset( $_SERVER['HTTPS'] ) ? 'https://' : 'http://';
	     
	 		// Output admin-ajax.php URL with same protocol as current pag
	 		$params = array(
				'ajaxurl' =>  admin_url( 'admin-ajax.php', $protocol ),
				'data' => $json_data,
				'user_id' => $user_id,
				'user_login' => $user_login,
				'user_email' => $user_email,
			);

	 		wp_localize_script( 'calculator-script4', 'ajax_obj', $params);
		}
	}

   
	//echo $user_id;exit();
	/*require_once( CC__PLUGIN_URI . 'class.CC.php' );
	require_once( CC__PLUGIN_URI . 'class.CC-widget.php' );
	require_once( CC__PLUGIN_DIR . 'class.CC-rest-widget.php' );*/

?>
