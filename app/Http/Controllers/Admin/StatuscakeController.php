<?php

namespace App\Http\Controllers\Admin;


use App\Http\Requests\Admin\UpdateAbilitiesRequest;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Gate;
use App\Http\Controllers\Controller;
use Silber\Bouncer\Database\Ability;

use App\Cfaccount;
use App\User;

use App\Zone;

use App\Jobs\FetchZones;

use App\Jobs\FetchZoneDetails;
use App\Jobs\FetchZoneSetting;
use App\Jobs\FetchDns;
use App\Jobs\FetchWAFPackages;
use App\Jobs\FetchAnalytics;
use App\Jobs\FetchFirewallRules;

use App\Libraries\Statuscake;

class StatuscakeController extends Controller
{
    /**
     * Display a listing of Abilities.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        if (! Gate::allows('users_manage')) {
            return abort(401);
        }

        // $tests=Statuscake::getTests();

        $tests=Statuscake::getTests(3101696);
        
        die();
        //$cfAccounts = Cfaccount::all();
        
         if (auth()->user()->id == 1) {
            $users = User::whereIs('organization')->where('owner', auth()->user()->id)->with('zone')->get();
        } else {
            $users = User::whereIs('organization')->where('owner', auth()->user()->id)->with('zone')->get();

        }


        $zones=[];
        if(count($users) > 0)
        {

                        foreach ($users as $user1)
                        {

                         if (count($user1->zone) > 0)
                         {
                            foreach ($user1->zone as $zone){
                    
                                $zones[]=[
                                    "name" => $zone->name,
                                    "id" => $zone->id,
                                ];
                            }


                            foreach(User::where('owner',$user1->id)->with('zone')->get() as $user)
                            {
                                if (count($user->zone) > 0)
                        {
                            foreach ($user->zone as $zone)
                        {
                            $zones[]=[
                                    "name" => $zone->name,
                                    "id" => $zone->id,
                                ];
                        }
                        }
                            }







                         }
                        }

                        }


          


        return view('admin.statuscake.import', compact('tests','zones'));
    }




    public function importZones(Cfaccount $cfaccount)
    {
        if (! Gate::allows('users_manage')) {
            return abort(401);
        }  


        
        if(!(auth()->user()->id == $cfaccount->reseller->id OR auth()->user()->id == 1))
        {

            // dd("s");
            return abort(401);
        }
        $page=1;
        $FetchZones= new FetchZones($cfaccount,$page);
        $FetchZones=$FetchZones->handle();
        $zones=$FetchZones->result;
        $total_pages=$FetchZones->result_info->total_pages;
       
        if($total_pages>$page)
        {
            while($total_pages>$page)
            {
                $page++;
                    $FetchZones= new FetchZones($cfaccount,$page);
                    $FetchZones=$FetchZones->handle();
                    $zones=array_merge($zones,$FetchZones->result);

            }
        
        }
        $existingZones= Zone::all();
        

        foreach ($zones as $zone) {
            $zone->exists=$existingZones->contains('name',$zone->name);
            if($zone->exists)
            {
                $zone->existing=$existingZones->where('name',$zone->name)->first();
            }
            
        }
       // dd($zones);

        $users = User::where('owner',auth()->user()->id)->get();

        return view('admin.cfaccounts.import', compact('users','cfaccount','zones','existingZones'));
    }


    public function importZoneUsingName(Request $request)
    {
         if (!Gate::allows('users_manage')) {
            return abort(401);
        }

    }

    public function doImport(Request $request)
    {
        //
        if (!Gate::allows('users_manage')) {
            return abort(401);
        }



        //var_dump($zr);
 
            $zone = Zone::create([
                "name"         => $request->name,
                "zone_id"      => $request->zone_id,
                "cfaccount_id"  => (int)$request->cfaccount,
                "user_id"      => $request->userID

            ]);


            //dd($zone);
        FetchZoneDetails::dispatch($zone);
        FetchZoneSetting::dispatch($zone);
        FetchDns::dispatch($zone);
        FetchWAFPackages::dispatch($zone);
        FetchAnalytics::dispatch($zone);
        FetchFirewallRules::dispatch($zone);

            // $request->session()->flash('status', 'Zone Created Successfully! Please update the DNS at domain registrar for '.$request->name ." to <b>".$result->name_servers[0]."</b> & <b>".$result->name_servers[1]."</b>");
            
        return response($request->name." imported Successfully and assigned to ".User::where('id',$request->userID)->first()->email);


        //$user = User::create($request->all());

        // foreach ($request->input('roles') as $role) {
        //     $user->assign($role);
        // }
        


        //return redirect()->route('admin.zones.index');

    }

    /**
     * Show the form for creating new Ability.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
        if (! Gate::allows('users_manage')) {
            return abort(401);
        }
        return view('admin.cfaccounts.create');
    }

    /**
     * Store a newly created Ability in storage.
     *
     * @param  \App\Http\Requests\StoreAbilitiesRequest  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        if (! Gate::allows('users_manage')) {
            return abort(401);
        }

        $cfaccount=Cfaccount::create($request->except('_token'));

        $cfaccount->reseller_id=auth()->user()->id;
        $cfaccount->save();

        return redirect()->route('admin.cfaccounts.index');
    }


    /**
     * Show the form for editing Ability.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function edit($id)
    {
        if (! Gate::allows('users_manage')) {
            return abort(401);
        }
        $ability = Ability::findOrFail($id);

        return view('admin.abilities.edit', compact('ability'));
    }

    /**
     * Update Ability in storage.
     *
     * @param  \App\Http\Requests\UpdateAbilitiesRequest  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(UpdateAbilitiesRequest $request, $id)
    {
        if (! Gate::allows('users_manage')) {
            return abort(401);
        }
        $ability = Ability::findOrFail($id);
        $ability->update($request->all());

        return redirect()->route('admin.abilities.index');
    }


    /**
     * Remove Ability from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        if (! Gate::allows('users_manage')) {
            return abort(401);
        }
        $ability = Ability::findOrFail($id);
        $ability->delete();

        return redirect()->route('admin.abilities.index');
    }

    /**
     * Delete all selected Ability at once.
     *
     * @param Request $request
     */
    public function massDestroy(Request $request)
    {
        if (! Gate::allows('users_manage')) {
            return abort(401);
        }
        if ($request->input('ids')) {
            $entries = Ability::whereIn('id', $request->input('ids'))->get();

            foreach ($entries as $entry) {
                $entry->delete();
            }
        }
    }

}
