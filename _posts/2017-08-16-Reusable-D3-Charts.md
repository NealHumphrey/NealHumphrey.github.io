---
layout: clean
title:  "Reusable D3 charts"
date:   2017-08-16
categories: javascript d3 web-development
permalink: /blog/:year/:title/
---
# Reusable D3 Charts and Launching D3 Boilerplate

Lately I've been working on making D3 charts more reusable. In particular, I wanted a structure that I could use when I started any new chart that would naturally lead to an elegant code design and so that I wouldn't need big code refactors when I (inevitably) wanted to add features like resizability. This mostly developed during my work on the [Housing Insights](http://housinginsights.org) project. [John Osterman](https://github.com/ostermanj) and I worked on a few permutations and settled on a structure that I think works well. I'm pulling this out into its own open source project because I think it has a lot of potential for making D3 charts easier for future projects and other developers - I'm launching this as [D3 Boilerplate](https://github.com/NealHumphrey/d3-boilerplate).

So what makes a good reusable chart structure? Here's some of the design decisions that went into laying out the initial structure and some of the existing reusable chart knowledge that's out there. 

## Design

### Custom getters/setters
One of the clearest descriptions of a design pattern for reusable charts comes from the creator of D3, Mike Bostock, in his article [Towards Reusable Charts](https://bost.ocks.org/mike/chart/), and as such was a natural starting point in my hunt for the design pattern I wanted. He recommended a closure with custom getter/setter methods:

{% highlight javascript %}
function chart() {
  var width = 720, // default width
      height = 400

  function my() {
    // generate chart here, using `width` and `height`
  }

  my.width = function(value) {
    if (!arguments.length) return width;
    width = value;
    return my;
  };

  my.height = function(value) {
    if (!arguments.length) return height;
    height = value;
    return my;
  };
  
  return my;
}
{% endhighlight %}

While you could do this more simply without the getter/setters, since each of them returns the chart function itself, they allow method chaining - an elegant way to set the properties without repeatedly typing the chart instance's variable name and without needed to maintain a separate configuration object. It's also the way the rest of D3 works so it's a familiar pattern (I recommend reading the original article if the value of this approach isn't apparent). 

{% highlight javascript %}
var myChart = chart().width(720).height(80); //config
myChart() //poof!
{% endhighlight %}

Custom getters/setters that return the chart object itself - check!

### The chart object

But the closure was bothering me. I wrote up a [whole chart](https://github.com/codefordc/housing-insights/commit/04d9771cd08370b175a2ec12680302b79dfdbffe) using the closure approach in an earlier part of Housing Insights. However, while working on [Yellowbrick](https://github.com/NealHumphrey/yellowbrick), a Python-based visualization library for machine learning, I'd used a classical class inheritance structure where parent classes provided common methods needed by a group of related charts. My goal was not just to make reusable individual charts but more so to provide a common structure I could use for any future charts too - and not have to rewrite all the code that those charts might share. For example every chart needs a width and a height - why should I copy those getters/setters into every chart I make? With some hoop-jumping you can implement inheritance from a closure ([example](https://www.ruzee.com/blog/2008/12/javascript-inheritance-via-prototypes-and-closures/)) but it's not pretty - for me then, closures are out. 

That brings us to using an object-oriented approach; Mike Bostock even points this out in his original post:
> A conventional object-oriented approach as Chart.​proto­type.​render would also work, but then you must manage the `this` context when calling the function.

True, but a small tradeoff for usability (and if you're not confident in how to manage `this`, the [You Don't Know JS](https://github.com/getify/You-Dont-Know-JS/tree/master/this%20%26%20object%20prototypes) series on the topic is a great starting point). 

Choosing a structure for object inheritance inspires strong feelings all around - there's really no best choice as every approach involves tradeoffs.  John had set up our first version using prototypical inheritance and so we used that for a while. Knowing I wanted to use this structure long term, I wanted to make the right choice. After a too-long trip down that particular research rabbit hole, I ended up going with a [delegation pattern](https://github.com/getify/You-Dont-Know-JS/blob/master/this%20%26%20object%20prototypes/ch6.md). It seemed like a more natural use of Javascript's lack of classes, though it's less common and relies on the ES5 `Object.create()`. It looks like this:

{% highlight javascript %}
var baseChart =  {
    setup: function(container){
        //Provide defaults. 
        //'_var' convention means "treat this as private"
        //Each '_var' should have a matching 'var' getter/setter
        this._width = 100
        this._height = 100

        //Every chart needs an svg!
        this.svg = d3.select(container)
                    .append("svg")
                    .attr('width', this.width())
                    .attr('height', this.height());

        //allow method chaining
        return this
    },
    //base getter/setters
    width: function(_){
        if (!arguments.length) return this._width;
        this._width = _;
        return this;
    },
    height: function(_){
        if (!arguments.length) return this._height;
        this._height = _;
        return this;
    },
}

//Have one object inherit from the other
var childChart = Object.create(baseChart)

//Override the parent setup method with one that will make this specific chart
childChart.setup = function(container) {

    //Run the parent setup function first, kind of like `super()` in other languages
    baseChart.setup.call(this,container);

    //Add defaults specific to this chart
    this._size = 5;

    //Do extra stuff specific to this chart, relying on the svg created in baseChart.setup(). 
    this.svg.append('rect')
        .attr('height',this.size())
        .attr('width',this.size())
        .attr('x',30)
        .attr('y',30)

    //allow method chaining
    return this;
}

//Add getter/setters for the custom chart defaults properties
childChart.size = function(_) {
     if (!arguments.length) return this._size;
        this._size = _;
        return this;
}
{% endhighlight %}

Now if we want to use the charts:

{% highlight javascript %}
var myChart = Object.create(childChart)
myChart.width(200)
    .height(200)
    .setup('#myChartDivId');
{% endhighlight %}

There's a few things going on here. All charts that use the `baseChart` are drawn by calling the `.setup()` method and providing it with a 'container' string used by the `d3.select(container)` call - this would typically be the id of the containing div. The base chart adds an SVG to that div where the chart will be drawn. 

The child chart gets all the methods of the parent when we create it using `childChart = Object.create(baseChart)`, so we don't need to repeat the `width()` and `height()` getter/setters. 

But we then supply it with a new `.setup()` method, which will thus override `baseChart.setup()`. We still want to run `baseChart.setup()` though. We can run the setup method from the parent in the context of the child using `.call()`. Inside `childChart.setup()`, `this` refers to the copy of the chart that we've called `myChart`. The first argument of `.call()` is what we want `this` to mean when we're inside `baseChart.setup()`. So `baseChart.setup.call(this,container)` says "Go find the `setup()` method on the baseChart() object, and run it as if it were a method of `childChart`." 

This approach means that the developer creating `childChart` needs to explicitly decide what the new `setup()` method will do, and in what order, and whether to use or replace the functionality of the parent method. This is both a) more flexible, since new charts might have unforseen needs and b) more transparent to the end user of childChart, since they can directly see what is called and in what order, and where to find the source code. In an [earlier version](https://github.com/NealHumphrey/d3-boilerplate/blob/68bd76c8858c430798ee721449acf26ebcfb5b6a/src/chart-prototype.js), I had flipped this logic with the baseChart always trying to run the childChart setup method if it existed, but that was both less clear and less flexible. 

Right now I'm using two monolithic `setup()` methods, but as the needs of different charts diversify, the setup() logic could also be broken into more reusable functions, like so:

{% highlight javascript %}
childChart.setup = function(container) {
    baseChart.makeSvg.call(this,container);
    baseChart.addLegends.call(this);
    baseChart.otherReusableFunction.call(this);
}
{% endhighlight %}

By naming both methods `.setup()` instead of making both methods available on the child directly (i.e. naming them `.baseSetup()` and `.childSetup()`) we also provide a consistent API for chart users - whether its the parent chart, child chart, or grandchild chart they're all drawn using the same `.setup()`. 

### Setup-Update-Resize pattern
Now that we have a reusable chart object with method chaining, how should we divide up the work of making our chart? One common operations needed by many D3 charts are updating the data based on some new condition. In the world of responsive websites, we often want different sized charts in different contexts as well. 

The challenge of making a chart that does all these things is separating things that need to happen once (e.g. putting our svg element on the page) vs things that need to happen when things change (e.g. updating the width of our rectangle). Most D3 examples don't separate these out unless they're explicitly needed, so the vast majority of tutorials and examples [look like this one](https://bl.ocks.org/mbostock/3885304) that's designed to run just once on page load. 

The "Towards Reusable Charts" post doesn't discuss this, but in the concluding [time-series-chart example](https://bl.ocks.org/mbostock/3885304) one solution is quietly hidden. Cleverly, Bostock uses the d3 data binding on the SVG element itself, allowing the `enter()` selection to append the svg if needed:

{% highlight javascript %}
// Select the svg element, if it exists.
var svg = d3.select(this).selectAll("svg").data([data]);

// Otherwise, create the skeletal chart.
var gEnter = svg.enter().append("svg").append("g");
{% endhighlight %}

This means that running the function the first time will create the SVG, while running it a second time will simply re-select the SVG element that exists. However while the `enter()` selection is a core component to D3 chart design, most tutorials don't use it for this purpose - and I wanted something more obvious to someone implementing their own childChart. Another pattern I've seen, and the one I decided to adopt, is the Setup/Resize/Update pattern. I came across this in [a tutorial run by Chris Given](https://github.com/cmgiven/gap-reminder-v4) which he kindly repeated for the Housing Insights volunteers. From his [tutorial code](https://github.com/cmgiven/gap-reminder-v4/blob/master/script.js):

> I typically use three lifecycle functions for each chart, each of which calls any successive functions:
> 1. setup (stuff that only ever happens once)
> 2. resize (anything that's dependent on the size of the chart's parent element)
> 3. update (stuff that changes anytime either the data or chart size does)

I did make one alteration to this pattern, wherein `setup()` doesn't automatically call `resize()`, allowing the setup function establish defaults that the user can then override with method chaining. `resize()` and `update()` are designed to run both when the chart is first created (i.e. when called by `setup()`) as well as triggered by user events.

Even if we don't yet want resizability or updatability in a simple chart, thinking briefly about which of these functions is a better home for each component - adding an SVG to the page, or setting the width attribute of a rect element - means that we're set up for it when we decide to do it later, but the only thing that's different about our version 1 code is how we split the same lines between the three functions. 

## D3 Boilerplate

When we put all this together, we have a base chart that can do all the common setup needed by most D3 charts. We also have a consistent API format for any new charts created using this model - with their own `setup()`, `resize()`, and `update()` methods, and method chaining for applying their configuration parameters. But, developers aren't locked into any built in behavior. When making their own childCharts, they must explicitly choose which behavior to get from their parents. 

Do we need another D3 chart library? There are already [a lot of them out there](https://github.com/wbkd/awesome-d3), and I haven't reviewed them all. However I think the emphasis on building an extensible tool for D3 developers - rather than a tool for people that want to put pre-built charts on a page quickly - is unique. Comments, feedback, and especially project contributors are highly encouraged! [Check out the repository here](https://github.com/NealHumphrey/d3-boilerplate).

Finally, let's see an example in action. Click the chart to see its resize and update functions. 

[base.js source code]({{site.baseurl}}/js/d3-boilerplate-0.0.1/donut-chart.js)<br>
[donut-chart.js source code]({{site.baseurl}}/js/d3-boilerplate-0.0.1/donut-chart.js)


<script src="https://d3js.org/d3.v4.min.js"></script>
<script src="{{site.baseurl}}/js/d3-boilerplate-0.0.1/base.js"></script>
<script src="{{site.baseurl}}/js/d3-boilerplate-0.0.1/donut-chart.js"></script>
<style> 
        .chart .values { fill:  rgba(234, 100, 2, 0.7); }
        .chart .filler { fill: rgba(200,200,200,0.7); }
</style>

<div class="demoChart"></div>

<script>

    var data = [{"myLabel":"A","percent":0.8}];

    var demoChart = Object.create(bp.donutChart)

        demoChart.setup('.demoChart')
                .width(250)
                .height(250)
                .margin({top: 20, right: 20, bottom: 30, left: 20})
                .data(data)
                .field('percent')
                .label('myLabel')

                .duration(1000)
                .create()

    demoChart.svg.on("click", function() {
        setTimeout(function(){
            demoChart.width(200).height(200).resize()
        },500)

        setTimeout(function(){
            var copiedData = JSON.parse(JSON.stringify(data))
            copiedData[0]['percent'] = 0.2
            demoChart.update(copiedData)
        }, 1500)
    });
    

</script>


{% highlight javascript %}
var data = [{"myLabel":"A","percent":0.8}];

var demoChart = Object.create(bp.donutChart)

    demoChart.setup('.demoChart')
            .width(250)
            .height(250)
            .margin({top: 20, right: 20, bottom: 30, left: 20})
            .data(data)
            .field('percent')
            .label('myLabel')

            .duration(1000)
            .create() //just an alias for resize() that is more intuitive for first run

demoChart.svg.on("click", function() {
    setTimeout(function(){
        demoChart.width(200).height(200).resize()
    },500)

    setTimeout(function(){
        var copiedData = JSON.parse(JSON.stringify(data))
        copiedData[0]['percent'] = 0.2
        demoChart.update(copiedData)
    }, 1500)
});
{% endhighlight %}








