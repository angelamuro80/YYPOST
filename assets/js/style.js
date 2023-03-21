$(document).ready(function(){
	jaAllReset();
});

$(window).resize(function(){
	//jsLnbResiz();// lnb 리사이징 위치값
	fullHeight(); // 전체화면 높이값
	slideMenu(); // 슬라이드 메뉴
	layerFullPop(); // 전체팝업
});

$(window).scroll(function(){
	//jaAllScroll();

	// 스크롤 유도 버튼 이벤트
	var scrT = $(window).scrollTop();

	if(scrT == $(document).height() - $(window).height()) {
		$('.scroll_induce').hide();   
	} else {
		$('.scroll_induce').show();   
	}
});


/* 전체 함수 호출 */
function jaAllReset(){
	jsAccrodion();//아코디언
	//jsTab();//탭메뉴
	jsRangeSlider();//레인지 슬라이더
	fullHeight(); // 전체화면 높이값
	layerFullPop(); // 전체팝업
	layerSlidePop(); // 슬라이드 팝업
	toolTipPop(); // 툴팁 팝업
	centerPop(); // 센터 팝업
	checkBoxLine(); // 체크박스 선택 시 전체영역 라인 활성화
	slideMenu(); // 슬라이드 메뉴
	selected(); // 상세 주소 선택
	topInfoTitleSlide(); // 안내화면 타이틀 슬라이드
	listMore(); // 확인 리스트 더보기	
	scrollTopBtn(); // 상단으로 이동 버튼
	//detailListToggle(); // 상세 리스트 토글

	
	/* 폼요소 */
	jsInput();//텍스트 입력기(input)
	jsChk();//라디오, 체크박스

	jsFormFocus();// 폼 요소 포커스

	// 상단 타이틀 sticky : 제일 마지막에 호출
	stickyWrap(); 
}

/* 텍스트 입력기(input) */
function jsInput(){
	$('.jsInput').each(function(){
		var $this = $(this);

		//삭제버튼 생성
		if(!$(this).parent().hasClass('js_textFiled')){
			var wid = $this.outerWidth();

			if($(this).hasClass('width_100') || $(this).closest('div').hasClass('form_area')){
				$(this).wrap('<span class="js_textFiled"></span>');
			}else{
				$(this).wrap('<span class="js_textFiled" style="width:100%;"></span>');
			}

			$(this).after('<button type="button" class="btn_del">내용 삭제</button>');
			
		}

		if($(this).attr('unit')){
			var unit = $(this).attr('unit');

			$(this).closest('.js_textFiled').addClass('js_unit');
			$(this).closest('.js_textFiled').append('<span class="unit">' + unit + '</span>');

			var wid = $(this).closest('.js_textFiled').find('.unit').outerWidth();

			$(this).closest('.js_textFiled').css('padding-right', wid);
			$(this).closest('.js_textFiled').find('.btn_del').css('right', wid);
		}

		var $btnDel = $this.next('.btn_del');

		//인풋박스 포커스
		$(this).off('focus');
		$(this).on('focus', function(){
			var len = $(this).val().length;

			$('.js_textFiled').removeClass('focus').find('.btn_del').hide();

			if(len > 0){
				$btnDel.show();
			}

			$(this).closest('.js_textFiled').addClass('focus');
		});

		$(document).off('click', '.js_textFiled');
		$(document).on('click', '.js_textFiled', function(){
			$(this).find('input').focus();
		});

		$(this).off('keyup');
		$(this).on('keyup', function(){
			var len = $(this).val().length;

			if(len > 0){
				$btnDel.show();
			}else{
				$btnDel.hide();
			}
		});

		//인풋박스 블러
		$this.off('blur');
		$this.on('blur', function(){
			if(!$btnDel.is(':visible')){
				$(this).closest('.js_textFiled').removeClass('focus');
			}
		});

		//삭제버튼 블러
		$btnDel.off('blur');
		$btnDel.on('blur', function(){
			$(this).closest('.js_textFiled').removeClass('focus');
			$(this).hide();
		});

		$btnDel.off('click');
		$btnDel.on('click', function(){
			$this.focus().val('');
			$(this).hide();
		});

		//다른영역 클릭시 버튼 숨기기
		$(document).on('mouseup', function(e){
			var $input = $this.closest('.js_textFiled');

			if(!$input.is(e.target) && $input.has(e.target).length === 0){
				$input.removeClass('focus');
				$btnDel.hide();
			}
		});

		if($this.hasClass('error')) {
			$this.closest('.js_textFiled').css('border', '1px solid #E41913');
		}
	});
}

/* 라디오, 체크박스 */
function jsChk(){
	$('.jsChk').each(function(){
		if(!$(this).parent().hasClass('js_checkbox')){
			$(this).wrap('<span class="js_checkbox"></span>');

			$(this).closest('.js_checkbox').append('<span class="checkbox"></span>');
		}
	});
}

/* 폼 요소 포커스 */
function jsFormFocus(){
	var $form = '.form_area.type2 .js_selectbox button, .form_area.type2 input, .form_area.type2 .calendar_box button';

	$(document).off('focus', $form);
	$(document).on('focus', $form, function(){
		$(this).closest('.form_area').addClass('focus');
	});

	$(document).off('blur', $form);
	$(document).on('blur', $form, function(){
		$(this).closest('.form_area').removeClass('focus');
	});
}

/* 아코디언 */
function jsAccrodion(){
	var spd = 200;//열기/닫기 속도

	$('.accordion').each(function(){
		if($(this).hasClass('active')){
			$(this).find('.accordion_btn').text('닫기').attr('aria-expanded', 'true');
			$(this).find('.accordion_cont').show().attr('aria-hidden', 'false');
		}else{
			$(this).find('.accordion_btn').text('열기').attr('aria-expanded', 'false');
			$(this).find('.accordion_cont').hide().attr('aria-hidden', 'true');
		}
	});

	//클릭
	$(document).off('click', '.accordion_btn');
	$(document).on('click', '.accordion_btn', function(){
		var $acc = $(this).closest('.accordion');

		if($acc.hasClass('active')){
			$(this).text('열기').attr('aria-expanded', 'false');
			$acc.removeClass('active').find('.accordion_cont').slideUp(spd).attr('aria-hidden', 'true');;
		}else{
			$(this).text('닫기').attr('aria-expanded', 'true');
			$acc.addClass('active').find('.accordion_cont').slideDown(spd).attr('aria-hidden', 'false');;
		}
	});
}

/* 탭메뉴 */

/* function jsTab(){
	var $jsTabWrap = $('.jsTabWrap');
	var $jsTabList = $jsTabWrap.find('.siide_tab_item');
	var $jsTabBtn = $jsTabWrap.find('.slide_btn');


		$(this).find('.jsTabItem .tab_btn').removeAttr('title');
		$(this).find('.jsTabItem.active .tab_btn').attr('title', '선택됨');

		var len = $(this).find('.jsTabItem').length;
		var wid = 100/len;

		// $(this).find('.jsTabItem').css('width', wid + '%');

		var idx = $(this).find('.jsTabItem.active').index();

		$(this).append('<div class="activeBar"></div>');
		$(this).find('.activeBar').css({
			'left':(wid * idx) + '%',
			'width':wid + '%'
		});
	});

	//mouseenter
	$(document).off('mouseenter', '.jsTabItem');
	$(document).on('mouseenter', '.jsTabItem', function(){
		var len = $(this).closest('.tab_menu').find('.jsTabItem').length;
		var wid = 100/len;
		var idx = $(this).index();

		$(this).closest('.tab_menu').find('.activeBar').css({'left':(wid * idx) + '%'});
	});

	$(document).off('mouseleave', '.tab_menu');
	$(document).on('mouseleave', '.tab_menu', function(){
		var len = $(this).find('.jsTabItem').length;
		var wid = 100/len;
		var idx = $(this).find('.jsTabItem.active').index();

		$(this).closest('.tab_menu').find('.activeBar').css({'left':(wid * idx) + '%'});
	});

	//click
	$(document).off('click', '.jsTab .tab_btn');
	$(document).on('click', '.jsTab .tab_btn', function(){
		var idx = $(this).closest('.jsTabItem').index();

		$(this).attr('title', '선택됨').closest('.jsTabItem').addClass('active').siblings('.jsTabItem').removeClass('active').find('.tab_btn').removeAttr('title');

		$(this).closest('.tab_wrap').find('> .tab_conts > .jsTabCont').removeClass('active').hide().eq(idx).fadeIn(200, function(){
			$(this).addClass('active');
		});
	});
} */

/* 레인지 슬라이더 */
function jsRangeSlider(){
	$('.range_slider_area').each(function(){
		var numS = $(this).find('.range_turm .start').text();
		var numE = $(this).find('.range_turm .end').text();
		var unit = numS.replace(/[0-9]/g, '');
		var start = Number(numS.replace(/[^0-9]/g, ''));
		var end = Number(numE.replace(/[^0-9]/g, ''));
		var now = Number($(this).find('.range_turm .value').text());
		var next = Number($(this).find('.range_turm .next').text());
		var turm = Number($(this).find('.range_turm .step').text());

		if($(this).hasClass('division')){
			//구분 슬라이더
			$(this).find('.range_slider').slider({
				range: true,
				min: start,
				max: end,
				step: turm,
				values: [now, next],
				create: function() {
					val1 = $(this).slider('values', 0);
					val2 = $(this).slider('values', 1);
				},
				slide: function(event, ui){
					//console.log(ui.value);
					$(this).find('.ui-slider-handle .now_val').text(ui.values[0] + unit);
					$(this).find('.ui-slider-handle + .ui-slider-handle .now_val').text(ui.values[1] + unit);

					jsHendle();//슬라이더 핸들 위치값
				},
				stop: function( event, ui ) {
					jsHendle();//슬라이더 핸들 위치값
				}
			});

			$(this).find('.ui-slider-handle .now_val').remove();
			$(this).find('.ui-slider-handle').append('<em class="now_val">' + (val1 + unit) + '</em>');
			$(this).find('.ui-slider-handle + .ui-slider-handle .now_val').text(val2 + unit);
		}else{
			//연속 슬라이더
			$(this).find('.range_slider').slider({
				range: 'min',
				min: start,
				max: end,
				step: turm,
				value: now,
				create: function() {
					//console.log($(this).slider('value'));
					$(this).closest('.range_slider_area').attr('data-value', now);

					jsHendle();//슬라이더 핸들 위치값
					jsSliderBtn();//버튼 비활성
				},
				slide: function(event, ui){
					//console.log(ui.value);
					$(this).find('.ui-slider-handle .now_val').text(ui.value + unit);
					$(this).closest('.range_slider_area').attr('data-value', ui.value);

					jsHendle();//슬라이더 핸들 위치값
					jsSliderBtn();//버튼 비활성
				},
				stop: function( event, ui ) {
					jsHendle();//슬라이더 핸들 위치값
					jsSliderBtn();//버튼 비활성
				}
			});

			$(this).find('.ui-slider-handle .now_val').remove();
			$(this).find('.ui-slider-handle').append('<em class="now_val">' + (now + unit) + '</em>');
		}

		jsHendle();//슬라이더 핸들 위치값
		jsSliderBtn();//버튼 비활성

		/* 증가, 김소 버튼 클릭 */
		$(this).find('.slider_btn').off('click');
		$(this).find('.slider_btn').on('click', function(){
			var vlu = Number($(this).closest('.range_slider_area').attr('data-value'));

			if($(this).closest('.range_slider_area').hasClass('plus_minus')){
				//증가, 김소 버튼
				if($(this).hasClass('btn_minus')){
					//감소
					if(vlu > start){
						$(this).closest('.range_slider_area').find('.data_group .value').text(vlu - turm);
						$(this).closest('.range_slider_area').attr('data-value', vlu - turm);
					}
				}else{
					//증가
					if(vlu < end){
						$(this).closest('.range_slider_area').find('.data_group .value').text(vlu + turm);
						$(this).closest('.range_slider_area').attr('data-value', vlu + turm);
					}
				}
			}else if($(this).closest('.range_slider_area').hasClass('plus_turm')){
				//단위별 증가 버튼
				var btnTxt = $(this).text();
				var btnTurm = Number(btnTxt.replace(/[^0-9]/g, ''));

				if(vlu + btnTurm <= end){
					$(this).closest('.range_slider_area').find('.data_group .value').text(vlu + btnTurm);
					$(this).closest('.range_slider_area').attr('data-value', vlu + btnTurm);
				}else{
					$(this).closest('.range_slider_area').find('.data_group .value').text(end);
					$(this).closest('.range_slider_area').attr('data-value', end);
				}
			}

			jsRangeSlider();
			jsHendle();
			jsSliderBtn();
		});

		//슬라이더 핸들 위치값
		function jsHendle(){
			$('.range_slider_area .ui-slider-handle').each(function(){
				var hdW = $(this).outerWidth();
				var valW = $(this).find('.now_val').outerWidth();
				var turn = (valW - hdW) / 2;
				var left = $(this).position().left;
				var max = left + hdW + turn;
				var boxW = $(this).closest('.range_slider_area').find('.range_slider').outerWidth() + hdW;

				if(turn > left){
					$(this).find('.now_val').css('margin', '0 0 0 ' + (turn - left) + 'px');
				}else if(boxW < max){
					$(this).find('.now_val').css('margin', '0 0 0 -' + (max - boxW) + 'px');
					
				}else{
					$(this).find('.now_val').removeAttr('style');
				}
			});
		}

		//버튼 비활성
		function jsSliderBtn(){
			$('.range_slider_area').each(function(){
				var vlu = $(this).attr('data-value');

				if($(this).hasClass('plus_minus')){
					//증가, 김소 버튼
					if(vlu <= start){
						$(this).find('.btn_minus').prop('disabled', true);
					}else if(vlu >= end){
						$(this).find('.btn_plus').prop('disabled', true);
					}else{
						$(this).find('.slider_btn').prop('disabled', false);
					}
				}else if($(this).hasClass('plus_turm')){
					//단위별 증가 버튼
					if(vlu >= end){
						$(this).find('.slider_btn').prop('disabled', true);
					}else{
						$(this).find('.slider_btn').prop('disabled', false);
					}
				}
			});
		}
	});
}

/* 전체팝업 */
function layerFullPop() {	
	var $wh = $(window).height();
	var $openBtn = $('.open_layer_pop'); // 팝업 열기 버튼
	var $fullPopWrap = $('.full_popup_wrap');
	var $popCont = $fullPopWrap.find('.pop_content');
	var $popInner = $fullPopWrap.find('.pop_inner');
	var $closeBtn = $fullPopWrap.find('.icon_close');

	var $popContainer = $('.pop_container').outerHeight();
	var $headerH = $fullPopWrap.find('.pop_header').outerHeight();
	var $footerH = $fullPopWrap.find('.pop_footer').outerHeight();
	
	//$popCont.css({'height' : ($wh - $headerH - $footerH)});

	$popCont.css({'padding-top' : $headerH});

	$openBtn.each(function (){
		$(this).on('click', function (){
			var $this = $(this);
			$fullPopWrap.find('.pop_container').attr({'tabindex' : '0', 'aria-hidden' : 'false'}).show().focus();
			$fullPopWrap.prepend('<div class="tabIdx prev" tabindex="0"></div>').append('<div class="tabIdx next" tabindex="0"></div>');
			$('#wrapper').attr({'tabindex' : '-1', 'aria-hidden' : 'true'});
			$("html, body").css({'overflow' : 'hidden', 'height' : '100%'});
			$("html, body").on("scroll, touchmove, mousewheel", function (e) {  // 앱 - 터치무브와 마우스휠 스크롤 방지
				e.preventDefault();
				e.stopPropagation();
			});

			$closeBtn.on('click', function (){
				$fullPopWrap.find('.pop_container').removeAttr('tabindex').attr('aria-hidden', 'true').hide();
				$fullPopWrap.find('.tabIdx').remove();
				$('#wrapper').removeAttr('tabindex').attr('aria-hidden', 'false');
				$("html, body").css({'overflow' : 'auto', 'height' : 'auto'}); // 레이어팝업 닫았을 때 html, body의 scroll 가능
				$("html, body").off("scroll, touchmove, mousewheel"); // 앱, 모바일 터치무브 및 마우스 휠 스크롤 가능
				$this.focus();
			});
		})
		
		$(document).off('focus', '.tabIdx');
		$(document).on('focus', '.tabIdx', function(){
			if($(this).hasClass('preve')){
				$(this).closest('.full_popup_wrap').find('.pop_container').focus();
			}else{
				$(this).closest('.full_popup_wrap').find('.pop_container').focus();
			}
		});
		
	});
}

/* 슬라이드 팝업 */
function layerSlidePop() {
	var $slidePopBtn = $('.pop_btn');

	$slidePopBtn.each( function (){	
		$(this).on('click', function (){
			var $this = $(this);
			var $slidePopWrap = $('.slide_popup_wrap'); // 슬라이드 팝업
			var $slidePopCont = $('.slide_popup_wrap').find('.slide_pop_container');
			var $slideCloseBtn = $('.slide_popup_wrap').find('.icon_close');	
			var $dim = $('.slide_popup_wrap').find('.dim');
			
			function popClose() {
				//슬라이드 팝업
				$slidePopWrap.removeClass('slide_pop_open');
				$slidePopWrap.find($slidePopCont).removeAttr('tabindex').attr('aria-hidden', 'true');	
				$slidePopWrap.find('.tabIdx').remove();

				// 공통
				$("html, body").css({'overflow' : 'auto', 'height' : 'auto'}); // 레이어팝업 닫았을 때 html, body의 scroll 가능
				$("html, body").off("scroll, touchmove, mousewheel"); // 앱, 모바일 터치무브 및 마우스 휠 스크롤 가능			
				$dim.hide();
				$this.focus();
				$('#wrapper').removeAttr('tabindex').attr('aria-hidden', 'false');
				
			}

			//슬라이드 팝업
			$slidePopWrap.addClass('slide_pop_open').find($slidePopCont).attr({'tabindex' : '0', 'aria-hidden' : 'false'}).focus();
			$slidePopWrap.prepend('<div class="tabIdx prev" tabindex="0"></div>').append('<div class="tabIdx next" tabindex="0"></div>');

			// 공통
			$(this).attr('title', '팝업 닫기');
			$dim.show();
			$('#wrapper').attr({'tabindex' : '-1', 'aria-hidden' : 'true'});
			$("html, body").css({'overflow' : 'hidden', 'height' : '100%'});
			$("html, body").on("scroll, touchmove, mousewheel", function (e) {  // 앱 - 터치무브와 마우스휠 스크롤 방지
				e.preventDefault();
				e.stopPropagation();
			}); 			
			
			$slideCloseBtn.on('click', popClose);
			
			// 레이어팝업 배경 클릭 시 팝업 닫기
			$dim.on("click ", function (e) {
				if(e.target === e.currentTarget) {
					popClose();
				}
			});
			
		})

		$(document).off('focus', '.tabIdx');
		$(document).on('focus', '.tabIdx', function(){
			if($(this).hasClass('prev')){
				$(this).closest('.slide_popup_wrap').find('.slide_pop_container').focus();
			}else{
				$(this).closest('.slide_popup_wrap').find('.slide_pop_container').focus();
			}
		});
	});	
}

function toolTipPop() {
	var $tpBtn = $('.icon_tooltip');

	$tpBtn.each( function (){	
		$(this).on('click', function (){
			var $this = $(this);
			var $tpWrap = $('.tooltip_wrap'); // 툴팁팝업
			var $tpPopCont = $tpWrap.find('.slide_pop_container');
			var $tpCloseBtn = $tpWrap.find('.icon_close');	
			var $dim = $this.parent().next().find('.dim');
			
			if ( !$tpWrap.hasClass('.slide_pop_open') ) {
				$this.parent().next($tpWrap).addClass('slide_pop_open');
				$this.parent().next($tpWrap).find($tpPopCont).attr({'tabindex' : '0', 'aria-hidden' : 'false'}).focus();
				$this.parent().next($tpWrap).prepend('<div class="tabIdx prev" tabindex="0"></div>').append('<div class="tabIdx next" tabindex="0"></div>');
				$dim.show();
			}

			function tpPopClose() {
				$this.parent().next($tpWrap).removeClass('slide_pop_open');
				$this.parent().next($tpWrap).find($tpPopCont).removeAttr('tabindex').attr('aria-hidden', 'true');	
				$this.parent().next($tpWrap).find('.tabIdx').remove();
				$dim.hide();
				$this.focus();

				// 공통
				$("html, body").css({'overflow' : 'auto', 'height' : 'auto'}); // 레이어팝업 닫았을 때 html, body의 scroll 가능
				$("html, body").off("scroll, touchmove, mousewheel"); // 앱, 모바일 터치무브 및 마우스 휠 스크롤 가능			
				$(this).parent().next($dim).find('.dim').hide();
				$this.focus();
				$('#wrapper').removeAttr('tabindex').attr('aria-hidden', 'false');
				
			}

			// 공통
			$(this).attr('title', '팝업 닫기');
			
			$('#wrapper').attr({'tabindex' : '-1', 'aria-hidden' : 'true'});
			$("html, body").css({'overflow' : 'hidden', 'height' : '100%'});
			$("html, body").on("scroll, touchmove, mousewheel", function (e) {  // 앱 - 터치무브와 마우스휠 스크롤 방지
				e.preventDefault();
				e.stopPropagation();
			}); 			
			
			$tpCloseBtn.on('click', tpPopClose);
			
			// 레이어팝업 배경 클릭 시 팝업 닫기
			$dim.on("click ", function (e) {
				if(e.target === e.currentTarget) {
					tpPopClose();
				}
			});
			
		})

		$(document).off('focus', '.tabIdx');
		$(document).on('focus', '.tabIdx', function(){
			if($(this).hasClass('prev')){
				$(this).closest('.tooltip_wrap').find('.slide_pop_container').focus();
			}else{
				$(this).closest('.tooltip_wrap').find('.slide_pop_container').focus();
			}
		});
	});	
}

/* 센터 팝업 */
function centerPop() {
	var $centPopBtn = $('.center_pop_btn');
	var $centPopWrap = $('.center_popup_wrap');
	var $centPopCont = $centPopWrap.find('.center_pop_container');
	var $btnClose = $centPopWrap.find('.cp_close');
	var $dim = $centPopWrap.find('.dim');
	
	$centPopBtn.each( function (){
		$(this).on('click', function (){
			var $this = $(this);

			$centPopWrap.addClass('open').find($centPopCont).attr({'tabindex' : '0', 'aria-hidden' : 'false'}).focus();
			$centPopWrap.prepend('<div class="tabIdx prev" tabindex="0"></div>').append('<div class="tabIdx next" tabindex="0"></div>');
			$dim.show();
			$('#wrapper').attr({'tabindex' : '-1', 'aria-hidden' : 'true'});
			$("html, body").css({'overflow' : 'hidden', 'height' : '100%'});
			$("html, body").on("scroll, touchmove, mousewheel", function (e) {  // 앱 - 터치무브와 마우스휠 스크롤 방지
				e.preventDefault();
				e.stopPropagation();
			});

			function cpClose() {
				$centPopWrap.removeClass('open').find($centPopCont).removeAttr('tabindex').attr('aria-hidden' , 'true');
				$centPopWrap.find('.tabIdx').remove();
				$dim.hide();
				$("html, body").css({'overflow' : 'auto', 'height' : 'auto'}); // 레이어팝업 닫았을 때 html, body의 scroll 가능
				$("html, body").off("scroll, touchmove, mousewheel"); // 앱, 모바일 터치무브 및 마우스 휠 스크롤 가능			
				$('#wrapper').removeAttr('tabindex').attr('aria-hidden', 'false');
				$this.focus();
			}
			$btnClose.on('click', cpClose);

			// 레이어팝업 배경 클릭 시 팝업 닫기
			$dim.on("click", function (e) {
				if(e.target === e.currentTarget) {
					cpClose();				
				}
			});
		});

		$(document).off('focus', '.tabIdx');
		$(document).on('focus', '.tabIdx', function(){
			if($(this).hasClass('prev')){
				$(this).closest('.center_popup_wrap').find('.center_pop_container').focus();
			}else{
				$(this).closest('.center_popup_wrap').find('.center_pop_container').focus();
			}
		});
	});
}

/* 전체화면 높이값 */
function fullHeight() {
	var $winH = $(window).innerHeight();

	$('.landing_gate_wrap').css({ 'height' : $winH });
}

/* 체크타입 리스트 라인 */
function checkBoxLine() {
	$('.check_box input[type=checkbox]').each( function (){
		
		var $this = $(this);
		
		$(this).on('click', function (){
			var $this = $(this);
			if($this.is(':checked')) {
				$this.closest('.list').css('border', '1px solid #3F44DE');
			} else {
				$this.closest('.list').css('border', '1px solid #F8F9FD');
			}
		});

		if($this.is(':checked')) {
			$this.closest('.list').css('border', '1px solid #3F44DE');
		} else {
			$this.closest('.list').css('border', '1px solid #F8F9FD');
		}		
	});
}

/* 슬라이드 메뉴 */
function slideMenu() {
	var $slideWrap = $('.siide_tab_list');
    var $slideList = $slideWrap.find('.siide_tab_item');
    var $slideBtn = $slideList.find('.slide_btn');    
	
    $slideBtn.on('click', function (){
	    $(this).closest($slideWrap).find($slideBtn).removeAttr('title').removeClass('selected').attr('aria-selected' , 'false');
        $(this).attr('title', '선택됨').addClass('selected').attr('aria-selected' , 'treu');
    })
}

// 선택
function selected() {
	var $listWrap = $('.lineType_listWrap, .bank_pick_wrap, .list_sorting');
	var $btn = $listWrap.find('a.list_checkbox, .bank');
	var $sortBtn = $listWrap.find('> li > button');
	
	$btn.on('click', function (){
		$btn.removeClass('selected').removeAttr('title');
		$(this).addClass('selected').attr('title', '선택됨');
	})

	$sortBtn.on('click', function (){
		$sortBtn.removeClass('active').removeAttr('title');
		$(this).addClass('active').attr('title', '선택됨');
	})
}

/* 안내화면 타이틀 슬라이드 */
function topInfoTitleSlide() {
	let options={};
	if($(".swiper-container .swiper-slide").length==1){
		options = {
			//spaceBetween: 10,   //슬라이드 간격
			loop: false,
			autoplay: false,
			pagination: {   //페이징 사용자 설정                    
				el: ".swiper-pagination",
				clickable: true,    //버튼 클릭 여부
				type: "progressbar" //페이징 타입 설정(종류: bullets, fraction, progress, progressbar)
			}
		}
	}else{
		options = {
			//spaceBetween: 10,   //슬라이드 간격
			loop: true,
			autoplay: {
				delay: 3000,
			},
			pagination: {   //페이징 사용자 설정                    
				el: ".swiper-pagination",
				clickable: true,    //버튼 클릭 여부
				type: "progressbar" //페이징 타입 설정(종류: bullets, fraction, progress, progressbar)
			},
			on:{
				slideChangeTransitionEnd: function(){
					//console.log(this.activeIndex)
					var total=this.slides.length-2 < 10 ? "0" + (this.slides.length-2) : this.slides.length-2,
						current=this.activeIndex < 10 ? "0" + this.activeIndex : this.activeIndex;

					if(current==0){
						$('.current').html(total);
					}else if(current==this.slides.length-1){
						$('.current').html('0' + 1);
					}else{
						$('.current').html(current);
					};
					$('.total').html(total);
				}
			}
		}
	}
	var galleryTop = new Swiper('.slideTitle_inner', options);

	$('.start').on('click',function(){
		galleryTop.autoplay.start();
		return false;
	});

	$('.stop').on('click',function(){
		galleryTop.autoplay.stop();
		return false;
	});
}

/* 상단 타이틀 sticky */
function stickyWrap() {
	var $check_sticky=$('div').hasClass('sticky'),
	$sticky=$('.sticky'),
	$sticky_top='',
	$check_container=$sticky.parents('section').hasClass('full_popup_wrap'),
	$header=$('#header').find('.wrap'),
	$container=$(window);

	if($check_sticky==true){
		$sticky_top=$sticky.offset().top;
		$sticky.parent().prepend('<div class="sticky_back"></div>');
		if($check_container==true){
			$header=$('.pop_header'),
			$container=$('.pop_inner');
		};
		$container.scroll(function(){
			sticky($header,$container);
		});
		
	};

	function sticky(header,container){
		var $this=$sticky.offset().top,
			$this_height=$sticky.innerHeight(),
			$header_height=header.innerHeight(),
			x=container.scrollTop();
		if(x<$sticky_top){
			$sticky.removeClass('active').css({top:0});
			$('.sticky_back').css({height:0});
		}else{
			$sticky.addClass('active').css({top:$header_height});		
			$('.sticky_back').css({height:$this_height+$header_height});
		}
	};
}

/* 확인 리스트 더보기 */
function listMore() {
	var $listMoreWrap = $('.tableType_listWrap, .cardType_listWrap');
	var $listMoreBtn = $listMoreWrap.find('.toggleType_more_btn');

	$listMoreBtn.on('click', function () {
		if(!$(this).hasClass('active')) {
			$(this).closest($listMoreWrap).find('.list_hide').slideDown();
			$(this).addClass('active').text("접기");
			$(this).closest($listMoreWrap).find('.list_hide').css('display', 'flex');
			
		} else {
			$(this).closest($listMoreWrap).find('.list_hide').slideUp();
			$(this).removeClass('active').text("더보기");
		}		
	})
	
}


/* 상세 리스트 토글 */
/* function detailListToggle() {
	var $len = $('.detailToggle .detail_list > li').length;

	
	if($len >=3 ) {
		$('.detailToggle .detail_list').append('<button type="button" class="more_btn">더보기</button>');
		$('.detailToggle .detail_list > li:nth-child(n+3)').attr('class', 'list_hide');
	} else {
		$('.detailToggle').find(".more_btn").remove();
	}

	var $detailListWrap = $('.detailToggle');
	var $detailListBtn = $detailListWrap.find('.more_btn');

	$detailListBtn.on('click', function () {
		if(!$(this).hasClass('active')) {
			$(this).closest($detailListWrap).find('.list_hide').slideDown();
			$(this).addClass('active').text("접기");
			$(this).closest($detailListWrap).find('.list_hide').css('display', 'flex');
			
		} else {
			$(this).closest($detailListWrap).find('.list_hide').slideUp();
			$(this).removeClass('active').text("더보기");
		}
		
	})
} */

// 상단으로 이동 버튼
function scrollTopBtn() {
	$(window).scroll( function (){
		if ( $( this ).scrollTop() > 200 ) {
			$( '.scrollTop_btn' ).fadeIn();
		} else {
			$( '.scrollTop_btn' ).fadeOut();
		}
	});
	$('.scrollTop_btn > button').on('click', function (){
		$('html, body').animate({
			scrollTop : 0
		}, 500)
	})
}
