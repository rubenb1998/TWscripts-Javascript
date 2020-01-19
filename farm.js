javascript:
var lc = $("#units_home #light").text();
if(lc > 0)
{
    if($('#plunder_list .farm_icon_b:not(.farm_icon_disabled)').length)
    {
        var lc_req = parseInt($($(".vis")[3]).find("input[name=light]")[0].value);
        if(lc >= lc_req && lc_req > 0)
        {
            if($('#plunder_list .farm_icon_b:not(.farm_icon_disabled)').length)
            {
                $('#plunder_list .farm_icon_b:not(.farm_icon_disabled)')[0].click();
            }
            else
            {

            }
        }
        else
        {

        }
    }
    else
    {

    }
}
else
{

}
void(0);