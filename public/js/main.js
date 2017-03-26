// $(function() {
//   Barba.Pjax.start();
// });

// var moneydata, timedata; 
Highcharts.chart('trip-graph', {
    chart: {
        type: 'line'
    },
    title: {
        text: 'Trip\'s Over the Past 7-Days'
    },
    xAxis: {
        categories: ['Monday', 'Tuesday', 'Wednesday', 'Thrusday', 'Friday']
    },
    yAxis: {
    },
    plotOptions: {
        line: {
            dataLabels: {
                enabled: true
            },
            enableMouseTracking: false
        }
    },
    series: [{
        name: 'Money',
        data: [7.0, 6.9, 9.5, 14.5, 18.4]
    }, {
        name: 'Time',
        data: [3.9, 4.2, 5.7, 8.5, 11.9]
    }]
});

var poopData

$.ajax({
  type: "GET",
  url: "/",
  success : function(data) {
    console.log(JSON.stringify(data));
    poopData = data
 }
 });


function httpGet(theUrl)
{
    var xmlHttp = new XMLHttpRequest();
    xmlHttp.open( "GET", theUrl, false ); // false for synchronous request
    xmlHttp.send( null );
    return xmlHttp.responseText;
}

httpGet('/')
