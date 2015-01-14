$(document).ready(function() {
    var wrapper = $('.wrapper'),
        primalForm = $('#primalForm'),
        progress = $('.progress'),
        subscribe = $('.grayTape button#subscribe'),
        thanks = $('.thanks'),
        w = wrapper.width(),
        h = wrapper.height();
    
    wrapper.fadeIn('medium');
    subscribe.click(secondStep);
    
    
    function secondStep() {
        wrapper.removeClass('firstStep');
        wrapper.addClass('secondStep');
        
        primalForm.addClass('fadeOutUp animated');
        
        progress.removeClass('hidden');
        progress.addClass('fadeInUp animated');
        
        thanks.addClass('show');
        setTimeout(function() {
            thanks.removeClass('show');
        }, 4000);
        
        return false;
    }
});
