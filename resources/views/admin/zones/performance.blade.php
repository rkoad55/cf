@inject('request', 'Illuminate\Http\Request')
@extends('layouts.app')

@section('content')
    
<div class="content">
    <div class="container">
      <div class="row">
        <div class="col">
          <div class="content-title">
            <h1>Speed</h1>
            <h2>Manage performance settings for your website</h2>
          </div>





          <div class="card card-2col">
            <div class="card-body">
              <div class="row no-gutters">
              
          <div class="col-sm-12 col-md-9 left">
                  <div>
                    <h3>Auto Minify</h3>
                    <p>Reduce the file size of source code on your website.</p>
                    <p><strong>Note:</strong> Purge cache to have your change take effect immediately.</p>
                    <small class="hidden">This setting was last changed 6 years ago</small>
                  </div>
                </div>
                <div class="col-sm-12 col-md-3 right">

                  <div>

                    <div class="form-check">
<div class="row no-gutters">
              <div class="col-lg-12">
               <div  class="setting-title" >
               Javascript
               </div>
               </div>
               <div class="row no-gutters">
          <div class="col-sm-12 col-md-9 left">
               <?php $minify_js=$zoneSetting->where('name','minify_js')->first()->value; ?>
               <select  settingid="{{$zoneSetting->where('name','minify_js')->first()->id }}"  style="width: 200px;" class="select2 changeableSetting" id="minify_js" name="minify_js">
                    <option {{ $minify_js === "off" ? "selected":"" }} value="off">Off</option>
                    <option {{ $minify_js === "on" ? "selected":"" }} value="on">On</option>
                </select>
              </div>
              </div>
</div>
                <div class="row  no-gutters">
              <div class="col-lg-12">
               <div  class="setting-title" >
               CSS
               </div>
               </div>
               <div class="row no-gutters">
          <div class="col-sm-12 col-md-9 left">
               <?php $minify_css=$zoneSetting->where('name','minify_css')->first()->value; ?>
               <select  settingid="{{$zoneSetting->where('name','minify_css')->first()->id }}"  style="width: 200px;" class="select2 changeableSetting" id="minify_css" name="minify_css">
                    <option {{ $minify_css === "off" ? "selected":"" }} value="off">Off</option>
                    <option {{ $minify_css === "on" ? "selected":"" }} value="on">On</option>
                </select>
              </div>
              </div>
</div>
                    <div class="row  no-gutters">
              <div class="col-lg-12">
               <div  class="setting-title" >
               HTML
               </div>
               </div>
               <div class="row no-gutters">
          <div class="col-sm-12 col-md-9 left">
               <?php $minify_html=$zoneSetting->where('name','minify_html')->first()->value; ?>
               <select  settingid="{{$zoneSetting->where('name','minify_html')->first()->id }}"  style="width: 200px;" class="select2 changeableSetting" id="minify_html" name="minify_html">
                    <option {{ $minify_html === "off" ? "selected":"" }} value="off">Off</option>
                    <option {{ $minify_html === "on" ? "selected":"" }} value="on">On</option>
                </select>
              </div>
              </div>
                      
                   
                  </div>
                </div>
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
Polish    
    
</h3>




<p>
Improve image load time by optimizing images hosted on your domain. Optionally, the WebP image codec can be used with supported clients for additional performance benefits.
</p>


  <small class="hidden">This setting was last changed 2 days ago</small>


</div>

          <?php $polish=$zoneSetting->where('name','polish')->first()->value; ?>
          </div>
          <div class="col-sm-12 col-md-3 right ">
           <div  class="setting-title" >

           </div>

           
           <select  settingid="{{$zoneSetting->where('name','polish')->first()->id }}"  style="width: 200px;" class="select2 changeableSetting" id="polish" name="polish">
                <option {{ $polish == "off" ? "selected":"" }} value="off">Off</option>
                <option {{ $polish == "lossy" ? "selected":"" }} value="lossy">Lossy</option>
                <option {{ $polish == "lossless" ? "selected":"" }} value="lossless">Lossless</option>
                
                
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
Mirage    
</h3>




<p>
Improve load time for pages that include images on mobile devices with slow network connections.
</p>


  <small class="hidden">This setting was last changed 2 days ago</small>


</div>

          <?php $mirage=$zoneSetting->where('name','mirage')->first()->value; ?>
          </div>
          <div class="col-sm-12 col-md-3 right ">
           <div  class="setting-title" >

           </div>

           
           <select  settingid="{{$zoneSetting->where('name','mirage')->first()->id }}"  style="width: 200px;" class="select2 changeableSetting" id="mirage" name="mirage">
                <option {{ $mirage == "off" ? "selected":"" }} value="off">Off</option>
                <option {{ $mirage == "on" ? "selected":"" }} value="on">ON</option>
                
                
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
Rocket Loader™ </h3>




<p>
Improve load time for pages that include JavaScript.
</p>


  <small class="hidden">This setting was last changed 2 days ago</small>


</div>

          <?php $rocket_loader=$zoneSetting->where('name','rocket_loader')->first()->value; ?>
          </div>
          <div class="col-sm-12 col-md-3 right ">
           <div  class="setting-title" >

           </div>

           
           <select  settingid="{{$zoneSetting->where('name','rocket_loader')->first()->id }}"  style="width: 200px;" class="select2 changeableSetting" id="rocket_loader" name="rocket_loader">
                <option {{ $rocket_loader == "off" ? "selected":"" }} value="off">Off</option>
                <option {{ $rocket_loader == "on" ? "selected":"" }} value="on">Automatic</option>
                <option {{ $rocket_loader == "manual" ? "selected":"" }} value="manual">Manual</option>
                
                
            </select>
          
          </div>
      </div>

    </div>
</div>



@if($zone->plan=="enterprise")

<div class="card card-2col">
      <div class="card-body">
          <div class="row no-gutters">
          <div class="col-sm-12 col-md-9 left">
          <div  class="setting-title" ><h3>
Prefetching URLs From HTTP Headers </h3>




<p>
BlockDOS will prefetch any URLs that are included in the prefetch HTTP header
</p>

  <small class="hidden">This setting was last changed 2 days ago</small>


</div>

          <?php $prefetch_preload=$zoneSetting->where('name','prefetch_preload')->first()->value; ?>
          </div>
          <div class="col-sm-12 col-md-3 right ">
           <div  class="setting-title" >

           </div>

           
           <select  settingid="{{$zoneSetting->where('name','prefetch_preload')->first()->id }}"  style="width: 200px;" class="select2 changeableSetting" id="prefetch_preload" name="prefetch_preload">
                <option {{ $prefetch_preload == "off" ? "selected":"" }} value="off">Off</option>
                <option {{ $prefetch_preload == "on" ? "selected":"" }} value="on">ON</option>
                
                
            </select>
          
          </div>
      </div>

    </div>

</div>

@endif




              

 <input type="hidden" name="csrftoken" value="{{csrf_token()}}" >
    
  



          
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
