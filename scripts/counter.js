
function counter(selector) {
	var charStyle = 'defaultStyle';

	createFrame();

	return {
		spin : function(value, time) { spinCounter(value,time); return this; },
		style : function(style) { charStyle = style; return this; },
		center : function() { 
			$(selector + ' .counterFrame').css('margin-left','auto').css('margin-right','auto'); 
			$(selector).css('text-align','center');
			return this; }
	}

	function spinCounter(value,time) {
		createRibbonSlots(value.length);
		createRibbons();
	}

	function createFrame() {
		if ($(selector + ' .counterFrame').size() == 0) {
			$(selector).append('<div class="counterFrame" style="display: inline-block" id="frame"></div>');
		}
	}

	function createRibbonSlots(newWidth) {
		newWidth = Number(newWidth);
		var currWidth = $(selector + ' .counterRibbon').size();
		var widthDiff = newWidth - currWidth;

		if (widthDiff < 0) {
			var ltdig = newWidth-1;
			$(selector + ' .counterRibbon:gt(' + ltdig + ')').remove();
		} else {

			for(var i=0;i<widthDiff;i++) {
				$(selector+' .counterFrame').append('<div class="counterRibbon" id="rib' + (currWidth+i) + '"></div>');
			}
		}

	}

	function createRibbons() {

		$(selector + ' .counterRibbon').each( function() {
			currHeight = $('#' + this.id + ' .counter').size();
			for(var i=currHeight;i<5;i++) {
				$(this).append('<div><div class="' + charStyle + ' counter vertCenter" id="char' + i + '">'+i+'</div></div>');
			}

		});

		var charHeight = Number($('.'+charStyle).filter(':first').css('height').replace(/[^-\d\.]/g, ''));
		$(selector+' .counterFrame').css('height', charHeight);
	}
}
