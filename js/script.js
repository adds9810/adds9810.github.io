/* 화면감지 */
function device_size(){
    var wh = $(window).width();
    if(wh > 1024){
        $('.nav_btn').removeClass('open').addClass('play');
    }else{
        $('.nav_btn').removeClass('play').addClass('open');
    } 
}

/* setting */
var page_name = window.location.hash;
var page_hash;
var page;
switch(page_name){
    case "#about":
        page_hash ="#about";
        page_num = 1;
        break;
    case "#work":
        page_hash ="#work";
        page_num = 2;
        break;
    case "#contact":
        page_hash ="#contact";
        page_num = 3;
        break;
    default: 
        page_hash = "#home";
        page_num = 0;
        break;
        
}

$(window).load(function(){
    device_size();
    $('nav a').removeClass('on');
    $('nav ul li').eq(page_num).children('a').addClass('on').click();
    $('.content_box').removeClass('view');
    $(page_hash).addClass('view');
    if($(window).width() > 1024){
        $('.content_background').width($(window).width()*4); $('.cb_background').removeClass('view').removeClass('prev').removeClass('next').css({"margin-left": 0, "min-width":$(window).width()*0.7});
        $('.cb_background').eq(page_num).addClass('view');
        $('.cb_background').eq(page_num + 1).addClass('next').css({"margin-left": $(window).width()*0.7});
    }else{
        $('.content_background').width($(window).width()); 
        $('.cb_background:nth-child(1)').addClass('view');
    }
    
    
    /* mobile scroll */
    $(".content_scroll").scroll(function(){
        if($(window).width() < 1025){
            if($(".content_scroll").scrollTop() >= $('#home').height() - 40 && $(".content_scroll").scrollTop() < $('#home').height() + $('#about').height() - 40){
                $('nav a').removeClass('on');
                $('nav ul li').eq(1).children('a').addClass('on');
                $('.content_box').removeClass('view');
                $('#about').addClass('view');
                $('.cb_background').removeClass('view');
                $('.cb_background[data-val=1]').addClass('view');  
            }else if($(".content_scroll").scrollTop() >= $('#home').height() + $('#about').height() - 40 && $(".content_scroll").scrollTop() < $('#home').height() + $('#about').height()+ $('#work').height() - 40){
                $('nav a').removeClass('on');
                $('nav ul li').eq(2).children('a').addClass('on');
                $('.content_box').removeClass('view');
                $('#work').addClass('view');
                $('.cb_background').removeClass('view');
                $('.cb_background[data-val=2]').addClass('view');   
            }else if($(".content_scroll").scrollTop() >=  $('#home').height() + $('#about').height()+ $('#work').height() - 40){
                $('nav a').removeClass('on');
                $('nav ul li').eq(3).children('a').addClass('on');
                $('.content_box').removeClass('view');
                $('#contact').addClass('view');
                $('.cb_background').removeClass('view');
                $('.cb_background[data-val=3]').addClass('view');  
            }else{
                $('nav a').removeClass('on');
                $('nav ul li').eq(0).children('a').addClass('on');
                $('.content_box').removeClass('view');
                $('#home').addClass('view');
                $('.cb_background').removeClass('view');
                $('.cb_background[data-val=0]').addClass('view');   
            }
            window.location.hash.replace(window.location.hash, $('nav a.on').attr('href')); 
        }
    }); 
    /* mobile scroll */
});

/* slide */
var count = 0;
var prev_num
var next_num;
var scroll_height = 1;

$(function(){
    $('nav a, .go_about').click(function(){
        if($(window).width() > 1024){
            if($(this).hasClass('go_about')){
               count = 0;
            }else if(Number($(this).attr('data-val')) < 0){
                count = 2;
            }else{
                count = Number($(this).attr('data-val')) - 1;
            }
           next_page();
        }else{
            if($(this).hasClass('go_about')){
                $('nav a').removeClass('on');
                $('nav ul li:nth-child(2) a').addClass('on'); 
                $('header, .nav_btn').removeClass('on');
                $('.cb_background').removeClass('view');
                $('.cb_background[data-val=1]').addClass('view');
                $('.content_scroll').animate({scrollTop:$('#about').offset().top},500)
           }else{
                $('nav a').removeClass('on');
                $(this).addClass('on'); 
                $('header, .nav_btn').removeClass('on');
                $('.cb_background').removeClass('view');
                $('.cb_background[data-val='+$(this).attr('data-val')+']').addClass('view');
           }
        }
        
    });
    $('.nav_btn').click(function(){
        if($(this).hasClass('play')){
            next_page()
        }else if($(this).hasClass('on') ){
            $(this).removeClass('on');
            $('header').removeClass('on');
            $('.content_scroll').css({"margin-top":0});
        }else if($(this).hasClass('open')){
            $(this).addClass('on');
            $('header').addClass('on');
        }
    });
});

function next_page(){
    if(count < 2){
        count++;
        prev_num = count-1;
        next_num = count+1;
    }else if(count > 1 && count < 3){
        count++;
        prev_num = count-1;
        next_num = 0;
    }else{
        count = 0;
        prev_num = 3;
        next_num = 1;
    }
    $('nav a').removeClass('on');
    $('nav ul li').eq(count).children('a').addClass('on');
    $('.content_box').removeClass('view').removeClass('scroll');
    $('.content_box').eq(count).addClass('view'); 
    $('.scroll_bar').remove();
    $('.content_col').css({'margin-top':0});
    scroll_height = 0; $('.cb_background').removeClass('view').removeClass('prev').removeClass('next').css({"margin-left": 0});
    $('.cb_background[data-val=' + prev_num + ']').addClass('prev').css({"margin-left": 0}).animate({"margin-left": -$(window).width()*0.7}, 500);
    $('.cb_background[data-val=' + count + ']').addClass('view').css({"margin-left": $(window).width()*0.7}).animate({"margin-left": $(window).width()*0}, 500);
    $('.cb_background[data-val=' + next_num + ']').addClass('next').css({"margin-left": $(window).width()+$(window).width()*0.3}).animate({"margin-left": $(window).width()*0.7},500);
    var variable = $('.content_box').eq(count).children().children().height() + 40;
    var standard = $(window).outerHeight();
    var scrollbar_max = $('.content_overlay').width();
    if(standard < variable){
        $('.content_box.view').addClass('scroll').prepend('<div class="scroll_bar"></div>');
        $('.content_box.view .scroll_bar').css({"width":(standard-variable)/scrollbar_max*100+scrollbar_max});
    }
}
/* slide */

/* scroll */
var secroll_width = $('.scroll_bar').width();
$(window).on('mousewheel DOMMouseScroll', function(e){
    var wheel = e.originalEvent.wheelDelta; 
    var variable = $('.content_box').eq(count).children().children().height() + 40;
    var standard = $(window).outerHeight();
    var scrollbar_max = $('.content_overlay').width();
    if(wheel > 0 ){
        scroll_height--;
        if(scroll_height <= 0){
            scroll_height = 0;  
        }else{
            $('.content_box.view .scroll_bar').css({"width":(standard - parseInt($('.content_box.scroll .content_col').css('margin-top'))- variable )/scrollbar_max*100+scrollbar_max})
        }
        if($(window).height() * scroll_height > $('.content_box.scroll .content_col').height() - $(window).height()){
           $('.content_box.scroll .content_col').css({'margin-top': $(window).height() - $('.content_box.scroll .content_col').outerHeight() - 20});
        }else{
           $('.content_box.scroll .content_col').css({'margin-top': -scroll_height * $(window).height()}); 
        }
        
        $('.content_box.view .scroll_bar').css({"width":(standard - parseInt($('.content_box.scroll .content_col').css('margin-top'))- variable )/scrollbar_max*100+scrollbar_max}) ;
    }else{
        scroll_height++;
        if( $(window).height() * scroll_height > $('.content_box.scroll .content_col').height() - $(window).height()){
            scroll_height = Math.round($(window).height()/$('.content_box.scroll .content_col').width()); 
            $('.content_box.scroll .content_col').css({'margin-top': $(window).height() - $('.content_box.scroll .content_col').outerHeight() - 20});
            $('.scroll_bar').css({'width' : $('.content_overlay').width()});
        }else{
            $('.content_box.scroll .content_col').css({'margin-top': -$(window).height() * scroll_height});
            $('.content_box.view .scroll_bar').css({"width":(standard - parseInt($('.content_box.scroll .content_col').css('margin-top'))- variable )/scrollbar_max*100+scrollbar_max}) ;
        }
    }
});
/* scroll */

/* resize */
$(window).on("resize",function(){
    device_size();
    $('.scroll_bar').remove();
    if($(window).width() > 1024){
        $('.content_background').width($(window).width()*4);
        $('.cb_background').css({"min-width":$(window).width()*0.7});
        if($('.cb_background.view').attr('data-val') == 3){
           $('.cb_background:first-child').addClass('next').css({"margin-left": $(window).width()*0.7});
            count = 3;
       }else{
           $('.cb_background.view').next().addClass('next').css({"margin-left": $(window).width()*0.7});
       }
        var variable = $('.content_box.view').children().children().height();
        var standard = $(window).outerHeight();
        var scrollbar_max = $('.content_overlay').width();
        if(standard < variable){
            $('.content_box.view').addClass('scroll').prepend('<div class="scroll_bar"></div>');
            $('.content_box.view .content_col').css('margin-top',parseInt($('.content_box.scroll .content_col').css('margin-top')+1));
            $('.content_box.view .scroll_bar').css({"max-width": scrollbar_max,"width":(standard - parseInt($('.content_box.scroll .content_col').css('margin-top'))- variable )/scrollbar_max*100+scrollbar_max})
        }else{
            $('.content_box.view').removeClass('scroll');
            $('.content_box.view .content_col').css('margin-top',0);
        }
    }else{
        $('.content_box').removeClass('scroll');
        $('nav a').removeClass('on');
        $('nav ul li').eq($('.cb_background.view').attr('data-val')).children('a').addClass('on');
        $('.content_col').css({"margin-top":0});
        $('.content_background').width($(window).width());
        $('.cb_background').removeClass('prev').removeClass('next').css({"min-width":$(window).width(),"margin-left":0}); 
    }
});
/* resize */

