
<script src="{{ url('v3/js') }}/bootstrap.bundle.min.js"></script>
<script type="text/javascript">
	
	$(document).ready(function() {
	})
</script>
<script type="text/javascript">

    $(document).ready(function() {
        $(".search").keyup(function () {
            var value = $(this).val();
            var comp = new RegExp(value, "i");

            $('.results').find('tr').each(function() {
                if (!($(this).find('td:first-child').text().search(comp) >= 0)) {
                    $(this).not('.results thead tr').hide();
                }
                if (($(this).find('td:first-child').text().search(comp) >= 0)) {
                    $(this).show();
                }
            });
        });
    });


</script>
<script src="//cdn.datatables.net/1.10.9/js/jquery.dataTables.min.js"></script>
<script src="//cdn.datatables.net/buttons/1.2.4/js/dataTables.buttons.min.js"></script>
<script src="//cdn.datatables.net/buttons/1.2.4/js/buttons.flash.min.js"></script>
<script src="//cdnjs.cloudflare.com/ajax/libs/jszip/2.5.0/jszip.min.js"></script>
<script src="https://cdn.rawgit.com/bpampuch/pdfmake/0.1.18/build/pdfmake.min.js"></script>
<script src="https://cdn.rawgit.com/bpampuch/pdfmake/0.1.18/build/vfs_fonts.js"></script>
<script src="https://cdn.datatables.net/buttons/1.2.4/js/buttons.html5.min.js"></script>
<script src="https://cdn.datatables.net/buttons/1.2.4/js/buttons.print.min.js"></script>
<script src="https://cdn.datatables.net/buttons/1.2.4/js/buttons.colVis.min.js"></script>
<script src="https://cdn.datatables.net/select/1.2.0/js/dataTables.select.min.js"></script>


<script src="https://cdn.jsdelivr.net/gh/gitbrent/bootstrap4-toggle@3.4.0/js/bootstrap4-toggle.min.js"></script>
<script src="{{ url('v3/js') }}/jquery-ui.min.js"></script>
<script src="{{ url('adminlte/js') }}/select2.full.min.js"></script>

<script src="{{ url('js') }}/bootstrap-editable.min.js"></script>
<script src="{{ url('js') }}/sweetalert.min.js"></script>

<script src="{{ url('js') }}/mo.min.js"></script>

    <script src="{{ url('noty') }}/noty.min.js"></script>

    <script src="{{ url('jmspinner') }}/jm.spinner.js"></script>
    
<script src="{{ url('adminlte/js') }}/main.js"></script>

<script src="{{ url('adminlte/plugins/slimScroll/jquery.slimscroll.min.js') }}"></script>
<script src="{{ url('adminlte/plugins/fastclick/fastclick.js') }}"></script>
@if(Request::is('*/dns'))
    <script src="{{ url('adminlte/js/dns.js') }}"></script>
@endif
<script src="{{ url('adminlte/js/app.min.js') }}"></script>

<script>
    window._token = '{{ csrf_token() }}';
</script>



@yield('javascript')