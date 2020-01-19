javascript:

/* Instellingen */
// Maximale looptijd van de rooftochten voor elk soort dorp uitgedrukt in uren
var runtimes = {
    'off' : 1,
    'def': 1
};

// De eenheden die gebruikt mogen worden om te versturen met de nodige informatie (haul = hoe veel gs een eenheid kan dragen, type = off / def)
var    units = {
    'sword': {'haul': 15, 'type': 'def'},
    'spear': {'haul': 25, 'type': 'def'},
    'axe': {'haul': 10, 'type': 'off'},
    'archer': {'haul': 10, 'type': 'def'},
    'marcher': {'haul':  50, 'type': 'off'},
    'heavy': {'haul': 50, 'type': 'def'},
    'light': {'haul': 80, 'type': 'off'}
};
/* Einde Instellingen */

var $content = $('#scavenge_screen');
if ($content.length > 0) {
        var $btns = $content.find('.btn-default').not('.btn-disabled, .unlock-button');
        var    haul = 0;
        var type = {'off': 0, 'def': 0};

        for (var prop in units) {
            var amount = parseInt($content.find('.units-entry-all[data-unit="' + prop + '"]').text().match(/\d+/));

            haul = haul + parseInt(amount * units[prop].haul);
            type[units[prop].type] = type[units[prop].type] + amount;
        }

        if ($btns.length > 0 && haul > 0) {
            var $btn = $btns.last();
            var current = $btn.closest('.scavenge-option').find('.title').text().trim();
            var scavengeObject = JSON.parse($('html').find('script:contains("ScavengeScreen")').html().match(/\{.*\:\{.*\:.*\}\}/g)[1]);
            var scavengeIndex = {'Flegmatische  Fielt': '1', 'Bescheiden Bandieten': '2', 'Slimme Speurders': '3', 'Reuze Rovers': '4'};
            var scavangeInfo = scavengeObject[scavengeIndex[current]];
            var troop_type = (type.off > type.def) ? 'off' : 'def';
            var runtime = runtimes[troop_type] * 60 * 60;
            var loot = Math.pow(Math.pow(((runtime / scavangeInfo.duration_factor) - scavangeInfo.duration_initial_seconds), (1 / scavangeInfo.duration_exponent)) / 100, 1/2) / scavangeInfo.loot_factor;
            var send = 0;

            for (var prop in units) {
                var ui = $('.unitsInput[name="' + prop + '"]');
                var needed = Math.round(loot / units[prop].haul);
                var max = parseInt($content.find('.units-entry-all[data-unit="' + prop + '"]').text().match(/\d+/));

                if (needed > max) {
                    ui.val(max).trigger('change');
                    loot = loot - (max * units[prop].haul);
                    send = send + max;
                } else {
                    ui.val(needed).trigger('change');
                    send = send + needed;
                    break;
                }
            }

            if (send >= 10) {
                $btn.trigger('click');
            } else {
                $('.arrowRight, .groupRight').trigger('click');
            }
        } else {
            $('.arrowRight, .groupRight').trigger('click');
        }
} else {
    location.href = game_data.link_base_pure + 'place&mode=scavenge';
}
void(0);