
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

		var charHeight = Number($('.'+charStyle).filter(':first').css('height').replace(/[^-\d\.]/g, ''));
		var borderHeight = Number($('.'+charStyle).filter(':first').css('border-width').replace(/[^-\d\.]/g, ''));
		charHeight += borderHeight*2;

		for (i=value.length-1;i>=0; i--) {
			var newChar=value.charAt(i);
			var ribbonName = '#'+selector.substring(1)+'_rib'+i;

			if (newChar != $(ribbonName+'_char0').html()) {
				$(ribbonName+'_char1').html(newChar);
				$(ribbonName).animate( { top: '-'+charHeight+'px'}, time, 'linear' );
				$(ribbonName).queue( function(id, value){ return function(){ 
					$(id).html(value); 
					$(this).dequeue(); 
					}}(ribbonName+'_char0', newChar));
				$(ribbonName).animate( { top: '0px'}, 0, 'linear' );
			}
		}
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
				$(selector+' .counterFrame').append('<div class="counterRibbon" value=" " id="'+selector.substring(1)+'_rib' + (currWidth+i) + '"></div>');
			}
		}

		createRibbons();
	}

	function createRibbons() {

		var j = 0;
		$(selector + ' .counterRibbon').each( function() {
			currHeight = $('#' + this.id + ' .counter').size();
			for(var i=currHeight;i<5;i++) {
				$(this).append('<div><div class="' + charStyle + ' counter vertCenter" id="'+selector.substring(1)+'_rib'+j+'_char' + i + '"></div></div>');
			}

			j++;
		});

		var charHeight = Number($('.'+charStyle).filter(':first').css('height').replace(/[^-\d\.]/g, ''));
		var borderHeight = Number($('.'+charStyle).filter(':first').css('border-width').replace(/[^-\d\.]/g, ''));
		charHeight += borderHeight*2;
		$(selector+' .counterFrame').css('height', charHeight);
	}
}
