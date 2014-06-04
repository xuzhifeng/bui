/**
 * @fileOverview \u65e5\u5386\u547d\u540d\u7a7a\u95f4\u5165\u53e3
 * @ignore
 */define("bui/calendar",["bui/common","bui/calendar/calendar","bui/calendar/monthpicker","bui/calendar/datepicker"],function(e){var t=e("bui/common"),n=t.namespace("Calendar");return t.mix(n,{Calendar:e("bui/calendar/calendar"),MonthPicker:e("bui/calendar/monthpicker"),DatePicker:e("bui/calendar/datepicker")}),n}),define("bui/calendar/monthpicker",["bui/common","bui/overlay","bui/list","bui/toolbar"],function(e){function v(){return $.map(d,function(e,t){return{text:e,value:t}})}var t=e("bui/common"),n=t.Component,r=e("bui/overlay").Overlay,i=e("bui/list").SimpleList,s=e("bui/toolbar"),o=t.prefix,u="x-monthpicker-month",a="data-month",f="data-year",l="x-monthpicker-year",c="x-monthpicker-yearnav",h="x-monthpicker-selected",p="x-monthpicker-item",d=["\u4e00\u6708","\u4e8c\u6708","\u4e09\u6708","\u56db\u6708","\u4e94\u6708","\u516d\u6708","\u4e03\u6708","\u516b\u6708","\u4e5d\u6708","\u5341\u6708","\u5341\u4e00\u6708","\u5341\u4e8c\u6708"],m=i.extend({bindUI:function(){var e=this;e.get("el").delegate("a","click",function(e){e.preventDefault()}).delegate("."+u,"dblclick",function(){e.fire("monthdblclick")})}},{ATTRS:{itemTpl:{view:!0,value:'<li class="'+p+' x-monthpicker-month"><a href="#" hidefocus="on">{text}</a></li>'},itemCls:{value:p},items:{view:!0,value:v()},elCls:{view:!0,value:"x-monthpicker-months"}}},{xclass:"calendar-month-panel"}),g=i.extend({bindUI:function(){var e=this,t=e.get("el");t.delegate("a","click",function(e){e.preventDefault()}),t.delegate("."+l,"dblclick",function(){e.fire("yeardblclick")}),t.delegate(".x-icon","click",function(t){var n=$(t.currentTarget);n.hasClass(c+"-prev")?e._prevPage():n.hasClass(c+"-next")&&e._nextPage()}),e.on("itemselected",function(t){t.item&&e.setInternal("year",t.item.value)})},_prevPage:function(){var e=this,t=e.get("start"),n=e.get("yearCount");e.set("start",t-n)},_nextPage:function(){var e=this,t=e.get("start"),n=e.get("yearCount");e.set("start",t+n)},_uiSetStart:function(){var e=this;e._setYearsContent()},_uiSetYear:function(e){var t=this,n=t.findItemByField("value",e);n?t.setSelectedByField(e):t.set("start",e)},_setYearsContent:function(){var e=this,t=e.get("year"),n=e.get("start"),r=e.get("yearCount"),i=[];for(var s=n;s<n+r;s++){var o=s.toString();i.push({text:o,value:s})}e.set("items",i),e.setSelectedByField(t)}},{ATTRS:{items:{view:!0,value:[]},elCls:{view:!0,value:"x-monthpicker-years"},itemCls:{value:p},year:{},start:{value:(new Date).getFullYear()},yearCount:{value:10},itemTpl:{view:!0,value:'<li class="'+p+" "+l+'"><a href="#" hidefocus="on">{text}</a></li>'},tpl:{view:!0,value:'<div class="'+c+'">'+'<span class="'+c+'-prev x-icon x-icon-normal x-icon-small"><span class="icon icon-caret icon-caret-left"></span></span>'+'<span class="'+c+'-next x-icon x-icon-normal x-icon-small"><span class="icon icon-caret icon-caret-right"></span></span>'+"</div>"+"<ul></ul>"}}},{xclass:"calendar-year-panel"}),y=r.extend({initializer:function(){var e=this,t=e.get("children"),n=new m,r=new g,i=e._createFooter();t.push(n),t.push(r),t.push(i),e.set("yearPanel",r),e.set("monthPanel",n)},bindUI:function(){var e=this;e.get("monthPanel").on("itemselected",function(t){t.item&&e.setInternal("month",t.item.value)}).on("monthdblclick",function(){e._successCall()}),e.get("yearPanel").on("itemselected",function(t){t.item&&e.setInternal("year",t.item.value)}).on("yeardblclick",function(){e._successCall()})},_successCall:function(){var e=this,t=e.get("success");t&&t.call(e)},_createFooter:function(){var e=this;return new s.Bar({elCls:o+"clear x-monthpicker-footer",children:[{xclass:"bar-item-button",text:"\u786e\u5b9a",btnCls:"button button-small button-primary",handler:function(){e._successCall()}},{xclass:"bar-item-button",text:"\u53d6\u6d88",btnCls:"button button-small last",handler:function(){var t=e.get("cancel");t&&t.call(e)}}]})},_uiSetYear:function(e){this.get("yearPanel").set("year",e)},_uiSetMonth:function(e){this.get("monthPanel").setSelectedByField(e)}},{ATTRS:{footer:{},align:{value:{}},year:{},success:{value:function(){}},cancel:{value:function(){}},width:{value:180},month:{},yearPanel:{},monthPanel:{}}},{xclass:"monthpicker"});return y}),define("bui/calendar/header",["bui/common"],function(e){var t=e("bui/common"),n=t.prefix,r=t.Component,i="year-text",s="month-text",o="x-datepicker-arrow",u="x-datepicker-prev",a="x-datepicker-next",f=r.Controller.extend({bindUI:function(){var e=this,t=e.get("el");t.delegate("."+o,"click",function(t){t.preventDefault();var n=$(t.currentTarget);n.hasClass(a)?e.nextMonth():n.hasClass(u)&&e.prevMonth()}),t.delegate(".x-datepicker-month","click",function(){e.fire("headerclick")})},setMonth:function(e,t){var n=this,r=n.get("year"),i=n.get("month");if(e!==r||t!==i)n.set("year",e),n.set("month",t),n.fire("monthchange",{year:e,month:t})},nextMonth:function(){var e=this,t=new Date(e.get("year"),e.get("month")+1);e.setMonth(t.getFullYear(),t.getMonth())},prevMonth:function(){var e=this,t=new Date(e.get("year"),e.get("month")-1);e.setMonth(t.getFullYear(),t.getMonth())},_uiSetYear:function(e){var t=this;t.get("el").find("."+i).text(e)},_uiSetMonth:function(e){var t=this;t.get("el").find("."+s).text(e+1)}},{ATTRS:{year:{sync:!1},month:{sync:!1,setter:function(e){this.set("monthText",e+1)}},monthText:{},tpl:{view:!0,value:'<div class="'+o+" "+u+'"><span class="icon icon-white icon-caret  icon-caret-left"></span></div>'+'<div class="x-datepicker-month">'+'<div class="month-text-container">'+'<span><span class="year-text">{year}</span>\u5e74 <span class="month-text">{monthText}</span>\u6708</span>'+'<span class="'+n+"caret "+n+'caret-down"></span>'+"</div>"+"</div>"+'<div class="'+o+" "+a+'"><span class="icon icon-white icon-caret  icon-caret-right"></span></div>'},elCls:{view:!0,value:"x-datepicker-header"},events:{value:{monthchange:!0}}}},{xclass:"calendar-header"});return f}),define("bui/calendar/panel",["bui/common"],function(e){var t=e("bui/common"),n=t.Component,r=t.Date,i="x-datepicker-date",s="x-datepicker-today",o="x-datepicker-disabled",u="x-datepicker-active",a="data-date",f="isoDate",l="x-datepicker-selected",c=6,h={deactive:"prevday",active:"active",disabled:"disabled"},p=["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"],d=n.View.extend({renderUI:function(){this.updatePanel()},updatePanel:function(){var e=this,t=e.get("el"),n=t.find("tbody"),r=e._getPanelInnerTpl();n.empty(),$(r).appendTo(n)},_getPanelInnerTpl:function(){var e=this,t=e._getFirstDate(),n=[];for(var i=0;i<c;i++){var s=r.addWeek(i,t);n.push(e._getWeekTpl(s))}return n.join("")},_getWeekTpl:function(e){var n=this,i=n.get("weekTpl"),s=[];for(var o=0;o<p.length;o++){var u=r.addDay(o,e);s.push(n._getDayTpl(u))}return t.substitute(i,{daysTpl:s.join("")})},_getDayTpl:function(e){var n=this,i=n.get("dayTpl"),o=e.getDay(),u=n._isToday(e)?s:"",a=p[o],l=e.getDate(),c=n._isInRange(e)?n._isCurrentMonth(e)?h.active:h.deactive:h.disabled;return t.substitute(i,{dayOfWeek:a,dateType:c,dateNumber:l,todayCls:u,date:r.format(e,f)})},_getFirstDate:function(e,t){var n=this,i=n._getMonthFirstDate(e,t),s=i.getDay();return r.addDay(s*-1,i)},_getMonthFirstDate:function(e,t){var n=this,e=e||n.get("year"),t=t||n.get("month");return new Date(e,t)},_isCurrentMonth:function(e){return e.getMonth()===this.get("month")},_isToday:function(e){var t=new Date;return t.getFullYear()===e.getFullYear()&&t.getMonth()===e.getMonth()&&t.getDate()===e.getDate()},_isInRange:function(e){var t=this,n=t.get("maxDate"),r=t.get("minDate");return r&&e<r?!1:n&&e>n?!1:!0},_clearSelectedDate:function(){var e=this;e.get("el").find("."+l).removeClass(l)},_findDateElement:function(e){var t=this,n=r.format(e,f),s=t.get("el").find("."+i),o=null;return n&&s.each(function(e,t){if($(t).attr("title")===n)return o=$(t),!1}),o},_setSelectedDate:function(e){var t=this,n=t._findDateElement(e);t._clearSelectedDate(),n&&n.addClass(l)}},{ATTRS:{}}),v=n.Controller.extend({initializer:function(){var e=this,t=new Date;e.get("year")||e.set("year",t.getFullYear()),e.get("month")||e.set("month",t.getMonth())},bindUI:function(){var e=this,t=e.get("el");t.delegate("."+i,"click",function(e){e.preventDefault()}),t.delegate("."+o,"mouseup",function(e){e.stopPropagation()})},performActionInternal:function(e){var t=this,n=$(e.target).closest("."+i);if(n){var s=n.attr("title");s&&(s=r.parse(s),t.get("view")._isInRange(s)&&t.set("selected",s))}},setMonth:function(e,t){var n=this,r=n.get("year"),i=n.get("month");if(e!==r||t!==i)n.set("year",e),n.set("month",t),n.get("view").updatePanel()},_uiSetSelected:function(e,t){var n=this;t&&t.prevVal&&r.isDateEquals(e,t.prevVal)||(n.setMonth(e.getFullYear(),e.getMonth()),n.get("view")._setSelectedDate(e),n.fire("selectedchange",{date:e}))},_uiSetMaxDate:function(e){e&&this.get("view").updatePanel()},_uiSetMinDate:function(e){e&&this.get("view").updatePanel()}},{ATTRS:{year:{view:!0},month:{view:!0},selected:{},focusable:{value:!0},dayTpl:{view:!0,value:'<td class="x-datepicker-date x-datepicker-{dateType} {todayCls} day-{dayOfWeek}" title="{date}"><a href="#" hidefocus="on" tabindex="1"><em><span>{dateNumber}</span></em></a></td>'},events:{value:{click:!1,selectedchange:!0}},maxDate:{view:!0,setter:function(e){if(e)return t.isString(e)?r.parse(e):e}},minDate:{view:!0,setter:function(e){if(e)return t.isString(e)?r.parse(e):e}},weekTpl:{view:!0,value:"<tr>{daysTpl}</tr>"},tpl:{view:!0,value:'<table class="x-datepicker-inner" cellspacing="0"><thead><tr><th  title="Sunday"><span>\u65e5</span></th><th  title="Monday"><span>\u4e00</span></th><th  title="Tuesday"><span>\u4e8c</span></th><th  title="Wednesday"><span>\u4e09</span></th><th  title="Thursday"><span>\u56db</span></th><th  title="Friday"><span>\u4e94</span></th><th  title="Saturday"><span>\u516d</span></th></tr></thead><tbody class="x-datepicker-body"></tbody></table>'},xview:{value:d}}},{xclass:"calendar-panel",priority:0});return v}),define("bui/calendar/calendar",["bui/picker","bui/calendar/monthpicker","bui/calendar/header","bui/calendar/panel","bui/toolbar"],function(e){function v(){var e=new Date;return new Date(e.getFullYear(),e.getMonth(),e.getDate())}function m(e){return e<10?"0"+e:e.toString()}function g(e){var t=[];for(var n=0;n<e;n++)t.push({text:m(n),value:m(n)});return t}function y(e,t){var n=e.get("el").find("."+t);return parseInt(n.val(),10)}function b(e,n,r){var i=e.get("el").find("."+n);t.isNumber(r)&&(r=m(r)),i.val(r)}var t=e("bui/common"),n=t.prefix,r="x-datepicker-time",i="x-datepicker-hour",s="x-datepicker-minute",o="x-datepicker-second",u="x-timepicker",a=e("bui/picker").ListPicker,f=e("bui/calendar/monthpicker"),l=e("bui/calendar/header"),c=e("bui/calendar/panel"),h=e("bui/toolbar"),p=t.Component,d=t.Date,w=p.Controller.extend({initializer:function(){var e=this,t=e.get("children"),n=new l,r=new c,i=e.get("footer")||e._createFooter();t.push(n),t.push(r),t.push(i),e.set("header",n),e.set("panel",r),e.set("footer",i)},renderUI:function(){var e=this,t=e.get("children");if(e.get("showTime")){var n=e.get("timepicker")||e._initTimePicker();t.push(n),e.set("timepicker",n)}},bindUI:function(){var e=this,t=e.get("header"),n=e.get("panel");n.on("selectedchange",function(t){var n=t.date;d.isDateEquals(n,e.get("selectedDate"))||e.set("selectedDate",n)}),e.get("showTime")?e._initTimePickerEvent():n.on("click",function(){e.fire("accept")}),t.on("monthchange",function(t){e._setYearMonth(t.year,t.month)}),t.on("headerclick",function(){var n=e.get("monthpicker")||e._createMonthPicker();n.set("year",t.get("year")),n.set("month",t.get("month")),n.show()})},_initTimePicker:function(){var e=this,t=e.get("lockTime"),n={hour:i,minute:s,second:o};if(t)for(var f in t){var l=n[f.toLowerCase()];e.set(f,t[f]),t.editable||e.get("el").find("."+l).attr("disabled","")}var c=new a({elCls:u,children:[{itemTpl:'<li><a href="#">{text}</a></li>'}],autoAlign:!1,align:{node:e.get("el"),points:["bl","bl"],offset:[0,-30]},trigger:e.get("el").find("."+r)});return c.render(),e._initTimePickerEvent(c),c},_initTimePickerEvent:function(e){var t=this,e=t.get("timepicker");if(!e)return;e.get("el").delegate("a","click",function(e){e.preventDefault()}),e.on("triggerchange",function(t){var n=t.curTrigger;n.hasClass(i)?e.get("list").set("items",g(24)):e.get("list").set("items",g(60))}),e.on("selectedchange",function(e){var n=e.curTrigger,r=e.value;n.hasClass(i)?t.setInternal("hour",r):n.hasClass(s)?t.setInternal("minute",r):t.setInternal("second",r)})},_setYearMonth:function(e,t){var n=this,r=n.get("selectedDate"),i=r.getDate();if(e!==r.getFullYear()||t!==r.getMonth()){var s=new Date(e,t,i);s.getMonth()!=t&&(s=d.addDay(-1,new Date(e,t+1))),n.set("selectedDate",s)}},_createMonthPicker:function(){var e=this,t;return t=new f({render:e.get("el"),effect:{effect:"slide",duration:300},visibleMode:"display",success:function(){var t=this;e._setYearMonth(t.get("year"),t.get("month")),t.hide()},cancel:function(){this.hide()}}),e.set("monthpicker",t),e.get("children").push(t),t},_createFooter:function(){var e=this,t=this.get("showTime"),r=[];return t?(r.push({content:e.get("timeTpl")}),r.push({xclass:"bar-item-button",text:"\u786e\u5b9a",btnCls:"button button-small button-primary",listeners:{click:function(){e.fire("accept")}}})):(r.push({xclass:"bar-item-button",text:"\u4eca\u5929",btnCls:"button button-small",id:"todayBtn",listeners:{click:function(){var t=v();e.set("selectedDate",t),e.fire("accept")}}}),r.push({xclass:"bar-item-button",text:"\u6e05\u9664",btnCls:"button button-small",id:"clsBtn",listeners:{click:function(){e.fire("clear")}}})),new h.Bar({elCls:n+"calendar-footer",children:r})},_updateTodayBtnAble:function(){var e=this;if(!e.get("showTime")){var t=e.get("footer"),n=e.get("panel").get("view"),r=v(),i=t.getItem("todayBtn");n._isInRange(r)?i.enable():i.disable()}},_uiSetSelectedDate:function(e){var t=this,n=e.getFullYear(),r=e.getMonth();t.get("header").setMonth(n,r),t.get("panel").set("selected",e),t.fire("datechange",{date:e})},_uiSetHour:function(e){b(this,i,e)},_uiSetMinute:function(e){b(this,s,e)},_uiSetSecond:function(e){b(this,o,e)},_uiSetMaxDate:function(e){var t=this;t.get("panel").set("maxDate",e),t._updateTodayBtnAble()},_uiSetMinDate:function(e){var t=this;t.get("panel").set("minDate",e),t._updateTodayBtnAble()}},{ATTRS:{header:{},panel:{},maxDate:{},minDate:{},monthPicker:{},timepicker:{},width:{value:180},events:{value:{click:!1,accept:!1,datechange:!1,monthchange:!1}},showTime:{value:!1},lockTime:{},timeTpl:{value:'<input type="text" readonly class="'+r+" "+i+'" />:<input type="text" readonly class="'+r+" "+s+'" />:<input type="text" readonly class="'+r+" "+o+'" />'},selectedDate:{value:v()},hour:{value:(new Date).getHours()},minute:{value:(new Date).getMinutes()},second:{value:0}}},{xclass:"calendar",priority:0});return w}),define("bui/calendar/datepicker",["bui/common","bui/picker","bui/calendar/calendar"],function(e){var t=e("bui/common"),n=e("bui/picker").Picker,r=e("bui/calendar/calendar"),i=t.Date,s=n.extend({initializer:function(){},createControl:function(){var e=this,t=e.get("children"),n=new r({render:e.get("el"),showTime:e.get("showTime"),lockTime:e.get("lockTime"),minDate:e.get("minDate"),maxDate:e.get("maxDate"),autoRender:!0});return n.on("clear",function(){var t=e.get("curTrigger");t.val("")}),e.get("dateMask")||(e.get("showTime")?e.set("dateMask","yyyy-mm-dd HH:MM:ss"):e.set("dateMask","yyyy-mm-dd")),t.push(n),e.set("calendar",n),n},setSelectedValue:function(e){if(!this.get("calendar"))return;var t=this,n=this.get("calendar"),r=i.parse(e,t.get("dateMask"));r=r||t.get("selectedDate"),n.set("selectedDate",i.getDate(r));if(t.get("showTime")){var s=this.get("lockTime"),o=r.getHours(),u=r.getMinutes(),a=r.getSeconds();s&&(!e||!s.editable)&&(o=s&&s.hour?s.hour:o,u=s&&s.minute?s.minute:o,a=s&&s.second?s.second:o),n.set("hour",o),n.set("minute",u),n.set("second",a)}},getSelectedValue:function(){if(!this.get("calendar"))return null;var e=this,t=e.get("calendar"),n=i.getDate(t.get("selectedDate"));return e.get("showTime")&&(n=i.addHour(t.get("hour"),n),n=i.addMinute(t.get("minute"),n),n=i.addSecond(t.get("second"),n)),n},getSelectedText:function(){return this.get("calendar")?i.format(this.getSelectedValue(),this._getFormatType()):""},_getFormatType:function(){return this.get("dateMask")},_uiSetMaxDate:function(e){if(!this.get("calendar"))return null;var t=this;t.get("calendar").set("maxDate",e)},_uiSetMinDate:function(e){if(!this.get("calendar"))return null;var t=this;t.get("calendar").set("minDate",e)}},{ATTRS:{showTime:{value:!1},lockTime:{},maxDate:{},minDate:{},dateMask:{},changeEvent:{value:"accept"},hideEvent:{value:"accept clear"},calendar:{},selectedDate:{value:new Date((new Date).setSeconds(0))}}},{xclass:"datepicker",priority:0});return s});
