
function counter(selector) {

	return {
		spin : function(value, time) { spinCounter(value,time); return this; }
	}

	function spinCounter(value,time) {
			createRibbonSlots(value.length);
			createRibbons();
	}

	function createRibbonSlots(newWidth) {
		newWidth = Number(newWidth);
		var currWidth = $(selector + ' .counterRibbon').size();
		var widthDiff = newWidth - currWidth;

		if (widthDiff < 0) {
			var ltdig = newWidth-1;
			$(selector + ' .counterRibbon:gt(' + ltdig + ')').remove();
		} else {

			for(i=0;i<widthDiff;i++) {
				$(selector).append('<div class="counterRibbon" id="rib' + (currWidth+i) + '"></div>');
			}
		}

		$(selector).addClass('counterFrame');
	}

	function createRibbons() {
	}
}
