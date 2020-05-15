$(".firewallAction").change(function(){

    $.ajax({
        url: 'updateFirewallRule',
        type: 'PUT',
        data: "id="+$(this).attr('id')+"&value="+$(this).val()+"&_token="+$("input[name=csrftoken]").attr("value"),
        success: function(data) {


            new Noty({
                text: '<div class="text-left">'+data+'</strong></div>',
                type: 'success',
                theme: 'mint',
                layout: 'bottomRight',
                timeout: 4000,
                animation: {
                    open: mojsShow

                }
            }).show()

        }
    });


});

$(".fwRuleForm"). on('submit', function (e) {



    e.preventDefault();

    $.ajax({
        url: 'addFwRule',
        type: 'put',
        context: this,
        data: $(this).serialize()+"&_token="+_token,

        beforeSend:function()
        {
            waitingDialog.show();
        },
        success: function(data) {

            waitingDialog.hide();
            if(data=="success")
            {


                $("#dns").modal('hide');

                new Noty({
                    text: '<div class="text-left">Firewall Rule Created</strong></div>',
                    type: 'success',
                    theme: 'mint',
                    layout: 'bottomRight',
                    timeout: 4000,
                    animation: {
                        open: mojsShow

                    }
                }).show()

                location.reload();

            }
            else
            {

                swal('Error!',data,'warning');
            }

        },
        failure: function(data){

            //$(this).removeAttr("disabled");
        }
    });

})

$(".firewallEvents").DataTable({
    "sPaginationType": "full_numbers",
    "aoColumns": [
        {"bSortable": true},
        {"bSortable": true},
        {"bSortable": true},
        null,
        {"iDataSort": 5},

        {"bVisible": false},

        null
    ],"order": [[ 5, "desc" ]]
});

$(".firewallEventsSp").DataTable({
    "sPaginationType": "full_numbers",
    "aoColumns": [
        {"bSortable": true},
        {"bSortable": true},
        {"bSortable": true},
        {"bSortable": true},
        null,
        {"iDataSort": 6},

        {"bVisible": false},

        null
    ],"order": [[ 6, "desc" ]]
});

$(".deleteRule").click(function(){


    //$(this).prop("disabled", true);

    var ruleid=$(this).attr('rule-id');
    swal({
        title: "Delete this Firewall Rule?",
        text: "You won't be able to recover this Rule, once deleted.",
        type: "warning",
        showCancelButton: true,
        closeOnConfirm: false,
        showLoaderOnConfirm: true
    }, function () {


        $.ajax({
            url: 'rule/delete',
            type: 'DELETE',
            data: "id="+ruleid+"&_token="+$("input[name=csrftoken]").attr("value"),
            success: function(data) {

                $("#rule_"+ruleid).hide();
                swal("Deleted!","Firewall Rule Removed!",'success');
            },
            failure: function(data){

                //$(this).removeAttr("disabled");
            }
        });

    });







});