//  Объявление слайдера block.slider()
//  Слайды должны быть вложены в slider_content
//  Управление
//      вложенные в слайдер кнопки с классами *--next, *prev
//      вложеный в слайдер indicators>indicators__item*n
(($) => {
    $(document).ready(() =>{
        let slider;
        let content;
        let indicators;
        let sliderCount;
        let timer;
        let btnNext;
        $.fn.slider = function() {
            slider = $(this);
            content = $(slider.find("[class*='__content']")[0]);
            btnNext = $(slider.find("[class*='--next']")[0]);
            btnPrev = $(slider.find("[class*='--prev']")[0]);
            indicators = slider.find("indicators");
            sliderCount = content.children().length;
            content.width(`${sliderCount * 100 + 1}%`);
            slider.slideTo(slider.data("slide"));
            
            btnNext.on("click",(event) => {slider.next(); event.preventDefault();});
            btnPrev.on("click",(event) =>{slider.prev();event.preventDefault();});
            slider.find(".indicators__item").on("click", function(){slider.slideTo($(this).data("slide-to"));});
            timer = setInterval(() => { slider.next() }, 5000);
            [btnNext,btnPrev,content,indicators].forEach( el => $(el).hover(() => {clearInterval(timer);}).mouseleave(() => {timer = setInterval(() => { slider.next() }, 5000);}));
        }
        $.fn.slideTo = (index) =>
        {
            slider.attr("data-slide",index);
            slider.data("slide",index);
            content.animate({'margin-left': `${-index * 100}%`}, 300);
            slider.find('.slide.active, .indicators__item.active').removeClass("active");
            slider.find(`.slide:eq(${index}), .indicators__item:eq(${index})`).addClass("active");
            return 1;
        }
        $.fn.prev = () =>
        {
            slider.data("slide") > 0 && slider.slideTo(slider.data("slide") - 1) || slider.slideTo(sliderCount-1);
        }
        $.fn.next = () =>
        {
            (slider.data("slide") + 1 < sliderCount && slider.slideTo(slider.data("slide") + 1)) || slider.slideTo(0);
        }
        
    });
})(require('jquery'));