(function() {
    toggleGnb();

    function toggleGnb () {
        var el = $('#header .gnb_wrap, body');
        var gnbBg = $('#header .gnb_bg');


        $('#header .btn_menu').on('click', function() {
            // 메뉴 열기
            el.addClass('on')
            gnbBg.fadeIn();
        });
    
        // 메뉴 닫기
        $('#header .btn_close, #header .gnb_bg').on('click', function() {
            el.removeClass('on')
            gnbBg.fadeOut()

            // gnb초기화
            $('#header .gnb>li').removeClass('on');
            setTimeout(function() {
                $('#header .gnb .depth2').slideUp();

            },500)
        });

        // 위에 .btn_bg에 걸었던 이벤트와 같은 방법.
        // gnb배경 클릭시 메뉴 닫기
        // $(' #header .gnb_bg').on('click', function() {
        //     $('#header .btn_close').trigger('click');
        // });

    
        // gnb 아코디언
        // 클릭한 메뉴 하나만 열고 다른 메뉴 클릭시 먼저 클릭했던 메뉴는 닫기
        $('#header .gnb>li>a').on('click', function() {
            $(this).parent().toggleClass('on').siblings().removeClass('on');
    
            // 클릭한 a의 부모 li를 열고 다른 형제 li안쪽의 deth2는 닫기
            $(this).siblings('.depth2').stop().siblings().parent().siblings().find('.depth2').slideUp();
            // siblings, next 사용가능하나 siblings 사용권장.
            $(this).siblings('.depth2').stop().slideToggle();
        });

        // 서브메뉴 모션 후 링크
        $('#header .gnb .depth2 a').on('click', function(e) {
            // 원래 링크 막기
            e.preventDefault;
            $(this).addClass('on');

            var url = $(this).attr('href');
            

            setTimeout(function() {
                // href값으로 강제 이동
                location.href = url;
            },3000);
        });
    }
    // 클릭한 메뉴 모두 열고 닫기(배달의민족 메뉴리스트와 같음)
    // $('#header .gnb>li>a').on('click', function() {
    //     $(this).toggleClass('on');
    //     // siblings, next 사용가능하나 siblings 사용권장.
    //     $(this).siblings('.depth2').stop().slideToggle();
    // });


    // 메인 슬라이더
    var mainSlider = new Swiper('.main_slider', {
        loop: true,
        autoplay: {
            delay: 5000,
        },
        pagination: {
          el: '.swiper-pagination',
          clickable: true,
        },
      });

    //   메인 탭메뉴 슬라이더
    var menuSlider = new Swiper ('.menu_slider', {
        // 좌우로 이동할 때 높이를 컨텐츠 높이만큼 자동으로 잡아주면서 이동함
        autoHeight: true,
        navigation: {
            nextEl: '.swiper-button-next',
            prevEl: '.swiper-button-prev',
        },
        pagination: {
            el: '.swiper-pagination',
            type: 'bullets',
          },
    });


    $('#container .main_menu .tab_menu li').on('click', function(e) {
        e.preventDefault();

        var idx = $(this).index();

        $(this).addClass('active').siblings().removeClass('active');

        $('#container .main_menu .menu_slider_blind').eq(idx).addClass('active').siblings().removeClass('active');
    });


    // 서브 lnb (클릭시마다 이전동작 멈추게 함)
    // $('.lnb .btn_lnb').on('click', function() {
    //     $(this).toggleClass('active')
    //     $('.lnb .list_lnb').stop().slideToggle();
    // });


    // btn_lnb에 active가 없으면 리스트 열기
    // 클릭시마다 flag를 false시키고 slideToggle후 
    // flag를 true로 변경하여 flag가 true일때만 코드를 실행시킴
    var flag = true;

    $('.lnb .btn_lnb').on('click', function() {
        if(flag) {
            $(this).toggleClass('active');
            $('.lnb .list_lnb').slideToggle(500, function() {
                flag = true;
            });
        }
        flag = false;
    });

})();
