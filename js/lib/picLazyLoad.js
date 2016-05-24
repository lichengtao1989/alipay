(function(a) {
    a.fn.picLazyLoad = function(b) {
        function c() {
            d.each(function() {
                var c, d = a(this);
                d.is("img") ? d.attr("data-original") && (c = d.offset().top, c - b.threshold <= f + e && (d.attr("src", d.attr("data-original")), d.removeAttr("data-original"))) : d.attr("data-original") && ("none" == d.css("background-image") && d.css("background-image", "url(" + b.placeholder + ")"), c = d.offset().top, c - b.threshold <= f + e && (d.css("background-image", "url(" + d.attr("data-original") + ")"), d.removeAttr("data-original")))
            })
        }
        var d = a(this),
            e = 0,
            f = a(window).height();
        b = a.extend({
            threshold: 0,
            placeholder: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsQAAA7EAZUrDhsAAAANSURBVBhXYzh8+PB/AAffA0nNPuCLAAAAAElFTkSuQmCC"
        }, b || {}), c(), a(window).on("scroll", function() {
            e = a(window).scrollTop(), c()
        })
    }
}(Zepto));
