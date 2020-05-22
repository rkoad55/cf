<?php

namespace App\Http\Controllers\Admin;

use App\ZoneSetting;
use App\Zone;
use App\FirewallRule;
use App\wafGroup;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\DB;

use App\Jobs\UpdateWAFGroup;
use App\Jobs\UpdateWAFPackage;
use App\Jobs\UpdateFirewallRule;
use App\Jobs\UpdateUaRule;
use App\Jobs\UpdateWAFRule;
use App\UaRule;
use App\FwRule;
use App\wafRule;
use App\Jobs\FetchFirewallRules;
use App\Jobs\FetchFWRules;
use App\Jobs\FetchUaRules;
use App\Jobs\UpdateSPWAF;
use App\Jobs\DeleteFirewallRule;
use App\Jobs\DeleteFWRule;
use App\Jobs\DeleteUaRule;
class FirewallController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    
    public function index($zone=Null)
    {   



        $zone=Zone::where('name',$zone)->first();



        
        // die;

        if(!(auth()->user()->id == $zone->user->id OR auth()->user()->id == $zone->user->owner OR auth()->user()->id == 1))
    {
            return abort(401);
    }
        
       
        $records=$zone->ZoneSetting;
        $zoneSetting=$zone->ZoneSetting;
        // foreach ($records as $record) {
        //     # code...
        //     dump($record->name);
        //     dump($record->content);
        //     dump($record->type);
        //     dump($record->type);
        // }

        

         $wafPackages=$zone->wafPackage;

         $events=$zone->wafEvent->sortBy('timestamp')->take(500);
        // dd($wafPackages->first()->wafGroup);
        if($zone->cfaccount_id!=0)
        {   


            // Uncomment all these 3
             FetchFirewallRules::dispatch($zone)->onConnection('sync');
            FetchUaRules::dispatch($zone)->onConnection('sync');
            FetchFWRules::dispatch($zone)->onConnection('sync');
            $rules=$zone->FirewallRule;
            $fwRules=$zone->fwRule;
            // echo "sd";
            // dd($fwRules->count());



            $uaRules=$zone->UaRule;
            return view('admin.firewall.index', compact('records','zone','zoneSetting','rules','uaRules','wafPackages','events','fwRules'));    
        }
        else
        {
            $rules=$zone->SpRule;
            // dd($rules);
            
            // dd($events);
            return view('admin.spfirewall.index', compact('records','zone','zoneSetting','rules','wafPackages','events'));
        }
        
        
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */


    public function addFwRule(Request $request)
    {
        $zone_id = $request->input('zid');
        $rule_id = !empty($request->rule_id) ? $request->rule_id : 0;


        $zone = Zone::find($zone_id);
        if (!(auth()->user()->id == $zone->user->id or auth()->user()->id == $zone->user->owner or auth()->user()->id == 1)) {
            return abort(401);
        }

        $rulename = $request->input('rulename');
        $expression = $request->input('expression');
        $ruleaction = $request->input('ruleaction');
        
        

        $key     = new \Cloudflare\API\Auth\APIKey($zone->cfaccount->email, $zone->cfaccount->user_api_key);
        $adapter = new \Cloudflare\API\Adapter\Guzzle($key);
        $FW   = new \Cloudflare\API\Endpoints\FW($adapter);

        if($rule_id==0)
        {
            $res=$FW->addFilter($zone->zone_id,$expression,$rulename);    
        }
        else
        {
            //fetch already existing rule from db and get the filter id. we will use new expression to update the rule.
            $fwRule=fwRule::find($rule_id);
            // $res[0]= new \stdClass();
            // $res[0]->id=$fwRule->fwfilter->record_id;
            $res[0]=$FW->updateFilter($zone->zone_id,$expression,$rulename,$fwRule->fwfilter->record_id);
            // var_dump($res);
            // die;
        }
       

       if(isset($res[0]))
       {

            $filter_id=$res[0]->id;

            $rule_id = !empty($request->rule_id) ? $request->rule_id : 0;

            if($rule_id > 0) {
                //$fwRule = FwRule::find($rule_id);
                $res=$FW->updateRule($zone->zone_id,$fwRule->record_id,$ruleaction,$rulename,false,$filter_id,$expression);


            } else {
                $res=$FW->addRule($zone->zone_id,$filter_id,$rulename,$ruleaction);
            }



            

            if(isset($res[0]))
            {

                echo "success";
            }
            else
            {
                echo $res;
            }
       }
       else
       {

        echo $res;

       }



        

      


    
    }


    public function createAccessRule(Request $request)
    {
        //

        $zone_id=$request->input('zid');

        $zone= Zone::find($zone_id);
        if(!(auth()->user()->id == $zone->user->id OR auth()->user()->id == $zone->cfaccount->reseller->id OR auth()->user()->id == 1))
    {
            return abort(401);
    }

        $target=$request->input('target');
    
        $value=$request->input('value');
         $mode=$request->input('mode');

       
        $data=[
            'record_ID'  =>  'PENDING',
            'target'  =>  $target,
            'value'  =>  $value,
            'mode'   =>  $mode,
            'scope'    => 'zone',
            'status' => 'active',
            'zone_id'   => $zone_id,
        ];

       
        $record=FirewallRule::create($data);


        UpdateFirewallRule::dispatch($zone,$record->id)->onConnection('sync');

        echo "success";
         //return redirect()->route('admin.dns',['zone'   =>  $zone->name]);
    }

    public function createUaRule(Request $request)
    {
        //

        $zone_id=$request->input('zid');

        $zone= Zone::find($zone_id);
        if(!(auth()->user()->id == $zone->user->id OR auth()->user()->id == $zone->cfaccount->reseller->id OR auth()->user()->id == 1))
    {
            return abort(401);
    }

        $description=$request->input('description');
    
        $value=$request->input('value');
         $mode=$request->input('mode');

       
        $data=[
            'record_ID'  =>  'PENDING',
            'description'  =>  $description,
            'value'  =>  $value,
            'mode'   =>  $mode,
            
            'paused' => false,
            'zone_id'   => $zone_id,
        ];

       
        $record=UaRule::create($data);


        UpdateUaRule::dispatch($zone,$record->id)->onConnection('sync');

        echo "success";
         //return redirect()->route('admin.dns',['zone'   =>  $zone->name]);
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        //
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Dns  $dns
     * @return \Illuminate\Http\Response
     */
    public function show(Dns $dns)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  \App\Dns  $dns
     * @return \Illuminate\Http\Response
     */
    public function edit(Dns $dns)
    {
        //


    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Dns  $dns
     * @return \Illuminate\Http\Response
     */


        public function wafGroupDetails($zone,$pid,$gid)
    {
        //
  $zone =   Zone::where('name',$zone)->first();
            

            $wafRules=$zone->wafPackage->where('id',$pid)->first()->wafGroup->where('id',$gid)->first()->wafRule;
            // dd($wafRules->wafRule);
            // 
            
                    return view('admin.firewall.wafGroupDetails', compact('wafRules'));
    }

        public function editUaRule(Request $request)
    {
        //



        $zone_id=$request->input('zid');
        $rule_id= $request->input('ruleid');

        $zone= Zone::find($zone_id);
        if(!(auth()->user()->id == $zone->user->id OR auth()->user()->id == $zone->user->owner OR auth()->user()->id == 1))
    {
            return abort(401);
    }

        $value=$request->input('value');
        $description=$request->input('description');
        $mode=$request->input('mode');
        
        $data=[
            
            'value'  =>  $value,
            'description'  =>  $description,
            'mode'  =>  $mode
    
        ];

         $uaRule = UaRule::findOrFail($rule_id);
          
           $uaRule->update($data);

           $uaRule->save();


       
        

        
        
         UpdateUaRule::dispatch($zone,$uaRule->id)->onConnection('sync');

         echo "success";
         // return redirect()->route('admin.pagerules',['zone'   =>  $zone->name]);
    }
    public function updateFirewallRule(Request $request, $zone)
    {
        //

        $zone=Zone::where('name',$zone)->first();

        if(!(auth()->user()->id == $zone->user->id OR auth()->user()->id == $zone->user->owner OR auth()->user()->id == 1))
    {
            return abort(401);
    }

         $rule=$zone->FirewallRule->where('id',$request->input('id'))->first();

        //echo($rule->mode);
        $rule->mode=$request->input('value');
        $rule->save();
        // $rule1=Zone::where('name',$zone)->first()->FirewallRule->where('id',$request->input('id'))->first();
        //   echo($rule1->mode);
        //   
        
        UpdateFirewallRule::dispatch($zone, $rule->id)->onConnection('sync');

        echo "Access Rule Updated";
   
    }

        public function updateUaRule(Request $request, $zone)
    {
        //

        $zone=Zone::where('name',$zone)->first();

        if(!(auth()->user()->id == $zone->user->id OR auth()->user()->id == $zone->user->owner OR auth()->user()->id == 1))
    {
            return abort(401);
    }

         $rule=$zone->UaRule->where('id',$request->input('id'))->first();

        //echo($rule->mode);
        $rule->mode=$request->input('value');
        $rule->save();
        // $rule1=Zone::where('name',$zone)->first()->FirewallRule->where('id',$request->input('id'))->first();
        //   echo($rule1->mode);
        //   
        
        UpdateUaRule::dispatch($zone, $rule->id);

        echo "Access Rule Updated";
   
    }

        public function uaRuleStatus(Request $request)
    {

        $data=$request->all();

        $zone=UaRule::find($data['id'])->zone;

       if(!(auth()->user()->id == $zone->user->id OR auth()->user()->id == $zone->user->owner OR auth()->user()->id == 1))
    {
            return abort(401);
    }
        if($data['value']!='1')
        {
            $data['value']='0';
        }

        $UaRule=UaRule::where('id', $data['id'])->first();
        $UaRule->paused=$data['value'];

        $UaRule->save();

        UpdateUaRule::dispatch($zone,$UaRule->id)->onConnection('sync');

    
    }
    public function updateWafGroup(Request $request, $zone)
    {
        //

        $zone = Zone::where('name',$zone)->first();
        // dd($zone);
        if(!(auth()->user()->id == $zone->user->id OR auth()->user()->id == $zone->user->owner OR auth()->user()->id == 1))
    {
            return abort(401);
    }

         // $rule=Zone::where('name',$zone)->first()->wafPackage->whereIn('id',function ($query) {
         //        $query->select('package_id')->from('waf_groups')
         //        ->Where('id','=','valueRequired');
        $id=$request->input('id');

        $wafGroup = wafGroup::where('id',$id)->first();


        if($request->input('value')=="true")
        {
            $value="on";
        }
        else
        {
            $value="off";
        }

       
        $wafGroup->mode=$value;
        $wafGroup->save();
       



        
        if($zone->cfaccount_id!=0)
        {
            UpdateWAFGroup::dispatch($zone, $wafGroup->id);
        }
        else
        {
            UpdateSPWAF::dispatch($zone, $wafGroup->id);
        }
        
        
    }
    public function updateWafRule(Request $request, $zone)
    {
        //

        $zone = Zone::where('name',$zone)->first();
        // dd($zone);
        if(!(auth()->user()->id == $zone->user->id OR auth()->user()->id == $zone->user->owner OR auth()->user()->id == 1))
    {
            return abort(401);
    }

         // $rule=Zone::where('name',$zone)->first()->wafPackage->whereIn('id',function ($query) {
         //        $query->select('package_id')->from('waf_groups')
         //        ->Where('id','=','valueRequired');
        $id=$request->input('id');

        $wafRule = wafRule::where('id',$id)->first();

        $value=$request->input('value');
        

       
        $wafRule->mode=$value;
        $wafRule->save();
       



        
        if($zone->cfaccount_id!=0)
        {
            UpdateWAFRule::dispatch($zone, $wafRule->id)->onConnection('sync');
        }
        else
        {
            // UpdateSPWAF::dispatch($zone, $wafGroup->id);
        }
        
        echo "success";
        
    }

public function updateWafPackage(Request $request, $zone)
    {
        //


         // $rule=Zone::where('name',$zone)->first()->wafPackage->whereIn('id',function ($query) {
         //        $query->select('package_id')->from('waf_groups')
         //        ->Where('id','=','valueRequired');
            $id=$request->input('id');

         $zone = Zone::where('name',$zone)->first();

         if(!(auth()->user()->id == $zone->user->id OR auth()->user()->id == $zone->user->owner OR auth()->user()->id == 1))
    {
            return abort(401);
    }


        $wafPackage = $zone->wafPackage->where('id',$id)->first();

        echo $wafPackage->{$request->input('setting')};
        $wafPackage->{$request->input('setting')}=$request->input('value');

        $wafPackage->save();

        $wafPackage = $zone->wafPackage->where('id',$id)->first();

        echo $wafPackage->{$request->input('setting')};

        // if($request->input('value')=="true")
        // {
        //     $value="on";
        // }
        // else
        // {
        //     $value="off";
        // }

       
       
       



       

        UpdateWAFPackage::dispatch($zone, $wafPackage->id);
        
    }


    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Dns  $dns
     * @return \Illuminate\Http\Response
     */
    public function destroy(Request $request)
    {
        //
         $data=$request->all();
        $firewallRule=FirewallRule::find($data['id']);

        
        $zone=$firewallRule->zone;
        if(!(auth()->user()->id == $zone->user->id OR auth()->user()->id == $zone->user->owner OR auth()->user()->id == 1))
    {
            return abort(401);
    }

        

            $rule_id=$firewallRule->record_id;
            $firewallRule->delete();

            DeleteFirewallRule::dispatch($zone,$rule_id)->onConnection('sync');

           // return redirect()->route('admin.firewal.index',['zone'   =>  $zone->name]);


        


    }


     public function destroyFwRule($zone, $id)
    {
        //
        $firewallRule=FwRule::find($id);

        
        $zone=$firewallRule->zone;
        if(!(auth()->user()->id == $zone->user->id OR auth()->user()->id == $zone->user->owner OR auth()->user()->id == 1))
    {
            return abort(401);
    }

        

            $rule_id=$firewallRule->record_id;
            $firewallRule->delete();
            // dd($rule_id);
            DeleteFWRule::dispatch($zone,$rule_id)->onConnection('sync');

            return redirect()->route('admin.firewal.index',['zone'   =>  $zone->name]);


        


    }


    public function destroyUaRule(Request $request)
    {
        //

        $data=$request->all();
        $UaRule=UaRule::find($data['id']);

        
        $zone=$UaRule->zone;

        if(!(auth()->user()->id == $zone->user->id OR auth()->user()->id == $zone->user->owner OR auth()->user()->id == 1))
    {
            return abort(401);
    }

        

            $rule_id=$UaRule->record_id;
            $UaRule->delete();

            DeleteUaRule::dispatch($zone,$rule_id);




        


    }
}
