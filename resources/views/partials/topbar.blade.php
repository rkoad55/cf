<?php
$user=\App\User::find(auth()->user()->id);
if($user->owner!=1)
    {

        if(\App\User::find($user->owner)->isAn('reseller'))
        {
            $logo=\App\User::find($user->owner)->branding->logo;
        }
        elseif(\App\User::find(\App\User::find($user->owner)->owner)->isAn('reseller'))
        {
            $logo=\App\User::find(\App\User::find($user->owner)->owner)->branding->logo;
        }
        else
        {
            $logo='v3/img/cf-logo.svg';
        }

        
    }
    else
    {
        $logo='v3/img/cf-logo.svg';
    }  

    if($logo=="")
    {
        $logo='v3/img/cf-logo.svg';
    }

    ?>

@can('users_manage')


 <div class="header">
        <div class="container-fluid">

            <div class="header-menu row justify-content-between align-items-center">
                <div class="col">
                    <div class="row align-items-center">
                        <div class="col">
                            <a href="/admin/home" class="logo"><img src="{{ asset($logo) }}" alt="BlockDOS"></a>
                            <a href="#" class="btn btn-h">Home</a>
                           
                            
                        </div>
                    </div>
                </div>
                <div class="col">
                    <div class="row align-items-center text-right">
                        <div class="col">
                          
                        
                            <div class="dropdown">
                                <div class="dropdown-container">
                                    <button class="btn btn-h dropdown-toggle" type="button"  data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                        <i class="fas fa-user-circle"></i>
                                    </button>
                                    <div class="dropdown-menu dropdown-menu-right">
                                         <?php // Allow Account creation for the organization admin only. 
           ?>
            @if($user->owner==1 OR \App\User::find($user->owner)->isAn('reseller')) 






            
            @endif
                
                                        <a class="dropdown-item" href="{{ url('logout') }}">Log out</a>
                                    </div>
                                    

                           


                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>

   
        
   
@else





      <?php

            $user=\App\User::find(auth()->user()->id);
                         $allowedZone =  $request->session()->get('zone', null);

                         // dd($allowedZone);
            
            ?>


<div class="header">
        <div class="container-fluid">

            <div class="header-menu row justify-content-between align-items-center">
                <div class="col">
                    <div class="row align-items-center">
                        <div class="col">
                            <a href="/admin/home" class="logo"><img src="{{ asset($logo) }}" alt="BlockDOS"></a>
                            <a href="#" class="btn btn-h">Home</a>
                           
                            <div class="dropdown">
                                <div class="dropdown-container">
                                    <button class="btn btn-h dropdown-toggle" type="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">

                                         @if(isset($zone))
 @if(!Request::is('*/home') AND !Request::is('*/zones*') AND !Request::is('*/els*') AND !Request::is('*/spels*') AND !Request::is('*/panel_logs*') AND !Request::is('*/spaccounts*') AND !Request::is('*/cfaccounts*'))

 {{ $zone->name }}

@else
    Select Website
@endif
@endif
                                      

                                       
                                    </button>
                                    <div class="dropdown-menu">
                                        <div class="dropdown-search">
                                            <div class="input-group">
                                                <div class="input-group-prepend">
                                                    <span class="input-group-text"><i class="fas fa-search"></i></span>
                                                </div>
                                                <input type="text" class="form-control search" placeholder="Search websites...">
                                            </div>
                                            <table class="table table-hover">
                                                <thead>
                                                    <tr>
                                                        <th>Domain</th>
                                                        <th>Status</th>
                                                    </tr>
                                                </thead>
                                                <tbody class="results">

                                               
             @if($allowedZone!=null)
              <tr>
                                                        <td>{{ $allowedZone }}</td>
                                                        <td class="status-active"><i class="fas fa-check"></i> Active</td>
                                                    </tr>

                  
                
            @elseif($user->owner!=1 AND \App\User::find($user->owner)->isNotAn('reseller'))
                
                @foreach(\App\Zone::where('user_id',$user->owner)->get() as $zone)
              
                          <tr>
                                                        <td><a href="{{url('admin/').'/'.$zone->name}}/overview">{{ $zone->name }}</a></td>
                                                        <td class="status-active"><a href="{{url('admin/').'/'.$zone->name}}/overview"><i class="fas fa-check"></i> Active</a></td>
                                                    </tr>

                @endforeach
               

            @else
            <?php $ids=\App\User::where('owner',auth()->user()->id)->pluck('id')->toArray();
            // dd($ids);
            $ids[]=auth()->user()->id;

             ?>
                @foreach(\App\Zone::whereIn('user_id',$ids)->get() as $zone)
           
                  <tr>
                                                        <td><a href="{{url('admin/').'/'.$zone->name}}/overview">{{ $zone->name }}</a></td>
                                                        <td class="status-active"><a href="{{url('admin/').'/'.$zone->name}}/overview"><i class="fas fa-check"></i> Active</a></td>
                                                    </tr>
                @endforeach

            @endif
                
                @if(Request::is('*/*/*'))
                
                @else
                    
                @endif

                                                   
                                              
                                                </tbody>
                                            </table>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="col">
                    <div class="row align-items-center text-right">
                        <div class="col">
                          
                        
                            <div class="dropdown">
                                <div class="dropdown-container">
                                    <button class="btn btn-h dropdown-toggle" type="button"  data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                        <i class="fas fa-user-circle"></i>
                                    </button>
                                    <div class="dropdown-menu dropdown-menu-right">
                                         <?php // Allow Account creation for the organization admin only. 
           ?>
            @if($user->owner==1 OR \App\User::find($user->owner)->isAn('reseller')) 

            <a class="dropdown-item" href="{{ url('admin/settings') }}">Account Home</a>

 <a class="dropdown-item" href="{{ url('admin/token') }}">API Tokens</a>
 <a class="dropdown-item" href="{{ url('admin/audit_logs') }}">Audit Logs</a>

            
            @endif
                
                                        <a class="dropdown-item" href="{{ url('logout') }}">Log out</a>
                                    </div>
                                    

                           


                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <?php
    /*

    <div style="" class="topbar1">
        <div class="container-fluid">
            <div class="row">
                <div class="col-xs-12 col-md-2">
                    <div class="logo">
                        <a href="/admin/home"><img src="{{ asset($logo) }}" alt="BlockDOS"></a>
                    </div>
                </div>
                <div class="col-xs-12 col-md-6">
                    <div class="domainSelectorDiv">
                       <select style="width:200px;" class="select2" id="changeZone" name="changeZone">
                <?php

            $user=\App\User::find(auth()->user()->id);
                         $allowedZone =  $request->session()->get('zone', null);

            
            ?>
             @if($allowedZone!=null)
                  <option {{{ (Request::is('*\/'.$allowedZone.'/*') ? 'selected="selected"' : '') }}}  value="{{ \App\Zone::where('name',$allowedZone)->first()->id }}">{{ $allowedZone }}</option>
                
            @elseif($user->owner!=1 AND \App\User::find($user->owner)->isNotAn('reseller'))
                
                @foreach(\App\Zone::where('user_id',$user->owner)->get() as $zone)
                <option {{{ (Request::is('*\/'.$zone->name.'/*') ? 'selected="selected"' : '') }}}  value="{{ $zone->id }}">{{ $zone->name }}</option>
                @endforeach
               

            @else
            <?php $ids=\App\User::where('owner',auth()->user()->id)->pluck('id')->toArray();
            // dd($ids);
            $ids[]=auth()->user()->id;

             ?>
                @foreach(\App\Zone::whereIn('user_id',$ids)->get() as $zone)
                <option {{{ (Request::is('*\/'.$zone->name.'/*') ? 'selected="selected"' : '') }}}  value="{{ $zone->id }}">{{ $zone->name }}</option>
                @endforeach

            @endif
                
                @if(Request::is('*\/*\/*'))
                
                @else
                    <option selected="">Select Zone</option>
                @endif
               
            </select>
                    </div>
                </div>
                <div class="col-xs-12 col-md-4">
                    <div class="topbar-links">
                        <ul>

                            <?php // Allow Account creation for the organization admin only. 
           ?>
            @if($user->owner==1 OR \App\User::find($user->owner)->isAn('reseller')) 
                <li class="dropdown"><a class="dropdown-toggle" data-toggle="dropdown" aria-expanded="true"  href="{{ url('admin/settings') }}">
                    <i class="fas fa-cog"></i>
                    <span class="title">Account</span>
                </a>
                 <ul class="dropdown-menu">
                    <li>
                        <ul class="submenu">
            <li><a  href="{{ url('admin/settings') }}">
                    <i class="fas fa-cog"></i>
                    <span class="title">Account</span>
                </a>
            </li>

             <li><a  href="{{ url('admin/token') }}">
                    <i class="fas fa-cog"></i>
                    <span class="title">API Access</span>
                </a>
            </li>
              <li><a  href="{{ url('admin/audit_logs') }}">
                    <i class="fas fa-cog"></i>
                    <span class="title">Audit Logs</span>
                </a>
            </li>
            </ul>
            </li>
            </ul>
            </li>
            
            @endif
                <li><a href="{{ url('logout') }}">
                    <i class="fas fa-sign-out-alt"></i>
                    <span class="title">@lang('global.app_logout')</span>
                </a>
            </li>
    
                           
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    </div>
*/
    ?>

@endcan

