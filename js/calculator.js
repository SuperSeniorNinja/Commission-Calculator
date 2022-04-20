console.log("calculator.js is loaded");
$ = jQuery;

$(document).ready(function(){
	window.items = [];
	window.browsing_history = [];
	window.current_page = getCurrentPage();
	var multiple_pages = [11, 3, 26] // set pages for multiple options

	//when back arrow is clicked
	$('.back_div, .back_btn').on('click', function () {
		console.log("back button is clicked");
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

	//when an answer option is chosen
	$(".step .answer_div .answer_option").on("click", function() {
		console.log("answer option is chosen");
		var question = $(this).parent().parent().find("div label").eq(0).text();
		var chosen_answer = $(this).find("label").text();
		var recommendation = '';
		
		//consider multiple choice case here
		var option_dom = $(this);

		console.log(question);
		console.log(chosen_answer);
			
		//check if this page is for muiltple or single choice
		if(multiple_pages.includes(window.current_page)) {//if multiple choices
			//if it is already chosen, we unclick it.
			if($(this).hasClass("active")){
				console.log("need to be removed");
				$(this).removeClass("active");
				//if no active answer is chosen, we deactivate next button.
				if($(".page" + window.current_page + " .answer_div .active").length == 0)
					$(".page" + window.current_page + " .button_div .next_btn").disabled = "disabled";
			}
			else{
				$(this).addClass("active");
			}
		}
		else{
			$(this).parent().find(".active").removeClass("active"); //remove other active options for single choice
			$(this).addClass("active");
			var target_page;
			//Choose compensation format
			if(window.current_page == 1){
				saveToLocalStorage(window.current_page, recommendation);
				target_page = 16;				
			}

			//prospecting/check all that apply/most sales will come from.
			if(window.current_page == 3){
				if(chosen_answer == "Most sales will come from outbound prospecting or cold outreach")
					recommendation = `KPI attainment bonus for outbound prospecting. 
					Bonus for outreach volume (e.g. monthly bonus if averaging over 30 new accounts touched per day)
					Bonus for outreach success (e.g. monthly bonus for exceeding target number of conversations)`;
				else if(chosen_answer == "Reps will have consistent inbound leads")
					recommendation = `KPI attainment bonus for inbound leads. Bonus for qualified-to-close conversion rate (e.g. monthly bonus if over 75% of the leads qualified by rep end up closing)
					Bonus for response time (e.g. monthly bonus for average response time under 10 minutes)`;

				saveToLocalStorage(window.current_page, recommendation);
				goToPage(8);
				return;	
			}

			//What's the potential for added revenue from accounts?
			if(window.current_page == 4){
				if(chosen_answer == "Low")
					recommendation = `Commission -1`;
				else
					recommendation = `Commission +1`;
			}

			if(window.current_page == 5){
				if(chosen_answer == "Managing Sales Reps")
				{
					saveToLocalStorage(window.current_page, recommendation);
					goToPage(6);
					return;
				}
				else if(chosen_answer == "Closing"){
					recommendation = `Performance bonus for sales. Examples:
					Bonus for new customers (e.g. $500 bonus for 10 new customers in a month)
					Contest bonus for total sales
					(e.g. $1,000 bonus to the rep with the highest conversion rate each quarter )`;
					saveToLocalStorage(window.current_page, recommendation);
					goToPage(26);
					return;
				}
				else if(chosen_answer == "Managing Accounts"){
					saveToLocalStorage(window.current_page, recommendation);
					goToPage(4);
					return;
				}
				else if(chosen_answer == "Prospecting"){
					saveToLocalStorage(window.current_page, recommendation);
					goToPage(3);
					return;
				}
			}

			//Do managed reps earn commissions?
			if(window.current_page == 6){
				if(chosen_answer == "Yes"){
					recommendation = `Revenue share for managed reps. 
					Examples: Managing sales rep earns 5% of all commissions earned by reps they manage`;
				}
				else{
					recommendation = `Bonus for managed rep's KPI attainment. Examples:
					Monthly bonus for each KPI target that each managed rep exceeds. around 10% of how much the 
					earning rep brings home`;
					saveToLocalStorage(window.current_page, recommendation);
					goToPage(7);
					return;
				}
			}

			//Do you want to incentivize reps for beneficial activities and milestones, or just sales?
			if(window.current_page == 8){
				saveToLocalStorage(window.current_page, recommendation);
				if(chosen_answer == "Add bonuses"){
					//if user already chose rep responsibilities
					if(1){
						goToPage(9);
						return;
					}
					else{
						goToPage(10);
						return;
					}				
				}
				else{				
					goToPage(11);
					return;
				}
			}		

			//Based on the job responsibilities you selected, consider adding some of these bonuses:
			if(window.current_page == 9 || window.current_page == 10){			
				if(chosen_answer == "KPI attainment bonus for outbound prospecting"){
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
					recommendation = `All other bonuses.....`;

				saveToLocalStorage(window.current_page, recommendation);
				goToPage(11);
				return;
			}	

			if(window.current_page == 11){
				saveToLocalStorage(window.current_page, recommendation);
				goToPage(12);
				return;
			}

			/*Choose Commission Frequency*/
			if(window.current_page == 12){
				saveToLocalStorage(window.current_page, recommendation);
				goToPage(13);
				return;
			}

			/*How do customers pay for products?*/
			if(window.current_page == 13){
				if(chosen_answer == "All at once")				
					recommendation = "One-time commission";

				saveToLocalStorage(window.current_page, recommendation);
				goToPage(14);
				return;
			}

			/*Who is responsible for continued sales and health of the account after the initial sale?*/
			if(window.current_page == 14){
				if(chosen_answer == "Original sales rep")
					recommendation = `Recurring uncapped commission. Examples:
					Unlimited recurring (pays at the same rate until account terminates)
					Unlimited tiered (pays at tiered rates, such as 10% for first year and 5% for all following years, 
					until account terminates) `;

				saveToLocalStorage(window.current_page, recommendation);
				goToPage(15);
				return;
			}

			/*Select one below page14*/
			if(window.current_page == 15){
				if(chosen_answer == "Fixed")
					recommendation = `We recommend you pay a:
					Recurring commission (Capped)
					You should pay these to the original sales rep for a year or so, after which commissions should go 
					to the rep(s) actively managing the account. Commissions stop if the account cancels.`;
				else
					recommendation = `We recommend you pay a:
					One-time commission
					You should try to pay this based on estimated one-year income for the new account, 
					after which commissions should go to the rep(s) actively managing the account. You can always use 
					a commission adjustment to correct misjudgments at the end of each year. `;

				saveToLocalStorage(window.current_page, recommendation);
				//Check if "Commission Only" chosen, if yes skip page19 and go to 20
				var check_result = checkPageValue(1, "Commission Only");
				if(check_result)
					goToPage(20);
				else
					goToPage(19);
				return;
			}

			/*Do sales reps negotiate prices with customers?*/
			if(window.current_page == 16){
				if(chosen_answer == "Yes"){
					recommendation = `We recommend paying commission as a:
					Percentage of profit
					This incentivizes sales reps to negotiate the best deals, and makes commission more reflective of 
					negotiation performance and deal quality.`;

					saveToLocalStorage(window.current_page, recommendation);
					goToPage(2);
					return;
				}
				else{
					saveToLocalStorage(window.current_page, recommendation);
					goToPage(17);
					return;
				}
			}


			/*Do sales reps have control over the cost of goods sold or expenses on each sale?*/
			if(window.current_page == 17){
				if(chosen_answer == "Yes"){
					recommendation = `We recommend you pay commission as a:

					Percentage of profit

					This will incentivize sales reps to maintain good profit margins and keep an eye on expenses, making their goals more aligned with the company goals.`;

					saveToLocalStorage(window.current_page, recommendation);
					goToPage(2);
					return;
				}
				else{
					saveToLocalStorage(window.current_page, recommendation);
					goToPage(18);
					return;
				}
			}

			/*Should sales reps try to push customers into buying products/services with a higher profit margin?*/
			if(window.current_page == 18){
				if(chosen_answer == "Yes")
					recommendation = `We recommend you pay commission as a:

					Percentage of profit

					This will incentivize sales reps towards the highest profit margins, but make sure your sales reps still keep the customer's best interests in mind.`;
				else
					recommendation = `We recommend you pay commission as a:

					Percentage of revenue

					If your sales can't impact profit margins on each deal, then it's best to pay based on revenue. This will incentivize sales reps to sell as much as possible.`;
					
				saveToLocalStorage(window.current_page, recommendation);
				goToPage(2);
				return;
			}

			/*Are reps required to work on-site in an office?*/
			if(window.current_page == 20){
				if(chosen_answer == "Must work on-site"){
					saveToLocalStorage(window.current_page, recommendation);
					goToPage(21);
					return;
				}
				else{
					saveToLocalStorage(window.current_page, recommendation);
					goToPage(22);
					return;
				}
			}

			/*where?*/
			if(window.current_page == 21){
				if(chosen_answer == "High cost of living location")
					recommendation = `+$2,000`;
				else
					recommendation = `+$1,000`;
				saveToLocalStorage(window.current_page, recommendation);
				goToPage(22);
				return;
			}

			/*Do reps have a clear, proven path to sales success? In other words, have other reps succeeded in this role before? */
			if(window.current_page == 22){
				if(chosen_answer == "We've never had high-earning commissioned sales reps in this role"){
					recommendation = `+$500
					or
					Add temporary salary bonus
					e.g. $5,000 base for first six months dropping to $4,000 base after sixth month`;
					saveToLocalStorage(window.current_page, recommendation);
					goToPage(24);
					return;
				}				
				else{
					saveToLocalStorage(window.current_page, recommendation);
					goToPage(23);
					return;
				}
			}

			/*How much have your good sales reps earned in base + commission?*/
			if(window.current_page == 23){
				if(chosen_answer == "Over $100k")
					recommendation = `subtract $1,000`;
				else
					recommendation = `subtract $500`;
				saveToLocalStorage(window.current_page, recommendation);
				goToPage(24);
				return;
			}

			if(window.current_page == 24){
				saveToLocalStorage(window.current_page, recommendation);
				goToPage(25);
				return;
			}

			if(window.current_page == 28){ //choose one
				target_page = 29;
				if(chosen_answer == "This is an existing sales role and we have past sales data available")
				{
					//check if commission frequncy/one-time commission is chosen
					if(checkPageValue(12, "One-time commission")){
						$(".page29 .answer_div .average_revenue").val(10000);
						$(".page29 .answer_div .div_question3").hide();
					}
					else if(checkPageValue(12, "Recurring commission (capped)")){
						
					}
					else{						
					}
				}
				else{
				}

				
			}

			saveToLocalStorage(window.current_page, recommendation);
			goToPage(target_page);
			return;
		}		
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


	//page37 add a tier
	$(".page37 .add_tier_div label").on("click", function(){
		var new_tier_id = $(".tier_div").length + 1;
		
		var total_month_period = 0;
		var time_period_doms = $(".page37 [name='tier_period']");
		for(var i = 0; i < time_period_doms.length; i++)
			total_month_period += parseInt(time_period_doms[i].value);
		
		var available_month_period = 36 - total_month_period;
		console.log("here");
		console.log(available_month_period);
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

	//initiate commission tier calculation
	$(".page37").on('click', '.calculate_trigger_div', function(){
		console.log("calculation started");
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
		console.log(percents);
		InitCommissionTierTable(37, 500, percents);
	});

	//User input; must be below recommended number in commission tier percent input
	$('.page37').on('keyup', '.tier_div input', function() {
		return;
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
			console.log(percents);
			InitCommissionTierTable(37, 500, percents);
		}
	});

	//page 37 <!-- Commission Tiers-->
	function InitCommissionTierTable(page_id, deal = 500, percents = null, months = null, number_of_deals_month = 5){
		console.log("here I am");
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

		for(var i = 0; i < $(".commission_tier tr td").not( ".year_total" ).length; i++){
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
			$(".commission_tier tr td").not( ".year_total" ).eq(i).find(".second_half .row label label").html(formatted_month_commission);			
			
			/*var total_commission = first_year_commission + second_year_commission + third_year_commission;
			var total_compensation = first_year_compensation + second_year_compensation + third_year_compensation;*/
		}

		//update year total commission/compensation
		$(".commission_tier tr td").eq(0).find(".second_half .row label").eq(0).find("label").html(formatPrice(first_year_commission));
		$(".commission_tier tr td").eq(0).find(".second_half .row label").eq(2).find("label").html(formatPrice(first_year_compensation));
		$(".commission_tier tr td").eq(13).find(".second_half .row label").eq(0).find("label").html(formatPrice(second_year_commission));
		$(".commission_tier tr td").eq(13).find(".second_half .row label").eq(2).find("label").html(formatPrice(second_year_compensation));
		$(".commission_tier tr td").eq(26).find(".second_half .row label").eq(0).find("label").html(formatPrice(third_year_commission));
		$(".commission_tier tr td").eq(26).find(".second_half .row label").eq(2).find("label").html(formatPrice(third_year_compensation));
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
					var price = parse9Int(average_revenue * index * (i + 1) / 100);
					td_doms[j].innerText = formatPrice(price);
				}
			}
		}
		else
			return;
	});

	//when edit salary button is clicked, we show modal
	$(".page25 .edit_salary_btn").on("click", function() {
		$('#salary_edit_modal').modal('show');
	});

	//Trigger recommendation modal
	$(".page34 .question_icon").on("click", function(){
		//get recommendation type
		var type = $(this).data("type");
		console.log("type");
		console.log(type);
		$("#recommendation_modal .type_replace").html(type);
		$('#recommendation_modal').modal('show');
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
	$(".step .next_btn").on("click", function() {
		if(multiple_pages.includes(window.current_page) || window.current_page == 25 || window.current_page == 29 || window.current_page == 33) {//if multiple choices
			saveToLocalStorage(window.current_page);
		}

		if(window.current_page == 29){
			//hide sidebar + body and show only result page
			$(".questions_section").hide();
			$(".result_section").show();
			//get recommended commission percent
			var info_json = JSON.parse(getPageValue(29, "commission_percent"));
			var commission_percent = parseInt(info_json.commission_percent);
			var deals = parseInt(info_json.average_rep);
			var deal_revenue = parseInt(numberFormat(info_json.deal_revenue));
			$(".result_section .page31 .average_revenue").val(commission_percent);
			
			//highlight the commission percent on the table
			$(".result_section .caculator_configurator tr.active").removeClass("active");
			var index = commission_percent + 1;
			$(".result_section .caculator_configurator tr").eq(index).addClass("active");

			//highlight the deals column
			$(".result_section .caculator_configurator tr .active").removeClass("active");
			var tr_doms = $(".result_section .caculator_configurator tr");
			var index = parseInt(deals) + 1;
			for(var i = 0; i < tr_doms.length; i++){
				tr_doms[i].children[index].classList.add('active');
			}

			//calculate table based on deal revenue
			var tr_doms_2 = $(".result_section .caculator_configurator tbody tr");
			for(var i = 0; i < tr_doms_2.length; i++){
				var td_doms_2 = tr_doms_2[i].children;
				for(j = 2; j < td_doms_2.length; j++){
					var index = j - 1;
					//average_revenue * percent_num * number_of_deals/100
					var price = parseInt(deal_revenue * index * (i + 1) / 100);
					td_doms_2[j].innerText = formatPrice(price);
				}
			}

			goToPage(31);
			return;
		}

		if(window.current_page == 31){
			//get recommended commission percent
			var info_json = JSON.parse(getPageValue(29, "commission_percent"));
			var commission_percent = parseInt(info_json.commission_percent);
			$(".recommended_percent").html(commission_percent);
			//highlight the commission percent on the table
			$(".result_section .page32 tr.active").removeClass("active");
			var index = commission_percent + 1;
			$(".result_section .page32 tr").eq(index).addClass("active");
		}

		goToNextPage();
	});

	//save chosen option with page number to LocalStorage
	function saveToLocalStorage(page_num, recommendation = ""){
		var question = $(".page" + window.current_page + " .header_line .page_title").text();
		var answers = [];
		var answer;
		if($(".page" + window.current_page + " .answer_div .active").length > 1){
			var active_options = $(".page" + window.current_page + " .answer_div .active label");
			console.log("active_options");
			console.log(active_options);
			for(var i = 0; i < active_options.length; i++){
				answer = active_options[i].innerText.trim();
				console.log(answer);
				answers.push(answer);
			}
		}
		else if($(".page" + window.current_page + " .answer_div .active").length == 1){
			answer = $(".page" + window.current_page + " .answer_div .active label").text().trim();
			answers.push(answer);
		}

		console.log("saveToLocalStorage");
		console.log(question);
		console.log(answer);

		//format the item for each step of question/answer
		var item = {
			"page": (page_num) ? page_num: window.current_page,
			"question": question,
			"answer": answers
		};

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
			item["commission_percent"] = 5;
		}

		//page33: determine bonuses
		if(window.current_page == 33){
			item["question"] = "Determine Bonuses";
			item["bonus1"] = $(".page33 .bonus2").val();
			item["bonus1_period"] = $(".page33 .bonus2_period").val();
			item["bonus2"] = $(".page33 .bonus3").val();
			item["bonus2_period"] = $(".page33 .bonus3_period").val();
			item["base_salary"] = $("#revenue_range").val();
		}
		
		if(recommendation)
			item.recommendation = recommendation;

		//check if the user has already chosen answers for this page. If already exists, we update, not add a new one.
		var has_page_answers = hasPageAnswers(window.current_page);
		console.log("has_page_answers");
		console.log(has_page_answers);

		if(has_page_answers){
			console.log("page answer exists. need to update it.");
			updatePageAnswers(window.current_page, answers, recommendation);
		}
		else{
			console.log("need to add a new one");
			window.items.push(JSON.stringify(item));
			localStorage.setItem("commission_calculator", JSON.stringify(window.items));
		}		
	}

	//Get progress bar
	function updateProgress(page_num){
		var total_steps = 5;
		var processed_steps = 0;
		var step1 = 1; //we preset it from compensation format
		var step2 = (hasPageAnswers(2)) ? 1 : 0 ;
		var step3 = (hasPageAnswers(2)) ? 1 : 0 ;
		var step4 = (hasPageAnswers(12)) ? 1 : 0 ;
		var step5 = 1;//(hasPageAnswers(2)) ? 1 : 0 ;
		processed_steps = step1 + step2 + step3 + step4 + step5;
		var percent = processed_steps / total_steps * 100;
		var percent_string = percent + "%";

		$("#progressDivId #progressBar")[0].style.width = percent_string; //update progressbar width
		$("#progressDivId #percent").html(percent_string); //update percent string in the center of progress bar

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

					json[i] = JSON.stringify(json_item);
					localStorage.removeItem("commission_calculator");
					console.log("updated answers");
					console.log(answers);
					console.log("updated json");
					console.log(json);
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
		if(json){//if localStorage has data
			for(var i = 0; i < json.length; i++){
				var json_item = JSON.parse(json[i]);

				//remove white space in the string
				var saved_answer = json_item.answer/*.replace(/\s/g, "")*/;
				check_value = check_value/*.replace(/\s/g, "")*/;

				if(json_item.page == page_num && saved_answer.toLowerCase() == check_value.toLowerCase())
					return true;
			}
		}
		else
			return false;
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
		var next_page = window.current_page + 1;		
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
			console.log("prev_page");
			console.log(prev_page);
			goToPage(prev_page);
		}
		else
			return;
	}

	//go to the certain page from page ID
	function goToPage(page_id){
		//hide current active page before going to the certain page.
		$(".page" + window.current_page).hide();
		console.log("page" + window.current_page + " -> page" + page_id);

		//save page history
		if(!window.browsing_history.includes(window.current_page))
			window.browsing_history.push(window.current_page);
		if(!window.browsing_history.includes(page_id))
			window.browsing_history.push(page_id);

		//Validation for the start/end page.
		if(page_id < 1 || page_id > $(".step").length)
			return;
		else{			
			$(".calculator_body .page" + getCurrentPage()).removeClass("active");
			updateProgress(page_id);
			$(".page" + page_id).show();
			$(".page" + page_id).addClass("active");
			$(".current_page").val(page_id);
			window.current_page = page_id;
		}
	}

	//get current active page
	function getCurrentPage(){
		var active_page = $(".current_page").val()
		return parseInt(active_page);
	}
});