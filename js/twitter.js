(function($){

  $.fn.extend({

  //pass the options variable to the function
  jtwt: function(options) {


    //Set the default values, use comma to separate the settings, example:
    var defaults = {
    username : 'google',
        count : 1,
        image_size: 48,
        convert_links: 1,
        loader_text: 'loading new tweets'
    }

    var options =  $.extend(defaults, options);

    return this.each(function() {
    var o = options;
        var obj = $(this);

$(obj).append('<p id="jtwt_loader" style="display:none;">' + o.loader_text + '</p>');
$("#jtwt_loader").fadeIn('slow');

      $.getJSON('http://api.twitter.com/1/statuses/user_timeline.json?screen_name=' + o.username + '&count=' + o.count + '&callback=?', function(data){





    $.each(data, function(i, item) {

        jtweet = '<div id="jtwt">';
        if (o.image_size != 0) {

        today = new Date();

        jtweet += '<div id="jtwt_picture">';
        jtweet += '<a href="http://twitter.com/' + item.user['screen_name'] + '">'
        jtweet += '<img width="' + o.image_size +'" height="' + o.image_size + '" src="' + item.user['profile_image_url'] + '" />';
        jtweet += '</a><br />';
        jtweet += '</div>';
        jtweet += '<div id="jtwt_tweet">';
        }



        var tweettext = item.text;
        var tweetdate = item.created_at;

        if (o.convert_links != 0) {



        tweettext = tweettext.replace(/(http\:\/\/[A-Za-z0-9\/\.\?\=\-]*)/g,'<a href="$1">$1</a>');
        tweettext = tweettext.replace(/@([A-Za-z0-9\/_]*)/g,'<a href="http://twitter.com/$1">@$1</a>');
        tweettext = tweettext.replace(/#([A-Za-z0-9\/\.]*)/g,'<a href="http://twitter.com/search?q=$1">#$1</a>');

        }

        jtweet += '<div id="jtwt_text">';
        jtweet += '<p>' + tweettext + '</p>';
        // jtweet += '<br />';


        tweetdate = tweetdate.replace(/201.{1}/, "");
        tweetdate = tweetdate.replace(/\+00.{2}/, "");
        jtweet += '<a href="http://twitter.com/' + item.user['screen_name'] + '/statuses/' + item.id + '" id="jtwt_date">';

        jtweet += tweetdate;
        jtweet += '</a></div>';
        jtweet += '</div>';

      $(obj).append(jtweet);




         });


$("#jtwt_loader").fadeOut('fast');

  });



    });
    }
  });

})(jQuery);