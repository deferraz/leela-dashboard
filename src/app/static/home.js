(function($) {
  $(function() {
    var controls = $(".banner-controls").first();
    controls.parents(".box").first().children("h2").first().append(controls);

    $("#view-all-banners-link").click(function(e) {
      var alternativeText = $(this).data("alternative-text");
      $(this).data("alternative-text", $(this).html());
      $(this).html(alternativeText);

      $(".banners-slider").toggle();
      $(".banner-navigation").toggle();
      var container = $(".all-banners-container");

      if ($(".banners-slider").is(":visible") == false) {
        container.load($(this).attr("href"), function() {
          container.removeClass("loading");
          container.find(".banner-actions").hide();
        });
        container.show();
        container.addClass("loading");
      } else {
        container.hide();
      }

      e.preventDefault();
      return false;
    });
  });
/*
  $.fn.bannerGallery = function() {
    var index = 0;
    var pages = 0;
    var width = 959;
    var auto = null;

    var next = function(e) {
      return function() {
        clearInterval(auto);
        if (index < pages) {
          index++;
          var _left = index * width;

          if (index < pages)
            e.find('ul').animate({marginLeft: -_left}, {queue: false, duration: 500});
          else
            index--;
        }
      };
    };

    var prev = function(e) {
      return function() {
        clearInterval(auto);
        if (index > 0) {
          index--;
          var _left = index * width;
          $(e).children('ul').animate({marginLeft: -_left}, {queue: false, duration: 500});
        }
      };
    };

      return this.each(function() {
      $(this).find('.link-next').click(next($(this)));
      $(this).find('.link-prev').click(prev($(this)));

      index = 0;
      pages = $(this).find('li').length;
      width = $(this).find('li').first().innerWidth();
      $(this).find('li').height($(this).innerHeight());
        });
    }*/

  $.fn.bannerGallery = function(_options){
    var defaults = {
      gallery: null,
      index:0,
      pages:0,
      width:0,
      isLeft: false,
      isExec: true,
      autoInterval:null,
      auto: function(){
        clearInterval(options.autoInterval);
        if(options.isExec) {
          options.autoInterval = setInterval(function(){
            if(options.isLeft) {
              options.gallery.find('.link-prev').trigger('click');
            } else {
              options.gallery.find('.link-next').trigger('click');
            }

          }, 10000);
        }
      },

      left: function(){
        clearInterval(options.autoInterval);
        
        if (options.index > 0) {
          options.index--;
          var _left = options.index * options.width;
          options.gallery.find('ul').animate({marginLeft: -_left}, {queue: false, duration: 500, easing:'easeOutQuint', complete: function(){
            options.auto();
          }});

          if(options.index === 0)
            options.isLeft = false;
        }
      },

      right: function(){
        clearInterval(options.autoInterval);

        if (options.index < options.pages) {
          options.index++;
          var _left = options.index * options.width;
          if (options.index < options.pages) {
            options.gallery.find('ul').animate({marginLeft: -_left}, {queue: false, duration: 500, easing:'easeOutQuint', complete: function(){
              options.auto();
            }});
          } else
            options.index--;
        }

        if(options.index === (options.pages-1)) {
          options.isLeft = true;
        }
      },

      mouseenter: function(){
        clearInterval(options.autoInterval);
        options.isExec = false;
      },

      mouseleave: function(){
        options.isExec = true;
        options.auto();
      }
    };

    var options = $.extend(defaults, _options);

    return this.each(function(i, e){
      $(e).find('.link-next').bind('click', options.right);
      $(e).find('.link-prev').bind('click', options.left);

      options.pages = $(e).find('ul li').length;
      options.width = $(e).find('ul li:eq(0)').innerWidth();
      $(e).find('ul li').height($(e).innerHeight());
      $(e).bind('mouseenter', options.mouseenter).bind('mouseleave', options.mouseleave);
      options.gallery = $(e);

      options.auto();
    });

  };
})(jQuery);

