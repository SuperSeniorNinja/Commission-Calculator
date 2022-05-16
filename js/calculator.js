console.log("calculator.js is loaded");
$ = jQuery;

$(document).ready(function(){
	window.items = [];
	window.browsing_history = [];
	window.current_page = getCurrentPage();
	var multiple_pages = [5, 11, 3, 26, 24]; // set pages for multiple options
	var commission = window.commission = 5; //by default, 5
	var base_salary = getConfiguration("base_salary") ? getConfiguration("base_salary") : 4000;
	window.revenue_per_deal;
	window.deals;
	window.user_id;
	var default_sidebar_menus = [
		["Salary + Commission", 1], 
		["Choose Commission Types (1/2)", 16], 
		["Choose Commission Types (2/2)", 5], 
		["Choose Commission Frequency", 13],
		["Choose Base Pay", 20],
		["Determine Commission Values", 28]
	];
 
	//when back arrow is clicked
	$('.back_div, .back_btn').on('click', function () {
		goToPrevPage();
	});

	//when an answer option is hovered, we show explanation/instructions.
	$(".step .answer_div .answer_option").mouseover(function(){
		if($(this).find("span").length){//if explanation text exists
			$(this).find("label").hide(); //hide option text
			$(this).find("span").show(); //show explanation/instructions
		}		
	});

	//When users moves out the cursor from the option, we show original OPTION text
	$(".step .answer_div .answer_option").mouseout(function(){
		$(this).find("label").show();
		$(this).find("span").hide();
	});

	//finished adding bonus
	$(".step .finished_add_bonus").on("click", function() {
		updateProgress(30);
	});

	//sidebar menu navigation
	$('.calculator_sidebar').on('click', '.selection_sidebar li', function() {
		var target_page = $(this).data("target");
		$(".selection_sidebar .active").removeClass("active");
		$(this).addClass("active");
		goToPage(target_page, target_page);
		return;
	});

	//when an answer option is chosen
	$('.step').on('click', '.answer_div .answer_option', function() {
		var question = $(this).parent().parent().find("div label").eq(0).text();
		var chosen_answer = $(this).find("label").text();
		var recommendation = '';
		
		//consider multiple choice case here
		var option_dom = $(this);
		var target_page;

			
		//check if this page is for muiltple or single choice
		if(multiple_pages.includes(getCurrentPage())) {//if multiple choices
			//if it is already chosen, we unclick it.
			if($(this).hasClass("active")){
				$(this).removeClass("active");
				//if no active answer is chosen, we deactivate next button.
				if($(".page" + window.current_page + " .answer_div .active").length == 0)
					$(".page" + window.current_page + " .button_div .next_btn").attr("disabled", "disabled");
			}
			else{
				$(this).addClass("active");
				$(".page" + window.current_page + " .button_div .next_btn").removeAttr("disabled");
			}
		}
		else{
			$(this).parent().find(".active").removeClass("active"); //remove other active options for single choice
			$(this).addClass("active");
			//Choose compensation format
			/*if(window.current_page == 1){
				saveToLocalStorage(window.current_page, recommendation);
				target_page = 16;
			}*/

			//What's the potential for added revenue from accounts?
			if(window.current_page == 4){
				if(chosen_answer == "Low")
					commission = commission - 1;
				else
					commission = commission + 1;

				window.commission = commission;
				updateCommission(commission);

				var chosen_responsibility_answers_doms = getPageValue("5", "5");
				var chosen_responsibilities = JSON.parse(chosen_responsibility_answers_doms).answer;

				if(chosen_responsibilities.length == 2)
					target_page = 8;
				else{
					var second_responsibility = chosen_responsibilities[2];
					target_page = getTargetPageJobResponsibilities(second_responsibility);
				}
			}

			

			//Do managed reps earn commissions?
			if(window.current_page == 6){
				if(chosen_answer == "Yes"){
					var temp = [];
					temp.push("Commission share -- e.g. managing sales rep earns 5% of all commissions earned by managed reps.");
					temp.push("Bonus for managed rep's KPI attainment -- e.g. monthly bonus for each KPI target managed rep's exceed.");
					
					var recommendation = [];
					recommendation["title"] = `Management bonus`;
					recommendation["description"] = temp;
					saveRecommendation(1, recommendation);
					saveFeature(2, "Management bonus");
					target_page = 8;
				}
				else
					target_page = 7;
			}

			//Do managed reps have quotas?
			if(window.current_page == 7){
				if(chosen_answer == "Yes"){
					var temp = [];
					temp.push("Commission share -- e.g. managing sales rep earns 5% of all commissions earned by managed reps.");
					temp.push("Bonus for managed rep's KPI attainment -- e.g. monthly bonus for each KPI target managed rep's exceed.");
					var recommendation = [];
					recommendation["title"] = `Management bonus`;
					recommendation["description"] = temp;
					saveRecommendation(1, recommendation);
					target_page = 8;
				}
				else
					target_page = 13;				
			}

			//Do you want to incentivize reps for beneficial activities and milestones, or just sales?
			if(window.current_page == 8){
				if(chosen_answer == "Add bonuses"){
					//if user already chose rep responsibilities
					if(hasPageAnswers(5)){
						var chosen_responsibilities = getPageValue("5", "5");
						var chosen_answers = JSON.parse(chosen_responsibilities).answer;
						var bonus_html = ``;
						for(var i = 0; i < chosen_answers.length; i++){
							var chosen_responsibility = chosen_answers[i].toLowerCase();

							if(chosen_responsibility == "prospecting"){
								var page_3_answers = getPageValue("3", "3");
								var chosen_3_answers = JSON.parse(page_3_answers).answer;

								if(chosen_3_answers.includes("Most sales will come from outbound prospecting or cold outreach")){
									var bonus_name = "Bonus for outbound prospecting";
									bonus_html += `
									<div class="answer_option col-12 col-md-12 col-sm-12">
										<label>`+ bonus_name +`</label>
									</div>`;
								}
								if(chosen_3_answers.includes("Reps will have consistent inbound leads")){
									var bonus_name = "Bonus for inbound leads";
									bonus_html += `
									<div class="answer_option col-12 col-md-12 col-sm-12">
										<label>`+ bonus_name +`</label>
									</div>`;
								}
							}
							else if(chosen_responsibility == "closing")
								var bonus_name = "Bonus for closing";
							else if(chosen_responsibility == "managing sales reps")
								var bonus_name = "Management bonus";

							if(chosen_responsibility != "managing accounts" && chosen_responsibility != "prospecting")
								bonus_html += `
								<div class="answer_option col-12 col-md-12 col-sm-12">
									<label>`+ bonus_name +`</label>
								</div>`;
						}
						$(".page9 .answer_div").append(bonus_html);
						target_page = 9;
					}
					else{
						target_page = 10;
					}
				}
				else{
					updateProgress(30);
					target_page = 11;
				}
			}

			//Based on the job responsibilities you selected, consider adding some of these bonuses:
			if(window.current_page == 9 || window.current_page == 10){			
				/*if(chosen_answer == "KPI attainment bonus for outbound prospecting"){
					recommendation = `KPI attainment bonus for outbound prospecting. Examples:
					Bonus for outreach volume (e.g. monthly bonus if averaging over 30 new accounts touched per day)
					Bonus for outreach success
					(e.g. monthly bonus for exceeding target number of conversations`;				
				}
				else if(chosen_answer == "Performance bonus for outbound prospecting"){				
					recommendation = `Performance bonus for outbound prospecting. Examples:
					Commission for each scheduled/qualified appointment (e.g. $250 per qualified appointment)`;
				}
				else if(chosen_answer == "KPI attainment bonus for inbound prospecting")
					recommendation = `KPI attainment bonus for inbound leads. Examples:
					Bonus for qualified-to-close conversion rate (e.g. monthly bonus if over 75% of the leads qualified by rep end up closing)
					Bonus for response time (e.g. monthly bonus for average response time under 10 minutes)`;
				else
					recommendation = `All other bonuses.....`;*/
				var bonus_example_html;
				var temp = [];

				if(chosen_answer == "Bonus for outbound prospecting"){
					bonus_example_html = `
						<li>Bonus for outreach volume target -- e.g. monthly bonus for contacting 30+ new accounts per day, on average</li>
						<li>Bonus for outreach quality target -- e.g. monthly bonus for exceeding target lead-to-close ratio of 10%</li>
						<li>Bonus per performance -- e.g. $100 for each scheduled qualified appointment</li>
					`;

					temp.push("Bonus for outreach volume target -- e.g. monthly bonus for contacting 30+ new accounts per day, on average");
					temp.push("Bonus for outreach quality target -- e.g. monthly bonus for exceeding target lead-to-close ratio of 10%");
					temp.push("Bonus per performance -- e.g. $100 for each scheduled qualified appointment");
				}
				else if(chosen_answer == "Bonus for inbound leads"){
					bonus_example_html = `
						<li>Bonus for conversion target -- e.g. monthly bonus for exceeding target qualified-to-close conversion rate of 50%</li>
						<li>Bonus for response time target -- e.g. monthly bonus for exceeding target response time of under 10 minutes</li>
					`;

					temp.push("Bonus for conversion target -- e.g. monthly bonus for exceeding target qualified-to-close conversion rate of 50%");
					temp.push("Bonus for response time target -- e.g. monthly bonus for exceeding target response time of under 10 minutes");
				}
				else if(chosen_answer == "Management bonus"){
					bonus_example_html = `
						<li>Commission share -- e.g. managing sales rep earns 5% of all commissions earned by managed reps</li>
						<li>Bonus for managed rep's KPI attainment -- e.g. monthly bonus for each KPI target managed rep's exceed</li>
					`;

					temp.push("Commission share -- e.g. managing sales rep earns 5% of all commissions earned by managed reps");
					temp.push("Bonus for managed rep's KPI attainment -- e.g. monthly bonus for each KPI target managed rep's exceed");
				}
				else{
					bonus_example_html = `
						<li>Bonus for conversion target -- e.g. monthly bonus for exceeding target qualified-to-close conversion rate of 50%</li>
						<li>Bonus for follow up task completion -- e.g. monthly bonus for exceeding daily follow-up task completion target of 95%</li>
						<li>Bonus KPI contest winner -- e.g. bonus to whichever sales rep has the highest average deal size this quarter</li>
					`;

					temp.push("Bonus for conversion target -- e.g. monthly bonus for exceeding target qualified-to-close conversion rate of 50%");
					temp.push("Bonus for follow up task completion -- e.g. monthly bonus for exceeding daily follow-up task completion target of 95%");
					temp.push("Bonus KPI contest winner -- e.g. bonus to whichever sales rep has the highest average deal size this quarter");
				}

				$(".page12 .headline2 label").text(chosen_answer);
				$(".page12 .headline4 ul").html(bonus_example_html);
				
				var recommendation = [];
				recommendation["title"] = chosen_answer;
				recommendation["description"] = temp;
				saveRecommendation(1, recommendation);
				target_page = 12;
				$(".page12 .arrow_next_btn").attr("data-next", 11);
			}

			/*Choose Commission Frequency*/
			if(window.current_page == 12){
				saveToLocalStorage(window.current_page, recommendation);
				goToPage(13);
				return;
			}

			/*How do customers pay for products?*/
			if(window.current_page == 13){
				if(chosen_answer == "All at once"){
					saveFeature(3, "One-time commission");
					var temp = [];
					temp["title"] = "One-time commission";
					temp["description"] = `Each time a sales is made, a commission is earned. Earned commissions are then paid out at the end of the month (or term), 
					accounting for any previous refunds or changes.`;
					recommendation = temp;
					saveRecommendation(2, recommendation);

					$(".recommendation_page .headline1 label").text(`We recommend you pay a:`);
					$(".recommendation_page .headline2 label").text(recommendation["title"]);
					$(".recommendation_page .headline3 label").text(recommendation["description"]);
					target_page = 2;
					$(".arrow_next_btn").attr("data-next", 20);

					updateProgress(50);
				}
				else
					target_page = 14;
			}

			/*Who is responsible for continued sales and health of the account after the initial sale?*/
			if(window.current_page == 14){
				if(chosen_answer == "Original sales rep"){
					saveFeature(3, "Recurring commission (Uncapped)");
					var temp = [];
					temp["title"] = "Recurring commission (Uncapped)";
					temp["description"] = `These commissions continue accruing after each customer renews and 
					only terminate once customers cancel. You can choose to always pay commissions at the same 
					rate or you can pay in tiers, such as 10% for the customer's first year and 5% after that.`;
					recommendation = temp;
					saveRecommendation(2, recommendation);

					$(".recommendation_page .headline1 label").text(`We recommend you pay a:`);
					$(".recommendation_page .headline2 label").text(recommendation["title"]);
					$(".recommendation_page .headline3 label").text(recommendation["description"]);
					target_page = 2;
					$(".arrow_next_btn").attr("data-next", 20);

					updateProgress(50);
				}
				else
					target_page = 15;
			}

			/*Select one below page14*/
			if(window.current_page == 15){
				var temp = [];
				if(chosen_answer == "Fixed (monthly)"){
					saveFeature(3, "Recurring commission (Capped)");
					temp["title"] = "Recurring commission (Capped)";
					temp["description"] = `These commissions continue accruing after each customer renews. Pay 
					commissions to the original sales rep for a year or so, then commissions should go to the 
					rep(s) actively managing the account. Commissions stop if the account cancels.`;										
				}
				else if(chosen_answer == "Variable"){
					saveFeature(3, "One-time commission");
					temp["title"] = "One-time commission";
					temp["description"] = `You should pay this based on estimated one-year income for the new account, after 
					which commissions should go to the rep(s) actively managing the account. You can always use a commission 
					adjustment to correct misjudgments at the end of each year.`;
				}
				else{
					saveFeature(3, "One-time commission");					
					temp["title"] = "One-time commission";
					temp["description"] = `You should pay this based on annualized income for the new account, 
					after which commissions should go to the rep(s) actively managing the account. `;
				}

				$(".recommendation_page .headline1 label").text(`We recommend you pay a:`);
				$(".recommendation_page .headline2 label").text(temp["title"]);
				$(".recommendation_page .headline3 label").text(temp["description"]);
				target_page = 2;
				$(".arrow_next_btn").attr("data-next", 20);
				updateProgress(50);

				recommendation = temp;
				saveRecommendation(2, recommendation);

				/*saveToLocalStorage(window.current_page, recommendation);
				//Check if "Commission Only" chosen, if yes skip page19 and go to 20
				var check_result = checkPageValue(1, "Commission Only");
				if(check_result)
					goToPage(20);
				else
					goToPage(19);
				return;*/
			}

			/*Do sales reps negotiate prices with customers?*/
			if(window.current_page == 16){
				if(chosen_answer == "Yes"){					
					saveFeature(1, "Commission On Profit");
					var recommendation = [];
					recommendation["title"] = `Percentage of profit`;
					recommendation["description"] = `This incentivizes sales reps to negotiate the best deals, 
					and makes commission more reflective of negotiation performance and deal quality.`;
					saveRecommendation(0, recommendation);
					target_page = 2;
					updateProgress(20);
					$(".arrow_next_btn").attr("data-next", 5);
				}
				else{
					saveFeature(1, "Commission On Revenue");
					var recommendation = [];
					recommendation["title"] = `Percentage of Revenue`;
					recommendation["description"] = `If your sales can't impact profit margins on each deal, 
					then it's best to pay based on revenue. This will incentivize sales reps to sell as much as possible.`;
					target_page = 17;			
				}				
				
				$(".recommendation_page .headline1 label").text(`We recommend paying commission as a:`);
				$(".recommendation_page .headline2 label").text(recommendation["title"]);
				$(".recommendation_page .headline3 label").text(recommendation["description"]);

				saveToLocalStorage(window.current_page, recommendation);
				goToPage(target_page);
				return;
			}


			/*Do sales reps have control over the cost of goods sold or expenses on each sale?*/
			if(window.current_page == 17){
				if(chosen_answer == "Yes"){
					saveFeature(1, "Commission On Profit");
					var recommendation = [];
					recommendation["title"] = `Percentage of profit`;
					recommendation["description"] = `This will incentivize sales reps to maintain good profit 
					margins and keep an eye on expenses, making their goals more aligned with the company goals.`;
					saveRecommendation(0, recommendation);
					target_page = 2;
					updateProgress(20);
					$(".arrow_next_btn").attr("data-next", 5);				
				}
				else{
					saveFeature(1, "Commission On Revenue");
					var recommendation = [];
					recommendation["title"] = `Percentage of Revenue`;
					recommendation["description"] = `If your sales can't impact profit margins on each deal, 
					then it's best to pay based on revenue. This will incentivize sales reps to sell as much as possible.`;
					target_page = 18;
				}

				$(".recommendation_page .headline1 label").text(`We recommend paying commission as a:`);
				$(".recommendation_page .headline2 label").text(recommendation["title"]);
				$(".recommendation_page .headline3 label").text(recommendation["description"]);

				saveToLocalStorage(window.current_page, recommendation);
				goToPage(target_page);
				return;
			}

			/*Should sales reps try to push customers into buying products/services with a higher profit margin?*/
			if(window.current_page == 18){
				if(chosen_answer == "Yes"){
					saveFeature(1, "Commission On Profit");
					var recommendation = [];
					recommendation["title"] = `Percentage of profit`;
					recommendation["description"] = `This will incentivize sales reps towards the highest profit margins, 
					but make sure your sales reps still keep the customer's best interests in mind.`;
				}
				else{
					saveFeature(1, "Commission On Revenue");
					var recommendation = [];
					recommendation["title"] = `Percentage of Revenue`;
					recommendation["description"] = `If your sales can't impact profit margins on each deal, 
					then it's best to pay based on revenue. This will incentivize sales reps to sell as much as possible.`;
				}

				$(".recommendation_page .headline1 label").text(`We recommend paying commission as a:`);
				$(".recommendation_page .headline2 label").text(recommendation["title"]);
				$(".recommendation_page .headline3 label").text(recommendation["description"]);

				$(".arrow_next_btn").attr("data-next", 5);
				target_page = 2;
				updateProgress(20);

				saveRecommendation(0, recommendation);
				saveToLocalStorage(window.current_page, recommendation);
				goToPage(target_page);
				return;
			}

			/*Are reps required to work on-site in an office?*/
			if(window.current_page == 20){				
				if(chosen_answer == "Must work on-site")
					target_page = 21;
				else
					target_page = 22;
			}

			/*where?*/
			if(window.current_page == 21){
				var recommendation = [];
				var temp = [];
				
				if(chosen_answer == "High cost of living location"){					
					temp["title"] = "+$2,000";
					temp["description"] = `+$2,000`; //salary recommendation
					var temp_price = parseFloat(base_salary) + 2000;
					if(temp_price < 3000)
						temp_price = 3000;
					base_salary = window.base_salary = temp_price;
					saveFeature(4, "Base Pay " + formatPrice(base_salary));
				}
				else{
					temp["title"] = "+$1,000";
					temp["description"] = `+$1,000`; //salary recommendation
					var temp_price = parseFloat(base_salary) + 1000;
					if(temp_price < 3000)
						temp_price = 3000;
					base_salary = window.base_salary = temp_price;
					saveFeature(4, "Base Pay " + formatPrice(base_salary));
				}
				recommendation = temp;
				saveRecommendation(4, recommendation);
				target_page = 22;
			}

			/*Do reps have a clear, proven path to sales success? In other words, have other reps succeeded in this role before? */
			if(window.current_page == 22){
				if(chosen_answer == "We've never had high-earning commissioned sales reps in this role"){
					var recommendation = [];
					var temp = [];
					temp["title"] = "+$500";
					temp["description"] = `+$500`; //salary recommendation
					var temp_price = parseFloat(base_salary) + 500;
					if(temp_price < 3000)
						temp_price = 3000;
					base_salary = window.base_salary = temp_price;
					saveFeature(4, "Base Pay " + formatPrice(base_salary));

					recommendation = temp;
					saveRecommendation(4, recommendation);
					target_page = 24;
				}				
				else
					target_page = 23;
			}

			/*How much have your good sales reps earned in base + commission?*/
			if(window.current_page == 23){
				var recommendation = [];
				var temp = [];
				var subtract = 500;
				if(chosen_answer == "Over $100k"){
					subtract = 1000;					
				}
				
				var temp_price = parseFloat(base_salary) - subtract;
				if(temp_price < 3000)
					temp_price = 3000;
				base_salary = window.base_salary = temp_price;
				temp["title"] = "subtract " + formatPrice(subtract);
				temp["description"] = "subtract " + formatPrice(subtract);
				saveFeature(4, "Base Pay " + formatPrice(base_salary));

				recommendation = temp;
				saveRecommendation(4, recommendation);
				target_page = 24;				
			}

			/*if(window.current_page == 24){
				var subtract = -250;
				var temp = [];
				temp["title"] = "subtract $250";
				temp["description"] = "subtract $250";

				if(chosen_answer == "Our industry is complex and can be difficult to master. Some prior experience in our industry is a must."){
					var subtract = 500;
					temp["title"] = "Add $500";
					temp["description"] = "Add $500";
				}
				var temp_price = parseFloat(base_salary) + subtract;				
				if(temp_price < 3000)
					temp_price = 3000;

				base_salary = window.base_salary = temp_price;
				$(".page25 .base_salary").val(formatPrice(base_salary));
				saveFeature(4, "Base Pay " + formatPrice(base_salary));

				recommendation = temp;
				saveRecommendation(4, recommendation);
				target_page = 25;
				console.log("hello");

				updateProgress(60);return;
			}*/

			if(window.current_page == 28){ //choose one
				target_page = 29;
				//set profit/revenue from the saved feature value
				var profit_or_revenue = IsProfitRevenue().toLowerCase();

				$(".page29 .div_question1 label span").html(profit_or_revenue);

				if(chosen_answer == "This is an existing sales role and we have past sales data available")
				{						
					
					//check if commission frequncy/one-time commission is chosen
					if(checkPageValue("features", "One-time commission")){
						$(".page29 .answer_div .div_question3").hide();
						$(".page29 .arrow_next_btn").attr("data-next", 30);
						$(".page30 .arrow_next_btn").attr("data-next", 31);
						$(".page31 .commission_percent_control_div .subheader").text(`
							Here's how much the rep will earn depending on how good (or bad) of a month they have.
						`);
						$(".page31 .commission_percent_control_div .subheader").css("font-size", "24px");
						$(".page31 .advanced_options_btn").show();
						$(".page31 .arrow_next_btn").attr("data-next", 33);
					}
					else/* if(checkPageValue("features","Recurring commission (capped)"))*/{
						$(".page29 .answer_div .div_question3").show();
						$(".page29 .arrow_next_btn").attr("data-next", 30);
						$(".page30 .arrow_next_btn").attr("data-next", 31);
						var commission_percent = getPageValue("commission", "commission") ? parseFloat(JSON.parse(getPageValue("commission", "commission")).commission): window.commission;
						if(commission_percent < 5)
							commission_percent = 5;
						$(".page31 .commission_percent_control_div .subheader").text(`
							Here's how much the rep will earn depending on how good (or bad) of a month they have.
							The middle column shows projected commission for month 8 if every month is average, with `+commission_percent+`% churn. 
							Columns to the left show increasingly worse month 8 projections due to below-average performance.
							Columns to the right show increasingly higher month 8 projections due to above-average performance.
							Actual month 8 numbers will be lower than these projections due to varying learning curves and ramp-up times
						`);
						$(".page31 .commission_percent_control_div .subheader").css("font-size", "20px");
						$(".page31 .advanced_options_btn").show();
						$(".page31 .edit_commission_calculator").hide();
						$(".page31 .arrow_next_btn").attr("data-next", 39);
						$(".page39 .arrow_next_btn").attr("data-next", 33);
						$(".page37 .arrow_next_btn").attr("data-next", 33);
						var default_percents = [];
						for(var i = 0; i < 36; i++){
							default_percents[i] = 5;
						}
						InitCommissionTierTable(39, getConfiguration("deal_revenue"), default_percents);
					}
				}
				/*else if(chosen_answer == "Our company is new and we have no experience selling this product"){

				}*/
				else{
					//check if commission frequncy/one-time commission is chosen
					$(".page29 .div_question1 label span").html(profit_or_revenue);

					if(checkPageValue("features", "One-time commission")){
						// $(".page29 .answer_div .average_revenue_profit").val("10,000");
						$(".page29 .answer_div .div_question3").hide();
						$(".page29 .arrow_next_btn").attr("data-next", 31);
						$(".page31 .commission_percent_control_div .subheader").text(`
							It will take time for sales to increase to peak volumes (we'll address this next). But once your rep is trained and sales are running smoothly,
							this is what your commissions will look like depending on how good (or bad) of a month the sales rep has.
						`);
						$(".page31 .commission_percent_control_div .subheader").css("font-size", "20px");
						$(".page31 .advanced_options_btn").hide();
						$(".page31 .arrow_next_btn").attr("data-next", 36);
						$(".page36 .arrow_next_btn").attr("data-next", 40);
					}
					else{
						console.log("capped or uncapped");
						$(".page29 .answer_div .div_question3").show();
						// $(".page29 .answer_div .average_revenue_profit").val(500);
						// $(".page29 .answer_div .percentage_cancel").val(10);
						$(".page29 .arrow_next_btn").attr("data-next", 30);
						$(".page30 .arrow_next_btn").attr("data-next", 36);
						$(".page36 .arrow_next_btn").attr("data-next", 40);
					}
				}				
			}

			saveToLocalStorage(window.current_page, recommendation);
			goToPage(target_page);
			return;
		}		
	});
	
	//page31 commission minus/plus
	$('.page31').on('click', '.commission_percent_control_div img', function() {
		var commission_direction = $(this).data("direction");		
		var current_commission_value = parseInt($(".page31 .commission_percent").val());
		if(commission_direction == "plus")
			current_commission_value = current_commission_value + 1;
		else
			current_commission_value = current_commission_value - 1;

		if(current_commission_value < 5){
			current_commission_value = 5;
			$(".page31 .explanation_for_min_exceed").show();
		}
		else
			$(".page31 .explanation_for_min_exceed").hide();
		
		//update current commission value visually
		$(".page31 .commission_percent").val(current_commission_value);
		//update commission result table based on new commission
		$(".result_section .page31 tbody tr")[0].children[0].innerText = current_commission_value + "%";
		
		InitCommissionTable(31, getConfiguration("deals"), getConfiguration("deal_revenue"), current_commission_value, deal_variation = 20, 
		 getConfiguration("commission_variation"), commission_modifier = 0, recommendation_variance = 60);
	});

	//page31 editcommission/advanced options button
	$('.page31').on('click', '.edit_commission_calculator, .advanced_options_btn', function() {
		//get recommended commission percent
		var commission_percent = getPageValue("commission", "commission") ? parseFloat(JSON.parse(getPageValue("commission", "commission")).commission): window.commission;
		if(commission_percent < 5)
			commission_percent = 5;

		$(".recommended_percent").html(commission_percent);

		$(".page32 .average_deals").val(getConfiguration("deals"));
		$(".page32 .average_revenue").val(formatPrice(getConfiguration("deal_revenue")));			
		$(".page32 .deal_variation").val(getConfiguration("deal_variation"));
		$(".page32 .commission_variation").val(getConfiguration("commission_variation"));
		$(".page32 .commission_modifier").val(getConfiguration("commission_modifier"));
		$(".page32 .recommendation_variance").val(getConfiguration("recommendation_variance"));

		InitCommissionTable(32, getConfiguration("deals"), getConfiguration("deal_revenue"), commission_percent, deal_variation = 20, 
		getConfiguration("commission_variation"), commission_modifier = 0, recommendation_variance = 60);
		
		goToPage(32);
		return;
	});
	

	//Advanced calculator configurator
	$(".result_section .sidebar_option .average_deals").on("keyup", function() {		
		var average_deals = $(".sidebar_option .average_deals").val();
		if(average_deals){
			//if user inputs other deal number, we remove previous highlights
			$(".result_section .page32 tr .active").removeClass("active");
			var tr_doms = $(".result_section .page32 tr");
			var index = parseInt(average_deals) + 1;
			for(var i = 0; i < tr_doms.length; i++){
				tr_doms[i].children[index].classList.add('active');
			}
		}
		else
			return;
	});

	//page29 average revenue/profit number format
	document.querySelectorAll('.average_revenue_profit, .average_revenue, .salary').forEach(inp => new Cleave(inp, {
	  numeral: true,
	  numeralThousandsGroupStyle: 'thousand'
	}));

	/*$(".average_revenue_profit, .average_revenue, .salary").on("keyup", function(){

	});*/	
	(function($){
        $.fn.extend({
            donetyping: function(callback,timeout){
                timeout = timeout || 1e3; // 1 second default timeout
                var timeoutReference,
                    doneTyping = function(el){
                        if (!timeoutReference) return;
                        timeoutReference = null;
                        callback.call(el);
                    };
                return this.each(function(i,el){
                    var $el = $(el);
                    // Chrome Fix (Use keyup over keypress to detect backspace)
                    // thank you @palerdot
                    $el.is(':input') && $el.on('keyup keypress paste',function(e){
                        // This catches the backspace button in chrome, but also prevents
                        // the event from triggering too preemptively. Without this line,
                        // using tab/shift+tab will make the focused element fire the callback.
                        if (e.type=='keyup' && e.keyCode!=8) return;
                        
                        // Check if timeout has been set. If it has, "reset" the clock and
                        // start over again.
                        if (timeoutReference) clearTimeout(timeoutReference);
                        timeoutReference = setTimeout(function(){
                            // if we made it here, our timeout has elapsed. Fire the
                            // callback
                            doneTyping(el);
                        }, timeout);
                    }).on('blur',function(){
                        // If we can, fire the event since we're leaving the field
                        doneTyping(el);
                    });
                });
            }
        });
    })(jQuery);

	$('#salary_edit_modal .salary').donetyping(function(){
		var edit_salary_value = $(this).val();
		edit_salary_value = numberFormat(edit_salary_value);
		if(parseFloat(edit_salary_value) < 3000)
		{
			alert("Base salary is minimum $3,000");
			$(this).val("3,000");
		}
    });

	//edit salary modal confirm button click
	$("#salary_edit_modal button").on("click", function(){
		var edit_salary_value = $('#salary_edit_modal .salary').val();
		var edit_salary_number_only = numberFormat(edit_salary_value);
		window.base_salary = base_salary = edit_salary_number_only;
		$(".page25 .base_salary").val(formatPrice(edit_salary_number_only));
		//update base pay accordingly
		saveFeature(4, "Base Pay " + formatPrice(edit_salary_number_only));
		$('#salary_edit_modal').modal('hide');
	});


	//page37 add a tier
	$(".page37 .add_tier_div label").on("click", function(){
		var new_tier_id = $(".tier_div").length + 1;
		
		var total_month_period = 0;
		var time_period_doms = $(".page37 [name='tier_period']");
		for(var i = 0; i < time_period_doms.length; i++)
			total_month_period += parseInt(time_period_doms[i].value);
		
		var available_month_period = 36 - total_month_period;
		var option_html = `<option>(select time period)</option><option>Unlimited</option>`;
		for(var j = 1; j <= available_month_period; j++){
			option_html += `<option>` + j + `</option>`;
		}

		var new_tier_html = `
		<div class="row tier_div tier`+ new_tier_id +`">
			
			<div><div class="remove_tier" data-number="` + new_tier_id + `">
			</div><span><label>Tier `+ new_tier_id +`: </label>&nbsp;&nbsp; 
				<input type="number" data-number="`+ new_tier_id +`" class="tier_percent tier`+ new_tier_id +`" name="tier_percent">%&nbsp;&nbsp; commission for 
			<select class="tier_period`+ new_tier_id +`" name="tier_period">`
				+ option_html +
			`</select> months 
			<span class="small_text">(or until customer cancels )
			</span></div>
		</div>
		`;
		$(".tiers").append(new_tier_html);
	});

	//remove commission tier
	$('.page37').on('click', '.tier_div .remove_tier', function() {
		var remove_tier_id = $(this).data("number");
		$(".page37 .container .tier" + remove_tier_id).remove();
	});

	//if unlimisted was selected for time period, we hide "Add a tier" 
	$(".page37 .tier_div select").on("change", function(){
		var time_period = $(this).val();
		if(time_period == "Unlimited")
			$(".add_tier_div").parent().hide();
		else{
			var current_tier_id = $(this).parent().parent().find("input")[0].dataset.number;
			var available_month_period = 36 - time_period;
			var time_period_doms = $(".page37 [name='tier_period']");

			if(current_tier_id < time_period_doms.length){
				for(var i = 0; i < time_period_doms.length; i++){					
					var tier_id = time_period_doms[i].classList.value.replace( /^\D+/g, '');
					if(tier_id > current_tier_id){
						for(var j = available_month_period + 2; j < time_period_doms[i].children.length; j++){
							time_period_doms[i].children[j].style.display = 'none';
						}
					}
				}
			}
		}
	});

	//add bonus
	$(".page33").on('click', '.add_bonus_div label', function(){
		var new_bonus_id = $(".bonus_row").length + 1;
		var new_bonus_html = `
		<div class="row bonus_row">
			<span><input type="number" name="bonus`+ new_bonus_id +`" class="bonus_input bonus`+ new_bonus_id +`" placeholder="$(number)" required=""> per 
			<select class="bonus`+ new_bonus_id +`_period" required="">
				<option>(select one)</option>
				<option>Month</option>
				<option>Quarter</option>
				<option>Year</option>
				<option>Occurrence</option>
			</select>
			for achieving outbound prospecting targets  <span class="small_text">(e.g. monthly bonus if averaging over 30 new records per day)</span></span>
		</div>`;

		$(".page33 .determine_amount .col-12").append(new_bonus_html);
	});

	//initiate commission tier calculation
	$(".page37").on('click', '.calculate_trigger_div', function(){
		var time_period_doms = $(".page37 [name='tier_period']");
		var percent_doms = $(".page37 [name='tier_percent']");
		var percents = [];

		for(var i = 0; i < time_period_doms.length; i++){
			if(time_period_doms[i].value != "Unlimited"){
				for(var j = 0; j < time_period_doms[i].value; j++)
					percents.push(percent_doms[i].value);
			}
			else{
				while(percents.length < 36)
					percents.push(percent_doms[i].value);
			}
		}
		InitCommissionTierTable(37, getConfiguration("deal_revenue"), percents);
	});

	//User input; must be below recommended number in commission tier percent input
	$('.page37').on('keyup', '.tier_div input', function() {
		var tier_percent = parseFloat($(this).val());
		var percents = [];
		var tier_id = $(this).data("number");
		var previous_tier_percent = parseFloat($(".page37 [data-number='"+(tier_id - 1)+"']").val());
		$(".page37 [data-number='"+(tier_id)+"']").attr("max", previous_tier_percent - 1);
		//show an alert
		if(tier_percent > previous_tier_percent){
			alert("Tier " + tier_id + " should have lower percent than " + previous_tier_percent + "%.");
			$(this).val((previous_tier_percent - 1));
		}
		else
		{
			var time_period_doms = $(".page37 [name='tier_period']");
			var percent_doms = $(".page37 [name='tier_percent']");
			
			for(var i = 0; i < time_period_doms.length; i++){
				if(time_period_doms[i].value != "Unlimited"){
					for(var j = 0; j < time_period_doms[i].value; j++)
						percents.push(percent_doms[i].value);
				}
				else{
					while(percents.length < 36)
						percents.push(percent_doms[i].value);
				}
			}

			InitCommissionTierTable(37, getConfiguration("deal_revenue"), percents);
		}
	});

	//page 37 <!-- Commission Tiers-->
	function InitCommissionTierTable(page_id, deal = 500, percents = null, months = null, number_of_deals_month = 5){

		var deal_size = deal;
		var number_of_deals = number_of_deals_month;
		var month_commission = [];
		var month_compensation = [];
		var total_commission = 0;
		var total_compensation = 0;
		var first_year_commission = 0;
		var first_year_compensation = 0;
		var second_year_commission = 0;
		var second_year_compensation = 0;
		var third_year_commission = 0;
		var third_year_compensation = 0;

		for(var i = 0; i < $(".page" + page_id + " .commission_tier tr td").not( ".year_total" ).length; i++){
			month_commission[i] = parseFloat(percents[i]) / 100 * (deal * number_of_deals);
			month_compensation[i] = deal * number_of_deals;
			if(i < 12)
			{
				first_year_commission += month_commission[i];
				first_year_compensation += month_compensation[i];
			}
			if(i >= 12 && i < 24)
			{
				second_year_commission += month_commission[i];
				second_year_compensation += month_compensation[i];
			}
			if(i >= 24 && i < 36)
			{
				third_year_commission += month_commission[i];
				third_year_compensation += month_compensation[i];
			}

			var formatted_month_commission = formatPrice(month_commission[i]);				
			$(".page" + page_id + " .commission_tier tr td").not( ".year_total" ).eq(i).find(".second_half .row label label").html(formatted_month_commission);			
			
			/*var total_commission = first_year_commission + second_year_commission + third_year_commission;
			var total_compensation = first_year_compensation + second_year_compensation + third_year_compensation;*/
		}

		//update year total commission/compensation
		$(".page" + page_id + " .commission_tier tr td").eq(0).find(".second_half .row label").eq(0).find("label").html(formatPrice(first_year_commission));
		$(".page" + page_id + " .commission_tier tr td").eq(0).find(".second_half .row label").eq(2).find("label").html(formatPrice(first_year_compensation));
		$(".page" + page_id + " .commission_tier tr td").eq(13).find(".second_half .row label").eq(0).find("label").html(formatPrice(second_year_commission));
		$(".page" + page_id + " .commission_tier tr td").eq(13).find(".second_half .row label").eq(2).find("label").html(formatPrice(second_year_compensation));
		$(".page" + page_id + " .commission_tier tr td").eq(26).find(".second_half .row label").eq(0).find("label").html(formatPrice(third_year_commission));
		$(".page" + page_id + " .commission_tier tr td").eq(26).find(".second_half .row label").eq(2).find("label").html(formatPrice(third_year_compensation));
	}

	//page31, custom configurator commission table
	function InitCommissionTable(page_id, deals, deal_revenue, commission_percent, deal_variation = 20, 
		commission_variation = 1, commission_modifier = 0, recommendation_variance = 60){
		$(".result_section .page" + page_id + " .commission_percent").val(commission_percent);
			
		//determine revenue/profit
		var profit_or_revenue = IsProfitRevenue();
		$(".page" + page_id + " .pink_txt").html(profit_or_revenue);

		//highlight the commission percent on the table
		$(".result_section .page" + page_id + " tr.active").removeClass("active");
		var index = commission_percent + 1;

		$(".result_section .page" + page_id + " tr").eq(index).addClass("active");

		//calculate table based on deal revenue
		if(page_id != 31){
			//highlight the deals column
			$(".result_section .page" + page_id + " tr .active").removeClass("active");
			var tr_doms = $(".result_section .page" + page_id + " tr");
			var index = parseInt(deals) + 1;
			for(var i = 0; i < tr_doms.length; i++){
				//tr_doms[i].children[index].classList.add('active');
				tr_doms.eq(i)[0].children[index].classList.add("active");
			}

			var tr_doms_2 = $(".result_section .page" + page_id + " tbody tr");
			for(var i = 0; i < tr_doms_2.length; i++){
				var td_doms_2 = tr_doms_2[i].children;
				for(j = 2; j < td_doms_2.length; j++){
					var index = j - 1;
					//average_revenue * percent_num * number_of_deals/100
					if(deal_variation == 20)
						var price = parseInt(deal_revenue * index * (i + 1) * commission_variation / 100);
					else
						var price = parseInt(deal_revenue * index * (i + 1) * commission_variation * deal_variation / 100);

					td_doms_2[j].innerText = formatPrice(price);
				}
			}

			var td_doms_3 = $(".result_section .page" + page_id + " tbody tr td:first-child");
			for(var k = 0; k < td_doms_3.length; k++){
				td_doms_3.eq(k).html(commission_variation*(k + 1) + "%");
			}
		}
		else{
			$(".result_section .page" + page_id + " tbody tr")[0].children[0].innerText = commission_percent + "%";
			var tr_doms_2 = $(".result_section .page" + page_id + " tbody tr td");
			for(j = 2; j < tr_doms_2.length; j++){				
				var index = j - 1;
				//average_revenue * percent_num * number_of_deals/100
				if(deal_variation == 20)
					var price = parseInt(deal_revenue * index * commission_percent * commission_variation / 100);
				else
					var price = parseInt(deal_revenue * index * commission_percent * commission_variation * deal_variation / 100);

				tr_doms_2[j].innerText = formatPrice(price);
			}
		}		
	}

	//Advanced calculator configur ator:average deal revenue/profit
	$(".result_section .sidebar_option .average_revenue").on("keyup", function() {	
		var average_revenue = $(".sidebar_option .average_revenue").val();
		var average_revenue = numberFormat(average_revenue);

		if(average_revenue){
			var tr_doms = $(".result_section .page32 tbody tr");
			for(var i = 0; i < tr_doms.length; i++){
				var td_doms = tr_doms[i].children;
				for(j = 2; j < td_doms.length; j++){
					var index = j - 1;
					//average_revenue * percent_num * number_of_deals/100
					var price = parseInt(average_revenue * index * (i + 1) / 100);
					td_doms[j].innerText = formatPrice(price);
				}
			}
		}
		else
			return;
	});

	//when commission variation is being changed
	$(".result_section .page32 .sidebar_advanced_option .commission_variation").on("keyup", function() {
		var commission_variation = $(".result_section .page32 .sidebar_advanced_option .commission_variation").val();
		var deals = $(".page32 .sidebar_option .average_deals").val();
		var deal_revenue = numberFormat($(".page32 .sidebar_option .average_revenue").val());
		var commission_percent = getPageValue("commission", "commission") ? parseFloat(JSON.parse(getPageValue("commission", "commission")).commission): window.commission;
		if(commission_percent < 5)
			commission_percent = 5;

		InitCommissionTable(32, deals, deal_revenue, commission_percent, deal_variation = 20, 
		commission_variation, commission_modifier = 0, recommendation_variance = 60);
	});

	//when deal variation is being changed
	$(".result_section .page32 .sidebar_advanced_option .deal_variation").on("keyup", function() {
		var deal_variation = $(this).val();
		var deals = $(".page32 .sidebar_option .average_deals").val();
		var deal_revenue = numberFormat($(".page32 .sidebar_option .average_revenue").val());
		var commission_percent = getPageValue("commission", "commission") ? parseFloat(JSON.parse(getPageValue("commission", "commission")).commission): window.commission;
		if(commission_percent < 5)
			commission_percent = 5;

		InitCommissionTable(32, deals, deal_revenue, commission_percent, deal_variation);
	});

	//when commission modifier is being changed
	$(".result_section .page32 .sidebar_advanced_option .commission_modifier").on("keyup", function() {
		var commission_modifier = parseInt($(this).val());
		var deal_variation = $(".result_section .page32 .sidebar_advanced_option .deal_variation").val();
		var deals = $(".page32 .sidebar_option .average_deals").val();
		var deal_revenue = numberFormat($(".page32 .sidebar_option .average_revenue").val());
		var commission_percent = getPageValue("commission", "commission") ? parseFloat(JSON.parse(getPageValue("commission", "commission")).commission): window.commission;
		commission_percent += commission_modifier;
		if(commission_percent < 5)
			commission_percent = 5;

		InitCommissionTable(32, deals, deal_revenue, commission_percent, deal_variation);
	});

	//when edit salary button is clicked, we show modal
	$(".page25 .edit_salary_btn").on("click", function() {
		$("#salary_edit_modal .salary").val(window.base_salary);
		$('#salary_edit_modal').modal('show');
	});

	//Custom Configurator confirm button
	$(".page32 .confirm_commission_configuration").on("click", function() {
		var average_deals = $(".page32 .average_deals").val();
		var average_revenue = $(".page32 .average_revenue").val();
		var deal_variation = $(".page32 .deal_variation").val();
		var commission_variation = $(".page32 .commission_variation").val();
		var commission_modifier = $(".page32 .commission_modifier").val();
		var recommendation_variance = $(".page32 .recommendation_variance").val();
		
		saveConfiguration("deals", average_deals);
		saveConfiguration("deal_revenue", average_revenue);
		saveConfiguration("deal_variation", deal_variation);
		saveConfiguration("commission_variation", commission_variation);
		saveConfiguration("commission_modifier", commission_modifier);
		saveConfiguration("recommendation_variance", recommendation_variance);

		goToPrevPage();
	});

	//Skip button on determine bonus
	$(".page33 .skip_btn").on("click", function(){
		//hide sidebar + body and show only result page
		$(".questions_section").hide();
		$(".result_section").show();
		goToPage(34);
		return;
	});

	//Trigger recommendation modal
	$(".page34 .question_icon").on("click", function(){
		//get recommendation type
		var type = $(this).data("type");
		var header_text = "We recommend you Compensation Format as a";
		$("#recommendation_modal .type_replace").html(type);

		//get recommendation accordingly
		var recommendation_index = 0;
		
		if(type == "base salary"){
			header_text = "We recommend you pay Base Salary as a"
			recommendation_index = 1;
		}
		else if(type == "commission percentage"){
			header_text = "We recommend you pay commission as a";
			recommendation_index = 2;
		}
		else if(type == "bonus"){
			recommendation_index = 3;
			header_text = "Consider adding a:";
		}
		else if(type == "term"){			
			recommendation_index = 4;
			header_text = "We recommend you use terms as a:";
		}

		var chosen_recommendation_titles = JSON.parse(getPageValue("recommendations", "titles")).titles;
		var chosen_recommendation_descriptions = JSON.parse(getPageValue("recommendations", "recommendations")).descriptions;
		var title = chosen_recommendation_titles[recommendation_index];
		/*if(recommendation_index in chosen_recommendation_titles)
			var title = chosen_recommendation_titles[recommendation_index];
		else
			var title = '';*/

		var description_html = "";
		//if(recommendation_index in chosen_recommendation_descriptions)
			var descriptions = chosen_recommendation_descriptions[recommendation_index];
		
		if(Array.isArray(descriptions) && descriptions.length > 1 ){
			$("#recommendation_modal .show_for_multiple").show();
			for(var k = 0; k < descriptions.length; k++){
				description_html += `<li>` + descriptions[k] + `</li>`;
			}
		}
		else{
			$("#recommendation_modal .show_for_multiple").hide();
			description_html = `<li>` + descriptions + `</li>`;
		}

		$('#recommendation_modal .modal-body ul').html(description_html);
		$('#recommendation_modal .type_replace').html(title);
		$('#recommendation_modal .title_description').html(header_text);
		
		$('#recommendation_modal').modal('show');
	});

	//save user data/configuration
	$(".page34 .save_btn").on("click", function(){
		var total_data = localStorage.getItem("commission_calculator");
		var user_id = $(".user_id").val();
		var user_login = $(".user_login").val();
		var user_email = $(".user_email").val();

		//save/push userdata to LocalStorage
		window.items = localStorage.getItem("commission_calculator");
		var json = JSON.parse(window.items);
		if(hasPageAnswers("user")){
			for(var i = 0; i < json.length; i++){
				var json_item = JSON.parse(json[i]);
				if(json_item.page == "user"){
					json_item.user_id = user_id;
					json_item.user_login = user_login;
					json_item.user_email = user_email;
					json[i] = JSON.stringify(json_item);
					localStorage.removeItem("commission_calculator");
					window.items = json;
				}
			}
		}
		else{
			var item = {
				"page": "user",
				"user_id": user_id,
				"user_login": user_login,
				"user_email": user_email
			};
			
			json.push(JSON.stringify(item));
			window.items = json;
		}
		
		localStorage.setItem("commission_calculator", JSON.stringify(window.items));

		var ajaxurl = ajax_obj.ajaxurl;
		jQuery.ajax({
            type: "POST",
            url: ajaxurl,
            dataType:"json",
            data: { 
                action: 'data_custom_ajax',
                data: window.items,
                user_id: user_id,
                user_login: user_login,
                user_email: user_email
            },
            cache: false,
            success: function(data){            	
                if(data.response == "updated")
                	alert("User data is successfully updated");
                else
                	alert("User data is successfully saved");
            }
    	});
	});

	//share user data/configuration
	$(".page34 .share_btn").on("click", function(){
		var user_id = $(".user_id").val();
		var share_link = window.location.origin + "/share?user_id=" + user_id;
		$("#share_modal .share_link").val(share_link);
		$("#share_modal").modal("show");
	});

	//Copy share link
	$("#share_modal button").on("click", function(){
		$("#share_modal .share_link").select();
		document.execCommand("Copy");
	});

	//page33 bonus description when bonus amount/time period changes
	$(".page33").on('keyup, change', '.bonus_input, select', function(){
		var bonus_input_doms = $(".page33 .bonus_input");
		var time_period_doms = $(".page33 select");
		var bonus_html = ``;
		for(var i = 0; i < bonus_input_doms.length; i++){
			if($(".page33 .bonus_input").eq(i).val() != ""){
				if(i == 0){
					bonus_html += `<span class="small_text">+$`+$(".page33 .bonus_input").eq(i).val()+` bonus per `+time_period_doms[i].value+` for acheiving outbound prospecting targets</span><br>`;	
				}
				else
					bonus_html += `<span class="small_text">+$`+$(".page33 .bonus_input").eq(i).val()+` bonus per `+time_period_doms[i].value+` for outbound prospecting performance</span><br>`;				
			}
		}

		$(".page33 .bonus_preview_div").html(bonus_html);
	});

	//page35 temporary boost salary bonus validation
	$(".page35 .temp_salary2").on("keyup", function(){
		var temp_salary2 = parseFloat($(this).val());
		var temp_salary1 = parseFloat($(".page35 .temp_salary1").val());
		if(temp_salary2 >= temp_salary1){
			//users understand that they dont need to make one that decreases each month
			alert("Decrease amount should be lower than temporary salary bonus.");
			$(".page35 .temp_salary2").val(0);
		}
	});
	//page35 temporary boost salary bonus validation
	$(".page35 .temp_salary1").on("keyup", function(){
		var temp_salary1 = parseFloat($(this).val());
		var temp_salary2 = parseFloat($(".page35 .temp_salary2").val());
		if(temp_salary1 <= temp_salary2){
			//users understand that they dont need to make one that decreases each month
			alert("Temporary salary bonus should be bigger than decrease amount each month.");
			var min_value = temp_salary2 + 1;
			$(".page35 .temp_salary1").val(min_value);
		}
	});

	//page39 add tiers button
	$(".page39 .add_tiers_btn").on("click", function(){
		//hide sidebar + body and show only result page
		$(".questions_section").hide();
		$(".result_section").show();

		goToPage(37);
		return;
	});

	//page35 barchart initiation.
	/*var ctx = document.getElementById("myChart").getContext('2d');
	var myChart = new Chart(ctx, {
	  type: 'bar',
	  data: {
	    labels: ["MONTH 1", "MONTH 2", "MONTH 3", "MONTH 4", "MONTH 5", "MONTH 6", "MONTH 7", "MONTH 8", "MONTH 9", "MONTH 10",
	    "MONTH 11", "MONTH 12"],
	    datasets: [{
	      label: 'Base',
	      barThickness: 50,
	      data: [5000, 4000, 4000, 4000, 4000, 4000, 4000, 4000, 4000, 4000, 4000, 4000],
	      backgroundColor: "rgba(50, 50, 55, 0.15)"
	    }]
	  }
	});*/

	//When the next button is clicked for muiltiple choices
	$(".step .next_btn, .step .arrow_next_btn").on("click", function(e) {
		window.current_page = getCurrentPage();
		if(e.target.className.includes("arrow_next_btn")){
			var next_page_id_from_recommendation = e.target.dataset.next;
			var target_page;
			if(window.current_page == 12){
				var chosen_responsibility_answers_doms = getPageValue("5", "5");
				var chosen_responsibilities = JSON.parse(chosen_responsibility_answers_doms).answer;
				if(chosen_responsibilities.length == 2)
					target_page = next_page_id_from_recommendation;
				else{
					var third_responsibility = chosen_responsibilities[2];
					target_page = getTargetPageJobResponsibilities(third_responsibility);
				}
			}
			else{
				if(window.current_page == 29){
					var visible_inputs_doms = $(".page29 input:visible");
					for(var i = 0; i < visible_inputs_doms.length; i++){
						if(visible_inputs_doms.eq(i).val() == ""){
							alert("All inputs are required.");
							return;
						}
					}

					saveToLocalStorage(window.current_page);
					//hide sidebar + body and show only result page
					$(".questions_section").hide();
					$(".result_section").show();
					//get recommended commission percent
					var commission_percent = getPageValue("commission", "commission") ? parseFloat(JSON.parse(getPageValue("commission", "commission")).commission): window.commission;
					if(commission_percent < 5)
						commission_percent = 5;
					$(".page31 .commission_percent").val(commission_percent);

					var info_json = JSON.parse(getPageValue(29, ""));
					// var deals = window.deals = parseInt(info_json.average_rep);
					//var deal_revenue = window.revenue_per_deal = parseInt(numberFormat(info_json.deal_revenue));
					var deal_revenue = window.revenue_per_deal = parseInt(numberFormat($(".page29 .average_revenue_profit").val()));
					var deals = window.deals = parseInt($(".page29 .average_rep").val());

					saveConfiguration("deals", deals);
					saveConfiguration("deal_revenue", deal_revenue);
					saveConfiguration("commission", commission_percent);
					saveConfiguration("base_salary", window.base_salary);
					saveConfiguration("cancel_percentage", $(".percentage_cancel").val() ? $(".percentage_cancel").val() : 10);
					saveConfiguration("deal_variation", 20);
					saveConfiguration("commission_variation", 1);
					saveConfiguration("commission_modifier", 0);
					saveConfiguration("recommendation_variance", 60);

					InitCommissionTable(next_page_id_from_recommendation, deals, deal_revenue, commission_percent);
					updateProgress(80);
					//$(".page" + next_page_id_from_recommendation + " .arrow_next_btn").attr("data-next", 36);
				}

				if(window.current_page == 36){
					//$(".page" + next_page_id_from_recommendation + " .arrow_next_btn").eq(0).attr("data-next", 33);
					$(".page" + next_page_id_from_recommendation + " .arrow_next_btn").eq(1).attr("data-next", 41);
				}

				target_page = next_page_id_from_recommendation;
			}

			//commission precent recommendation
			if(target_page == 31){
				var commission_percent = getPageValue("commission", "commission") ? parseFloat(JSON.parse(getPageValue("commission", "commission")).commission): window.commission;
				if(commission_percent < 5)
					commission_percent = 5;
				$(".page31 .commission_percent").val(commission_percent);

				var info_json = JSON.parse(getPageValue(29, ""));
				var deals = window.deals = parseInt(info_json.average_rep);
				var deal_revenue = window.revenue_per_deal = parseInt(numberFormat(info_json.deal_revenue));
				InitCommissionTable(target_page, deals, deal_revenue, commission_percent);

				$(".page31 .arrow_next_btn").attr("data-next", 38);
				if(checkPageValue("features","Recurring commission (capped)")){
					$(".page31 .arrow_next_btn").attr("data-next", 38);
				}
				else{
					var customer_number = getConfiguration("deals");
					var churn_number = getConfiguration("cancel_percentage");
					$(".page39 .customer_number").text(customer_number);
					$(".page39 .churn_number").text(churn_number);
					$(".page31 .arrow_next_btn").attr("data-next", 39);
				}
			}

			//Recommended temporary salary boost
			if(target_page == 41){
				let dataaaa = {
				    dataValues: [
				    	[2000, 1000, 4000], [1500, 500, 4000], [1000, 800, 4000], [750, 1700,4000],
				    	[500, 2000, 4000], [250, 1500, 4000], [0, 1200, 4000], [0, 1200,4000],
				    	[0, 800, 4000], [0, 1900, 4000], [0, 900, 4000], [0, 2300,4000]
				    	], // for a normal bar chart use multiple arrays with 1 value in each array
				    legend: ["BOOST", "COMMISSION", "BASE" ], // for stacked bar charts
				    legendColors: ["rgba(54, 61, 230, 0.21)", "rgba(230, 75, 54, 0.21)", "rgba(50, 50, 55, 0.21)"], // bar colors
				    barLabels: ["MONTH 1", "MONTH 2", "MONTH 3", "MONTH 4", "MONTH 5", "MONTH 6", "MONTH 7", "MONTH 8",
				     "MONTH 9", "MONTH 10", "MONTH 11", "MONTH 12"], // x-axis labels
				    labelColors: ["black"] // x-axis label colors
				  };

				let options = {
				    chartWidth: "60%", // use valid css sizing
				    chartHeight: "60%", // use valid css sizing
				    chartTitle: "", // enter chart title
				    chartTitleColor: "black", // enter any valid css color
				    chartTitleFontSize: "2rem", // enter a valid css font size
				    yAxisTitle: "", // enter title for y-axis
				    xAxisTitle: "", // enter title for x-axis
				    barValuePosition: "center", // "flex-start" (top), "center", or "flex-end" (bottom)
				    barSpacing: "1%" // "1%" (small), "3%" (medium), "5%" (large)
				  };

				let element = "#add_temporary_salary_boost"; // Use a jQuery selector to select the element to put the chart into

				// Generate chart
				drawBarChart(dataaaa, options, element);
			}

			//go to ramp up
			if(target_page == 36){
				let dataaaa = {
				    dataValues: [
				    	[1000, 4000], [500, 4000], [800, 4000], [1700,4000],
				    	[2000, 4000], [1500, 4000], [1200, 4000], [1200,4000],
				    	[800, 4000], [1900, 4000], [900, 4000], [2300,4000]
				    	], // for a normal bar chart use multiple arrays with 1 value in each array
				    legend: ["COMMISSION", "BASE" ], // for stacked bar charts
				    legendColors: ["rgba(230, 75, 54, 0.21)", "rgba(50, 50, 55, 0.21)"], // bar colors
				    barLabels: ["MONTH 1", "MONTH 2", "MONTH 3", "MONTH 4", "MONTH 5", "MONTH 6", "MONTH 7", "MONTH 8",
				     "MONTH 9", "MONTH 10", "MONTH 11", "MONTH 12"], // x-axis labels
				    labelColors: ["black"] // x-axis label colors
				  };

				  let options = {
				    chartWidth: "60%", // use valid css sizing
				    chartHeight: "60%", // use valid css sizing
				    chartTitle: "", // enter chart title
				    chartTitleColor: "black", // enter any valid css color
				    chartTitleFontSize: "2rem", // enter a valid css font size
				    yAxisTitle: "", // enter title for y-axis
				    xAxisTitle: "", // enter title for x-axis
				    barValuePosition: "center", // "flex-start" (top), "center", or "flex-end" (bottom)
				    barSpacing: "1%" // "1%" (small), "3%" (medium), "5%" (large)
				  };

				  let element = "#bar_div_ramp"; // Use a jQuery selector to select the element to put the chart into

				  // Generate chart
				  drawBarChart(dataaaa, options, element);

				  //$(".page" + next_page_id_from_recommendation + " .arrow_next_btn").attr("data-next", 40);
			}

			//Edit Temporary Salary Boost
			if(target_page == 35){
				let dataaaa = {
				    dataValues: [
				    	[2000, 1000, 4000], [1500, 500, 4000], [1000, 800, 4000], [750, 1700,4000],
				    	[500, 2000, 4000], [250, 1500, 4000], [0, 1200, 4000], [0, 1200,4000],
				    	[0, 800, 4000], [0, 1900, 4000], [0, 900, 4000], [0, 2300,4000]
				    	], // for a normal bar chart use multiple arrays with 1 value in each array
				    legend: ["BOOST", "COMMISSION", "BASE" ], // for stacked bar charts
				    legendColors: ["rgba(54, 61, 230, 0.21)", "rgba(230, 75, 54, 0.21)", "rgba(50, 50, 55, 0.21)"], // bar colors
				    barLabels: ["MONTH 1", "MONTH 2", "MONTH 3", "MONTH 4", "MONTH 5", "MONTH 6", "MONTH 7", "MONTH 8",
				     "MONTH 9", "MONTH 10", "MONTH 11", "MONTH 12"], // x-axis labels
				    labelColors: ["black"] // x-axis label colors
				  };

				let options = {
				    chartWidth: "60%", // use valid css sizing
				    chartHeight: "60%", // use valid css sizing
				    chartTitle: "", // enter chart title
				    chartTitleColor: "black", // enter any valid css color
				    chartTitleFontSize: "2rem", // enter a valid css font size
				    yAxisTitle: "", // enter title for y-axis
				    xAxisTitle: "", // enter title for x-axis
				    barValuePosition: "center", // "flex-start" (top), "center", or "flex-end" (bottom)
				    barSpacing: "1%" // "1%" (small), "3%" (medium), "5%" (large)
				  };

				let element = "#edit_temporary_salary_boost"; // Use a jQuery selector to select the element to put the chart into

				// Generate chart
				drawBarChart(dataaaa, options, element);
				//$(".page35 .arrow_next_btn").attr("data-next", 33);
			}

			if(target_page == 34){
				//hide sidebar + body and show only result page
				$(".questions_section").hide();
				$(".result_section").show();

				var bonus_amount_doms = $(".page33 input[type='number']");
				var period_doms = $(".page33 select");
				var bonuses = [];
				var periods = [];
				var bonus_html = ``;
				for(var i = 0; i < bonus_amount_doms.length; i++){
					periods.push(period_doms[i].value);
					bonuses.push(bonus_amount_doms[i].value);
					if(i == 0){
						bonus_html += `<li><span class="small_text">+$`+bonus_amount_doms[i].value+` bonus per `+period_doms[i].value+` for acheiving outbound prospecting targets</span></li>`;	
					}
					else
						bonus_html += `<li><span class="small_text">+$`+bonus_amount_doms[i].value+` bonus per `+period_doms[i].value+` for outbound prospecting performance</span></li>`;				
				}

				var new_bonus = $("#revenue_range").val();
				
				base_salary = parseFloat(base_salary) - parseFloat(new_bonus);
				window.base_salary = base_salary;
				saveConfiguration("base_salary", base_salary);
				var commission_percent = getPageValue("commission", "commission") ? parseFloat(JSON.parse(getPageValue("commission", "commission")).commission): window.commission;
				if(commission_percent < 5)
					commission_percent = 5;

				var chosen_features = getPageValue("features", "features");
				if(chosen_features){
					var features = JSON.parse(chosen_features).features;
					format = features[0];
					$(".page34 .left_half .format_text").text(format);

				}			

				$(".page34 .base_salary").text(formatPrice(base_salary));
				$(".page34 .commission_percent").text(commission_percent);
				$(".page34 .bonus_row ul li").remove();
				$(".page34 .bonus_row ul").append(bonus_html);
				$(".page34 .isProfitRevenue").html(IsProfitRevenue());

				updateProgress(100);
			}

			if(window.current_page == 37){
				//hide sidebar + body and show only result page
				$(".questions_section").hide();
				$(".result_section").show();

				var time_period_doms = $(".page37 [name='tier_period']");
				var percent_doms = $(".page37 [name='tier_percent']");
				var percents = [];
				var months = [];
				for(var i = 0; i < time_period_doms.length; i++){
					percents.push(percent_doms[i].value);
					months.push(time_period_doms[i].value);
				}

				saveTiers(percents, months);
				goToPage(33);
				return;
			}
			goToPage(target_page);
			return;
		}
		else{
			//if no active answer is chosen, we deactivate next button.
			if(window.current_page != 1 && window.current_page != 12 && $(".page" + window.current_page + " .answer_div .active").length == 0){
				if(window.current_page != 29){
					$(".page" + window.current_page + " .button_div .next_btn").attr("disabled", "disabled");
					return;
				}
			}
			else
				$(".page" + window.current_page + " .button_div .next_btn").removeAttr("disabled");

			if(window.current_page == 1 || window.current_page == 5 || multiple_pages.includes(window.current_page) || window.current_page == 25 || window.current_page == 29 || window.current_page == 33) {//if multiple choices			
				saveToLocalStorage(window.current_page);
			}

			if(window.current_page == 1){
				goToPage(16);
				return;
			}
			
			if(window.current_page == 3){ //end of prospecting
				var chosen_responsibility_answers_doms = getPageValue("5", "5");
				var chosen_responsibilities = JSON.parse(chosen_responsibility_answers_doms).answer;
				if(chosen_responsibilities.length == 1)
					var target_page = 8;
				else{
					var second_responsibility = chosen_responsibilities[1];
					var target_page = getTargetPageJobResponsibilities(second_responsibility);
				}
				goToPage(target_page);
				return;
			}

			//What are the rep's responsibilities?
			if(window.current_page == 5){
				saveFeature(2, "Bonuses");

				var chosen_responsibility_answers_doms = $(".page5 .answer_div .active");
				var first_chosen_answer = chosen_responsibility_answers_doms.eq(0).find("label").text();
				var target_page = getTargetPageJobResponsibilities(first_chosen_answer);

				goToPage(target_page);
				return;
			}

			if(window.current_page == 9 || window.current_page == 10){
				updateProgress(30);
				goToPage(11);
				return;
			}
			if(window.current_page == 11){
				goToPage(13);
				return;
			}

			if(window.current_page == 24){
				var subtract = -250;
				var temp = [];
				temp["title"] = "subtract $250";
				temp["description"] = "subtract $250";

				var chosen_answers_doms = $(".page24 .answer_div .active");
				for(var i = 0; i < chosen_answers_doms.length; i++){
					var chosen_answer = chosen_answers_doms.eq(i).find("label").text();

					if(chosen_answer == "Our industry is complex and can be difficult to master. Some prior experience in our industry is a must."){
						var subtract = 500;
						temp["title"] = "Add $500";
						temp["description"] = "Add $500";
					}
				}				

				var temp_price = parseFloat(base_salary) + subtract;				
				if(temp_price < 3000)
					temp_price = 3000;

				base_salary = window.base_salary = temp_price;
				$(".page25 .base_salary").val(formatPrice(base_salary));
				saveFeature(4, "Base Pay " + formatPrice(base_salary));

				recommendation = temp;
				saveRecommendation(4, recommendation);
				target_page = 25;
				updateProgress(60);
				goToPage(25);
				return;
			}

			if(window.current_page == 25){
				goToPage(28);
				return;
			}

			/*if(window.current_page == 29){
				var visible_inputs_doms = $(".page29 input:visible");
				for(var i = 0; i < visible_inputs_doms.length; i++){
					if(visible_inputs_doms.eq(i).val() == ""){
						alert("All inputs are required.");
						return;
					}
				}
				//hide sidebar + body and show only result page
				$(".questions_section").hide();
				$(".result_section").show();
				//get recommended commission percent
				var commission_percent = getPageValue("commission", "commission") ? parseFloat(JSON.parse(getPageValue("commission", "commission")).commission): window.commission;
				var info_json = JSON.parse(getPageValue(29, ""));
				var deals = window.deals = parseInt(info_json.average_rep);
				var deal_revenue = window.revenue_per_deal = parseInt(numberFormat(info_json.deal_revenue));

				saveConfiguration("deals", deals);
				saveConfiguration("deal_revenue", deal_revenue);
				saveConfiguration("commission", commission_percent);
				saveConfiguration("base_salary", window.base_salary);
				saveConfiguration("cancel_percentage", $(".percentage_cancel").val());
				saveConfiguration("deal_variation", 20);
				saveConfiguration("commission_variation", 1);
				saveConfiguration("commission_modifier", 0);
				saveConfiguration("recommendation_variance", 60);

				InitCommissionTable(31, deals, deal_revenue, commission_percent);
				updateProgress(80);
				goToPage(31);
				return;
			}*/

			if(window.current_page == 31){
				//hide sidebar + body and show only result page
				$(".questions_section").hide();
				$(".result_section").show();

				var commission_percent = getPageValue("commission", "commission") ? parseFloat(JSON.parse(getPageValue("commission", "commission")).commission): window.commission;			
				if(commission_percent < 5)
					commission_percent = 5;

				$(".page38 .commission_percent").text(commission_percent);

				//InitCommissionTierTable(38, 500, percents);
				//Based on capped/uncapped status
				var cappted_status;
				if(checkPageValue("features","Recurring commission (capped)")){
					goToPage(38);
				}
				else{
					var customer_number = getConfiguration("deals");
					var churn_number = getConfiguration("cancel_percentage");
					$(".page39 .customer_number").text(customer_number);
					$(".page39 .churn_number").text(churn_number);
					goToPage(39);
				}
				return;
			}

			
			//go to determination bonus page
			if(window.current_page == 38){
				//hide sidebar + body and show only result page
				$(".questions_section").hide();
				$(".result_section").show();

				goToPage(33);
				return;
			}

			if(window.current_page == 39){
				//hide sidebar + body and show only result page
				$(".questions_section").hide();
				$(".result_section").show();

				goToPage(33);
				return;
			}

			

			goToNextPage();
		}
		
	});
	
	//get target page for multiple job responsibilities
	function getTargetPageJobResponsibilities(answer){
		if(answer == "Managing Sales Reps"){
			target_page = 6;
		}
		else if(answer == "Closing"){
			var bonus_example_html;
			var temp = [];

			bonus_example_html = `
				<li>Bonus for conversion target -- e.g. monthly bonus for exceeding target qualified-to-close conversion rate of 50%</li>
				<li>Bonus for follow up task completion -- e.g. monthly bonus for exceeding daily follow-up task completion target of 95%</li>
				<li>Bonus KPI contest winner -- e.g. bonus to whichever sales rep has the highest average deal size this quarter</li>
			`;

			temp.push("Bonus for conversion target -- e.g. monthly bonus for exceeding target qualified-to-close conversion rate of 50%");
			temp.push("Bonus for follow up task completion -- e.g. monthly bonus for exceeding daily follow-up task completion target of 95%");
			temp.push("Bonus KPI contest winner -- e.g. bonus to whichever sales rep has the highest average deal size this quarter");

			$(".page12 .headline2 label").text(answer);
			$(".page12 .headline4 ul").html(bonus_example_html);

			var recommendation = [];
			recommendation["title"] = `Bonus for closing`;
			recommendation["description"] = temp;
			saveFeature(2, "Bonus for closing");
			saveRecommendation(1, recommendation);
			target_page = 12;
			$(".page12 .arrow_next_btn").attr("data-next", 8);
		}
		else if(answer == "Managing Accounts")
			target_page = 4;
		else if(answer == "Prospecting")
			target_page = 3;

		return target_page;
	}

	//determine profit/revenue
	function IsProfitRevenue(){
		var result = "profit"; //we set profit by default
		var chosen_features = getPageValue("features", "features");
		if(chosen_features){
			var features = JSON.parse(chosen_features).features;
			if(features && 1 in features){
				var feature_value = features[1];
				result = feature_value.split(" ")[2];	
			}			
		}
		
		return result;
	}
	//save chosen option with page number to LocalStorage
	async function saveToLocalStorage(page_num, recommendation = ""){
		var question = $(".page" + window.current_page + " .header_line .page_title").text();
		var answers = [];
		var answer;
		if($(".page" + window.current_page + " .answer_div .active").length > 1){
			var active_options = $(".page" + window.current_page + " .answer_div .active label");			
			for(var i = 0; i < active_options.length; i++){
				answer = active_options[i].innerText;
				answers.push(answer);
			}
		}
		else if($(".page" + window.current_page + " .answer_div .active").length == 1){
			answer = $(".page" + window.current_page + " .answer_div .active label").text().trim();
			answers.push(answer);
		}

		//format the item for each step of question/answer
		var item = {
			"page": (page_num) ? page_num: window.current_page,
			"question": question,
			"answer": answers
		};

		if(window.current_page == 1){
			item["answer"] = "Salary + Commission";
			let a = await saveFeature(0, "Salary + Commission");
		}

		if(window.current_page == 3){
			for(var i = 0; i < answers.length; i++){
				var temp = [];
				if(answers[i] == "Most sales will come from outbound prospecting or cold outreach"){
					temp.push("Bonus for outreach volume target -- e.g. monthly bonus for contacting 30+ new accounts per day, on average");
					temp.push("Bonus for outreach quality target -- e.g. monthly bonus for exceeding target lead-to-close ratio of 10%");
					temp.push("Bonus per performance -- e.g. $100 for each scheduled qualified appointment");					
					window.commission = window.commission + 1;

					var recommendation = [];
					saveFeature(2, "Bonus for outbound prospecting");
					recommendation["title"] = `Bonus for outbound prospecting`;
					recommendation["description"] = temp;

					saveRecommendation(1, recommendation);
				}
				else if(answers[i] == "Reps will have consistent inbound leads"){					
					temp.push("Bonus for conversion target -- e.g. monthly bonus for exceeding target qualified-to-close conversion rate of 50%");
					temp.push("Bonus for response time target -- e.g. monthly bonus for exceeding target response time of under 10 minutes");
					window.commission = window.commission - 1;

					var recommendation = [];
					recommendation["title"] = `Bonus for inbound leads`;
					recommendation["description"] = temp;
					saveFeature(2, "Bonus for inbound leads");
					saveRecommendation(1, recommendation);
				}
				else if(answers[i] == "Most outbound leads are warm (e.g. old customers, referrals, they're familiar with us, etc.)" ||
					answers[i] == "We have access to high quality, accurate, up to date contact information for leads, allowing sales reps to connect directly with decision makers"){
					window.commission = window.commission - 1;
				}
				else if(answers[i] == "Leads and contact information are not provided to the rep; they have to find this on their own." || 
					answers[i] == "Most outbound leads are cold (i.e. they've never heard of us, they're not expecting our call)" ){
					window.commission = window.commission + 1;
				}

				updateCommission(window.commission);
			}
			
		}

		//multiple choice selection
		/*if(window.current_page == 24){
			var base_salary = $(".base_salary").val();
			item["base_salary"] = base_salary;
		}*/

		//salary edit modal page
		if(window.current_page == 25){
			var base_salary = $(".base_salary").val();
			item["base_salary"] = base_salary;
		}

		//page29. save average deal revenue/profit, average number of deals, percentage of cancel
		if(window.current_page == 29){
			item["question"] = "What's your average monthly revenue / profit per customer?";
			item["deal_revenue"] = $(".average_revenue_profit").val();
			item["average_rep"] = $(".average_rep").val();
			item["percentage_cancel"] = $(".percentage_cancel").val();
		}

		//page33: determine bonuses
		if(window.current_page == 33){
			item["question"] = "Determine Bonuses";
			item["bonus1"] = $(".page33 .bonus2").val();
			item["bonus1_period"] = $(".page33 .bonus2_period").val();
			item["bonus2"] = $(".page33 .bonus3").val();
			item["bonus2_period"] = $(".page33 .bonus3_period").val();
			item["new_bonus"] = $("#revenue_range").val();
		}
		
		if(recommendation)
			item.recommendation = recommendation;

		//check if the user has already chosen answers for this page. If already exists, we update, not add a new one.
		var has_page_answers = hasPageAnswers(window.current_page);
		
		if(has_page_answers){
			updatePageAnswers(window.current_page, answers, recommendation);
		}
		else{
			if (localStorage.getItem('commission_calculator') !== null){
				window.items = localStorage.getItem("commission_calculator");
				var json = JSON.parse(window.items);
				json.push(JSON.stringify(item));
				window.items = json;
			}
			else
				window.items.push(JSON.stringify(item));
			
			localStorage.setItem("commission_calculator", JSON.stringify(window.items));
			return;
		}		
	}

	//update commission
	function updateCommission(commission_value){
		var localstorage = localStorage.getItem("commission_calculator");
		var json = JSON.parse(localstorage);
		if(json){
			if(hasPageAnswers("commission")){
				for(var i = 0; i < json.length; i++){
					var json_item = JSON.parse(json[i]);
					if(json_item.page == "commission"){						
						json_item.commission = commission_value;
						json[i] = JSON.stringify(json_item);
						localStorage.removeItem("commission_calculator");
						window.items = json;
					}
				}
			}
			else
			{
				var commission_item = {
					"page": "commission",
					"commission": commission_value
				};
				window.items.push(JSON.stringify(commission_item));
			}
		}
		else{
			var commission_item = {
				"page": "commission",
				"commission": commission_value
			};
			window.items.push(JSON.stringify(commission_item));
		}

		localStorage.setItem("commission_calculator", JSON.stringify(window.items));
	}

	//update configuration
	function saveConfiguration(key, value){
		var localstorage = localStorage.getItem("commission_calculator");
		var json = JSON.parse(localstorage);
		var configuration_array = [];
		var temp = [];
		if(json){
			if(hasPageAnswers("configuration")){
				var configuration = getPageValue("configuration");
				for(var i = 0; i < json.length; i++){
					var json_item = JSON.parse(json[i]);
					if(json_item.page == "configuration"){

						json_item[`${key}`] = value;

						json[i] = JSON.stringify(json_item);
						// localStorage.removeItem("commission_calculator");
						window.items = json;
					}
				}
			}
			else
			{
				var configuration_item = {
					"page": "configuration"
				};
				configuration_item[`${key}`] = value;
				
				window.items.push(JSON.stringify(configuration_item));
			}
		}
		else{
			var configuration_item = {
				"page": "configuration"
			};
			configuration_item[`${key}`] = value;
			
			window.items.push(JSON.stringify(configuration_item));
		}

		localStorage.setItem("commission_calculator", JSON.stringify(window.items));
	}

	//get configuration
	function getConfiguration(key){
		var localstorage = localStorage.getItem("commission_calculator");
		var json = JSON.parse(localstorage);
		var configuration_array = [];
		var temp = [];
		if(json){
			if(hasPageAnswers("configuration")){
				var configuration = getPageValue("configuration");
				for(var i = 0; i < json.length; i++){
					var json_item = JSON.parse(json[i]);
					if(json_item.page == "configuration" && key in json_item){
						return json_item[`${key}`];
					}
				}
			}
			else
				return false;
		}
		else
			return false;
	}

	//save Bonuses
	function saveBonuses(bonuses, periods){
		var localstorage = localStorage.getItem("commission_calculator");
		var json = JSON.parse(localstorage);
		if(json){
			if(hasPageAnswers("bonuses")){
				for(var i = 0; i < json.length; i++){
					var json_item = JSON.parse(json[i]);
					if(json_item.page == "bonuses"){
						json_item.periods = periods;
						json_item.bonuses = bonuses;

						json[i] = JSON.stringify(json_item);
						// localStorage.removeItem("commission_calculator");
						window.items = json;
					}
				}
			}
			else{
				var tier_item = {
					"page": "bonuses",
					"periods": periods,
					"bonuses": bonuses
				};
				
				window.items.push(JSON.stringify(tier_item));
			}
		}
		else{
			var tier_item = {
				"page": "bonuses",
				"periods": periods,
				"bonuses": bonuses
			};			
			window.items.push(JSON.stringify(tier_item));
		}
		
		localStorage.setItem("commission_calculator", JSON.stringify(window.items));
	}

	//save tiers
	function saveTiers(percents, months){
		var localstorage = localStorage.getItem("commission_calculator");
		var json = JSON.parse(localstorage);
		if(json){
			if(hasPageAnswers("tiers")){
				for(var i = 0; i < json.length; i++){
					var json_item = JSON.parse(json[i]);
					if(json_item.page == "tiers"){
						json_item.months = months;
						json_item.percents = percents;

						json[i] = JSON.stringify(json_item);
						// localStorage.removeItem("commission_calculator");
						window.items = json;
					}
				}
			}
			else{
				var tier_item = {
					"page": "tiers",
					"months": months,
					"percents": percents
				};
				
				window.items.push(JSON.stringify(tier_item));
			}
		}
		else{
			var tier_item = {
				"page": "tiers",
				"months": months,
				"percents": percents
			};			
			window.items.push(JSON.stringify(tier_item));
		}
		
		localStorage.setItem("commission_calculator", JSON.stringify(window.items));
	}
	//save recommendation
	function saveRecommendation(index, recommendation){
		var has_recommendations = hasPageAnswers("recommendations");
		if(has_recommendations){
			if(hasRecommendations("recommendations", index)){
				updateRecommendationAnswers(index, recommendation);
				
			}
			else{
				var chosen_recommendations = getPageValue("recommendations", "descriptions");
				var chosen_titles = getPageValue("recommendations", "titles");

				var recommendations = JSON.parse(chosen_recommendations).descriptions;
				var titles = JSON.parse(chosen_recommendations).titles;
				recommendations.splice(index, 0, recommendation["description"]);
				titles.splice(index, 0, recommendation["title"]);
				updateRecommendationAnswers(index, recommendation, recommendations, titles);
			}
		}
		else{
			var recommendations = [];
			var titles = [];
			titles.push(recommendation["title"]);
			recommendations.push(recommendation["description"]);
			updateRecommendationAnswers(index, recommendation, recommendations, titles);
		}
	}

	//update recommendation answer
	function updateRecommendationAnswers(index, recommendation, recommendations_all = null, titles_all = null){
		var localstorage = localStorage.getItem("commission_calculator");
		var json = JSON.parse(localstorage);
		if(json){
			if(hasPageAnswers("recommendations")){
				for(var i = 0; i < json.length; i++){
					var json_item = JSON.parse(json[i]);
					if(json_item.page == "recommendations"){
						var recommendations_temp, titles_temp;
						if(recommendations_all){
							recommendations_temp = recommendations_all;
							titles_temp = titles_all;
						}
						else{
							recommendations_temp = json_item.descriptions;
							titles_temp = json_item.titles;
							recommendations_temp[index] = recommendation["description"];
							titles_temp[index] = recommendation["title"];
						}

						json_item.descriptions = recommendations_temp;
						json_item.titles = titles_temp;
						json[i] = JSON.stringify(json_item);
						localStorage.removeItem("commission_calculator");
						window.items = json;
					}
				}
			}
			else{
				var titles = [];
				var recomendation_descriptions = [];
				titles.push(recommendation["title"]);
				recomendation_descriptions.push(recommendation["description"]);

				var recommendations_item = {
					"page": "recommendations",
					"titles": titles,
					"descriptions": recomendation_descriptions
				};
				
				window.items.push(JSON.stringify(recommendations_item));
			}			
		}
		else{
			var titles = [];
			var recomendation_descriptions = [];
			titles.push(recommendation["title"]);
			recomendation_descriptions.push(recommendation["description"]);

			var recommendations_item = {
				"page": "recommendations",
				"titles": titles,
				"descriptions": recomendation_descriptions
			};
			window.items.push(JSON.stringify(recommendations_item));
		}

		localStorage.setItem("commission_calculator", JSON.stringify(window.items));
	}

	function hasRecommendations(page_num, index){
		var localstorage = localStorage.getItem("commission_calculator");
		var json = JSON.parse(localstorage);
		var found_flag = false;
		if(json){//if localStorage has data
			for(var i = 0; i < json.length; i++){
				var json_item = JSON.parse(json[i]);	
				if(json_item.page == page_num && (index < json_item.descriptions.length && json_item.descriptions[index] !== undefined) ){
					found_flag = true;
				}
			}
		}
		
		return found_flag;
	}

	//save chosen feature
	function saveFeature(index, feature){
		var has_features = hasPageAnswers("features");
		if(has_features){
			if(hasFeatures("features", index)){
				updateFeatureAnswers(index, feature);
			}
			else{
				var chosen_features = getPageValue("features", "features");
				var features = JSON.parse(chosen_features).features;
				features.splice(index, 0, feature);
				updateFeatureAnswers(index, feature, features);
			}
		}
		else{
			var features = [];
			features.push(feature);			
			updateFeatureAnswers(index, feature, features);
		}
	}

	//update feature answer
	function updateFeatureAnswers(index, feature, features_all = null){		
		var localstorage = localStorage.getItem("commission_calculator");
		var json = JSON.parse(localstorage);
		if(json){
			if(hasPageAnswers("features")){
				for(var i = 0; i < json.length; i++){
					var json_item = JSON.parse(json[i]);
					if(json_item.page == "features"){
						if(features_all)
							var features_temp = features_all;
						else{
							var features_temp = json_item.features;
							features_temp[index] = feature;
						}					

						json_item.features = features_temp;
						json[i] = JSON.stringify(json_item);
						localStorage.removeItem("commission_calculator");
						window.items = json;
					}
				}
			}
			else{
				var temp = [];
				temp.push(feature);
				var features_item = {
					"page": "features",
					"features": temp
				};
				window.items.push(JSON.stringify(features_item));
			}
		}
		else{
			var temp = [];
			temp.push(feature);

			var features_item = {
				"page": "features",
				"features": features_all.length > 0 ? features_all: temp
			};

			window.items.push(JSON.stringify(features_item));
		}

		localStorage.setItem("commission_calculator", JSON.stringify(window.items));
	}
	
	function hasFeatures(page_num, index){
		var localstorage = localStorage.getItem("commission_calculator");
		var json = JSON.parse(localstorage);
		var found_flag = false;
		if(json){//if localStorage has data
			for(var i = 0; i < json.length; i++){
				var json_item = JSON.parse(json[i]);
				if(json_item.page == page_num && (index < json_item.features.length && json_item.features[index] !== undefined) ){
					found_flag = true;
				}
			}
		}
		
		return found_flag;
	}

	//Get progress bar
	/*function updateProgress(page_num){
		var total_steps = 5;
		var processed_steps = 0;

		var chosen_features = getPageValue("features", "features");

		if(chosen_features){
			var features = JSON.parse(chosen_features).features;
			processed_steps = features.length;
		}
		
		var percent = (processed_steps - 1 ) / total_steps * 100;
		var percent_string = percent + "%";

		$("#progressDivId #progressBar")[0].style.width = percent_string; //update progressbar width
		$("#progressDivId #percent").html(percent_string); //update percent string in the center of progress bar

		if(features){
			var features_html = ``;
			for(var i = 0; i < features.length; i++){
				var li_html = `<li>` + features[i] + `</li>`;
				features_html += li_html;
			}
			$(".sidebar_text_div .selection_sidebar").html(features_html);
		}

		return percent;
	}*/
	function updateProgress(percentage){		
		/*
		var chosen_features = getPageValue("features", "features");
		var default_sidebar_menus = [
			["Salary + Commission", 1], 
			["Choose Commission Types (1/2)", 16], 
			["Choose Commission Types (2/2)", 5], 
			["Choose Commission Frequency", 13],
			["Choose Base Pay", 20],
			["Determine Commission Values", 28]
		];
		if(chosen_features){
			var features = JSON.parse(chosen_features).features;
		}*/
		
		var percent = percentage;
		var percent_string = percent + "%";

		$("#progressDivId #progressBar")[0].style.width = percent_string; //update progressbar width
		$("#progressDivId #percent").html(percent_string); //update percent string in the center of progress bar

		/*if(features){
			var features_html = ``;
			var active_class = '';
			for(var i = 0; i < features.length; i++){
				if(i == features.length - 1)
					active_class = "active";
				var li_html = `<li data-target="` + default_sidebar_menus[i][1] + `" class="`+active_class+`">` + default_sidebar_menus[i][0] + `</li>`;
				features_html += li_html;
			}
			$(".sidebar_text_div .selection_sidebar").html(features_html);
		}*/

		return percent;
	}

	//Price format numbers $10,000.
	function formatPrice(price){
		var formatter = new Intl.NumberFormat('en-US', {
		  style: 'currency',
		  currency: 'USD',
		  maximumFractionDigits: 0,
		});

		return formatter.format(price);
	}

	//Number format
	function numberFormat(num){
		var number = num.replace(/\D/g, "");
		return number;
	}

	//update page answers
	function updatePageAnswers(page_num, answers, recommendation = null){
		var localstorage = localStorage.getItem("commission_calculator");
		var json = JSON.parse(localstorage);
		if(json){
			for(var i = 0; i < json.length; i++){
				var json_item = JSON.parse(json[i]);
				if(json_item.page == page_num){
					json_item.answer = answers;
					if(recommendation)
						json_item.recommendation = recommendation;
					else
						json_item.recommendation = '';

					//particaular case for average revnue/profit/cancel percent update
					if(page_num == 29)
					{
						json_item.deal_revenue = $(".average_revenue_profit").val();
						json_item.average_rep = $(".average_rep").val();
						json_item.percentage_cancel = $(".percentage_cancel").val();
					}

					if(page_num == 25)
					{
						json_item.base_salary = window.base_salary;
					}

					json[i] = JSON.stringify(json_item);
					localStorage.removeItem("commission_calculator");
					
					window.items = json;
					localStorage.setItem("commission_calculator", JSON.stringify(json));
				}
			}
		}
	}

	//get range slider value when user changes for bonus
	$("#revenue_range").on("change", function(){
		var range_value = $(this).val();
		var formatted_price = formatPrice(range_value);
		$(".new_bonus_slider").html(formatted_price);
	});

	//check if page has already chosen answers, if yes we will update the answer option through updatePageAnswers()
	//This is the case when user comes back and changes the previously chosen option
	function hasPageAnswers(page_num){
		var localstorage = localStorage.getItem("commission_calculator");
		var json = JSON.parse(localstorage);
		if(json){//if localStorage has data
			for(var i = 0; i < json.length; i++){
				var json_item = JSON.parse(json[i]);
				if(json_item.page == page_num /*&& json_item.answer != ""*/)
					return true;
			}
		}
		else
			return false;
	}

	//check if certain value is chosen in the past
	function checkPageValue(page_num, check_value){
		var localstorage = localStorage.getItem("commission_calculator");
		var json = JSON.parse(localstorage);
		var found_flag = false;
		if(json){//if localStorage has data
			for(var i = 0; i < json.length; i++){
				var json_item = JSON.parse(json[i]);
				//check_value = check_value/*.replace(/\s/g, "")*/;
				if(json_item.page == page_num){
					if(page_num == "features")
					{	
						if(json_item.features){
							for(var k = 0; k < json_item.features.length; k++){
								if(json_item.features[k] == check_value)
									found_flag = true;
							}	
						}						
					}
					else{
						//remove white space in the string
						var saved_answer = json_item.answer/*.replace(/\s/g, "")*/;
						if(!saved_answer)
							continue;

						if(saved_answer.toLowerCase() == check_value.toLowerCase())
							found_flag = true;
					}
				}		
			}
			return found_flag;
		}
		else
			return found_flag;
	}

	//get certain page value of certain key
	function getPageValue(page_num, key){
		var localstorage = localStorage.getItem("commission_calculator");
		var json = JSON.parse(localstorage);
		if(json){//if localStorage has data
			for(var i = 0; i < json.length; i++){
				var json_item = JSON.parse(json[i]);
				if(json_item.page == page_num){
					return JSON.stringify(json_item);
				}				
			}
		}
		else
			return false;
	}

	//go to the next page
	function goToNextPage(){
		var next_page = parseInt(window.current_page) + 1;		
		goToPage(next_page);
	}

	//go to the previous page
	//i.e I am on slide 10 now but I want to skip to page 2 then, back buttton will remember slide 10. 
	//and back button on slide 2 will lead to slide 10, not to slide 1.
	function goToPrevPage(){
		//get page history
		//way1
		/*var current_page_index = window.browsing_history.indexOf(current_page);
		var prev_page = window.browsing_history[current_page_index - 1];*/
		//way2
		if(window.browsing_history.length > 1){
			window.browsing_history.pop();
			var prev_page = window.browsing_history.at(-1);
			if(window.current_page == 31)
			{
				$(".questions_section").show();
				$(".result_section").hide();
			}
			goToPage(prev_page);
		}
		else
			return;
	}

	//go to the certain page from page ID
	function goToPage(page_id, target_active_menu_page){
		//hide current active page before going to the certain page.
		$(".page" + window.current_page).hide();
		console.log("page" + window.current_page + " -> page" + page_id);

		//save page history
		if(!window.browsing_history.includes(window.current_page))
			window.browsing_history.push(window.current_page);
		if(!window.browsing_history.includes(page_id))
			window.browsing_history.push(page_id);		

		var chosen_features = getPageValue("features", "features");
		if(chosen_features){
			var features = JSON.parse(chosen_features).features;
		}

		//Validation for the start/end page.
		if(page_id < 1/* || page_id > $(".step").length*/)
			return;
		else{
			$(".calculator_body .page" + getCurrentPage()).removeClass("active");
			//updateProgress(page_id);
			$(".page" + page_id).show();
			$(".page" + page_id).addClass("active");
			$(".current_page").val(page_id);
			window.current_page = page_id;

			if(features){
				var features_html = ``;
				var active_class = '';
				for(var i = 0; i < features.length; i++){
					if(target_active_menu_page){
						if(parseFloat(target_active_menu_page) == parseFloat(default_sidebar_menus[i][1]))
							active_class = "active";
						else
							active_class = "";
					}
					else{
						if(i == features.length - 1)
							active_class = "active";
						else
							active_class = "";
					} 
						
					var li_html = `<li data-target="` + default_sidebar_menus[i][1] + `" class="`+active_class+`">` + default_sidebar_menus[i][0] + `</li>`;
					features_html += li_html;
				}
				$(".sidebar_text_div .selection_sidebar").html(features_html);
			}
		}
	}

	//get current active page
	function getCurrentPage(){
		var active_page = $(".current_page").val();
		return parseInt(active_page);
	}

	//share page JS
	if(window.location.href.includes("share/?user_id=")){
		$(".calculator_container").css("height", "unset");
		$(".calculator_container").css("margin-top", "1rem");
		var data = ajax_obj.data;
		var user_id = ajax_obj.user_id;
		var user_login = ajax_obj.user_login;
		var user_email = ajax_obj.user_email;

		var json_data = [];
		for(var i = 0; i < data.length; i++){
			var array_data = data[i];
			var formatted__string = JSON.stringify(array_data);
	    	var str = formatted__string.replace(/\\/g, '');
	    	str = str.replace(/^[“”"]+|[“”"]+$/g, "");
			json_data[i] = str;
		}
		
		localStorage.removeItem("commission_calculator");
		//put DATA from DB to localStorage and show the corresponding result to the shared user.
		window.items = json_data;
		localStorage.setItem("commission_calculator", JSON.stringify(window.items));

		var bonus_data = getPageValue("bonuses", "bonuses");
		var bonus_periods = JSON.parse(bonus_data).periods;
		var bonus_bonuses = JSON.parse(bonus_data).bonuses;		

		var bonus_html = ``;
		for(var i = 0; i < bonus_periods.length; i++){
			if(i == 0){
				bonus_html += `<li><span class="small_text">+$`+bonus_bonuses[i]+` bonus per `+ bonus_periods[i]+` for acheiving outbound prospecting targets</span></li>`;	
			}
			else
				bonus_html += `<li><span class="small_text">+$`+bonus_bonuses[i]+` bonus per `+ bonus_periods[i]+` for outbound prospecting performance</span></li>`;				
		}

		var new_bonus_data = getPageValue(33, 33);
		var new_bonus = JSON.parse(new_bonus_data).new_bonus;

		var base_salary = getConfiguration("base_salary") ? getConfiguration("base_salary") : 4000;
		base_salary = parseFloat(base_salary) - parseFloat(new_bonus);
		window.base_salary = base_salary;
		
		var commission_percent = getPageValue("commission", "commission") ? parseFloat(JSON.parse(getPageValue("commission", "commission")).commission): window.commission;
		if(commission_percent < 5)
			commission_percent = 5;

		var chosen_features = getPageValue("features", "features");
		if(chosen_features){
			var features = JSON.parse(chosen_features).features;
			format = features[0];
			$(".page34 .left_half .format_text").text(format);

		}			

		$(".page34 .base_salary").text(formatPrice(base_salary));
		$(".page34 .commission_percent").text(commission_percent);
		$(".page34 .bonus_row ul li").remove();
		$(".page34 .bonus_row ul").append(bonus_html);
		$(".page34 .isProfitRevenue").html(IsProfitRevenue());
	}
});