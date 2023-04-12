$(document).ready(function(){
	jaAllReset();
});

$(window).resize(function(){
	//jsLnbResiz();// lnb 리사이징 위치값
	fullHeight(); // 전체화면 높이값
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
	gnbPop();//메뉴
	fullHeight(); // 전체화면 높이값
	layerFullPop(); // 전체팝업
	layerSlidePop(); // 슬라이드 팝업
	toolTipPop(); // 툴팁 팝업
	centerPop(); // 센터 팝업
	languagePop(); // 언어선택 팝업
	checkBoxLine(); // 체크박스 선택 시 전체영역 라인 활성화
	selected(); // 상세 주소 선택
	scrollTopBtn(); // 상단으로 이동 버튼
	
	/* 폼요소 */
	jsInput();//텍스트 입력기(input)
	jsChk();//라디오, 체크박스
	jsFormFocus();// 폼 요소 포커스
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

/* gnb */
function gnbPop() {
	var $menuBtn = $('.button_menu');

	$menuBtn.each(function (){
		$(this).on('click', function (){
			var $this = $(this);
			var $tpWrap = $('.gnb_box');
			var $tpPopCont = $tpWrap.find('.gnb_inner');
			var $depth1 = $tpWrap.find('.depth1');
			var $depth2_target = $tpWrap.find('.depth2').prev('a');
			var $dim = $tpWrap.find('.dim');
			
			if ( !$tpWrap.hasClass('.active') ) {
				$tpWrap.addClass('active');
				$tpWrap.find($tpPopCont).attr({'tabindex' : '0', 'aria-hidden' : 'false'}).focus();
				$tpWrap.prepend('<div class="tabIdx prev" tabindex="0"></div>').append('<div class="tabIdx next" tabindex="0"></div>');
				$dim.show();
			}

			function tpPopClose() {
				$tpWrap.removeClass('active');
				$tpWrap.find($tpPopCont).removeAttr('tabindex').attr('aria-hidden', 'true');	
				$tpWrap.find('.tabIdx').remove();
				$depth1.removeClass('on');
				$('#wrapper').removeAttr('tabindex').attr('aria-hidden', 'false');
				$("html, body").css({'overflow' : 'auto', 'height' : 'auto'}); // 레이어팝업 닫았을 때 html, body의 scroll 가능
				$("html, body").off("scroll, touchmove, mousewheel"); // 앱, 모바일 터치무브 및 마우스 휠 스크롤 가능
				$dim.hide();
				$this.focus();
				
			}

			$depth2_target.on('click', function (){
				var $target = $(this).parents('.depth1');

				$depth1.removeClass('on');
				$target.addClass('on')
				return false;
			});			

			// 공통
			$(this).attr('title', '팝업 닫기');
			
			$('#wrapper').attr({'tabindex' : '-1', 'aria-hidden' : 'true'});
			$("html, body").css({'overflow' : 'hidden', 'height' : '100%'});
			$("html, body").on("scroll, touchmove, mousewheel", function (e) {  // 앱 - 터치무브와 마우스휠 스크롤 방지
				e.preventDefault();
				e.stopPropagation();
			}); 			
			
			// 레이어팝업 배경 클릭 시 팝업 닫기
			$dim.on("click ", function (e) {
				if(e.target === e.currentTarget) {
					tpPopClose();
				}
			});
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
			var $tpPopCont = $tpWrap.find('.tooltip_container');
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
				$("html, body").off("scroll, touchmove, mousewheel"); // 앱, 모바일 터치무브 및 마우스 휠 스크롤 가능			
				$(this).parent().next($dim).find('.dim').hide();
				$this.focus();
				$('#wrapper').removeAttr('tabindex').attr('aria-hidden', 'false');
				
			}

			// 공통
			$(this).attr('title', '팝업 닫기');
			
			$('#wrapper').attr({'tabindex' : '-1', 'aria-hidden' : 'true'});
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
				$(this).closest('.tooltip_wrap').find('.tooltip_container').focus();
			}else{
				$(this).closest('.tooltip_wrap').find('.tooltip_container').focus();
			}
		});
	});	
}

/* 언어선택 */
function languagePop() {
	var $tpBtn = $('.button_language');

	$tpBtn.each( function (){	
		$(this).on('click', function (){
			var $this = $(this);
			var $tpWrap = $('.language_wrap'); // 툴팁팝업
			var $tpPopCont = $tpWrap.find('.slide_pop_container');
			var $tpCloseBtn = $tpWrap.find('.icon_close');	
			var $dim = $tpWrap.find('.dim');
			
			if ( !$tpWrap.hasClass('.slide_pop_open') ) {
				$tpWrap.addClass('slide_pop_open');
				$tpWrap.find($tpPopCont).attr({'tabindex' : '0', 'aria-hidden' : 'false'}).focus();
				$tpWrap.prepend('<div class="tabIdx prev" tabindex="0"></div>').append('<div class="tabIdx next" tabindex="0"></div>');
				$dim.show();
			}

			function tpPopClose() {
				$tpWrap.removeClass('slide_pop_open');
				$tpWrap.find($tpPopCont).removeAttr('tabindex').attr('aria-hidden', 'true');	
				$tpWrap.find('.tabIdx').remove();
				$dim.hide();
				$this.focus();
				
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
