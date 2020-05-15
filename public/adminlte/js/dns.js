$("#create_dns").submit(function(e){

    e.preventDefault();


    type=$(this).serializeArray()[2].value;
    content=$(this).serializeArray()[4].value;

    hostname=$(this).serializeArray()[3].value;
// alert(type)

    canContinue=true;

// alert(hostname)
    if (hostname=="") {

        // alert('invalid Hostname');

        swal('Error!','invalid Hostname Provided','warning');

        canContinue=false;

        return false;

    }
    else
    {

        // alert("s")
        canContinue=true;

    }

    if(canContinue==true)
    {
        if(type=="A")
        {
            if (!content.match(/^(\d|[1-9]\d|1\d\d|2([0-4]\d|5[0-5]))\.(\d|[1-9]\d|1\d\d|2([0-4]\d|5[0-5]))\.(\d|[1-9]\d|1\d\d|2([0-4]\d|5[0-5]))\.(\d|[1-9]\d|1\d\d|2([0-4]\d|5[0-5]))$/)) {


                swal('Error!','invalid IP in Content field.','warning');
                canContinue=false;

                return false;

            }
            else
            {
                canContinue=true;

            }
        }
        else if(type=="MX" || type=="CNAME" || type=="NS")
        {
            if (!content.match(/^[A-Za-z0-9\-_.]*/)) {


                swal('Error!','invalid Hostname in Content field.','warning');
                canContinue=false;

                return false;

            }
            else
            {
                canContinue=true;

            }

        }
    }

    if(canContinue==true)
    {

        waitingDialog.show();
        $.ajax({
            url: 'createDNS',
            type: 'POST',
            context: this,
            data: $(this).serialize()+"&_token="+_token,
            success: function(data) {
                // $(this).closest('tr').addClass("alert-success");
                // $(this).closest('tr').find("select").closest("td").text("DNS Created");
                // $(this).hide();
                waitingDialog.hide();
                if(data=="success")
                {


                    $("#dns").modal('hide');

                    new Noty({
                        text: '<div class="text-left">DNS Created</strong></div>',
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

    }

})

//Delete DNS
$(".deleteDNS").click(function(){


    //$(this).prop("disabled", true);

    var recordid=$(this).attr('record-id');
    swal({
        title: "Delete this DNS Record",
        text: "You won't be able to recover this record, once deleted.",
        type: "warning",
        showCancelButton: true,
        closeOnConfirm: false,
        showLoaderOnConfirm: true
    }, function () {


        $.ajax({
            url: 'dns/delete',
            type: 'DELETE',
            data: "id="+recordid+"&_token="+$("input[name=csrftoken]").attr("value"),
            success: function(data) {

                if(data=='error')
                {
                    swal('Error!','Could not delete the record, please refresh the page and try again.','warning');
                }
                else
                {


                    $("#record_"+recordid).hide();
                    swal("Deleted!","DNS Record Deleted!",'success');
                }
            },
            failure: function(data){

                //$(this).removeAttr("disabled");
            }
        });

    });







});

//Update DNS
$(".dnsProxy").change(function(){


    //$(this).prop("disabled", true);


    if($(this).is(':checked'))
    {
        value=1;
    }
    else
    {
        value=0;
    }


    $(this).prop("disabled", true);


// dataOn=$(this).attr("data-on");
// dataOff=$(this).attr("data-off");


// $(this).attr("data-on","<i class='fa fa-spin fa-spinner'></i>");
// $(this).attr("data-off","<i class='fa fa-spin fa-spinner'></i>");

// $(this).bootstrapToggle('destroy');

// $(this).bootstrapToggle();
    if($(this).is(':checked'))
    {
        value=true;
    }
    else
    {
        value=false;
    }



    $.ajax({
        url: 'dnsProxy',
        type: 'PATCH',
        value:value,
        selector:$(this),
        data: "id="+$(this).attr('record-id')+"&value="+value+"&_token="+$("input[name=csrftoken]").attr("value"),
        success: function(data) {
            //$(this).removeAttr("disabled");

            if(value==true)
            {
                message="DNS Proxy enabled successfuly!"
            }
            else
            {
                message="DNS Proxy disabled successfuly!"
            }


            if(data=='error')
            {
                swal('Error!','Could not update the record, please refresh the page and try again.','warning');
            }
            else
            {

                new Noty({
                    text: '<div class="text-left">'+message+'</strong></div>',
                    type: 'success',
                    theme: 'mint',
                    layout: 'bottomRight',
                    timeout: 4000,
                    animation: {
                        open: mojsShow

                    }
                }).show()





            }

            this.selector.prop("disabled","");
// this.selector.attr("data-on",this.dataOn);
// this.selector.attr("data-off",this.dataOff);

// this.selector.bootstrapToggle('destroy');

// this.selector.bootstrapToggle();

            this.selector.removeAttr("disabled");
        },
        failure: function(data){

            //$(this).removeAttr("disabled");
        }
    });





});

//make username editable
$('.name').editable({
    type: 'text',
    url: 'dns/update',
    title: 'Enter Hostname',

    validate: function (value) {
        if (!value.match(/^[A-Za-z0-9\-_.]*/)) {
            return 'Invalid Hostname';
        }
    },

    success: function(response, newValue) {
        //alert(newValue);
        //if(response.status == 'error') return response.msg; //msg will be shown in editable form
    }
});

$('.ttl').editable({

    url: 'dns/update',
    title: 'Select TTL for this Record',
    mode:'popup',
    source: [
        {value: '1', text: 'Automatic TTL'},
        {value: '120', text: '2 minutes'},
        {value: '300', text: '5 minutes'},
        {value: '600', text: '10 minutes'},
        {value: '900', text: '15 minutes'},
        {value: '1800', text: '30 minutes'},
        {value: '3600', text: '1 hour'},
        {value: '7200', text: '2 hours'},
        {value: '18000', text: '5 hours'},
        {value: '43200', text: '12 hours'},
        {value: '86400', text: '1 day'}
    ],
    validate: function (value) {
        if (!value.match(/^[A-Za-z0-9\-_.]*/)) {
            return 'Invalid Hostname';
        }
    },

    success: function(response, newValue) {


        //alert(newValue);
        if(response=='error')
        {
            swal('Error!','Could not update the TTL, please refresh the page and try again.','warning');
        }
    }
});

$('.value').editable({
    type: 'text',
    url: 'dns/update',
    title: 'Enter Value',

    validate: function (value) {
        if (!value.match(/^(\d|[1-9]\d|1\d\d|2([0-4]\d|5[0-5]))\.(\d|[1-9]\d|1\d\d|2([0-4]\d|5[0-5]))\.(\d|[1-9]\d|1\d\d|2([0-4]\d|5[0-5]))\.(\d|[1-9]\d|1\d\d|2([0-4]\d|5[0-5]))$/)) {
            return 'Invalid IP Address';
        }
    },

    success: function(response, newValue) {
        if(response=='error')
        {
            swal('Error!','Could not update the record, please refresh the page and try again.','warning');
        }

        //if(response.status == 'error') return response.msg; //msg will be shown in editable form
    }
});


$('.cname').editable({
    type: 'text',
    url: 'dns/update',
    title: 'Enter Value',

    validate: function (value) {
        if (!value.match(/^[A-Za-z0-9\-_.]*/)) {
            return 'Invalid Hostname';
        }
    },

    success: function(response, newValue) {
        //alert(newValue);
        //if(response.status == 'error') return response.msg; //msg will be shown in editable form
    }
});

$('.otherValues').editable({
    type: 'text',
    url: 'dns/update',
    title: 'Enter Value',

    validate: function (value) {

    },

    success: function(response, newValue) {
        //alert(newValue);
        //if(response.status == 'error') return response.msg; //msg will be shown in editable form
    }
});