<?php 

if(!empty($country)) {

    $output = "<div id='app-$rand' class='cov-container'><country-chart country='$country' charttype='$charttype' cardwidth='$width' cases='$cases' deaths='$deaths' recovered='$recovered' active='$active' labeltitle='$labeltitle' labelglobal='$labelglobal' labelcases='$labelcases' labeldeaths='$labeldeaths' labelrecovered='$labelrecovered' labelcritical='$labelcritical' labelactive='$labelactive' labelcasesperm='$labelcasesperm'></country-chart></div>";

} else {

    $output = "Error: please define country parameter.<br />Please visit <strong>https://covid19-wp.netlify.app/shortcode-generator</strong> to get correct country name format in order to retreive data";

}