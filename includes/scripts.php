<?php

// include styles and scripts when shortcode is added  
$google_font = 'https://fonts.googleapis.com/css2?family=Roboto+Condensed:wght@400;700&display=swap';
wp_enqueue_style( 'cov__google_font', $google_font, false );

wp_enqueue_style( 'cov__tabulator_styles',  COV_PLUGIN_DIR . '/vendor/tabulator/tabulator_materialize.min.css', array(), filemtime( COV_PLUGIN_PATH . '/vendor/tabulator/tabulator_materialize.min.css' ) );

wp_enqueue_style( 'cov__styles',  COV_PLUGIN_DIR . '/assets/styles.css', array(), filemtime( COV_PLUGIN_PATH . '/assets/styles.css' ) );

wp_enqueue_script( 'cov__vue',  COV_PLUGIN_DIR . '/vendor/vue.min.js', array(), filemtime( COV_PLUGIN_PATH . '/vendor/vue.min.js' ), true );

wp_enqueue_script( 'cov__axios',  COV_PLUGIN_DIR . '/vendor/axios.min.js', array(), filemtime( COV_PLUGIN_PATH . '/vendor/axios.min.js' ), true );

wp_enqueue_script("moment");

wp_enqueue_script( 'cov__fontawesome',  COV_PLUGIN_DIR . '/vendor/fontawesome.min.js', array(), filemtime( COV_PLUGIN_PATH . '/vendor/fontawesome.min.js' ), true );

wp_enqueue_script( 'cov__global',  COV_PLUGIN_DIR . '/components/WidgetGlobal.js', array(), filemtime( COV_PLUGIN_PATH . '/components/WidgetGlobal.js' ), true );

wp_enqueue_script( 'cov__global_wide',  COV_PLUGIN_DIR . '/components/WidgetGlobalWide.js', array(), filemtime( COV_PLUGIN_PATH . '/components/WidgetGlobalWide.js' ), true );

wp_enqueue_script( 'cov__country',  COV_PLUGIN_DIR . '/components/WidgetCountry.js', array(), filemtime( COV_PLUGIN_PATH . '/components/WidgetCountry.js' ), true );
 
wp_enqueue_script( 'cov__chart',  COV_PLUGIN_DIR . '/vendor/Chart.min.js', array(), filemtime( COV_PLUGIN_PATH . '/vendor/Chart.min.js' ), true );

wp_enqueue_script( 'cov__country-chart',  COV_PLUGIN_DIR . '/components/WidgetCountryChart.js', array(), filemtime( COV_PLUGIN_PATH . '/components/WidgetCountryChart.js' ), true );

wp_enqueue_script( 'cov__tabulator',  COV_PLUGIN_DIR . '/vendor/tabulator/tabulator.min.js', array(), filemtime( COV_PLUGIN_PATH . '/vendor/tabulator/tabulator.min.js' ), true );

wp_enqueue_script( 'cov__vue_tabulator',  COV_PLUGIN_DIR . '/vendor/tabulator/vue-tabulator.min.js', array(), filemtime( COV_PLUGIN_PATH . '/vendor/tabulator/vue-tabulator.min.js' ), true );

wp_enqueue_script( 'cov__table',  COV_PLUGIN_DIR . '/components/WidgetTable.js', array(), filemtime( COV_PLUGIN_PATH . '/components/WidgetTable.js' ), true );

wp_enqueue_script( 'cov__app',  COV_PLUGIN_DIR . '/assets/app.js', array(), filemtime( COV_PLUGIN_PATH . '/assets/app.js' ), true );