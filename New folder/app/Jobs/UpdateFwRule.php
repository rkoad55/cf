<?php

namespace App\Jobs;

use Illuminate\Bus\Queueable;
use Illuminate\Queue\SerializesModels;
use Illuminate\Queue\InteractsWithQueue;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Foundation\Bus\Dispatchable;
use App\Zone;
use App\FwFilter;
use App\ZoneSetting;



class UpdateFwRule implements ShouldQueue
{
    use Dispatchable, InteractsWithQueue, Queueable, SerializesModels;

    public $user_id,$zone,$record_id,$fetch;
    /**
     * Create a new job instance.
     *
     * @return void
     */
    public function __construct(Zone $zone, int $record_id,$fetch=true)
    {
        //
        $this->zone=$zone;
         $this->fetch=$fetch;
        $this->record_id=$record_id;
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



        
      $fwRule=Zone::where('id',$this->zone->id)->first()->fwRule->where('id',$this->record_id)->first();

     // dd($fwRule); 

   
      



        if($fwRule->status=="active")
        {
          $paused=false;
        }
        else
        {
          $paused=true;
        }

        $filter=FwFilter::where('fwrule_id',$fwRule->id)->first();
        // dd($filter);
        $res=$FW->updateRule($this->zone->zone_id,$fwRule->record_id,$fwRule->action, $fwRule->description, $paused,$filter->record_id,$filter->expression);

        // dd($res);

        //$DNS->updateRecordDetails($this->zone->zone_id, $dns->record_id,$dnsArray);
      
      
      
      if($this->fetch)
      {
        //FetchFwRules::dispatch($this->zone);  
      }
      
       


        
    }
}
