# jQuerySimpleTimerWidget
Simple jQuery timer widget with `warning` and `complete` events support.

Takes into account the time of page loading with performance.timeOrigin
and subtracts lost time from timer

Applies as follows:
 
 `duration` - The time, in seconds, to the countdown after which the 'complete' event will fire
 
 `warn` - is the time in seconds that the 'warning' event will fire

## Setup example:

Place timer block in any place of BODY.

```html
 <span class="timer" data-duration="10" data-warn="5">00:00</span>
```

Init in `$(document).ready(function () {...}` block:

```js
 $('.timer').timer({
       complete: function (event, data) {
         // Optional "Time is up" logic
       },
       warning: function (event, data) {
         // Optional "warning" time logic
       }
    });
```
