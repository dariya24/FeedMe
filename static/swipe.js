$(document).ready(function() {
  $.getJSON("static/menu.json", function(json) {
      console.log(json); // this will show the info it in firebug console
      //create elements
      console.log(json.breakfast);
      for (var i = json.breakfast.length - 1; i >= 0; i--) {
        json.breakfast[i].image
        max = Math.max(json.breakfast[i].nutrients.Carbs,json.breakfast[i].nutrients.Fat,json.breakfast[i].nutrients.Proteins)
        console.log(max)
        elem = `<div class='demo__card' id='`+i+`'>
                  <div class='demo__card__top'>
                    <div class='demo__card__img' style='background: -webkit-linear-gradient(bottom, 
      rgba(0,0,0,0.9) 0%, 
      rgba(0,0,0,0.5) 20%,
      rgba(0,0,0,0) 80%,
      rgba(0,0,0,0) 100%
    ),-webkit-linear-gradient(left, 
      rgba(0,0,0,0.9) 0%, 
      rgba(0,0,0,0.5) 20%,
      rgba(0,0,0,0) 80%,
      rgba(0,0,0,0) 100%
    ), url(`+json.breakfast[i].image+`)'></div>
                    <div class='demo__card__name'>`+json.breakfast[i].name+`</div>
                    <div class='container horizontal rounded'>
                      <div class='progress-bar horizontal'>
                        <p>Carbs</p>
                        <div class='progress-track'>
                          <div class='progress-fill'>
                            <span>`+String((json.breakfast[i].nutrients.Carbs/max)*100)+ "%"+`</span>
                          </div>
                        </div>
                      </div>

                      <div class='progress-bar horizontal'>
                        <p>Fat</p>
                        <div class='progress-track'>
                          <div class='progress-fill'>
                            <span>`+String((json.breakfast[i].nutrients.Fat/max)*100)+ "%"+`</span>
                          </div>
                        </div>
                      </div>

                      <div class='progress-bar horizontal'>
                        <p>Protein</p>
                        <div class='progress-track'>
                          <div class='progress-fill'>
                            <span>`+String((json.breakfast[i].nutrients.Proteins/max)*100)+ "%"+`</span>
                          </div>
                        </div>
                      </div>
                    </div>
                      <script type='text/javascript'>
                        $('.horizontal .progress-fill span').each(function(){
                        var percent = $(this).html();
                        $(this).parent().css('width', percent);
                      });
                    </script>
                  </div>
                  <div class='demo__card__btm'>
                    &ensp;&ensp; <i class='fas fa-clock icon'>`+ " "+String(json.breakfast[i].time)+"min" +`</i> &ensp;&ensp;&ensp;&ensp;
                    <i class='fas fa-dollar-sign icon'>`+ " ~"+String(json.breakfast[i].price) +`</i>
                    <p class='demo__card__we'>` + json.breakfast[i].instructions.substr(0,90)+"..." +`</p>
                  </div>
                  <div class='demo__card__choice m--reject'></div>
                  <div class='demo__card__choice m--like'></div>
                  <div class='demo__card__drag'></div>
                </div>
              </div>
            </div>`;
        $('.demo__card-cont').prepend(elem);
        //document.getElementsByClassName('demo__card-cont').innerHTML = document.getElementsByClassName('demo__card-cont').innerHTML + elem;
      }

      var animating = false;
      var cardsCounter = 0;
      var numOfCards = 6;
      var decisionVal = 80;
      var pullDeltaX = 0;
      var deg = 0;
      var $card, $cardReject, $cardLike;

      function pullChange() {
        animating = true;
        deg = pullDeltaX / 10;
        $card.css("transform", "translateX("+ pullDeltaX +"px) rotate("+ deg +"deg)");

        var opacity = pullDeltaX / 100;
        var rejectOpacity = (opacity >= 0) ? 0 : Math.abs(opacity);
        var likeOpacity = (opacity <= 0) ? 0 : opacity;
        $cardReject.css("opacity", rejectOpacity);
        $cardLike.css("opacity", likeOpacity);
      };

      function release() {

        if (pullDeltaX >= decisionVal) {
          $card.addClass("to-right");
          //console.log(window.location.href);
          id = $card[0].id;
          window.location.href = window.location.href + "/" + id;
        } else if (pullDeltaX <= -decisionVal) {
          $card.addClass("to-left");
        }

        if (Math.abs(pullDeltaX) >= decisionVal) {
          $card.addClass("inactive");

          setTimeout(function() {
            $card.addClass("below").removeClass("inactive to-left to-right");
            cardsCounter++;
            if (cardsCounter === numOfCards) {
              cardsCounter = 0;
              $(".demo__card").removeClass("below");
            }
          }, 300);
        }

        if (Math.abs(pullDeltaX) < decisionVal) {
          $card.addClass("reset");
        }

        setTimeout(function() {
          $card.attr("style", "").removeClass("reset")
            .find(".demo__card__choice").attr("style", "");

          pullDeltaX = 0;
          animating = false;
        }, 300);
      };

      $(document).on("mousedown touchstart", ".demo__card:not(.inactive)", function(e) {
        if (animating) return;

        $card = $(this);
        $cardReject = $(".demo__card__choice.m--reject", $card);
        $cardLike = $(".demo__card__choice.m--like", $card);
        var startX =  e.pageX || e.originalEvent.touches[0].pageX;

        $(document).on("mousemove touchmove", function(e) {
          var x = e.pageX || e.originalEvent.touches[0].pageX;
          pullDeltaX = (x - startX);
          if (!pullDeltaX) return;
          pullChange();
        });

        $(document).on("mouseup touchend", function() {
          $(document).off("mousemove touchmove mouseup touchend");
          if (!pullDeltaX) return; // prevents from rapid click events
          release();
        });
      });
  });
});