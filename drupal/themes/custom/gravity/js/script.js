/**
 * @file
 */

(function ($) {

    "use strict";

    // Add "search-block--drop" class to the body tag for the search form.
    $('.js-toggle__search').on('click', function(e){
        e.preventDefault();
        $('.search-block-form').toggleClass('search-block-form__show');
        $('.menu-main').removeClass('menu-main__show');
    });

    $('.js-toggle__menu').on('click', function(e){
        e.preventDefault();
        $('.menu-main').toggleClass('menu-main__show');
        $('.search-block-form').removeClass('search-block-form__show');
    });

    $(window).scroll(function() {
        if ($(this).scrollTop() > 1){
            $('.layout-container').addClass("sticky");
        }
        else{
            $('.layout-container').removeClass("sticky");
        }
    });

}(jQuery));