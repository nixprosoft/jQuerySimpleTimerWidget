/**
* Timer widget
* @author NixProSoft, 2019-07-09
* Takes into account the time of page loading with performance.timeOrigin
* and subtracts lost time from timer
*
* Applies as follows:
* `duration` - The time, in seconds, to the countdown after which the 'complete' event will fire
* `warn` - is the time in seconds that the 'warning' event will fire
*
* <span class="timer" data-duration="10" data-warn="5">00:00</span>
*
* $('.timer').timer({
*       complete: function (event, data) {
*         //Time is up
*       },
*       warning: function (event, data) {
*         //Warning time
*       }
*    });
*/
  $.widget("custom.timer", {

      // Default options.
      options: {
          duration: 60,       // duration in seconds
          warn: 0,            // Warning threshold in seconds
          warn_percent: 30    // Calculated warning threshold in % by default
      },
      container: function () {
          return this.element;
      },
      _create: function () {

          console.log(new Date());
          console.log('Timer created');

          var duration = this.element.data('duration') ? this.element.data('duration') : this.options.duration,
              warn = this.element.data('warn')
                  ? this.element.data('warn')
                  : (this.options.warn ? this.options.warn : Math.round((duration / 100) * this.options.warn_percent)),
              timer = duration,
              that = this,
              startDate = new Date(),
              endDate = new Date(),
              text = '',
              prevText = '',
              warnFired = false;

          // TODO
          // Calculating the time lost to the page load if the page is not reloaded 
          // (starting the timer by loading part of the page through AJAX) 
          // then calculating the time not to the AJAX load, but the delta from the first page load
          if (false && typeof performance.timeOrigin !== "undefined") {
              var delta = Math.round(((new Date()) - performance.timeOrigin) / 1000);
              duration -= (duration >= delta ? delta : duration);
          } else {
              duration -= (duration >= 1 ? 1 : duration);
          }

          endDate.setSeconds(startDate.getSeconds() + duration);

          var clock = setInterval(function () {

              startDate = new Date();
              timer = (endDate.getTime() - startDate.getTime()) / 1000;

              text = that._formatted(timer);

              if (prevText !== text) {
                  that.element.text(prevText = text);
              }

              if (timer < 0) {
                  clearInterval(clock);
                  that._trigger("complete", that.element, {duration: 0});
              } else if (timer < warn && !warnFired) {
                  warnFired = true;
                  that._trigger("warning", that.element, {duration: timer});
              }

          }, 300);
      },
      // Formats seconds in minutes and seconds MM:SS
      _formatted: function (value) {
          var minutes = parseInt(value / 60, 10);
          var seconds = parseInt(value % 60, 10);
          // MM:SS
          return (minutes < 10 ? "0" + minutes : minutes) + ":" + (seconds < 10 ? "0" + seconds : seconds);
      }
  });
