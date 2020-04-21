<?php 

if(!empty($country)) {

    $output = "<div id='app-$rand' class='cov-container'><country-chart country='$country' charttype='$charttype' cases='$cases' deaths='$deaths' recovered='$recovered' active='$active' critical='$critical' casesperm='$casesperm' labeltitle='$labeltitle' labelglobal='$labelglobal' labelcases='$labelcases' labeldeaths='$labeldeaths' labelrecovered='$labelrecovered' labelactive='$labelactive' labelcritical='$labelcritical' labelcasesperm='$labelcasesperm'></country-chart></div>";

} else {

    $output = "Error: please define country parameter.<br />Please visit <strong>https://covid19-wp.netlify.app/shortcode-generator</strong> to get correct country name format in order to retreive data";

}