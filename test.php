<?php
	//Here we load stylesheets and assets for the calculator plugin.
	wp_enqueue_style( 'calculator-style1', CC__PLUGIN_URI . 'css/bootstrap.min.css', false, '1.0', 'all');
	wp_enqueue_style( 'calculator-style2', CC__PLUGIN_URI . 'css/calculator_style.css', false, '1.0', 'all' );
	wp_enqueue_style( 'calculator-style3', CC__PLUGIN_URI . 'vendor/chart/chart.css', false, '1.0', 'all' );
 
/*
 * @example Safe usage: $current_user = wp_get_current_user();
 * if ( ! ( $current_user instanceof WP_User ) ) {
 *     return;
 * }
 */

global $current_user;
$current_user = wp_get_current_user();
$user_id = $current_user->ID;
$user_login = $current_user->user_login;
$user_email = $current_user->user_email;
?>

<!-- <meta name="viewport" content="width=device-width, initial-scale=1.0"> -->
<div class="container calculator_container row">
	<input type="hidden" name="userid" class="user_id" value="<?php echo $user_id; ?>">
	<input type="hidden" name="user_login" class="user_login" value="<?php echo $user_login; ?>">
	<input type="hidden" name="user_email" class="user_email" value="<?php echo $user_email; ?>">
	<input type="hidden" name="num_page" class="current_page" value="34">	
	<div class="result_section">
		<div class="col-12 col-md-12 col-sm-12 calculator_body">
			<!-- Your compensation structure is complete! -->
			<div class="page34  step row caculator_configurator active">
				<div class="back_div">
					<label>
						<img class="back_icon" src="<?php echo plugins_url('/img/menu_arrow_prev.png', __FILE__); ?>">
						Back
					</label>
				</div>				
				<div class="row header_title">
					<label>Your compensation structure is complete!</label>
				</div>
				<div class="row">
					<div class="col-12 col-md-6 col-xs-12 left_half">
						<div class="row">
							<label class="sub_title">format</label>
							<span><span class="small_text format_text">Salary + Comimission</span>&nbsp;<img class="question_icon" data-type="format" src="<?php echo plugins_url('/img/help-web-button 1.png', __FILE__); ?>"></span>
						</div>
						<div class="row">
							<label class="sub_title">Base Salary</label>
							<span class="small_text"><span class="base_salary">$5,000</span> per month &nbsp;<img class="question_icon" data-type="base salary" src="<?php echo plugins_url('/img/help-web-button 1.png', __FILE__); ?>"></span>
						</div>
						<div class="row">
							<label class="sub_title">Commission Percentage</label>
							<span class="small_text"><span class="commission_percent">5</span>% of <span class="isProfitRevenue">revenue</span> &nbsp;<img class="question_icon" data-type="commission percentage" src="<?php echo plugins_url('/img/help-web-button 1.png', __FILE__); ?>"></span>
						</div>
						<div class="row bonus_row">
							<label class="sub_title">Bonuses</label>
							<ul>
								<img class="question_icon extra_icon" data-type="bonus" src="<?php echo plugins_url('/img/help-web-button 1.png', __FILE__); ?>">
								<li><span class="small_text">+$500 bonus per month for acheiving outbound prospecting targets</span></li>
								<li><span class="small_text">+$100 bonus per occurence for outbound prospecting performance</span></li>
							</ul>							
						</div>
					</div>
					<div class="col-12 col-md-6 col-xs-12 right_half">
						<div class="row">
							<label class="sub_title">Terms</label>
							<span class="small_text">Comissions are earned a maximum of once per customer &nbsp;<img class="question_icon" data-type="term" src="<?php echo plugins_url('/img/help-web-button 1.png', __FILE__); ?>"></span>
						</div>
						<div class="row save_div ">
							<div class="col-12 col-md-3 col-xs-12">
								<button class="save_btn">Save</button>
							</div>
							<div class="col-12 col-md-9 col-xs-12">
								<span class="small_text">Configuration for future editing</span>
							</div>							
						</div>
						<div class="row share_div ">
							<div class="col-12 col-md-3 col-xs-12">
								<button class="share_btn">Share</button>
							</div>
							<div class="col-12 col-md-9 col-xs-12">
								<span class="small_text">Your structure with others</span>
							</div>
						</div>
					</div>
				</div>
				<div class="col-12 col-md-12 col-xs-12 row">
					<div class="button_div">
						<button class="col-12 col-md-3 col-xs-12 faq_btn">FAQs</button>
					</div>
				</div>
			</div>
		</div>
	</div>
</div>


<!-- Edit salary modal -->
<div id="salary_edit_modal" class="modal fade" role="dialog">
    <div class="modal-dialog">
	    <!-- Modal content-->
	    <div class="modal-content">
	      <div class="modal-header">
	        <label class="modal-title">Please enter your base salary.</label><br>
	        <span>This will impact your commission percentage.</span>
	      </div>
	      <div class="modal-body">
	        <div class="input_div">				
				<span>$<input type="text" name="salary" class="salary" /></span>				
			</div>
	      </div>
	      <div class="modal-footer">
	        <button type="button" class="btn btn-default">Confirm</button>
	      </div>
	    </div>
    </div>
</div>

<!-- Recommendation modal -->
<div id="recommendation_modal" class="modal fade" role="dialog">
    <div class="modal-dialog">
	    <!-- Modal content-->
	    <div class="modal-content">
	      <div class="modal-header">
	        <label class="modal-title"><span class="title_description">We recommend you pay commission as a</span><br> <b class="type_replace">base salary</b></label>

	      </div>
	      <div class="modal-body">
	      	<div class="row">
	      		<span class="show_for_multiple hidden">Such as:</span>
	      	</div>	      	
	      	<ul>
	        	<li>Reps must work on-site in a city with a high cost of living</li>
	        	<li>Your company has a history of high-earning, commissioned sales rep and a proven path to earning over $100k</li>
	        </ul>
	      </div>
	    </div>
    </div>
</div>

<!-- Share modal -->
<div id="share_modal" class="modal fade" role="dialog">
    <div class="modal-dialog">
	    <!-- Modal content-->
	    <div class="modal-content">
	      <div class="modal-header">
	        <label class="modal-title">Here is your share link.</label>
	      </div>
	      <div class="modal-body">
	      	<div class="input-group">
			  <input type="text" class="share_link" readonly="" value="">
			  <button type="button">Copy</button>
			</div>
	      </div>
	    </div>
    </div>
</div>
<?php
	//load scripts
	wp_enqueue_script( 'calculator-script1', CC__PLUGIN_URI . 'js/bootstrap.min.js', array ( 'jquery' ), 1.0, true);
	wp_enqueue_script( 'calculator-script2', CC__PLUGIN_URI . 'js/cleave.min.js', array ( 'jquery' ), 1.0, true);
	// wp_enqueue_script( 'calculator-script4', CC__PLUGIN_URI . 'js/calculator.js', array ( 'jquery' ), 1.0, true);
	wp_enqueue_script( 'calculator-script3', CC__PLUGIN_URI . 'vendor/chart/chart.js', array ( 'jquery' ), 1.0, true);
	
?>