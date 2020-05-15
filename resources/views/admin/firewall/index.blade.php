@inject('request', 'Illuminate\Http\Request')
@extends('layouts.app')

@section('content')




<div class="content">
    <div class="container">
      <div class="row">
        <div class="col">
          <div class="content-title">
            <h1>Firewall</h1>
            <h2 class="subtitle">Manage access by IP, country, or query rules</h2>
          </div>
          <div class="card card-2col">
            <div class="card-body">
              <div class="row no-gutters">
                <div class="col-sm-12 col-md-9 left">
                    <div  class="setting-title" ><h3>Firewall Rules</h3>
                      <?php
                        $allowed=5;
                      $pagerules=[];
                        if($zone->plan=="pro")
                        {
                                   $allowed=20;
                        }
                        elseif($zone->plan=="business")
                        {
                                   $allowed=50;
                        }
                        
                        elseif($zone->plan=="enterprise")
                        {
                                   $allowed=100;
                        }        
                      ?>
                      <p style="font-weight: bold;">
                        You have used 
                        <span id="ruleCount">{{  count($fwRules->where("status","active")) }}</span> 
                        out of <span id="allowed">{{ $allowed }}</span> active Firewall rules.
                      </p>
                      <p>Control incoming traffic to your zone by filtering requests based on location, IP address, user agent, URI, and more.</p>
                    </div>
                </div>
                <div class="col-sm-12 col-md-3 right">
                  <div class="row no-gutters">
                    <div class="col-lg-12 col-md-9 left">
                      <a class="btn btn-primary" href="#" id="addfwRuleBtn" data-toggle="modal" data-target="#fwRule-edit-modal"> Create a Firewall Rule</a>
                    </div>
                  </div>
                </div>
              </div>
              <div class="row no-gutters">
                <div class="col-sm-12 col-md-12 left">
                  
                <div class="panel-body table-responsive">
                  <table class="table table-bordered table-striped table-condensed">
                    <thead>
                      <tr>
                          <th></th>
                          <th >Action</th>
                          <th>Description</th>
                          <th style="min-width:215px;">&nbsp;</th>
                      </tr>
                    </thead>
                    <tbody class="pageRulesTableBody">
                    @if (count($fwRules) > 0)
                        <?php  $n=1; ?>
                        @foreach ($fwRules as $rule)
                            <tr id="rule_{{ $rule->id }}" data-entry-id="{{ $rule->id }}">

                              <td class="drag-td"><i class="drag-handle glyphicon glyphicon-resize-vertical"></i><span class="sortable-number">{{ $n }}</span></td>
                              <?php 

                              // dd($rule->fwFilter);
                              $n++; ?>
                              <td>{{ $rule->action }}</td>
                                <td>{{ $rule->description }}</td>
                                 
                                
                                
                              
                                <td>
                                  <input class="fwRuleStatus"  record-id="{{$rule->id}}"  type="checkbox" data-onstyle="on" data-offstyle="off" {{ $rule->status == "active" ? "checked" : "" }} data-toggle="toggle" data-on="On" data-off="Off">

                                  <a href="javascript:void(0);" data-id="{{$rule->id}}" data-name="{{$rule->description}}" ruleaction="{{$rule->action}}" expression='{{ $rule->fwFilter->expression }}' style="margin:20px;"  class="editFwRule" rule-id="{{$rule->id}}" class="btn btn-secondary">
                                    <i class="fas fa-edit"></i>
                                    </a>
                                  
                                    <a class="deleteFwRule confirm_delete" data-id="{{$rule->id}}" href="{{route('admin.firewall.fwrule.destroy', ['zone' => $zone->name , 'id'=> $rule->id])}}" rule-id="{{$rule->id}}" class="btn btn-outline-primary">
                                    <i class="fas fa-times"></i>
                                    </a>
                                    {!! Form::open(['method'=>'DELETE','action'=>['Admin\FirewallController@destroyFwRule',$zone->name,$rule->id], 'id'=>'delete_form_'.$rule->id, 'style'=>'display:none']) !!}
                                    {!!Form::submit('Delete', ['class'=>'btn btn-danger']) !!}
                                    {!! Form::close() !!}


                                </td>

                            </tr>
                        @endforeach
                    @else
                        <tr>
                            <td colspan="9">@lang('global.app_no_entries_in_table')</td>
                        </tr>
                    @endif
                </tbody>
            </table>
        </div>


          
          </div>
          

</div>

</div>
</div>



    <div class="card card-2col">
      <div class="card-body">
          <div class="row no-gutters">
		<div class="col-sm-12 col-md-9 left">
          <div  class="setting-title" ><h3>
  {{ title_case(str_replace("_"," ",$zoneSetting->where('name','security_level')->first()->name)) }}
    
    
</h3>




  <p>Adjust your website's Security Level to determine which visitors will receive a challenge page.</p>


  <p class="text-info">This setting was last changed 2 days ago</p>


</div>

          <?php $security_level=$zoneSetting->where('name','security_level')->first()->value; ?>
          </div>
          <div class="col-sm-12 col-md-3 right">
           <div  class="setting-title" >

           </div>
          <select settingid="{{$zoneSetting->where('name','security_level')->first()->id }}"  style="width: 200px;" class="select2 changeableSetting" id="security_level" name="security_level">
                        <option {{ $security_level === "off" ? "selected":"" }} disabled="" value="off">Off</option>
                        <option {{ $security_level === "essentially_off" ? "selected":"" }} value="essentially_off">Essentially Off</option>
                        <option {{ $security_level === "low" ? "selected":"" }} value="low">Low</option>
                        <option {{ $security_level === "medium" ? "selected":"" }} value="medium">Medium</option>
                        <option {{ $security_level === "high" ? "selected":"" }} value="high">High</option>
                        <option {{ $security_level === "under_attack" ? "selected":"" }} value="under_attack">I'm Under Attack</option>
                        
                    </select>
          </div>
      </div>

    </div>
</div>

     <div class="card card-2col">
      <div class="card-body">
          <div class="row no-gutters">
		<div class="col-sm-12 col-md-9 left">
          <div  class="setting-title" ><h3>
   Challenge Passage 
    
    
</h3>




  <p>Specify how long a visitor with a bad IP reputation is allowed access to your website after completing a challenge. After the Challenge Passage TTL expires the visitor in question will have to pass a new Challenge.</p>


  <p class="text-info">This setting was last changed 2 days ago</p>


</div>

          <?php $challenge_ttl=$zoneSetting->where('name','challenge_ttl')->first()->value; ?>
          </div>
          <div class="col-sm-12 col-md-3 right">
           <div  class="setting-title" >

           </div>

           <select  settingid="{{$zoneSetting->where('name','challenge_ttl')->first()->id }}"  style="width: 200px;" class="select2 changeableSetting" id="challenge_ttl" name="challenge_ttl">
                <option {{ $challenge_ttl === "300" ? "selected":"" }} value="300">5 minutes</option>
                <option {{ $challenge_ttl === "900" ? "selected":"" }} value="900">15 minutes</option>
                <option {{ $challenge_ttl === "1800" ? "selected":"" }} value="1800">30 minutes</option>
                <option {{ $challenge_ttl === "2700" ? "selected":"" }} value="2700">45 minutes</option>
                <option {{ $challenge_ttl === "3600" ? "selected":"" }} value="3600">1 hour</option>
                <option {{ $challenge_ttl === "7200" ? "selected":"" }} value="7200">2 hours</option>
                <option {{ $challenge_ttl === "10800" ? "selected":"" }} value="10800">3 hours</option>
                <option {{ $challenge_ttl === "14400" ? "selected":"" }} value="14400">4 hours</option>
                <option {{ $challenge_ttl === "28800" ? "selected":"" }} value="28800">8 hours</option>
                <option {{ $challenge_ttl === "57600" ? "selected":"" }} value="57600">16 hours</option>
                <option {{ $challenge_ttl === "86400" ? "selected":"" }} value="86400">1 day</option>
                <option {{ $challenge_ttl === "604800" ? "selected":"" }} value="604800">1 week</option>
                <option {{ $challenge_ttl === "2592000" ? "selected":"" }} value="2592000">1 month</option>
                <option {{ $challenge_ttl === "31536000" ? "selected":"" }} value="31536000">1 year</option>
            </select>

          
          </div>
      </div>

    </div>
</div>

 
            
          

 <div class="card card-tabs">
            <div class="card-header">
              <ul class="nav nav-tabs" id="myTab" role="tablist">
                <li class="nav-item">
                  <a class="nav-link active" data-toggle="tab" href="#ipfirewall" role="tab">IP Firewall</a>
                </li>
                <li class="nav-item">
                  <a class="nav-link" data-toggle="tab" href="#waf" role="tab">WAF</a>
                </li>
                
              </ul>
            </div>



             



          

            <div class="card-body">
              <div class="tab-content"  id="myTabContent">
                <div class="tab-pane  fade show active" id="ipfirewall">
                  

    <div class="card card-2col">
        <div class="card-body"><h2 style="display: inline">Access Rules for {{ $records->first()->zone->name }}</h2>
        <div class="float-right">
      <a href="#" class="btn btn-primary" id="add_rule" data-toggle="modal" > Add New Rule</a>

    </div>
  </div>


      <input type="hidden" name="csrftoken" value="{{csrf_token()}}" >

        <div class="card-body table-responsive">
        

            <table class="table table-bordered table-striped table-condensed">

                <thead>
                    <tr>
                        
                        <th >Value</th>
                        
                        <th>Action</th>
                        <th>&nbsp;</th>

                    </tr>
                </thead>

                <tbody>
                    @if (count($rules) > 0)
                        @foreach ($rules as $rule)
                            <tr id="rule_{{ $rule->id }}" data-entry-id="{{ $rule->id }}">
                                <td>{{ $rule->value }}</td>

                                
                                
                                <td>

                              
                <select style="width:200px;" class="select2 firewallAction" id="{{ $rule->id }}" name="firewallAction">
                <option {{ $rule->mode  == "whitelist" ? "selected":"" }} value="whitelist">Whitelist</option>
                <option {{ $rule->mode == "block" ? "selected":"" }} value="block">Block</option>
                <option {{ $rule->mode == "challenge" ? "selected":"" }} value="challenge">Challenge</option>
                <option {{ $rule->mode == "js_challenge" ? "selected":"" }} value="js_challenge">JS Challenge</option>
               
            </select>
                                    </td>
                              
                                <td>
                                
                                    <a href="#" class="deleteRule" rule-id="{{$rule->id}}" class="btn btn-outline-primary">
                                      <span class="icon">
                                    <i class="fas fa-times"></i>
                                    </span>
                                    </a>


                                </td>

                            </tr>
                        @endforeach
                    @else
                        <tr>
                            <td colspan="9">@lang('global.app_no_entries_in_table')</td>
                        </tr>
                    @endif
                </tbody>
            </table>
        </div>
    </div>

<div class="before-panel">
        <div class="">
          <div class="row no-gutters">
		<div class="col-sm-12 col-md-9 left">
          <div  class="setting-title" >
            <h3> UserAgent Rules</h3>
<?php
  $allowed=10;

  if($zone->plan=="pro")
  {
             $allowed=20;
  }
  elseif($zone->plan=="business")
  {
             $allowed=50;
  }
  
  elseif($zone->plan=="enterprise")
  {
             $allowed=100;
  }


            
?>
<p style="font-weight: bold;">You have used <span id="ruleCount">{{  count($uaRules->where('paused','0')) }}</span> out of 
            <span id="allowed">{{ $allowed }}</span> allowed UA rules.</p>

  <p>User-Agent Blocking allows you to block a specific (complete) User-Agent string, and provides you with options as to how block/mitigate it. The list of actions permitted are the same as the IP Firewall, those being Block, JS Challenge, Captcha and Challenge.
</p>



  

</div>

          
          </div>
          <div class="col-sm-12 col-md-3 right">
             <div class="row no-gutters">
		<div class="col-sm-12 col-md-9 left">
 


          </div>
      </div>

    
 </div>
</div>
    <div class="card card-2col">
        <div class="card-body"><h2 style="display: inline">User Agent Blocking Rules for {{ $records->first()->zone->name }}</h2>
        <div class="float-right">
      <a href="#" class="btn btn-primary" id="add_ua_rule" data-toggle="modal" data-target="#ua-rule-modal" > Add New Rule</a>

    </div>
  </div>


      <input type="hidden" name="csrftoken" value="{{csrf_token()}}" >

   
        <div class="card-body table-responsive">
        

            <table class="table table-bordered table-striped table-condensed">

                <thead>
                    <tr>
                        
                        <th >Rule Name / Description</th>
                        
                        <th>Action</th>
                        <th>&nbsp;</th>

                    </tr>
                </thead>

                <tbody>
                    @if (count($uaRules) > 0)
                        @foreach ($uaRules as $rule)
                            <tr id="rule_{{ $rule->id }}" data-entry-id="{{ $rule->id }}">
                                <td><div>{{ $rule->description }}</div>
                                  <span class="lightText">{{ $rule->value}}</span>
                                  </td>

                                
                                
                                <td>

                              
                <select style="width:200px;" class="select2 uaAction" id="{{ $rule->id }}" name="uaAction">
                
                <option {{ $rule->mode == "block" ? "selected":"" }} value="block">Block</option>
                <option {{ $rule->mode == "challenge" ? "selected":"" }} value="challenge">Challenge</option>
                <option {{ $rule->mode == "js_challenge" ? "selected":"" }} value="js_challenge">JS Challenge</option>
               
            </select>
                                    </td>
                              
                                <td>
                                    <input class="uaRuleStatus"  record-id="{{$rule->id}}"  type="checkbox" data-onstyle="success" data-offstyle="secondary" {{ $rule->paused == "0" ? "checked" : "" }} data-toggle="toggle" data-on="<i class='fa fa-check'></i> Active" data-off="<i class='fa fa-exclamation'></i> Paused">

                                  <a href="#" style="margin:20px;"  data-toggle="modal" data-target="#rule-edit-modal_{{ $rule->id }}" class="editUaRule" rule-id="{{$rule->id}}" class="btn btn-secondary">
                                    <i class="fas fa-edit"></i>
                                    </a>
                                  
                                    <a href="#" class="deleteUaRule" rule-id="{{$rule->id}}" class="btn btn-outline-primary">
                                    <i class="fas fa-times"></i>
                                    </a>

                                </td>

                            </tr>
                        @endforeach
                    @else
                        <tr>
                            <td colspan="9">@lang('global.app_no_entries_in_table')</td>
                        </tr>
                    @endif
                </tbody>
            </table>
        </div>
    </div>


                </div>

              </div>
      </div>
                <div class="tab-pane" id="waf">
                  
                      @if($zone->plan == "free")

      <div class="alert alert-info">Domain is not configured to use WAF Feature, Please contact BlockDOS for WAF activation.</div>
      @else
  
   <div class="card card-2col">
      <div class="card-body">
          <div class="row no-gutters">
		<div class="col-sm-12 col-md-9 left">
          <div  class="setting-title" ><h3>
 Web Application Firewall 
    
    
</h3>




  <p>Enable / Disable Web Application Firewall </p>


  <p class="text-info">This setting was last changed 2 days ago</p>


</div>

          <?php $waf=$zoneSetting->where('name','waf')->first()->value; ?>
          </div>
          <div class="col-sm-12 col-md-3 right">
           <div  class="setting-title" >

           </div>
          <select settingid="{{$zoneSetting->where('name','waf')->first()->id }}"  style="width: 200px;" class="select2 changeableSetting" id="waf" name="waf">
                        <option {{ $waf === "off" ? "selected":"" }}  value="off">OFF</option>
                        <option {{ $waf === "on" ? "selected":"" }} value="on">ON</option>
                        
                      
                        
                    </select>
          </div>
      </div>

    </div>
</div>


@foreach($wafPackages as $wafPackage)

 <div class="card card-2col">
      <div class="card-body  ">
    
          <div class="row no-gutters">
		<div class="col-sm-12 col-md-9 left">
          <div  class="setting-title" ><h3>

  {{ title_case(str_replace("CloudFlare","BlockDOS",str_replace("_"," ",$wafPackage->name))) }}
    
    
</h3>




  <p>{{ title_case(str_replace("CloudFlare","BlockDOS",str_replace("_"," ",$wafPackage->description))) }}</p>


  <p class="text-info">This setting was last changed 2 days ago</p>


</div>

          <?php $sensitivity=$wafPackage->sensitivity;
                $action=$wafPackage->action;
                
           ?>
          </div>

          @if($wafPackage->detection_mode!="traditional")
          <div class="col-sm-12 col-md-3 right">
           <div  class="waf-package-title" >
              Senstivity
           </div>
          <select package-id="{{$wafPackage->id }}" setting="sensitivity"  style="width: 200px;" class="select2 wafPackageSetting" id="sensitivity" name="sensitivity">
                        <option {{ $wafPackage->sensitivity === "off" ? "selected":"" }} disabled="" value="off">Off</option>
                       
                        <option {{ $wafPackage->sensitivity === "low" ? "selected":"" }} value="low">Low</option>
                        <option {{ $wafPackage->sensitivity === "medium" ? "selected":"" }} value="medium">Medium</option>
                        <option {{ $wafPackage->sensitivity === "high" ? "selected":"" }} value="high">High</option>
                        
                        
                    </select>


                     <div  class="waf-package-title" >
              Action
           </div>
          <select package-id="{{$wafPackage->id }}" setting="action_mode"  style="width: 200px;" class="select2 wafPackageSetting" id="action1" name="action">
                        <option {{ $wafPackage->action_mode === "simulate" ? "selected":"" }} value="simulate">Simulate</option>
                        <option {{ $wafPackage->action_mode === "challenge" ? "selected":"" }} value="challenge">Challenge</option>
                        <option {{ $wafPackage->action_mode === "block" ? "selected":"" }} value="block">Block</option>
                        
                        
                    </select>
          </div>
          @endif
     
</div>

      <div class="expandable wafGroups">

        

           <table class="table table-bordered table-striped table-condensed">
           <thead>
                <tr>
                <th>Group</th>
                <th>Description</th>
                <th>Mode</th>
                </tr>
</thead>
                @foreach($wafPackage->wafGroup as $wafGroup)

                  <tr>
                <td><a href="#" class="pointer showWAFGroupDetails" data-pid="{{ $wafPackage->id }}" data-gid="{{ $wafGroup->id }}">{{ str_replace("Cloudflare","BlockDOS",$wafGroup->name) }}</a></td>
                <td>{{ str_replace("Cloudflare","BlockDOS",$wafGroup->description) }}</td>
                <td> 

                <input group-id="{{ $wafGroup->id }}" class="wafGroupToggle" type="checkbox" data-onstyle="primary" data-offstyle="secondary" {{ $wafGroup->mode === "on" ? "checked" : "" }} data-toggle="toggle" data-on=" ON" data-off="OFF">
                


                </td>
                </tr>

                @endforeach
            </table>
            

     

      </div>
 </div>
    </div>

@endforeach
 @endif   

 
                </div>
                
              </div>
            </div>
          
</div>



@if(count($events))
    <div class="card">
      <div class="card-body"><h2 style="display: inline">Firewall Events </h2>
    
  </div>


      <input type="hidden" name="csrftoken" value="{{csrf_token()}}" >

        <div class="card-body table-responsive">
      

            <table class="table table-striped table-condensed firewallEvents">

                <thead>
                    <tr>
                        <th>Description</th>

                        <th>Action</th>
                        
                        <th>IP</th>
                        <th>Country</th>
                        <th>Date</th>
                         <th>&nbsp;</th>
                        <th>&nbsp;</th>

                    </tr>
                </thead>

                <tbody>
                    @if (count($events) > 0)
                        @foreach ($events as $event)
                            <tr id="record_{{ $event->id }}" data-entry-id="{{ $event->id }}">
                                <td>{{ $event->rule_name }}</td>

                                <td>
                                  {{ $event->action }}
                                </td>

                               

                                <td>
                                  {{ $event->client_ip }}
                                </td>
                                <td>
                                  {{ $event->country }}
                                </td>
                                
                                <td>
                                  {{ $event->timestamp }}
                                </td>
                                <td>
                                  {{ $event->ts }}
                                </td>
                                <td>
                                    
                                    <button data-rulename="{{ $event->rule_name }}" 
                                       data-date="{{ $event->timestamp }}" 
                                        data-action="{{ $event->action }}" 
                                         data-schememethod="{{ $event->scheme }} {{ $event->method }}" 
                                          data-uri="{{ $event->uri }}" 
                                           data-querystring="{{ $event->query_string }}" 
                                            data-domain="{{ $event->domain }}" 
                                             data-clientip="{{ $event->client_ip }}" 
                                              data-country="{{ $event->country }}" 
                                               data-useragent="@if($event->user_agent!="") {{ $event->user_agent }} @endif" 
                                         
                                              class="btn btn-info eventDetail">Details</button>

                                </td>

                            </tr>
                        @endforeach
                    @else
                        <tr>
                            <td colspan="9">@lang('global.app_no_entries_in_table')</td>
                        </tr>
                    @endif
                </tbody>
            </table>
        </div>
    </div>





<div class="modal" id="eventModal" data-reveal>

   <div class="modal-dialog modal-lg" >
    <div class="modal-content">
      <div class="modal-header">
        <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
        <h4 class="modal-title">Event Details</h4>
      </div>
      <div class="modal-body">
      <div class="row">
        
        <div class="col-lg-5">
          <label>Description</label>
         <div id="rulename"></div>
        </div>
        <div class="col-lg-4">
          <label>Date</label>
         <div id="date"></div>
        </div>
        <div class="col-lg-3">
           <label>Action Taken</label>
         <div id="action"></div>

        </div>

      </div>

      <div style="margin-top: 10px" class="row">
        
        <div class="col-lg-5">
          <label id="schememethod"></label>
         <div id="domain"></div>
        </div>
        <div class="col-lg-4">
          <label>URI</label>
         <div id="uri"></div>
        </div>
        <div class="col-lg-3">
        
          <label>Client IP</label>
         <div id="clientip"></div>
        

        </div>

      </div>


      <div style="margin-top: 10px" class="row">
        
       
        <div class="col-lg-5">
          <label>Country</label>
         <div id="country"></div>
        </div>

        <div class="col-lg-7">
           <label>User Agent</label>
         <div id="useragent"></div>

        </div>
       

      </div>


      <div style="padding-top: 20px;" class="row">
      <div class="col-lg-12 text-right float-right">
            <input style="display: none;" class="btn btn-success createRuleFromEvent" name="" value="Create Firewall Rule Based on this Event" type="submit">
        </div>
        </div>
</div></div>

</div>
</div>








    @else


      
    @endif

 







<!-- Modal start -->
<div id="add_rule_modal" class="modal fade add_rule_modal" tabindex="-1" role="dialog" aria-labelledby="Add Rule">
  <div class="modal-dialog modal-lg" >
    <div class="modal-content">
      <div class="modal-header">
        <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
        <h4 class="modal-title">Add Access Rule</h4>
      </div>
      <div class="modal-body">
        <form id="accessRule">
  <div class="row">
  {{ csrf_field() }}
          <input type="hidden" name="zid" value="{{ $zone->id }}">
        <div class="col-lg-2">
  <select name="target" id="accessRuleTarget" class="select2 form-controls">
    <option value="ip">IP Address</option>
    <option value="ip_range">IP Range </option>
     <option value="asn">ASN</option>
    
    <option value="country">Country</option>
  </select>
</div>
  <div class="valueDiv col-lg-3">
  <input type="text" name="value" class=" form-control">
  
</div>

<div class="form-group col-lg-2" >
                   <select  class="select2" name="mode">
                <option  value="whitelist">Whitelist</option>
                <option  value="block">Block</option>
                <option  value="challenge">Challenge</option>
                <option  value="js_challenge">JS Challenge</option>
               
            </select>
                  </div>
<div class="form-group col-lg-3" >

  <input type="text" class="form-control" placeholder="note (optional)" name="note">

</div>
<div class="form-group col-lg-2" >
<input type="submit" value="Add Access Rule" class="form-control" name="">
</div>
</div>
</form>
      </div>
    </div><!-- /.modal-content -->
  </div><!-- /.modal-dialog -->
</div><!-- /.modal -->
<!-- Modal end -->




<div id="ua-rule-modal" class="modal fade" tabindex="-1" role="dialog" aria-labelledby="Add Rule">

   <div class="modal-dialog modal-lg" >
    <div class="modal-content">
      <div class="modal-header">
        <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
        <h4 class="modal-title">Add User Agent Blocking Rule</h4>
      </div>
      <div class="modal-body">

  
   
    <div class="">

<form method="post" action="addUaRule" id="uaRule" class="uaRuleForm">
  <input type="hidden" name="csrftoken" value="{{csrf_token()}}" >

  <div class="form-group">
<p>Name/Description</p>
<input class="form-control" required="" placeholder="Example: Block Internet Explorer" name="description"  type="text">


</div>
<br>
  <div class="form-group">
<p>Action</p>
 <select style="width:100%;" class="select2 form-control"  name="mode">
                
                <option  value="block">Block</option>
                <option value="challenge">Challenge</option>
                <option  value="js_challenge">JS Challenge</option>
               
            </select>


</div>
<br>
  <div class="form-group">
<p>User Agent</p>
<textarea  class="form-control" required="required" placeholder="Example: Mozilla/5.0 (Macintosh; Intel Mac OS X 10_12_5) AppleWebKit/603.2.4 (KHTML, like Gecko) Version/10.1.1 Safari/603.2.4" name="value"></textarea>


</div>
 
<input type="hidden" name="zid" value="{{ $zone->id }}">
<div class="row">
  <div class="col-lg-12 text-right">
<input class="btn btn-primary" type="submit" value="Add Rule">
</div>
</div>
</form>

</div>



</div></div>

</div>

</div>





 @if (count($uaRules) > 0)
   @foreach ($uaRules as $rule)
                          


<div class="modal ruleEditModal" id="rule-edit-modal_{{ $rule->id }}"  data-reveal>

   <div class="modal-dialog modal-lg" >
    <div class="modal-content">
      <div class="modal-header">
        <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
        <h4 class="modal-title">Edit User Agent Blocking Rule</h4>
      </div>
      <div class="modal-body">

  
   
    <div class="">

<form method="post" action="addUaRule" id="uaRule" class="uaRuleEditForm">
  <input type="hidden" name="csrftoken" value="{{csrf_token()}}" >

  <div class="form-group">
<p>Name/Description</p>
<input value="{{ $rule->description }}"  class="form-control" required="" placeholder="Example: Block Internet Explorer" name="description"  type="text">


</div>
<br>
  <div class="form-group">
<p>Action</p>
 <select style="width:100%;" class="select2 form-control"  name="mode">
                
                <option @if($rule->mode=="block") selected="selected" @endif  value="block">Block</option>
                <option @if($rule->mode=="challenge") selected="selected" @endif    value="challenge">Challenge</option>
                <option @if($rule->mode=="js_challenge") selected="selected" @endif    value="js_challenge">JS Challenge</option>
               
            </select>


</div>
<br>
  <div class="form-group">
<p>User Agent</p>
<textarea  class="form-control" required="required" placeholder="Example: Mozilla/5.0 (Macintosh; Intel Mac OS X 10_12_5) AppleWebKit/603.2.4 (KHTML, like Gecko) Version/10.1.1 Safari/603.2.4" name="value">{{ $rule->value }}</textarea>


</div>
 
<input type="hidden" name="zid" value="{{ $zone->id }}">
<input type="hidden" name="ruleid" value="{{ $rule->id }}">
<div class="row">
  <div class="col-lg-12 text-right">
<input class="btn btn-primary" type="submit" value="Edit Rule">
</div>
</div>
</form>

</div>



</div></div>

</div>

</div>



@endforeach

@endif







@if (count($fwRules) > 0)
   @foreach ($fwRules as $rule)
                          

<div class="modal" id="rule-edit-modal_{{ $rule->id }}" >

   <div class="modal-dialog modal-lg" >
    <div class="modal-content">
      <div class="modal-header">
        <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
        <h4 class="modal-title">Edit Page Rule</h4>
      </div>
      <div class="modal-body">

  
   <form method="post" action="editFwRule" class="pageRuleEditForm">
    <div class="">


  <input type="hidden" name="csrftoken" value="{{csrf_token()}}" >
<p><strong></strong> </p>
<input class="form-control" value="{{ $rule->value }}" required="" placeholder="Example: www.example.com/*" name="url"  type="text">

<p  style="padding-top: 20px;"><strong>Then the settings are:</strong></p>
<div id="settings" class="settings">

  @foreach ($rule->fwFilter as $action)
                                       
                                     


@endforeach
 </div>
  <div class="formMsg">
 </div>
  <a href="#" class="btn btn-link add-setting-link">
  + Add a Setting

</a>
<input type="hidden" name="zid" value="{{ $zone->id }}">
<input type="hidden" name="ruleid" value="{{ $rule->id }}">
<div class="row">
  <div class="col-lg-12 text-right">
<input class="btn btn-primary" type="submit" value="Edit Rule">
</div>

</div>
</div>
</form>

</div></div>


</div></div>




@endforeach
@endif




<div class="modal" id="fwRule-edit-modal" data-reveal>

   <div class="modal-dialog modal-xl" >
    <div class="modal-content">
      <div class="modal-header">
        <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
        <h4 class="modal-title">Create Firewall Rule</h4>
      </div>
      <div class="modal-body">

  
   
    <div class="form-section">
                  
                    
                    <form method="post" action="addPageRule" class="fwRuleForm">
                      <input type="hidden" name="csrftoken" value="{{csrf_token()}}" >
                      <div class="form-group">
                        <label for="rule-name">Rule Name:</label>
                          <small id="rule-name-help" class="form-text text-muted">Give your rule a descriptive name.</small>
                          <input type="text" class="form-control" name="rulename" id="rule-name" aria-describedby="rule-name-help" placeholder="">
                      </div>
                        
                      <p style="padding-top: 20px;"><strong>When incoming requests match…</strong></p>
                      <div class="row">
                        <div class="col-lg-2">Field</div>
                        <div class="col-lg-2">Operator</div>
                        <div class="col-lg-5">Value</div>
                        <div class="col-lg-3"></div>
                      </div>
                      <div id="fwsettings" class="settings">
                        <div  style="padding-bottom: 15px;" andOr="FIRST"  class="row fwRow">
                          <div class="col-lg-2 selectorDiv">
                            <select name="action[]" tabindex="-1" title="" class="select2 fwRuleAction">
                              <option value="">Select One</option>
                              <option value="asnum">AS Num</option>
                              <option value="cookie">Cookie</option>
                              <option value="country">Country</option>
                              <option value="host">Hostname</option>
                              <option value="ip">IP Address</option>
                              <option value="referer">Referer</option>
                              <option value="method">Request Method</option>
                              <option value="ssl">SSL/HTTPS</option>
                              <option value="url">URI Full</option>
                              <option value="uri">URI</option>
                              <option value="uripath">URI Path</option>
                              <option value="uriquery">URI Query String</option>
                              <option value="agent">User Agent</option>
                              <option value="forwarded">X-Forwarded-For</option>
                              <option value="knownbot">Known Bots</option>
                              <option value="threat">Threat Score</option>
                            </select>
                          </div>
                          <div class="col-lg-2 valueDiv">
                            <select name="actionValue[]" class="select2 value fwRuleValue form-control">
                              <option value="on">YES</option>
                              <option value="of">NO</option>
                            </select>
                          </div>
                          <div class="col-lg-5 value2Div">
                            <input type="text" name="actionValue2[]" class="value2 form-control fwRuleValue2" >
                          </div>
                          <div class="col-lg-3">
                            <a href="#" class="btn btn-link fwRuleAnd no-underline light-gray-bg" role="button">AND</a>
                            <a href="#" class="btn btn-link fwRuleOr no-underline light-gray-bg" role="button">OR</a>
                          </div>
                        </div>
                      </div>
                      <div class="formMsg">
                      </div>
                      <input type="hidden" name="zid" value="{{ $zone->id }}">
                      <div class="row">
                        <div class="col-lg-12 form-group">
                          <p>Expression Preview</p>
                          <textarea name="expression" readonly class="expression form-control"></textarea>
                        </div>
                      </div>
                      <div class="row">
                        <div class="col-lg-8">
                          <p><strong>Then…</strong></p>
                          <p>Choose an action</p>
                          <select id="fwRuleActionMain" name="ruleaction" class="select2">
                            <option value="block">Block</option>
                            <option value="js_challenge">JS Challenge</option>
                            <option value="challenge">Challenge</option>
                            <option value="allow">Allow</option>
                          </select>
                        </div>
                        <div class="col-lg-4 text-right">
                          <input id="rule-button" class="btn btn-primary" type="submit" value="Add Rule">
                        </div>
                      </div>
                    </form>
                  </div>



</div></div>

</div>
</div>







<div class="modal" id="WAFGroupDetailsModal" data-reveal>

   <div class="modal-dialog modal-ip" >
    <div class="modal-content">
      <div class="modal-header">
        <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
        <h4 class="modal-title">WAF Group Details</h4>
      </div>
      <div id="WAFGroupDetailsModalBody" class="modal-body">


</div></div>

</div>
</div>

</div>
</div>
</div>
</div>
</div>
@stop

@section('javascript')
    <script>
        window.route_mass_crud_entries_destroy = '{{ route('admin.users.mass_destroy') }}';
    </script>
@endsection
