<?php

function cov19__active() {
      if ( ! PAnD::is_admin_notice_active( 'cov-active-3' ) ) {
		  return;
	   }

    ?>
    <div data-dismissible="cov-active-3" class="notice cov-notice cov-shortcode notice-success is-dismissible">
        <div class="col-left"><h2>CORONA (COVID-19) STATS PLUGIN IS ACTIVE</h2></div>
        <div class="col-right"><a href="https://covid19-wp.netlify.app/" class="cov-btn" target="_blank">GENERATE SHORTCODE</a></div>
    </div>

        <?php
    }
    
function cov19__notice_rate()
{
    if ( !PAnD::is_admin_notice_active( 'cov-rating-30' ) ) {
        return;
    }
    ?>
    
    <div data-dismissible="cov-rating-30" class="notice cov-notice notice-success is-dismissible">
        <p class="cov-p"><?php 
    $rating_url = "https://wordpress.org/support/plugin/corona-covid-stats/reviews/?rate=5#new-post";
    $show_support = sprintf( wp_kses( __( 'Show support for Corona (COVID-19) Stats Plugin with a 5-star rating » <a href="%s" target="_blank">Click here</a>', 'cov' ), array(
        'a' => array(
        'href'   => array(),
        'target' => array(),
    ),
    ) ), esc_url( $rating_url ) );
    echo  $show_support ;
    ?></p>
            </div>
    <?php 
}

add_action( 'admin_init', array( 'PAnD', 'init' ) );
add_action( 'admin_notices', 'cov19__active' );
add_action( 'admin_notices', 'cov19__notice_rate' );
// end free only