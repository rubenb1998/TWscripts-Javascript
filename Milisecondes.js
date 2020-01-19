javascript:
var timer;
function set_ms(){
    var ms = new Date($.now()).getMilliseconds().toString();
    while (ms.length < 3) {
        ms = '0'+ms;
    }
    ms = ms.slice(0,-1) + '0';
    $('#tuamsms').html(':'+ms);
    timer = setTimeout(set_ms, 50);
}
$('.relative_time').after('<span id="tuamsms"></span>');
set_ms();
$('#troop_confirm_go, #troop_confirm_back, .popup_box_close').click(function(){
    clearTimeout(timer);
});