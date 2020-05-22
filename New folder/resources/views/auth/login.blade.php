@extends('layouts.auth')

@section('content')


<?php

if($branding)
    {

        if($branding->logo!="")
        {
            $logo=$branding->logo;
        }
        else
        {
            $logo='images/bd-logo-white.png';
        }


    }
    else
    {
        $logo='images/bd-logo-white.png';
    }

    if($logo=="")
    {
        $logo='images/bd-logo-white.png';
    }
$logo='images/bd-logo-white.png';
    ?>


<div class="header">
    <div class="container-fluid">
      <div class="row justify-content-between align-items-center">
        <div class="col">
          <a href="dashboard-home.html" class="logo"><img src="{{ $logo }}" alt="@if($branding)
                  {{ ucfirst($branding->name) }}
                @else
                {{ ucfirst(config('app.name')) }}
                @endif"></a>
        </div>
        <div class="col text-right">
          <div class="header-menu row justify-content-end">
            <div class="dropdown">
              <div class="dropdown-container">
                <button class="btn btn-h dropdown-toggle" type="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                  Support
                </button>
                <div class="dropdown-menu dropdown-menu-right">
                  <a class="dropdown-item" href="#">Help Center</a>
                  <a class="dropdown-item" href="#">Contact Support</a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>

  <div class="content">
    <div class="container">
      <div class="row justify-content-center">
        <div class="col-sm-10">
          <div class="card login-form gradient-card">

            <div class="card-body text-center">
              <div class="row justify-content-center">
                <div class="col-sm-10 col-md-8 col-lg-6">
                  <h2 class="card-title">Log in to @if($branding)
                  {{ ucfirst($branding->name) }}
                @else
                {{ ucfirst(config('app.name')) }}
                @endif Enterprise Panel</h2>
                  <form method="post" action="{{ url('login') }}">
                      <input type="hidden"
                               name="_token"
                               value="{{ csrf_token() }}">
                    <div class="form-group">
                      <label for="email">Email</label>
                      <input type="email" class="form-control" id="email" name="email" value="{{ old('email') }}" placeholder="Email">
                    </div>
                    <div class="form-group">
                      <label for="password">Password</label>
                      <input type="password" class="form-control" id="password" name="password" placeholder="Password">
                    </div>
                    <div class="row">
                      <div class="col">
                        <div class="form-group form-check">
                          <input type="checkbox" class="form-check-input" name="remember" id="remember">
                          <label class="form-check-label" for="remember">Remember Me</label>
                        </div>
                      </div>
                      <div class="col text-right">
                        <a href="{{ route('auth.password.reset') }}">Forgot Password?</a>
                      </div>
                    </div>
                    <div class="text-center">
                      <button type="submit" class="btn btn-primary btn-block">Log in</button>
                    </div>
                  </form>

                        @if (count($errors) > 0)
                        <div class="alert alert-danger">
                            <strong>Whoops!</strong> There were problems with input:
                            <br><br>
                            <ul>
                                @foreach ($errors->all() as $error)
                                    <li>{{ $error }}</li>
                                @endforeach
                            </ul>
                        </div>
                    @endif
                </div>
              </div>

            </div>

          </div>
        </div>
      </div>
    </div>
  </div>



<script src="js/jquery-3.3.1.min.js"></script>

    @if($current_time_zone=Session::get('current_time_zone'))@endif
<input type="hidden" id="hd_current_time_zone" value="{{{$current_time_zone}}}">


<script type="text/javascript">
  $(document).ready(function(){
      if($('#hd_current_time_zone').val() ==""){ // Check for hidden field is empty. if is it empty only execute the post function
          var current_date = new Date();
          curent_zone = -current_date.getTimezoneOffset() * 60;
          var token = "{{csrf_token()}}";
          $.ajax({
            method: "POST",
            url: "{{URL::to('ajax/set_current_time_zone/')}}",
            data: {  '_token':token, curent_zone: curent_zone }
          }).done(function( data ){
        });
      }
});
</script>
@endsection
