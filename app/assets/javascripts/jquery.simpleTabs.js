/*
*	Project: Simple Tabs
*	Version: 0.0.1
*	Description: As Simple as they get for building a tabbed interface
*	Author: R Sturim
*	License: The MIT License (MIT)
*/

;(function($, window, document, undefined) {
	"use strict";
	// defaults
	var pluginName = "simpleTabs";
	var defaults = {
		tabItemsSelector: ".tab-items > li",
		tabPanesSelector: ".tab-pane",
		cssClassOn: "active"
	};
	
	// plugin constructor
	function SimpleTabs(element, options) {
		this.element = element;
		this.$element = $(element);
		this.options = $.extend({}, defaults, options);
		this._defaults = defaults;
		this._name = pluginName;
		this.init();
	}

	// prototype
	SimpleTabs.prototype = {
		init: function() {
			// active css class name
			this.active = this.options.cssClassOn;
			
			// tabs and content panes as jQuery objects
			this.$tabItems = this.$element.find(this.options.tabItemsSelector);
			this.$contentPanes = this.$element.find(this.options.tabPanesSelector);
			
			// initialize tab events
			this.initTabItemEvents(this.$tabItems, this.$contentPanes, this.active);
		},

		initTabItemEvents: function($tabItems, $contentPanes, active) {
			$tabItems.first().addClass(active);
			$contentPanes.first().addClass(active);
			$tabItems.on('click', 'a', function(e) {
				var hashStr = this.hash;
				$tabItems.removeClass(active);
				var linkParent = $(this).parent();
				linkParent.addClass(active);
				$contentPanes.filter('.active').fadeOut(500,'easeInOutBack', function(){
					$contentPanes.removeClass(active);			
					$contentPanes.filter(hashStr).slideDown(1000,'easeOutBounce', function(){
						$contentPanes.filter(hashStr).addClass(active);		

					});
				});
				
				
				e.preventDefault();
			});
		}
	};
	// lightweight plugin wrapper around the constructor
	// (preventing against multiple instantiations)
	$.fn[pluginName] = function(options) {
		return this.each(function() {
			if (!$.data(this, "plugin_" + pluginName)) {
				$.data(this, "plugin_" + pluginName, new SimpleTabs(this, options));
			}
		});
	};
})(jQuery, window, document);
