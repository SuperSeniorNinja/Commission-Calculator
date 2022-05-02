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
	<input type="hidden" name="num_page" class="current_page" value="25">
	<div class="questions_section row">
		<div class="col-12 col-md-3 col-sm-12 calculator_sidebar">
			<div class="progressbar">
				<label>Progress</label>
				<div class="progress_div" id="progressDivId">
		            <div class="progress-bars" id="progressBar"></div>
		            <div class="percent" id="percent">0%</div>
		        </div>
			</div>
			<div class="sidebar_text_div">
				<label>Your compensation structure (so far)</label>
				<ul class="selection_sidebar">
				</ul>
			</div>
		</div>
		<div class="col-12 col-md-9 col-sm-12 calculator_body">
			<div class="back_div"><!-- We don't show "<-Back on the 1st page" -->
				<label>
					<img class="back_icon" src="<?php echo plugins_url('/img/menu_arrow_prev.png', __FILE__); ?>">
					Back
				</label>
			</div>
			
			<div class="page1  step row ">
				<div class="header_line">
					<label class="page_title">Choose Compensation Format</label>
				</div>
				<div class="answer_div col-12 col-md-6  col-sm-12">
					<div class="row">
						<label>This tool was designed to created base Salary + Commission plans.</label>
					</div>
					<div class="row">
						<label>This is a guaranteed base salary plus a performance incentive such as a percentage of revenue or profit, or fixed bonuses.</label>
					</div>
					<div class="row">
						<label>We don't recommend using salary-only or commission-only for any full time sales roles.</label>
					</div>
					<!-- <div class="answer_option col-12 col-md-12 col-sm-12">
						<label>Salary Only</label>
						<span class="hidden">i.e. Finding leads; Qualifying; Scheduling appointments or demos</span>
					</div>
					<div class="answer_option col-12 col-md-12 col-sm-12">
						<label>Commission Only</label>
						<span class="hidden">i.e. Making the sale</span>
					</div>
					<div class="answer_option col-12 col-md-12 col-sm-12">
						<label>Salary + Commission</label>
						<span class="hidden">i.e. Continuously selling to customers after first sale</span>
					</div>
					<div class="answer_option col-12 col-md-12 col-sm-12">
						<label>Commission Draw</label>
						<span class="hidden">i.e. Leading a small team or co-managing</span>
					</div> -->
				</div>
				<div class="button_div">
					<button class="next_btn">Next</button>
				</div>
			</div>

			<!-- <div class="page2 step row">
				<div class="header_line">
					<label class="page_title">Choose Commission Types</label>
				</div>
				<div class="answer_div col-12 col-md-8  col-sm-12">
					<div class="answer_option col-12 col-md-12 col-sm-12">
						<label>Revenue</label>
						<span class="hidden">i.e. Finding leads; Qualifying; Scheduling appointments or demos</span>
					</div>
					<div class="answer_option col-12 col-md-12 col-sm-12">
						<label>Profit</label>
						<span class="hidden">i.e. Making the sale</span>
					</div>
					<div class="answer_option col-12 col-md-12 col-sm-12">
						<label>Bonuses</label>
						<span class="hidden">i.e. Continuously selling to customers after first sale</span>
					</div>
					<div class="answer_option col-12 col-md-12 col-sm-12">
						<label>Managing Sales Reps</label>
						<span class="hidden">i.e. Leading a small team or co-managing</span>
					</div>
				</div>
			</div> -->

			<!-- commission_types/prospecting -->
			<div class="page3 step row ">
				<div class="header_line">
					<label class="page_title">Check all that apply:</label>
				</div>
				<div class="answer_div col-12 col-md-8  col-sm-12">
					<div class="answer_option col-12 col-md-12 col-sm-12">
						<label>Reps will have consistent inbound leads </label>
						<span class="hidden">(commission -1)</span>
					</div>
					<div class="answer_option col-12 col-md-12 col-sm-12">
						<label>Most sales will come from outbound prospecting or cold outreach</label>
						<span class="hidden">(commission +1)</span>
					</div>
					<div class="answer_option col-12 col-md-12 col-sm-12">
						<label>Most outbound leads are warm (e.g. old customers, referrals, they're familiar with us, etc.)</label>
						<span class="hidden">(commission -1)</span>
					</div>
					<div class="answer_option col-12 col-md-12 col-sm-12">
						<label>Most outbound leads are cold (i.e. they've never heard of us, they're not expecting our call)</label>
						<span class="hidden">(commission +1)</span>
					</div>
					<div class="answer_option col-12 col-md-12 col-sm-12">
						<label>Leads and contact information are not provided to the rep; they have to find this on their own.</label>
						<span class="hidden">(commission +1)</span>
					</div>
					<div class="answer_option col-12 col-md-12 col-sm-12">
						<label>We have access to high quality, accurate, up to date contact information for leads, allowing sales reps to connect directly with decision makers</label>
						<span class="hidden">(commission -1)</span>
					</div>
				</div>
				<div class="button_div">
					<button class="next_btn">Next</button>
				</div>
			</div>

			<!-- commission_types/Managing Accounts -->
			<div class="page4 step row ">
				<div class="header_line">
					<label class="page_title">What's the potential for added revenue from accounts?</label>
				</div>
				<div class="answer_div col-12 col-md-8  col-sm-12">
					<div class="answer_option col-12 col-md-12 col-sm-12">
						<label>Low</label>
						<span class="hidden">(Most accounts are already at full potential. Few upsells or cross sells)</span>
					</div>
					<div class="answer_option col-12 col-md-12 col-sm-12">
						<label>Medium</label>
						<span class="hidden">(Most accounts have potential to double their revenue or volume)</span>
					</div>
					<div class="answer_option col-12 col-md-12 col-sm-12">
						<label>High</label>
						<span class="hidden">(Most accounts are in their infancy and anything is possible)</span>
					</div>
				</div>
			</div>

			<!-- Check All that apply if you choose Closing -->
			<div class="page26 step row ">
				<div class="header_line">
					<label class="page_title">Choose all that apply.</label><br>
				</div>
				<div class="answer_div col-12 col-md-8  col-sm-12">
					Approximately how many leads per month will be given to the sales rep? 

					<div class="answer_option col-12 col-md-12 col-sm-12">
						<label>Fair</label>
						<span class="hidden">i.e. Few qualified and low conversion rates</span>
					</div>
					<div class="answer_option col-12 col-md-12 col-sm-12">
						<label>Good</label>
						<span class="hidden">i.e. Mostly qualified with decent conversion rates</span>
					</div>
					<div class="answer_option col-12 col-md-12 col-sm-12">
						<label>Hot</label>
						<span class="hidden">i.e. All qualified and ready to buy from any sales rep</span>
					</div>
					<div class="answer_option col-12 col-md-12 col-sm-12">
						<label>Unknown</label>
						<span class="hidden">i.e. Logic: same as "Fair"</span>
					</div>
				</div>
			</div>

			<!-- What are the rep's responsibilities? -->
			<div class="page5 step row">
				<div class="header_line">
					<label class="page_title">What are the rep's responsibilities?</label><br>
					<label class="sub_header">Choose all that apply.<!--  Hover for more information. --></label>
				</div>
				<div class="answer_div col-12 col-md-8  col-sm-12">
					<div class="answer_option col-12 col-md-12 col-sm-12">
						<label>Prospecting</label>
						<span class="hidden">i.e. Finding leads; Qualifying; Scheduling appointments or demos</span>
					</div>
					<div class="answer_option col-12 col-md-12 col-sm-12">
						<label>Closing</label>
						<span class="hidden">i.e. Making the sale</span>
					</div>
					<div class="answer_option col-12 col-md-12 col-sm-12">
						<label>Managing Accounts</label>
						<span class="hidden">i.e. Continuously selling to customers after first sale</span>
					</div>
					<div class="answer_option col-12 col-md-12 col-sm-12">
						<label>Managing Sales Reps</label>
						<span class="hidden">i.e. Leading a small team or co-managing</span>
					</div>
				</div>
				<div class="button_div">
					<button class="next_btn">Next</button>
				</div>
			</div>

			<!--commission types/Managing other sales reps   -->
			<div class="page6 step row">
				<div class="header_line">
					<label class="page_title">Do managed reps earn commissions?</label>
				</div>
				<div class="answer_div col-12 col-md-8  col-sm-12">
					<div class="answer_option col-12 col-md-12 col-sm-12">
						<label>Yes</label>
					</div>
					<div class="answer_option col-12 col-md-12 col-sm-12">
						<label>No</label>
					</div>
				</div>
			</div>

			<!--commission types/Managing other sales reps /No  -->
			<div class="page7 step row">
				<div class="header_line">
					<label class="page_title">Do managed reps have quotas?</label>
				</div>
				<div class="answer_div col-12 col-md-8  col-sm-12">
					<div class="answer_option col-12 col-md-12 col-sm-12">
						<label>Yes</label>
					</div>
					<div class="answer_option col-12 col-md-12 col-sm-12">
						<label>No</label>
					</div>
				</div>
			</div>

			<!-- Do you want to incentivize reps for beneficial activities and milestones, or just sales? -->
			<div class="page8 step row">
				<div class="header_line">
					<label class="page_title">Do you want to incentivize reps for beneficial activities and milestones, or just sales?</label>
					<label class="sub_header">You may want to consider adding fixed bonuses to encourage important behaviors or success signals, such as a $100 bonus for appointments with new customers. </label>
				</div>
				<div class="answer_div col-12 col-md-8  col-sm-12">
					<div class="answer_option col-12 col-md-12 col-sm-12">
						<label>Add bonuses</label>
					</div>
					<div class="answer_option col-12 col-md-12 col-sm-12">
						<label>Don't add bonuses. Sales should be the only incentive</label>
					</div>
				</div>
			</div>

			<!-- if user already chose rep responsibilities -->
			<div class="page9 step row ">
				<div class="header_line">
					<label class="page_title">Based on the job responsibilities you selected,
					consider adding some of these bonuses:</label>
					<label class="sub_header">Click each bonus for information and examples</label>
				</div>
				<div class="answer_div col-12 col-md-8  col-sm-12">
					<div class="answer_option col-12 col-md-12 col-sm-12">
						<label>KPI attainment bonus for outbound prospecting</label>
					</div>
					<div class="answer_option col-12 col-md-12 col-sm-12">
						<label>Performance bonus for outbound prospecting</label>
					</div>
					<div class="answer_option col-12 col-md-12 col-sm-12">
						<label>KPI attainment bonus for inbound prospecting</label>
					</div>
				</div>
				<div class="button_div">
					<button class="next_btn">Finished adding bonuses</button>
				</div>
			</div>

			<!-- if user did not choose rep responsibilities -->
			<div class="page10 step row">
				<div class="header_line">
					<label class="page_title">Here are some examples of common fixed bonuses. </label>
					<label class="sub_header">Click each bonus for information and examples</label>
				</div>
				<div class="answer_div col-12 col-md-8  col-sm-12">					
					<div class="answer_option col-12 col-md-12 col-sm-12">
						<label>KPI attainment bonus for outbound prospecting</label>
					</div>
					<div class="answer_option col-12 col-md-12 col-sm-12">
						<label>Performance bonus for outbound prospecting</label>
					</div>
					<div class="answer_option col-12 col-md-12 col-sm-12">
						<label>KPI attainment bonus for inbound prospecting</label>
					</div>
					<div class="answer_option col-12 col-md-12 col-sm-12">
						<label>All other bonuses.....</label>
					</div>
				</div>
				<div class="button_div">
					<button class="next_btn">Finished adding bonuses</button>
				</div>
			</div>

			<!-- Check all that apply just below page10 multiple -->
			<div class="page11 step row">
				<div class="header_line">
					<label class="page_title">Check all that apply.</label>
				</div>
				<div class="answer_div col-12 col-md-8  col-sm-12">
					<div class="answer_option col-12 col-md-12 col-sm-12">
						<label>We have more than 3 sales reps</label>
					</div>
					<div class="answer_option col-12 col-md-12 col-sm-12">
						<label>A small group of sales reps outperform a much larger, middle-of-the-pack group</label>
					</div>
					<div class="answer_option col-12 col-md-12 col-sm-12">
						<label>Most rep's sales tend to plateau after a predictable number of years (or monthly sales)</label>
					</div>
					<div class="answer_option col-12 col-md-12 col-sm-12">
						<label>None of the above</label>
					</div>
				</div>
				<div class="button_div">
					<button class="next_btn">Next</button>
				</div>
			</div>

			<!-- Choose Commission Frequncy -->
			<!-- <div class="page12 step row ">
				<div class="header_line">
					<label class="page_title">Choose Commission Frequency</label>
				</div>
				<div class="answer_div col-12 col-md-8  col-sm-12">
					<div class="answer_option col-12 col-md-12 col-sm-12">
						<label>One-time commission</label>
					</div>
					<div class="answer_option col-12 col-md-12 col-sm-12">
						<label>Recurring commission (capped)</label>
					</div>
					<div class="answer_option col-12 col-md-12 col-sm-12">
						<label>Recurring commission (uncapped)</label>
					</div>
				</div>
			</div> -->

			<!-- How do customers pay for products? -->
			<div class="page13 step row">
				<div class="header_line">
					<label class="page_title">How do customers pay for products?</label>
				</div>
				<div class="answer_div col-12 col-md-8  col-sm-12">
					<div class="answer_option col-12 col-md-12 col-sm-12">
						<label>All at once</label>
						<span class="hidden">i.e. Non-subscription, Pay-as-you-go</span>
					</div>
					<div class="answer_option col-12 col-md-12 col-sm-12">
						<label>Recurring payments</label>
						<span class="hidden">i.e. Subscription, SaaS</span>
					</div>
				</div>
			</div>

			<!-- Who is responsible for continued sales and health of the account after the initial sale? -->
			<div class="page14 step row ">
				<div class="header_line col-12 col-md-8 col-sm-12">
					<label class="page_title">Who is responsible for continued sales and health of the account after the initial sale?</label>
				</div>
				<div class="answer_div col-12 col-md-8  col-sm-12">
					<div class="answer_option col-12 col-md-12 col-sm-12">
						<label>Another rep</label>
						<span class="hidden">i.e. Account manager, Customer success rep</span>
					</div>
					<div class="answer_option col-12 col-md-12 col-sm-12">
						<label>Original sales rep</label>
						<span class="hidden">is responsible for managing and farming the account post-sale</span>
					</div>
				</div>
			</div>

			<!-- Slect one below page14 -->
			<div class="page15 step row ">
				<div class="header_line">
					<label class="page_title">Select one:</label>
				</div>
				<div class="answer_div col-12 col-md-8  col-sm-12">
					<div class="answer_option col-12 col-md-12 col-sm-12">
						<label>Fixed (monthly)</label>
						<span class="hidden">Customers pay a fixed amount based on subscription tier</span>
					</div>
					<div class="answer_option col-12 col-md-12 col-sm-12">
						<label>Variable</label>
						<span class="hidden">Customers pay a variable amount based on usage, seasonality, etc</span>
					</div>
					<div class="answer_option col-12 col-md-12 col-sm-12">
						<label>Fixed (annual)</label>
						<span class="hidden">Customers pay an annual fixed fee based on subscription tier</span>
					</div>
				</div>
			</div>

			<!--Do sales reps negotiate prices with customers?  -->
			<div class="page16 step row">
				<div class="header_line">
					<label class="page_title">Do sales reps negotiate prices with customers?</label>
				</div>
				<div class="answer_div col-12 col-md-8  col-sm-12">
					<div class="answer_option col-12 col-md-12 col-sm-12">
						<label>Yes</label>
					</div>
					<div class="answer_option col-12 col-md-12 col-sm-12">
						<label>No</label>
					</div>
				</div>
			</div>

			<!-- Do sales reps have control over the cost of goods sold or expenses on each sale?   -->
			<div class="page17 step row ">
				<div class="header_line">
					<label class="page_title">Do sales reps have control over the cost of goods sold or expenses on each sale?</label>
				</div>
				<div class="answer_div col-12 col-md-8  col-sm-12">
					<div class="answer_option col-12 col-md-12 col-sm-12">
						<label>Yes</label>
					</div>
					<div class="answer_option col-12 col-md-12 col-sm-12">
						<label>No</label>
					</div>
				</div>
			</div>

			<!-- Should sales reps try to push customers into buying products/services with a higher profit margin? -->
			<div class="page18 step row ">
				<div class="header_line">
					<label class="page_title">Should sales reps try to push customers into buying products/services with a higher profit margin?</label>
					<label class="sub_header">Note: this won't always align with your customer's goal of purchasing the best product for them. </label>
				</div>
				<div class="answer_div col-12 col-md-8  col-sm-12">
					<div class="answer_option col-12 col-md-12 col-sm-12">
						<label>Yes</label>
					</div>
					<div class="answer_option col-12 col-md-12 col-sm-12">
						<label>No</label>
					</div>
				</div>
			</div>

			<!-- Choose Base Pay -->
			<!-- <div class="page19 step row ">
				<div class="header_line">
					<label class="page_title">Should sales reps try to push customers into buying products/services with a higher profit margin?</label>
					<label class="sub_header">Note: this won't always align with your customer's goal of purchasing the best product for them. </label>
				</div>
				<div class="answer_div col-12 col-md-8  col-sm-12">
					<div class="answer_option col-12 col-md-12 col-sm-12">
						<label>Base Pay 1</label>
					</div>
					<div class="answer_option col-12 col-md-12 col-sm-12">
						<label>Base Pay 2</label>
					</div>
					<div class="answer_option col-12 col-md-12 col-sm-12">
						<label>Base Pay 3</label>
					</div>
					<div class="answer_option col-12 col-md-12 col-sm-12">
						<label>Base Pay 4</label>
					</div>
				</div>
			</div> -->

			<!-- Are reps required to work on-site in an office? -->
			<div class="page20 step row">
				<div class="header_line">
					<label class="page_title">Are reps required to work on-site in an office?</label>
				</div>
				<div class="answer_div col-12 col-md-8  col-sm-12">
					<div class="answer_option col-12 col-md-12 col-sm-12">
						<label>Remote work</label>
					</div>
					<div class="answer_option col-12 col-md-12 col-sm-12">
						<label>Must work on-site</label>
					</div>
				</div>
			</div>

			<!-- where? -->
			<div class="page21 step row ">
				<div class="header_line">
					<label class="page_title">Where?</label>
				</div>
				<div class="answer_div col-12 col-md-8  col-sm-12">
					<div class="answer_option col-12 col-md-12 col-sm-12">
						<label>High cost of living location</label>
						<span class="hidden">e.g. NYC, California, Seattle, Miami</span>
					</div>
					<div class="answer_option col-12 col-md-12 col-sm-12">
						<label>Anywhere else</label>
					</div>
				</div>
			</div>

			<!-- Do reps have a clear, proven path to sales success? In other words, have other reps succeeded in this role before?  -->
			<div class="page22 step row">
				<div class="header_line">
					<label class="page_title">Do reps have a clear, proven path to sales success? In other words, have other reps succeeded in this role before? </label>
				</div>
				<div class="answer_div col-12 col-md-8  col-sm-12">
					<div class="answer_option col-12 col-md-12 col-sm-12">
						<label>We have a history of high-earning, commissioned sales rep and a proven path to success</label>
					</div>
					<div class="answer_option col-12 col-md-12 col-sm-12">
						<label>We've never had high-earning commissioned sales reps in this role</label>
					</div>
				</div>
			</div>

			<!-- How much have your good sales reps earned in base + commission? -->
			<div class="page23 step row ">
				<div class="header_line">
					<label class="page_title">How much have your good sales reps earned in base + commission?</label>
				</div>
				<div class="answer_div col-12 col-md-8  col-sm-12">
					<div class="answer_option col-12 col-md-12 col-sm-12">
						<label>Over $100k</label>
					</div>
					<div class="answer_option col-12 col-md-12 col-sm-12">
						<label>Under $100k</label>
					</div>
				</div>
			</div>

			<!-- just below page 23 -->
			<div class="page24 step row">
				<div class="header_line">
					<!-- <label class="page_title">No title</label> -->
					<label class="sub_header">Choose all that apply.</label>
				</div>
				<div class="answer_div col-12 col-md-8  col-sm-12">
					<div class="answer_option col-12 col-md-12 col-sm-12">
						<label>Our company, product or service is well-known in our industry</label>
						<span class="hidden">(subtract $250)</span>
					</div>
					<div class="answer_option col-12 col-md-12 col-sm-12">
						<label>Reps work less than 8 hours per day on average</label>
						<span class="hidden">(subtract $250)</span>
					</div>
					<div class="answer_option col-12 col-md-12 col-sm-12">
						<label>Reps are given benefits such as insurance and 401k</label>
						<span class="hidden">(subtract $250)</span>
					</div>
					<div class="answer_option col-12 col-md-12 col-sm-12">
						<label>Our industry is complex and can be difficult to master. Some prior experience in our industry is a must.</label>
						<span class="hidden">(add $500)</span>
					</div>
				</div>
			</div>

			<!-- We recommend a base salary of around -->
			<div class="page25 step row active">
				<div class="header_line">
					<label class="page_title">We recommend a base salary of around</label>
					<div class="input_div">
						<input type="text" name="salary" class="base_salary" value="$4,000" readonly="" />
						<span>per month</span>
					</div>
					<label class="sub_header">Due to:</label>
				</div>
				<div class="answer_div col-12 col-md-8  col-sm-12">
					<div class="answer_option col-12 col-md-12 col-sm-12">
						<label>On-site work</label>
					</div>
					<div class="answer_option col-12 col-md-12 col-sm-12">
						<label>High cost of living state</label>					
					</div>
					<div class="answer_option col-12 col-md-12 col-sm-12">
						<label>Well known in our industry</label>					
					</div>
					<div class="answer_option col-12 col-md-12 col-sm-12">
						<label>Under 8hr work days</label>
					</div>
					<div class="answer_option col-12 col-md-12 col-sm-12">
						<label>Benefits (insurance, 401k)</label>
					</div>
					<div class="answer_option col-12 col-md-12 col-sm-12">
						<label>Need for experienced reps </label>
					</div>
					<div class="button_div">
						<button class="edit_salary_btn" data-toggle="modal" data-target="#salary_edit_modal">Edit salary</button>
						<button class="next_btn">Next</button>
					</div>
				</div>				
			</div>

			<!-- Determine commission values -->
			<div class="page27 step row ">
				<div class="header_line">
					<label class="page_title">Determine Commission Values</label>	
				</div>
				<div class="answer_div col-12 col-md-8  col-sm-12">
					<div class="answer_option col-12 col-md-12 col-sm-12">
						<label>Value 1</label>
					</div>
					<div class="answer_option col-12 col-md-12 col-sm-12">
						<label>Value 2</label>
					</div>
					<div class="answer_option col-12 col-md-12 col-sm-12">
						<label>Value 3</label>
					</div>
				</div>
			</div>

			<!-- choose one -->
			<div class="page28 step row ">
				<div class="header_line">
					<label class="page_title">Choose one:</label>	
				</div>
				<div class="answer_div col-12 col-md-8  col-sm-12">
					<div class="answer_option col-12 col-md-12 col-sm-12">
						<label>This is an existing sales role and we have past sales data available</label>
					</div>
					<div class="answer_option col-12 col-md-12 col-sm-12">
						<label>Our company is new but we have previous experience selling this product</label>
					</div>
					<div class="answer_option col-12 col-md-12 col-sm-12">
						<label>Our company is established but we've never sold this product before</label>
					</div>
					<div class="answer_option col-12 col-md-12 col-sm-12">
						<label>Our company is new and we have no experience selling this product</label>
					</div>
				</div>
			</div>

			<!-- Commission Frequncy chosen results option pages -->
			<div class="page29 step row">
				<!-- <div class="header_line">
					<label class="page_title">We recommend a base salary of around</label>				
					<label class="sub_header">Due to:</label>
				</div> -->
				<div class="answer_div col-12 col-md-8  col-sm-12">
					<div class="div_section div_question1">
						<div class="row">
							<label>What's your average monthly <span>profit</span> per customer?</label>
						</div>
						<div class="row">
							<div class="input_div">							
								<span>$<input type="text" name="average_revenue_profit" class="average_revenue_profit" value="500" min="1" /></span>
							</div>
						</div>
					</div>
					<div class="div_section div_question2">
						<div class="row">
							<label>What's the average number of new customers per rep, per month?</label>
						</div>
						<div class="row">
							<div class="input_div">							
								<input type="number" name="average_rep" class="average_rep"/ value="5" min="1">
							</div>
						</div>
					</div>
					<div class="div_section div_question3">
						<div class="row">
							<label>What percentage of customers cancel each month?</label>
						</div>
						<div class="row">
							<div class="input_div">
								<input type="text" name="percentage_cancel" class="percentage_cancel"/ value="10" min="1">%
							</div>
						</div>
					</div>
				</div>
				<div class="button_div">
					<button class="next_btn">Confirm</button>
				</div>
			</div>

			<!-- commision percentage color overlaied table -->
			<div class="page30 step row  caculator_configurator">
				<table>
					<thead>
						<tr>
							<td></td>
							<td>Horrible month</td>
							<td>Worse month</td>
							<td>Worse month</td>
							<td>Worse month</td>
							<td>Bad month</td>
							<td>Average month</td>
							<td>Good month</td>
							<td>Better month</td>
							<td>Better month</td>
							<td>Better month</td>
							<td>Great month</td>
						</tr>
						<tr>
							<td></td>
							<td>0 deal</td>
							<td>1 deal</td>
							<td>2 deals</td>
							<td>3 deals</td>
							<td>4 deals</td>
							<td>5 deals</td>
							<td>6 deals</td>
							<td>7 deals</td>
							<td>8 deals</td>
							<td>9 deals</td>
							<td>10 deals</td>
						</tr>
					</thead>
					<tbody>
						<tr>
							<td>1%</td>
							<td>0</td>
							<td>$100</td>
							<td>$200</td>
							<td>$300</td>
							<td>$400</td>
							<td>$500</td>
							<td>$600</td>
							<td>$700</td>
							<td>$800</td>
							<td>$900</td>
							<td>$1000</td>
						</tr>
						<tr>
							<td>2%</td>
							<td>0</td>
							<td>$200</td>
							<td>$400</td>
							<td>$600</td>
							<td>$800</td>
							<td>$1000</td>
							<td>$1200</td>
							<td>$1400</td>
							<td>$1600</td>
							<td>$1800</td>
							<td>$2000</td>
						</tr>
						<tr>
							<td>3%</td>
							<td>0</td>
							<td>$300</td>
							<td>$600</td>
							<td>$900</td>
							<td>$1200</td>
							<td>$1500</td>
							<td>$1800</td>
							<td>$2100</td>
							<td>$2400</td>
							<td>$2700</td>
							<td>$3000</td>
						</tr>
						<tr>
							<td>4%</td>
							<td>0</td>
							<td>$400</td>
							<td>$800</td>
							<td>$1200</td>
							<td>$1600</td>
							<td>$2000</td>
							<td>$2400</td>
							<td>$2800</td>
							<td>$3200</td>
							<td>$3600</td>
							<td>$4000</td>
						</tr>
						<tr>
							<td>5%</td>
							<td>0</td>
							<td>$500</td>
							<td>$1000</td>
							<td>$1500</td>
							<td>$2000</td>
							<td>$2500</td>
							<td>$3000</td>
							<td>$3500</td>
							<td>$4000</td>
							<td>$4500</td>
							<td>$5000</td>
						</tr>
						<tr>
							<td>6%</td>
							<td>0</td>
							<td>$600</td>
							<td>$1200</td>
							<td>$1800</td>
							<td>$2400</td>
							<td>$3000</td>
							<td>$3600</td>
							<td>$4200</td>
							<td>$4800</td>
							<td>$5400</td>
							<td>$6000</td>
						</tr>
						<tr>
							<td>7%</td>
							<td>0</td>
							<td>$700</td>
							<td>$1400</td>
							<td>$2100</td>
							<td>$2800</td>
							<td>$3500</td>
							<td>$4200</td>
							<td>$4900</td>
							<td>$5600</td>
							<td>$6300</td>
							<td>$7000</td>
						</tr>
						<tr>
							<td>8%</td>
							<td>0</td>
							<td>$800</td>
							<td>$1600</td>
							<td>$2400</td>
							<td>$3200</td>
							<td>$4000</td>
							<td>$4800</td>
							<td>$5600</td>
							<td>$6400</td>
							<td>$7200</td>
							<td>$8000</td>
						</tr>
						<tr>
							<td>9%</td>
							<td>0</td>
							<td>$900</td>
							<td>$1800</td>
							<td>$2700</td>
							<td>$3600</td>
							<td>$4500</td>
							<td>$5400</td>
							<td>$6300</td>
							<td>$7200</td>
							<td>$8100</td>
							<td>$9000</td>
						</tr>
						<tr>
							<td>10%</td>
							<td>0</td>
							<td>$1000</td>
							<td>$2000</td>
							<td>$3000</td>
							<td>$4000</td>
							<td>$5000</td>
							<td>$6000</td>
							<td>$7000</td>
							<td>$8000</td>
							<td>$9000</td>
							<td>$10000</td>
						</tr>
						<tr>
							<td>11%</td>
							<td>0</td>
							<td>$1100</td>
							<td>$2200</td>
							<td>$3300</td>
							<td>$4400</td>
							<td>$5500</td>
							<td>$6600</td>
							<td>$7700</td>
							<td>$8800</td>
							<td>$9900</td>
							<td>$11000</td>
						</tr>
						<tr>
							<td>12%</td>
							<td>0</td>
							<td>$1200</td>
							<td>$2400</td>
							<td>$3600</td>
							<td>$4800</td>
							<td>$6000</td>
							<td>$7200</td>
							<td>$9000</td>
							<td>$10800</td>
							<td>$12000</td>
							<td>$13200</td>
						</tr>
						<tr>
							<td>13%</td>
							<td>0</td>
							<td>$1300</td>
							<td>$2600</td>
							<td>$3900</td>
							<td>$5200</td>
							<td>$6500</td>
							<td>$7800</td>
							<td>$9100</td>
							<td>$10400</td>
							<td>$11700</td>
							<td>$13000</td>
						</tr>
						<tr>
							<td>14%</td>
							<td>0</td>
							<td>$1400</td>
							<td>$2800</td>
							<td>$4200</td>
							<td>$5600</td>
							<td>$7000</td>
							<td>$8400</td>
							<td>$9800</td>
							<td>$11200</td>
							<td>$12600</td>
							<td>$14000</td>
						</tr>
						<tr>
							<td>15%</td>
							<td>0</td>
							<td>$1500</td>
							<td>$3000</td>
							<td>$4500</td>
							<td>$6000</td>
							<td>$7500</td>
							<td>$9000</td>
							<td>$10500</td>
							<td>$12000</td>
							<td>$13500</td>
							<td>$15000</td>
						</tr>
						<tr>
							<td>16%</td>
							<td>0</td>
							<td>$1600</td>
							<td>$3200</td>
							<td>$4800</td>
							<td>$6400</td>
							<td>$8000</td>
							<td>$9600</td>
							<td>$11200</td>
							<td>$12800</td>
							<td>$14400</td>
							<td>$16000</td>							
						</tr>
						<tr>
							<td>17%</td>
							<td>0</td>
							<td>$1700</td>
							<td>$3400</td>
							<td>$5100</td>
							<td>$6800</td>
							<td>$8500</td>
							<td>$10200</td>
							<td>$11900</td>
							<td>$13600</td>
							<td>$15300</td>
							<td>$17000</td>							
						</tr>
						<tr>
							<td>18%</td>
							<td>0</td>
							<td>$1800</td>
							<td>$3600</td>
							<td>$5400</td>
							<td>$7200</td>
							<td>$9000</td>
							<td>$10800</td>
							<td>$12600</td>
							<td>$14400</td>
							<td>$16200</td>
							<td>$18000</td>							
						</tr>
						<tr>
							<td>19%</td>
							<td>0</td>
							<td>$1900</td>
							<td>$3800</td>
							<td>$5700</td>
							<td>$7600</td>
							<td>$9500</td>
							<td>$11400</td>
							<td>$13300</td>
							<td>$15200</td>
							<td>$17100</td>
							<td>$19000</td>							
						</tr>
						<tr>
							<td>20%</td>
							<td>0</td>
							<td>$2000</td>
							<td>$4000</td>
							<td>$6000</td>
							<td>$8000</td>
							<td>$10000</td>
							<td>$12000</td>
							<td>$14000</td>
							<td>$16000</td>
							<td>$18000</td>
							<td>$20000</td>							
						</tr>
					</tbody>
				</table>
			</div>

			<!-- Determine Bonuses -->
			<div class="page277 step row">
				<div class="header_line">
					<label class="page_title">Determine Commission Values</label>	
				</div>
				<div class="section">
					<label class="sub_header">1. Determine Amount</label>
					<div class="row">
						<input type="number" name="bonus1" class="bonus1" placeholder="💲(number)" />
						bonus per 
						<select>
							<option>(select one)</option>
							<option>Month</option>
							<option>Quarter</option>
							<option>Year</option>
							<option>Occurrence</option>
						</select>
						for achieving outbound prospecting targets  (e.g. monthly bonus if averaging over 30 new records per day)
					</div>
				</div>
				<div class="answer_div col-12 col-md-8  col-sm-12">
					<div class="answer_option col-12 col-md-12 col-sm-12">
						<label>On-site work</label>
					</div>
					<div class="answer_option col-12 col-md-12 col-sm-12">
						<label>High cost of living state</label>					
					</div>
					<div class="answer_option col-12 col-md-12 col-sm-12">
						<label>Well known in our industry</label>					
					</div>
					<div class="answer_option col-12 col-md-12 col-sm-12">
						<label>Under 8hr work days</label>
					</div>
					<div class="answer_option col-12 col-md-12 col-sm-12">
						<label>Benefits (insurance, 401k)</label>
					</div>
					<div class="answer_option col-12 col-md-12 col-sm-12">
						<label>Need for experienced reps </label>
					</div>
				</div>
				<div class="button_div">
					<button class="edit_salary_btn" data-toggle="modal" data-target="#salary_edit_modal">Edit salary</button>
					<button class="next_btn">Next</button>
				</div>
			</div>
		</div>
	</div>
	<div class="result_section hidden">
		<div class="col-12 col-md-12 col-sm-12 calculator_body">
			<!-- commision percentage color overlaied table -->
			<div class="page31 step row caculator_configurator">
				<div class="back_div">
					<label>
						<img class="back_icon" src="<?php echo plugins_url('/img/menu_arrow_prev.png', __FILE__); ?>">
						Back
					</label>
				</div>
				<!-- <div class="row">
					<label>We recommend a commission of</label>
					<span><input type="number" name="commission_percent" class="commission_percent" readonly/>% of <span>revenue</span></span>
					<span class="subheader">Here's how much the rep will earn depending on how good (or bad) of a month they have:</span>
				</div> -->
				<div class="row commission_percent_control_div">
					<label>We recommend a commission of</label>
					<div class="flex_div">
						<img class="commission_minus" data-direction="minus" src="<?php echo plugins_url('/img/menu_arrow_prev.png', __FILE__); ?>" style="">
						<input type="number" name="commission_percent" class="commission_percent" readonly/>
						<img class="commission_plus" data-direction="plus" src="<?php echo plugins_url('/img/menu_arrow_prev.png', __FILE__); ?>" style="">
					</div>
					<label>% of <span class="pink_txt">revenue</span></label>
					<div class="explanation_for_min_exceed">
						<span class="red_txt">Maximum recommended value reached.<br>
						Click “Advanced Options” if you need to change inputs. </span>
					</div>					
					<label class="subheader">Here's how much the rep will earn depending on how good (or bad) of a month they have:</label>
				</div>
				<div class="switch_div">
					<div class="row">
						<div class="col-6 col-md-6 col-xs-12 text_div">
							<label>Commission</label>
						</div>
						<div class="col-6 col-md-6 col-xs-12 text_div">
							<label>Revenue</label>
						</div>
					</div>
					<div class="row">
						<div class="col-6 col-md-6 col-xs-12 switch_item black_bg">
						</div>
						<div class="col-6 col-md-6 col-xs-12 switch_item red_bg">
						</div>
					</div>												
				</div>
				<table>
					<thead>
						<tr>
							<td></td>
							<td>Horrible month</td>
							<td>Worse month</td>
							<td>Worse month</td>
							<td>Worse month</td>
							<td>Bad month</td>
							<td>Average month</td>
							<td>Good month</td>
							<td>Better month</td>
							<td>Better month</td>
							<td>Better month</td>
							<td>Great month</td>
						</tr>
						<tr>
							<td></td>
							<td>0 deal</td>
							<td>1 deal</td>
							<td>2 deals</td>
							<td>3 deals</td>
							<td>4 deals</td>
							<td>5 deals</td>
							<td>6 deals</td>
							<td>7 deals</td>
							<td>8 deals</td>
							<td>9 deals</td>
							<td>10 deals</td>
						</tr>
					</thead>
					<tbody>
						<tr>
							<td>1%</td>
							<td>0</td>
							<td>$100</td>
							<td>$200</td>
							<td>$300</td>
							<td>$400</td>
							<td>$500</td>
							<td>$600</td>
							<td>$700</td>
							<td>$800</td>
							<td>$900</td>
							<td>$1000</td>
						</tr>						
					</tbody>
				</table>
				<div class="button_div row">
					<button class="col-12 col-md-1 col-xs-12 good_btn next_btn">Looks good</button>
					<button class="col-12 col-md-1 col-xs-12 edit_commission_calculator ">Edit commission values</button>
					<button class="col-12 col-md-1 col-xs-12 advanced_options_btn">Advanced options</button>
				</div>
			</div>

			<!-- custom configurator -->
			<div class="page32 step row caculator_configurator">
				<div class="row header_title">
					<label>Custom Configurator</label>
				</div>
				<div class="row flex_div">
					<div class="col-12 col-md-3 col-xs-12">
						<div class="sidebar_option">
							<div class="row">
								<label>Options</label>
							</div>
							<div class="input_div row">
								<span>Average deals per month: <input type="number" name="average_deals" class="average_deals"/></span>
							</div>
							<div class="input_div row">
								<span>Average <span class="pink_txt">revenue/profit</span> per deal: <input type="text" name="average_revenue" class="average_revenue"/></span>
							</div>
							<div class="row">
								<span>Recommended commission percentage: <span class="recommended_percent">X</span>%</span>
							</div>
						</div>
						<div class="sidebar_advanced_option">
							<div class="row">
								<label>Advanced Options</label>
							</div>
							<div class="input_div row">				
								<span class="fs14">Deal variation: <span class="red-txt fs13"><input type="text" name="deal_variation" class="deal_variation red-txt" value="20" />% (default)</span></span>
							</div>
							<div class="input_div row">				 
								<span class="fs14">Commission variation: <span class="red-txt fs13"><input type="number" name="commission_variation" class="commission_variation red-txt" value="1" />% (default)</span></span>
							</div>
							<div class="input_div row">
								<span class="fs14">Commission modifier: <span class="red-txt fs13"><input type="number" name="commission_modifier" class="commission_modifier red-txt" value="0" />(based on user answers)</span></span>
							</div>
							<div class="input_div row">
								<span class="fs14">Recommendation variance: <span class="red-txt fs13"><input type="number" name="recommendation_variance" class="recommendation_variance red-txt" value="60" />% above average (default)</span></span>
							</div>
						</div>
					</div>
					<div class="col-12 col-md-9 col-xs-12">
						<table>
							<thead>
								<tr>
									<td></td>
									<td>Horrible month</td>
									<td>Worse month</td>
									<td>Worse month</td>
									<td>Worse month</td>
									<td>Bad month</td>
									<td>Average month</td>
									<td>Good month</td>
									<td>Better month</td>
									<td>Better month</td>
									<td>Better month</td>
									<td>Great month</td>
								</tr>
								<tr>
									<td></td>
									<td>0 deal</td>
									<td>1 deal</td>
									<td>2 deals</td>
									<td>3 deals</td>
									<td>4 deals</td>
									<td>5 deals</td>
									<td>6 deals</td>
									<td>7 deals</td>
									<td>8 deals</td>
									<td>9 deals</td>
									<td>10 deals</td>
								</tr>
							</thead>
							<tbody>
								<tr>
									<td>1%</td>
									<td>0</td>
									<td>$100</td>
									<td>$200</td>
									<td>$300</td>
									<td>$400</td>
									<td>$500</td>
									<td>$600</td>
									<td>$700</td>
									<td>$800</td>
									<td>$900</td>
									<td>$1000</td>
								</tr>
								<tr>
									<td>2%</td>
									<td>0</td>
									<td>$200</td>
									<td>$400</td>
									<td>$600</td>
									<td>$800</td>
									<td>$1000</td>
									<td>$1200</td>
									<td>$1400</td>
									<td>$1600</td>
									<td>$1800</td>
									<td>$2000</td>
								</tr>
								<tr>
									<td>3%</td>
									<td>0</td>
									<td>$300</td>
									<td>$600</td>
									<td>$900</td>
									<td>$1200</td>
									<td>$1500</td>
									<td>$1800</td>
									<td>$2100</td>
									<td>$2400</td>
									<td>$2700</td>
									<td>$3000</td>
								</tr>
								<tr>
									<td>4%</td>
									<td>0</td>
									<td>$400</td>
									<td>$800</td>
									<td>$1200</td>
									<td>$1600</td>
									<td>$2000</td>
									<td>$2400</td>
									<td>$2800</td>
									<td>$3200</td>
									<td>$3600</td>
									<td>$4000</td>
								</tr>
								<tr>
									<td>5%</td>
									<td>0</td>
									<td>$500</td>
									<td>$1000</td>
									<td>$1500</td>
									<td>$2000</td>
									<td>$2500</td>
									<td>$3000</td>
									<td>$3500</td>
									<td>$4000</td>
									<td>$4500</td>
									<td>$5000</td>
								</tr>
								<tr>
									<td>6%</td>
									<td>0</td>
									<td>$600</td>
									<td>$1200</td>
									<td>$1800</td>
									<td>$2400</td>
									<td>$3000</td>
									<td>$3600</td>
									<td>$4200</td>
									<td>$4800</td>
									<td>$5400</td>
									<td>$6000</td>
								</tr>
								<tr>
									<td>7%</td>
									<td>0</td>
									<td>$700</td>
									<td>$1400</td>
									<td>$2100</td>
									<td>$2800</td>
									<td>$3500</td>
									<td>$4200</td>
									<td>$4900</td>
									<td>$5600</td>
									<td>$6300</td>
									<td>$7000</td>
								</tr>
								<tr>
									<td>8%</td>
									<td>0</td>
									<td>$800</td>
									<td>$1600</td>
									<td>$2400</td>
									<td>$3200</td>
									<td>$4000</td>
									<td>$4800</td>
									<td>$5600</td>
									<td>$6400</td>
									<td>$7200</td>
									<td>$8000</td>
								</tr>
								<tr>
									<td>9%</td>
									<td>0</td>
									<td>$900</td>
									<td>$1800</td>
									<td>$2700</td>
									<td>$3600</td>
									<td>$4500</td>
									<td>$5400</td>
									<td>$6300</td>
									<td>$7200</td>
									<td>$8100</td>
									<td>$9000</td>
								</tr>
								<tr>
									<td>10%</td>
									<td>0</td>
									<td>$1000</td>
									<td>$2000</td>
									<td>$3000</td>
									<td>$4000</td>
									<td>$5000</td>
									<td>$6000</td>
									<td>$7000</td>
									<td>$8000</td>
									<td>$9000</td>
									<td>$10000</td>
								</tr>
								<tr>
									<td>11%</td>
									<td>0</td>
									<td>$1100</td>
									<td>$2200</td>
									<td>$3300</td>
									<td>$4400</td>
									<td>$5500</td>
									<td>$6600</td>
									<td>$7700</td>
									<td>$8800</td>
									<td>$9900</td>
									<td>$11000</td>
								</tr>
								<tr>
									<td>12%</td>
									<td>0</td>
									<td>$1200</td>
									<td>$2400</td>
									<td>$3600</td>
									<td>$4800</td>
									<td>$6000</td>
									<td>$7200</td>
									<td>$9000</td>
									<td>$10800</td>
									<td>$12000</td>
									<td>$13200</td>
								</tr>
								<tr>
									<td>13%</td>
									<td>0</td>
									<td>$1300</td>
									<td>$2600</td>
									<td>$3900</td>
									<td>$5200</td>
									<td>$6500</td>
									<td>$7800</td>
									<td>$9100</td>
									<td>$10400</td>
									<td>$11700</td>
									<td>$13000</td>
								</tr>
								<tr>
									<td>14%</td>
									<td>0</td>
									<td>$1400</td>
									<td>$2800</td>
									<td>$4200</td>
									<td>$5600</td>
									<td>$7000</td>
									<td>$8400</td>
									<td>$9800</td>
									<td>$11200</td>
									<td>$12600</td>
									<td>$14000</td>
								</tr>
								<tr>
									<td>15%</td>
									<td>0</td>
									<td>$1500</td>
									<td>$3000</td>
									<td>$4500</td>
									<td>$6000</td>
									<td>$7500</td>
									<td>$9000</td>
									<td>$10500</td>
									<td>$12000</td>
									<td>$13500</td>
									<td>$15000</td>
								</tr>
								<tr>
									<td>16%</td>
									<td>0</td>
									<td>$1600</td>
									<td>$3200</td>
									<td>$4800</td>
									<td>$6400</td>
									<td>$8000</td>
									<td>$9600</td>
									<td>$11200</td>
									<td>$12800</td>
									<td>$14400</td>
									<td>$16000</td>							
								</tr>
								<tr>
									<td>17%</td>
									<td>0</td>
									<td>$1700</td>
									<td>$3400</td>
									<td>$5100</td>
									<td>$6800</td>
									<td>$8500</td>
									<td>$10200</td>
									<td>$11900</td>
									<td>$13600</td>
									<td>$15300</td>
									<td>$17000</td>							
								</tr>
								<tr>
									<td>18%</td>
									<td>0</td>
									<td>$1800</td>
									<td>$3600</td>
									<td>$5400</td>
									<td>$7200</td>
									<td>$9000</td>
									<td>$10800</td>
									<td>$12600</td>
									<td>$14400</td>
									<td>$16200</td>
									<td>$18000</td>							
								</tr>
								<tr>
									<td>19%</td>
									<td>0</td>
									<td>$1900</td>
									<td>$3800</td>
									<td>$5700</td>
									<td>$7600</td>
									<td>$9500</td>
									<td>$11400</td>
									<td>$13300</td>
									<td>$15200</td>
									<td>$17100</td>
									<td>$19000</td>							
								</tr>
								<tr>
									<td>20%</td>
									<td>0</td>
									<td>$2000</td>
									<td>$4000</td>
									<td>$6000</td>
									<td>$8000</td>
									<td>$10000</td>
									<td>$12000</td>
									<td>$14000</td>
									<td>$16000</td>
									<td>$18000</td>
									<td>$20000</td>							
								</tr>
							</tbody>
						</table>
					</div>
				</div>
				
				<div class="col-md-3 row">
					<div class="button_div">
						<button class="col-12 col-md-3 col-xs-12 back_btn">Back</button>
						<button class="col-12 col-md-3 col-xs-12 confirm_commission_configuration">Confirm</button>
					</div>
				</div>				
			</div>

			<!-- Determine bonuses -->
			<div class="page33  step row caculator_configurator">
				<div class="back_div">
					<label>
						<img class="back_icon" src="<?php echo plugins_url('/img/menu_arrow_prev.png', __FILE__); ?>">
						Back
					</label>
				</div>				
				<div class="row header_title">
					<label>Determine Bonuses</label>
				</div>
				<div class="row determine_amount">
					<div class="col-12 col-md-12 col-xs-12">
						<label class="sub_title">1. Determine Amount</label>
						<div class="row bonus_row">
							<span><input type="number" name="bonus2" class="bonus2 bonus_input" placeholder="$(number)" required=""> per 
							<select class="bonus2_period" required="">
								<option>(select one)</option>
								<option>Month</option>
								<option>Quarter</option>
								<option>Year</option>
								<option>Occurrence</option>
							</select>
							for achieving outbound prospecting targets  <span class="small_text">(e.g. monthly bonus if averaging over 30 new records per day)</span></span>
						</div>
						<div class="row bonus_row">
							<span><input type="number" name="bonus3" class="bonus3 bonus_input" placeholder="$(number)" required=""> per 
							<select class="bonus3_period" required="">
								<option>(select one)</option>
								<option>Month</option>
								<option>Quarter</option>
								<option>Year</option>
								<option>Occurrence</option>
							</select>
							for outbound prospecting performance  <span class="small_text">(e.g. $100 per qualified appointment scheduled)</span></span>
						</div>						
					</div>
					<div class="row add_bonus_div">
						<label><span class="">+</span>Add bonus</label>
					</div>
				</div>
				<div class="row adjust_base">
					<div class="col-12 col-md-12 col-xs-12">
						<label class="sub_title">2. Adjust Base</label><br>
						<span>You can reduce your base salary to offset up to $1,000 in bonuses. This may help ensure your reps are achieving goals, but<br> will make it harder to hire and find experienced talent (who prefer guaranteed salary to bonuses)</span>
					</div>
					<div class="col-12 col-md-12 col-xs-12 slider_row row">
						<div class="col-12 col-md-3 col-xs-12 tag_div">
							<span>CURRENT: &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span>
							<label>$4,000 &nbsp;<span>per month</span></label>
						</div>
						<div class="col-12 col-md-9 col-xs-12 range_div">
							<div class="row txt_c small_text mgb10">
								<span>drag slider to adjust base salary</span>
							</div>
							<div class="flex_div">
								<span>$0 &nbsp;</span>
								<input type="range" min="0" max="1000" value="500" class="slider" id="revenue_range">
								<span>&nbsp;$1,000</span>
							</div>							
						</div>
					</div>
					<div class="col-12 col-md-12 col-xs-12 text_row row">
						<div class="col-12 col-md-3 col-xs-12 tag_div">
							<span>NEW: &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span>
							<label class="new_bonus_slider">$3,500 </label>&nbsp;&nbsp;<span>per month</span>
						</div>
						<div class="col-12 col-md-9 col-xs-12 bonus_preview_div">
							<span>+$500 bonus per month for achieving outbound prospecting targets</span><br>
							<span>+$100 bonus per occurence for outbound prospecting performance</span>
						</div>
					</div>
				</div>				
				<div class="col-12 col-md-12 col-xs-12 row">
					<div class="button_div">
						<button class="col-12 col-md-3 col-xs-12 faq_btn">FAQs</button>
						<button class="col-12 col-md-3 col-xs-12 next_btn">Finish</button>
						<button class="col-12 col-md-3 col-xs-12 skip_btn">Skip</button>
					</div>
				</div>				
			</div>

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
							<span><span class="small_text format_text">Salary + Comimission</span>&nbsp;<img class="question_icon" data-type="format" src="<?php echo plugins_url('/img/help-web-button.png', __FILE__); ?>"></span>
						</div>
						<div class="row">
							<label class="sub_title">Base Salary</label>
							<span class="small_text"><span class="base_salary">$5,000</span> per month &nbsp;<img class="question_icon" data-type="base salary" src="<?php echo plugins_url('/img/help-web-button.png', __FILE__); ?>"></span>
						</div>
						<div class="row">
							<label class="sub_title">Commission Percentage</label>
							<span class="small_text"><span class="commission_percent">5</span>% of <span class="isProfitRevenue">revenue</span> &nbsp;<img class="question_icon" data-type="commission percentage" src="<?php echo plugins_url('/img/help-web-button.png', __FILE__); ?>"></span>
						</div>
						<div class="row bonus_row">
							<label class="sub_title">Bonuses</label>
							<ul>
								<img class="question_icon extra_icon" data-type="bonus" src="<?php echo plugins_url('/img/help-web-button.png', __FILE__); ?>">
								<li><span class="small_text">+$500 bonus per month for acheiving outbound prospecting targets</span></li>
								<li><span class="small_text">+$100 bonus per occurence for outbound prospecting performance</span></li>
							</ul>							
						</div>
					</div>
					<div class="col-12 col-md-6 col-xs-12 right_half">
						<div class="row">
							<label class="sub_title">Terms</label>
							<span class="small_text">Comissions are earned a maximum of once per customer &nbsp;<img class="question_icon" data-type="term" src="<?php echo plugins_url('/img/help-web-button.png', __FILE__); ?>"></span>
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

			<!-- Determine Temporary Salary boost -->
			<div class="page35 step row">
				<div class="back_div">
					<label>
						<img class="back_icon" src="<?php echo plugins_url('/img/menu_arrow_prev.png', __FILE__); ?>">
						Back
					</label>
				</div>				
				<div class="row header_title">
					<label>Determine Temporary Salary boost</label>
				</div>
				<div class="container">
					<div class="row determine_amount">
						<div class="col-12 col-md-12 col-xs-12">
							<label class="sub_title">1. Determine Amount</label>
							<div class="row bonus_row">
								<span><input type="number" name="temp_salary1" class="temp_salary1" placeholder="$(number)" required=""> Determine Temporary Salary boost  
								<input type="number" name="month_number1" class="month_number1" placeholder="(number, 1-99)" required="">
								and decreases by 
								<input type="number" name="temp_salary2" class="temp_salary2" placeholder="$0.00" required="">
								 each month.
							</div>
						</div>
					</div>
					<div class="switch_div">
						<div class="row">
							<div class="col-6 col-md-6 col-xs-12 text_div">
								<label>Commission</label>
							</div>
							<div class="col-6 col-md-6 col-xs-12 text_div">
								<label>Revenue</label>
							</div>
						</div>
						<div class="row">
							<div class="col-6 col-md-6 col-xs-12 switch_item black_bg">
							</div>
							<div class="col-6 col-md-6 col-xs-12 switch_item red_bg">
							</div>
						</div>												
					</div>
					<div class="row bar_div">						
						<!-- bar chart -->
						<div id="bar_div_commission">
						</div>
					</div>
				</div>
				<div class="col-12 col-md-12 col-xs-12 row">
					<div class="button_div">
						<button class="col-12 col-md-3 col-xs-12 faq_btn pull-left">FAQs</button>
						<button class="col-12 col-md-3 col-xs-12 next_btn">Finish</button>
						<button class="col-12 col-md-3 col-xs-12 skip_btn pull-right">Skip</button>
					</div>
				</div>
			</div>

			<!-- RAMP UP -->
			<div class="page36 step row">
				<div class="back_div">
					<label>
						<img class="back_icon" src="<?php echo plugins_url('/img/menu_arrow_prev.png', __FILE__); ?>">
						Back
					</label>
				</div>				
				<div class="row header_title">
					<label>Ramp-Up</label>
				</div>
				<div class="container">
					<div class="row">
						<span>Since your company isn't already selling this product, it will take some extra time for reps to get acclimated and fill a healthy sales pipeline. Here’s what that ramp up may look like:</span>
					</div>
					<div class="switch_div">
						<div class="row">
							<div class="col-6 col-md-6 col-xs-12 text_div">
								<label>Commission</label>
							</div>
							<div class="col-6 col-md-6 col-xs-12 text_div">
								<label>Revenue</label>
							</div>
						</div>
						<div class="row">
							<div class="col-6 col-md-6 col-xs-12 switch_item black_bg">
							</div>
							<div class="col-6 col-md-6 col-xs-12 switch_item red_bg">
							</div>
						</div>												
					</div>
					<div class="row bar_div">						
						<!-- bar chart -->
						<div id="bar_div_ramp">
						</div>
					</div>
				</div>
				<div class="col-12 col-md-12 col-xs-12 row">
					<div class="button_div">
						<button class="col-12 col-md-3 col-xs-12 faq_btn pull-left">FAQs</button>
						<button class="col-12 col-md-3 col-xs-12 next_btn">Finish</button>
						<button class="col-12 col-md-3 col-xs-12 skip_btn pull-right">Skip</button>
					</div>
				</div>
			</div>

			<!-- Commission Tiers-->
			<div class="page37 step row">
				<div class="back_div">
					<label>
						<img class="back_icon" src="<?php echo plugins_url('/img/menu_arrow_prev.png', __FILE__); ?>">
						Back
					</label>
				</div>				
				<div class="row header_title">
					<label>Commission Tiers</label>
				</div>
				<div class="row sub_title">
					<span>Add commission tiers below. Each tier must be a lower commission than the prior tier. <br>
					Select the “Unlimited” time period on your lowest, final tier to finish adding tiers.</span>
				</div>
				<div class="container">
					<div class="row">
						<div class="col-12 col-md-12 col-xs-12 tiers">
							<div class="row tier_div tier1">
								<input type="hidden" name="tier_percent" data-number="1" class="tier_percent tier" value="10">
								<span><label>Tier 1: </label>&nbsp;&nbsp; &nbsp;&nbsp; 10%&nbsp;&nbsp; commission for the first 
								<select class="tier_period1" name="tier_period">
									<option>(select time period)</option>
									<option>Unlimited</option>
									<?php
									for($i = 1; $i < 36; $i++){ ?>
										<option><?php echo $i; ?></option>
									<?php } ?>
								</select> months 
								<span class="small_text">(or until customer cancels )</span>
							</div>
							<div class="row tier_div tier2">
								<span><label>Tier 2: </label>&nbsp;&nbsp; 
									<input type="number" data-number="2" class="tier_percent tier2" name="tier_percent" max="100">%&nbsp;&nbsp; commission for 
								<select class="tier_period2" name="tier_period">
									<option>(select time period)</option>
									<option>Unlimited</option>
									<?php
									for($i = 1; $i < 36; $i++){ ?>
										<option><?php echo $i; ?></option>
									<?php } ?>
								</select> months 
								<span class="small_text">(or until customer cancels )</span>
							</div>							
						</div>
						<div class="col-12 col-md-12 col-xs-12">
							<div class="row add_tier_div">
								<label><span class="plus_icon">+</span><span>&nbsp;Add tier</span> </label>
							</div>
							<div class="row calculate_trigger_div">
								<label><span>Calculate</span></label>
							</div>
						</div>
					</div>
					<div class="switch_div">
						<div class="row">
							<div class="col-6 col-md-6 col-xs-12 text_div">
								<label>Commission</label>
							</div>
							<div class="col-6 col-md-6 col-xs-12 text_div">
								<label>Revenue</label>
							</div>
						</div>
						<div class="row">
							<div class="col-6 col-md-6 col-xs-12 switch_item black_bg">
							</div>
							<div class="col-6 col-md-6 col-xs-12 switch_item red_bg">
							</div>
						</div>												
					</div>
					<div class="row table_div">
						<table id="commission_tier3" class="light_red_bg commission_tier">
							<tbody>
								<tr>
									<td class="year_total">
										<div class="first_half">
											<div class="row"><label>YEAR 1 TOTAL</label></div>
											<div class="row"><span>100 active<br> customers</span></div>
										</div>
										<div class="second_half">
											<div class="row"><label><label class="total_commission">$35,000</label> commission</label><br>
											<label><label class="total_compensation">$83,000</label> total compensation</label></div>
										</div>
									</td>
									<td>
										<div class="first_half">
											<div class="row"><label>Month 1</label></div>
											<div class="row"><span>5 active<br> customers</span></div>
										</div>
										<div class="second_half">
											<div class="row"><label><label>0</label> / month</div>
										</div>
									</td>
									<td>
										<div class="first_half">
											<div class="row"><label>Month 2</label></div>
											<div class="row"><span>9 active<br> customers</span></div>
										</div>
										<div class="second_half">
											<div class="row"><label><label>$250</label> / month</label></div>
										</div>
									</td>
									<td>
										<div class="first_half">
											<div class="row"><label>Month 3</label></div>
											<div class="row"><span>13 active<br> customers</span></div>
										</div>
										<div class="second_half">
											<div class="row"><label><label>$500</label> / month</label></div>
										</div>
									</td>
									<td>
										<div class="first_half">
											<div class="row"><label>Month 4</label></div>
											<div class="row"><span>5 active<br> customers</span></div>
										</div>
										<div class="second_half">
											<div class="row"><label><label>$750</label> / month</label></div>
										</div>
									</td>
									<td>
										<div class="first_half">
											<div class="row"><label>Month 5</label></div>
											<div class="row"><span>9 active<br> customers</span></div>
										</div>
										<div class="second_half">
											<div class="row"><label><label>$1,000</label> / month</label></div>
										</div>
									</td>
									<td>
										<div class="first_half">
											<div class="row"><label>Month 6</label></div>
											<div class="row"><span>9 active<br> customers</span></div>
										</div>
										<div class="second_half">
											<div class="row"><label><label>$1,250</label> / month</label></div>
										</div>
									</td>
									<td>
										<div class="first_half">
											<div class="row"><label>Month 7</label></div>
											<div class="row"><span>9 active<br> customers</span></div>
										</div>
										<div class="second_half">
											<div class="row"><label><label>$1,500</label> / month</label></div>
										</div>
									</td>
									<td>
										<div class="first_half">
											<div class="row"><label>Month 8</label></div>
											<div class="row"><span>9 active<br> customers</span></div>
										</div>
										<div class="second_half">
											<div class="row"><label><label>$1,750</label> / month</label></div>
										</div>
									</td>
									<td>
										<div class="first_half">
											<div class="row"><label>Month 9</label></div>
											<div class="row"><span>9 active<br> customers</span></div>
										</div>
										<div class="second_half">
											<div class="row"><label><label>$2,000</label> / month</label></div>
										</div>
									</td>
									<td>
										<div class="first_half">
											<div class="row"><label>Month 10</label></div>
											<div class="row"><span>9 active<br> customers</span></div>
										</div>
										<div class="second_half">
											<div class="row"><label><label>$2,250</label> / month</label></div>
										</div>
									</td>
									<td>
										<div class="first_half">
											<div class="row"><label>Month 11</label></div>
											<div class="row"><span>9 active<br> customers</span></div>
										</div>
										<div class="second_half">
											<div class="row"><label><label>$2,500</label> / month</label></div>
										</div>
									</td>
									<td>
										<div class="first_half">
											<div class="row"><label>Month 12</label></div>
											<div class="row"><span>9 active<br> customers</span></div>
										</div>
										<div class="second_half">
											<div class="row"><label><label>$2,500</label> / month</label></div>
										</div>
									</td>
								</tr>
								<tr>
									<td class="year_total">
										<div class="first_half">
											<div class="row"><label>YEAR 2 TOTAL</label></div>
											<div class="row"><span>100 active<br> customers</span></div>
										</div>
										<div class="second_half">
											<div class="row"><label><label>$35,000</label> commission</label><br>
											<label><label>$83,000</label> total compensation</label></div>
										</div>
									</td>
									<td>
										<div class="first_half">
											<div class="row"><label>Month 13</label></div>
											<div class="row"><span>5 active<br> customers</span></div>
										</div>
										<div class="second_half">
											<div class="row"><label><label>0</label> / month</label></div>
										</div>
									</td>
									<td>
										<div class="first_half">
											<div class="row"><label>Month 14</label></div>
											<div class="row"><span>9 active<br> customers</span></div>
										</div>
										<div class="second_half">
											<div class="row"><label><label>$250</label> / month</label></div>
										</div>
									</td>
									<td>
										<div class="first_half">
											<div class="row"><label>Month 15</label></div>
											<div class="row"><span>13 active<br> customers</span></div>
										</div>
										<div class="second_half">
											<div class="row"><label><label>$500</label> / month</label></div>
										</div>
									</td>
									<td>
										<div class="first_half">
											<div class="row"><label>Month 16</label></div>
											<div class="row"><span>5 active<br> customers</span></div>
										</div>
										<div class="second_half">
											<div class="row"><label><label>$750</label> / month</label></div>
										</div>
									</td>
									<td>
										<div class="first_half">
											<div class="row"><label>Month 17</label></div>
											<div class="row"><span>9 active<br> customers</span></div>
										</div>
										<div class="second_half">
											<div class="row"><label><label>$1,000</label> / month</label></div>
										</div>
									</td>
									<td>
										<div class="first_half">
											<div class="row"><label>Month 18</label></div>
											<div class="row"><span>9 active<br> customers</span></div>
										</div>
										<div class="second_half">
											<div class="row"><label><label>$1,250</label> / month</label></div>
										</div>
									</td>
									<td>
										<div class="first_half">
											<div class="row"><label>Month 19</label></div>
											<div class="row"><span>9 active<br> customers</span></div>
										</div>
										<div class="second_half">
											<div class="row"><label><label>$1,500</label> / month</label></div>
										</div>
									</td>
									<td>
										<div class="first_half">
											<div class="row"><label>Month 20</label></div>
											<div class="row"><span>9 active<br> customers</span></div>
										</div>
										<div class="second_half">
											<div class="row"><label><label>$1,750</label> / month</label></div>
										</div>
									</td>
									<td>
										<div class="first_half">
											<div class="row"><label>Month 21</label></div>
											<div class="row"><span>9 active<br> customers</span></div>
										</div>
										<div class="second_half">
											<div class="row"><label><label>$2,000</label> / month</label></div>
										</div>
									</td>
									<td>
										<div class="first_half">
											<div class="row"><label>Month 22</label></div>
											<div class="row"><span>9 active<br> customers</span></div>
										</div>
										<div class="second_half">
											<div class="row"><label><label>$2,250</label> / month</label></div>
										</div>
									</td>
									<td>
										<div class="first_half">
											<div class="row"><label>Month 23</label></div>
											<div class="row"><span>9 active<br> customers</span></div>
										</div>
										<div class="second_half">
											<div class="row"><label><label>$2,500</label> / month</label></div>
										</div>
									</td>
									<td>
										<div class="first_half">
											<div class="row"><label>Month 24</label></div>
											<div class="row"><span>9 active<br> customers</span></div>
										</div>
										<div class="second_half">
											<div class="row"><label><label>$2,500</label> / month</label></div>
										</div>
									</td>
								</tr>
								<tr>
									<td class="year_total">
										<div class="first_half">
											<div class="row"><label>YEAR 3 TOTAL</label></div>
											<div class="row"><span>100 active<br> customers</span></div>
										</div>
										<div class="second_half">
											<div class="row"><label><label>$35,000</label> commission</label><br>
											<label><label>$83,000</label> total compensation</label></div>
										</div>
									</td>
									<td>
										<div class="first_half">
											<div class="row"><label>Month 25</label></div>
											<div class="row"><span>5 active<br> customers</span></div>
										</div>
										<div class="second_half">
											<div class="row"><label><label>0</label> / month</label></div>
										</div>
									</td>
									<td>
										<div class="first_half">
											<div class="row"><label>Month 26</label></div>
											<div class="row"><span>9 active<br> customers</span></div>
										</div>
										<div class="second_half">
											<div class="row"><label><label>$250</label> / month</label></div>
										</div>
									</td>
									<td>
										<div class="first_half">
											<div class="row"><label>Month 27</label></div>
											<div class="row"><span>13 active<br> customers</span></div>
										</div>
										<div class="second_half">
											<div class="row"><label><label>$500</label> / month</label></div>
										</div>
									</td>
									<td>
										<div class="first_half">
											<div class="row"><label>Month 28</label></div>
											<div class="row"><span>5 active<br> customers</span></div>
										</div>
										<div class="second_half">
											<div class="row"><label><label>$750</label> / month</label></div>
										</div>
									</td>
									<td>
										<div class="first_half">
											<div class="row"><label>Month 29</label></div>
											<div class="row"><span>9 active<br> customers</span></div>
										</div>
										<div class="second_half">
											<div class="row"><label><label>$1,000</label> / month</label></div>
										</div>
									</td>
									<td>
										<div class="first_half">
											<div class="row"><label>Month 30</label></div>
											<div class="row"><span>9 active<br> customers</span></div>
										</div>
										<div class="second_half">
											<div class="row"><label><label>$1,250</label> / month</label></div>
										</div>
									</td>
									<td>
										<div class="first_half">
											<div class="row"><label>Month 31</label></div>
											<div class="row"><span>9 active<br> customers</span></div>
										</div>
										<div class="second_half">
											<div class="row"><label><label>$1,500</label> / month</label></div>
										</div>
									</td>
									<td>
										<div class="first_half">
											<div class="row"><label>Month 32</label></div>
											<div class="row"><span>9 active<br> customers</span></div>
										</div>
										<div class="second_half">
											<div class="row"><label><label>$1,750</label> / month</label></div>
										</div>
									</td>
									<td>
										<div class="first_half">
											<div class="row"><label>Month 33</label></div>
											<div class="row"><span>9 active<br> customers</span></div>
										</div>
										<div class="second_half">
											<div class="row"><label><label>$2,000</label> / month</label></div>
										</div>
									</td>
									<td>
										<div class="first_half">
											<div class="row"><label>Month 34</label></div>
											<div class="row"><span>9 active<br> customers</span></div>
										</div>
										<div class="second_half">
											<div class="row"><label><label>$2,250</label> / month</label></div>
										</div>
									</td>
									<td>
										<div class="first_half">
											<div class="row"><label>Month 35</label></div>
											<div class="row"><span>9 active<br> customers</span></div>
										</div>
										<div class="second_half">
											<div class="row"><label><label>$2,500</label> / month</label></div>
										</div>
									</td>
									<td>
										<div class="first_half">
											<div class="row"><label>Month 36</label></div>
											<div class="row"><span>9 active<br> customers</span></div>
										</div>
										<div class="second_half">
											<div class="row"><label><label>$2,500</label> / month</label></div>
										</div>
									</td>
								</tr>
							</tbody>
						</table>
					</div>
				</div>
				<div class="col-12 col-md-12 col-xs-12 row">
					<div class="button_div">
						<button class="col-12 col-md-3 col-xs-12 faq_btn pull-left">FAQs</button>
						<button class="col-12 col-md-3 col-xs-12 next_btn">Confirm</button>
						<button class="col-12 col-md-3 col-xs-12 skip_btn pull-right">Continue without adding tiers</button>
					</div>
				</div>
			</div>

			<!-- Determining Commission Cap-->
			<div class="page38  step row ">
				<div class="back_div">
					<label>
						<img class="back_icon" src="<?php echo plugins_url('/img/menu_arrow_prev.png', __FILE__); ?>">
						Back
					</label>
				</div>				
				<div class="row header_title">
					<label>Determining Commission Cap</label>
				</div>
				<div class="row sub_title">
					<span>Since another rep is responsible for accounts after the initial sale, the original sales rep shouldn’t receive unlimited commissions. <br>
					Most companies pay these commissions for the first 12 months then pass them off to the rep mananing the accounts. </span>
				</div>
				<div class="container">
					<div class="row">
						<div class="col-12 col-md-12 col-xs-12">
							 <label class="sub_title">How long should reps receive their monthly <label class="commission_percent">10</label>% commission for each sale?</label>
						</div>
						<div class="col-12 col-md-12 col-xs-12">
							 <select class="tier_period38" name="tier_period38">
								<option>(select time period)</option>
								<option>Unlimited</option>
								<?php
								for($i = 1; $i < 36; $i++){ ?>
									<option><?php echo $i; ?></option>
								<?php } ?>
							</select> <label>months </label>
							<span class="small_text">(or until customer cancels )</span>						
						</div>
					</div>
					<div class="switch_div">
						<div class="row">
							<div class="col-6 col-md-6 col-xs-12 text_div">
								<label>Commission</label>
							</div>
							<div class="col-6 col-md-6 col-xs-12 text_div">
								<label>Revenue</label>
							</div>
						</div>
						<div class="row">
							<div class="col-6 col-md-6 col-xs-12 switch_item black_bg">
							</div>
							<div class="col-6 col-md-6 col-xs-12 switch_item red_bg">
							</div>
						</div>												
					</div>
					<div class="row table_div">
						<table id="commission_tier1" class="light_red_bg commission_tier">
							<tbody>
								<tr>
									<td class="year_total">
										<div class="first_half">
											<div class="row"><label>YEAR 1 TOTAL</label></div>
											<div class="row"><span>100 active<br> customers</span></div>
										</div>
										<div class="second_half">
											<div class="row"><label><label class="total_commission">$35,000</label> commission</label><br>
											<label><label class="total_compensation">$83,000</label> total compensation</label></div>
										</div>
									</td>
									<!-- <td class="empty_td">
										<div class="first_half">
										</div>
										<div class="second_half">
										</div>
									</td> -->
									<td>
										<div class="first_half">
											<div class="row"><label>Month 1</label></div>
											<div class="row"><span>5 active<br> customers</span></div>
										</div>
										<div class="second_half">
											<div class="row"><label><label>0</label> / month</div>
										</div>
									</td>
									<td>
										<div class="first_half">
											<div class="row"><label>Month 2</label></div>
											<div class="row"><span>9 active<br> customers</span></div>
										</div>
										<div class="second_half">
											<div class="row"><label><label>$250</label> / month</label></div>
										</div>
									</td>
									<td>
										<div class="first_half">
											<div class="row"><label>Month 3</label></div>
											<div class="row"><span>13 active<br> customers</span></div>
										</div>
										<div class="second_half">
											<div class="row"><label><label>$500</label> / month</label></div>
										</div>
									</td>
									<td>
										<div class="first_half">
											<div class="row"><label>Month 4</label></div>
											<div class="row"><span>5 active<br> customers</span></div>
										</div>
										<div class="second_half">
											<div class="row"><label><label>$750</label> / month</label></div>
										</div>
									</td>
									<td>
										<div class="first_half">
											<div class="row"><label>Month 5</label></div>
											<div class="row"><span>9 active<br> customers</span></div>
										</div>
										<div class="second_half">
											<div class="row"><label><label>$1,000</label> / month</label></div>
										</div>
									</td>
									<td>
										<div class="first_half">
											<div class="row"><label>Month 6</label></div>
											<div class="row"><span>9 active<br> customers</span></div>
										</div>
										<div class="second_half">
											<div class="row"><label><label>$1,250</label> / month</label></div>
										</div>
									</td>
									<td>
										<div class="first_half">
											<div class="row"><label>Month 7</label></div>
											<div class="row"><span>9 active<br> customers</span></div>
										</div>
										<div class="second_half">
											<div class="row"><label><label>$1,500</label> / month</label></div>
										</div>
									</td>
									<td>
										<div class="first_half">
											<div class="row"><label>Month 8</label></div>
											<div class="row"><span>9 active<br> customers</span></div>
										</div>
										<div class="second_half">
											<div class="row"><label><label>$1,750</label> / month</label></div>
										</div>
									</td>
									<td>
										<div class="first_half">
											<div class="row"><label>Month 9</label></div>
											<div class="row"><span>9 active<br> customers</span></div>
										</div>
										<div class="second_half">
											<div class="row"><label><label>$2,000</label> / month</label></div>
										</div>
									</td>
									<td>
										<div class="first_half">
											<div class="row"><label>Month 10</label></div>
											<div class="row"><span>9 active<br> customers</span></div>
										</div>
										<div class="second_half">
											<div class="row"><label><label>$2,250</label> / month</label></div>
										</div>
									</td>
									<td>
										<div class="first_half">
											<div class="row"><label>Month 11</label></div>
											<div class="row"><span>9 active<br> customers</span></div>
										</div>
										<div class="second_half">
											<div class="row"><label><label>$2,500</label> / month</label></div>
										</div>
									</td>
									<td>
										<div class="first_half">
											<div class="row"><label>Month 12</label></div>
											<div class="row"><span>9 active<br> customers</span></div>
										</div>
										<div class="second_half">
											<div class="row"><label><label>$2,500</label> / month</label></div>
										</div>
									</td>
								</tr>
								<tr>
									<td class="year_total">
										<div class="first_half">
											<div class="row"><label>YEAR 2 TOTAL</label></div>
											<div class="row"><span>100 active<br> customers</span></div>
										</div>
										<div class="second_half">
											<div class="row"><label><label>$35,000</label> commission</label><br>
											<label><label>$83,000</label> total compensation</label></div>
										</div>
									</td>
									<td>
										<div class="first_half">
											<div class="row"><label>Month 13</label></div>
											<div class="row"><span>5 active<br> customers</span></div>
										</div>
										<div class="second_half">
											<div class="row"><label><label>0</label> / month</label></div>
										</div>
									</td>
									<td>
										<div class="first_half">
											<div class="row"><label>Month 14</label></div>
											<div class="row"><span>9 active<br> customers</span></div>
										</div>
										<div class="second_half">
											<div class="row"><label><label>$250</label> / month</label></div>
										</div>
									</td>
									<td>
										<div class="first_half">
											<div class="row"><label>Month 15</label></div>
											<div class="row"><span>13 active<br> customers</span></div>
										</div>
										<div class="second_half">
											<div class="row"><label><label>$500</label> / month</label></div>
										</div>
									</td>
									<td>
										<div class="first_half">
											<div class="row"><label>Month 16</label></div>
											<div class="row"><span>5 active<br> customers</span></div>
										</div>
										<div class="second_half">
											<div class="row"><label><label>$750</label> / month</label></div>
										</div>
									</td>
									<td>
										<div class="first_half">
											<div class="row"><label>Month 17</label></div>
											<div class="row"><span>9 active<br> customers</span></div>
										</div>
										<div class="second_half">
											<div class="row"><label><label>$1,000</label> / month</label></div>
										</div>
									</td>
									<td>
										<div class="first_half">
											<div class="row"><label>Month 18</label></div>
											<div class="row"><span>9 active<br> customers</span></div>
										</div>
										<div class="second_half">
											<div class="row"><label><label>$1,250</label> / month</label></div>
										</div>
									</td>
									<td>
										<div class="first_half">
											<div class="row"><label>Month 19</label></div>
											<div class="row"><span>9 active<br> customers</span></div>
										</div>
										<div class="second_half">
											<div class="row"><label><label>$1,500</label> / month</label></div>
										</div>
									</td>
									<td>
										<div class="first_half">
											<div class="row"><label>Month 20</label></div>
											<div class="row"><span>9 active<br> customers</span></div>
										</div>
										<div class="second_half">
											<div class="row"><label><label>$1,750</label> / month</label></div>
										</div>
									</td>
									<td>
										<div class="first_half">
											<div class="row"><label>Month 21</label></div>
											<div class="row"><span>9 active<br> customers</span></div>
										</div>
										<div class="second_half">
											<div class="row"><label><label>$2,000</label> / month</label></div>
										</div>
									</td>
									<td>
										<div class="first_half">
											<div class="row"><label>Month 22</label></div>
											<div class="row"><span>9 active<br> customers</span></div>
										</div>
										<div class="second_half">
											<div class="row"><label><label>$2,250</label> / month</label></div>
										</div>
									</td>
									<td>
										<div class="first_half">
											<div class="row"><label>Month 23</label></div>
											<div class="row"><span>9 active<br> customers</span></div>
										</div>
										<div class="second_half">
											<div class="row"><label><label>$2,500</label> / month</label></div>
										</div>
									</td>
									<td>
										<div class="first_half">
											<div class="row"><label>Month 24</label></div>
											<div class="row"><span>9 active<br> customers</span></div>
										</div>
										<div class="second_half">
											<div class="row"><label><label>$2,500</label> / month</label></div>
										</div>
									</td>
								</tr>
								<tr>
									<td class="year_total">
										<div class="first_half">
											<div class="row"><label>YEAR 3 TOTAL</label></div>
											<div class="row"><span>100 active<br> customers</span></div>
										</div>
										<div class="second_half">
											<div class="row"><label><label>$35,000</label> commission</label><br>
											<label><label>$83,000</label> total compensation</label></div>
										</div>
									</td>
									<td>
										<div class="first_half">
											<div class="row"><label>Month 25</label></div>
											<div class="row"><span>5 active<br> customers</span></div>
										</div>
										<div class="second_half">
											<div class="row"><label><label>0</label> / month</label></div>
										</div>
									</td>
									<td>
										<div class="first_half">
											<div class="row"><label>Month 26</label></div>
											<div class="row"><span>9 active<br> customers</span></div>
										</div>
										<div class="second_half">
											<div class="row"><label><label>$250</label> / month</label></div>
										</div>
									</td>
									<td>
										<div class="first_half">
											<div class="row"><label>Month 27</label></div>
											<div class="row"><span>13 active<br> customers</span></div>
										</div>
										<div class="second_half">
											<div class="row"><label><label>$500</label> / month</label></div>
										</div>
									</td>
									<td>
										<div class="first_half">
											<div class="row"><label>Month 28</label></div>
											<div class="row"><span>5 active<br> customers</span></div>
										</div>
										<div class="second_half">
											<div class="row"><label><label>$750</label> / month</label></div>
										</div>
									</td>
									<td>
										<div class="first_half">
											<div class="row"><label>Month 29</label></div>
											<div class="row"><span>9 active<br> customers</span></div>
										</div>
										<div class="second_half">
											<div class="row"><label><label>$1,000</label> / month</label></div>
										</div>
									</td>
									<td>
										<div class="first_half">
											<div class="row"><label>Month 30</label></div>
											<div class="row"><span>9 active<br> customers</span></div>
										</div>
										<div class="second_half">
											<div class="row"><label><label>$1,250</label> / month</label></div>
										</div>
									</td>
									<td>
										<div class="first_half">
											<div class="row"><label>Month 31</label></div>
											<div class="row"><span>9 active<br> customers</span></div>
										</div>
										<div class="second_half">
											<div class="row"><label><label>$1,500</label> / month</label></div>
										</div>
									</td>
									<td>
										<div class="first_half">
											<div class="row"><label>Month 32</label></div>
											<div class="row"><span>9 active<br> customers</span></div>
										</div>
										<div class="second_half">
											<div class="row"><label><label>$1,750</label> / month</label></div>
										</div>
									</td>
									<td>
										<div class="first_half">
											<div class="row"><label>Month 33</label></div>
											<div class="row"><span>9 active<br> customers</span></div>
										</div>
										<div class="second_half">
											<div class="row"><label><label>$2,000</label> / month</label></div>
										</div>
									</td>
									<td>
										<div class="first_half">
											<div class="row"><label>Month 34</label></div>
											<div class="row"><span>9 active<br> customers</span></div>
										</div>
										<div class="second_half">
											<div class="row"><label><label>$2,250</label> / month</label></div>
										</div>
									</td>
									<td>
										<div class="first_half">
											<div class="row"><label>Month 35</label></div>
											<div class="row"><span>9 active<br> customers</span></div>
										</div>
										<div class="second_half">
											<div class="row"><label><label>$2,500</label> / month</label></div>
										</div>
									</td>
									<td>
										<div class="first_half">
											<div class="row"><label>Month 36</label></div>
											<div class="row"><span>9 active<br> customers</span></div>
										</div>
										<div class="second_half">
											<div class="row"><label><label>$2,500</label> / month</label></div>
										</div>
									</td>
								</tr>
							</tbody>
						</table>
					</div>
				</div>
				<div class="col-12 col-md-12 col-xs-12 row">
					<div class="button_div">
						<!-- <button class="col-12 col-md-1 col-xs-12 faq_btn pull-left">FAQs</button> -->
						<button class="col-12 col-md-1 col-xs-12 next_btn">Confirm</button>
						<!-- <button class="col-12 col-md-2 col-xs-12 skip_btn pull-right">Continue without adding tiers</button> -->
					</div>
				</div>
			</div>

			<div class="page39  step row ">
				<div class="back_div">
					<label>
						<img class="back_icon" src="<?php echo plugins_url('/img/menu_arrow_prev.png', __FILE__); ?>">
						Back
					</label>
				</div>				
				<div class="row header_title">
					<label>Projections for the first three years are below</label>
				</div>
				<div class="row sub_title">
					<span>Projections assume all months are average (<span class="customer_number">35</span> new customers per month at <span class="churn_number">10</span>% churn)<br>
					If commission numbers seem too high in the second or third year, you should consider adding tiers to lower the commission value after a given time period (e.g. one year)</span>
				</div>
				<div class="container">
					<div class="switch_div">
						<div class="row">
							<div class="col-6 col-md-6 col-xs-12 text_div">
								<label>Commission</label>
							</div>
							<div class="col-6 col-md-6 col-xs-12 text_div">
								<label>Revenue</label>
							</div>
						</div>
						<div class="row">
							<div class="col-6 col-md-6 col-xs-12 switch_item black_bg">
							</div>
							<div class="col-6 col-md-6 col-xs-12 switch_item red_bg">
							</div>
						</div>												
					</div>
					<div class="row table_div">
						<table id="commission_tier2" class="light_red_bg commission_tier">
							<tbody>
								<tr>
									<td class="year_total">
										<div class="first_half">
											<div class="row"><label>YEAR 1 TOTAL</label></div>
											<div class="row"><span>100 active<br> customers</span></div>
										</div>
										<div class="second_half">
											<div class="row"><label><label class="total_commission">$35,000</label> commission</label><br>
											<label><label class="total_compensation">$83,000</label> total compensation</label></div>
										</div>
									</td>
									<!-- <td class="empty_td">
										<div class="first_half">
										</div>
										<div class="second_half">
										</div>
									</td> -->
									<td>
										<div class="first_half">
											<div class="row"><label>Month 1</label></div>
											<div class="row"><span>5 active<br> customers</span></div>
										</div>
										<div class="second_half">
											<div class="row"><label><label>0</label> / month</div>
										</div>
									</td>
									<td>
										<div class="first_half">
											<div class="row"><label>Month 2</label></div>
											<div class="row"><span>9 active<br> customers</span></div>
										</div>
										<div class="second_half">
											<div class="row"><label><label>$250</label> / month</label></div>
										</div>
									</td>
									<td>
										<div class="first_half">
											<div class="row"><label>Month 3</label></div>
											<div class="row"><span>13 active<br> customers</span></div>
										</div>
										<div class="second_half">
											<div class="row"><label><label>$500</label> / month</label></div>
										</div>
									</td>
									<td>
										<div class="first_half">
											<div class="row"><label>Month 4</label></div>
											<div class="row"><span>5 active<br> customers</span></div>
										</div>
										<div class="second_half">
											<div class="row"><label><label>$750</label> / month</label></div>
										</div>
									</td>
									<td>
										<div class="first_half">
											<div class="row"><label>Month 5</label></div>
											<div class="row"><span>9 active<br> customers</span></div>
										</div>
										<div class="second_half">
											<div class="row"><label><label>$1,000</label> / month</label></div>
										</div>
									</td>
									<td>
										<div class="first_half">
											<div class="row"><label>Month 6</label></div>
											<div class="row"><span>9 active<br> customers</span></div>
										</div>
										<div class="second_half">
											<div class="row"><label><label>$1,250</label> / month</label></div>
										</div>
									</td>
									<td>
										<div class="first_half">
											<div class="row"><label>Month 7</label></div>
											<div class="row"><span>9 active<br> customers</span></div>
										</div>
										<div class="second_half">
											<div class="row"><label><label>$1,500</label> / month</label></div>
										</div>
									</td>
									<td>
										<div class="first_half">
											<div class="row"><label>Month 8</label></div>
											<div class="row"><span>9 active<br> customers</span></div>
										</div>
										<div class="second_half">
											<div class="row"><label><label>$1,750</label> / month</label></div>
										</div>
									</td>
									<td>
										<div class="first_half">
											<div class="row"><label>Month 9</label></div>
											<div class="row"><span>9 active<br> customers</span></div>
										</div>
										<div class="second_half">
											<div class="row"><label><label>$2,000</label> / month</label></div>
										</div>
									</td>
									<td>
										<div class="first_half">
											<div class="row"><label>Month 10</label></div>
											<div class="row"><span>9 active<br> customers</span></div>
										</div>
										<div class="second_half">
											<div class="row"><label><label>$2,250</label> / month</label></div>
										</div>
									</td>
									<td>
										<div class="first_half">
											<div class="row"><label>Month 11</label></div>
											<div class="row"><span>9 active<br> customers</span></div>
										</div>
										<div class="second_half">
											<div class="row"><label><label>$2,500</label> / month</label></div>
										</div>
									</td>
									<td>
										<div class="first_half">
											<div class="row"><label>Month 12</label></div>
											<div class="row"><span>9 active<br> customers</span></div>
										</div>
										<div class="second_half">
											<div class="row"><label><label>$2,500</label> / month</label></div>
										</div>
									</td>
								</tr>
								<tr>
									<td class="year_total">
										<div class="first_half">
											<div class="row"><label>YEAR 2 TOTAL</label></div>
											<div class="row"><span>100 active<br> customers</span></div>
										</div>
										<div class="second_half">
											<div class="row"><label><label>$35,000</label> commission</label><br>
											<label><label>$83,000</label> total compensation</label></div>
										</div>
									</td>
									<td>
										<div class="first_half">
											<div class="row"><label>Month 13</label></div>
											<div class="row"><span>5 active<br> customers</span></div>
										</div>
										<div class="second_half">
											<div class="row"><label><label>0</label> / month</label></div>
										</div>
									</td>
									<td>
										<div class="first_half">
											<div class="row"><label>Month 14</label></div>
											<div class="row"><span>9 active<br> customers</span></div>
										</div>
										<div class="second_half">
											<div class="row"><label><label>$250</label> / month</label></div>
										</div>
									</td>
									<td>
										<div class="first_half">
											<div class="row"><label>Month 15</label></div>
											<div class="row"><span>13 active<br> customers</span></div>
										</div>
										<div class="second_half">
											<div class="row"><label><label>$500</label> / month</label></div>
										</div>
									</td>
									<td>
										<div class="first_half">
											<div class="row"><label>Month 16</label></div>
											<div class="row"><span>5 active<br> customers</span></div>
										</div>
										<div class="second_half">
											<div class="row"><label><label>$750</label> / month</label></div>
										</div>
									</td>
									<td>
										<div class="first_half">
											<div class="row"><label>Month 17</label></div>
											<div class="row"><span>9 active<br> customers</span></div>
										</div>
										<div class="second_half">
											<div class="row"><label><label>$1,000</label> / month</label></div>
										</div>
									</td>
									<td>
										<div class="first_half">
											<div class="row"><label>Month 18</label></div>
											<div class="row"><span>9 active<br> customers</span></div>
										</div>
										<div class="second_half">
											<div class="row"><label><label>$1,250</label> / month</label></div>
										</div>
									</td>
									<td>
										<div class="first_half">
											<div class="row"><label>Month 19</label></div>
											<div class="row"><span>9 active<br> customers</span></div>
										</div>
										<div class="second_half">
											<div class="row"><label><label>$1,500</label> / month</label></div>
										</div>
									</td>
									<td>
										<div class="first_half">
											<div class="row"><label>Month 20</label></div>
											<div class="row"><span>9 active<br> customers</span></div>
										</div>
										<div class="second_half">
											<div class="row"><label><label>$1,750</label> / month</label></div>
										</div>
									</td>
									<td>
										<div class="first_half">
											<div class="row"><label>Month 21</label></div>
											<div class="row"><span>9 active<br> customers</span></div>
										</div>
										<div class="second_half">
											<div class="row"><label><label>$2,000</label> / month</label></div>
										</div>
									</td>
									<td>
										<div class="first_half">
											<div class="row"><label>Month 22</label></div>
											<div class="row"><span>9 active<br> customers</span></div>
										</div>
										<div class="second_half">
											<div class="row"><label><label>$2,250</label> / month</label></div>
										</div>
									</td>
									<td>
										<div class="first_half">
											<div class="row"><label>Month 23</label></div>
											<div class="row"><span>9 active<br> customers</span></div>
										</div>
										<div class="second_half">
											<div class="row"><label><label>$2,500</label> / month</label></div>
										</div>
									</td>
									<td>
										<div class="first_half">
											<div class="row"><label>Month 24</label></div>
											<div class="row"><span>9 active<br> customers</span></div>
										</div>
										<div class="second_half">
											<div class="row"><label><label>$2,500</label> / month</label></div>
										</div>
									</td>
								</tr>
								<tr>
									<td class="year_total">
										<div class="first_half">
											<div class="row"><label>YEAR 3 TOTAL</label></div>
											<div class="row"><span>100 active<br> customers</span></div>
										</div>
										<div class="second_half">
											<div class="row"><label><label>$35,000</label> commission</label><br>
											<label><label>$83,000</label> total compensation</label></div>
										</div>
									</td>
									<td>
										<div class="first_half">
											<div class="row"><label>Month 25</label></div>
											<div class="row"><span>5 active<br> customers</span></div>
										</div>
										<div class="second_half">
											<div class="row"><label><label>0</label> / month</label></div>
										</div>
									</td>
									<td>
										<div class="first_half">
											<div class="row"><label>Month 26</label></div>
											<div class="row"><span>9 active<br> customers</span></div>
										</div>
										<div class="second_half">
											<div class="row"><label><label>$250</label> / month</label></div>
										</div>
									</td>
									<td>
										<div class="first_half">
											<div class="row"><label>Month 27</label></div>
											<div class="row"><span>13 active<br> customers</span></div>
										</div>
										<div class="second_half">
											<div class="row"><label><label>$500</label> / month</label></div>
										</div>
									</td>
									<td>
										<div class="first_half">
											<div class="row"><label>Month 28</label></div>
											<div class="row"><span>5 active<br> customers</span></div>
										</div>
										<div class="second_half">
											<div class="row"><label><label>$750</label> / month</label></div>
										</div>
									</td>
									<td>
										<div class="first_half">
											<div class="row"><label>Month 29</label></div>
											<div class="row"><span>9 active<br> customers</span></div>
										</div>
										<div class="second_half">
											<div class="row"><label><label>$1,000</label> / month</label></div>
										</div>
									</td>
									<td>
										<div class="first_half">
											<div class="row"><label>Month 30</label></div>
											<div class="row"><span>9 active<br> customers</span></div>
										</div>
										<div class="second_half">
											<div class="row"><label><label>$1,250</label> / month</label></div>
										</div>
									</td>
									<td>
										<div class="first_half">
											<div class="row"><label>Month 31</label></div>
											<div class="row"><span>9 active<br> customers</span></div>
										</div>
										<div class="second_half">
											<div class="row"><label><label>$1,500</label> / month</label></div>
										</div>
									</td>
									<td>
										<div class="first_half">
											<div class="row"><label>Month 32</label></div>
											<div class="row"><span>9 active<br> customers</span></div>
										</div>
										<div class="second_half">
											<div class="row"><label><label>$1,750</label> / month</label></div>
										</div>
									</td>
									<td>
										<div class="first_half">
											<div class="row"><label>Month 33</label></div>
											<div class="row"><span>9 active<br> customers</span></div>
										</div>
										<div class="second_half">
											<div class="row"><label><label>$2,000</label> / month</label></div>
										</div>
									</td>
									<td>
										<div class="first_half">
											<div class="row"><label>Month 34</label></div>
											<div class="row"><span>9 active<br> customers</span></div>
										</div>
										<div class="second_half">
											<div class="row"><label><label>$2,250</label> / month</label></div>
										</div>
									</td>
									<td>
										<div class="first_half">
											<div class="row"><label>Month 35</label></div>
											<div class="row"><span>9 active<br> customers</span></div>
										</div>
										<div class="second_half">
											<div class="row"><label><label>$2,500</label> / month</label></div>
										</div>
									</td>
									<td>
										<div class="first_half">
											<div class="row"><label>Month 36</label></div>
											<div class="row"><span>9 active<br> customers</span></div>
										</div>
										<div class="second_half">
											<div class="row"><label><label>$2,500</label> / month</label></div>
										</div>
									</td>
								</tr>
							</tbody>
						</table>
					</div>
				</div>
				<div class="col-12 col-md-12 col-xs-12 row">
					<div class="button_div">
						<button class="col-12 col-md-1 col-xs-12 next_btn">Looks good</button>
						<button class="col-12 col-md-1 col-xs-12 add_tiers_btn pull-right">Add tiers </button>
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