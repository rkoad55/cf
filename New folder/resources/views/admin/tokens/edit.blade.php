@extends('layouts.app')

@section('content')
    <h3 class="page-title">@lang('global.users.title')</h3>
    
    {!! Form::model($user, ['method' => 'PUT', 'route' => ['admin.users.update', $user->id]]) !!}

    <div class="panel panel-default">
        <div class="panel-heading">
            @lang('global.app_edit')
        </div>

        <div class="panel-body">
            <div class="row">
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

                   <div class="row">
                <div class="col-xs-12 form-group">
                    {!! Form::label('email', 'Email*', ['class' => 'control-label']) !!}
                    {!! Form::email('email', old('email'), ['class' => 'form-control', 'placeholder' => '', 'required' => '']) !!}
                    <p class="help-block"></p>
                    @if($errors->has('email'))
                        <p class="help-block">
                            {{ $errors->first('email') }}
                        </p>
                    @endif
                </div>
            </div>
        
            <div class="row">
                <div class="col-xs-12 form-group">
                    {!! Form::label('password', 'Password', ['class' => 'control-label']) !!}
                    {!! Form::password('password', ['class' => 'form-control', 'placeholder' => '']) !!}
                    <p class="help-block"></p>
                    @if($errors->has('password'))
                        <p class="help-block">
                            {{ $errors->first('password') }}
                        </p>
                    @endif
                </div>
            </div>
            <div  class="row">
                     <div class="col-xs-12 form-group">


                    @foreach($abilities as $ability)
                        <input style="min-width: 400px;" value="{{ $ability->name }}" name="abilities[]"  type="checkbox" data-onstyle="success" data-offstyle="secondary" {{ $user->can($ability->name) ? "checked" : "" }} data-toggle="toggle" data-on="{{ ucwords(str_replace("_", " ", $ability->name)) }}" data-off="{{ ucwords(str_replace("_", " ", $ability->name)) }}">

                    @endforeach

                    
                    <p class="help-block"></p>
                    @if($errors->has('abilities'))
                        <p class="help-block">
                            {{ $errors->first('abilities') }}
                        </p>
                    @endif
                </div>

    {!! Form::submit(trans('global.app_update'), ['class' => 'btn btn-danger']) !!}
    {!! Form::close() !!}

            </div>
            
        </div>
 

   </div>
@stop

