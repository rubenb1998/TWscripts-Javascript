javascript:
 var MarketMain = function () {
    if ("overview_villages" == game_data.screen && "prod" == game_data.mode) {
        var c = document.URL.split("/")[2], d = "0" != game_data.player.sitter, b = "", a = $("#production_table").find(".nowrap"), g = a.length;
        a.each(function (a, d) {
            var e = $(d), c = e.find("a:first"), h = e.find("td:eq(3) > span"), f = e.find("td:eq(6)").text().split("/"), l = $.trim(c.text()), m = c.attr("href").match(/village=(\d+)/)[1], c = c.text().match(/\d{1,3}\|\d{1,3}/)[0], n = h.eq(0).text().replace(".", ""), p = h.eq(1).text().replace(".", ""), h = h.eq(2).text().replace(".", ""), q = e.find("td:eq(5)").text().split("/")[0], e = e.find("td:eq(4)").text(), f = 24E3 < f[1] ? f[0] - (f[1] - 24E3) : f[0];
            b += l + "^ ";
            b += m + "^ ";
            b += c + "^ ";
            b += n + "^ ";
            b += p + "^ ";
            b += h + "^ ";
            b += q + "^ ";
            b += e + "^ ";
            b += f;
            a != g - 1 && (b += "&@& ");
        });
        a = '<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd"><html xmlns="http://www.w3.org/1999/xhtml"><head><title>Extreme TW Resource Balancer Submission Page -- Version 4a</title><link rel="stylesheet" type="text/css" href="http://www.extremetw.com/main.css" /></head><body onload=window.focus() style="overflow:visible"> <p><p><p><table class="main" width="950" align="center" cellspacing="5"><tr><td><p></td></tr><tr><td width="50%" valign="top"><table><tr><td>';
        a += '<form name=ResourceBalanceForm action="http://www.extremetw.com/cgi-bin/ResourceBalancerv4a.py" method="post"><textarea name="input" rows="14" cols="60">' + b + "</textarea></td></tr><tr><td>";
        a += '<br><input type="hidden"name="server" value="' + c + '"><input type="submit" value="Submit"/><b> <--Press submit to see your results!</b></tr></td>';
        d && (a += '<input type="hidden" name="sitter" value="t=' + game_data.player.id + '&">');
        a += '<tr><td valign="center">\x3c!-- Beginning of Project Wonderful ad code: --\x3e\x3c!-- Ad box ID: 49369 --\x3e<map name="admap49369" id="admap49369"><area href="http://www.projectwonderful.com/out_nojs.php?r=0&c=0&id=49369&type=7" shape="rect" coords="0,0,300,250" title="" alt="" target="_blank" /></map><table cellpadding="0" border="0" cellspacing="0" width="300" bgcolor="#ffffff"><tr><td><img src="http://www.projectwonderful.com/nojs.php?id=49369&type=7" width="300" height="250" usemap="#admap49369" border="0" alt="" /></td></tr></table>\x3c!-- End of Project Wonderful ad code. --\x3e</tr></td>';
        a += '</table></td><td width="50%" valign="top"><table><tr><td><h3><u>Optional</u> Advanced Settings:</h3></td></tr>';
        a += "<tr><td><b><u>Maximum Merchant Travel Distance:</u></b></td></tr>";
        a += '<tr><td><select id="maxFields" name="maxFields"><option value="0">Unlimited</option><option value="25"> < 25 Fields </option><option value="50"> < 50 Fields </option><option value="100"> < 100 Fields </option><option value="200"> < 200 Fields </option><option value="300"> < 300 Fields </option><option value="500"> < 500 Fields </option></td></tr>';
        a += "<tr><td>Use this optional setting to limit how far your merchants will travel.  Please note this can require you to send more groups of merchants than you are used to.  The unlimited option minimizes how many groups of merchants you have to send.</td></tr>";
        a += "<tr><td><b><u>Send Extra Resources:</u></b></td></tr>";
        a += '<tr><td><input type="checkbox" name="extra" value="True"/> This optional setting sends extra resources from villages with 24k farm population to villages with less than 22k farm population. This is ideal for sending extra resources to villages under construction or recruiting troops **This feature currently negates all custom horde settings.**';
        a += "<tr><td><b><u>Horde Resources:</u></b></td></tr>";
        a += "<tr><td>These optional settings allow you to keep (horde) a minimum number of each resource of your choosing, in villages with a surplus of that resource.</td></tr>";
        a += '<tr><td><select id="wood_select" class="wood_select" name="wood"><option value="0" >Do not horde Wood</option><option value="50000" >Horde at least 50k Wood</option><option value="100000" >Horde at least 100k Wood</option><option value="150000" >Horde at least 150k Wood</option><option value="200000" >Horde at least 200k Wood</option><option value="250000" >Horde at least 250k Wood</option><option value="300000" >Horde at least 300k Wood</option><option value="350000">Horde at least 350k Wood</option><option value="400000">Horde ALL Wood</option></select></td></tr>';
        a += '<tr><td><select id="clay_select" class="clay_select" name="clay"><option value="0" >Do not horde Clay</option><option value="50000" >Horde at least 50k Clay</option>\t<option value="100000" >Horde at least 100k Clay</option><option value="150000" >Horde at least 150k Clay</option><option value="200000" >Horde at least 200k Clay</option><option value="250000" >Horde at least 250k Clay</option><option value="300000" >Horde at least 300k Clay</option><option value="350000">Horde at least 350k Clay</option><option value="400000">Horde ALL Clay</option></select></td></tr>';
        a += '<tr><td><select id="iron_select" class="iron_select" name="iron">\t<option value="0" >Do not horde Iron</option><option value="50000" >Horde at least 50k Iron</option><option value="100000" >Horde at least 100k Iron</option><option value="150000" >Horde at least 150k Iron</option><option value="200000" >Horde at least 200k Iron</option><option value="250000" >Horde at least 250k Iron</option><option value="300000" >Horde at least 300k Iron</option><option value="350000">Horde at least 350k Iron</option><option value="400000">Horde ALL Iron</option></select></td></tr>';
        a += '<tr><td><b>Why would I use these "horde" settings?</b></td></tr><tr><td><b>1. </b>Some players only want to balance a single resource, for example clay.  In that case the player would select "Horde ALL" for wood and iron, and leave the clay setting unchanged. The resource balancer would then only show results to balance your clay.</td></tr>';
        a += '<tr><td><b>2. </b>Another player might want to always keep at least 250,000 iron in his villages that can, instead of sending the excess iron to other villages that need it. In that case the player would select "Horde at least 250k iron" and leave the wood and clay settings unchanged.</form></td></tr>';
        a += '<tr><td><h3><u>Upcoming</u> Advanced Features!</h3></td></tr><tr><td>We are currently working on a new optional advanced setting that will allow you to balance based upon coin/packet ratio, and on another feature that will let you access the resource balancing plan for one week via a unique url. Please post feedback and suggestions here: <a href="http://forum.tribalwars.net/showthread.php?t=172320" TARGET="_blank">http://forum.tribalwars.net/showthread.php?t=172320</a> <p><p>**Currently villages with more than 23950 farm population will have their resources balanced at 85% of your village average.  Villages with less than 22k farm population will begin to receive extra resources on a sliding scale depending on how empty the village farm is up to 200% of your village average.</td></td></table></td></tr></table>';
        a += "</a></p> </body></html>";
        c = window.open("", "name");
        c.document.write(a);
        c.document.close();
    }
    else
        "overview_villages" == game_data.screen && window.alert("Because the resource balancer isn't sure if you are on the production overview, you're being redirected so we will be sure!"), window.location.assign(game_data.link_base_pure + "overview_villages&mode=prod");
};
function getGameDoc(c) {
    var d = c.document; if (!d.URL.match("game.php"))
        for (var b = 0; b < c.frames.length; b++)
            c.frames[b].document.URL.match("game.php") && (d = c.frames[b].document); return d;
}
doc = getGameDoc(window);
function FillRes() {
    function c(a) { a = parseInt(a, 10); isNaN(a) && (a = 0); return a; }
    var d = doc.forms[0], b = c(d.wood.value), a = c(d.stone.value), g = c(d.iron.value);
    if (!(0 < b + a + g)) {
        for (var k = doc.URL.split("&"), j = 0; j < k.length; j++) {
            var e = k[j].split("=");
            2 == e.length && ("wood" == e[0] ? b = parseInt(e[1]) : "clay" == e[0] ? a = parseInt(e[1]) : "iron" == e[0] && (g = parseInt(e[1])));
        }
        insertNumber(d.wood, b);
        insertNumber(d.stone, a);
        insertNumber(d.iron, g);
    }
    d = d.getElementsByTagName("input");
    for (b = 0; b < d.length; b++)
        if (-1 != d[b].value.indexOf("OK")) {
            d[b].click();
            break;
        }
}
doc.URL.match(/clay=/) || doc.URL.match(/confirm_send/) ? FillRes() : MarketMain();
