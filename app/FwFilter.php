<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class FwFilter extends Model
{
    //

     protected $guarded = ['id'];

   


    public function FwRule()
    {
        return $this->belongsTo('App\FwRule','fwrule_id');
    }

}
