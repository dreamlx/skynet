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
				enabled: true
			},
			width: 940,
			height: 425,
			start: generatePages,
			pageLoaded: pageLoaded
		}
	);
});