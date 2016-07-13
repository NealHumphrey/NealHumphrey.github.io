/*A visualization of team Myers Briggs personality types!

If you're reading this - just a quick caution. This code definitely needs a thorough refactor. 
When I first started I was just learning D3, and also went through a few permutations of what would even be included
in the charts. Rather than dig in and do a comprehensive re-write as needed, I finished up the final steps
with some hack-y copy-paste coding. If there's ever a future justification for repurposing this 
visualization or upgrading it significantly, I'll take what I learned and start over. 

thanks!
*/



$(document).ready(function(){
	//elements we'll put on the page - declare here so they're accessible to each other
	var typeBoxes
	var bars
	var app = {};

	var preferenceColor = [];
	/*Colors for each type*/
	preferenceColor.E="#46aace"
	preferenceColor.I='#2a5599'
	preferenceColor.S='#f5b857'
	preferenceColor.N='#e25328'
	preferenceColor.T='#6ab759'
	preferenceColor.F='#004d38'
	preferenceColor.J='#f19b9c'
	preferenceColor.P='#a73b8f'


	
	//this will need to be calculated TODO
	var typeCounts = [
		{'type': 'ISTJ', 'temperament': 'SJ', 'preference1': 'I', 'preference2': 'S', 'preference3': 'T', 'preference4':'J', 'countInGroup': 0},
		{'type': 'ISFJ', 'temperament': 'SJ', 'preference1': 'I', 'preference2': 'S', 'preference3': 'F', 'preference4':'J', 'countInGroup': 0},
		{'type': 'INFJ', 'temperament': 'NF', 'preference1': 'I', 'preference2': 'N', 'preference3': 'F', 'preference4':'J', 'countInGroup': 0},
		{'type': 'INTJ', 'temperament': 'NT', 'preference1': 'I', 'preference2': 'N', 'preference3': 'T', 'preference4':'J', 'countInGroup': 0},
		{'type': 'ISTP', 'temperament': 'SP', 'preference1': 'I', 'preference2': 'S', 'preference3': 'T', 'preference4':'P', 'countInGroup': 0},
		{'type': 'ISFP', 'temperament': 'SP', 'preference1': 'I', 'preference2': 'S', 'preference3': 'F', 'preference4':'P', 'countInGroup': 0},
		{'type': 'INFP', 'temperament': 'NF', 'preference1': 'I', 'preference2': 'N', 'preference3': 'F', 'preference4':'P', 'countInGroup': 0},
		{'type': 'INTP', 'temperament': 'NT', 'preference1': 'I', 'preference2': 'N', 'preference3': 'T', 'preference4':'P', 'countInGroup': 0},
		{'type': 'ESTP', 'temperament': 'SP', 'preference1': 'E', 'preference2': 'S', 'preference3': 'T', 'preference4':'P', 'countInGroup': 0},
		{'type': 'ESFP', 'temperament': 'SP', 'preference1': 'E', 'preference2': 'S', 'preference3': 'F', 'preference4':'P', 'countInGroup': 0},
		{'type': 'ENFP', 'temperament': 'NF', 'preference1': 'E', 'preference2': 'N', 'preference3': 'F', 'preference4':'P', 'countInGroup': 0},
		{'type': 'ENTP', 'temperament': 'NT', 'preference1': 'E', 'preference2': 'N', 'preference3': 'T', 'preference4':'P', 'countInGroup': 0},
		{'type': 'ESTJ', 'temperament': 'SJ', 'preference1': 'E', 'preference2': 'S', 'preference3': 'T', 'preference4':'J', 'countInGroup': 0},
		{'type': 'ESFJ', 'temperament': 'SJ', 'preference1': 'E', 'preference2': 'S', 'preference3': 'F', 'preference4':'J', 'countInGroup': 0},
		{'type': 'ENFJ', 'temperament': 'NF', 'preference1': 'E', 'preference2': 'N', 'preference3': 'F', 'preference4':'J', 'countInGroup': 0},
		{'type': 'ENTJ', 'temperament': 'NT', 'preference1': 'E', 'preference2': 'N', 'preference3': 'T', 'preference4':'J', 'countInGroup': 0}
	];

	//Helper array used to lookup what goes with what, especially if the data is missing certain type combinations
	var preferencePairs = [
		{'name': 'preference1', 'option1': 'E', 'option2': 'I', 'option1Text': 'Extrovert', 'option2Text':'Introvert', 'option1Summary': "Get energy from the outside world" , 'option2Summary': "Get their energy internally"},
		{'name': 'preference2', 'option1': 'N', 'option2': 'S', 'option1Text': 'iNtuitive', 'option2Text':'Sensing', 'option1Summary': "Use theories and insight to surmise information." , 'option2Summary': "Use direct observation to understand the world."},
		{'name': 'preference3', 'option1': 'F', 'option2': 'T', 'option1Text': 'Feeling', 'option2Text':'Thinking', 'option1Summary': "Use feelings for decision making" , 'option2Summary': "Make decisions using logic and analysis."},
		{'name': 'preference4', 'option1': 'J', 'option2': 'P', 'option1Text': 'Judging', 'option2Text':'Perceiving', 'option1Summary': "Prefer decision making" , 'option2Summary': "Prefer observing and keeping options open"}
	]

	//TODO rename to preferences
	var summaryStats = [
		{'type': 'E', 'typeGroup': 1, 'percentInGroup': 40},
		{'type': 'I', 'typeGroup': 1, 'percentInGroup': 60},
		{'type': 'S', 'typeGroup': 2, 'percentInGroup': 30},
		{'type': 'N', 'typeGroup': 2, 'percentInGroup': 70},
		{'type': 'T', 'typeGroup': 3, 'percentInGroup': 90},
		{'type': 'F', 'typeGroup': 3, 'percentInGroup': 10},
		{'type': 'J', 'typeGroup': 4, 'percentInGroup': 55},
		{'type': 'P', 'typeGroup': 4, 'percentInGroup': 45}
	];
	var keyFnSummaryType = function(d) { return d['type']};

	var usAverageStats = [
		{'typeGroup': 1, 'percentInGroup': 50},
		{'typeGroup': 2, 'percentInGroup': 60},
		{'typeGroup': 3, 'percentInGroup': 70},
		{'typeGroup': 4, 'percentInGroup': 90}
	];


	d3.csv('team-types.csv', initialize);


	function initialize(data) {
			app.teamData = data.map(function (d) {
					return {
					id: d.id,
					order: parseInt(d.id,10) -1,								//initialize to id - will be updated by calcs
					previousOrder: parseInt(d.id,10) -1,
					firstName: d.firstName,
					lastName: d.lastName,
					preference1: d.preference1,
					preference2: d.preference2,
					preference3: d.preference3,
					preference4: d.preference4,
					fullType: d.preference1 + d.preference2 + d.preference3 + d.preference4,
					preference1Strength: parseInt(d.preference1Strength,10),
					preference2Strength: parseInt(d.preference2Strength,10),
					preference3Strength: parseInt(d.preference3Strength,10),
					preference4Strength: parseInt(d.preference4Strength,10),

				};
		});

		//Count up each type
		app.typeCountsMax = 0
		for (var i = app.teamData.length - 1; i >= 0; i--) {
			var type = app.teamData[i].fullType;
			var j = findTypeId(typeCounts, type)
			typeCounts[j].countInGroup++
			if (typeCounts[j].countInGroup > app.typeCountsMax) {app.typeCountsMax = typeCounts[j].countInGroup}

		}
	
		//Initialize the scatterBar
		var preference = 'preference2'
		loadScatterBar(preference);

		//Calculate the order to display the data and put it in the chart	
		updateScatterBar(preference);


	//loadBarCharts('type1',usAverageStats,summaryStats);
	//loadTypeGrid(typeCounts);

	};//.initialize

	//setting key functions for the newly initialized teamData
	var keyFnTeamDataId = function(d) {return d['id']};


	//initialize so we can access the scatterbar outside the load function
	var scatterBar = []

	//The moving scatter plot bar chart showing the team members breaking into type groups.
	//Takes an array of each team member's assignment, since each member will be plotted.
	function loadScatterBar(preference){
		//Unhide the section - hidden on page load to improve versatility and avoid jerky loading
		scatterBar.wrapper = d3.select('#scatterBarWrapper').classed("hidden",false);

		var margin = {top:20, right:5, bottom:10, left:5};
		//initialize some basic chart components
		scatterBar.width = 800 - margin.left - margin.right;
		scatterBar.height = 2000 - margin.top - margin.bottom;
		scatterBar.gap = 30;
		scatterBar.circleRadius = 15;

		//Start building the chart
		scatterBar.svg = d3.select('#scatterBar')
			.append('svg')
				.attr({
					//'style': 'border:1px solid black;',
					'width': scatterBar.width + margin.left + margin.right,
					'height': scatterBar.height + margin.top + margin.bottom,
				})
			.append('g')
				.attr("transform", "translate(" + margin.left + "," + margin.top + ")" );

		//Choose how our people circles will move from place to place
		scatterBar.keyFn = keyFnTeamDataId;
		
		//Each point will be located by it's position from left to right. We'll use logic to re-assign individual people to the correct order. 
		scatterBar.scaleX = d3.scale.ordinal()
				.domain(d3.range(0,app.teamData.length))
				.rangePoints([0,scatterBar.width - scatterBar.gap - scatterBar.circleRadius * 2],0);

		scatterBar.scaleY = d3.scale.ordinal()
				.domain(['preference2','preference3','preference4','preference1'])		//out of order on purpose - final graph will start with type2
				.rangeRoundBands([0,scatterBar.height],0.1,0.3);


		//toolTips
		/* Initialize tooltip */
		scatterBar.tip = d3.tip()
			.attr('class', 'd3-tip')
			.offset([-10, 0])
			.html(function(d) {
    			return "<span class='tip-name'>" + d.firstName + " " + d.lastName.charAt(0) + ".</span><br/><span class='tip-type'>" + d.fullType + "</span";
			});

		/* Invoke the tip in the context of your visualization */
		scatterBar.svg.call(scatterBar.tip);


		//make the buttons do stuff. Yes, copy paste code... sorry....
		d3.select('#loadPreference3').on("click", function() {
			d3.select('#loadPreference3').classed('hidden',true);
			updateScatterBar('preference3');
		});	
		d3.select('#loadPreference4').on("click", function() {
			d3.select('#loadPreference4').classed('hidden',true);
			updateScatterBar('preference4');
		});	
		d3.select('#loadPreference1').on("click", function() {
			d3.select('#loadPreference1').classed('hidden',true);
			updateScatterBar('preference1');
		});	

		d3.select('#loadTypeGrid').on("click", function() {
			d3.select('#loadTypeGrid').classed('hidden',true);
			loadTypeGrid(typeCounts);
		});	

	};

	

	//This function handles the initial and updated drawing of the dynamic elements of the scatterBar, using the framework from the loadScatterBar function
	function updateScatterBar(preference){
		//initialize some formatting
		scatterBar.labelGapLine = 15;
		scatterBar.labelGapSummary = 30;
		scatterBar.labelGapPreference = 50;
		scatterBar.labelGapPercent = 70;

		scatterBar.descriptionGap = 60; 


		//Store the previous and current preference on the wrapper so we can use them from button to button.
		var previousPreference = {};
		previousPreference.name = 'preference2';	//initialize to default if no previous preference
		if(scatterBar.wrapper.attr('currentPreference')){previousPreference.name = scatterBar.wrapper.attr('currentPreference')}
		scatterBar.wrapper.attr("previousPreference",previousPreference.name)
		scatterBar.wrapper.attr("currentPreference",preference)
		//fill in the rest of the previousPreference object
		previousPreference = findByName(preferencePairs,previousPreference.name);

		//preferencePairs is the array of objects showing how preferences and types are grouped and the names used to describe them
		//currentPreference is assigned an object that contains the names, letters, and counts of the two options.\
			/*attributes:
				'name':  - text string matching preference, i.e. 'preference1'
				'option1' - the letter, i.e. T, F
				'option2'
				'option1Text' - the name, i.e. Thinking, Feeling
				'option2Text'
			*/
		var currentPreference = {};
		currentPreference = findByName(preferencePairs,preference);
		currentPreference.option1Count = 0
		currentPreference.option2Count = 0


		//Store the previous sort order so that it can be used when creating the duplicate entries before transition
		for (var i = 0; i < app.teamData.length; i++) {
			app.teamData[i].previousOrder=app.teamData[i].order;
		};

		//Sorting the data affects the order they are shown from left to right (as scaleX uses the index of the data)
		//Multi-level sort: Group by preference, subgroup by previousPreference, and finally use the most recent sort order to produce minimal shuffling
		app.teamData.sort(sort_by_multiple(preference, {name:previousPreference.name,reverse: false},  {name:'order',reverse: false}));
		
		for (var i = 0; i < app.teamData.length; i++) {
			app.teamData[i].order=i;
			if (app.teamData[i][preference] === currentPreference.option1) {currentPreference.option1Count++};
			if (app.teamData[i][preference] === currentPreference.option2) {currentPreference.option2Count++};
		};

		currentPreference.option1Percent = Math.round(currentPreference.option1Count / (currentPreference.option1Count + currentPreference.option2Count) * 100);
		currentPreference.option2Percent = Math.round(currentPreference.option2Count / (currentPreference.option1Count + currentPreference.option2Count) * 100);
		




		//----Refresh the circles----

		//change the class of the 'shadow' circles to identify them as separate
		scatterBar.shadows = scatterBar.svg.selectAll('rect.person')
				.classed('person',false)
				.classed('person-shadow',true)
				.attr({
					'stroke': function(d,i){return preferenceColor[d[previousPreference.name]]},
					})

		//selectAll on the .person class. There are none remaining of this type, so all items will be newly created on the .enter()
		scatterBar.circles = scatterBar.svg.selectAll('rect.person').data(app.teamData, scatterBar.keyFn);
		

		scatterBar.circles.enter()
		.append('rect')
			.attr({
				'class': function(d) { return 'person'; },	// d.preference2 + '-color 
				'id': function(d){
					return 'person' + d.firstName + d.lastName},
				'x': function(d,i){
					if(d[previousPreference.name] === previousPreference.option1) {
						return scatterBar.scaleX(d.previousOrder);
					};
					if(d[previousPreference.name] === previousPreference.option2) {
						return scatterBar.scaleX(d.previousOrder) + scatterBar.gap;
					};
				},
				'y': function(d,i) {return scatterBar.scaleY(previousPreference.name)},
				'width': scatterBar.circleRadius*2,
				'height': scatterBar.circleRadius*2,
				'rx':scatterBar.circleRadius,
				'ry':scatterBar.circleRadius,

				'stroke-width': 3,
				'stroke': function(d,i){return preferenceColor[d[currentPreference.name]]},
				'fill': function(d,i){return preferenceColor[d[currentPreference.name]]},
				'fill-opacity': 1,
				
				'preference': function(d) {return d[currentPreference.name]},
			})

			//Make them increase size on hover, and add a tool tip
			.on("mouseover",function(d) {
				scatterBar.tip.show(d)

				d3.select(this).transition().duration(200)
				.attr({
					'width': scatterBar.circleRadius * 2* 1.2,
					'height': scatterBar.circleRadius * 2 * 1.2,
					'rx': scatterBar.circleRadius * 1.2,
					'ry': scatterBar.circleRadius * 1.2,
				})
			})
			.on("mouseout",function(d) {
				scatterBar.tip.hide()

				d3.select(this).transition().duration(200)
				.attr({
					'width': scatterBar.circleRadius * 2,
					'height': scatterBar.circleRadius * 2,
					'rx': scatterBar.circleRadius,
					'ry': scatterBar.circleRadius,
				})
			})
			.append("svg:title")
   			.text(function(d) { return d.firstName + " " + d.lastName.charAt(0) + ": " + d.fullType; });
		



		  



		//When transitioning to the next selected preference, change colors, pause, and then move to new location. Helps viewers see the transition.
		scatterBar.circles
			//disable mouseover events so they don't interrupt the transition
			.attr("pointer-events", "none")
			.transition().duration(500)
			.attr({
				'stroke': function(d,i){return preferenceColor[d[previousPreference.name]]},
			})
		scatterBar.circles.transition().delay(500).duration(500)
			.attr({
				'fill': function(d,i){return preferenceColor[d[currentPreference.name]]},
			})
		scatterBar.circles.transition().delay(1500).duration(2000)
			.attr({
				'x': function(d,i){
					if(d[currentPreference.name] === currentPreference.option1) {
						return scatterBar.scaleX(i);
					};
					if(d[currentPreference.name] === currentPreference.option2) {
						return scatterBar.scaleX(i) + scatterBar.gap;
					};
				},
				'y': function(d,i) {return scatterBar.scaleY(currentPreference.name)},
				'fill-opacity': 1
				})
			//Re-enable the mouseover events when the transition is over
			.each("end", function() {d3.select(this).attr("pointer-events", null)});

		//Currently no need to exit, but here for safety / future expansion
		scatterBar.circles.exit().transition().duration(1000)
			.attr({'opacity': 0})
			.remove();



		//now, the labels
		//Fade old labels
		scatterBar.svg.selectAll('.labelGroup').transition().duration(200).attr({'opacity': 0.6});//.remove();

		//add new labels
		var labelYLine =  function() {return scatterBar.scaleY(currentPreference.name) - scatterBar.labelGapLine};	//if reformatting so  labels are moved below, add this: scatterBar.circleRadius * 2
		var labelYSummary = function() {return scatterBar.scaleY(currentPreference.name) - scatterBar.labelGapSummary};
		var labelYPreference = function() {return scatterBar.scaleY(currentPreference.name) - scatterBar.labelGapPreference};
		var labelYPercent =  function() {return scatterBar.scaleY(currentPreference.name) - scatterBar.labelGapPercent};
		

		var line1endX = function() {return scatterBar.scaleX(currentPreference.option1Count)};
		var label1Xtext =  function() {return line1endX()/2};
		var label2Xtext =  function() {return line1endX() + scatterBar.gap + scatterBar.scaleX(currentPreference.option2Count)/2};

		var labelGroup = scatterBar.svg.append('g')
				.attr({
					'class': 'labelGroup',
					'opacity': 0,
				});
		
		//the lines
		labelGroup.append('line')
				.attr({
					'x1': 0,
					'x2': line1endX(),
					'y1': labelYLine(),
					'y2': labelYLine(),
					'stroke-width': 1,
					'stroke': 'gray',
				});
		labelGroup.append('line')
				.attr({
					'x1':  function() {return scatterBar.scaleX(currentPreference.option1Count) + scatterBar.gap},
					'x2': function() {return scatterBar.scaleX(currentPreference.option2Count + currentPreference.option1Count - 1) + scatterBar.gap + scatterBar.circleRadius * 2},
					'y1': labelYLine(),
					'y2': labelYLine(),
					'stroke-width': 1,
					'stroke': 'gray',
				});

		//Different descriptions and labels. TODO - refactor this to use a function that passes arguments.		
		//Summary of type
		labelGroup.append('text')
			.attr({
				'x': label1Xtext(),
				'y': labelYSummary(),
				'class':'summaryLabel',
				'text-anchor': 'middle'
			})
			.text(currentPreference.option1Summary);
		//Name of preference type
		labelGroup.append('text')
			.attr({
				'x': label1Xtext(),
				'y': labelYPreference(),
				'class':'preferenceLabel',
				'text-anchor': 'middle'
			})
			.text(currentPreference.option1Text);
		//Percent of preference type
		labelGroup.append('text')
			.attr({
				'x': label1Xtext(),
				'y': labelYPercent(),
				'class': 'percentLabel',
				'text-anchor': 'middle'
			})
			.text(currentPreference.option1Percent + "%");


		//name of preference type
		labelGroup.append('text')
			.attr({
				'x': label2Xtext(),
				'y': labelYPreference(),
				'class':'preferenceLabel',
				'text-anchor': 'middle'
			})
			.text(currentPreference.option2Text);
		//Percent of preference type
		labelGroup.append('text')
			.attr({
				'x': label2Xtext(),
				'y': labelYPercent(),
				'class': 'percentLabel',
				'text-anchor': 'middle'
			})
			.text(currentPreference.option2Percent + "%");
		labelGroup.append('text')
			.attr({
				'x': label2Xtext(),
				'y': labelYSummary(),
				'class':'summaryLabel',
				'text-anchor': 'middle'
			})
			.text(currentPreference.option2Summary);



		labelGroup.transition().delay(3500)
			.attr({'opacity': 1});

		//Finally, toggle the description sections
		var descriptionY =  scatterBar.scaleY(currentPreference.name) + scatterBar.descriptionGap;
		//d3.select('#' + previousPreference.name + 'Description').classed("reveal",false).classed("hide",true);
		var descriptionDiv = d3.select('#' + currentPreference.name + 'Description')
		 		.classed("reveal",true).classed("hide",false)
		 		.style("top", descriptionY + "px");
	}







	function loadTypeGrid(typeCounts){

		var wrapper = d3.select('#gridWrapper').classed("hidden",false);

		var width = 400
		var height = 400
		var numColumns = 4
		var numRows = 4
		var numTypes = numColumns * numRows

		var svg = d3.select('#typeGrid')
				.append('svg')
					.attr({
						'width': width,
						'height': height,
					});

		var scaleX = d3.scale.ordinal()
				.domain(d3.range(numColumns))
				.rangeRoundBands([0, height],0.1,0);
		var scaleY = d3.scale.ordinal()
				.domain(d3.range(numRows))
				.rangeRoundBands([0, height],0.1,0);
		var boxX = function (d,i) {
				return scaleX(i % 4);
		};
		var boxY = function (d,i) {
				return scaleY(Math.floor(i / numColumns));
		};

		
		var color = d3.scale.linear()
	      .domain([0, app.typeCountsMax])
	      .range(["#ffffff", "#93c2d2"]);
		

		typeBoxes = 
			svg.selectAll('rect')
				.data(typeCounts).enter().append('rect')

		typeBoxes
				.attr({
					'class': 'typeBox',
					'x': boxX,
					'y': boxY,
					'width': scaleX.rangeBand(),
					'height': scaleY.rangeBand(),
					'style': function(d,i) {return 'fill:' + color(d.countInGroup);},
				});

		console.log(color(4));
		//TODO - combine these with a 'g' type and center it as a group.
		var typeLabels = 
				svg.selectAll('text.type-label').data(typeCounts)
					.enter().append('text')
						.text(function(d) {return d.type})
						.attr({
							'class': "type-label",
							'x': function(d,i) {return boxX(d,i) +  scaleX.rangeBand() / 2;},
							'y': function(d,i) {return boxY(d,i) +  scaleY.rangeBand() / 2;},
							'dx': '0em',
							'dy': '0.35em',
							'text-anchor': 'middle',
						});
		var typeCounts = 
				svg.selectAll('text.type-count').data(typeCounts)
					.enter().append('text')
						.text(function(d) {return "(" + d.countInGroup + ' people)';})
						.attr({
							'class': 'type-count accent',
							'x': function(d,i) {return boxX(d,i) +  scaleX.rangeBand() / 2;},
							'y': function(d,i) {return boxY(d,i) +  scaleY.rangeBand() / 2 + 20;},
							'dx': '0em',
							'dy': '0.35em',
							'text-anchor': 'middle',
						});
	};

	//Define the mouseover actions
	function showTypeDescriptions(d){
			var typeDescriptions = d3.select('#barWrapper').selectAll('.type-description')

				typeDescriptions.attr({
					'style': "visibility: hidden;"
				});

			var selectedId = '#' + d.type + '-description'
			var selectedDescription = 
				d3.select(selectedId)
					.attr("style", "visibility: visible");
				
				d3.select('#hover-type-percentage')
					.html(d.percentInGroup);

				d3.select('#type-count')
					.attr("style", "visibility: visible");

			highlightTypeGrid(d);
	}; //end showTypeDescriptions


	function highlightTypeGrid(d){
				//reset all the boxes
				typeBoxes.attr('class','typeBox');

				//Add the fill color class to the boxes that match the mouseover type
				var typeClass = d.type + '-color'
				var filteredBoxes = typeBoxes.filter(function(boxData) { 
							return boxData.preference1===d.type || 
							boxData.preference2===d.type ||
							boxData.preference3===d.type || 
							boxData.preference4===d.type; });
				filteredBoxes.classed(typeClass,true);
	};

	function resetTypeGrid(d){
				//reset all the boxes
				typeBoxes.attr('class','typeBox');
	};



	//Sorting function, copied from: http://stackoverflow.com/questions/979256/sorting-an-array-of-javascript-objects
	var sort_by = function(field, reverse, primer){
		var key = primer ? 
	       function(x) {return primer(x[field])} : 
	       function(x) {return x[field]};

	   	reverse = !reverse ? 1 : -1;

		return function (a, b) {
	    	return a = key(a), b = key(b), reverse * ((a > b) - (b > a));
		} 
	}


	//Multi-variable sorting, copied from http://stackoverflow.com/questions/6913512/how-to-sort-an-array-of-objects-by-multiple-fields
	var sort_by_multiple;
	(function() {
	    // utility functions
	    var default_cmp = function(a, b) {
	            if (a == b) return 0;
	            return a < b ? -1 : 1;
	        },
	        getCmpFunc = function(primer, reverse) {
	            var dfc = default_cmp, // closer in scope
	                cmp = default_cmp;
	            if (primer) {
	                cmp = function(a, b) {
	                    return dfc(primer(a), primer(b));
	                };
	            }
	            if (reverse) {
	                return function(a, b) {
	                    return -1 * cmp(a, b);
	                };
	            }
	            return cmp;
	        };

	    // actual implementation
	    sort_by_multiple = function() {
	        var fields = [],
	            n_fields = arguments.length,
	            field, name, reverse, cmp;

	        // preprocess sorting options
	        for (var i = 0; i < n_fields; i++) {
	            field = arguments[i];
	            if (typeof field === 'string') {
	                name = field;
	                cmp = default_cmp;
	            }
	            else {
	                name = field.name;
	                cmp = getCmpFunc(field.primer, field.reverse);
	            }
	            fields.push({
	                name: name,
	                cmp: cmp
	            });
	        }

	        // final comparison function
	        return function(A, B) {
	            var a, b, name, result;
	            for (var i = 0; i < n_fields; i++) {
	                result = 0;
	                field = fields[i];
	                name = field.name;

	                result = field.cmp(A[name], B[name]);
	                if (result !== 0) break;
	            }
	            return result;
	        }
	    }
	}());

	//Lookup function from here: http://stackoverflow.com/questions/7364150/find-object-by-id-in-an-array-of-javascript-objects/35398031#35398031
	function findByName(source, name) {
	  for (var i = 0; i < source.length; i++) {
	    if (source[i].name === name) {
	      return source[i];
	    }
	  }
	  throw "Couldn't find object with name: " + name;
	}

	//Lookup function from here: http://stackoverflow.com/questions/7364150/find-object-by-id-in-an-array-of-javascript-objects/35398031#35398031
	function findTypeId(source, type) {
	  for (var i = 0; i < source.length; i++) {
	    if (source[i].type === type) {
	      return i;
	    }
	  }
	  throw "Couldn't find object with name: " + name;
	}




});
