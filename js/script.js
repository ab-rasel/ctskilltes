;(function($){
    'use strict';
    var $win = $(window), $body_m = $('body');
    // Touch Class
    if (!("ontouchstart" in document.documentElement)) {
        $body_m.addClass("no-touch");
    }
    // Sticky
    var $is_sticky = $('.is-sticky');
    if ($is_sticky.length > 0 ) {
        var $navm = $('#navbar').offset();
        $win.scroll(function(){
            var $scroll = $win.scrollTop();
            if ($win.width() > 0) {
                if($scroll > $navm.top+4 ){
                    if(!$is_sticky.hasClass('has-fixed')) {$is_sticky.addClass('has-fixed');}
                } else {
                    if($is_sticky.hasClass('has-fixed')) {$is_sticky.removeClass('has-fixed');}
                }
            } else {
                if($is_sticky.hasClass('has-fixed')) {$is_sticky.removeClass('has-fixed');}
            }
        });
    }
    // Slider
    var $slider = $('#slider');
    if ($slider.length > 0 ) {
        $slider.carousel({ interval:6000, pause: 'null' });
    }
    //Carousel
    var $has_carousel = $('.has-carousel');
    if ($has_carousel.length > 0 ) {
        $has_carousel.each(function(){
            var $self = $(this);
            var c_item = ($self.data('items')) ? $self.data('items') : 4;
            var c_item_t = (c_item >= 3) ? 3 : c_item;
            var c_item_m = (c_item_t >= 2) ? 2 : c_item_t;
            var c_delay =($self.data('delay')) ? $self.data('delay') : 4000;
            var c_auto =($self.data('auto')) ? true : false;
            var c_loop =($self.data('loop')) ? true : false;
            var c_dots = ($self.data('dots')) ? true : false;
            var c_navs = ($self.data('navs')) ? true : false;
            var c_mgn = ($self.data('margin')) ? $self.data('margin') : 10;
            var c_animateOut = ($self.data('animateOut')) ? $self.data('animateOut') : 'fadeOut';
            $self.addClass('owl-carousel').owlCarousel({
                navText: ["<i class='fa fa-angle-left'></i>","<i class='fa fa-angle-right'></i>"],
                items: c_item, loop: c_loop, nav: c_navs, dots: c_dots, margin: c_mgn,animateOut: c_animateOut,
                autoplay: c_auto, autoplayTimeout: c_delay, autoplaySpeed: 700,
                responsive:{ 0:{ items:1 }, 480:{ items: 1 }, 768:{ items: c_item_t }, 1170:{ items: c_item } }
            });
        });
    }
    // LogoCarousel
    var $logo_carousel = $('.logo-carousel');
    if ($logo_carousel.length > 0 ) {
        $logo_carousel.owlCarousel({
            items: 5, loop: true, margin: 30, responsive:{0:{ items:2 }, 379:{ items:3 }, 720:{ items:4 }, 1280:{ items:6 } }
        });
    }
    // Parallax
    var $parallax = $('.has-parallax');
    if ($parallax.length > 0 ) {
        $parallax.each(function() {
            $(this).parallaxie({ speed: 0.3, offset: 0 });
        });
    }
    // Smooth scrolling using jQuery easing
    $('a.scroller[href*="#"]:not([href="#"])').on("click", function() {
        if (location.pathname.replace(/^\//, '') === this.pathname.replace(/^\//, '') && location.hostname === this.hostname) {
            var toHash = $(this.hash), toHashN = (this.hash.slice(1)) ? $('[name=' + this.hash.slice(1) + ']') : false;
            toHash = toHash.length ? toHash : toHashN;
            if (toHash.length) {
                $('html, body').animate({
                    scrollTop: (toHash.offset().top - 70)
                }, 1000, "easeInOutExpo");
                return false;
            }
        }
    });

    // Close responsive menu when a scroll trigger link is clicked
    $('.scroller').click(function() {
        $('.navbar-collapse').collapse('hide');
    });

    // Preloader
    var $preload = $('#preloader');
    if ($preload.length > 0) {
        $(window).on('load', function() {
            $preload.children().fadeOut(300);
            $preload.delay(150).fadeOut(500);
            $('body').delay(100).css({'overflow':'visible'});
        });
    }

    // ScrollDown to
    var $scrollBtn = $('.scroll-to');
    if($scrollBtn.length > 0){
        $scrollBtn.on('click', function(){
            $('html, body').animate({ scrollTop: $( $.attr(this, 'href') ).offset().top }, 500);
            return false;
        });
    }
    // ImageBG
    var $imageBG = $('.imagebg');
    if ($imageBG.length > 0) {
        $imageBG.each(function(){
            var $this = $(this),
                $that = $this.parent(),
                overlay = $this.data('overlay'),
                image = $this.children('img').attr('src');
            var olaytyp = (typeof overlay!=='undefined' && overlay!=='') ? overlay.split('-') : false;

            // If image found
            if (typeof image!=='undefined' && image !==''){
                if (!$that.hasClass('has-bg-image')) {
                    $that.addClass('has-bg-image');
                }
                if ( olaytyp!=='' && (olaytyp[0]==='dark') ) {
                    if (!$that.hasClass('light')) {
                        $that.addClass('light');
                    }
                }
                $this.css("background-image", 'url("'+ image +'")').addClass('bg-image-loaded');
            }
        });
    }
    // Subscribe Form
    var subscribeForm = $('#subscribe-form');
    if (subscribeForm.length > 0) {
        if( !$().validate || !$().ajaxSubmit ) {
            console.log('subscribeForm: jQuery Form or Form Validate not Defined.');
            return true;
        }
        if (subscribeForm.length > 0) {
            var selectRec = subscribeForm.find('select.required'),
                sf_results = subscribeForm.find('.subscribe-results');
            subscribeForm.validate({
                invalidHandler: function () { sf_results.slideUp(400); },
                submitHandler: function(form) {
                    sf_results.slideUp(400);
                    $(form).ajaxSubmit({
                        target: sf_results, dataType: 'json',
                        success: function(data) {
                            var type = (data.result==='error') ? 'alert-danger' : 'alert-success';
                            sf_results.removeClass( 'alert-danger alert-success' ).addClass( 'alert ' + type ).html(data.message).slideDown(400);
                            if (data.result !== 'error') { $(form).clearForm(); }
                        }
                    });
                }
            });
            selectRec.on('change', function() { $(this).valid(); });
        }
    }

    // Contact Form
    var quoteForm = $('#contact-request');
    if (quoteForm.length > 0) {
        if( !$().validate || !$().ajaxSubmit ) {
            console.log('quoteForm: jQuery Form or Form Validate not Defined.');
            return true;
        }
        // Form Validation
        if (quoteForm.length > 0) {
            var selectRec = quoteForm.find('select.required'),
                qf_results = quoteForm.find('.form-results');
            quoteForm.validate({
                invalidHandler: function () { qf_results.slideUp(400); },
                submitHandler: function(form) {
                    qf_results.slideUp(400);
                    $(form).ajaxSubmit({
                        target: qf_results, dataType: 'json',
                        success: function(data) {
                            var type = (data.result==='error') ? 'alert-danger' : 'alert-success';
                            qf_results.removeClass( 'alert-danger alert-success' ).addClass( 'alert ' + type ).html(data.message).slideDown(400);
                            if (data.result !== 'error') { $(form).clearForm(); }
                        }
                    });
                }
            });
            selectRec.on('change', function() { $(this).valid(); });
        }
    }

    // video Popup
    var $vdoPop = $('.video-pop');
    if($vdoPop.length > 0){
        $vdoPop.magnificPopup({
            type: 'iframe',
            iframe: {
                patterns: {
                    youtube: {
                        index: 'youtube.com/',
                        id: function(url) {
                            var m = url.match(/[\\?\\&]v=([^\\?\\&]+)/);
                            if ( !m || !m[1] ) return null;
                            return m[1];
                        },
                        src: '//www.youtube.com/embed/%id%?autoplay=1'
                    }
                }
            }
        });
    }

    // Typed
    var typed = new Typed('#typed', {
        stringsElement: '#typed-strings',
        typeSpeed: 100,
        loop: true,
        backSpeed: 100,
        backDelay: 700,
        startDelay: 700
    });

    // Color Switcher ( only for demo )
    $body_m.append('<div id="themes_panel"><div id="toggle_button"> <a class="toggle-theme-panel" href="#"> <i class="fa fa-gear"></i> </a> <a class="buy-this-template" target="_blank" href="https://themeforest.net/item/appsland-app-landing-html-template/21131010?ref=softnio"> <i class="fa fa-shopping-cart"></i> </a></div><div id="themes_menu"><h4 style="text-transform:uppercase;padding-left:15px;color:#fff;">Color Switcher</h4><div class="segment"><ul class="theme cookie_layout_style"><li> <a class="theme-defalt" title="theme" href="#"></a></li><li> <a class="theme-blue" title="theme-blue" href="#"></a></li><li> <a class="theme-dark-blue" title="theme-dark-blue" href="#"></a></li><li> <a class="theme-orange" title="theme-orange" href="#"></a></li><li> <a class="theme-blue-green" title="theme-blue-green" href="#"></a></li><li> <a class="theme-purple-red" title="theme-purple-red" href="#"></a></li><li> <a class="theme-purple" title="theme-purple" href="#"></a></li><li> <a class="theme-royel-teal" title="theme-royel-teal" href="#"></a></li><li> <a class="theme-pink-orange" title="theme-pink-orange" href="#"></a></li><li> <a class="theme-green-blue" title="theme-green-blue" href="#"></a></li></ul></div><div class="clearfix"><h4 style="text-transform:uppercase;padding-left:15px;color:#fff;">Landing page Demos</h4><ul class="theme cookie_demo_list list-1"><li> <strong>Style 1</strong></li><li> <a href="index.html">Default</a></li><li> <a href="index-particles.html">Particles</a></li><li> <a href="index-gradient.html">Gradient</a></li><li> <a href="index-slider.html">Slider</a></li><li> <a href="index-video.html">Video</a></li><li> <a href="index-image.html">Image</a></li><li> <a href="index-typing.html">Typing</a></li><li> <a href="index-iphone7.html">iPhone7</a></li><li> <a href="index-half-header.html">Half Header</a></li></ul><ul class="theme cookie_demo_list"><li> <strong>Style 2</strong></li><li> <a href="index-x1.html">Default</a></li><li> <a href="index-x1-particles.html">Particles</a></li><li> <a href="index-x1-gradient.html">Gradient</a></li><li> <a href="index-x1-slider.html">Slider</a></li><li> <a href="index-x1-video.html">Video</a></li><li> <a href="index-x1-image.html">Image</a></li><li> <a href="index-x1-typing.html">Typing</a></li><li> <a href="index-x1-iphone7.html">iPhone7</a></li><li> <a href="index-x1-half-header.html">Half Header</a></li></ul><ul class="theme cookie_demo_list list-1"><li> <strong>Style 3</strong></li><li> <a href="index-x2.html">Default</a></li><li> <a href="index-x2-particles.html">Particles</a></li><li> <a href="index-x2-gradient.html">Gradient</a></li><li> <a href="index-x2-slider.html">Slider</a></li><li> <a href="index-x2-video.html">Video</a></li><li> <a href="index-x2-image.html">Image</a></li><li> <a href="index-x2-typing.html">Typing</a></li><li> <a href="index-x2-flat.html">Flat</a></li><li> <a href="index-x2-half-header.html">Half Header</a></li></ul><ul class="theme cookie_demo_list"><li> <strong>Style 4</strong></li><li> <a href="index-x3.html">Default</a></li><li> <a href="index-x3-particles.html">Particles</a></li><li> <a href="index-x3-gradient.html">Gradient</a></li><li> <a href="index-x3-slider.html">Slider</a></li><li> <a href="index-x3-video.html">Video</a></li><li> <a href="index-x3-image.html">Image</a></li><li> <a href="index-x3-typing.html">Typing</a></li><li> <a href="index-x3-flat.html">Flat</a></li><li> <a href="index-x3-half-header.html">Half Header</a></li></ul><ul class="theme cookie_demo_list list-1"><li> <strong>Style 5</strong></li><li> <a href="index-x4.html">Default</a></li><li> <a href="index-x4-particles.html">Particles</a></li><li> <a href="index-x4-gradient.html">Gradient</a></li><li> <a href="index-x4-slider.html">Slider</a></li><li> <a href="index-x4-video.html">Video</a></li><li> <a href="index-x4-image.html">Image</a></li><li> <a href="index-x4-typing.html">Typing</a></li><li> <a href="index-x4-flat.html">Flat</a></li><li> <a href="index-x4-half-header.html">Half Header</a></li></ul></div></div></div>');
    // End Demo

})(jQuery);

