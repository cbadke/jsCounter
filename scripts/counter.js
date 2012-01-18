
function counter(selector) {
	var charStyle = '';

	return {
		spin : function(value, time) { spinCounter(value,time); return this; },
		style : function(style) { charStyle = style; return this; }
	}

	function spinCounter(value,time) {
			createFrame();
			createRibbonSlots(value.length);
			createRibbons();
	}

	function createFrame() {
		$(selector).append('<div style="float:left;" id="leftFiller"></div><div class="counterFrame" id="frame"></div><div class="horizFill" id="rightFiller"></div>');
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
			for(var i=0;i<5;i++) {
				$(this).append('<div><div class="' + charStyle + ' counter vertCenter" id="char' + i + '"></div></div>');
			}

			var charHeight = Number($('.'+charStyle).filter(':first').css('height').replace(/[^-\d\.]/g, ''));
			$(selector+' .counterFrame').css('height', charHeight);
		});
	}
}
