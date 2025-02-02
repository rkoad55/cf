/*! AdminLTE app.js
 * ================
 * Main JS application file for AdminLTE v2. This file
 * should be included in all pages. It controls some layout
 * options and implements exclusive AdminLTE plugins.
 *
 * @Author  Almsaeed Studio
 * @Support <http://www.almsaeedstudio.com>
 * @Email   <abdullah@almsaeedstudio.com>
 * @version 2.3.8
 * @license MIT <http://opensource.org/licenses/MIT>
 */
function _init(){"use strict";$.AdminLTE.layout={activate:function(){var a=this;a.fix(),a.fixSidebar(),$("body, html, .wrapper").css("height","auto"),$(window,".wrapper").resize(function(){a.fix(),a.fixSidebar()})},fix:function(){$(".layout-boxed > .wrapper").css("overflow","hidden");var a=$(".main-footer").outerHeight()||0,b=$(".main-header").outerHeight()+a,c=$(window).height(),d=$(".sidebar").height()||0;if($("body").hasClass("fixed"))$(".content-wrapper, .right-side").css("min-height",c-a);else{var e;c>=d?($(".content-wrapper, .right-side").css("min-height",c-b),e=c-b):($(".content-wrapper, .right-side").css("min-height",d),e=d);var f=$($.AdminLTE.options.controlSidebarOptions.selector);"undefined"!=typeof f&&f.height()>e&&$(".content-wrapper, .right-side").css("min-height",f.height())}},fixSidebar:function(){return $("body").hasClass("fixed")?("undefined"==typeof $.fn.slimScroll&&window.console&&window.console.error("Error: the fixed layout requires the slimscroll plugin!"),void($.AdminLTE.options.sidebarSlimScroll&&"undefined"!=typeof $.fn.slimScroll&&($(".sidebar").slimScroll({destroy:!0}).height("auto"),$(".sidebar").slimScroll({height:$(window).height()-$(".main-header").height()+"px",color:"rgba(0,0,0,0.2)",size:"3px"})))):void("undefined"!=typeof $.fn.slimScroll&&$(".sidebar").slimScroll({destroy:!0}).height("auto"))}},$.AdminLTE.pushMenu={activate:function(a){var b=$.AdminLTE.options.screenSizes;$(document).on("click",a,function(a){a.preventDefault(),$(window).width()>b.sm-1?$("body").hasClass("sidebar-collapse")?$("body").removeClass("sidebar-collapse").trigger("expanded.pushMenu"):$("body").addClass("sidebar-collapse").trigger("collapsed.pushMenu"):$("body").hasClass("sidebar-open")?$("body").removeClass("sidebar-open").removeClass("sidebar-collapse").trigger("collapsed.pushMenu"):$("body").addClass("sidebar-open").trigger("expanded.pushMenu")}),$(".content-wrapper").click(function(){$(window).width()<=b.sm-1&&$("body").hasClass("sidebar-open")&&$("body").removeClass("sidebar-open")}),($.AdminLTE.options.sidebarExpandOnHover||$("body").hasClass("fixed")&&$("body").hasClass("sidebar-mini"))&&this.expandOnHover()},expandOnHover:function(){var a=this,b=$.AdminLTE.options.screenSizes.sm-1;$(".main-sidebar").hover(function(){$("body").hasClass("sidebar-mini")&&$("body").hasClass("sidebar-collapse")&&$(window).width()>b&&a.expand()},function(){$("body").hasClass("sidebar-mini")&&$("body").hasClass("sidebar-expanded-on-hover")&&$(window).width()>b&&a.collapse()})},expand:function(){$("body").removeClass("sidebar-collapse").addClass("sidebar-expanded-on-hover")},collapse:function(){$("body").hasClass("sidebar-expanded-on-hover")&&$("body").removeClass("sidebar-expanded-on-hover").addClass("sidebar-collapse")}},$.AdminLTE.tree=function(a){var b=this,c=$.AdminLTE.options.animationSpeed;$(document).off("click",a+" li a").on("click",a+" li a",function(a){var d=$(this),e=d.next();if(e.is(".treeview-menu")&&e.is(":visible")&&!$("body").hasClass("sidebar-collapse"))e.slideUp(c,function(){e.removeClass("menu-open")}),e.parent("li").removeClass("active");else if(e.is(".treeview-menu")&&!e.is(":visible")){var f=d.parents("ul").first(),g=f.find("ul:visible").slideUp(c);g.removeClass("menu-open");var h=d.parent("li");e.slideDown(c,function(){e.addClass("menu-open"),f.find("li.active").removeClass("active"),h.addClass("active"),b.layout.fix()})}e.is(".treeview-menu")&&a.preventDefault()})},$.AdminLTE.controlSidebar={activate:function(){var a=this,b=$.AdminLTE.options.controlSidebarOptions,c=$(b.selector),d=$(b.toggleBtnSelector);d.on("click",function(d){d.preventDefault(),c.hasClass("control-sidebar-open")||$("body").hasClass("control-sidebar-open")?a.close(c,b.slide):a.open(c,b.slide)});var e=$(".control-sidebar-bg");a._fix(e),$("body").hasClass("fixed")?a._fixForFixed(c):$(".content-wrapper, .right-side").height()<c.height()&&a._fixForContent(c)},open:function(a,b){b?a.addClass("control-sidebar-open"):$("body").addClass("control-sidebar-open")},close:function(a,b){b?a.removeClass("control-sidebar-open"):$("body").removeClass("control-sidebar-open")},_fix:function(a){var b=this;if($("body").hasClass("layout-boxed")){if(a.css("position","absolute"),a.height($(".wrapper").height()),b.hasBindedResize)return;$(window).resize(function(){b._fix(a)}),b.hasBindedResize=!0}else a.css({position:"fixed",height:"auto"})},_fixForFixed:function(a){a.css({position:"fixed","max-height":"100%",overflow:"auto","padding-bottom":"50px"})},_fixForContent:function(a){$(".content-wrapper, .right-side").css("min-height",a.height())}},$.AdminLTE.boxWidget={selectors:$.AdminLTE.options.boxWidgetOptions.boxWidgetSelectors,icons:$.AdminLTE.options.boxWidgetOptions.boxWidgetIcons,animationSpeed:$.AdminLTE.options.animationSpeed,activate:function(a){var b=this;a||(a=document),$(a).on("click",b.selectors.collapse,function(a){a.preventDefault(),b.collapse($(this))}),$(a).on("click",b.selectors.remove,function(a){a.preventDefault(),b.remove($(this))})},collapse:function(a){var b=this,c=a.parents(".box").first(),d=c.find("> .box-body, > .box-footer, > form  >.box-body, > form > .box-footer");c.hasClass("collapsed-box")?(a.children(":first").removeClass(b.icons.open).addClass(b.icons.collapse),d.slideDown(b.animationSpeed,function(){c.removeClass("collapsed-box")})):(a.children(":first").removeClass(b.icons.collapse).addClass(b.icons.open),d.slideUp(b.animationSpeed,function(){c.addClass("collapsed-box")}))},remove:function(a){var b=a.parents(".box").first();b.slideUp(this.animationSpeed)}}}if("undefined"==typeof jQuery)throw new Error("AdminLTE requires jQuery");$.AdminLTE={},$.AdminLTE.options={navbarMenuSlimscroll:!0,navbarMenuSlimscrollWidth:"3px",navbarMenuHeight:"200px",animationSpeed:500,sidebarToggleSelector:"[data-toggle='offcanvas']",sidebarPushMenu:!0,sidebarSlimScroll:!0,sidebarExpandOnHover:!1,enableBoxRefresh:!0,enableBSToppltip:!0,BSTooltipSelector:"[data-toggle='tooltip']",enableFastclick:!1,enableControlTreeView:!0,enableControlSidebar:!0,controlSidebarOptions:{toggleBtnSelector:"[data-toggle='control-sidebar']",selector:".control-sidebar",slide:!0},enableBoxWidget:!0,boxWidgetOptions:{boxWidgetIcons:{collapse:"fa-minus",open:"fa-plus",remove:"fa-times"},boxWidgetSelectors:{remove:'[data-widget="remove"]',collapse:'[data-widget="collapse"]'}},directChat:{enable:!0,contactToggleSelector:'[data-widget="chat-pane-toggle"]'},colors:{lightBlue:"#3c8dbc",red:"#f56954",green:"#00a65a",aqua:"#00c0ef",yellow:"#f39c12",blue:"#0073b7",navy:"#001F3F",teal:"#39CCCC",olive:"#3D9970",lime:"#01FF70",orange:"#FF851B",fuchsia:"#F012BE",purple:"#8E24AA",maroon:"#D81B60",black:"#222222",gray:"#d2d6de"},screenSizes:{xs:480,sm:768,md:992,lg:1200}},$(function(){"use strict";$("body").removeClass("hold-transition"),"undefined"!=typeof AdminLTEOptions&&$.extend(!0,$.AdminLTE.options,AdminLTEOptions);var a=$.AdminLTE.options;_init(),$.AdminLTE.layout.activate(),a.enableControlTreeView&&$.AdminLTE.tree(".sidebar"),a.enableControlSidebar&&$.AdminLTE.controlSidebar.activate(),a.navbarMenuSlimscroll&&"undefined"!=typeof $.fn.slimscroll&&$(".navbar .menu").slimscroll({height:a.navbarMenuHeight,alwaysVisible:!1,size:a.navbarMenuSlimscrollWidth}).css("width","100%"),a.sidebarPushMenu&&$.AdminLTE.pushMenu.activate(a.sidebarToggleSelector),a.enableBSToppltip&&$("body").tooltip({selector:a.BSTooltipSelector,container:"body"}),a.enableBoxWidget&&$.AdminLTE.boxWidget.activate(),a.enableFastclick&&"undefined"!=typeof FastClick&&FastClick.attach(document.body),a.directChat.enable&&$(document).on("click",a.directChat.contactToggleSelector,function(){var a=$(this).parents(".direct-chat").first();a.toggleClass("direct-chat-contacts-open")}),$('.btn-group[data-toggle="btn-toggle"]').each(function(){var a=$(this);$(this).find(".btn").on("click",function(b){a.find(".btn.active").removeClass("active"),$(this).addClass("active"),b.preventDefault()})})}),function(a){"use strict";a.fn.boxRefresh=function(b){function c(a){a.append(f),e.onLoadStart.call(a)}function d(a){a.find(f).remove(),e.onLoadDone.call(a)}var e=a.extend({trigger:".refresh-btn",source:"",onLoadStart:function(a){return a},onLoadDone:function(a){return a}},b),f=a('<div class="overlay"><div class="fa fa-refresh fa-spin"></div></div>');return this.each(function(){if(""===e.source)return void(window.console&&window.console.log("Please specify a source first - boxRefresh()"));var b=a(this),f=b.find(e.trigger).first();f.on("click",function(a){a.preventDefault(),c(b),b.find(".box-body").load(e.source,function(){d(b)})})})}}(jQuery),function(a){"use strict";a.fn.activateBox=function(){a.AdminLTE.boxWidget.activate(this)},a.fn.toggleBox=function(){var b=a(a.AdminLTE.boxWidget.selectors.collapse,this);a.AdminLTE.boxWidget.collapse(b)},a.fn.removeBox=function(){var b=a(a.AdminLTE.boxWidget.selectors.remove,this);a.AdminLTE.boxWidget.remove(b)}}(jQuery),function(a){"use strict";a.fn.todolist=function(b){var c=a.extend({onCheck:function(a){return a},onUncheck:function(a){return a}},b);return this.each(function(){"undefined"!=typeof a.fn.iCheck?(a("input",this).on("ifChecked",function(){var b=a(this).parents("li").first();b.toggleClass("done"),c.onCheck.call(b)}),a("input",this).on("ifUnchecked",function(){var b=a(this).parents("li").first();b.toggleClass("done"),c.onUncheck.call(b)})):a("input",this).on("change",function(){var b=a(this).parents("li").first();b.toggleClass("done"),a("input",b).is(":checked")?c.onCheck.call(b):c.onUncheck.call(b)})})}}(jQuery);

multiselectOldValue="";

$(document).ready(function() {




$(".canNotDelete").click(function(){

     swal('Error!','This User has domains assigned to it, Please remove those domains or reassign them to any other user.','warning');

});

$('.select2').select2({
    dropdownAutoWidth : true,


    minimumResultsForSearch: -1
})

$('.domainSelectorDiv .select2').select2({




})




$(".firewallSelect2").select2({
 tags: true

})



	$("#type").change(function(){

		if($(this).is(':checked'))
		{

			 $("#cnameBased").show();


		}
		else
		{

			$("#cnameBased").hide();

		}
	});

    //toggle `popup` / `inline` mode
    $.fn.editable.defaults.mode = 'inline';
        $.fn.editable.defaults.ajaxOptions = {type: "PUT"};
        $.fn.editable.defaults.params = function (params) {
        params._token = $("input[name=csrftoken]").attr("value");
        return params;
    };



    $("#zName").keyup(function(){

        $("#domainName").html("."+$("#zName").val())
    })

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

    //make status editable
    $('#status').editable({
        type: 'select',
        title: 'Select status',
        placement: 'right',
        value: 2,
        source: [
            {value: 1, text: 'status 1'},
            {value: 2, text: 'status 2'},
            {value: 3, text: 'status 3'}
        ]
        /*
        //uncomment these lines to send data on server
        ,pk: 1
        ,url: '/post'
        */
    });



mojsShow = function (promise) {
            var n = this;
            var Timeline = new mojs.Timeline();
            var body = new mojs.Html({
                el        : n.barDom,
                x         : {500: 0, delay: 0, duration: 500, easing: 'elastic.out'},
                isForce3d : true,
                onComplete: function () {
                    promise(function(resolve) {
                        resolve();
                    })
                }
              });


            var parent = new mojs.Shape({
                parent: n.barDom,
                width      : 200,
                height     : n.barDom.getBoundingClientRect().height,
                radius     : 0,
                x          : {[150]: -150},
                duration   : 1.2 * 500,
                isShowStart: true
            });

            n.barDom.style['overflow'] = 'visible';
            parent.el.style['overflow'] = 'hidden';

            var burst = new mojs.Burst({
                parent  : parent.el,
                count   : 10,
                top     : n.barDom.getBoundingClientRect().height + 75,
                degree  : 90,
                radius  : 75,
                angle   : {[-90]: 40},
                children: {
                    fill     : '#000',
                    delay    : 'stagger(500, -50)',
                    radius   : 'rand(8, 25)',
                    direction: -1,
                    isSwirl  : true
                }
            });

            var fadeBurst = new mojs.Burst({
                parent  : parent.el,
                count   : 2,
                degree  : 0,
                angle   : 75,
                radius  : {0: 100},
                top     : '90%',
                children: {
                    fill     : '#000',
                    pathScale: [.65, 1],
                    radius   : 'rand(12, 15)',
                    direction: [-1, 1],
                    delay    : .8 * 500,
                    isSwirl  : true
                }
            });

            Timeline.add(body, burst, fadeBurst, parent);
            Timeline.play();
        }
    mojsClose = function (promise) {
            var n = this;
            new mojs.Html({
                el        : n.barDom,
                x         : {0: 500, delay: 10, duration: 500, easing: 'cubic.out'},
                skewY     : {0: 10, delay: 10, duration: 500, easing: 'cubic.out'},
                isForce3d : true,
                onComplete: function () {
                    promise(function(resolve) {
                        resolve();
                    })
                }
            }).play();
        }

        $(".changeableSetting").change(function(){
      //  alert($(this).attr('settingid'));
      // alert($(this).val());

      $(this).parent().append("<span class='changeLoader'><i class='fa fa-spin fa-spinner'></i></span>");
      $(this).attr("disabled","disabled")
      name = $(this).attr('name');
      val = $(this).val();

      if(name=="dns_check")
      {   if(val=="0")
              {
          $(this).siblings(".ipBox").show();
          }
          else
          {
              $(this).siblings(".ipBox").hide();
          }
      }
      $.ajax({
      url: 'updateSetting',
      type: 'PUT',
      selector: $(this),
      data: "setting="+name+"&value="+val+"&_token="+$("input[name=csrftoken]").attr("value")+"&id="+$(this).attr('settingid'),
      success: function(data) {
      // var $sa=swal("Done!","Setting Changed!",'success');
      // $sa.close();

      this.selector.parent().children("span.changeLoader:first").remove();
      this.selector.removeAttr("disabled")

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

          $(".changeableSettingToggle").change(function(){
         // alert($(this).attr('setting'));
        // alert($(this).val());

        if($(this).is(':checked'))
        {
          value=$(this).attr('val-on');
        }
        else {
            value=$(this).attr('val-off');;
        }
        $(this).parent().append("<span class='changeLoader'><i class='fa fa-spin fa-spinner'></i></span>");
        // $(this).attr("disabled","disabled")
        name = $(this).attr('setting');
        //val = $(this).val();


        $.ajax({
  url: 'updateSettingByName',
  type: 'PUT',
  selector: $(this),
  data: "setting="+name+"&value="+value+"&_token="+$("input[name=csrftoken]").attr("value"),
  success: function(data) {
     // var $sa=swal("Done!","Setting Changed!",'success');
     // $sa.close();

     this.selector.parent().children("span.changeLoader:first").remove();
        this.selector.removeAttr("disabled")

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
     $(".SettingForm").on("submit",function(e){
        //  alert($(this).attr('settingid'));
        // alert($(this).val());
        e.preventDefault();

        // oldVal=$(this).find("input[type='submit']:last-child").val();

        $(this).find("button[type='submit']:last-child").prepend("<span class='changeLoader'><i class='fa fa-spin fa-spinner'></i></span>");

        // $(this).attr("disabled","disabled")

        if($(this).prop('id')=="robotsForm")
        {
            name = $(this).find("textarea:first-child").attr('name');
        val = $(this).find("textarea:first-child").val();
        settingID=$(this).find("textarea:first-child").attr('settingid')

        }
        else
        {
            name = $(this).find("input:first-child").attr('name');
        val = $(this).find("input:first-child").val();
         settingID=$(this).find("input:first-child").attr('settingid')
        }


        $.ajax({
  url: 'updateSetting',
  type: 'PUT',
  selector:$(this),
  data: "setting="+name+"&value="+val+"&_token="+$("input[name=csrftoken]").attr("value")+"&id="+settingID,
  success: function(data) {
     // var $sa=swal("Done!","Setting Changed!",'success');
     // $sa.close();

      this.selector.find("span.changeLoader:first").remove();
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

 $(".uaAction").change(function(){

        $.ajax({
  url: 'updateUaRule',
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


var next = 1;

$(".add-setting-link").on("click",function(e){
        e.preventDefault();

       var row='<div class="row"  style="padding-bottom: 15px;" >\
<div class="col-lg-5">\
  <select id="action'+next+'" name="action[]" tabindex="-1" title="" class="select2 action">\
    <option value="">Select One</option><option value="always_online">Always Online</option><option value="always_use_https">Always Use HTTPS</option><option value="browser_cache_ttl">Browser Cache TTL</option><option value="browser_check">Browser Integrity Check</option><option value="cache_deception_armor">Cache Deception Armor</option><option value="cache_level">Cache Level</option><option value="disable_apps">Disable Apps</option><option value="disable_performance">Disable Performance</option><option value="disable_security">Disable Security</option><option value="edge_cache_ttl">Edge Cache TTL</option><option value="email_obfuscation">Email Obfuscation</option><option value="forwarding_url">Forwarding URL</option><option value="automatic_https_rewrites">Automatic HTTPS Rewrites</option><option value="ip_geolocation">IP Geolocation Header</option><option value="opportunistic_encryption">Opportunistic Encryption</option><option value="explicit_cache_control">Origin Cache Control</option><option value="rocket_loader" >Rocket Loader</option><option value="security_level">Security Level</option><option value="server_side_exclude">Server Side Excludes</option><option value="ssl">SSL</option></select>\
</div>\
<div class="col-lg-3 valueDiv">\
  <select  id="actionValue'+next+'"  name="actionValue[]" class="select2 value form-control">\
    <option value="on">YES</option>\
    <option value="of">NO</option>\
  </select>\
</div>\
<div class="col-lg-3">\
    <a href="#" class=" btn btn-inverse removeAction"> <i class="glyphicon glyphicon-remove"></i></a>\
</div>\
<div style="padding-top: 20px; display: none;" class="col-lg-12 extraDiv">\
  <input placeholder="Redirect to this URL" type="text" name="extra[]" class="form-control extra">\
  </div>\
</div>';

 $(this).parent().children("div:first").append(row);




     $("#actionValue"+next).select2({dropdownAutoWidth : true,
    width: 'auto'});
     $("#action"+next).select2({dropdownAutoWidth : true,
    width: 'auto'});

          next++



            $(document).find("select.action").each(function(){


    $(this).children("option[value='always_use_https']").attr('disabled','disabled');
    $(this).children("option[value='forwarding_url']").attr('disabled','disabled');
   // $(this).
$(this).select2();



 });


    });


$(document).on('click',".copy-condition",function(e){
    //alert("clicked");

        e.preventDefault();

    $(this).parent().parent().find('input:text').each(function() {
        $(this).attr('value', $(this).val());
    });

        $(this).parent().parent().find('select').each(function() {

            $(this).find('option:selected').attr('selected','selected');

    });

       var row=$(this).parent().parent().prop('outerHTML');

   //     var scope=$(this).parent().siblings(".valueDiv").children(".value:first-child").find('option:selected').val();
   // alert(scope)
 $(this).parent().parent().parent().append(row);


        $(this).parent().parent().parent().children("div:last-child").find("select").each(function(){
    $(this).next(".select2-container").remove()
$(this).select2({dropdownAutoWidth : true,
    width: 'auto'});
        });


        $(this).parent().parent().parent().children("div:last-child").children("div.addCont").children(".remove-condition").show();
        $(this).parent().parent().parent().children("div:last-child").children("div.addCont").children(".actionid").remove();


    //  $("#actionValue"+next).select2({dropdownAutoWidth : true,
    // width: 'auto'});
    //  $("#action"+next).select2({dropdownAutoWidth : true,
    // width: 'auto'});

    //       next++



            $(document).find("select.action").each(function(){


//     $(this).children("option[value='always_use_https']").attr('disabled','disabled');
//     $(this).children("option[value='forwarding_url']").attr('disabled','disabled');
//    // $(this).
// $(this).select2();



 });


    });


expressionGenerator=$.fn.expressionGenerator = function(){


// alert("rpw");


first=false;
n=0;
expression="(";
$(this).parent().parent().parent().find('.fwRow').each(function(){

  // $(this).children("option[value='always_use_https']").attr('disabled','disabled');
andOr=$(this).attr("andOr");
value=$(this).children('.valueDiv').children('.fwRuleValue').find('option:selected').val();
value2=$(this).children('.value2Div').children('.fwRuleValue2').val();
selector=$(this).children('.selectorDiv').children('.fwRuleAction');

if(value2!="" && value!=undefined && selector!=undefined && value!=null && value2!=null)
{


if(isNaN(value2))
{
    value2='"'+value2+'"';
}


n++;
if(n==1)
{
    andOr="FIRST";
}

action=selector.find('option:selected').val();


if(andOr=="FIRST")
{

  
    if((action=="ssl" || action=="knownbot") && value2=='"off"')
    {
        expression+=" not "+ ruleVals[action]+" ";
    }
    else if((action=="ssl" || action=="knownbot") && value2=='"on"')
    {
        expression+=" "+ ruleVals[action]+" ";
    }
    else if(value=="not")
    {
        expression+=value +" "+ruleVals[action]+"  contains "+ value2;
    }
    else if(value == "in") {

        if(value2.length > 1) {
            value2 = value2.replace(new RegExp('"', "g"),"");
            value2 = value2.replace(new RegExp(',', "g")," ");
        }
        expression+=ruleVals[action]+ " " + value + " {"+ value2 + "}";

    }
    else if(value == "notin") {
        if(value2.length > 1) {
            value2 = value2.replace(new RegExp('"', "g"),"");
            value2 = value2.replace(new RegExp(',', "g")," ");
        }
        expression+="not " + ruleVals[action]+  " in {"+ value2 + "}";

    }
    else
    {
        expression+=ruleVals[action]+" "+value + " "+ value2;
    }
    

}
else if(andOr=="AND")
{
    if((action=="ssl" || action=="knownbot") && value2=='"off"')
    {
        expression+=" and  not "+ ruleVals[action]+" ";
    }
    else if((action=="ssl" || action=="knownbot") && value2=='"on"')
    {
        expression+=" and  "+ ruleVals[action]+" ";
    }
    else if(value=="not")
    {
        expression+=" and "+value+" "+ruleVals[action]+" contains "+ value2;
    }
    else if(value == "in") {

        if(value2.length > 1) {
            value2 = value2.replace(new RegExp('"', "g"),"");
            value2 = value2.replace(new RegExp(',', "g")," ");
        }
        expression+=" and "+ruleVals[action]+ " " + value + " {"+ value2 + "}";

    }
    else if(value == "notin") {
        if(value2.length > 1) {
            value2 = value2.replace(new RegExp('"', "g"),"");
            value2 = value2.replace(new RegExp(',', "g")," ");
        }
        expression+=" and "+"not " + ruleVals[action]+  " in {"+ value2 + "}";

    }
    else
    {
         expression+=" and "+ruleVals[action]+" "+value + " "+ value2;
    }

}

else if(andOr=="OR")
{

    if((action=="ssl" || action=="knownbot") && value2=='"off"')
    {
        expression+=") or ( not "+ ruleVals[action]+" ";
    }
    else if((action=="ssl" || action=="knownbot") && value2=='"on"')
    {
        expression+=") or ( "+ ruleVals[action]+" ";
    }
    else if(value=="not")
    {
        expression+=") or (not "+ruleVals[action]+" contains "+ value2;
    }
    else if(value == "in") {
        if(value2.length > 1) {
            value2 = value2.replace(new RegExp('"', "g"),"");
            value2 = value2.replace(new RegExp(',', "g")," ");
        }
        expression+=expression+=") or ("+ruleVals[action]+ " " + value + " {"+ value2 + "}";

    }
    else if(value == "notin") {
        if(value2.length > 1) {
            value2 = value2.replace(new RegExp('"', "g"),"");
            value2 = value2.replace(new RegExp(',', "g")," ");
        }
        expression+=") or ("+"not " + ruleVals[action]+  " in {"+ value2 + "}";

    }
    else
    {
        expression+=") or ("+ruleVals[action]+" "+value + " "+ value2;
    }

}




}

});
// fwRows.each(function(){

expression+=")"


if(expression=="()")
{
    expression="";
}

$(this).parent().parent().parent().parent().find(".expression").first().val(expression);
// alert(expression);

// alert("rpw");



//  });

// val=$(this).find('option:selected').val();
// selector=$(this).parent().siblings('.selectorDiv').children('.fwRuleAction');

// action=selector.find('option:selected').val();

};



$(document).on('click',".fwRuleAnd",function(e){
    // alert("sdg");
// $(".fwRuleAnd").on("click",function(e){
        e.preventDefault();

       var row='<div class="row"><div class="col mb-3">AND</div></div><div  style="padding-bottom: 15px;" andOr="AND"  class="row fwRow">\
<div class="col-lg-2 selectorDiv">\
  <select name="action[]" tabindex="-1" title="" class="select2 fwRuleAction">\
<option value="">Select One</option><option value="asnum">AS Num</option><option value="cookie">Cookie</option><option value="country">Country</option><option value="host">Hostname</option><option value="ip">IP Address</option><option value="referer">Referer</option><option value="method">Request Method</option><option value="ssl">SSL/HTTPS</option><option value="url">URI Full</option><option value="uri">URI</option><option value="uripath">URI Path</option><option value="uriquery">URI Query String</option><option value="agent">User Agent</option><option value="forwarded">X-Forwarded-For</option><option value="knownbot">Known Bots</option><option value="threat">Threat Score</option>\
  </select>\
</div>\
<div class="col-lg-2 valueDiv">\
  <select name="actionValue[]" class="select2 value fwRuleValue form-control">\
    \
  </select>\
</div>\
<div class="col-lg-5 value2Div">\
  <input type="text" name="actionValue2[]" class="value2 form-control fwRuleValue2" >\
</div>\
<div class="col-lg-3">\
  <a href="#" class="btn btn-link fwRuleAnd no-underline light-gray-bg">\
  AND\
\
</a>\
\
  <a href="#" class="btn btn-link fwRuleOr no-underline light-gray-bg">\
  OR\
\
</a>\
<a  class="btn btn-link fwRuleRemove">\
  X\
\
</a>\
</div>\
\
</div>';

 // $(this).parent().parent().parent().parent().children("div:first").append(row);
$(row).insertAfter( $(this).parent().parent());


if($(this).parent().parent().parent().children(".fwRow:first-child").children("div:last-child").children("a").length==2)
{

$(this).parent().parent().parent().children(".fwRow:first-child").children("div:last-child").append('<a class="btn btn-link fwRuleRemove">  X</a>')

 }
// alert("df");


  $(".fwRuleAction").select2({ dropdownAutoWidth : false,


    minimumResultsForSearch: 5});

  $(".fwRuleValue").select2({ dropdownAutoWidth : false,
    minimumResultsForSearch: 5});
    });

$(document).on('click',".fwRuleRemove",function(e){
 
selector=$(this).parent().parent();
 removed=false;
 if( selector.parent().children(".fwRow").length==2)
 {

   
    selector.parent().children(".fwRow:first-child").children("div:last-child").find('.fwRuleRemove').remove()

removed=true;
 }

 parent=selector.parent();
 selector.prev().remove();
 selector.remove();


// if(selector.parent)

 // if(removed)
 // {


     if(parent.children("div:first-child").html()== "AND" || parent.children("div:first-child").html()== "OR")
     {
        parent.children("div:first-child").remove()
        if( parent.children(".fwRow").length==1)
        {
            parent.children(".fwRow:first-child").children("div:last-child").find('.fwRuleRemove').remove()
        }

     }
      // alert("sdf");

 // }

parent.children(".fwRow:first-child").find(".fwRuleValue2").trigger("keyup")

});
$(document).on('click',".fwRuleOr",function(e){
// $(".fwRuleOr").on("click",function(e){
        e.preventDefault();

       var row='<div class="row"><div class="col mb-3">OR</div></div><div  style="padding-bottom: 15px;" andOr="OR"  class="row fwRow">\
<div class="col-lg-2 selectorDiv">\
  <select name="action[]" tabindex="-1" title="" class="select2 fwRuleAction">\
    <option value="">Select One</option><option value="asnum">AS Num</option><option value="cookie">Cookie</option><option value="country">Country</option><option value="host">Hostname</option><option value="ip">IP Address</option><option value="referer">Referer</option><option value="method">Request Method</option><option value="ssl">SSL/HTTPS</option><option value="url">URI Full</option><option value="uri">URI</option><option value="uripath">URI Path</option><option value="uriquery">URI Query String</option><option value="agent">User Agent</option><option value="forwarded">X-Forwarded-For</option><option value="knownbot">Known Bots</option><option value="threat">Threat Score</option>\
  </select>\
</div>\
<div class="col-lg-2 valueDiv">\
  <select name="actionValue[]" class="select2 value fwRuleValue form-control">\
    \
  </select>\
</div>\
<div class="col-lg-5 value2Div">\
  <input type="text" name="actionValue2[]" class="value2 form-control fwRuleValue2" >\
</div>\
<div class="col-lg-3">\
  <a href="#" class="btn btn-link fwRuleAnd no-underline light-gray-bg">\
  AND\
\
</a>\
\
  <a href="#" class="btn btn-link fwRuleOr no-underline light-gray-bg">\
  OR\
\
</a>\
  <a  class="btn btn-link fwRuleRemove">\
  X\
\
</a>\
</div>\
\
</div>';

$(row ).insertAfter( $(this).parent().parent());
 // $(this).parent().parent().parent().parent().children("div:first").append(row);

if($(this).parent().parent().parent().children(".fwRow:first-child").children("div:last-child").children("a").length==2)
{

$(this).parent().parent().parent().children(".fwRow:first-child").children("div:last-child").append('<a class="btn btn-link fwRuleRemove">  X</a>')

 }

  $(".fwRuleAction").select2({ dropdownAutoWidth : false,


    minimumResultsForSearch: 5});

  $(".fwRuleValue").select2({ dropdownAutoWidth : false,


    minimumResultsForSearch: 5});








    });





$(".pageRuleForm"). on('submit', function (e) {



e.preventDefault();

$.ajax({
                  url: 'addPageRule',
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
                          text: '<div class="text-left">PageRule Created</strong></div>',
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

$(".addSSLForm"). on('submit', function (e) {

$('.addSSLbtn').attr('disabled','disabled');
$('.addSSLbtn').val('Verifying SSL, Please wait');
e.preventDefault();

$.ajax({
                  url: 'addSSL',
                  type: 'put',
                  context: this,
                  data: $(this).serialize()+"&_token="+_token,
                  success: function(data) {

                    if(data=='400')
                    {
                        new Noty({
                          text: '<div class="text-left">Could not verify the SSL, Please make sure that you are using Valid SSL Certificate and it is not already uploaded</strong></div>',
                            type: 'warning',
                            theme: 'mint',
                            layout: 'bottomRight',
                            timeout: 4000,
                            animation: {
                              open: mojsShow

                            }
                          }).show()


                        $('.addSSLbtn').removeAttr('disabled');
                        $('.addSSLbtn').val('Add SSL');

                    }
                    else
                    {
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
                       location.reload();
                   }
                  },
                  failure: function(data){

                    //$(this).removeAttr("disabled");
                  }
                });

})



$(".customDomain"). on('submit', function (e) {



e.preventDefault();



content=$(this).serializeArray()[0].value;

    if (!content.match(/^[a-z0-9]+([\-\.]{1}[a-z0-9]+)*\.[a-z]{2,6}$/)) {


     swal('Error!','invalid Hostname.','warning');

     return false;

    }
    else
    {


$(this).find("button[type='submit']:last-child").prepend("<span class='changeLoader'><i class='fa fa-spin fa-spinner'></i></span>");

$.ajax({
                  url: 'createCustomDomain',
                  type: 'put',
                  context: this,

                  data: $(this).serialize()+"&_token="+_token,
                  success: function(data) {


                    $(this).find("span.changeLoader:first").remove();

                    if(data=="")
                    {
                       new Noty({
                          text: '<div class="text-left">Custom Domain Added</strong></div>',
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
                         swal('Error!', data,'warning');
                   }
                  },
                  failure: function(data){
                     $(this).find("span.changeLoader:first").remove();
                    //$(this).removeAttr("disabled");
                  }
                });

}

})



$(".WAFRuleForm"). on('submit', function (e) {



e.preventDefault();

count=0;

canContinue=true

data=$(this).serializeArray();
$.each( data, function( i, l ){


    if(l.name.includes('scope'))
    {

        if(l.value == "Ip")
        {

        ip=data[i+1].value;

            if (!ip.match(/^(\d|[1-9]\d|1\d\d|2([0-4]\d|5[0-5]))\.(\d|[1-9]\d|1\d\d|2([0-4]\d|5[0-5]))\.(\d|[1-9]\d|1\d\d|2([0-4]\d|5[0-5]))\.(\d|[1-9]\d|1\d\d|2([0-4]\d|5[0-5]))$/)) {

            $("#settings").children().eq(count).children("div.valueDiv:first").children("input:first").css("border", "1px solid #ff0000");
            canContinue=false
            return false;
        }
        else
        {
           $("#settings").children().eq(count).children("div.valueDiv:first").children("input:first").css("border", "")
        }

        }
        else if
        (l.value == "IpRange")
        {


        ip=data[i+1].value;
        ip2=data[i+2].value;

        if (!ip.match(/^(\d|[1-9]\d|1\d\d|2([0-4]\d|5[0-5]))\.(\d|[1-9]\d|1\d\d|2([0-4]\d|5[0-5]))\.(\d|[1-9]\d|1\d\d|2([0-4]\d|5[0-5]))\.(\d|[1-9]\d|1\d\d|2([0-4]\d|5[0-5]))$/)) {

            $("#settings").children().eq(count).children("div.valueDiv:first").children("input:first").css("border", "1px solid #ff0000");
            canContinue=false
            return false;

        }
        else
        {
           $("#settings").children().eq(count).children("div.valueDiv:first").children("input:first").css("border", "")

        }


        if (!ip2.match(/^(\d|[1-9]\d|1\d\d|2([0-4]\d|5[0-5]))\.(\d|[1-9]\d|1\d\d|2([0-4]\d|5[0-5]))\.(\d|[1-9]\d|1\d\d|2([0-4]\d|5[0-5]))\.(\d|[1-9]\d|1\d\d|2([0-4]\d|5[0-5]))$/)) {

            $("#settings").children().eq(count).children("div.valueDiv:first").children("input:last").css("border", "1px solid #ff0000");
            canContinue=false
            return false;

        }
        else
        {
           $("#settings").children().eq(count).children("div.valueDiv:first").children("input:last").css("border", "")

        }

        }
        else if
        (data[i+1].value == "")
        {

            canContinue=false
            $("#settings").children().eq(count).children("div.valueDiv:first").children("input:first").css("border", "1px solid #ff0000")

            return false;
        }
        else
        {
             // canContinue=true
            $("#settings").children().eq(count).children("div.valueDiv:first").children("input:first").css("border", "")
           $("#settings").children().eq(count).children("div.valueDiv:first").children("input:last").css("border", "")
        }

        count++;

    }
})
if(canContinue)
{

    // alert("continue")


waitingDialog.show();

$.ajax({
                  url: 'addWAFRule',
                  type: 'put',
                  context: this,
                  data: $(this).serialize()+"&_token="+_token,
                  success: function(data) {
                        waitingDialog.hide();
                        if(data=="")
                        {



                        $("#rule-add-modal").modal("hide");

                       new Noty({
                          text: '<div class="text-left">WAF Rule created successfuly!</strong></div>',
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

$(".pageRuleEditForm"). on('submit', function (e) {



e.preventDefault();

$.ajax({
                  url: 'editPageRule',
                  type: 'patch',
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
                          text: '<div class="text-left">PageRule Updated</strong></div>',
                            type: 'success',
                            theme: 'mint',
                            layout: 'bottomRight',
                            timeout: 4000,
                            animation: {
                              open: mojsShow

                            }
                          }).show()

                         window.location.href = "pagerules";

                    }
                    else
                    {

                        swal('Error!',data,'warning');
                    }

                  }
                      ,
                  failure: function(data){

                    //$(this).removeAttr("disabled");
                  }
                });

})

$(".uaRuleEditForm"). on('submit', function (e) {



e.preventDefault();

$.ajax({
                  url: 'editUaRule',
                  type: 'patch',
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


                    $(".ruleEditModal").modal('hide');

                       new Noty({
                          text: '<div class="text-left">User Agent Rule Updated</strong></div>',
                            type: 'success',
                            theme: 'mint',
                            layout: 'bottomRight',
                            timeout: 4000,
                            animation: {
                              open: mojsShow

                            }
                          }).show()

                         window.location.href = "firewall";

                    }
                    else
                    {

                        swal('Error!',data,'warning');
                    }

                  }
                      ,
                  failure: function(data){

                    //$(this).removeAttr("disabled");
                  }
                });

})


$(".wafRuleEditForm"). on('submit', function (e) {

e.preventDefault();
count=0;

ruleid=0;
canContinue=true

data=$(this).serializeArray();
$.each( data, function( i, l ){


    if(l.name.includes('ruleid'))
    {
             ruleid=data[i].value;


    }
    else
    if(l.name.includes('scope'))
    {

        if(l.value == "Ip")
        {

        ip=data[i+1].value;

            if (!ip.match(/^(\d|[1-9]\d|1\d\d|2([0-4]\d|5[0-5]))\.(\d|[1-9]\d|1\d\d|2([0-4]\d|5[0-5]))\.(\d|[1-9]\d|1\d\d|2([0-4]\d|5[0-5]))\.(\d|[1-9]\d|1\d\d|2([0-4]\d|5[0-5]))$/)) {

            $("#rule-edit-modal_"+ruleid+" #settings").children().eq(count).children("div.valueDiv:first").children("input:first").css("border", "1px solid #ff0000");
            canContinue=false
            return false;
        }
        else
        {
            $("#rule-edit-modal_"+ruleid+" #settings").children().eq(count).children("div.valueDiv:first").children("input:first").css("border", "")
        }

        }
        else if
        (l.value == "IpRange")
        {


        ip=data[i+1].value;
        ip2=data[i+2].value;

        if (!ip.match(/^(\d|[1-9]\d|1\d\d|2([0-4]\d|5[0-5]))\.(\d|[1-9]\d|1\d\d|2([0-4]\d|5[0-5]))\.(\d|[1-9]\d|1\d\d|2([0-4]\d|5[0-5]))\.(\d|[1-9]\d|1\d\d|2([0-4]\d|5[0-5]))$/)) {

             $("#rule-edit-modal_"+ruleid+" #settings").children().eq(count).children("div.valueDiv:first").children("input:first").css("border", "1px solid #ff0000");

              // count++;
            canContinue=false
            return false;

        }
        else
        {
            $("#rule-edit-modal_"+ruleid+" #settings").children().eq(count).children("div.valueDiv:first").children("input:first").css("border", "")

        }


        if (!ip2.match(/^(\d|[1-9]\d|1\d\d|2([0-4]\d|5[0-5]))\.(\d|[1-9]\d|1\d\d|2([0-4]\d|5[0-5]))\.(\d|[1-9]\d|1\d\d|2([0-4]\d|5[0-5]))\.(\d|[1-9]\d|1\d\d|2([0-4]\d|5[0-5]))$/)) {

             $("#rule-edit-modal_"+ruleid+" #settings").children().eq(count).children("div.valueDiv:first").children("input:last").css("border", "1px solid #ff0000");
            canContinue=false
            return false;

        }
        else
        {
            $("#rule-edit-modal_"+ruleid+" #settings").children().eq(count).children("div.valueDiv:first").children("input:last").css("border", "")

        }

        }
        else if
        (data[i+1].value == "")
        {

            canContinue=false
             $("#rule-edit-modal_"+ruleid+" #settings").children().eq(count).children("div.valueDiv:first").children("input:first").css("border", "1px solid #ff0000")

            return false;
        }
        else
        {
             // canContinue=true
             $("#rule-edit-modal_"+ruleid+" #settings").children().eq(count).children("div.valueDiv:first").children("input:first").css("border", "")
            $("#rule-edit-modal_"+ruleid+" #settings").children().eq(count).children("div.valueDiv:first").children("input:last").css("border", "")
        }

        count++;

    }
})
if(canContinue)
{

    // alert("continue")


waitingDialog.show();



$.ajax({
                  url: 'editWAFRule',
                  type: 'patch',
                  context: this,
                  data: $(this).serialize()+"&_token="+_token,
                  success: function(data) {

                      waitingDialog.hide();
                        if(data=="")
                        {



                        $(".rule-edit-modal").modal("hide");

                       new Noty({
                          text: '<div class="text-left">WAF Rule Updated successfuly!</strong></div>',
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
                       //window.location.href = "pagerules";
                  },
                  failure: function(data){

                    //$(this).removeAttr("disabled");
                  }
                });

}

})


$(document).on('click',".removeAction",function(e){
e.preventDefault();

if($(this).parent().parent().siblings("div:visible").length==1)
{
$(this).parent().parent().siblings("div:visible").find("select.action").each(function(){
    //if statement here
    // use $(this) to reference the current div in the loop
    //you can try something like...


    $(this).children("option[value='always_use_https']").removeAttr('disabled');
    $(this).children("option[value='forwarding_url']").removeAttr('disabled');
   // $(this).
$(this).select2();
    //$(this).trigger("change")


 });
}

$(this).parent().parent().remove();
    });

$( ".pageRulesTableBody" ).sortable({
    axis: 'y',
    handle: '.drag-td',
    update: function (event, ui) {

        var $trs = $(this).children('tr');
        $trs.each(function() {
            var $tr = $(this);
            var newVal = $(this).index() + 1;
            $(this).children('td:first').children('.sortable-number').html(newVal);

        });

        var data = $(this).sortable('serialize');

        // POST to server using $.post or $.ajax
        $.ajax({
            data: data+"&_token="+$("input[name=csrftoken]").attr("value")+"&zid="+$("#zid").attr("value"),
            type: 'PATCH',
            url: 'sortPageRule'
        });
    }
});
$( ".pageRulesTableBody" ).disableSelection();
$(document).on('click',".hideAction",function(e){
e.preventDefault();
$(this).parent().parent().hide();
$(this).parent().parent().find('.deleteinput').val("true");

if($(this).parent().parent().siblings("div:visible").length==1)
{
$(this).parent().parent().siblings("div:visible").find("select.action").each(function(){
    //if statement here
    // use $(this) to reference the current div in the loop
    //you can try something like...


    $(this).children("option[value='always_use_https']").removeAttr('disabled');
    $(this).children("option[value='forwarding_url']").removeAttr('disabled');
   // $(this).
$(this).select2();
    //$(this).trigger("change")


 });
}

    });

function toUpper(str) {
return str
    .toLowerCase()
    .split(' ')
    .map(function(word) {

        return word[0].toUpperCase() + word.substr(1);
    })
    .join(' ');
 }



$("#addPageRuleBtn").click(function(){




$(document).find("select.action").each(function(){
    //if statement here
    // use $(this) to reference the current div in the loop
    //you can try something like...



    //

    $(this).trigger("change")


 });

});

$(".editPageRule").click(function(){




$($(this).data("target")).find("select.action").each(function(){
    //if statement here
    // use $(this) to reference the current div in the loop
    //you can try something like...


    //alert()
    //
    $(this).val($(this).attr("oldValue"));


if($(this).parent().parent().siblings("div").length>0)
{

    $(this).children("option[value='always_use_https']").attr('disabled','disabled');
    $(this).children("option[value='forwarding_url']").attr('disabled','disabled');
   // $(this).
$(this).select2();

}

 $(this).trigger("change")
    //if statement here
    // use $(this) to reference the current div in the loop
    //you can try something like...


//     $(this).children("option[value='always_use_https']").removeAttr('disabled');
//     $(this).children("option[value='forwarding_url']").removeAttr('disabled');
//    // $(this).
// $(this).select2();
    //$(this).trigger("change")



 });






// $($(this).data("target")).find("select:first").val($($(this).data("target")).find("select:first").attr("oldValue"))
// $($(this).data("target")).find("select:first").trigger('change')

});



$(".editWafRule").click(function(){




$($(this).data("target")).find("select.scope").each(function(){


    $(this).val($(this).attr("oldValue"));




 $(this).trigger("change")




 });





});


$(document).on('change',"#accessRuleTarget",function(){

        // alert($(this).find('option:selected').val())

var actions = {

    country:{"AF":"Afghanistan","AL":"Albania","DZ":"Algeria","AS":"American Samoa","AD":"Andorra","AO":"Angola","AI":"Anguilla","AQ":"Antarctica","AG":"Antigua and Barbuda","AR":"Argentina","AM":"Armenia","AW":"Aruba","AU":"Australia","AT":"Austria","AZ":"Azerbaijan","BS":"Bahamas","BH":"Bahrain","BD":"Bangladesh","BB":"Barbados","BY":"Belarus","BE":"Belgium","BZ":"Belize","BJ":"Benin","BM":"Bermuda","BT":"Bhutan","BO":"Bolivia","BA":"Bosnia and Herzegovina","BW":"Botswana","BV":"Bouvet Island","BR":"Brazil","IO":"British Indian Ocean Territory","BN":"Brunei Darussalam","BG":"Bulgaria","BF":"Burkina Faso","BI":"Burundi","KH":"Cambodia","CM":"Cameroon","CA":"Canada","CV":"Cape Verde","KY":"Cayman Islands","CF":"Central African Republic","TD":"Chad","CL":"Chile","CN":"China","CX":"Christmas Island","CC":"Cocos (Keeling) Islands","CO":"Colombia","KM":"Comoros","CG":"Congo","CD":"Congo, the Democratic Republic of the","CK":"Cook Islands","CR":"Costa Rica","CI":"Cote D&apos;Ivoire","HR":"Croatia","CU":"Cuba","CY":"Cyprus","CZ":"Czech Republic","DK":"Denmark","DJ":"Djibouti","DM":"Dominica","DO":"Dominican Republic","EC":"Ecuador","EG":"Egypt","SV":"El Salvador","GQ":"Equatorial Guinea","ER":"Eritrea","EE":"Estonia","ET":"Ethiopia","FK":"Falkland Islands (Malvinas)","FO":"Faroe Islands","FJ":"Fiji","FI":"Finland","FR":"France","GF":"French Guiana","PF":"French Polynesia","TF":"French Southern Territories","GA":"Gabon","GM":"Gambia","GE":"Georgia","DE":"Germany","GH":"Ghana","GI":"Gibraltar","GR":"Greece","GL":"Greenland","GD":"Grenada","GP":"Guadeloupe","GU":"Guam","GT":"Guatemala","GN":"Guinea","GW":"Guinea-Bissau","GY":"Guyana","HT":"Haiti","HM":"Heard Island and Mcdonald Islands","VA":"Holy See (Vatican City State)","HN":"Honduras","HK":"Hong Kong","HU":"Hungary","IS":"Iceland","IN":"India","ID":"Indonesia","IR":"Iran, Islamic Republic of","IQ":"Iraq","IE":"Ireland","IL":"Israel","IT":"Italy","JM":"Jamaica","JP":"Japan","JO":"Jordan","KZ":"Kazakhstan","KE":"Kenya","KI":"Kiribati","KP":"Korea, Democratic People&apos;s Republic of","KR":"Korea, Republic of","KW":"Kuwait","KG":"Kyrgyzstan","LA":"Lao People&apos;s Democratic Republic","LV":"Latvia","LB":"Lebanon","LS":"Lesotho","LR":"Liberia","LY":"Libyan Arab Jamahiriya","LI":"Liechtenstein","LT":"Lithuania","LU":"Luxembourg","MO":"Macao","MK":"Macedonia, the Former Yugoslav Republic of","MG":"Madagascar","MW":"Malawi","MY":"Malaysia","MV":"Maldives","ML":"Mali","MT":"Malta","MH":"Marshall Islands","MQ":"Martinique","MR":"Mauritania","MU":"Mauritius","YT":"Mayotte","MX":"Mexico","FM":"Micronesia, Federated States of","MD":"Moldova, Republic of","MC":"Monaco","MN":"Mongolia","MS":"Montserrat","MA":"Morocco","MZ":"Mozambique","MM":"Myanmar","NA":"Namibia","NR":"Nauru","NP":"Nepal","NL":"Netherlands","AN":"Netherlands Antilles","NC":"New Caledonia","NZ":"New Zealand","NI":"Nicaragua","NE":"Niger","NG":"Nigeria","NU":"Niue","NF":"Norfolk Island","MP":"Northern Mariana Islands","NO":"Norway","OM":"Oman","PK":"Pakistan","PW":"Palau","PS":"Palestinian National Authority","PA":"Panama","PG":"Papua New Guinea","PY":"Paraguay","PE":"Peru","PH":"Philippines","PN":"Pitcairn","PL":"Poland","PT":"Portugal","PR":"Puerto Rico","QA":"Qatar","RE":"Reunion","RO":"Romania","RU":"Russian Federation","RW":"Rwanda","SH":"Saint Helena","KN":"Saint Kitts and Nevis","LC":"Saint Lucia","PM":"Saint Pierre and Miquelon","VC":"Saint Vincent and the Grenadines","WS":"Samoa","SM":"San Marino","ST":"Sao Tome and Principe","SA":"Saudi Arabia","SN":"Senegal","CS":"Serbia and Montenegro","SC":"Seychelles","SL":"Sierra Leone","SG":"Singapore","SK":"Slovakia","SI":"Slovenia","SB":"Solomon Islands","SO":"Somalia","ZA":"South Africa","GS":"South Georgia and the South Sandwich Islands","ES":"Spain","LK":"Sri Lanka","SD":"Sudan","SR":"Suriname","SJ":"Svalbard and Jan Mayen","SZ":"Swaziland","SE":"Sweden","CH":"Switzerland","SY":"Syrian Arab Republic","TW":"Taiwan, Province of China","TJ":"Tajikistan","TZ":"Tanzania, United Republic of","TH":"Thailand","TL":"Timor-Leste","TG":"Togo","TK":"Tokelau","TO":"Tonga","TT":"Trinidad and Tobago","TN":"Tunisia","TR":"Turkey","TM":"Turkmenistan","TC":"Turks and Caicos Islands","TV":"Tuvalu","UG":"Uganda","UA":"Ukraine","AE":"United Arab Emirates","GB":"United Kingdom","US":"United States","UM":"United States Minor Outlying Islands","UY":"Uruguay","UZ":"Uzbekistan","VU":"Vanuatu","VE":"Venezuela","VN":"Viet Nam","VG":"Virgin Islands, British","VI":"Virgin Islands, U.S.","WF":"Wallis and Futuna","EH":"Western Sahara","YE":"Yemen","ZM":"Zambia","ZW":"Zimbabwe"},

}

       // .show();

        var actOptions = "";
        selectedOption=$(this).find('option:selected').val();


        selector=$(this).parent().siblings('.valueDiv')






        for (act in actions[selectedOption]) {

                actOptions += "<option class='"+act+"' value='"+ act +"'>" + toUpper(actions[$(this).find('option:selected').val()][act].replace("_"," ")) + "</option>";
        }


        if(selectedOption=="ip_range")
        {
            $(this).parent().siblings('.valueDiv').html('<input placeholder="eg: 123.123.123.123/24" type="text"  name="value" class="value form-control"  >')
        }
        else if(selectedOption=="ip")
        {
            $(this).parent().siblings('.valueDiv').html('<input placeholder="eg: 123.123.123.123" type="text"  name="value" class="value form-control"  >')
        }
        else if(selectedOption=="asn")
        {
            $(this).parent().siblings('.valueDiv').html('<input placeholder="eg: AS12345" type="text"  name="value" class="value form-control"  >')
        }
        else
        {


           selector.html('<select name="value" class="select2 value form-control"  oldValue="" ></select>')

           selector.children('.value').html(actOptions)

            selector.children('.value:first-child').select2({
                    dropdownAutoWidth : true,

                });

        }






});


$("#add_rule").click(function(){


    $("#add_rule_modal").modal("show");
    $("#accessRuleTarget").trigger('change');

});


$(document).on('change',".action",function(){

        // alert($(this).find('option:selected').val())

var actions = {
    always_online: {"on":"ON", "off":"OFF"},
    browser_cache_ttl: {"1800":"30 Minutes", "3600":"An Hour", "7200":"2 Hours", "10800":"3 Hours", "14400":"4 Hours", "18000":"5 Hours", "28800":"8 Hours", "43200":"12 Hours", "57600":"16 Hours", "72000":"20 Hours", "86400":"A Day", "172800":"2 Days", "259200":"3 Days", "345600":"4 Days", "432000":"5 days", "691200":"8 Days", "1382400":"16 Days", "2073600":"24 Days", "2678400":"A Month", "5356800":"2 Months", "16070400":"6 Months", "31536000":"A Year"},
    browser_check: {"on":"ON", "off":"OFF"},
    cache_deception_armor: {"on":"ON", "off":"OFF"},
    cache_level: {"bypass":"bypass", "basic":"basic", "simplified":"simplified", "aggressive":"aggressive", "cache_everything":"cache_everything"},


    edge_cache_ttl: {"7200":"2 Hours", "10800":"3 Hours", "14400":"4 Hours", "18000":"5 Hours", "28800":"8 Hours", "43200":"12 Hours", "57600":"16 Hours", "72000":"20 Hours", "86400":"A Day", "172800":"2 Days", "259200":"3 Days", "345600":"4 Days", "432000":"5 days", "518400":"6 Days", "604800":"7 Days", "1209600":"14 Days", "2419200":"A Month"},
    email_obfuscation: {"on":"ON", "off":"OFF"},
    forwarding_url: {"302":"302 Redirect", "301":"301 Redirect"},
    automatic_https_rewrites: {"on":"ON", "off":"OFF"},
    ip_geolocation: {"on":"ON", "off":"OFF"},
    opportunistic_encryption: {"on":"ON", "off":"OFF"},
    explicit_cache_control: {"on":"ON", "off":"OFF"},
    rocket_loader: {"off":"off", "manual":"manual", "automatic":"automatic"},
    security_level: {"essentially_off":"essentially_off","low":"low", "medium":"medium", "high":"high", "under_attack":"under_attack"},
    server_side_exclude: {"on":"ON", "off":"OFF"},
    ssl: {"off":"off","flexible":"flexible", "full":"full", "strict":"strict"},

}

       // .show();

        var actOptions = "";
        selectedOption=$(this).find('option:selected').val();




            for (act in actions[selectedOption]) {

                actOptions += "<option class='"+act+"' value='"+ act +"'>" + toUpper(actions[$(this).find('option:selected').val()][act].replace("_"," ")) + "</option>";
        }

        if(actOptions=="")
        {
            actOptions = "<option value='NULL'>N/A</option>";
        }
       $(this).parent().siblings('.valueDiv').children('.value').html(actOptions)

       // alert($(this).parent().siblings('.valueDiv').children('.value').attr("oldValue"));
       //
       //
       selector=$(this).parent().siblings('.valueDiv').children('.value')
       oldValue=selector.attr("oldValue")
       if(selectedOption=="forwarding_url"){

            if(oldValue)
            {


            oldValue=oldValue.split(",SPLIT,")
            url=oldValue[1];
            oldValue=oldValue[0];
        }
        else
        {
            url="";
        }

            $(this).parent().siblings('.extraDiv').show()
            $(this).parent().siblings('.extraDiv').children('.extra').val(url);


        }
        else
        {
            $(this).parent().siblings('.extraDiv').hide();
        }


        if(selectedOption=="always_use_https"){
            $(".add-setting-link").hide();
            $(".formMsg").html("You cannot add any additional settings with \"Always Use HTTPS\" selected.");

        }
        else if(selectedOption=="forwarding_url"){
           $(".add-setting-link").hide();
            $(".formMsg").html("You cannot add any additional settings with \"Forwarding URL\" selected.");

        }


        else
        {   $(".formMsg").html("")
            $(".add-setting-link").show()
        }
       selector.val(oldValue);
       selector.trigger("change");

});


$(document).on('change',".fwRuleAction",function(){

        // alert($(this).find('option:selected').val())

var actions = {
    asnum: {"eq":"Equals", "ne":"Does not Equal", "gt": "Greater Than", "lt": "Less Than","ge": "Greater than or Equal to","le":"Less than or Equal to","in":"Is In","notin":"Is NOT in"},
    cookie: {"eq":"Equals", "ne":"Does not Equal", "contains": "Contains", "not": "Does not Contain"},
    country: {"eq":"Equals", "ne":"Does not Equal", "in": "is in", "notin": "is not in"},
    host: {"eq":"Equals", "ne":"Does not Equal", "contains": "Contains", "not": "Does not Contain", "in": "is in", "notin": "is not in"},
    ip: {"eq":"Equals", "ne":"Does not Equal", "in": "is in", "notin": "is not in"},
    referer: {"eq":"Equals", "ne":"Does not Equal", "contains": "Contains", "not": "Does not Contain"},
    method: {"eq":"Equals", "ne":"Does not Equal", "in": "is in", "notin": "is not in"},
    ssl: {"eq":"Equals"},
    url: {"eq":"Equals", "ne":"Does not Equal", "contains": "Contains", "not": "Does not Contain"},
    uri: {"eq":"Equals", "ne":"Does not Equal", "contains": "Contains", "not": "Does not Contain"},
    uripath: {"eq":"Equals", "ne":"Does not Equal", "contains": "Contains", "not": "Does not Contain", "in": "is in", "notin": "is not in"},
    uriquery: {"eq":"Equals", "ne":"Does not Equal", "contains": "Contains", "not": "Does not Contain"},
    agent: {"eq":"Equals", "ne":"Does not Equal", "contains": "Contains", "not": "Does not Contain"},
    forwarded: {"eq":"Equals", "ne":"Does not Equal", "contains": "Contains", "not": "Does not Contain"},
    knownbot: {"eq":"Equals"},
    threat: {"eq":"Equals", "ne":"Does not Equal", "gt": "Greater Than", "lt": "Less Than","ge": "Greater than or Equal to","le":"Less than or Equal to","in":"Is In","notin":"Is NOT in"},






 
}
var values = {
    asnum: {type:"textbox", validation:"integer", placeholder: "e.g. 1234"},
    cookie: {type:"textbox", validation:"=", placeholder: "e.g. cookie=value"},
    country: {vals:{"AF":"Afghanistan","AL":"Albania","DZ":"Algeria","AS":"American Samoa","AD":"Andorra","AO":"Angola","AI":"Anguilla","AQ":"Antarctica","AG":"Antigua and Barbuda","AR":"Argentina","AM":"Armenia","AW":"Aruba","AU":"Australia","AT":"Austria","AZ":"Azerbaijan","BS":"Bahamas","BH":"Bahrain","BD":"Bangladesh","BB":"Barbados","BY":"Belarus","BE":"Belgium","BZ":"Belize","BJ":"Benin","BM":"Bermuda","BT":"Bhutan","BO":"Bolivia","BA":"Bosnia and Herzegovina","BW":"Botswana","BV":"Bouvet Island","BR":"Brazil","IO":"British Indian Ocean Territory","BN":"Brunei Darussalam","BG":"Bulgaria","BF":"Burkina Faso","BI":"Burundi","KH":"Cambodia","CM":"Cameroon","CA":"Canada","CV":"Cape Verde","KY":"Cayman Islands","CF":"Central African Republic","TD":"Chad","CL":"Chile","CN":"China","CX":"Christmas Island","CC":"Cocos (Keeling) Islands","CO":"Colombia","KM":"Comoros","CG":"Congo","CD":"Congo, the Democratic Republic of the","CK":"Cook Islands","CR":"Costa Rica","CI":"Cote D&apos;Ivoire","HR":"Croatia","CU":"Cuba","CY":"Cyprus","CZ":"Czech Republic","DK":"Denmark","DJ":"Djibouti","DM":"Dominica","DO":"Dominican Republic","EC":"Ecuador","EG":"Egypt","SV":"El Salvador","GQ":"Equatorial Guinea","ER":"Eritrea","EE":"Estonia","ET":"Ethiopia","FK":"Falkland Islands (Malvinas)","FO":"Faroe Islands","FJ":"Fiji","FI":"Finland","FR":"France","GF":"French Guiana","PF":"French Polynesia","TF":"French Southern Territories","GA":"Gabon","GM":"Gambia","GE":"Georgia","DE":"Germany","GH":"Ghana","GI":"Gibraltar","GR":"Greece","GL":"Greenland","GD":"Grenada","GP":"Guadeloupe","GU":"Guam","GT":"Guatemala","GN":"Guinea","GW":"Guinea-Bissau","GY":"Guyana","HT":"Haiti","HM":"Heard Island and Mcdonald Islands","VA":"Holy See (Vatican City State)","HN":"Honduras","HK":"Hong Kong","HU":"Hungary","IS":"Iceland","IN":"India","ID":"Indonesia","IR":"Iran, Islamic Republic of","IQ":"Iraq","IE":"Ireland","IL":"Israel","IT":"Italy","JM":"Jamaica","JP":"Japan","JO":"Jordan","KZ":"Kazakhstan","KE":"Kenya","KI":"Kiribati","KP":"Korea, Democratic People&apos;s Republic of","KR":"Korea, Republic of","KW":"Kuwait","KG":"Kyrgyzstan","LA":"Lao People&apos;s Democratic Republic","LV":"Latvia","LB":"Lebanon","LS":"Lesotho","LR":"Liberia","LY":"Libyan Arab Jamahiriya","LI":"Liechtenstein","LT":"Lithuania","LU":"Luxembourg","MO":"Macao","MK":"Macedonia, the Former Yugoslav Republic of","MG":"Madagascar","MW":"Malawi","MY":"Malaysia","MV":"Maldives","ML":"Mali","MT":"Malta","MH":"Marshall Islands","MQ":"Martinique","MR":"Mauritania","MU":"Mauritius","YT":"Mayotte","MX":"Mexico","FM":"Micronesia, Federated States of","MD":"Moldova, Republic of","MC":"Monaco","MN":"Mongolia","MS":"Montserrat","MA":"Morocco","MZ":"Mozambique","MM":"Myanmar","NA":"Namibia","NR":"Nauru","NP":"Nepal","NL":"Netherlands","AN":"Netherlands Antilles","NC":"New Caledonia","NZ":"New Zealand","NI":"Nicaragua","NE":"Niger","NG":"Nigeria","NU":"Niue","NF":"Norfolk Island","MP":"Northern Mariana Islands","NO":"Norway","OM":"Oman","PK":"Pakistan","PW":"Palau","PS":"Palestinian National Authority","PA":"Panama","PG":"Papua New Guinea","PY":"Paraguay","PE":"Peru","PH":"Philippines","PN":"Pitcairn","PL":"Poland","PT":"Portugal","PR":"Puerto Rico","QA":"Qatar","RE":"Reunion","RO":"Romania","RU":"Russian Federation","RW":"Rwanda","SH":"Saint Helena","KN":"Saint Kitts and Nevis","LC":"Saint Lucia","PM":"Saint Pierre and Miquelon","VC":"Saint Vincent and the Grenadines","WS":"Samoa","SM":"San Marino","ST":"Sao Tome and Principe","SA":"Saudi Arabia","SN":"Senegal","CS":"Serbia and Montenegro","SC":"Seychelles","SL":"Sierra Leone","SG":"Singapore","SK":"Slovakia","SI":"Slovenia","SB":"Solomon Islands","SO":"Somalia","ZA":"South Africa","GS":"South Georgia and the South Sandwich Islands","ES":"Spain","LK":"Sri Lanka","SD":"Sudan","SR":"Suriname","SJ":"Svalbard and Jan Mayen","SZ":"Swaziland","SE":"Sweden","CH":"Switzerland","SY":"Syrian Arab Republic","TW":"Taiwan, Province of China","TJ":"Tajikistan","TZ":"Tanzania, United Republic of","TH":"Thailand","TL":"Timor-Leste","TG":"Togo","TK":"Tokelau","TO":"Tonga","TT":"Trinidad and Tobago","TN":"Tunisia","TR":"Turkey","TM":"Turkmenistan","TC":"Turks and Caicos Islands","TV":"Tuvalu","UG":"Uganda","UA":"Ukraine","AE":"United Arab Emirates","GB":"United Kingdom","US":"United States","UM":"United States Minor Outlying Islands","UY":"Uruguay","UZ":"Uzbekistan","VU":"Vanuatu","VE":"Venezuela","VN":"Viet Nam","VG":"Virgin Islands, British","VI":"Virgin Islands, U.S.","WF":"Wallis and Futuna","EH":"Western Sahara","YE":"Yemen","ZM":"Zambia","ZW":"Zimbabwe"}},
    host: {type:"textbox", validation:"hostname", placeholder: "e.g. host.com"},
    ip: {type:"textbox", validation:"ip", placeholder: "e.g. 10.10.10.10"},
    referer: {type:"textbox", validation:"hostname", placeholder: "e.g. host.com"},
    method: {vals:{"post":"POST","get":"GET","head":"HEAD","put":"PUT","delete":"DELETE","patch":"PATCH","options":"OPTIONS"}},
    ssl: {vals:{"on": "ON", "off":"OFF"}},
    url: {type:"textbox", validation:"url", placeholder: "e.g. http://example.com/test?var=1"},
    uri: {type:"textbox", validation:"uri", placeholder: "e.g. /test?var=1"},
    uripath: {type:"textbox", validation:"uripath", placeholder: "e.g. /testpath"},
    uriquery: {type:"textbox", validation:"query", placeholder: "e.g. query=test"},
    agent: {type:"textbox", validation:"agent", placeholder: "e.g. Mozilla/5.0 (Macintosh; Intel Mac OSX 10_12_16)..."},
    forwarded: {type:"textbox", validation:"ip", placeholder: "e.g. 10.10.10.10"},
    knownbot: {vals:{"on": "ON", "off":"OFF"}},
    threat: {type:"textbox", validation:"integer", placeholder: "e.g. 1234"},


}

       // .show();

        var actOptions = "";
        selectedOption=$(this).find('option:selected').val();



            selectnum=0;
            for (act in actions[selectedOption]) {

                selectedattr = "";
                if(selectnum==0)
                {
                    selectedattr=" selected='selected' ";
                }
                selectnum++;

                actOptions += "<option "+selectedattr+" class='"+act+"' value='"+ act +"'>" + toUpper(actions[$(this).find('option:selected').val()][act].replace("_"," ")) + "</option>";
            }

        if(actOptions=="")
        {
            actOptions = "<option value='NULL'>N/A</option>";
        }
       $(this).parent().siblings('.valueDiv').children('.value').html(actOptions)

       // alert($(this).parent().siblings('.valueDiv').children('.value').attr("oldValue"));
       //
       //
    value2div=$(this).parent().siblings('.value2Div');

    oldVal=value2div.children('.fwRuleValue2').val();
    
       if(values[selectedOption]['type']=='textbox')
       {
            if(values[selectedOption]['validation']=="integer")
            {
                value2div.html('<input type="number" name="actionValue2[]" placeholder="'+values[selectedOption]['placeholder']+'" class="value2 form-control fwRuleValue2">')    
            }
            else
            {
                value2div.html('<input type="text" name="actionValue2[]" placeholder="'+values[selectedOption]['placeholder']+'" class="value2 form-control fwRuleValue2">')
            }
            

       }
       else if(values[selectedOption]['type']=='onoff')
       {
            // value2div.html("");
       }
       else //dropdown
       {
        valuesOptions="";
       
            for (act in values[selectedOption]['vals']) {
                
                
                valuesOptions += "<option  class='"+act+"' value='"+ act +"'>" + toUpper(values[selectedOption]['vals'][act]) + "</option>";
            }


        value2div.html('<select name="actionValue2[]" class="value2 form-control fwRuleValue2">'+valuesOptions+"</select>")


          value2div.children("select:first-child").select2({ dropdownAutoWidth : false,


    minimumResultsForSearch: 5});


// alert(oldVal);

       }


});
// changing for in and notin

$(document).on('change',".fwRuleValue",function() {

    var operator_val = $(this).val();
    // alert(operator_val);
    if(operator_val == 'in' || operator_val == 'notin') {

        //alert('its multi select');
        value2div=$(this).parent().siblings('.value2Div');
     
        // alert(multiselectOldValue);
        oldValue="";
        oldValue=$(this).attr("oldvalue")
        oldValue=oldValue.split(",");
         console.log(oldValue);
         options="";
         oldValue.forEach(function(item){

           options += "<option value='"+item+"' selected='selected'>"+item+"</option>";

         });
        value2div.html('<select name="actionValue2[]" class="value2 form-control fwRuleValue2 fwRuleValue2Multi"  multiple="multiple"></select>');
var items = [];
 for (val in oldValue)
            {
                items.push({
        "id": val,
        "text": val,
        "selected":"selected"
    });

                 // value2div.children("select:first-child").append("<option value=\"" + val + "\">" + val + "</option>");
}
            value2div.children("select:first-child").select2({
                dropdownAutoWidth : false,
                tags: true,
               allowClear: true, //
               closeOnSelect: true,
               tokenSeparators: [',', ' '],
                minimumResultsForSearch: -1,
                // data: items
     
            });

            value2div.children("select:first-child").html(options);

            // value2div.children("select:first-child").val('2324').trigger("change");
            // value2div.children("select:first-child").val('TheID').trigger('change')
// value2div.children("select:first-child").data(oldValue).select2.updateSelection(oldValue);
            
// 

// data2="[";
// var items = [];
//  for (val in oldValue)
//             {
//                 items.push({
//         "id": val,
//         "text": val
//     });

//                  value2div.children("select:first-child").append("<option value=\"" + val + "\">" + val + "</option>");
// }

// options.data = items;
// value2div.children("select:first-child").select2(options);

//             for (val in oldValue)
//             {
//                 data2+='{"id":"'+val'","text":'+val'"},';

//                 // value2div.children("select:first-child").val(val).trigger('change');  
//    // value2div.children("select:first-child option[value="+val+"]").prop("selected",true).trigger("change")
              
//             }
//             data2+="]";
//             alert(data2);
// value2div.children("select:first-child").select2('data', eval('[{"id":"5b0536335675a4a387260fe2","text":"doctruyen.tv"},{"id":"5b06355d5675a4a386060a73","text":"Landmark Tower 105"}]'));
//            value2div.children("select:first-child").val(oldValue).trigger('change');
  
// value2div.children("select:first-child").val(oldValue).trigger("change")

    }

});




var ruleVals = {
    asnum: "ip.geoip.asnum",
    cookie:"http.cookie",
    country:"ip.geoip.country",
    host:"http.host",
    ip:"ip.src",
    referer:"http.referer",
    method: "http.request.method",
    ssl: "ssl",
    url: "http.request.full_uri",
    uri: "http.request.uri",
    uripath: "http.request.uri.path",
    uriquery: "http.request.uri.query",
    agent: "http.user_agent",
    forwarded: "http.x_forwarded_for",
    knownbot: "cf.client.bot",
    threat:"cf.threat_score"



    

}




$(document).on('change',".fwRuleValue",$.fn.expressionGenerator);
$(document).on('keyup',".fwRuleValue2",$.fn.expressionGenerator);
$(document).on('change',".fwRuleValue2",$.fn.expressionGenerator);



$(document).on('change',".scope",function(){

        // alert($(this).find('option:selected').val())

var actions = {

    Country:{"AF":"Afghanistan","AL":"Albania","DZ":"Algeria","AS":"American Samoa","AD":"Andorra","AO":"Angola","AI":"Anguilla","AQ":"Antarctica","AG":"Antigua and Barbuda","AR":"Argentina","AM":"Armenia","AW":"Aruba","AU":"Australia","AT":"Austria","AZ":"Azerbaijan","BS":"Bahamas","BH":"Bahrain","BD":"Bangladesh","BB":"Barbados","BY":"Belarus","BE":"Belgium","BZ":"Belize","BJ":"Benin","BM":"Bermuda","BT":"Bhutan","BO":"Bolivia","BA":"Bosnia and Herzegovina","BW":"Botswana","BV":"Bouvet Island","BR":"Brazil","IO":"British Indian Ocean Territory","BN":"Brunei Darussalam","BG":"Bulgaria","BF":"Burkina Faso","BI":"Burundi","KH":"Cambodia","CM":"Cameroon","CA":"Canada","CV":"Cape Verde","KY":"Cayman Islands","CF":"Central African Republic","TD":"Chad","CL":"Chile","CN":"China","CX":"Christmas Island","CC":"Cocos (Keeling) Islands","CO":"Colombia","KM":"Comoros","CG":"Congo","CD":"Congo, the Democratic Republic of the","CK":"Cook Islands","CR":"Costa Rica","CI":"Cote D&apos;Ivoire","HR":"Croatia","CU":"Cuba","CY":"Cyprus","CZ":"Czech Republic","DK":"Denmark","DJ":"Djibouti","DM":"Dominica","DO":"Dominican Republic","EC":"Ecuador","EG":"Egypt","SV":"El Salvador","GQ":"Equatorial Guinea","ER":"Eritrea","EE":"Estonia","ET":"Ethiopia","FK":"Falkland Islands (Malvinas)","FO":"Faroe Islands","FJ":"Fiji","FI":"Finland","FR":"France","GF":"French Guiana","PF":"French Polynesia","TF":"French Southern Territories","GA":"Gabon","GM":"Gambia","GE":"Georgia","DE":"Germany","GH":"Ghana","GI":"Gibraltar","GR":"Greece","GL":"Greenland","GD":"Grenada","GP":"Guadeloupe","GU":"Guam","GT":"Guatemala","GN":"Guinea","GW":"Guinea-Bissau","GY":"Guyana","HT":"Haiti","HM":"Heard Island and Mcdonald Islands","VA":"Holy See (Vatican City State)","HN":"Honduras","HK":"Hong Kong","HU":"Hungary","IS":"Iceland","IN":"India","ID":"Indonesia","IR":"Iran, Islamic Republic of","IQ":"Iraq","IE":"Ireland","IL":"Israel","IT":"Italy","JM":"Jamaica","JP":"Japan","JO":"Jordan","KZ":"Kazakhstan","KE":"Kenya","KI":"Kiribati","KP":"Korea, Democratic People&apos;s Republic of","KR":"Korea, Republic of","KW":"Kuwait","KG":"Kyrgyzstan","LA":"Lao People&apos;s Democratic Republic","LV":"Latvia","LB":"Lebanon","LS":"Lesotho","LR":"Liberia","LY":"Libyan Arab Jamahiriya","LI":"Liechtenstein","LT":"Lithuania","LU":"Luxembourg","MO":"Macao","MK":"Macedonia, the Former Yugoslav Republic of","MG":"Madagascar","MW":"Malawi","MY":"Malaysia","MV":"Maldives","ML":"Mali","MT":"Malta","MH":"Marshall Islands","MQ":"Martinique","MR":"Mauritania","MU":"Mauritius","YT":"Mayotte","MX":"Mexico","FM":"Micronesia, Federated States of","MD":"Moldova, Republic of","MC":"Monaco","MN":"Mongolia","MS":"Montserrat","MA":"Morocco","MZ":"Mozambique","MM":"Myanmar","NA":"Namibia","NR":"Nauru","NP":"Nepal","NL":"Netherlands","AN":"Netherlands Antilles","NC":"New Caledonia","NZ":"New Zealand","NI":"Nicaragua","NE":"Niger","NG":"Nigeria","NU":"Niue","NF":"Norfolk Island","MP":"Northern Mariana Islands","NO":"Norway","OM":"Oman","PK":"Pakistan","PW":"Palau","PS":"Palestinian National Authority","PA":"Panama","PG":"Papua New Guinea","PY":"Paraguay","PE":"Peru","PH":"Philippines","PN":"Pitcairn","PL":"Poland","PT":"Portugal","PR":"Puerto Rico","QA":"Qatar","RE":"Reunion","RO":"Romania","RU":"Russian Federation","RW":"Rwanda","SH":"Saint Helena","KN":"Saint Kitts and Nevis","LC":"Saint Lucia","PM":"Saint Pierre and Miquelon","VC":"Saint Vincent and the Grenadines","WS":"Samoa","SM":"San Marino","ST":"Sao Tome and Principe","SA":"Saudi Arabia","SN":"Senegal","CS":"Serbia and Montenegro","SC":"Seychelles","SL":"Sierra Leone","SG":"Singapore","SK":"Slovakia","SI":"Slovenia","SB":"Solomon Islands","SO":"Somalia","ZA":"South Africa","GS":"South Georgia and the South Sandwich Islands","ES":"Spain","LK":"Sri Lanka","SD":"Sudan","SR":"Suriname","SJ":"Svalbard and Jan Mayen","SZ":"Swaziland","SE":"Sweden","CH":"Switzerland","SY":"Syrian Arab Republic","TW":"Taiwan, Province of China","TJ":"Tajikistan","TZ":"Tanzania, United Republic of","TH":"Thailand","TL":"Timor-Leste","TG":"Togo","TK":"Tokelau","TO":"Tonga","TT":"Trinidad and Tobago","TN":"Tunisia","TR":"Turkey","TM":"Turkmenistan","TC":"Turks and Caicos Islands","TV":"Tuvalu","UG":"Uganda","UA":"Ukraine","AE":"United Arab Emirates","GB":"United Kingdom","US":"United States","UM":"United States Minor Outlying Islands","UY":"Uruguay","UZ":"Uzbekistan","VU":"Vanuatu","VE":"Venezuela","VN":"Viet Nam","VG":"Virgin Islands, British","VI":"Virgin Islands, U.S.","WF":"Wallis and Futuna","EH":"Western Sahara","YE":"Yemen","ZM":"Zambia","ZW":"Zimbabwe"},
    HttpMethod:{"post":"POST","get":"GET","head":"HEAD","put":"PUT","delete":"DELETE","patch":"PATCH","options":"OPTIONS"},


}

       // .show();

        var actOptions = "";
        selectedOption=$(this).find('option:selected').val();


        selector=$(this).parent().siblings('.valueDiv')
        oldValue=selector.children('.value').attr("oldValue");





        for (act in actions[selectedOption]) {

                actOptions += "<option class='"+act+"' value='"+ act +"'>" + toUpper(actions[$(this).find('option:selected').val()][act].replace("_"," ")) + "</option>";
        }


        if(selectedOption=="IpRange")
        {
            $(this).parent().siblings('.valueDiv').html('<input placeholder="From IP" type="text"  name="data[]" class="select2 value form-control" oldValue="'+oldValue+'" > \
               <input placeholder="To IP" type="text"  name="data2[]" class=" value form-control" oldValue="'+oldValue+'" > ')
        }
        else if(actOptions=="")
        {
            selector.html('<input type="text"  name="data[]" class="select2 value form-control" oldValue="'+oldValue+'" > \
                <input type="hidden"  name="data2[]" class=" value form-control" oldValue="'+oldValue+'" > ')
        }
        else
        {
           selector.html('<select name="data[]" class="select2 value form-control"  oldValue="'+oldValue+'" ></select>\
            <input type="hidden"  name="data2[]" class=" value form-control" oldValue="'+oldValue+'" > ')
            selector.children('.value').html(actOptions)

            selector.children('.value:first-child').select2({
    dropdownAutoWidth : true,


    minimumResultsForSearch: -1
})

        }


       // alert($(this).parent().siblings('.valueDiv').children('.value').attr("oldValue"));
       //
       //

       // if(selectedOption=="IPR"){

       //      if(oldValue)
       //      {

       //          if(oldValue!="")
       //          {


       //      oldValue=oldValue.split(",SPLIT,")
       //      url=oldValue[1];
       //      oldValue=oldValue[0];
       //      }
       //  }
       //  else
       //  {
       //      url="";
       //  }

       //      $(this).parent().siblings('.extraDiv').show()
       //      $(this).parent().siblings('.extraDiv').children('.extra').val(url);


       //  }
       //  else
       //  {
       //      $(this).parent().siblings('.extraDiv').hide();
       //  }


       //  if(selectedOption=="always_use_https"){
       //      $(".add-setting-link").hide();
       //      $(".formMsg").html("You cannot add any additional settings with \"Always Use HTTPS\" selected.");

       //  }
       //  else if(selectedOption=="forwarding_url"){
       //     $(".add-setting-link").hide();
       //      $(".formMsg").html("You cannot add any additional settings with \"Forwarding URL\" selected.");

       //  }
       //  else
       //  {   $(".formMsg").html("")
       //      $(".add-setting-link").show()
       //  }

        //alert(oldValue);
        //alert(selector.attr('oldValue'))

        if(selectedOption=="IpRange")
        {

            oldValue=oldValue.split(",")
            selector.children('.value:first-child').val(oldValue[0]);
            selector.children('.value:last-child').val(oldValue[1]);

        }
        else
        {
            selector.children('.value').val(oldValue);
            selector.children('.value').trigger("change");
        }


});





 $(".wafPackageSetting").change(function(){

        $.ajax({
  url: 'updateWafPackage',
  type: 'PUT',
  data: "id="+$(this).attr('package-id')+"&setting="+$(this).attr('setting')+"&value="+$(this).val()+"&_token="+$("input[name=csrftoken]").attr("value"),
  success: function(data) {
    //alert(data);
  }
});


});




 $("#minutes").change(function(){

    $(this).parent().submit();

 });


$("#changeZone").change(function(){

    port="";
    if(window.location.port)
    {
        port=":"+window.location.port;
    }

    last="/overview";
    if(window.location.href.match(/([^\/]*)\/*$/)[1]!="home")
    {
        //last="/"+window.location.href.match(/([^\/]*)\/*$/)[1];
    }

    //alert(window.location.protocol)
    window.location.assign(window.location.protocol+"//"+window.location.hostname+port+"/admin/"+$(this).find( "option:selected" ).text()+last);


});




$('.scopes').children().hide()
$('.scopes').children('.scope-data').show();
$(".rule_scope").change(function(){

selected= $(this).val();
//alert(selected)
if(selected=="Ip")
{


     $(this).parent().siblings('.scopes').children().hide();
     $(this).parent().siblings('.scopes').children('.scope-data').show();
    // alert('done');

}
else if(selected=="IpRange")
{


     $(this).parent().siblings('.scopes').children().hide();
     $(this).parent().siblings('.scopes').children('.scope-iprange').show();


}
else if(selected=="Url")
{


     $(this).parent().siblings('.scopes').children().hide();
     $(this).parent().siblings('.scopes').children('.scope-data').show();


}
else if(selected=="UserAgent")
{


     $(this).parent().siblings('.scopes').children().hide();
     $(this).parent().siblings('.scopes').children('.scope-data').show();


}
else if(selected=="Header")
{


     $(this).parent().siblings('.scopes').children().hide();
     $(this).parent().siblings('.scopes').children('.scope-data').show();


}
else if(selected=="HttpMethod")
{


     $(this).parent().siblings('.scopes').children().hide();
     $(this).parent().siblings('.scopes').children('.scope-httpmethod').show();


}
else if(selected=="FileExt")
{


     $(this).parent().siblings('.scopes').children().hide();
     $(this).parent().siblings('.scopes').children('.scope-data').show();


}
else if(selected=="MimeType")
{


     $(this).parent().siblings('.scopes').children().hide();
     $(this).parent().siblings('.scopes').children('.scope-data').show();


}
else if(selected=="Country")
{


     $(this).parent().siblings('.scopes').children('div').hide();
     $(this).parent().siblings('.scopes').children('.scope-country').show();


}
else if(selected=="Organization")
{


     $(this).parent().siblings('.scopes').children().hide();
     $(this).parent().siblings('.scopes').children('.scope-data').show();


}
});

$(".wafGroupToggle").change(function(){


    $(this).prop("disabled", true);


dataOn=$(this).attr("data-on");
dataOff=$(this).attr("data-off");


$(this).attr("data-on","<i class='fa fa-spin fa-spinner'></i>");
$(this).attr("data-off","<i class='fa fa-spin fa-spinner'></i>");

$(this).bootstrapToggle('destroy');

$(this).bootstrapToggle();
    if($(this).is(':checked'))
    {
        value=true;
    }
    else
    {
        value=false;
    }



            $.ajax({
  url: 'updateWafGroup',
  dataOn: dataOn,
  dataOff: dataOff,
  value:value,
  selector:$(this),
  type: 'PUT',
  data: "id="+$(this).attr('group-id')+"&value="+value+"&_token="+$("input[name=csrftoken]").attr("value"),
  success: function(data) {


    if(value==true)
    {
        message="Changed from Off to On successfuly!"
    }
    else
    {
         message="Changed from On to Off successfuly!"
    }
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




this.selector.prop("disabled","");
this.selector.attr("data-on",this.dataOn);
this.selector.attr("data-off",this.dataOff);

this.selector.bootstrapToggle('destroy');

this.selector.bootstrapToggle();

  this.selector.removeAttr("disabled");
  },
  failure: function(data){


this.selector.prop("disabled","");
this.selector.attr("data-on",this.dataOn);
this.selector.attr("data-off",this.dataOff);

this.selector.bootstrapToggle('destroy');

this.selector.bootstrapToggle();

  this.selector.removeAttr("disabled");
  }
});





});


$(document.body).on('change',".wafRuleChange",function(){




 $(this).parent().append("<span class='changeLoader'><i class='fa fa-spin fa-spinner'></i></span>");
        $(this).attr("disabled","disabled")
value=$(this).find('option:selected').val();
            $.ajax({
  url: 'updateWafRule',

  selector:$(this),
  type: 'PUT',
  data: "id="+$(this).attr('rule-id')+"&value="+value+"&_token="+$("input[name=csrftoken]").attr("value"),
  success: function(data) {



     if(data=="success")
                    {


                    $("#dns").modal('hide');

                       new Noty({
                          text: '<div class="text-left">WAF Rule Updated</strong></div>',
                            type: 'success',
                            theme: 'mint',
                            layout: 'bottomRight',
                            timeout: 4000,
                            animation: {
                              open: mojsShow

                            }
                          }).show()

                        // location.reload();

                    }
                    else
                    {

                        swal('Error!',data,'warning');
                    }

    this.selector.parent().children("span.changeLoader:first").remove();
        this.selector.removeAttr("disabled")


  },
  failure: function(data){


  }
});





});

function convertMinsToHrsMins(mins) {
  let h = Math.floor(mins / 60);
  let m = mins % 60;
  h = h < 10 ? '0' + h : h;
  m = m < 10 ? '0' + m : m;
  return `${h} hours ${m} minutes`;
}


$("#rayidForm").submit(function(e)
{

e.preventDefault();
    rayid= $("#rayid").val();
    if(rayid=="")
    {
        alert("Please enter a RayID");
    }
    else
    {
        url= $("#url").val();

        url=url.replace(/RAYIDHERE/g,rayid);

        var win = window.open(url, '_blank');
            if (win) {
                //Browser has allowed it to be opened
                win.focus();
            } else {
                //Browser has blocked it
                alert('Please allow popups panel.blockdos.net');
            }

    }


})

$("#wafruledetailsForm").submit(function(e)
{

e.preventDefault();
    rayid= $("#ruleid").val();
    if(rayid=="")
    {
        alert("Please enter a RuleID");
    }
    else
    {


            $.ajax({
  url: 'wafRuleInfo',
  type: 'GET',
  data: "id="+$(this).attr('record-id')+"&value="+value+"&_token="+$("input[name=csrftoken]").attr("value"),
  success: function(data) {
  //$(this).removeAttr("disabled");
  },
  failure: function(data){

    //$(this).removeAttr("disabled");
  }
});

    }


})

$("#customlogsform1").submit(function(e)
{

e.preventDefault();



            $.ajax({
  url: 'uploadCustomLog',
  type: 'POST',
  data: new FormData( this ),
      processData: false,
      contentType: false,

  success: function(data) {
  //$(this).removeAttr("disabled");
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



  $(".datatableVersions").DataTable({
    "pageLength": 5,
    "aLengthMenu": [[5, 10, 50, -1], [5, 10, 50, "All"]],
        "iDisplayLength": 5,

    "order": [[ 1, "desc" ]]
  })

$("#elsForm select").change(function(){

minutes= $('#elsminutes').val();
hours= $('#hours').val();

time = convertMinsToHrsMins(((hours*60)/minutes));

info = "System will fetch "+hours+" hours of data; This zone will be in sync to current time in roughly "+time+" ";
$("#fetchInfo").html(info);
});


$("#elsForm").on('submit', function (e) {



e.preventDefault();

$("#elsModal").modal('hide');

zid=$("#elsModal").attr('zid');
zname=$("#elsModal").attr('zname');
data=$(this).serialize();


swalText="It may take upto a Minute to process this request";
    swalType = "warning"
    swal({
  title: "Enable ELS for "+zname,
  text: swalText,
   type: swalType,
  showCancelButton: true,
  closeOnConfirm: false,
  showLoaderOnConfirm: true
}, function () {
            $.ajax({
  url: 'elsSetting',
  type: 'PATCH',
  data: data+"&id="+zid+"&value=1&_token="+_token,
  success: function(data) {
  //$(this).removeAttr("disabled");
  //

  selector.data("bs.toggle").on(true);
  data=data.split(',')
  swal(data[0],data[1],data[2]);
  },
  failure: function(data){

      swal('Error!','Could not enable ELS. Please make sure that ELS is enabled at cloudflare end as well and then try again.','warning');

    if(selector.is(':checked'))
        {
            selector.data("bs.toggle").off(true);

        }
        else
        {
            selector.data("bs.toggle").on(true);
        }
  },
  error:function (xhr, ajaxOptions, thrownError){
    if(xhr.status==444) {
        if(selector.is(':checked'))
        {
            selector.data("bs.toggle").off(true);

        }
        else
        {
            selector.data("bs.toggle").off(true);
        }

      swal('Error!','Could not enable ELS. Please make sure that ELS is enabled at cloudflare end as well and then try again.','warning');
    }
}
});


});


});





$(".elsSetting").change(function(){


    //$(this).prop("disabled", true);
selector=$(this);

    if(selector.is(':checked'))
    {
        value=1;
    }
    else
    {
        value=0;
    }

zid=selector.attr('zone-id');
zname=selector.attr('zone-name');

if(selector.is(':checked'))
{

    $("#fetchInfo").html("");
    selector.data("bs.toggle").off(true);
    $("#elsModal").modal('show');
    $("#elsModal").attr('zid',zid);
    $("#elsModal").attr('zname',zname);
}
else
{
    swalText="It will disable Logs Parsing for "+zname;
    swalType = "warning"
    swal({
  title: "Disable ELS",
  text: swalText,
   type: swalType,
  showCancelButton: true,
  closeOnConfirm: false,
  showLoaderOnConfirm: true
}, function (isConfirm) {

    if(isConfirm)
    {
            $.ajax({

  url: 'elsSetting',
  type: 'PATCH',
  data: "id="+zid+"&value="+value+"&_token="+_token,
  success: function(data) {
  //$(this).removeAttr("disabled");
  data=data.split(',')
  swal(data[0],data[1],data[2]);
  },
  failure: function(data){

      swal('Error!','Could not enable ELS. Please make sure that ELS is enabled at cloudflare end as well and then try again.','warning');

    if(selector.is(':checked'))
        {
           selector.data("bs.toggle").off(true);

        }
        else
        {
selector.bootstrapToggle('on')
        }
  },
  error:function (xhr, ajaxOptions, thrownError){
    if(xhr.status==444) {
        if(selector.is(':checked'))
        {
            selector.data("bs.toggle").off(true);

        }
        else
        {
selector.data("bs.toggle").on(true);
        }

      swal('Error!','Could not enable ELS. Please make sure that ELS is enabled at cloudflare end as well and then try again.','warning');
    }
}
});

}
else
{
    selector.data("bs.toggle").on(true);

}
});
}



});









$(document.body).on('click', '.eventDetail', function(){



    //$(this).prop("disabled", true);
selector=$(this);





    $("#eventModal").modal('show');

    $("#date").html(selector.data('date'));
    $("#action").html(selector.data('action'));
    $("#rulename").html(selector.data('rulename'));
    $("#schememethod").html(selector.data('schememethod'));
    $("#uri").html(selector.data('uri'));
    if(selector.data('querystring')=="")
    {
         $("#querystring").html("N/A");
    }
    else
    {
             $("#querystring").html(selector.data('querystring'));
    }

    $("#domain").html(selector.data('domain'));
    $("#clientip").html(selector.data('clientip'));
    $("#country").html(selector.data('country'));
    $("#useragent").html(selector.data('useragent'));





});

var loadingContent = '<div class="modal-header"><h1>Processing<span class="loader"><span class="loader__dot">.</span><span class="loader__dot">.</span><span class="loader__dot">.</span></span></h1></div><div class="modal-body"><div class="progress progress-striped active"><div class="bar" style="width: 100%;"></div></div></div>';

var waitingDialog = waitingDialog || (function ($) {
    'use strict';

    // Creating modal dialog's DOM
    var $dialog = $(
        '<div id="loadingModal" class="modal fade" data-backdrop="static" data-keyboard="false" tabindex="-1" role="dialog" aria-hidden="true" style="padding-top:15%; overflow-y:visible;">' +
        '<div class="modal-dialog modal-m">' +
        '<div class="modal-content">' +
            '<div class="modal-header"><h3 style="margin:0;"></h3></div>' +
            '<div class="modal-body">' +
                '<div class="progress progress-striped active" style="margin-bottom:0;"><div class="progress-bar" style="width: 100%"></div></div>' +
            '</div>' +
        '</div></div></div>');

    return {
        /**
         * Opens our dialog
         * @param message Custom message
         * @param options Custom options:
         *                options.dialogSize - bootstrap postfix for dialog size, e.g. "sm", "m";
         *                options.progressType - bootstrap postfix for progress bar type, e.g. "success", "warning".
         */
        show: function (message, options) {
            // Assigning defaults
            if (typeof options === 'undefined') {
                options = {};
            }
            if (typeof message === 'undefined') {
                message = 'Loading';
            }
            var settings = $.extend({
                dialogSize: 'm',
                progressType: '',
                onHide: null // This callback runs after the dialog was hidden
            }, options);

            // Configuring dialog
            $dialog.find('.modal-dialog').attr('class', 'modal-dialog').addClass('modal-' + settings.dialogSize);
            $dialog.find('.progress-bar').attr('class', 'progress-bar');
            if (settings.progressType) {
                $dialog.find('.progress-bar').addClass('progress-bar-' + settings.progressType);
            }
            $dialog.find('h3').text(message);
            // Adding callbacks
            if (typeof settings.onHide === 'function') {
                $dialog.off('hidden.bs.modal').on('hidden.bs.modal', function (e) {
                    settings.onHide.call($dialog);
                });
            }
            // Opening dialog
            $dialog.modal();
        },
        /**
         * Closes dialog
         */
        hide: function () {
            $("body").css("padding-right","0px");
            // $("#loadingModal").modal("hide");

            setTimeout(
              function()
              {
                 $dialog.modal('hide');
            // alert("sd")
                //do something special
              }, 1000);

        }
    };

})(jQuery);

$('body').on('click','.showIPDetails',function(e){
e.preventDefault();
waitingDialog.show();
// $("#ipDetailsModal").modal('show');
// $(".loader").show();
// $("#ipDetailsModalBody").html(loadingContent);
minutes = $(this).data('minutes');
ip = $(this).html();
$.ajax({
  url: 'ipDetails/'+minutes+'/'+ip,
  type: 'GET',
  data: "_token="+$("input[name=csrftoken]").attr("value"),
  success: function(data) {
  //$(this).removeAttr("disabled");
  waitingDialog.hide();
  $("#ipDetailsModal").modal('show');
  $("#ipDetailsModalBody").html(data);
  $(".IPdatatable").DataTable({
    "pageLength": 5,
    "aLengthMenu": [[5, 10, 50, -1], [5, 10, 50, "All"]],
        "iDisplayLength": 5,
  })



  },
  failure: function(data){

    //$(this).removeAttr("disabled");
  }

});
});


$('body').on('click','.showWAFGroupDetails',function(e){
e.preventDefault();
waitingDialog.show();
// $("#ipDetailsModal").modal('show');
// $(".loader").show();
// $("#ipDetailsModalBody").html(loadingContent);
gid = $(this).data('gid');
pid = $(this).data('pid');
$.ajax({
url: 'wafGroupDetails/'+pid+"/"+gid,
  type: 'GET',
  data: "_token="+$("input[name=csrftoken]").attr("value"),
  success: function(data) {
  //$(this).removeAttr("disabled");



  $("#WAFGroupDetailsModal").modal('show');
  $("#WAFGroupDetailsModalBody").html(data);
  $(".RulesDatatable").DataTable({
    "pageLength": 5,
    "aLengthMenu": [[5, 10, 50, -1], [5, 10, 50, "All"]],
        "iDisplayLength": 5,
  })
  waitingDialog.hide();
  $(".wafRuleChange").select2({ dropdownAutoWidth : true,


    minimumResultsForSearch: -1});

  },
  failure: function(data){

    //$(this).removeAttr("disabled");
  }

});
});

$(".createRuleFromEvent").click(function(){


    //$(this).prop("disabled", true);
    $("#eventModal").modal('hide');
    $("#wafrulename").val("WAF Event for "+$("#clientip").html());
    $("#scopeVal").attr("oldValue",$("#clientip").html());
    $(".valueDiv input:first-child").val($("#clientip").html());
    $(".valueDiv input:first-child").attr("oldValue",$("#clientip").html());
    $("#addWafRuleBtn").trigger('click');

});

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

$(".pageRuleStatus").change(function(){


    //$(this).prop("disabled", true);


    if($(this).is(':checked'))
    {
        value='active';
    }
    else
    {
        value='disabled';
    }



            $.ajax({
  url: 'pageRuleStatus',
  type: 'PATCH',
  data: "id="+$(this).attr('record-id')+"&value="+value+"&_token="+$("input[name=csrftoken]").attr("value"),
  success: function(data) {
  //$(this).removeAttr("disabled");
  },
  failure: function(data){

    //$(this).removeAttr("disabled");
  }
});






});



var rVals = [
    {rule: "asnum", val: "ip.geoip.asnum"},
    {rule: "cookie", val:"http.cookie"},
    {rule: "country", val:"ip.geoip.country"},
    {rule: "host", val:"http.host"},
    {rule: "ip", val:"ip.src"},
    {rule: "referer", val:"http.referer"},
    {rule: "method", val: "http.request.method"},
    {rule: "ssl", val: "ssl"},
    {rule: "url", val: "http.request.full_uri"},
    {rule: "uri", val: "http.request.uri"},
    {rule: "uripath", val: "http.request.uri.path"},
    {rule: "uriquery", val: "http.request.uri.query"},
    {rule: "agent", val: "http.user_agent"},
    {rule: "forwarded", val: "http.x_forwarded_for"},
    {rule: "knownbot", val: "cf.client.bot"},
    {rule: "threat", val:"cf.threat_score"}
]

function trimChar(string, charToRemove) {
    while(string.charAt(0)==charToRemove) {
        string = string.substring(1);
    }

    while(string.charAt(string.length-1)==charToRemove) {
        string = string.substring(0,string.length-1);
    }

    return string;
}


$(".editFwRule").click(function(){


$("#settings").html('<div  style="padding-bottom: 15px;" andOr="FIRST"  class="row fwRow">\
<div class="col-lg-2 selectorDiv">\
  <select name="action[]" tabindex="-1" title="" class="select2 fwRuleAction">\
    <option value="">Select One</option><option value="asnum">AS Num</option><option value="cookie">Cookie</option><option value="country">Country</option><option value="host">Hostname</option><option value="ip">IP Address</option><option value="referer">Referer</option><option value="method">Request Method</option><option value="ssl">SSL/HTTPS</option><option value="url">URI Full</option><option value="uri">URI</option><option value="uripath">URI Path</option><option value="uriquery">URI Query String</option><option value="agent">User Agent</option><option value="forwarded">X-Forwarded-For</option><option value="knownbot">Known Bots</option><option value="threat">Threat Score</option>\
  </select>\
</div>\
<div class="col-lg-2 valueDiv">\
  <select name="actionValue[]" class="select2 value fwRuleValue form-control">\
    <option value="on">YES</option>\
    <option value="of">NO</option>\
  </select>\
</div>\
<div class="col-lg-5 value2Div">\
  <input type="text" name="actionValue2[]" class="value2 form-control fwRuleValue2" >\
</div>\
<div class="col-lg-3">\
  <a href="#" class="btn btn-link fwRuleAnd no-underline light-gray-bg">\
  AND\
\
</a>\
\
  <a href="#" class="btn btn-link fwRuleOr no-underline light-gray-bg">\
  OR\
\
</a>\
</div>\
\
\
</div>');
currentRow=$("#settings").children(".fwRow:first-child")

// expression='(ip.geoip.country eq "PT") or (ip.geoip.asnum eq 12 and http.request.method eq "get")';
// (ip.geoip.asnum in {2324 2535}
//http.cookie eq "sdf=sdf"
//ip.geoip.asnum eq 123
//ip.geoip.asnum eq 12)
expression=expressionOriginal=$(this).attr('expression');

//alert(expression);
var description = $(this).data('name');
var rule_id = $(this).data('id');

$("#rule-name").val(description);
$("#rule-name").after("<input type='hidden' name='rule_id' value='"+rule_id+"' >");
$("#rule-button").val('Update Rule');
expression=expression.split(") or (");

orloop=1;
expression.forEach(function(obj){

if(expression.length>=2 && orloop>1)
{
     console.log("or")
    currentRow.find(".fwRuleOr").trigger("click");    
}

orloop++;


currentRow=$("#settings").children(".fwRow:last-child")


obj=obj.split(" and ");

andloop=1;
obj.forEach(function(obj1){
// (ip.geoip.asnum in {2324 2535}
    if(obj.length>=2 && andloop>1)
    {
        console.log("and")
        console.log(obj.length)

        currentRow.find(".fwRuleAnd").trigger("click");

        currentRow=$("#settings").children(".fwRow:last-child")
    }

    andloop++;

    //console.log(obj1);
    multiselect = obj1.split('{');
    if(multiselect.length > 1) {
       //given_char_back = '{'+multiselect[1];
        if(multiselect[1].length > 2) {
            given_char_back = multiselect[1].replace(new RegExp(' ', "g"),',');
           given_char_back =  given_char_back.replace(new RegExp('}', "g"),"");

            // given_char_back += given_char_back + '';
            updated_str = '{'+ given_char_back + "}";
        }
        // console.log(updated_str);
        // return;
        obj1 = multiselect[0] + updated_str;
        // obj1 = trimChar(obj1," ");
    }
    

    obj2=obj1.split(" ");
    // console.log(obj2);
    // return;
    // return;
    if(obj2.length!=3)
    {


        obj2[2]=obj2[2]+" "+obj2[3];

    }

    val=obj2[0]=trimChar(obj2[0],"(");
    obj2[0] = rVals.find(obj => {
        return obj.val === val
    })

    obj2[2]=trimChar(obj2[2],")");

    valnum=1;
    currentRow.children("div").each(function(){

        if(valnum==1)
        {
            // console.log(obj2);
            // // alert(obj2[0].rule);
            // console.log($(this).children("select:first-child"));
             // console.log($(this).siblings('.valueDiv').children("select:first-child"));

            if(obj2[0]) {
                $(this).children("select:first-child").val(obj2[0].rule);
                $(this).children("select:first-child").trigger("change"); 
            } else {
                $(this).children("select:first-child").val(obj2[1]);

                $(this).siblings('.valueDiv').children("select:first-child").trigger("change");
            }

            $(this).siblings('.valueDiv').children("select:first-child").trigger("change");

        }
        else if(valnum==2)
        {
            // alert(obj2[1]);

           $(this).children("select:first-child").val(obj2[1]);
            obj2[2]=trimChar(obj2[2],'"');
            obj2[2]=obj2[2].replace("{","");
            obj2[2]=obj2[2].replace("}","");
           $(this).children("select:first-child").attr("oldvalue",obj2[2]);
            $(this).children("select:first-child").trigger("change");  

        }

        else if(valnum==3)
        {

            obj2[2]=trimChar(obj2[2],'"');
            obj2[2]=obj2[2].replace("{","");
            obj2[2]=obj2[2].replace("}","");
            if($(this).children(":first-child").val()=="")
            {
                $(this).children(":first-child").val(obj2[2]);     
            }
           

           // multiselectOldValue=obj2[2];
           // $(this).children(":first-child").attr("oldvalue",obj2[2]);
           
            $(this).children(":first-child").trigger("change");  

        }

        valnum++;
    })

    console.log(obj2[1])
    });


 });


if(expressionOriginal!=$(".expression").val())
{

    alert("you cannot edit this rule using simple expression builder");
    
}
else
{


}

// alert($(".expression").val());



});

$(".fwRuleStatus").change(function(){


    //$(this).prop("disabled", true);


    if($(this).is(':checked'))
    {
        value='active';
    }
    else
    {
        value='disabled';
    }



            $.ajax({
  url: 'fwRuleStatus',
  type: 'PATCH',
  data: "id="+$(this).attr('record-id')+"&value="+value+"&_token="+$("input[name=csrftoken]").attr("value"),
  success: function(data) {
  //$(this).removeAttr("disabled");
  alert("success");
  },
  failure: function(data){

    //$(this).removeAttr("disabled");
  }
});





});

$(".uaRuleStatus").change(function(){


    //$(this).prop("disabled", true);


    if($(this).is(':checked'))
    {
        value='0';
    }
    else
    {
        value='1';
    }



            $.ajax({
  url: 'uaRuleStatus',
  type: 'PATCH',
  data: "id="+$(this).attr('record-id')+"&value="+value+"&_token="+$("input[name=csrftoken]").attr("value"),
  success: function(data) {
  //$(this).removeAttr("disabled");

    if(value==1)
    {
            $("#ruleCount").html($("#ruleCount").html()-1);
                    if($("#ruleCount").html()<$("#allowed").html())
                    {
                        $("#addPageRuleBtn").show();
                    }

    }
    else
    {
        $("#ruleCount").html(parseInt($("#ruleCount").html())+1);
                    if($("#ruleCount").html()<$("#allowed").html())
                    {
                        $("#addPageRuleBtn").show();
                    }

    }

  },
  failure: function(data){

    //$(this).removeAttr("disabled");
  }
});





});





$(".deleteCustomDomain").click(function(){


    //$(this).prop("disabled", true);

var recordid=$(this).attr('record-id');
swal({
  title: "Delete this Custom Domain",
  text: "Custom Domain will be removed from the System and will stop working",
  type: "warning",
  showCancelButton: true,
  closeOnConfirm: false,
  showLoaderOnConfirm: true
}, function () {


                $.ajax({
                  url: 'customDomain/delete',
                  type: 'DELETE',
                  data: "id="+recordid+"&_token="+$("input[name=csrftoken]").attr("value"),
                  success: function(data) {

                    $("#record_"+recordid).hide();
                    swal("Deleted!","Custom Domain Deleted!",'success');
                  },
                  failure: function(data){

                    //$(this).removeAttr("disabled");
                  }
                });

});







});

$(".maxDomains").click(function(){
swal('Error!','Your account has reached the maximum allocated domains limit, Please contact our representatives for more details','warning');
  });
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

$(".deletePageRule").click(function(){


    //$(this).prop("disabled", true);

var ruleid=$(this).attr('rule-id');
swal({
  title: "Delete this Page Rule?",
  text: "You won't be able to recover this Rule, once deleted.",
  type: "warning",
  showCancelButton: true,
  closeOnConfirm: false,
  showLoaderOnConfirm: true
}, function () {


                $.ajax({
                  url: 'pagerules/delete',
                  type: 'DELETE',
                  data: "id="+ruleid+"&_token="+$("input[name=csrftoken]").attr("value"),
                  success: function(data) {

                    $("#rule_"+ruleid).hide();
                    swal("Deleted!","Page Rule Removed!",'success');

                    $("#ruleCount").html($("#ruleCount").html()-1);
                    if($("#ruleCount").html()<$("#allowed").html())
                    {
                        $("#addPageRuleBtn").show();
                    }
                  },
                  failure: function(data){

                    //$(this).removeAttr("disabled");
                  }
                });

});







});

$(".deleteCustomCertificate").click(function(){


    //$(this).prop("disabled", true);

var certificate=$(this).attr('certificate-id');
swal({
  title: "Delete this SSL Certificate?",
  text: "You won't be able to recover it, once deleted.",
  type: "warning",
  showCancelButton: true,
  closeOnConfirm: false,
  showLoaderOnConfirm: true
}, function () {


                $.ajax({
                  url: 'customCertificate/delete',
                  type: 'DELETE',
                  data: "id="+certificate+"&_token="+$("input[name=csrftoken]").attr("value"),
                  success: function(data) {

                    $("#certificate_"+certificate).hide();
                    swal("Deleted!","Certificate Removed!",'success');

                    // $("#ruleCount").html($("#ruleCount").html()-1);
                    // if($("#ruleCount").html()<$("#allowed").html())
                    // {
                    //     $("#addPageRuleBtn").show();
                    // }
                  },
                  failure: function(data){

                    //$(this).removeAttr("disabled");
                  }
                });

});







});


$(".deleteSpWAFRule").click(function(){


    //$(this).prop("disabled", true);

var ruleid=$(this).attr('rule-id');
swal({
  title: "Delete this WAF Rule?",
  text: "You won't be able to recover this Rule, once deleted.",
  type: "warning",
  showCancelButton: true,
  closeOnConfirm: false,
  showLoaderOnConfirm: true
}, function () {


                $.ajax({
                  url: 'wafrules/delete',
                  type: 'DELETE',
                  data: "id="+ruleid+"&_token="+$("input[name=csrftoken]").attr("value"),
                  success: function(data) {

                    $("#rule_"+ruleid).hide();
                    swal("Deleted!","WAF Rule Removed!",'success');

                    // $("#ruleCount").html($("#ruleCount").html()-1);
                    // if($("#ruleCount").html()<$("#allowed").html())
                    // {
                    //     $("#addPageRuleBtn").show();
                    // }
                  },
                  failure: function(data){

                    //$(this).removeAttr("disabled");
                  },
                    error:function (xhr, ajaxOptions, thrownError){
    if(xhr.status==500) {


      swal('Error!','Could Not delete this Rule, Please refresh the page and try again.','error');
    }
}
                });

});







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

$(".deleteUaRule").click(function(){


    //$(this).prop("disabled", true);

var ruleid=$(this).attr('rule-id');
swal({
  title: "Delete this User Agent Rule?",
  text: "You won't be able to recover this Rule, once deleted.",
  type: "warning",
  showCancelButton: true,
  closeOnConfirm: false,
  showLoaderOnConfirm: true
}, function () {


                $.ajax({
                  url: 'uaRule/delete',
                  type: 'DELETE',
                  data: "id="+ruleid+"&_token="+$("input[name=csrftoken]").attr("value"),
                  success: function(data) {

                    $("#rule_"+ruleid).hide();
                    swal("Deleted!","User Agent Rule Removed!",'success');
                  },
                  failure: function(data){

                    //$(this).removeAttr("disabled");
                  }
                });

});







});


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
$("#uaRule").submit(function(e){

e.preventDefault();




            waitingDialog.show();
$.ajax({
                  url: 'createUaRule',
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


                    $("#ua-rule-modal").modal('hide');

                       new Noty({
                          text: '<div class="text-left">User Agent Rule Created</strong></div>',
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


                        if(data=="firewalluablock.api.duplicate_of_existing")
                        {
                            data="Another User agent Rule exists with same values"
                        }

                        swal('Error!',data,'warning');
                    }
                  },
                  failure: function(data){

                    //$(this).removeAttr("disabled");
                  }
                });



})

$("#accessRule").submit(function(e){

e.preventDefault();




            waitingDialog.show();
$.ajax({
                  url: 'createAccessRule',
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


                    $("#add_rule_modal").modal('hide');

                       new Noty({
                          text: '<div class="text-left">Access Rule Created</strong></div>',
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

$(".importZone").click(function(){

userID=$(this).closest('tr').find("select").find('option:selected').val();

cfaccount=$(this).attr('cfaccount');

zone_id=$(this).attr('zone_id');
name=$(this).attr('name');

$.ajax({
                  url: 'doImport',
                  type: 'PUT',
                  context: this,
                  data: "userID="+userID+"&cfaccount="+cfaccount+"&zone_id="+zone_id+"&name="+name+"&_token="+_token,
                  success: function(data) {
                    $(this).closest('tr').addClass("alert-success");
                    $(this).closest('tr').find("select").closest("td").text("Zone Imported");
                    $(this).hide();
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
                  },
                  failure: function(data){

                    //$(this).removeAttr("disabled");
                  }
                });


});


$(".importSpZone").click(function(){

userID=$(this).closest('tr').find("select").find('option:selected').val();

spaccount=$(this).attr('spaccount');

zone_id=$(this).attr('zone_id');
name=$(this).attr('name');

$.ajax({
                  url: 'doImport',
                  type: 'PUT',
                  context: this,
                  data: "userID="+userID+"&spaccount="+spaccount+"&zone_id="+zone_id+"&name="+name+"&_token="+_token,
                  success: function(data) {
                    $(this).closest('tr').addClass("alert-success");
                    $(this).closest('tr').find("select").closest("td").text("Zone Imported");
                    $(this).hide();
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
                  },
                  failure: function(data){

                    //$(this).removeAttr("disabled");
                  }
                });


});


$(".customActions").click(function(){


    //$(this).prop("disabled", true);







var extra = $(this).attr('extra');
var swalType = "info";
var swalConfirm = "Yes!";
// For some browsers, `attr` is undefined; for others,
// `attr` is false.  Check for both.
if (typeof extra !== typeof undefined && extra !== false) {
   if(extra == "files" || extra == "tags")
   {
        swalType = "input";
        swalConfirm = "Purge Cache";
   }
}




var action=$(this).attr('action');
var zoneName=$(this).attr('zoneName');
var swalTitle=$(this).attr('swalTitle');
var swalText=$(this).attr('swalText');
swal({
  title: swalTitle,
  text: swalText,
  type: swalType,
  confirmButtonText: swalConfirm,
  cancelButtonText: "Cancel",
  showCancelButton: true,
  closeOnConfirm: true,

}, function (inputValue) {

                if (inputValue) {
                $.ajax({
                  url: 'customActions',
                  type: 'PATCH',
                  data: "action="+action+"&zoneName="+zoneName+"&extra="+inputValue+"&_token="+$("input[name=csrftoken]").attr("value"),
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
                  },
                  failure: function(data){

                    //$(this).removeAttr("disabled");
                  }
                });
            }

});







});



});
