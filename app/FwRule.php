<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class FwRule extends Model
{
    //

     protected $guarded = ['id'];

   


    public function zone()
    {
        return $this->belongsTo('App\Zone');
    }

    public function fwfilter()
    {
    	return $this->hasOne('App\FwFilter','fwrule_id');
    }

}
