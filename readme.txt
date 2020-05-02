=== Corona (COVID-19) Stats ===
Contributors: the-rock, pagup
Tags: corona, covid-19, covid, stats, coronavirus, virus
Requires at least: 4.1
Requires PHP: 5.6
Tested up to: 5.4
Stable tag: 1.0.1
License: GPLv2 or later
License URI: http://www.gnu.org/licenses/gpl-2.0.html

An easy to use Corona (COVID-19) Stats Plugin with powerful features.

== Description ==

This plugins displays Corona (COVID-19) Virus Stats in multiple formats. You can add card with Global Stats, Country Stats, Country Stats with Chart and Table with data for all countries.

Please check preview and available parameters on https://covid19-wp.netlify.app/

**Data Source:** [CSSEGISandData/COVID-19](https://github.com/CSSEGISandData/COVID-19) via [pomber/covid19](https://github.com/pomber/covid19). 

Data copyright 2020 Johns Hopkins University. The data is under [CSSEGISandData/COVID-19](https://github.com/CSSEGISandData/COVID-19) terms of use.

The code for this WordPress plugin is under MIT licensed.

== Installation ==

= Installing manually =

1. Unzip all files to the `/wp-content/plugins/corona-covid-statst` directory
2. Log into WordPress admin and activate the 'Corona (COVID-19) Stats' plugin through the 'Plugins' menu
3. Go to "https://covid19-wp.netlify.app" for Shortcode Generator.

== Frequently Asked Questions ==

= What is source of Data? =
Data is sourced from worldometer.com via Coronavirus-Monitor api (https://rapidapi.com/astsiatsko/api/coronavirus-monitor).

= How often data updates? =
We update static endpoints every minute (cases_by_country, etc). Endpoints that persists data into DB, we update every 10 minutes. (History, etc) (source: https://rapidapi.com/astsiatsko/api/coronavirus-monitor/discussions/15039/How-often-data-updates)

== Screenshots ==

1. Corona (COVID-19) Stats
2. Corona (COVID-19) Stats

== Changelog ==

= 1.0.0 =
* Initial release.