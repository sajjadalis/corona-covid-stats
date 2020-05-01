<?php
/*
* Plugin Name: Corona (COVID-19) Stats
* Description: Better-Robots.txt plugin helps you boosting your website indexation and your ranking by adding specific instructions in your robots.txt
* Author: Sajjad Ali
* Version: 1.0.1
* Author URI: https://covid19-wp.netlify.com/
* Text Domain: corona-covid-stats
* Domain Path: /languages/
*/

if ( ! defined( 'ABSPATH' ) ) {
    exit;
}

if ( !defined('COV_PLUGIN_DIR') ) {
    define( 'COV_PLUGIN_DIR', plugins_url('', __FILE__ ) );
}

if ( !defined('COV_PLUGIN_PATH') ) {
    define( 'COV_PLUGIN_PATH', plugin_dir_path(__FILE__ ) );
}

class COV_Stats {

    public function __construct() {
        //plugin settings
        $plugin = plugin_basename( __FILE__ );
        if ( is_admin() )
            add_filter( "plugin_action_links_$plugin", array( &$this, 'setting_link' ) );
    }// end function

    // quick setting link in plugin section
    public function setting_link($links) {
        $settings_link = '<a href="https://covid19-wp.netlify.app/" target="_blank">Settings & Shortcode Generator</a>';
        array_unshift( $links, $settings_link );
        return $links;
    }// end function
}

$cov_stats = new COV_Stats;
/*-----------------------------------------
                Shortcoded
------------------------------------------*/
include_once COV_PLUGIN_PATH .'/includes/covid-widget.php';

/*-----------------------------------------
            Text Domain Setup
------------------------------------------*/
function cov__textdomain() {
    load_plugin_textdomain( 'corona-covid-stats', false, basename( dirname( __FILE__ ) ) . '/languages' );
}
add_action( 'init', 'cov__textdomain' );

if ( is_admin() ) {

    include_once COV_PLUGIN_PATH . '/includes/notices.php';
    require __DIR__ . '/vendor/persist-admin-notices-dismissal/persist-admin-notices-dismissal.php';
    add_action( 'admin_init', array( 'PAnD', 'init' ) );
}

function cov__styles() {
    $google_font = 'https://fonts.googleapis.com/css2?family=Roboto+Condensed:wght@400;700&display=swap';
    wp_register_style( 'cov__styles_font',  $google_font );
    wp_enqueue_style( 'cov__styles_font' );

    wp_register_style( 'cov__styles_admin',  COV_PLUGIN_DIR . '/assets/styles-admin.css', array(), filemtime( COV_PLUGIN_PATH . '/assets/styles-admin.css' ) );
    wp_enqueue_style( 'cov__styles_admin' );
}

add_action( 'admin_enqueue_scripts', 'cov__styles' );