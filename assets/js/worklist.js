$(function (){
	var $site=$('.g_site_info'),
		$site_type=$site.find('.site_type').html(),
		$site_derectory=$site.find('.site_derectory').html(),
		$header=$('#g_header'),
		$header_menu=$header.find('.g_menu'),
		$container=$('#g_container'),
		$contents=$('#g_contents'),
		$section=$contents.find('.g_section'),
		$file_link=$container.find('[data-info*="file_name"]'),
		$state_check='',
		$state_length=0,
		$state_complete_length=0;
	


	



	if($site_type=='mobile'){
		$('body').addClass('g_mobile');
	}else{
		$('body').addClass('g_web');
	};

	$header_menu.append('<ul></ul>');//좌측 바로가기 메뉴 생성

	$section.each(function() {
		var $this=$(this),
			$title_box=$this.find('.g_h2'),
			$title_text=$title_box.html(),
			$table=$this.find('.g_table'),
			$children=$table.find('tbody').find('tr');

		$header_menu.find('ul').append('<li><button type="button">'+$title_text+'</button></li>');//좌측 바로가기 메뉴 생성

		$children.each(function() {
			var $this=$(this),
				$depth=$this.find('[data-info*="depth"]'),//메뉴 공통
				$depth2=$this.find('[data-info*="depth2"]'),//메뉴 depth2
				$depth3=$this.find('[data-info*="depth3"]'),//메뉴 depth3
				$depth4=$this.find('[data-info*="depth4"]'),//메뉴 depth4
				$depth5=$this.find('[data-info*="depth5"]'),//메뉴 depth5
				$type=$this.find('[data-info*="type"]'),//유형
				$directory=$this.find('[data-info*="directory"]'),//디렉토리
				$file_name=$this.find('[data-info*="file_name"]'),//파일명
				$name=$this.find('[data-info*="name"]'),//담당자 공통
				$planner=$this.find('[data-info*="planner"]'),//기획 담당자
				$publisher=$this.find('[data-info*="publisher"]'),//퍼블 딤딩지
				$state=$this.find('[data-info*="state"]'),//작업 상태
				$date=$this.find('[data-info*="date"]'),//완료일
				$note=$this.find('[data-info*="note"]'),//비고
				$del=$depth.parents('tr').hasClass('g_del'),

				$type_text=$type.html(),
				$directory_text=$directory.html(),
				$file_name_text=$file_name.html(),
				$state_text=$state.html();
			
			if($del==false){
				$state_length++;//전체 페이지 수
				if($state_text=='완료'){//완료 페이지 수
					$state_complete_length++
				};
			};

			if($type_text!=''){//유형 클래스 부여
				$type.addClass($type_text).html('<span>'+$type_text+'</span>');
			};
			
			if($file_name_text!=''){//파일 링크 부여
				$file_name.html('<a href="'+$site_derectory+'/'+$directory_text+'/'+$file_name_text+'.html" target="_blank" title="새창">'+$file_name_text+'</a>');
			};

			if($state_text=='작업중'){//작업상태 클래스 부여
				$state.addClass('state2');
			}else if($state_text=='검수요청'){
				$state.addClass('state3');
			}else if($state_text=='검수완료'){
				$state.addClass('state4');
			}else if($state_text=='완료'){
				$state.addClass('state5');
			}else{
				$state.html('작업전');
			};

			console.log()
		});
	});

	var $shortcut=$header_menu.find('button');

	if($state_length>0){
		var $bar=Math.ceil($state_complete_length*100/$state_length);

		$container.append('<aside class="g_progress"><div><h2>진척율</h2><div class="g_progress_bar"><span style="width:'+$bar+'%;"><span>'+$bar+'</span></span></div><ul><li><strong>전체</strong><span>'+$state_length+'</span></li><li><strong>완료</strong><span>'+$state_complete_length+'</span></li></ul></div></aside>')
	};

	$section.eq(0).addClass('active');
	$header_menu.find('li').eq(0).addClass('active');

    $shortcut.on('click',function(){
        var $this=$(this).parents('li'),
			$nums=$this.index(),
			$target=$('.g_section'),
			$this_targeting=$target.eq($nums);
		
		$this.siblings('li').removeClass('active');
		$target.removeClass('active');
		$this.addClass('active');
		$this_targeting.addClass('active');
		$container.animate({scrollTop:$this_targeting.position().top});
		return false;
    });

    $container.on('scroll',function(){
        $section.each(function(){
			var $this=$(this),
				$nums=$(this).index(),
				$targeting=$header_menu.find('li');

            if(($this.position().top - $container.scrollTop())<100){
				$section.removeClass('active');
				$this.addClass('active');
                $targeting.removeClass('active');
				$targeting.eq($nums).addClass('active');
            };
        });
    });

	if($site_type=='mobile'){
		$file_link.find('a').on('mouseenter',function(){
			var $this=$(this),
				$link_href=$this.attr('href');

			$('.g_iframe_box').remove();
			$container.append('<div class="g_iframe_box"><iframe src="'+$link_href+'"></iframe></div>');
		});

		$('div').on('mouseleave','.g_iframe_box',function(){
			$(this).remove();
		});
	};
});