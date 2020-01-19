javascript:
var lc = $("#units_home #heavy").text();
if(lc > 0)
{
    if($('#plunder_list .farm_icon_a:not(.farm_icon_disabled)').length)
    {
        var lc_req = parseInt($($(".vis")[3]).find("input[name=heavy]")[0].value);
        if(lc >= lc_req && lc_req > 0)
        {
            if($('#plunder_list .farm_icon_a:not(.farm_icon_disabled)').length)
            {
                $('#plunder_list .farm_icon_a:not(.farm_icon_disabled)')[0].click();
            }
            else
            {

                $("#village_switch_right").removeAttr('href');
            }
        }
        else
        {

            $("#village_switch_right").removeAttr('href');
        }
    }
    else
    {

        $("#village_switch_right").removeAttr('href');
    }
}
else
{

    $("#village_switch_right").removeAttr('href');
}
void(0);