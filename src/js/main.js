require("./slider");
require("../styles/main.scss");


(($) => {
    $(document).ready( () => {
        // Dom`s
        let menu = $("#navigation");
        let menu_link;
        let menuPos = menu.offset().top;
        menu_link = (menu.find("[href^='#']")
        .map((i, el) => {return $(el).attr("href");})
        .get()
        .filter((el) => el.length > 1));

        // Listener`s
        $(window).scroll(() => {
            ($(window).scrollTop() >= menuPos) && menu.addClass("navigation--sticky") || menu.removeClass("navigation--sticky");
            menu_link.forEach( el => {inWindow($(el))});
        });
        $("[href^='#']").on("click", (event) => {
            let href = $(event.target).attr("href");
            href.length > 1 && $("html, body").animate({ scrollTop: $(href).offset().top - menu.height()}, 1000) && event.preventDefault();
        });
        function inWindow (element){
            if ($(document).scrollTop() + $(window).height() / 2. >= element.offset().top && $(document).scrollTop() + $(window).height() / 2. <= element.offset().top + element.height())
                menu.find(`[href='#${element.attr('id')}']`).addClass('active');
            else
                menu.find(`[href='#${element.attr('id')}']`).removeClass('active');
        }
        $("[data-hover-text]").hover(function(event){
            if (event.originalEvent.sourceCapabilities.firesTouchEvents)
                    return;
            let oldText = $(this).html();
            $(this).html($(this).attr("data-hover-text"));
            $(this).attr("data-hover-text", oldText);
        });
        // Init
        $(".slider").slider();
        $(window).trigger("scroll");
    });
})(require("jquery"));