(function($) {
    skel.breakpoints({
        xlarge: '(max-width: 1680px)',
        large:  '(max-width: 1280px)',
        medium: '(max-width: 980px)',
        small:  '(max-width: 736px)',
        xsmall: '(max-width: 480px)'
    });

    $(function() {
        var $window = $(window),
            $body = $('body'),
            $header = $('#header'),
            $footer = $('#footer');

        // Disable animations/transitions until the page has loaded.
        $body.addClass('is-loading');

        $window.on('load', function() {
            window.setTimeout(function() {
                $body.removeClass('is-loading');
            }, 100);
        });

        // Fix: Placeholder polyfill.
        $('form').placeholder();

        // Prioritize "important" elements on medium.
        skel.on('+medium -medium', function() {
            $.prioritize(
                '.important\\28 medium\\29',
                skel.breakpoint('medium').active
            );
        });

        // Header.
        $header.each(function() {
            var t = jQuery(this);
            var inner = t.find('.inner');
            var button = t.find('.button');

            // Add slide-out animation for the button click
            button.click(function(e) {
                e.preventDefault();
                
                // First shrink the circle
                inner.animate({
                    width: '6em',
                    height: '6em',
                    padding: '2em'
                }, 500);

                // Hide the content
                inner.find('.content').fadeOut(300);

                // Then slide up off the screen
                $header.animate({
                    top: '-100vh'
                }, 800, function() {
                    // After animation, hide the header
                    $header.css('display', 'none');
                    // Scroll to the first section
                    $('html, body').animate({
                        scrollTop: $('.about-me').offset().top
                    }, 500);
                });
            });
        });

        // Footer.
        $footer.each(function() {
            var t = jQuery(this),
                inner = t.find('.inner'),
                button = t.find('.info');

            button.click(function(e) {
                t.toggleClass('show');
                e.preventDefault();
            });
        });
    });
})(jQuery);
