// $(function() {
//   Barba.Pjax.start();
// });

// var moneydata, timedata;
$.ajax({
  type: "GET",
  url: "/stats",
  success : function(data) {
    var temp =$('#best-week').text();
    if ( (temp==null) || (temp=='NaN') ||(temp==0) ||(temp=='') )
    {
      temp =1;
    }
    var best_week=numeral(data.longest_duration * (temp/3600)).format('0000.00');
   $('#best-week').text("$" +best_week);
 }
 });
