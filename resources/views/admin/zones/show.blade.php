@inject('request', 'Illuminate\Http\Request')
@extends('layouts.app')

@section('content')


<script src="{{ asset('js/highcharts.js') }}"></script>
<script src="{{ asset('js/data.js') }}"></script>


<div style="background:white; border-top:1px solid rgb(234, 235, 235)" class="content">
  <input type="hidden" name="csrftoken" value="{{csrf_token()}}" >
    <div class="container">
      <div class="row">
          <div class="col-sm-8">
            <div class="controls">

              <a id="day" href="#">24 Hours</a>
              <a id="week" href="#">7 Days</a>
              <a id="month" href="#">30 Days</a>


            </div>
              <div id='loading' style=" display:none;">Loading</div>
            <div id="charts" class="charts">

            </div>
            <style media="screen">

                        .chart {
    min-width: 320px;

    height: 120px;
    margin: 0 auto;
}
.highcharts-xaxis-grid .highcharts-grid-line {
	stroke-width: 1px;
	stroke: #eee;
}
.highcharts-yaxis-grid .highcharts-grid-line {
	stroke-width: 0px;
	stroke: #d8d8d8;
}

.quickSettings a
{
  display: block;
  border-bottom: solid rgb(234, 235, 235) 1px;
  padding: 10px 0px;
}
.quickSettings .row
{
  border-bottom: solid rgb(234, 235, 235) 1px;
  padding: 10px 0px;
}
</style>
            <script type="text/javascript">
            /*
The purpose of this demo is to demonstrate how multiple charts on the same page
can be linked through DOM and Highcharts events and API methods. It takes a
standard Highcharts config with a small variation for each data set, and a
mouse/touch event handler to bind the charts together.
*/



/**
* In order to synchronize tooltips and crosshairs, override the
* built-in events with handlers defined on the parent element.
*/
['mousemove', 'touchmove', 'touchstart'].forEach(function (eventType) {
  document.getElementById('charts').addEventListener(
      eventType,
      function (e) {
          var chart,
              point,
              i,
              event;

          for (i = 0; i < Highcharts.charts.length; i = i + 1) {
              chart = Highcharts.charts[i];
              // Find coordinates within the chart
              event = chart.pointer.normalize(e);
              // Get the hovered point
              point = chart.series[0].searchPoint(event, true);

              if (point) {
                  point.highlight(e);
              }
          }
      }
  );
});

/**
* Override the reset function, we don't need to hide the tooltips and
* crosshairs.
*/
Highcharts.Pointer.prototype.reset = function () {
  return undefined;
};

/**
* Highlight a point by showing tooltip, setting hover state and draw crosshair
*/
Highcharts.Point.prototype.highlight = function (event) {
  event = this.series.chart.pointer.normalize(event);
  this.onMouseOver(); // Show the hover marker
  this.series.chart.tooltip.refresh(this); // Show the tooltip
  this.series.chart.xAxis[0].drawCrosshair(event, this); // Show the crosshair
};

/**
* Synchronize zooming through the setExtremes event handler.
*/
function syncExtremes(e) {
  var thisChart = this.chart;

  if (e.trigger !== 'syncExtremes') { // Prevent feedback loop
      Highcharts.each(Highcharts.charts, function (chart) {
          if (chart !== thisChart) {
              if (chart.xAxis[0].setExtremes) { // It is null while updating
                  chart.xAxis[0].setExtremes(
                      e.min,
                      e.max,
                      undefined,
                      false,
                      { trigger: 'syncExtremes' }
                  );
              }
          }
      });
  }
}

// Get the data. The contents of the data file can be viewed at
Highcharts.ajax({
  url: '{{ route('admin.analytics.json', ['zone' => $zone->name]) }}',
  dataType: 'text',
  success: function (activity) {

      activity = JSON.parse(activity);
      activity.datasets.forEach(function (dataset, i) {

          // Add X values
          dataset.data = Highcharts.map(dataset.data, function (val, j) {
              return [activity.xData[j], val];
          });

          var chartDiv = document.createElement('div');
          chartDiv.className = 'chart col-sm-10';

          var chartRow = document.createElement('div');
          chartRow.className = 'row no-gutters';

          document.getElementById('charts').appendChild(chartRow);
          document.getElementById('charts').lastChild.innerHTML="<div class='col-sm-2'>"+dataset.html+"</div>";
          document.getElementById('charts').lastChild.appendChild(chartDiv);

          Highcharts.chart(chartDiv, {
              chart: {
                  marginLeft: 40, // Keep all charts left aligned
                  spacingTop: 20,
                  spacingBottom: 20
              },
              title: {
                  text: dataset.name,
                  align: 'left',
                  margin: 0,
                  x: 30
              },
              credits: {
                  enabled: false
              },
              legend: {
                  enabled: false
              },
              xAxis: {
                  crosshair: true,
                  events: {
                      setExtremes: syncExtremes
                  },
                  labels: {
                      format: ' '
                  },
                  tickPixelInterval: 15,

              },
              yAxis: {
                labels: {
                    format: ' '
                },
                  title: {
                      text: null
                  },

              },


              tooltip: {

    borderRadius: 10,
    borderWidth: 0
},
              series: [{
                  data: dataset.data,
                  name: dataset.name,
                  type: dataset.type,
                  color: "#7cb7de",
                   lineWidth: 1,
                  fillOpacity: 0.3,
                  tooltip: {
                      valueSuffix: ' ' + dataset.unit
                  }
              }]
          });
      });
  }
});


function syncExtremest(e) {
  var thisChart = this.chart;

  if (e.trigger !== 'syncExtremes') { // Prevent feedback loop
      Highcharts.each(Highcharts.charts, function (chart) {
          if (chart !== thisChart) {
              if (chart.xAxis[0].setExtremes) { // It is null while updating
                  chart.xAxis[0].setExtremes(
                      e.min,
                      e.max,
                      undefined,
                      false,
                      { trigger: 'syncExtremes' }
                  );
              }
          }
      });
  }
}


$(document).ready(function(){

    $(".controls a").click(function(){
      if($(this).attr('id')=="day")
      {
        minutes=1440;
      }
      else if($(this).attr('id')=="week")
      {
        minutes=10080;
      }
      else if($(this).attr('id')=="month")
      {
        minutes=43200;
      }

      $("#loading").show();
      $("#charts").html("");
      Highcharts.ajax({
      url: '{{ route('admin.analytics.json', ['zone' => $zone->name]) }}?minutes='+minutes,
        dataType: 'text',
        success: function (activity) {

            activity = JSON.parse(activity);
            activity.datasets.forEach(function (dataset, i) {

                // Add X values
                dataset.data = Highcharts.map(dataset.data, function (val, j) {
                    return [activity.xData[j], val];
                });

                var chartDiv = document.createElement('div');
                chartDiv.className = 'chart col-sm-10';

                var chartRow = document.createElement('div');
                chartRow.className = 'row no-gutters';

                document.getElementById('charts').appendChild(chartRow);
                document.getElementById('charts').lastChild.innerHTML="<div class='col-sm-2'>"+dataset.html+"</div>";
                document.getElementById('charts').lastChild.appendChild(chartDiv);

                Highcharts.chart(chartDiv, {
                    chart: {
                        marginLeft: 40, // Keep all charts left aligned
                        spacingTop: 20,
                        spacingBottom: 20
                    },
                    title: {
                        text: dataset.name,
                        align: 'left',
                        margin: 0,
                        x: 30
                    },
                    credits: {
                        enabled: false
                    },
                    legend: {
                        enabled: false
                    },
                    xAxis: {
                        crosshair: true,
                        events: {
                            setExtremes: syncExtremes
                        },
                        labels: {
                            format: ' '
                        },
                        tickPixelInterval: 15,

                    },
                    yAxis: {
                      labels: {
                          format: ' '
                      },
                        title: {
                            text: null
                        },

                    },


                    tooltip: {

          borderRadius: 10,
          borderWidth: 0
      },
                    series: [{
                        data: dataset.data,
                        name: dataset.name,
                        type: dataset.type,
                        color: "#7cb7de",
                         lineWidth: 1,
                        fillOpacity: 0.3,
                        tooltip: {
                            valueSuffix: ' ' + dataset.unit
                        }
                    }]
                });
            });

            $("#loading").hide();
        }
      });



    });
});

Highcharts.ajax({
  url: '{{ route('admin.analytics.json', ['zone' => $zone->name]) }}',
  dataType: 'text',
  success: function (activity) {

      activity = JSON.parse(activity);
      activity.datasets.forEach(function (dataset, i) {

          // Add X values
          dataset.data = Highcharts.map(dataset.data, function (val, j) {
              return [activity.xData[j], val];
          });

          var chartDiv = document.createElement('div');
          chartDiv.className = 'chart col-sm-10';

          var chartRow = document.createElement('div');
          chartRow.className = 'row no-gutters';

          document.getElementById('charts').appendChild(chartRow);
          document.getElementById('charts').lastChild.innerHTML="<div class='col-sm-2'>"+dataset.html+"</div>";
          document.getElementById('charts').lastChild.appendChild(chartDiv);

          Highcharts.chart(chartDiv, {
              chart: {
                  marginLeft: 40, // Keep all charts left aligned
                  spacingTop: 20,
                  spacingBottom: 20
              },
              title: {
                  text: dataset.name,
                  align: 'left',
                  margin: 0,
                  x: 30
              },
              credits: {
                  enabled: false
              },
              legend: {
                  enabled: false
              },
              xAxis: {
                  crosshair: true,
                  events: {
                      setExtremes: syncExtremes
                  },
                  labels: {
                      format: ' '
                  },
                  tickPixelInterval: 15,

              },
              yAxis: {
                labels: {
                    format: ' '
                },
                  title: {
                      text: null
                  },

              },


              tooltip: {

    borderRadius: 10,
    borderWidth: 0
},
              series: [{
                  data: dataset.data,
                  name: dataset.name,
                  type: dataset.type,
                  color: "#7cb7de",
                   lineWidth: 1,
                  fillOpacity: 0.3,
                  tooltip: {
                      valueSuffix: ' ' + dataset.unit
                  }
              }]
          });
      });
  }
});
            </script>
            <div class="row">
                <div class="col-sm-4">
                  <h4>Security</h4>
                  <div class="">
                    Encrypt traffic to and from your website <a href="crypto">SSL settings</a>

                  </div>
                  <div class="">
                    Filter out illegitimate traffic <a href="firewall">Firewall settings</a>

                  </div>
                </div>

                <div class="col-sm-4">
                  <h4>Performance</h4>
                  <div class="">
                    Improve your website’s performance  <a href="caching">Cache settings</a>

                  </div>

                </div>


                <div class="col-sm-4">
                  <h4>IP Settings</h4>
                  <div class="">

                    Whitelist IPs for Cloudflare and common services  <a href="firewall">Learn more</a>

                  </div>
                  <div class="">
                    Whitelist IPs for Cloudflare and common services  <a href="firewall">Learn more</a>
                  </div>
                </div>
            </div>
          </div>
          <div class="col-sm-4">
              <h4>Quick Actions</h4>
              <div class="quickSettings">
                <a href="cache">Purge Cache</a>
                <a href="dns">DNS Settings</a>
                <div class="row ">
                  <div class="col-sm-8">
                    <h5>Under Attack Mode</h5>
                    <span>Show visitors a JavaScript challenge when visiting your site.</span>

                  </div>
                  <div class="col-sm-2">
                    <input class="changeableSettingToggle" setting="security_level" val-on="under_attack" val-off="medium"  type="checkbox" data-onstyle="on" data-offstyle="off"  data-toggle="toggle" data-on="On" data-off="Off">

                  </div>

                </div>


                <div class="row ">
                  <div class="col-sm-8">
                    <h5>Development Mode</h5>
                    <span>Temporarily bypass our cache. See changes to your origin server in realtime.</span>

                  </div>
                  <div class="col-sm-2">
                    <input class="changeableSettingToggle"  setting="development_mode" val-on="on" val-off="off"    type="checkbox" data-onstyle="on" data-offstyle="off"  data-toggle="toggle" data-on="On" data-off="Off">

                  </div>

                </div>


              </div>




              </div>
        </div>


        @if($zoneSetting)



@else
        <div class="row">
        <div class="col">
          <div class="content-title">


                </div>
                    <div class="card card-success">
                        <div class="card-heading"></div>
                        <div class="card-body">



            It looks like Zone is marked as pending. Please make sure that Zone is using correct DNS.
            @if((auth()->user()->id==1 OR auth()->user()->id!=$zone->user_id) AND auth()->user()->can('users_manage'))
                <br>
                <br>
                <div class="row" >
                    <div class="col-lg-2">
                Primary Nameserver:
            </div>
            <div class="col-lg-7">
                {{ $zone->name_server1 }}
                </div>
            </div>



                <div class="row" >
                    <div class="col-lg-2">
                 Secondary Nameserver:
            </div>
            <div class="col-lg-7">
                {{ $zone->name_server2 }}
                </div>
            </div>


            @else




            @endif




                        </div>
                    </div>
                </div>
            </div>

  @endif


  </div>
            </div>






@stop

@section('javascript')
    <script>
        window.route_mass_crud_entries_destroy = '{{ route('admin.users.mass_destroy') }}';
    </script>
@endsection
