var master = {window: {el: null, width: null, height: null}},
    wrapper = $('.wrapper'),
    upper = $('.upper'),
    leftFX = $('.upper .leftFX'),
    rightFX = $('.upper .rightFX'),
    leftFX2 = $('.upper .leftFX2'),
    grayTape = $('.grayTape'),
    primalForm = $('#primalForm'),
    placeCode = $('#placeCodeHere'),
    progress = $('.progress'),
    incrementor = $('#incrementor'),
    subscribe = $('.grayTape button#subscribe'),
    thanks = $('.thanks'),
    w = wrapper.width(),
    h = wrapper.height(),
    gh = grayTape.height();
    uh = h - gh;

function calc() {
    master.window.height = $(window).height();
    $medida = master.window.height - 200;
    upper.height($medida);
}
function introPage() {
    wrapper.fadeIn('medium');
    leftFX.removeClass('hidden');
    rightFX.removeClass('hidden');
    leftFX.addClass('fadeInUp animated');
    rightFX.addClass('fadeInRight animated');
}
function drawPage() {
    calc();
    introPage();
}

function verifyEmail() {
    var email = $("#fsMail").val();
    if(email == '') {
        $("#alertForm").html('Digite o seu email para continuar');
        $("#alertForm").css("color", "#d31515");
        $("#fsMail").select();
        return false;
    } else {
        var atpos		= email.indexOf("@");
        var dotpos		= email.lastIndexOf(".");
        if(atpos<1 || dotpos<atpos+2 || dotpos+2>=email.length) {
            $("#alertForm").html('Por favor, insira um E-mail válido.');
            $("#alertForm").css("color", "#d31515");
            $("#fsMail").select();
            return false;
        }				
    }

    var dataString = '&email=' + email;

    subscribe.addClass('sending');
    subscribe.attr('disabled','disabled');		

    $.ajax({  
        type: "POST",  
            url: "registerEmail.php",  
            data: dataString,  
            success: function() {
                setItUp();
            },
            error: function(){
                $("#alertForm").html('Houve um erro tremendo D:');
                $("#alertForm").css("color", "#ff0000");
            }
    });
    return false;
}

function setItUp() {
    $.getJSON( 'registerEmail.php', function( json ) {
        var info = json[0];
        
        window.history.pushState('Object', 'Escola do Sucesso', info.url);
        placeCode.val(window.location.href);
        incrementor.data('qtd', info.subscribers)
        
        secondStep();
    })
    .fail(function(){
        alert('deu ruim');
    });
}
function secondStep() {
    //Transições de entreada do conteúdo no segundo passo
    wrapper.removeClass('firstStep');
    wrapper.addClass('secondStep');

    primalForm.addClass('fadeOutUp animated');
    leftFX.addClass('fadeOutDown');

    leftFX2.removeClass('hidden');
    leftFX2.addClass('fadeInLeft animated');

    progress.removeClass('hidden');
    progress.addClass('fadeInUp animated');

    //Exibe/oculta barra de agradecimento no topo
    thanks.addClass('show');
    setTimeout(function() {
        thanks.removeClass('show');
    }, 4000);
    
    placeCode.select();

    //Contador de emails cadastrados
    $({countNum: 0}).animate({countNum: $('#incrementor').data('qtd')}, {
        duration: 3000,
        easing:'linear',
        step: function() {
            $('#incrementor').text(Math.floor(this.countNum));
            $('.theBar').width($('#incrementor').data('qtd') * 2 + '%');
        },
        complete: function() {
            $('#incrementor').text(this.countNum);
        }
    });    
    //Evita o carregamento da página ao enviar o Email para o PHP
    return false;
}

function action() {
    subscribe.click(verifyEmail);
}

$(window).load(drawPage);
$(document).ready(action);
$(window).resize(calc).trigger('resize');