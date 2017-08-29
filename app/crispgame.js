var titleScreen = $('#titlescreen');
var startbtn = $('#startBtn');
var firstStage = $('#firstStage-container');
var secondStage = $('#secondStage-container');
var parkingLot = $('#parkingLot');
var anna = $('#anna');
var sprite = $('#sprite');
var walker = $("#walker");
var lotPrompt = $('#lotPrompt');
var building = $('#building');
var doorway = $('#doorway');
var gameAnna = $('#game-anna');
var darkScreen = $('#darkScreen');
var ceo = $('#ceo');
var ceoTalker = $('#ceo-talker');
var ceoLeave = $('#ceo-leave');
var hornet = $('#hornet');
var score = $('#score');
var endCongrats = $('#endCongrats');
var retry = $('#retry');
var restart = $('#restart');
var skip = $('#skip');
var secretRoom = $('#secret-room');
var aboutMe = $('#about-me');
var secretRoomBtn = $('#secret-roombtn');

var stinger = $('.stinger');
var stinger_1 = $('#stinger_1');
var stinger_2 = $('#stinger_2');
var stinger_3 = $('#stinger_3');
var stinger_1_initial_position = parseInt(stinger_1.css('top'));
var stinger_2_initial_position = parseInt(stinger_2.css('top'));
var stinger_3_initial_position = parseInt(stinger_3.css('top'));
var stinger_1_initial_left = parseInt(stinger_1.css('left'));
var stinger_2_initial_left = parseInt(stinger_2.css('left'));
var stinger_3_initial_left = parseInt(stinger_2.css('left'));

var game_over = false;
var buttonUp = false;
var buttonRight = false;
var gameplay = false;
var attack = false;
var score_updated = false;
var talking = 1;
var speed_1 = 5;
var speed_2 = 5;
var speed_3 = 5;


startbtn.click(function() {
  titleScreen.fadeOut('fast');
});

// brings user into convo in the studio
skip.click(function() {
  titleScreen.fadeOut('fast');
  anna.stop();
    firstStage.fadeOut(500);
   darkScreen.delay(700).fadeOut(500);
   anna.delay(500).animate({"top": "447"}, 0);
   sprite.delay(500).css("opacity", 0);
   secondStage.delay(1000).fadeIn(500);
   gameAnna.delay(1000).fadeIn(500);
   gameplay = true;
   talking = true;
});

//contains most collision reactions and movement restrictions
var parkingLot_walk = setInterval(function () {

    //parking lot only collisions reactions and prompts
    if (gameplay === false) {
      if (collision(anna, building) && buttonUp === true) {
        anna.stop().css("top", "200");
      } if (collision(anna, building) && buttonRight === true && parseInt(anna.css('top')) < 190) {
        anna.stop().animate({"left": "-=1"}, 0);
      } if (collision(anna, doorway)) {
          anna.stop();
        firstStage.fadeOut(500);
       darkScreen.delay(700).fadeOut(500);
       anna.delay(500).animate({"top": "447"}, 0);
       sprite.delay(500).css("opacity", 0);
       secondStage.delay(1000).fadeIn(500);
       gameAnna.delay(1000).fadeIn(500);
       gameplay = true;
       talking = true;
      }

      if(parseInt(parkingLot.css('margin-top')) > 0) {
         parkingLot.stop();
         parkingLot.css('margin-top', 0);
      }

      if(parseInt(parkingLot.css('margin-top')) > -500) {
         lotPrompt.fadeOut(100);
      }

      if(parseInt(parkingLot.css('margin-top')) <= -500){
         lotPrompt.fadeIn('fast');
      }
    }
    // following code restricts anna to play area
    if (gameplay == false) {
      if(parseInt(anna.css('left')) < 0){
         anna.stop();
         anna.css('left', 0);
      }
      if(parseInt(anna.css('left')) > 843){
         anna.stop();
         anna.css('left', 843);
      }
    }

    if (gameplay == true) {
      if(parseInt(anna.css('left')) < 70){
         anna.stop();
         anna.css('left', 70);
      }
      if(parseInt(anna.css('left')) > 773){
         anna.stop();
         anna.css('left', 773);
      }
    }
});

// causes everything to stop, small hornets to disappear, big hornet to fly away, end congrats page to appear.
function end_the_game() {
    clearInterval(the_game);
    game_over = true;
    anna.stop();
    hornet.stop();
    stinger.fadeOut('fast');
    hornet.animate({"margin-top": "50px"}, 500);
    hornet.delay(500).animate({"margin-top": "-220px"}, 500);
    endCongrats.delay(1500).fadeIn('fast');
    anna.delay(1500).fadeOut('fast');

}

// retry just reloads the page
retry.click(function () {
    location.reload();
});
restart.click(function () {
    location.reload();
});
// makes secret room appear
secretRoomBtn.click(function () {
    secretRoom.fadeIn(500);
    aboutMe.delay(1000).fadeIn(500);
    restart.delay(1000).fadeIn(500);
});

// the actual gameplay code.
var the_game = setInterval(function () {
        if(attack === true) {
          //if anna collides with anything game over
              if(collision(anna, stinger_1) || collision(anna, stinger_2) || collision(anna, stinger_3)) {
                  end_the_game();
                  attack = false;

              } else{

              var stinger_1_current_position = parseInt(stinger_1.css('top'));
              var stinger_2_current_position = parseInt(stinger_2.css('top'));
              var stinger_3_current_position = parseInt(stinger_3.css('top'));
              var stinger_1_left = parseInt(stinger_1.css('left'));
              var stinger_2_left = parseInt(stinger_2.css('left'));
              var stinger_3_left = parseInt(stinger_3.css('left'));
              var hornetLocation =
              parseInt(hornet.css('left'));

                  sprite.stop();
                  gameAnna.stop();
                  hornet.stop();


               skip.fadeOut(20);


         // stinger 1 movements
         if(stinger_1_current_position > 575) {

             // creates a new left to add to current left
                  var new_left_1 =
                      parseInt(Math.random() * 200) - 100;
                // add the new left
                  stinger_1.css('left', stinger_1_initial_left + new_left_1);

                 //increase speed
                 speed_1 = speed_1 + parseInt(Math.random() * 4);
             // since the stinger is below the bottom line of the page you get a point.
             // We use a boolean to react true to get a point, then immediately after false, to keep it from giving you a ton of points.
             if(score_updated === false) {
                score.text(parseInt(score.text()) + 1);
                score_updated = true;
                  }

                  score_updated = false;

             // brings stinger back to top to loop over again
                  stinger_1_current_position = stinger_1_initial_position;
                 stinger_1_left = stinger_1_initial_left;
              }

                  // stinger 2
                if (stinger_2_current_position > 575) {
                 var new_left_2 =
                      parseInt(Math.random() * 400) - 100;

                  stinger_2.css('left', stinger_2_initial_left + new_left_2);

                  speed_2 = speed_2 + parseInt(Math.random() * 4);

                    if(score_updated === false) {
                score.text(parseInt(score.text()) + 1);
                score_updated = true;
                  }
                  score_updated = false;

                  stinger_2_current_position = stinger_2_initial_position;
                    stinger_2_left = stinger_2_initial_left;
              }

                   // stinger 3
                if (stinger_3_current_position > 575) {
                 var new_left_3 =
                      parseInt(Math.random() * 700) - 100;

                  stinger_3.css('left', stinger_3_initial_left + new_left_3);

                  speed_3 = speed_3 + parseInt(Math.random() * 4);

                    if(score_updated === false) {
                score.text(parseInt(score.text()) + 1);
                score_updated = true;
                  }
                  score_updated = false;

                  stinger_3_current_position = stinger_3_initial_position;
                    stinger_3_left = stinger_3_initial_left;
              }

                  // adds the new speed
              stinger_1.css('top', stinger_1_current_position + speed_1);
              stinger_2.css('top', stinger_2_current_position + speed_2);
              stinger_3.css('top', stinger_3_current_position + speed_3);



              }
}
}, 40);



// the following code is all movement
$(document).bind('keydown', function(e) {
          var left = 37,
              up = 38,
              right = 39,
              down = 40,
              enter = 13
          anna.stop();
          parkingLot.stop();

    // Enter has a number of functions, including triggering pages and text to fade in and out.
     if (e.keyCode == enter && game_over === false) {
         titleScreen.fadeOut('fast');

         // numbers with a ++ are used to target wich text boxes will be seen and which will be invisible.
         if (gameplay === true && talking == 1) {
             $('#talk1').fadeOut('fast');
             $('#talk2').css('opacity', "1");
             talking++;
             talking.stop();
         }
         if (gameplay === true && talking == 2) {
             $('#talk2').fadeOut('fast');
             $('#talk3').css('opacity', "1");
             talking++;
             talking.stop();
         }
          if (gameplay === true && talking == 3) {
             $('#talk3').fadeOut('fast');
             $('#talk4').css('opacity', "1");
             talking++;
             talking.stop();
         }
         if (gameplay === true && talking == 4) {
             $('#talkBubble').fadeOut('fast');
             ceoTalker.fadeOut('fast');
             ceoLeave.css('opacity', 1);
             ceo.delay(500).animate({"left": "+=500px"}, 2000);
             hornet.css('opacity', 1);
             attack = true;
         }
     }
           // pressing a directional button causes the sprite to shift, then fade out, and have a walk animation fade in.
          if (e.keyCode == left && game_over === false) {

         anna.animate({"left": "-=64"}, "fast");
         if (gameplay === false) {
         sprite.css('top', "-128px");
         sprite.css('left', '-64px');
         sprite.fadeOut(100);

         walker.css('top', "-128px").css('opacity', 1);
         }

          }

         if (e.keyCode == up && game_over === false && gameplay === false) {
             if (parseInt(parkingLot.css('margin-top')) < 0) {

             parkingLot.animate({"margin-top": "+=64"}, "fast");
             }

             if (parseInt(parkingLot.css('margin-top')) >= 0 && parseInt(anna.css('top')) >= 32) {

             anna.animate({"top": "-=64"}, "fast");
             }


             sprite.css('top', "-192px");
             sprite.css('left', '-64px');
             sprite.fadeOut(100);

             walker.css('top', "-192px").css('opacity', 1);
             buttonUp = true;

             //if(parseInt(parkingLot.css('top')) > -375){
                 //movedown.fadeIn('fast');}

         }
         if (e.keyCode == right && game_over === false) {
            anna.animate({"left": "+=64"}, "fast");

             if (gameplay === false) {
             sprite.css('top', "-64px");
             sprite.css('left', '-64px');
             sprite.fadeOut(100);

             walker.css('top', "-64px").css('opacity', 1);
             }
             buttonRight = true;

         }
         if (e.keyCode == down && game_over === false && gameplay === false) {
             if(parseInt(parkingLot.css('margin-top')) > -575 && parseInt(anna.css('top')) >= 447) {
            parkingLot.animate({"margin-top": "-=64"}, "fast");
             }

             if (parseInt(parkingLot.css('margin-top')) >= -575 && parseInt(anna.css('top')) < 447) {
             anna.animate({"top": "+=64"}, "fast");
             }

             sprite.css('top', "0px");
             sprite.css('left', '-64px');
             sprite.fadeOut(100);

             walker.css('top', "0px").css('opacity', 1);
         }
});

// key up causes everything to stop so we dont have runaway glitches
    $(document).bind('keyup', function(e) {
          var left = 37,
              up = 38,
              right = 39,
              down = 40

          if (e.keyCode == left && game_over === false) {

              sprite.stop();
              walker.css('opacity', 0);
              sprite.css('left', "0px").fadeIn(0);

          }

           if (e.keyCode == right && game_over === false) {

              sprite.stop();
              walker.css('opacity', 0);
              sprite.css('left', "0px").fadeIn(0);
              buttonRight = false;
           }

            if (e.keyCode == up && game_over === false) {
              sprite.stop();
              sprite.css('left', "0px").fadeIn(0);
              walker.css('opacity', 0);
                buttonUp = false;
            }


         if (e.keyCode == down && game_over === false) {

              sprite.stop();
              sprite.css('left', "0px").fadeIn(0);
              walker.css('opacity', 0);
         }
});


// collision!! obvi
function collision($div1, $div2) {
          var x1 = $div1.offset().left;
          var y1 = $div1.offset().top;
          var h1 = $div1.outerHeight(true);
          var w1 = $div1.outerWidth(true);
          var b1 = y1 + h1;
          var r1 = x1 + w1;
          var x2 = $div2.offset().left;
          var y2 = $div2.offset().top;
          var h2 = $div2.outerHeight(true);
          var w2 = $div2.outerWidth(true);
          var b2 = y2 + h2;
          var r2 = x2 + w2;

          if(b1 < y2 || y1 > b2 || r1 < x2 || x1 > r2) return false;
          return true;
}
