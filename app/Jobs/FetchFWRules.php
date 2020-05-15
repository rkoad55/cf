<?php

namespace App\Jobs;

use Illuminate\Bus\Queueable;
use Illuminate\Queue\SerializesModels;
use Illuminate\Queue\InteractsWithQueue;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Foundation\Bus\Dispatchable;
use App\Zone;
use App\FwRule;
use App\FwFilter;
use DB;

class FetchFWRules implements ShouldQueue
{
    use Dispatchable, InteractsWithQueue, Queueable, SerializesModels;

    public $user_id,$zone;
    /**
     * Create a new job instance.
     *
     * @return void
     */
    public function __construct(Zone $zone)
    {
        //
        $this->zone=$zone;
        $this->user_id=auth()->user()->id;
    }

    /**
     * Execute the job.
     *
     * @return void
     */
    public function handle()
    {
        
        //

        $key     = new \Cloudflare\API\Auth\APIKey($this->zone->cfaccount->email, $this->zone->cfaccount->user_api_key);
        $adapter = new \Cloudflare\API\Adapter\Guzzle($key);
        $FW   = new \Cloudflare\API\Endpoints\FW($adapter);


       $rules=$FW->getRules($this->zone->zone_id);


       // dd($rules);

       DB::table('fw_rules')->where('zone_id', $this->zone->id)->delete(); 
       // die();
       // $this->zone->fwRule->
        //dd($records);
            foreach ($rules->result as $rule) {
                $check=[];

    $rule=json_decode(json_encode($rule),true);
 

    $check['zone_id'] = $this->zone->id;
    $check['record_id']    = $rule['id'];

    // $rule['description']=$rule[''];
    // $rule['action']=$rule['configuration']['target'];
    // $rule['scope']=$rule['scope']['type'];


    if($rule['paused'])
    {
            $rule['status']="paused";
    }
    else
    {
        $rule['status']="active";
    }
    
       
$filter=$rule['filter'];
    

    array_forget($rule,["filter","created_on","modified_on","priority","paused"]);
 
            // dd($rule);
      

           
    $rule=FwRule::updateOrCreate($check, $rule);
    // dd($ruleid->id);
    
    $check=[];
    $check['fwrule_id'] = $rule->id;
    $check['record_id']    = $filter['id'];

    if($filter['paused'])
    {
            $filter['status']="paused";
    }
    else
    {
        $filter['status']="active";
    }

     array_forget($filter,["filter","created_on","modified_on","priority","paused"]);
 
    FwFilter::updateOrCreate($check, $filter);
     // dd($filter);
      
            

}
    }
}
