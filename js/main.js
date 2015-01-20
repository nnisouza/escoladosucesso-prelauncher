$(window).load(function() {
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
    
    if (h < 768) {
//        grayTape.css('position', 'relative');
        upper.height(uh);
        wrapper.fadeIn('medium');
        leftFX.removeClass('hidden');
        rightFX.removeClass('hidden');
        leftFX.addClass('fadeInLeft animated');
        rightFX.addClass('fadeInRight animated');
        
    } else {
        
        wrapper.fadeIn('medium');
        leftFX.removeClass('hidden');
        rightFX.removeClass('hidden');
        leftFX.addClass('fadeInUp animated');
        rightFX.addClass('fadeInRight animated');

    }
    
    subscribe.click(verifyEmail);
    
    function verifyEmail() {
        var email = $("#fsMail").val();
  		if(email == '') {
			$("#alertForm").html('Digite o seu email para continuar');
			$("#alertForm").css("color", "#d31515");
			$("#fsMail").select();
            
            //Evita a requisição AJAX caso o email não for inserido
			return false;
  		} else {
			var atpos		= email.indexOf("@");
			var dotpos		= email.lastIndexOf(".");
			if(atpos<1 || dotpos<atpos+2 || dotpos+2>=email.length) {
				$("#alertForm").html('Por favor, insira um E-mail válido.');
				$("#alertForm").css("color", "#d31515");
				$("#fsMail").select();
                
                //Evita a requisição AJAX caso o email inserido não for válido
				return false;
			}				
  		}
        
        var dataString = '&email=' + email;
		
		subscribe.addClass('sending');
		subscribe.attr('disabled','disabled');		
        
		$.ajax({  
			type: "POST",  
                //Cria esse arquivo PHP conforme tu preferir só precisa conter os RETURNS conforme utilizados abaixo
				url: "registerEmail.php",  
				data: dataString,  
				success: function() {
					secondStep();
				},
				error: function(){
                    $("#alertForm").html('Houve um erro tremendo D:');
                    $("#alertForm").css("color", "#ff0000");
                    secondStep();
				}
		});
        
        //Evita o carregamento da página ao enviar o Email para o PHP
        return false;
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
});
