@inject('request', 'Illuminate\Http\Request')
@extends('layouts.app')

@section('content')
 
 <div class="content">
        <div class="container">

            <?php
            /*
            <div  class="row">
                <div class="col">
                    <div class="input-group">
                        <div class="input-group-prepend">
                            <span class="input-group-text"><i class="fas fa-search"></i></span>
                        </div>
                        <input type="text" class="form-control" placeholder="Search websites in Myname@myemail.com's account...">
                    </div>
                </div>
               
            </div>
    */
            ?>
            
            <div class="row website-cards">

              

 @if(auth()->user()->id==1)


               <div class="panel panel-inverse panel-main">
    <div class="panel-heading"><h2>Dashboard</h2></div>
    <div class="panel-body"><h3></h3>
        <table class="table table-bordered">
            <tbody>

                Users : {{ \App\User::count()-1 }} <br>
                Zones : {{ \App\Zone::count() }} <br>
                Cloudflare Accounts : {{ \App\Cfaccount::count() }} <br>

               
                
                
                        
                    
            </tbody>
        </table>
    </div>
</div>
                @else
           
    

           
            <?php

            $user=\App\User::find(auth()->user()->id);
             $allowedZone =  $request->session()->get('zone', null);
            ?>


            
            @if($allowedZone!=null)
            
                

                 <div class="col-sm-12 col-md-4 website-card">
                    <a href="{{$allowedZone}}/overview">
                        {{ $allowedZone }}
                        <span class="website-card-status active"><i class="fas fa-check"></i> Active</span>
                    </a>
                </div>
            
            @elseif($user->owner!=1 AND \App\User::find($user->owner)->isNotAn('reseller'))
                
                @foreach(\App\Zone::where('user_id',$user->owner)->get() as $zone)
              
                 <div class="col-sm-12 col-md-4 website-card">
                    <a href="{{$zone->name}}/overview">
                        {{ $zone->name }}
                        <span class="website-card-status active"><i class="fas fa-check"></i> Active</span>
                    </a>
                </div>
            @endforeach

            @else

            
            <?php $ids=\App\User::where('owner',$user->id)->pluck('id')->toArray();
            $ids[]=$user->id;

             ?>
            @foreach(\App\Zone::whereIn('user_id',$ids)->get() as $zone)
               
                <div class="col-sm-12 col-md-4 website-card">
                    <a href="{{$zone->name}}/overview">
                        {{ $zone->name }}
                        <span class="website-card-status active"><i class="fas fa-check"></i> Active</span>
                    </a>
                </div>
            @endforeach
                
            @endif
                
                        
                    


 @endif



               
                


                


            </div>

        </div>
    </div>   


@stop


