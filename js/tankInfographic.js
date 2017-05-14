// Initialising the dataset and variables
var tankLevels = [2000, 4000, 6000, 9000, 30000, 10000, 18000, 23450, 28000, 36000, 33000, 35000];// tank levels
var months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
var rainfall = [45, 67, 35, 23, 55, 67, 70, 45, 30, 40, 39, 46];
var loop = [1,2,3,4,5,6,7,8,9,10,11,12];
var tank = 35000; // maximum size
var barwidth = 183; // tank width
var maxheight = 60;
var date = new Date();
var currentMonth = months[date.getMonth()];
//var textRounder = function(value){ return Math.round(value);
//console.log(currentMonth);

var svg =  d3.select("body")
    .append("svg")
    .attr("height", 600)
    .attr("width", "100%");

for (var i = 0; i < 12; i++){
    var xvalue = 25 + 100*i,
        yvalue = 235;
    svg.append("svg:image")
        .attr("xlink:href","images/tank.jpg")
        .attr("width", 175)
        .attr("height", 70)
        .attr("x", xvalue)
        .attr("y", yvalue);
}

for (i = 0; i < 12; i++) {
    var cloudx = 20 + 100*i,
        cloudy = 130;
    svg.append("svg:image")
        .attr("xlink:href", "images/rainclud.png")
        .attr("width", 175)
        .attr("height", 70)
        .attr("x", cloudx)
        .attr("y", cloudy);
}

for (i = 0; i < 12; i++) {
    var overflowx = 15 + 100*i,
        overflowy = 325;
    svg.append("svg:image")
        .attr("xlink:href", "images/overflow.jpg")
        .attr("width", 175)
        .attr("height", 60)
        .attr("x", overflowx)
        .attr("y", overflowy);
}


svg.append("svg:image")
    .attr("xlink:href", "images/rainclud.png")
    .attr("width", 175)
    .attr("height", 70)
    .attr("x", 800)
    .attr("y", 425);

svg.append("svg:image")
    .attr("xlink:href","images/tank.jpg")
    .attr("width", 175)
    .attr("height", 70)
    .attr("x", 900)
    .attr("y", 425);

svg.append("svg:image")
    .attr("xlink:href","images/overflow.jpg")
    .attr("width", 175)
    .attr("height", 70)
    .attr("x", 1000)
    .attr("y", 425);

svg.append("text")
    .attr("x", 890)
    .attr("y", 472)
    .text("Rainfall")
    .attr("text-anchor", "middle")
    .attr("font-family", "san-serif")
    .attr("font-size", "16px")
    .attr("fill", "black");

svg.append("text")
    .attr("x", 990)
    .attr("y", 460)
    .attr("class", "id")
    .append("svg:tspan")
    .attr("x", 990)
    .attr("dy", 5)
    .text("Volume")
    .attr("text-anchor", "middle")
    .attr("font-family", "san-serif")
    .attr("font-size", "16px")
    .attr("fill", "black")
    .append("svg:tspan")
    .attr("x", 990)
    .attr("dy", 20)
    .text("full(%)")
    .attr("text-anchor", "middle")
    .attr("font-family", "san-serif")
    .attr("font-size", "16px")
    .attr("fill", "black");

svg.append("text")
    .attr("x", 1100)
    .attr("y", 460)
    .attr("class", "id")
    .append("svg:tspan")
    .attr("x", 1100)
    .attr("dy", 5)
    .text("Overflow")
    .attr("text-anchor", "middle")
    .attr("font-family", "san-serif")
    .attr("font-size", "12px")
    .attr("fill", "black")
    .append("svg:tspan")
    .attr("x", 1100)
    .attr("dy", 20)
    .text("volume(%)")
    .attr("text-anchor", "middle")
    .attr("font-family", "san-serif")
    .attr("font-size", "12px")
    .attr("fill", "black");

svg.selectAll("rect")
    .data(tankLevels)
    .enter().append("rect")
    .attr("height",function(d){
        if (d > tank){
            return maxheight;}
        else{
            return maxheight * d/tank; }})
    .attr("width","65")
    .attr("fill",function(d,i){
        var currentMonth = date.getMonth();
        if (i < currentMonth){
            return "#66d9ff";
        }
        else if (i === currentMonth){
            return "#00ace6";
        }
        else
            return "#0086b3";
    })
    .attr("x",function(d,i){ return 100*i + 80; })
    .attr("y",function(d,i){
        if (d > tank){
            return 300 - maxheight;
        } else{
        return 300 - maxheight * d/tank; }});

svg.selectAll("text.months-label")
    .data(months).enter()
    .append("text")
    .attr("class", "months-label")
    .text(function(d){ return d; })
    .attr("x", function(d,i){ return 100*i + 110; })
    .attr("y", 108)
    .attr("text-anchor", "middle")
    .attr("font-family", "sans-serif")
    .attr("font-size", "16px")
    .attr("fill", "grey");

svg.selectAll("text.rain-label")
    .data(rainfall).enter()
    .append("text")
    .attr("class", "rain-label")
    .text(function(d){ return d + "mm"; })
    .attr("x", function(d,i){ return 100*i + 110; })
    .attr("y", 170)
    .attr("text-anchor", "middle")
    .attr("font-family", "san-serif")
    .attr("font-size", "12px")
    .attr("fill", "black");

svg.selectAll("text.tank-label")
    .data(tankLevels).enter()
    .append("text")
    .attr("class", "tank-label")
    .text(function(d){
        var tanklevel = Math.round(d/tank * 100);
        if (tanklevel > 100){
            return 100 + "%"
        } else {
        return tanklevel + "%";}})
    .attr("x", function(d,i){ return 100*i + 110; })
    .attr("y", 235)
    .attr("text-anchor", "middle")
    .attr("font-family", "san-serif")
    .attr("font-size", "12px")
    .attr("fill", "black");

svg.selectAll("text.overflow-label")
    .data(tankLevels).enter()
    .append("text")
    .attr("class", "overflow-label")
    .text(function(d){
        var tanklevel = Math.round(d/tank * 100);
        if (tanklevel > 100){
            return (tanklevel - 100) + "%";
        } else {
            return 0 + "%";}})
    .attr("x", function(d,i){ return 100*i + 110; })
    .attr("y", 350)
    .attr("text-anchor", "middle")
    .attr("font-family", "san-serif")
    .attr("font-size", "12px")
    .attr("fill", "black");

for (i = 0; i <= 12; i++){
    var linex = 60 + 100*i;
    svg.append("line")
        .attr("x1", linex)
        .attr("y1", 90)
        .attr("x2", linex)
        .attr("y2", 420)
        .attr("stroke-width", 1)
        .attr("stroke", "grey");
}
svg.append("line")
    .attr("x1", 60)
    .attr("y1", 90)
    .attr("x2", 1260)
    .attr("y2", 90)
    .attr("stroke-width", 1)
    .attr("stroke", "grey");

svg.append("line")
    .attr("x1", 60)
    .attr("y1", 115)
    .attr("x2", 1260)
    .attr("y2", 115)
    .attr("stroke-width", 1)
    .attr("stroke", "grey");

svg.append("line")
    .attr("x1", 60)
    .attr("y1", 215)
    .attr("x2", 1260)
    .attr("y2", 215)
    .attr("stroke-width", 1)
    .attr("stroke", "grey");

svg.append("line")
    .attr("x1", 60)
    .attr("y1", 320)
    .attr("x2", 1260)
    .attr("y2", 320)
    .attr("stroke-width", 1)
    .attr("stroke", "grey");

svg.append("line")
    .attr("x1", 60)
    .attr("y1", 420)
    .attr("x2", 460)
    .attr("y2", 420)
    .attr("stroke-width", 5)
    .attr("stroke", "#66d9ff");


svg.append("line")
    .attr("x1", 460)
    .attr("y1", 420)
    .attr("x2", 560)
    .attr("y2", 420)
    .attr("stroke-width", 5)
    .attr("stroke", "#00ace6");

svg.append("line")
    .attr("x1", 560)
    .attr("y1", 420)
    .attr("x2", 1260)
    .attr("y2", 420)
    .attr("stroke-width", 5)
    .attr("stroke", "#0086b3");

svg.append("text")
    .attr("x", 260)
    .attr("y", 410)
    .text("Historic")
    .attr("text-anchor", "middle")
    .attr("font-family", "san-serif")
    .attr("font-size", "28px")
    .attr("fill", "#66d9ff");

svg.append("text")
    .attr("x", 510)
    .attr("y", 410)
    .text("Current")
    .attr("text-anchor", "middle")
    .attr("font-family", "san-serif")
    .attr("font-size", "28px")
    .attr("fill", "#00ace6");

svg.append("text")
    .attr("x", 940)
    .attr("y", 410)
    .text("Forecast")
    .attr("text-anchor", "middle")
    .attr("font-family", "san-serif")
    .attr("font-size", "28px")
    .attr("fill", "#0086b3");

// table legend
