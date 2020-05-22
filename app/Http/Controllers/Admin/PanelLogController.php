<?php

namespace App\Http\Controllers\Admin;

use Carbon\Carbon;
use App\Cfaccount;
use App\Spaccount;
use App\Http\Controllers\Controller;
use App\User;
use App\Zone;
use App\ZoneSetting;
use App\Dns;
use App\Analytics;
use App\FirewallRule;
use App\wafPackage;
use App\wafGroup;
use App\SpRule;
use App\SpCondition;
use App\wafRule;
use App\PageRule;
use App\PageRuleAction;
use App\Jobs\UpdatePageRule;

use App\elsLog;
use SSH;
use \GuzzleHttp\Client;


use App\panelLog;



use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Gate;
use App\Jobs\FetchZoneSetting;
use App\Jobs\FetchDns;
use App\Jobs\FetchAnalytics;
use App\Jobs\FetchSpAnalytics;

use App\Jobs\FetchFirewallRules;
use App\Jobs\FetchWAFPackages;
use App\Jobs\UpdateSetting;
use App\Jobs\UpdateSpSetting;
use App\Jobs\FetchZoneDetails;
use App\Jobs\PurgeCache;
use App\Jobs\FetchSpZoneSetting;
use App\Jobs\FetchZoneStatus;
use App\Jobs\FetchPageRules;
use App\Jobs\DeletePageRule;
use App\Jobs\UpdateSPWAF;
use App\Jobs\stackPath\FetchWAFPolicies;
use App\Jobs\stackPath\FetchWAFRules;
use App\Jobs\stackPath\UpdateWAFRule;
use App\Jobs\stackPath\DeleteWAFRule;

class PanelLogController extends Controller
{


    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        //

        if (!Gate::allows('users_manage')) {
            return abort(401);
        }

        
        
        if(auth()->user()->id==1)
        {
            $zones = Zone::where('status','active')->get();
        }
        else
        {
          die();

        }
 
        return view('admin.panelLogs.index', compact('zones'));
    }


    public function audit_logs(Request $request)
    {
        //

        // if (!Gate::allows('users_manage')) {
        //     return abort(401);
        // }

        
        $user=\App\User::find(auth()->user()->id);
             $allowedZone =  $request->session()->get('zone', null);
          

             $zones=[];
            
            if($allowedZone!=null)
            {
               $zones[]=$allowedZone;
            }
               
            
            elseif($user->owner!=1 AND \App\User::find($user->owner)->isNotAn('reseller'))
                {
                     foreach(\App\Zone::where('user_id',$user->owner)->get() as $zone)
                     {

                      $zones[]=$zone->name;
                   
                    }
                }
               

           else
           {



            
            $ids=\App\User::where('owner',$user->id)->pluck('id')->toArray();
            $ids[]=$user->id;

            
            
            foreach(\App\Zone::whereIn('user_id',$ids)->get() as $zone)
            {
                        $zones[]=$zone->name;

            }
               
            
                
            }


       
            $zones = Zone::whereIn('name',$zones)->where('status','active')->get();
     
            
        return view('admin.panelLogs.audit_logs', compact('zones'));
    }



    public function show($zone,Request $request)
    {
        //

      $zone=Zone::where('name',$zone)->first();
     
        if (!Gate::allows('users_manage')) {
            return abort(401);
        }

        
        
        if(auth()->user()->id==1)
        {
            
        }
        else
        {
          die();

        }
        

        $logs=$zone->panelLog->sortByDesc("created_at");
        // dd($logs);
//                     $results = $client->search($params);

// dd($results['aggregations'][2]['buckets'][0]);



        return view('admin.panelLogs.show', compact('zone','logs'));
    }



    public function showClientView($zone,Request $request)
    {
        //

        $zone=Zone::where('name',$zone)->first();
     
        // if (!Gate::allows('users_manage')) {
        //     return abort(401);
        // }

        
        
      
        

        $logs=$zone->panelLog->where('type','3')->sortByDesc("created_at");
        // dd($logs);
//                     $results = $client->search($params);
 return view('admin.panelLogs.clientView', compact('zone','logs'));
    }

  

}
