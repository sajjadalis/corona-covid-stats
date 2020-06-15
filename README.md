## Corona (COVID-19) Live Stats WordPress Plugin

```
=== Corona (COVID-19) Live Stats ===
Contributors: the-rock, pagup
Tags: corona, covid-19, covid, stats, coronavirus, virus
Requires at least: 4.1
Requires PHP: 5.6
Tested up to: 5.4
Stable tag: 1.0.2
```

This plugins displays Corona (COVID-19) Live Stats in multiple formats. You can add card with Global Stats, Country Stats, Country Stats with Chart and Table with data for all countries.

### USAGE

Please check demo and available parameters/settings on [https://covid19-wp.netlify.app/](https://covid19-wp.netlify.app/)

Here is the list of basic shortcodes.

**COVID-19 Global Stats Card**
[covid-widget type="global-card"]

**COVID-19 Global Stats Wide (full width)**
[covid-widget type="global-wide" bgcolor="#043785" textcolor="#ffffff"]

**COVID-19 Single Country Stats Card**
[covid-widget type="country-card" country="US" bgcolor="#043785"]

**Country Card with Chart Shortcode**
[covid-widget type="country-chart" country="US" charttype="bar"]
*chart types: bar, horizontalBar, doughnut,  line, radar, polarArea*

**COVID-19 Affected Countries Data Table**
[covid-widget type="table"]

**Note**: You must have to use country name as defined in data source. Please check country name list on [https://covid19-wp.netlify.app/](https://covid19-wp.netlify.app/). e.g: "United States" will not work but "US" or "USA" will work. Similarly "South Korea" won't work. This is because the data source listed country names like` that. You have to use [shortcode generator](https://covid19-wp.netlify.app/), select country from drop-down and then copy full shortcode or copy defined country name inside your shortcode.

**Data Source:** [NovelCOVID/API](https://github.com/NovelCOVID/API). Documentation can be found [here](https://disease.sh/docs/). Please check Privacy Policy [here](https://github.com/NovelCOVID/API/blob/master/privacy.md) and License [here](https://github.com/NovelCOVID/API/blob/master/LICENSE)

The code for this WordPress plugin is under MIT licensed.

### Installation

**Installing manually**

1. Download Plugin in Zip format 
2. Go to WordPress admin > Plugins > Add New
3. Upload Zip file and Activate Plugin
4. Go to [https://covid19-wp.netlify.app](https://covid19-wp.netlify.app) for Shortcode Generator.

OR

1. Clone this repo or Unzip all files to the `/wp-content/plugins`. Directory strucutre should look like `/wp-content/plugins/corona-covid-stats`
2. Log into WordPress admin and activate the 'Corona (COVID-19) Stats' plugin through the 'Plugins' menu
3. Go to [https://covid19-wp.netlify.app](https://covid19-wp.netlify.app) for Shortcode Generator.


This is a open source free plugin. You can do whatever you want with it. And you can use this service as is. I try my best to ensure stability. If there is any problem or need help. Please post on issues.

### Changelog

**1.0.0**
* Initial release with rapidapi source.

**1.0.1**
* Changed data source to https://github.com/CSSEGISandData/COVID-19

**1.0.2**
* Changed data source to NovelCOVID/API. 
* Added Critical and Cases Per Million to Global, Countries Stats.

**1.0.3**
* Fixed link for rating notice

**1.0.4**
* 🐛 FIX: Width issue and label issue for all widgets