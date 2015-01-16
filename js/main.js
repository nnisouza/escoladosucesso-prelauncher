$(document).ready(function() {
    var wrapper = $('.wrapper'),
        upper = $('.upper'),
        leftFX = $('.upper .leftFX'),
        rightFX = $('.upper .rightFX'),
        leftFX2 = $('.upper .leftFX2'),
        grayTape = $('.grayTape'),
        primalForm = $('#primalForm'),
        progress = $('.progress'),
        subscribe = $('.grayTape button#subscribe'),
        thanks = $('.thanks'),
        w = wrapper.width(),
        h = wrapper.height(),
        gh = grayTape.height();
        uh = h - gh;
    
    upper.height(uh);
    
    wrapper.fadeIn('medium');
    leftFX.removeClass('hidden');
    rightFX.removeClass('hidden');
    leftFX.addClass('fadeInUp animated');
    rightFX.addClass('fadeInRight animated');
    
    subscribe.click(secondStep);
    
    
    function secondStep() {
        wrapper.removeClass('firstStep');
        wrapper.addClass('secondStep');
        
        primalForm.addClass('fadeOutUp animated');
        leftFX.addClass('fadeOutDown');
        
        leftFX2.removeClass('hidden');
        leftFX2.addClass('fadeInLeft animated');
        
        progress.removeClass('hidden');
        progress.addClass('fadeInUp animated');
        
        
        thanks.addClass('show');
        setTimeout(function() {
            thanks.removeClass('show');
        }, 4000);
        setTimeout(function() {
            upper.height(uh);
        }, 600);
        
        $({countNum: 0}).animate({countNum: $('#incrementor').data('qtd')}, {
            duration: 2000,
            easing:'linear',
            step: function() {
                $('#incrementor').val(Math.floor(this.countNum));
                $('.theBar').width((Math.floor(this.countNum)  * 2) + '%');
            },
            complete: function() {
                $('#incrementor').val(this.countNum);
                $('.theBar').width((Math.floor(this.countNum)  * 2) + '%');
            }
        });    
        
        return false;
    }
});
