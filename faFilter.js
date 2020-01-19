// ==UserScript==
// @name GM FA-Filter
// @author Tjeerdo
// @homepageURL https://swtools.programmingtuts.nl/
// @version 1.8
// @description FA-Filter
// @include https://nl*.tribalwars.nl/game.php?*
// @include https://nl*.tribalwars.nl/game.php?*screen=am_farm*
// @include https://es*.guerrastribales.es/game.php?*screen=am_farm*
// @include https://en*.tribalwars.net/game.php?*screen=am_farm*
// @include https://de*.die-staemme.de/game.php?*screen=am_farm*
// @include https://nl*.tribalwars.nl/game.php?*screen=report*
// @include https://es*.guerrastribales.es/game.php?*screen=report*
// @include https://en*.tribalwars.net/game.php?*screen=report*
// @include https://de*.die-staemme.de/game.php?*screen=report*
// @grant none
/* Functionaliteiten:
* Sneltoetsen (A, B en C knoppen, vorig en volgende dorp), vorige/volgende pagina
* Filters om bepaalde dingen eruit te filteren ;)
* Sorteren op afstand/datum (oplopend/asc) (aflopend = desc)
*
*
*/
/* TO-DO List:
*
*/
// ==/UserScript==


$(document).ready( function() {
    // object waarin de settings worden opgeslagen
    var settings = JSON.parse(localStorage.getItem('settings')) || {};
    // default settings:
    if (localStorage.getItem('settings') === null || settings.version !== "1.8") {
    settings.version = "1.8";
    settings.attack = false;
    settings.green = false;
    settings.yellow = false;
    settings.red = false;
    settings.blue = false;
    settings.red_blue = false;
    settings.red_yellow = false;
    settings.volle_buit = false;
    settings.lege_buit = false;
    settings.disabled_icon_a = false;
    settings.disabled_icon_b = false;
    settings.disabled_icon_c = false;
    settings.distance = [0,100];
    settings.gsfilter = {
    "per_gs": false,
    "all_gs_combined": true,
    "min_hout": 0,
    "min_leem": 0,
    "min_ijzer": 0,
    "min_gs": 0,
    "unknown_gs": false
    };
    settings.wall = {
    "min_lvl":0,
    "max_lvl":20,
    "wall_sort": false,
    "unknown_wall": false
    };
    settings.sortby = ["distance", "asc"];
    settings.sort_gs = false;
    settings.DeleteReports = false;
    settings.autoSelectFarmReports = true;
    settings.hotkeys = {
    "AR_HitKeyA": 65,
    "AR_HitKeyB": 66,
    "AR_HitKeyC": 67,
    "AR_HitKeyNextVillage": 39,
    "AR_HitKeyPrevVillage": 37,
    "AR_HitKeyNextPage": 68,
    "AR_HitKeyPrevPage": 83
    };
    settings.groups = false;
    settings.LoadAllPages = false;
    settings.StayOnSamePage = false;
    /*settings.*/
    localStorage.setItem('settings', JSON.stringify(settings));
    location.reload();
    }
    
    var keyCodeMap = {
    8: "backspace",
    9: "tab",
    13: "return",
    16: "shift",
    17: "ctrl",
    18: "alt",
    19: "pausebreak",
    20: "capslock",
    27: "escape",
    32: " ",
    33: "pageup",
    34: "pagedown",
    35: "end",
    36: "home",
    37: "arrow left",
    38: "arrow up",
    39: "arrow right",
    40: "arrow down",
    43: "+",
    44: "printscreen",
    45: "insert",
    46: "delete",
    48: "0",
    49: "1",
    50: "2",
    51: "3",
    52: "4",
    53: "5",
    54: "6",
    55: "7",
    56: "8",
    57: "9",
    59: ";",
    61: "=",
    65: "a",
    66: "b",
    67: "c",
    68: "d",
    69: "e",
    70: "f",
    71: "g",
    72: "h",
    73: "i",
    74: "j",
    75: "k",
    76: "l",
    77: "m",
    78: "n",
    79: "o",
    80: "p",
    81: "q",
    82: "r",
    83: "s",
    84: "t",
    85: "u",
    86: "v",
    87: "w",
    88: "x",
    89: "y",
    90: "z",
    96: "0",
    97: "1",
    98: "2",
    99: "3",
    100: "4",
    101: "5",
    102: "6",
    103: "7",
    104: "8",
    105: "9",
    106: "*",
    107: "+",
    109: "-",
    110: ".",
    111: "/",
    112: "f1",
    113: "f2",
    114: "f3",
    115: "f4",
    116: "f5",
    117: "f6",
    118: "f7",
    119: "f8",
    120: "f9",
    121: "f10",
    122: "f11",
    123: "f12",
    144: "numlock",
    145: "scrolllock",
    186: ";",
    187: "=",
    188: ",",
    189: "-",
    190: ".",
    191: "/",
    192: "`",
    219: "[",
    220: "\\",
    221: "]",
    222: "'"
    };
    // filter function
    function AR_FA_Filter() {
    for(var key in settings) {
    if($.type(settings[key]) === "boolean" && settings[key] === true) {
    if(key === "volle_buit") {
    $("#am_widget_Farm img[src*='1.png']").each(function () {
    $(this).closest('tr').remove();
    });
    } else if(key === "lege_buit") {
    $("#am_widget_Farm img[src*='0.png']").each(function () {
    $(this).closest('tr').remove();
    });
    } else if(key.match("disabled_icon_")) {
    var disabled_icon = key.split("_")[2];
    $("#am_widget_Farm .farm_icon_disabled.farm_icon_"+disabled_icon).each(function () {
    $(this).closest('tr').remove();
    });
    } else if(key === "sort_gs") {
    function x(a) {
    var c = $.trim( a.cells[5].textContent ).split(" ");
    var u = 0;
    for (var i = 0; i < c.length; i++) {
    u += parseInt(c.replace(/\D/g, "")) || 0;
    }
    return u;
    }
    var s = $("tr[class*=\"row_\"]").sort(function (a, b) {
    return x(b) - x(a);
    });
    for (i = 0; i < $("tr[class*=\"row_\"]").length; i++) {
    $('#plunder_list').find('tr:last').after(s);
    }
    } else if (key == "groups") {
    $.ajax({
    url: "https://" + game_data.world + ".tribalwars.nl" + game_data.link_base_pure + "overview_villages&mode=combined",
    async: false,
    success: function(result) {
    var $groups = $(result).find('#paged_view_content').find('div').first();
    $groups.find('a').each(function(){
    var newURL = $(this).attr('href').replace('&mode=combined', '').replace('overview_villages', location.href.split("&screen=")[1]).replace('village=','village=j');
    $(this).attr('href', newURL);
    });
    $('#am_widget_Farm').before('<div class="vis_item" align="center">' + $groups.html() + '</div>');
    }
    });
    } else if(key == "LoadAllPages") {
    // merge with stay on same page
    
    } else if(key == "StayOnSamePage") {
    //nothing, because this is for the hitkeys
    } else {
    $("#am_widget_Farm img[src*='" + key + ".png']").each(function () {
    $(this).closest('tr').remove();
    });
    }
    } else if($.type(settings[key]) === "array") {
    if(!document.URL.match("&order=" + settings[key][0] + "&dir=" + settings[key][1]) && key === "sortby") {
    location.href = game_data.link_base_pure + "am_farm&order=" + settings[key][0] + "&dir=" + settings[key][1] + "&Farm_page=0";
    } else if(key === "distance"){
    
    $("#am_widget_Farm tr td:nth-child(8)").each(function () {
    if($(this).text() > settings[key][1]) {
    $(this).closest("tr").remove();
    }
    if($(this).text() < settings[key][0]) {
    $(this).closest("tr").remove();
    }
    });
    }
    } else if(key == "gsfilter") {
    var indexResourcesColumn = $('#am_widget_Farm tr th > span.ressources').closest("th").index();
    $('#am_widget_Farm tr[class*="report_"]').each(function () {
    var resources = $.trim($(this).find('td').eq(indexResourcesColumn).text().replace(/\./g,'')).split(" ");
    if (resources.length > 2) {
    var hout = $.trim(resources[0]) * 1;
    var leem = $.trim(resources[1]) * 1;
    var ijzer = $.trim(resources[2]) * 1;
    if ((hout < settings[key].min_hout || leem < settings[key].min_leem || ijzer < settings[key].min_ijzer) && settings[key].per_gs) {
    $(this).remove();
    } else if ( (hout + leem + ijzer <settings.gsfilter.min_gs) && settings[key].all_gs_combined) {
    $(this).remove();
    }
    } else if (settings[key].unknown_gs) {
    $(this).remove();
    }
    });
    } else if(key == "wall") {
    var indexWallColumn = $('#am_widget_Farm tr th:has(img[src*="buildings/wall.png"])').index();
    $('#am_widget_Farm tr[class*="report_"]').each(function () {
    var wall = $(this).find('td').eq(indexWallColumn).text();
    if ($.isNumeric(wall)) {
    if (wall > settings[key].max_lvl || wall < settings[key].min_lvl ) {
    $(this).remove();
    }
    } else if (settings[key].unknown_wall) {
    $(this).remove();
    }
    });
    if (settings[key].wall_sort) {
    function j(a) {
    var c = parseInt($.trim(a.cells[6].textContent.split(" ")));
    return c;
    }
    var s = $("tr[class*=\"row_\"]").sort(function (a, b) {
    return j(b) - j(a);
    });
    for (i = 0; i < $("tr[class*=\"row_\"]").length; i++) {
    $('#plunder_list').find('tr:last').after(s);
    }
    }
    }
    }
    }
    
    $('#linkContainer').append('<a href="#" id="FA_settings"> - FA settings</a>');
    $("#FA_settings").click(function () {
    var a = document.createElement("div");
    a.id = "FAsettings";
    a.style.cssText = "background-color:#ecd6ad;border:2px solid #7d510f;z-index:99;top:100px;left:"+(($(document).width()-600)/2)+"px;position:absolute;padding-top:7px;padding-left:7px;padding-right:7px;width:600px;border-radius:7px;box-shadow:0 0 50px 15px #000000;";
    document.body.appendChild(a);
    a.innerHTML = '<h2 style="text-align: center;">settings FA-Filter</h2>';
    a.innerHTML += '<table class="vis modemenu AR_FAPackMenu" style="width:100%;margin-left:auto;margin-right:auto;margin-bottom:7px;"><tbody><tr><td style="width:33%; text-align:center" class="selected"><a href="javascript:void(0)" id="AR_filtersFA">Filters/sorteren</a></td><td style="width:33%; text-align:center"><a href="javascript:void(0)" id="AR_hitkeysFA">Sneltoetsen</a></td><td style="width:33%; text-align:center"><a href="javascript:void(0)" id="AR_OverigFA">Overig</a></td></tr></tbody></table>';
    a.innerHTML += '<div id="Ar_FilterSort"><table style="width:300px;float:left;"><tbody><tr><th colspan="2">Automatische filters:</th></tr><tr><td><input type="checkbox" name="attack" class="filters"></td><td>lopende aanvallen filteren</td></tr><tr><td><input type="checkbox" name="green" class="filters"></td><td>groen filteren</td></tr><tr><td><input type="checkbox" name="yellow" class="filters"></td><td>geel filteren</td></tr><tr><td><input type="checkbox" name="red" class="filters"></td><td>rood filteren</td></tr><tr><td><input type="checkbox" name="blue" class="filters"></td><td>blauw filteren</td></tr><tr><td><input type="checkbox" name="red_blue" class="filters"></td><td>rood_blauw filteren</td></tr><tr><td><input type="checkbox" name="red_yellow" class="filters"></td><td>rood_geel filteren</td></tr><tr><td><input type="checkbox" name="volle_buit" class="filters"></td><td>volle buit filteren</td></tr><tr><td><input type="checkbox" name="lege_buit" class="filters"></td><td>Lege buit filteren</td></tr><tr><td><input type="checkbox" name="disabled_icon_a" class="filters"></td><td>inactieve A-knoppen filteren</td></tr><tr><td><input type="checkbox" name="disabled_icon_b" class="filters"></td><td>inactieve B-knoppen filteren</td></tr><tr><td><input type="checkbox" name="disabled_icon_c" class="filters"></td><td>inactieve C-knoppen filteren</td></tr><tr><td><input type="checkbox" name="unknown_gs" class="resourcesfilter"></td><td>Onbekend aantal GS wegfilteren</td></tr><tr><td><input type="checkbox" name="unknown_wall" class="wallfilter"></td><td>Onbekende muur lvls wegfilteren</td></tr><tr><td><input type="checkbox" name="autoSelectFarmReports" class="reportfilter"></td><td>farm rapportjes automatisch selecteren</td></tr></table><table style="width:300px;float:left;"><tr><th colspan="2">Afstandsfilter</th></tr><tr><td><input type="number" name="min_distance" class="afstandsfilter" style="width:40px"></td><td>Minimale afstand</td></tr><tr><td><input type="number" name="max_distance" class="afstandsfilter" style="width:40px"></td><td>maximale afstand</td></tr><tr><th colspan="2">Grondstoffen filter</th></tr><tr><td colspan="2"><input type="checkbox" name="allGS"> Alle GS gecombineerd <input type="checkbox" name="perGS"> per GS</td></tr><tr class="perGS"><td><input type="number" name="min_hout" class="resourcesfilter" style="width:40px"></td><td>Minimale aantal hout</td></tr><tr class="perGS"><td><input type="number" name="min_leem" class="resourcesfilter" style="width:40px"></td><td>Minimale aantal leem</td></tr><tr class="perGS"><td><input type="number" name="min_ijzer" class="resourcesfilter" style="width:40px"></td><td>Minimale aantal ijzer</td></tr><tr class="allGS"><td><input type="number" name="min_gs" class="resourcesfilter" style="width:40px"></td><td>Minimale aantal grondstoffen</td></tr><tr><th colspan="2">muur filter</th></tr><tr><td><input type="number" name="min_wall" class="wallfilter" style="width:40px"></td><td>Minimale muurlevel</td></tr><tr><td><input type="number" name="max_wall" class="wallfilter" style="width:40px"></td><td>Maximale muurlevel</td></tr></tbody></table><table style="width:300px;"><tbody><tr><th>Automatisch sorteren</th></tr><tr><td><select name="sortby" class="sort"><option name="asc">asc(oplopend)</option><option name="desc">desc(aflopend)</option></select><select name="dur_date" class="sort"><option name="distance">Op afstand</option><option name="date">Op datum</option></select></td></tr><tr><td><input type="checkbox" name="sort_gs" class="filters">op GS sorteren</td></tr><tr><td><input type="checkbox" name="sort_wall" class="filters">op muur sorteren</td></tr></tbody></table><div style="clear:both"></div></div>';
    a.innerHTML += '<div id="AR_HitKeys" style="display:none"><table style="width:300px;float:left;"><tbody><tr><td>A-knop: </td><td><input type="text" name="AR_HitKeyA" id="AR_HitKeyA" class="AR_HitKeys" value="" data-keycode=""/></td></tr><tr><td>B-knop: </td><td><input type="text" name="AR_HitKeyB" id="AR_HitKeyB" class="AR_HitKeys" value="" data-keycode=""/></td></tr><tr><td>C-knop: </td><td><input type="text" name="AR_HitKeyC" id="AR_HitKeyC" class="AR_HitKeys" value="" data-keycode=""/></td></tr><tr><td>volgende dorp: </td><td><input type="text" name="AR_HitKeyNextVillage" id="AR_HitKeyNextVillage" class="AR_HitKeys" value="" data-keycode=""/></td></tr><tr><td>vorige dorp: </td><td><input type="text" name="AR_HitKeyPrevVillage" id="AR_HitKeyPrevVillage" class="AR_HitKeys" value="" data-keycode=""/></td></tr><tr><td>volgende pagina: </td><td><input type="text" name="AR_HitKeyNextPage" id="AR_HitKeyNextPage" class="AR_HitKeys" value="" data-keycode=""/></td></tr><tr><td>vorige pagina: </td><td><input type="text" name="AR_HitKeyPrevPage" id="AR_HitKeyPrevPage" class="AR_HitKeys" value="" data-keycode=""/></td></tr></tbody></table><div style="clear:both"></div></div>';
    a.innerHTML += '<div id="AR_Overig" style="display:none"><table style="width:300px;float:left;"><tbody><tr><td><input type="checkbox" name="groups" id="groups" value=""/></td><td>Van groepen wisselen bij de FA</td></tr><tr><td><input type="checkbox" name="LoadAllPages" value=""/></td><td>Alle pagina`s tegelijk laden</td></tr><tr><td><input type="checkbox" name="StayOnSamePage" value=""/></td><td>Als je naar het vorige/volgende dorp gaat, dan op dezelfde pagina blijven</td></tr></tbody></table><div style="clear:both"></div></div>';
    a.innerHTML += '<div style="color:#7d510f;text-align:right;padding-right:7px;padding-bottom:5px;width:500px;clear:both;"><a id="sluiten" href="javascript:void(0)">sluiten</a></div>';
    if ( settings.gsfilter.per_gs ) {
    $( '.allGS' ).hide();
    } else {
    $( '.perGS' ).hide();
    }var $allGS = $( 'input[name="allGS"]' );
    var $perGS = $( 'input[name="perGS"]' );
    var $allGSClass = $( '.allGS' );
    var $perGSClass = $( '.perGS' );
    $perGS.on( 'change', function () {
    if ( $perGS.is( ':checked' ) ) {
    $allGS.prop('checked', false);
    $perGSClass.show();
    $allGSClass.hide();
    } else {
    $allGS.prop('checked', true);
    $perGSClass.hide();
    $allGSClass.show();
    }
    } );
    $allGS.on( 'change', function () {
    if ( $allGS.is( ':checked' ) ) {
    $perGS.prop('checked', false);
    $perGSClass.hide();
    $allGSClass.show();
    } else {
    $perGS.prop('checked', true);
    $perGSClass.show();
    $allGSClass.hide();
    }
    } );
    for(var key in settings) {
    if($.type(settings[key]) === "boolean" && settings[key] === true) {
    $('input[name=' + key + ']').prop('checked', true);
    } else if($.type(settings[key]) === "array") {
    if(key == "sortby") {
    $('option[name=' + settings[key][0] + ']').prop('selected', true);
    $('option[name=' + settings[key][1] + ']').prop('selected', true);
    } else {
    $('input[name=min_' + key + ']').val(settings[key][0]);
    $('input[name=max_' + key + ']').val(settings[key][1]);
    }
    } else if(key == "gsfilter") {
    if (settings[key].all_gs_combined) {
    $('input[name="allGS"]').prop('checked', 'checked');
    }
    if (settings[key].per_gs) {
    $('input[name="perGS"]').prop('checked', 'checked');
    }
    $('input[name="min_hout"]').val(settings[key].min_hout);
    $('input[name="min_leem"]').val(settings[key].min_leem);
    $('input[name="min_ijzer"]').val(settings[key].min_ijzer);
    $('input[name="min_gs"]').val(settings[key].min_gs);
    if (settings[key].unknown_gs) {
    $('input[name="unknown_gs"]').prop('checked', true);
    }
    } else if(key == "wall") {
    $('input[name="min_wall"]').val(settings[key].min_lvl);
    $('input[name="max_wall"]').val(settings[key].max_lvl);
    
    if (settings[key].unknown_wall) {
    $('input[name="unknown_wall"]').prop('checked', true);
    }
    if (settings[key].wall_sort) {
    $('input[name="sort_wall"]').prop('checked', true);
    }
    } else if(key == "hotkeys") {
    for(var hotkey in settings.hotkeys) {
    if( settings.hotkeys.hasOwnProperty( hotkey ) ) {
    var keyCode = settings.hotkeys[hotkey];
    $("#"+hotkey).val(keyCodeMap[keyCode]).attr('data-keycode', keyCode);
    }
    }
    }
    }
    
    var $FAPackMenu = $(".AR_FAPackMenu");
    $("#AR_filtersFA").on("click", function(){
    if (!$(this).closest('td').hasClass('selected')) {
    $("#AR_Overig, #AR_HitKeys").css('display', 'none');
    $("#Ar_FilterSort").css('display', 'block');
    $FAPackMenu.find(".selected").removeClass("selected");
    $(this).closest('td').addClass("selected");
    }
    });
    $("#AR_hitkeysFA").on("click", function(){
    if (!$(this).closest('td').hasClass('selected')) {
    $("#Ar_FilterSort, #AR_Overig").css('display', 'none');
    $("#AR_HitKeys").css('display', 'block');
    $FAPackMenu.find(".selected").removeClass("selected");
    $(this).closest('td').addClass("selected");
    }
    });
    $("#AR_OverigFA").on("click", function(){
    if (!$(this).closest('td').hasClass('selected')) {
    $("#Ar_FilterSort, #AR_HitKeys").css('display', 'none');
    $("#AR_Overig").css('display', 'block');
    $FAPackMenu.find(".selected").removeClass("selected");
    $(this).closest('td').addClass("selected");
    }
    });
    $(".AR_HitKeys").on('keydown', function(e){
    $(this).val(keyCodeMap[e.which]).attr('data-keycode', e.which);
    });
    
    $("#sluiten").click(function () {
    $("input.filters").each(function () {
    var name = $(this).attr("name");
    if ($(this).is(':checked')) {
    settings[name.toString()] = true;
    } else {
    settings[name.toString()] = false;
    }
    });
    settings.distance[0] = parseFloat($("input.afstandsfilter:first").val());
    settings.distance[1] = parseFloat($("input.afstandsfilter:last").val());
    var keuze = $("select.sort:first option:selected").attr("name").toString();
    var keuze2 = $("select.sort:last option:selected").attr("name").toString();
    settings.sortby = [keuze2, keuze];
    if($("input.overige").is(':checked')) {
    settings.DeleteReports = true;
    } else {
    settings.DeleteReports = false;
    }
    settings.gsfilter.all_gs_combined = $('input[name="allGS"]').is(':checked');
    settings.gsfilter.per_gs = $('input[name="perGS"]').is(':checked');
    settings.gsfilter.min_hout = parseInt($('input[name="min_hout"]').val());
    settings.gsfilter.min_leem = parseInt($('input[name="min_leem"]').val());
    settings.gsfilter.min_ijzer = parseInt($('input[name="min_ijzer"]').val());
    settings.gsfilter.min_gs = parseInt($('input[name="min_gs"]').val());
    settings.gsfilter.unknown_gs = $('input[name="unknown_gs"]').is(':checked');
    settings.autoSelectFarmReports = $('input[name="autoSelectFarmReports"]').is(':checked');
    settings.wall.min_lvl = parseInt($('input[name="min_wall"]').val());
    settings.wall.max_lvl = parseInt($('input[name="max_wall"]').val());
    settings.wall.wall_sort = $('input[name="sort_wall"]').is(':checked');
    settings.wall.unknown_wall = $('input[name="unknown_wall"]').is(':checked');
    settings.hotkeys = {
    "AR_HitKeyA": $("#AR_HitKeyA").attr('data-keycode')*1,
    "AR_HitKeyB": $("#AR_HitKeyB").attr('data-keycode')*1,
    "AR_HitKeyC": $("#AR_HitKeyC").attr('data-keycode')*1,
    "AR_HitKeyNextVillage": $("#AR_HitKeyNextVillage").attr('data-keycode')*1,
    "AR_HitKeyPrevVillage": $("#AR_HitKeyPrevVillage").attr('data-keycode')*1,
    "AR_HitKeyNextPage": $("#AR_HitKeyNextPage").attr('data-keycode')*1,
    "AR_HitKeyPrevPage": $("#AR_HitKeyPrevPage").attr('data-keycode')*1
    };
    settings.groups = $('input[name="groups"]').is(':checked');
    settings.LoadAllPages = $('input[name="LoadAllPages"]').is(':checked');
    settings.StayOnSamePage = $('input[name="StayOnSamePage"]').is(':checked');
    localStorage.setItem('settings', JSON.stringify(settings));
    $("div#FAsettings").remove();
    location.reload();
    });
    });
    if(game_data.screen == "am_farm") {
    if (settings.LoadAllPages) {
    var lastPage = parseInt($("#am_widget_Farm").find(".paged-nav-item").last().text().match(/\d+/));
    for(var i=0; i< lastPage; i++) {
    $.ajax({
    url: document.URL.replace(/page=\d+/, "page=" + i),
    async: false,
    success: function(result) {
    $("#am_widget_Farm").find('tr[class*="report_"]').last().after($(result).find('#am_widget_Farm').find('tr[class*="report_"]'));
    var AR_NavItem = $("#am_widget_Farm").find('.paged-nav-item:contains("' + i + '")');
    if (AR_NavItem.length > -1) {
    AR_NavItem.replaceWith('<strong>' + i + '<strong>');
    }
    }
    });
    }
    }
    $("a.farm_icon_c, a.farm_icon_b, a.farm_icon_a").click(function () {
    if(settings.DeleteReports === true ) {
    $(this).closest('tr').find("img[src*='delete_small.png']").closest('td').find('a').click();
    } else {
    $(this).closest('tr').remove();
    }
    });
    
    document.onkeydown = function(e) {
    switch (e.which) {
    case settings.hotkeys.AR_HitKeyNextVillage:
    if (settings.StayOnSamePage) {
    location.href = document.getElementById("village_switch_right").href;
    } else {
    location.href = document.getElementById("village_switch_right").href.replace(/page=\d+/, "page=0");
    }
    break;
    case settings.hotkeys.AR_HitKeyPrevVillage:
    if (settings.StayOnSamePage) {
    location.href = document.getElementById("village_switch_left").href;
    } else {
    location.href = document.getElementById("village_switch_left").href.replace(/page=\d+/, "page=0");
    }
    break;
    case settings.hotkeys.AR_HitKeyNextPage:
    location.href = document.URL.replace(/page=\d+/, "page=" + (++(document.URL.match(/page=(\d+)/) || [, 0])[1]));
    break;
    case settings.hotkeys.AR_HitKeyPrevPage:
    location.href = document.URL.replace(/page=\d+/, "page=" + --(document.URL.match(/page=(\d+)/) || [, 0])[1]);
    break;
    case settings.hotkeys.AR_HitKeyA:
    $('tr[class*="report_"] .farm_icon_a').first().click();
    break;
    case settings.hotkeys.AR_HitKeyB:
    $('tr[class*="report_"] .farm_icon_b').first().click();
    break;
    case settings.hotkeys.AR_HitKeyC:
    $('tr[class*="report_"] .farm_icon_c').first().click();
    break;
    default:
    break;
    }
    };
    
    $(document).ajaxComplete( function() {
    AR_FA_Filter();
    } );
    
    } else if(game_data.screen == "report") {
    if (settings.autoSelectFarmReports) {
    $("#report_list").find('tr[class*="row_"]').each(function(){
    if ($(this).find('img[src*="farm.png"]').length > 0) {
    $(this).find('input').first().prop("checked",true);
    }
    });
    }
    }
    $(".manager_icon:first").attr("href", $(".manager_icon")[0].href + "&order=" + settings.sortby[0] + "&dir=" + settings.sortby[1] + "&Farm_page=0");
    });