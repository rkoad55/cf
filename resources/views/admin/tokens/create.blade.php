@extends('layouts.app')

@section('content')
<div class="container mt-5 pt-5">
    <h3 class="page-title">API Tokens</h3>
    {!! Form::open(['method' => 'POST', 'route' => ['admin.token.store']]) !!}

    <div class="card card-default">
        <div class="card-body">
            Create Token
        </div>
        
        
        <div class="card-body">
            <div class="row-old">
                <div class="col-xs-12 form-group">
                    {!! Form::label('name', 'Name*', ['class' => 'control-label']) !!}
                    {!! Form::text('name', old('name'), ['class' => 'form-control', 'placeholder' => '', 'required' => '']) !!}
                    <p class="help-block"></p>
                    @if($errors->has('name'))
                        <p class="help-block">
                            {{ $errors->first('name') }}
                        </p>
                    @endif
                </div>
            </div>
            
            

      
      
              {!! Form::submit(trans('global.app_save'), ['class' => 'btn btn-danger']) !!}
    {!! Form::close() !!}  
        </div>
    </div>
</div>

@stop

