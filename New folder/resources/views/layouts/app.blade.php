@inject('request', 'Illuminate\Http\Request')
<!DOCTYPE html>
<html>
<head>
    @include('partials.head')
</head>

<body class="@if(Request::is('*/home')) padding-top @else panelpage @endif">
   


@include('partials.topbar')

 @if(isset($zone))
 @if(!Request::is('*/home') AND !Request::is('*/zones*') AND !Request::is('*/els*') AND !Request::is('*/spels*') AND !Request::is('*/panel_logs*') AND !Request::is('*/spaccounts*') AND !Request::is('*/cfaccounts*'))


@include('partials.topmenu')
@else
<style type="text/css">
                        .main .container {
                                padding-top: 100px;
                            }
                    </style>
@endif
@endif

@include('partials.sidebar')
<!-- Content Wrapper. Contains page content -->
    <div class="main">
        <div class="container">
            @if(isset($siteTitle))
                <h3 class="page-title">
                    {{ $siteTitle }}
                </h3>
            @endif

            <div class="row">
                <div class="col-md-12">

                    @if (Session::has('message'))
                        <div class="note note-info">
                            <p>{!! Session::get('message') !!}</p>
                        </div>
                    @endif


                    @if (Session::has('status'))
                        <div style="margin-top: 50px" class="alert alert-info">
                            <p>{!! Session::get('status') !!}</p>
                        </div>
                    @endif

                    @if (Session::has('error'))
                        <div style="margin-top: 50px" class="alert alert-danger">
                            <p>{!! Session::get('error') !!}</p>
                        </div>
                    @endif


                    @if ($errors->count() > 0)
                        <div class="note note-danger">
                            <ul class="list-unstyled">
                                @foreach($errors->all() as $error)
                                    <li>{{ $error }}</li>
                                @endforeach
                            </ul>
                        </div>
                    @endif

                    @can('users_manage')

                    


                    @yield('content')

                    @endcan
                </div>
            </div>
        </div>
    </div>
@cannot('users_manage')
 @yield('content')
 @endcannot
{!! Form::open(['route' => 'auth.logout', 'style' => 'display:none;', 'id' => 'logout']) !!}

{!! Form::close() !!}

    <footer class="footer">
        <div class="container-fluid">
            <div class="row">
                <div class="col">
                    Copyright &copy; 2019 - BlockDoS. All Rights Reserved.
                </div>
            </div>
        </div>
    </footer>

@include('partials.javascripts')
<script>
    $(function() {
        /**
         * delete confirmation
         * 
         * 
         */
        $('.pageRulesTableBody').on('click','.confirm_delete', function(e) {
            e.preventDefault();
            if(confirm('Are you sure you want to delete ?')) {
                $("#delete_form_"+$(this).data("id")).submit();
            }
        });
        /**
         * add class to datatable select entries list
         */
        $('.dataTables_length').addClass('dd-holder dd-holder-xs');
        /**
         * enable tooltip
         * 
         */
        $('.list-datatables').tooltip({
            selector: '[data-toggle="tooltip"]'
        });
    });
</script>
</body>
</html>