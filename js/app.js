var set = [];
var nextq, prevq, select;
var score = 0;
var count = 1;
var totalQ;
var filename;
var origTotal;
var copy = [];
var rightanswers = [];
    

$.getJSON('js/set.json', function(data) {
    $.each(data, function(index, item) {
        set.push(item);
    });
copy = set.slice(0);
totalQ = set.length;
origTotal = copy.length;
cycle();
nextQuestion();
$("#score").html(score);
$("#count").html(count);
$("#total").html(totalQ);
});

function cycle(){
  nextq = set.shift();  
}

$( "#nextbutton" ).click(function() {
  select = $( "input:radio[name=answer]:checked" ).val();
    if (select == undefined){
    alert("Please select an answer");
    }
    else {
  set.push(nextq);
  if (count < origTotal){
    count++;
  }
  totalQ--;
  choose();
  $("#score").html(score);
  $("#count").html(count);
  $("#total").html(totalQ);
  clear();
  cycle();
  nextQuestion();
  endQuiz();
    }
});    

$( "#backbutton" ).click(function() {
  if (count > 1) {
      count--;
      if (totalQ < 10){
        totalQ++;
        $("#total").html(totalQ);
      }
      $("#count").html(count);
      $('#photo').html("");
      set.unshift(nextq);
      nextq = set.pop();
      nextQuestion();
   }      
  lowerscore();   
});
    
function nextQuestion(){
  $("#askQ").html(nextq.question);
  //print to label of radio button
  $("input[value='0']").next().text(nextq.choices[0]);
  $("input[value='1']").next().text(nextq.choices[1]);
  $("input[value='2']").next().text(nextq.choices[2]);
  $("input[value='3']").next().text(nextq.choices[3]);
  //$("<img src='img/photo.png'>").appendTo('#photo');
  $("<img src='img/" + nextq.filename + "'>").appendTo('#photo');
  $('#credits').html(nextq.credits);
}

function clear(){
  $("input:radio").prop( "checked", false );
  $('#photo').html("");
  $('#credits').html("");
}

function endQuiz(){
  if (totalQ == 0){
    $("#count").html(count);
    $("#askQ").html("Final Score: " + score + " of " + origTotal);
    $("#askQ").css("font-size", "+=20");
    $("input:radio").next().text("");
    $(".radios").hide();
    $( ".button" ).hide(); 
    $("#correct").hide("slow");
    };
}
    
function lowerscore() {
  for (i=0; i<rightanswers.length; i++){
      if (rightanswers[i] == nextq && score > 0){
          score--
       $("#score").html(score);
      }
   }
}; 

function choose(){
   if (select == nextq.answer) {
      $("#correct").html("Correct!");
      $("#correct").css( "color", "green" );
      score++;
      rightanswers = [];  // need to erase the points earned if back button is used
      rightanswers.push(nextq); 
      $("#score").html(score);
    }
  else {$("#correct").html("Sorry, that's not correct.");
      $("#correct").css( "color", "red" );
       };
}