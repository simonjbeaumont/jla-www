;(function ($, window, undefined) {
  'use strict';

  var $doc = $(document),
      Modernizr = window.Modernizr;

  $(document).ready(function() {
    $.fn.foundationAlerts           ? $doc.foundationAlerts() : null;
    $.fn.foundationButtons          ? $doc.foundationButtons() : null;
    $.fn.foundationAccordion        ? $doc.foundationAccordion() : null;
    $.fn.foundationNavigation       ? $doc.foundationNavigation() : null;
    $.fn.foundationTopBar           ? $doc.foundationTopBar() : null;
    $.fn.foundationCustomForms      ? $doc.foundationCustomForms() : null;
    $.fn.foundationMediaQueryViewer ? $doc.foundationMediaQueryViewer() : null;
    $.fn.foundationTabs             ? $doc.foundationTabs({callback : $.foundation.customForms.appendCustomMarkup}) : null;
    $.fn.foundationTooltips         ? $doc.foundationTooltips() : null;
    $.fn.foundationMagellan         ? $doc.foundationMagellan() : null;
    $.fn.foundationClearing         ? $doc.foundationClearing() : null;

    $('input, textarea').placeholder();
  });

  // UNCOMMENT THE LINE YOU WANT BELOW IF YOU WANT IE8 SUPPORT AND ARE USING .block-grids
  // $('.block-grid.two-up>li:nth-child(2n+1)').css({clear: 'both'});
  // $('.block-grid.three-up>li:nth-child(3n+1)').css({clear: 'both'});
  // $('.block-grid.four-up>li:nth-child(4n+1)').css({clear: 'both'});
  // $('.block-grid.five-up>li:nth-child(5n+1)').css({clear: 'both'});

  // Hide address bar on mobile devices (except if #hash present, so we don't mess up deep linking).
  if (Modernizr.touch && !window.location.hash) {
    $(window).load(function () {
      setTimeout(function () {
        window.scrollTo(0, 1);
      }, 0);
    });
  }
  //Navigation Controller on Responsive Devices
  //check the classes on the responsive @media (max-width: 768px) {}
  if (Modernizr.touch || navigator.userAgent.match(/Windows Phone/i)) {
    $('.nav-button-collapse').on( 'click', function(){
      $('.responsive-nav-container').slideToggle('slow', function(){
        //overwrites the native behaviour of slideToggle that sets overflow to hidden;
        $(this).css('overflow', 'visible');
      });
      // $('.responsive-nav-container').toggleClass('responsive-nav-container-display', 'responsive-nav-container');
    });
  }

(function(){
   //orbit slider for the blog/ single post sliders
  $('#featured').orbit({
       animation: 'horizontal-push',                  // fade, horizontal-slide, vertical-slide, horizontal-push
       animationSpeed: 800,                // how fast animtions are
       timer: true,        // true or false to have the timer
       resetTimerOnClick: false,           // true resets the timer instead of pausing slideshow progress
       advanceSpeed: 4000,     // if timer is enabled, time between transitions
       pauseOnHover: false,      // if you hover pauses the slider
       startClockOnMouseOut: false,    // if clock should start on MouseOut
       startClockOnMouseOutAfter: 1000,    // how long after MouseOut should the timer start again
       directionalNav: false,     // manual advancing directional navs
       captions: true,       // do you want captions?
       captionAnimation: 'fade',     // fade, slideOpen, none
       captionAnimationSpeed: 800,   // if so how quickly should they animate in
       bullets: true,       // true or false to activate the bullet navigation
       bulletThumbs: false,    // thumbnails for the bullets
       bulletThumbLocation: '',    // location from this file where thumbs will be
       afterSlideChange: function(){},   // empty function
       fluid: true // or set a aspect ratio for content slides (ex: '4x3')
  });
})();

(function($){

  /**
     * Notes:
     *
     * example how to add items:
     */

    /*

    var $items  = $('<div class="sl-slide sl-slide-color-2" data-orientation="horizontal" data-slice1-rotation="-5" data-slice2-rotation="10" data-slice1-scale="2" data-slice2-scale="1"><div class="sl-slide-inner bg-1"><div class="sl-deco" data-icon="t"></div><h2>some text</h2><blockquote><p>bla bla</p><cite>Margi Clarke</cite></blockquote></div></div>');

    // call the plugin's add method
    ss.add($items);

    */
   if($('#slider').length && $().slitslider ){
    var Page = (function() {

      var $navArrows = $( '#nav-arrows' ),
      $nav = $( '#nav-dots > span' ),
      slitslider = $( '#slider' ).slitslider( {
         autoplay : true,
        onBeforeChange : function( slide, pos ) {

         /**
         * THIS SECTION MANAGES THE TRIANGLE COLORS EVERY TIME THE SLIDER BACKGROUND CHANGES SO DOES THE TRIANGLE.
         */
        //get the colors of each slide
        //and set it that color to the bottom-triangle.
        var newpos = pos;
        newpos += 1;
        var triangleColor = $('.bg-'+ newpos + ' .sl-slide-inner').css('backgroundColor');
        $('.expertise-triangle').css('border-color', triangleColor + ' transparent transparent transparent');

        /**
         * THIS SECTION HANDLES THE DOT NAVIGATIONS ON TOP OF THE TRIANGLES.
         */

        $nav.removeClass( 'nav-dot-current' );
        $nav.eq( pos ).addClass( 'nav-dot-current' );

        }
      } ),

      init = function() {

        initEvents();

      },
      initEvents = function() {

        // add navigation events
        $navArrows.children( ':last' ).on( 'click', function() {

        slitslider.next();
        return false;

        } );

        $navArrows.children( ':first' ).on( 'click', function() {

        slitslider.previous();
        return false;

        } );

        $nav.each( function( i ) {

        $( this ).on( 'click', function( event ) {

          var $dot = $( this );

          if( !slitslider.isActive() ) {

          $nav.removeClass( 'nav-dot-current' );
          $dot.addClass( 'nav-dot-current' );

          }

          slitslider.jump( i + 1 );
          return false;

        } );

        } );

      };

      return { init : init };

    })();

    Page.init();
  }
  else{
    return;
  }


})(jQuery);


(function(){

  var $portfolioContainer = $('#work-container'), $filters= $('#filters');

  if($('#work-container').length && $().isotope){

    $portfolioContainer.imagesLoaded( function(){
      $portfolioContainer.isotope({
        // options...
        // resizable: false
        // itemSelector : '.element'
      });
    });

    $filters.find('a').click(function(){
      var $this = $(this), selector = $this.attr('data-filter');
      //checked if already has a class selected and do nothing
      if($this.hasClass('selected')){
        return false;
      }
      //checked if the one that i'm clickin doesn't have the class then find the one that has the class
      //and removed the class after that
      $this.parents($filters).find('.selected').removeClass('selected');
      //Just add the class selected to the new item
      $this.addClass('selected');

      $portfolioContainer.isotope({
        filter: selector
      });
      return false;
    });
  } //end if
  else{
    return;
  }

})();

//THIS HANDLES THE TWITTER FEED AT THE BOTTOM OF THE PAGE
(function(){
  $('#twitter-feed').jtwt({
    count : 2, // The number of displayed tweets. Default is 5.
    username : 'envato', // Your username on Twitter
    image_size : 0, // The size of your avatar. 0 means "no avatar". Default is 48.
    loader_text : 'loading tweets', // The text which be displayed by loading the tweets.
    convert_links : 1 // Choose if the links and replies in your tweets to be converted in clickable links. 0 means no, 1 means yes.
  });
})();

})(jQuery, this);
