
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
		ensureRibbonSlots(value.length);

		for (i=value.length-1;i>=0; i--) {
			spinRibbon( i, value.charAt(i), time);
		}
	}

	function spinRibbon(ribbonNum, character, time) {
		var ribbonName = '#'+selector.substring(1)+'_rib'+ribbonNum;

		if (character != $(ribbonName+'_char0').html()) {
			var sequence = generateSequence($(ribbonName+'_char0').html().charAt(0), character);
			for (var i = 0; i < sequence.length; i++) {
				changeChar(ribbonName, sequence.charAt(i), time);
			}
		}
	}

	function generateSequence(startChar, endChar) {
		var sequence = '';
		var digits = '0123456789';
		var lower = 'abcdefghijklmnopqrstuvwxyz';
		var upper = lower.toUpperCase();

		if (startChar == '') {
			startChar = ' ';
		}

		if (digits.indexOf(startChar) != -1) {
			sequence = digits.substr(digits.indexOf(startChar)+1);
		} else if (lower.indexOf(startChar) != -1) {
			sequence = lower.substr(lower.indexOf(startChar)+1);
		} else if (upper.indexOf(startChar) != -1) {
			sequence = upper.substr(upper.indexOf(startChar)+1);
		}

		if (digits.indexOf(endChar) != -1) {
			sequence = sequence.concat(digits);
		} else if (lower.indexOf(endChar) != -1) {
			sequence = sequence.concat(lower);
		} else if (upper.indexOf(endChar) != -1) {
			sequence = sequence.concat(upper);
		}
		sequence = sequence.substr(0, sequence.indexOf(endChar)) + endChar;

		return sequence;
	}

	function changeChar(ribbonName, character, time) {
		var charHeight = Number($('.'+charStyle).filter(':first').css('height').replace(/[^-\d\.]/g, ''));
		var borderHeight = Number($('.'+charStyle).filter(':first').css('border-width').replace(/[^-\d\.]/g, ''));
		charHeight += borderHeight*2;

		$(ribbonName).queue( function(id, value){ return function(){ 
				$(id).html(value); 
				$(this).dequeue(); 
				}}(ribbonName+'_char1', character));
		$(ribbonName).animate( { top: '-'+charHeight+'px'}, time, 'linear' );
		$(ribbonName).queue( function(id, value){ return function(){ 
				$(id).html(value); 
				$(this).dequeue(); 
				}}(ribbonName+'_char0', character));
		$(ribbonName).animate( { top: '0px'}, 0 );
	}

	function createFrame() {
		if ($(selector + ' .counterFrame').size() == 0) {
			$(selector).append('<div class="counterFrame" style="display: inline-block" id="frame"></div>');
		}
	}

	function ensureRibbonSlots(newWidth) {
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
