$(document).ready(function(){
	var	_width = parseInt($(window).width());
			_height = parseInt($(window).height());

	// skip nav
	function skip(){
		$('.skip-btn a').on("focus", function(){
			$(this).parent().css('top','0');
		});
		$('.skip-btn a').on("focusout", function(){
			$(this).parent().css('top','-100%');
		});
	}
	skip();
 
	/* header */
	header('.header-inner');
	function header(h){
		var	$zone = $(h),
				$gnbZone = $zone.find('.gnb-zone'),
				$gnb01 = $zone.find('.gnb-zone > ul'),
				$depth1 = $zone.find('.gnb-zone > ul > li > a'),
				$gnb02 = $gnb01.find('.depth02');

		$depth1.on("mouseenter focus", function(){
			var	_this = $(this),
					_li = _this.closest('li').siblings();
					_depth02 = _this.next('.depth02');
			_this.addClass('select');
			_depth02.fadeIn();
			_li.find('a').removeClass('select');
			_li.find('.depth02').fadeOut();
		});	
		
		$zone.on("mouseleave", function(){
			$depth1.removeClass('select');
			$gnb02.fadeOut(); 
		});
		



		/*  검색 */
		var	$searchZone = $zone.find('.search-zone'),
				$btn = $searchZone.find('a.btn'),
				$search = $searchZone.find('.search-inner'),
				$input = $searchZone.find('.search-inner input'),
				$close = $search.find('.close a'),
				_open = false;
		
		//gnb 벗어났을 시  뎁스2 메뉴 숨기기
		$btn.on("focus", function(){	
			$depth1.removeClass('select');
			$gnb02.fadeOut(); 
		});

		$btn.on("click", function(){
			$search.addClass('show');
			$input.focus();
			if(_open === true){			
				if($input.val() == ""){
					alert("검색어를 입력하세요.");
					$input.focus();
				}else{
					alert('검색 준비중');
				}				
			}
			_open = true;
			//닫기 버튼 
			$close.on("click", function(){
				$search.removeClass('show');
				_open = false;
				$btn.focus();
				return false;
			});
			return false;
		});
	}
	
	banner('.banner-zone');
	function banner(b){
		var	$banner = $(b),
				$sliderZone = $banner.find('.slider-zone'),
				$slider = $sliderZone.find('ul'),	
				$list = $sliderZone.find('li'),
				_size = $list.size(),
				$btn = $banner.find('.arrow-btn p a'),
				$indicatorBox = $banner.find('.indicator'),
				$indicator = $indicatorBox.find('ul'),
				_count = 0,
				_cut = 0,
				_page = "";
		
		//페이지 하단 nav 생성
		for(var _pSize = 0 ; _pSize < _size ; _pSize++ ){
			if(_pSize == 0){
				_page += "<li class='on'><a href='#' title='"+_pSize+"번 보기'>"+_pSize+"</a></li>";
			}else{
				_page += "<li><a href='#' title='"+_pSize+"번 보기'>"+_pSize+"</a></li>";
			}
			$indicator.html(_page);
		}
			
		$list.each(function(){
			var	_this = $(this),
					$box = _this.find('.banner'),
					_src = _this.find('.bg-img img').attr("src");
			$box.css("background","url("+_src+") no-repeat 0 0");
		});
		// 좌우 버튼
		$btn.on("click", function(){
			var	_this = $(this),
					$p = _this.closest('p');
			_cut = _count;  
			if($slider.find('li:animated').length < 1){
				if($p.hasClass('prev') == true) {
					if( _count <= 0)  _count = _size;
					_count--;
					$list.eq(_count).addClass('show').css('margin-left','-100%').animate({'margin-left':0},500);
                    $list.eq(_cut).animate({'margin-left':'100%'},500,function(){
						$(this).css('margin-left','0px').removeClass('show');
                    });
				}else{  // 
					if( _count >= _size-1)  _count = -1;
					_count++;
					$list.eq(_count).addClass('show').css('margin-left','100%').animate({'margin-left':0},500);
                    $list.eq(_cut).animate({'margin-left':'-100%'},500,function(){
						$(this).css('margin-left','0px').removeClass('show');
                    });
				}
				$indicator.find('li:eq('+_count+')').addClass('on').siblings().removeClass('on');
			}
			return false;
		}); 
		
		// 하단 nav
		$indicator.find('li a').on("click", function(){
			var	_btn = $(this),
					_li = _btn.closest('li'),
					_index = _li.index();
			if(_index < _count){
				$list.eq(_index).addClass('show').css('margin-left','-100%').animate({'margin-left':0},500);
				$list.eq(_count).animate({'margin-left':'100%'},500,function(){
					$(this).css('margin-left','0px').removeClass('show');
                });
			}else if(_index > _count){
				$list.eq(_index).addClass('show').css('margin-left','100%').animate({'margin-left':0},500);
                $list.eq(_count).animate({'margin-left':'-100%'},500,function(){
					$(this).css('margin-left','0px').removeClass('show');
                });
			}else {
				console.log('동일');
			}
			$indicator.find('li:eq('+_index+')').addClass('on').siblings().removeClass('on');
			_count = _index ; 
			
			// 현재 보다 높다면 next   낮다면 prev
			return false;
		});

	}
	
	cont01('.cont01');
	function cont01(cont1){
		var	_cont2 = $(cont1),
				$listBox = _cont2.find('.list-box'),
				$box = $listBox.find('ul li'),
				$btn = $box.find('.btn-article a');
		
		$box.on("mouseenter", function(){
			$(this).addClass('enter').siblings().removeClass('enter');
		});
		$box.on("mouseleave", function(){
			$(this).removeClass('enter');
		});
		$btn.on("focus", function(){
			$(this).closest('li').addClass('enter').siblings().removeClass('enter');
		});	
		$btn.on("focusout", function(){
			$(this).closest('li').removeClass('enter');
		});
	}

	cont02('.cont02');
	function cont02(cont2){
		var	_cont2 = $(cont2),
				$cont = _cont2.find('.info-box'),
				$imgBox = _cont2.find('.list-img-box'),
				$btn = _cont2.find('.page-btn'),
				_cut = 0,
				_size = 0;

		var	_viewTop = parseInt($imgBox.offset().top),
				_move = _viewTop - 50;
					

		/*  이미지 정보  */
		var	$imgUl = $imgBox.find('ul'),
				$imgLi = $imgUl.find('li'),
				_liSize = $imgLi.size(),
				_num01 = _liSize-2,
				_num02 = _liSize-1,
				_num03 = _liSize,
				_max = _liSize+1;
		/*  텍스트 정보  */
		var	$infoLi = $('.info-zone > ul > li');
		
		_size = _liSize;
			
		$btn.find('p > a').on("focus", function(){ 
			$('html, body').stop().animate({"scrollTop":_move}, 500);	
		});
		
		$btn.find('p > a').on("click", function(){ 
			var	$parent = $(this).closest('p'); 
			
			if($parent.hasClass('prev') == true){
				_cut--;
				if(_cut <= -1 ){ _cut = 2; } 

				_num01--; _num02--; _num03--;
				/* img */
				if(_num01 == 0){ _num01 = _liSize; } $imgLi.eq(0).removeClass().addClass('num'+_num01+'');
				if(_num02 == 0){ _num02 = _liSize; } $imgLi.eq(1).removeClass().addClass('num'+_num02+'');
				if(_num03 == 0){ _num03 = _liSize; } $imgLi.eq(2).removeClass().addClass('num'+_num03+'');

				/* info */
				$infoLi.eq(_cut).addClass('show').siblings().removeClass('show');
		
			}else{
				_cut++;
				if(_cut >= _size ){ _cut = 0; } 
				/* img */
				_num01++; _num02++; _num03++;
				if(_num01 == _max){ _num01 = 1; } $imgLi.eq(0).removeClass().addClass('num'+_num01+'');
				if(_num02 == _max){ _num02 = 1; } $imgLi.eq(1).removeClass().addClass('num'+_num02+'');
				if(_num03 == _max){ _num03 = 1; } $imgLi.eq(2).removeClass().addClass('num'+_num03+'');

				/* info */
				$infoLi.eq(_cut).addClass('show').siblings().removeClass('show');
			}


			return false;
		});


		count();

		function count(){
			var numberCountingEffect = function (tagID){
			$(tagID).each(function () {
				$(this).prop('Counter',0).animate({ Counter: $(this).text() }, {
					duration: 2000,  
					easing: 'swing',  
					step: function (now) {    
						$(this).text(Math.round(now));
					}
				});
			});
			}
			$('.figure').text();
			numberCountingEffect('.figure');	
		};
	}


});

