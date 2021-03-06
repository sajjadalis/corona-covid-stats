<?php 

function covid_widget_shortcode( $atts ) {
    // Attributes
    $atts = shortcode_atts(
        array(
            'type' => 'global-card',
            'country' => null,
            'charttype' => 'bar',
            'bgcolor' => '#043785',
            'textcolor' => '#ffffff',
            'width' => '450px',
            'cases' => true,
            'deaths' => true,
            'recovered' => true,
            'critical' => true,
            'active' => true,
            'casesperm' => true,
            'labeltitle' => 'Corona (COVID-19)',
            'labelglobal' => 'Global Stats',
            'labelcases' => 'Cases',
            'labeldeaths' => 'Deaths',
            'labelrecovered' => 'Recovered',
            'labelcritical' => 'Critical',
            'labelactive' => 'Active Cases',
            'labelcasesperm' => 'Cases / 1M',
            'labelcaseswide' => 'Confirmed Cases',
            'labeldeathswide' => 'Confirmed Deaths',
            'labelrecoveredwide' => 'Total Recovered',
            'placeholder' => 'Filter Data by Country Name',
            'height' => '550px'
        ),
        $atts,
        'covid-widget'
    );

    $type = $atts['type'];
    $country = $atts['country'];
    $bgcolor = $atts['bgcolor'];
    $textcolor = $atts['textcolor'];
    $width = $atts['width'];
    $charttype = $atts['charttype'];
    $cases = $atts['cases'];
    $deaths = $atts['deaths'];
    $critical = $atts['critical'];
    $active = $atts['active'];
    $casesperm = $atts['casesperm'];
    $recovered = $atts['recovered'];
    $labeltitle = $atts['labeltitle'];
    $labelglobal = $atts['labelglobal'];
    $labelcases = $atts['labelcases'];
    $labeldeaths = $atts['labeldeaths'];
    $labelrecovered = $atts['labelrecovered'];
    $labelcritical = $atts['labelcritical'];
    $labelactive = $atts['labelactive'];
    $labelcasesperm = $atts['labelcasesperm'];

    $labelcaseswide = $atts['labelcaseswide'];
    $labeldeathswide = $atts['labeldeathswide'];
    $labelrecoveredwide = $atts['labelrecoveredwide'];

    // $placeholder = $atts['placeholder'];
    // $height = $atts['height'];

    // include scripts/styles
   require dirname( __FILE__ ) .'/scripts.php';

    $rand = rand();

    if ($type == 'global-card') {  require dirname( __FILE__ ) .'/widgets/global-card.php'; }

    elseif ($type == 'global-wide') {  require dirname( __FILE__ ) .'/widgets/global-wide.php'; }

    elseif ($type == 'country-card') {  require dirname( __FILE__ ) .'/widgets/country-card.php'; }

    elseif ($type == 'country-chart') { require dirname( __FILE__ ) .'/widgets/country-chart.php'; }

    elseif ($type == 'table') { require dirname( __FILE__ ) .'/widgets/table.php'; }

    else { $output = 'Error: please define a correct widget type'; }

    return $output;

}
add_shortcode( 'covid-widget', 'covid_widget_shortcode' );