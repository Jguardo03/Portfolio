$(document).ready(function() {
    var sync1 = $("#sync1");
    var sync2 = $("#sync2");

    sync1.owlCarousel({
        items: 1,
        slideSpeed: 2000,
        nav: true, // Esto activa las flechitas < > de la imagen
        dots: false,
        loop: true,
        responsiveRefreshRate: 200,
        // Flechas personalizadas como en tu imagen
        navText: ['<span class="prev">‹</span>', '<span class="next">›</span>'], 
    }).on('changed.owl.carousel', syncPosition);

    sync2.on('initialized.owl.carousel', function() {
        sync2.find(".owl-item").eq(0).addClass("current");
    }).owlCarousel({
        items: 4, // Cuántas miniaturas ver abajo
        dots: false,
        nav: false,
        smartSpeed: 200,
        slideSpeed: 500,
        slideBy: 4,
        responsiveRefreshRate: 100
    }).on('changed.owl.carousel', syncPosition2);

    // Función para que se sigan el uno al otro
    function syncPosition(el) {
        var count = el.item.count - 1;
        var current = Math.round(el.item.index - (el.item.count / 2) - .5);
        if (current < 0) { current = count; }
        if (current > count) { current = 0; }
        sync2.find(".owl-item").removeClass("current").eq(current).addClass("current");
        var onscreen = sync2.find('.owl-item.active').length - 1;
        var start = sync2.find('.owl-item.active').first().index();
        var end = sync2.find('.owl-item.active').last().index();
        if (current > end) { sync2.trigger('to.owl.carousel', [current, 100, true]); }
        if (current < start) { sync2.trigger('to.owl.carousel', [current - onscreen, 100, true]); }
    }

    function syncPosition2(el) {
        if (typeof el.item !== 'undefined') {
            var number = el.item.index;
            sync1.trigger('to.owl.carousel', [number, 100, true]);
        }
    }

    sync2.on("click", ".owl-item", function(e) {
        e.preventDefault();
        var number = $(this).index();
        sync1.trigger('to.owl.carousel', [number, 300, true]);
    });
});