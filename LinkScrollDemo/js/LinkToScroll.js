/*
 Title:Smooth scrolling
 Created by: Joseph Capilastique
 Date:10/15/2018
 */

'use strict';
var properties = [];
class LinkToScroll {
  //scroll subclass
  add(f) {
    //get element
    scroll(document.querySelectorAll(f));

    function scroll(a) {      
      //add event listener
      for (var x = 0; x < a.length; x++) {
        if (properties['prop']) {
          a[x].setAttribute('onclick', "return false;");
        }
        a[x].addEventListener("click", function (e) {
          var target = document.getElementById(this.hash.replace('#', ''));
          if (typeof (target) !== "undefined" && target !== null ) {
            animate(
              document.scrollingElement || document.documentElement,
              "scrollTop",
              properties['unit'],
              window.pageYOffset || document.documentElement.scrollTop,
              target.offsetTop,
              properties['speed'],
              properties['prop']
            );
          }

        });
      }

      //set animation
      function animate(elem, style, unit, from, to, time, prop) {
        if (!elem) { return; }
        var start = new Date().getTime(),
          timer = setInterval(function () {
            var step = Math.min(1, (new Date().getTime() - start) / time);
            if (prop) {
              elem[style] = (from + step * (to - from)) + unit;
            } else {
              elem.style[style] = (from + step * (to - from)) + unit;
            }
            if (step === 1) {
              clearInterval(timer);
            }
          }, 10);
        if (prop) {
          elem[style] = from + unit;
        } else {
          elem.style[style] = from + unit;
        }
      }

    }
  }
  //set properties
  //speed,animate,unit
  set(a = 1000, b = false, c = '') {
      return properties = {
        speed: ((a == null || a == '' || a.length == 0) ? 1000 : a),
        prop: ((b == null || b == '' || b.length == 0) ? false : b),
        unit: ((c == null || c == '' || c.length == 0) ? '' : c)
      };
  }
}
var Scroll = new LinkToScroll();
Scroll.set(1000, true);