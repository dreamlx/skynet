$(function(){

	function generatePages()
	{
		var _total, i, _link;
		
		_total = $( "#mainCarousel" ).rcarousel( "getTotalPages" );
		
		for ( i = 0; i < _total; i++ ) {
			_link = $( "<a href='#'></a>" );
			
			$(_link)
				.bind("click", {page: i},
					function( event ) {
						$( "#mainCarousel" ).rcarousel( "goToPage", event.data.page );
						event.preventDefault();
					}
				)
				.addClass( "bullet off" )
				.appendTo( "#carouselPages" );
		}
		
		// mark first page as active
		$( "a:eq(0)", "#carouselPages" )
			.removeClass( "off" )
			.addClass( "on" )

	}

	function pageLoaded( event, data ) 
	{
		$( "a.on", "#carouselPages" )
			.removeClass( "on" )

		$( "a", "#carouselPages" )
			.eq( data.page )
			.addClass( "on" )
	}
	
	$("#mainCarousel").rcarousel(
		{
			visible: 1,
			step: 1,
			speed: 700,
			auto: {
				enabled: false
			},
			width: 940,
			height: 425,
			start: generatePages,
			pageLoaded: pageLoaded
		}
	);
	/*$("#consult_form").submit(function(e){

		console.log('!!!');
		
		e.preventDefault();
	})*/
	var validator = new FormValidator('consult_form', [{
	    name: 'consult[name]',
	    display: 'required',    
	    rules: 'required|max_length[10]'
	}, {
	    name: 'consult[email]',
	    rules: 'required|valid_email'
	}, {
	    name: 'consult[phone]',
	    rules: 'required|max_length[11]'
	}], function(errors) {
	    if (errors.length > 0) {
			console.info(errors);
			$('#consult_form input').removeClass('error');
			$('.formerrspan').remove();
			for(var err in errors)
			{
				var input = $("#"+errors[err].id);
				input.attr('value','').addClass('error').after('<span class=formerrspan>'+errors[err].message+'</span>');
			}
	    }
	});
	validator.setMessage('required','请填必填项！');
	validator.setMessage('max_length','字符长度过长！');
	validator.setMessage('valid_email','邮箱格式错误！');

});
