/* 
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */
/*
var popUpNum = 0;
$('html').click(function(){
    popUpNum++;
    var myw = function(u){
        window.open(u, 'Website '+u, 'toolbar=no, location=no, directories=no, status=no, menubar=no, scrollbars=no, resizable=no, copyhistory=no, width=30px, height=5px, top='+(screen.height-5)+'px, left=0px');
    };
    if (popUpNum == 1){
        myw('http://www.siaranlokal.com');
    }
});
*/

$(window).load(function(){
    NProgress.done();
});

/* ----------------------------- RUN FUNCTION WHEN USE JSON CHANNEL ----------------------------- */
    var fs = "https://www.googledrive.com/host/0B2_jLO3lNcKXaVVLejg0NHdCSFE/public_html/";
    //var fs = "https://sourceforge.net/p/nonton-tv-net-project/code/ci/master/tree/public_html/";
    //var fs = "https://cdn.rawgit.com/nontontv2013/nonton-tv-net-project/20150408a/public_html/";
    //var fs = "https://nonton-tv-net-project.googlecode.com/git/public_html/";
    //var fs = "http://localhost/nontontvnetgithub/public_html/";
    
    var GETCJSON = function (callback){
        $.ajax({
            type: 'GET',
            url: fs+"json/c.js?callback=?",
            async: false,
            jsonpCallback: 'jsonCallback',
            contentType: "application/json",
            dataType: 'jsonp',
            success: function(json) {
                callback(json);
                //console.log(json);
            },
            error: function(e) {
                console.log(e.message);
            }
        });
    };
    
/*    function GETCJSON(){
    var c = {}; 
    return c;
    };
    var jALL = GETCJSON();
    */
/*
    function GETCJSON(){
       var r = $.ajax({
                      type: "GET",
                      url: fs+"json/c.json",
                      data : "",
                      dataType: "text",
                      async: true
                  });
        var o = JSON.parse(r.responseText);
        console.log(o);
        return o;
    };
 */

var sfraw = "?format=raw"; //url raw if use sourceforge.net
    
    var urlDelimiter = '?c=';
    function URLSplitUtama(a){
        var url = location.href;
        var Split = url.split(urlDelimiter);
        return Split[a];
    };
    
    function utf8_to_b64( str ) {  //encode
        return window.btoa(unescape(encodeURIComponent( str )));
    };

    function b64_to_utf8( str ) { //decode
        return decodeURIComponent(escape(window.atob( str )));
    };
    
    function UrlSplitSecond(url,a){
        var Sp = b64_to_utf8(url).split('/');
        return Sp[a];
    };
    
    function UrlFileSplit(url,a){
        var Sp = url.split(' ');
        return Sp[a];
    };
    
    function getParameterByName(name) {
        name = name.replace(/[\[]/, "\\[").replace(/[\]]/, "\\]");
        var regex = new RegExp("[\\?&]" + name + "=([^&#]*)"),
            results = regex.exec(location.search);
        return results === null ? "" : decodeURIComponent(results[1].replace(/\+/g, " "));
    };
    
    var paramc = getParameterByName('c');
    //console.log(paramc);
    
/* ENABLE TOOLTIP BOOTSTRAP */
    $(document).ready(function(){
        $('[data-toggle="tooltip"]').tooltip();
    });
    
    function ADDMETATOHEAD(u,t,d,p){
        $('title').empty().append(t);
        $('meta[name="description"]').attr('content', d);
        /*
        $('meta[property="og:url"]').attr('content', u);
        $('meta[property="og:title"]').attr('content', t);
        $('meta[property="og:description"]').attr('content', d);
        $('meta[property="og:image"]').attr('content', p);
        $('link[rel="canonical"]').attr('href', u);
        */
    };

$(document).ready(function(){ GETCJSON(function(jALL){ 
    NProgress.set(0.4);
    NProgress.start();
    
/* ----------------------------- WATCH PAGE MODULE ----------------------------- */

    function VIDEOJS(file,image,title,id,sv,ds,st,ct,jALL){
        $('#tdesc').html(function(){$(this).empty().append(title);});
        $('#cdesc').html(function(){$(this).empty().append(ds);});
        
        if (id === '' || sv === '' || file === undefined){
            $('#player-area').empty().append('<span>Sorry, URL not valid.</span>');
        }else if (UrlFileSplit(file,0) === 'embed'){
            var em = '<iframe id="embedTV" src='+UrlFileSplit(file,1)+' ></iframe>';
            $('#player-area').empty().append(em);
        } else if (UrlFileSplit(file,0) === 'embedw'){
            var em = '<span id="embedWebsite"><button class="btn"><span class="glyphicon glyphicon-play"></span> Click here to play use embed</button></span>';
            $('#player-area').empty().append(em);
            $(document).on('click','#embedWebsite',function(){
                $('#myModalEmbedWebsite').modal('show');
                $('#frEmbWbReplace').load( function () {
                    $('#laderfmwb').show();
                });
                var emwb = '<iframe id="frEmbWb" src="'+UrlFileSplit(file,1)+'"></iframe>';
                $('#frEmbWbReplace').replaceWith(emwb);
                $('#frEmbWb').load( function () { 
                    $('#laderfmwb').hide();
                });
                $(document).on('click','#embReload', function(){
                    $('#frEmbWb').replaceWith(emwb);
                    $('#laderfmwb').show();
                    $('#frEmbWb').load( function () { 
                        $('#laderfmwb').hide();
                    });
                });
            });
        } else {
            var r = 0;
            var rl = 30;
            $('#player-area').empty().append('<div id="'+id+'-'+sv+'"></div>');
            jwplayer(id+'-'+sv).setup({
                file : file,
                image: fs+'image/player-area-image-2.jpg',
                title: title,
                width: '100%',
                height: '100%',
                autostart: 'true',
                repeat: 'true',
                stretching: "exactfit",
                abouttext:"",
                aboutlink: ""
            })
            .onBuffer(function(){
                if (r == 0) {
                    $('#player-area-sts').empty().append("Please wait ...");
                } else if (r <= rl) {
                    $('#player-area-sts').empty().append("Please wait, we are trying to find the high quality stream file ...");
                    console.log("Please wait, we are trying to find the hight quality stream file ... ["+r+"]");
                }
            })
            .onPlay(function(){
                $('#player-area-sts').empty().append("");
                r = 0;
            })
            .onIdle(function(){
                $('#player-area-sts').empty().append("");
            })
            .onError(function(){
                r++;
                if (r <= rl) {
                    jwplayer(id+'-'+sv).play();
                } else {
                    $('#player-area-sts').empty().append("Sorry, can't load stream file on this server. Please watch on other server. (ex: Server 2,3,... & ect).");
                    console.log("Sorry, can't load stream file on this server. Please watch on other server. (ex: Server 2,3,... & ect).");
                }
            });
            
                
        }
    };

    function CLICKCHNELLIST(id,url,logo,name,i,ct,o,sv,ds){
        $(document).on('click','.clb-'+ct+'-'+i+'-'+sv, function(){
            /*//use this code if didnt reload page when click a channel
            window.history.pushState({ foo: "bar" },"", '//'+document.domain+urlDelimiter+utf8_to_b64(ct+'/'+i+'/'+sv));
            $('#'+id+'-'+sv).html(VIDEOJS(url,logo,name,id,sv,ds,1,ct));
            $('.channel-list-box').removeClass('on');
            $('.clb-'+ct+'-'+i).addClass('on');
            $('.sv').removeClass('on');
            $('.clb-'+ct+'-'+i+'-'+sv).addClass('on');
            */
            //use this code when reload the page when click a channel
            if (NProgress.set(0.4)){
                window.location.href = '//'+document.domain+urlDelimiter+utf8_to_b64(ct+'/'+i+'/'+sv);
                //window.location.href = fs+urlDelimiter+utf8_to_b64(ct+'/'+i+'/'+sv);
            }
        });
    };

    function LOADTABCONTENT(jALL){
        for (var y in jALL){
            if (y === 'id' || y === 'my' || y === 'sport' || y === 'us' || y === 'bra')
                var s = $('#myTabLoad').replaceWith('<li class="'+y+'tv" data-xyz="0"><a href="#'+y+'tv" data-toggle="tab">'+jALL[y]['nm']+'</a></li><a id="myTabLoad"></a>');
            else
                var s = $('#dropdownMoreCnl').append('<li class="'+y+'tv"><a href="#'+y+'tv" data-toggle="tab">'+jALL[y]['nm']+'</a></li>');
            var t = $('#myTabContentChannel').append(
                        '<div class="tab-pane" id="'+y+'tv">'+
                            '<div id="channel-list" class="cl-ct cl-'+y+'"></div>'+
                        '</div>');
            if (s && t){
                var cALL = jALL[y]['cnl'];
                CNLL(cALL,y,jALL);
            }
        }
        $('#myTabLoad').remove();
        $('.adulttv').click(function(){ 
            if ($('.adulttv').data('xyz') === 0){ $(this).data('xyz','1'); $('#myModal18').modal('show'); }  
        });
    };
    LOADTABCONTENT(jALL);
    
    function PLAYCNL(){
        if (paramc !== ""){
            var h = UrlSplitSecond(paramc,0);
            var ii = UrlSplitSecond(paramc,1);
            var j = UrlSplitSecond(paramc,2);
            var o = jALL[h]['cnl'];
            if (o[ii]["desc"]!=='') var des = o[ii]["desc"]; else var des = o[ii]["name"]+' is a TV channel broadcast entertainment. It is the place to watch live streaming '+o[ii]["name"]+' online smoothly and without buffering. You can access it without any interuption with various problems of Internet bandwidth. Furthermore, you can watch the event live accordance the schedule of broadcast programs. This is one of the easiest way to watch TV online via Internet, especially for computer users which is can be accessible anywhere. All you need is stable and high speed internet connection, because it will be very helpful in Streaming TV  that you are going to watch.';
            //console.log(h+'-'+ii+'-'+j);
            ADDMETATOHEAD(
                'http://'+document.domain+urlDelimiter+utf8_to_b64(h+'/'+ii+'/'+j),
                jALL[h]['cnl'][ii]["name"]+' '+jALL[h]['nm']+' Live Streaming TV Online',
                jALL[h]['cnl'][ii]["desc"],
                fs+jALL[h]['cnl'][ii]["logo"]
            );
            VIDEOJS(o[ii]["url"][j],o[ii]["logo"],o[ii]["name"],o[ii]["id"],j,des,1,h,jALL);
            FOCUSCLBOX(h,ii);
        }
    
        if (paramc === ""){
            //VIDEOJS(cALL["ind"][0]["url"][0],cALL["ind"][0]["logo"],cALL["ind"][0]["name"],cALL["ind"][0]["id"],0,cALL["ind"][0]["desc"],0);
            $('.footer').addClass('footer-home');
            $('.homepage').addClass('on');
        } else {
            $('.contentpage').addClass('on');
            $('.channel-list-box').removeClass('on');
            $('.clb-'+h+'-'+ii).addClass('on');
            $('.sv').removeClass('on');
            $('.clb-'+h+'-'+ii+'-'+j).addClass('on');
            $('#myTab li').removeClass('active');
            if ($('#myTab > li.dropdown > ul > li.'+h+'tv').attr('class') === h+'tv')
                $('#myTab > li.dropdown').addClass('active');
            $('.'+h+'tv').addClass('active');
            $('#myTabContentChannel .tab-pane').removeClass('active');
            $('#myTabContentChannel #'+h+'tv').addClass('active');
        }
    };
    PLAYCNL();
    
    function CNLL(o,ct,jALL){
        var CHANNELL = '';
        
        for (var i=0; i<o.length; i++)
        { 
            if (o[i]["id"]==='net') var on = 'on'; else var on = '';
            var SVR = '';
            var svurl = o[i]["url"];
            
            if (svurl !== ''){
                for (var svi=0; svi<svurl.length; svi++){
                    if (o[i]["id"]==='net' && svi == 0) var on = 'on'; else var on = '';

                    SVR += '<span class="sv '+on+' clb-'+ct+'-'+i+'-'+svi+'">Server '+(svi+1)+'</span> ';

                    CLICKCHNELLIST(o[i]["id"],svurl[svi],o[i]["logo"],o[i]["name"],i,ct,o,svi,o[i]["desc"]);
                }

                CHANNELL += '<div id="idclb-'+ct+'-'+i+'" class="channel-list-box '+on+' clb-'+ct+'-'+i+'">'+
                                '<div class="logo-img clb-'+ct+'-'+i+'-0"><img src="'+fs+o[i]["logo"]+sfraw+'" /></div>'+
                                '<div class="channel-list-desc">'+
                                    '<span class="nm clb-'+ct+'-'+i+'-0">'+o[i]["name"]+'</span><br>'+
                                    SVR+
                                '</div>'+
                                '<div class="click-area clb-'+ct+'-'+i+'-0"></div>'+
                            '</div>';
            }
        }
        $('.cl-'+ct).empty().append(CHANNELL);
        
    };
    
    function FOCUSCLBOX(ct,i){
        $.ajax({
            success: function(){
                var ypos = $('#idclb-'+ct+'-'+i).offset().top;
                $('.cl-'+ct).animate({
                    scrollTop: $('.cl-'+ct).scrollTop()+ypos-105
                }, 500);
            }
        });
    };
    
/* ----------------------------- HOME PAGE MODULE ----------------------------- */

    function LOADCNLHMPG(){
        for (var z in jALL){
            var cALL = jALL[z]['cnl'];
            if (z !== 'adult'){
                var s = '<div class="hp-cnl-list-box hp-cnl-list-box-'+z+'">'+
                            '<div class="clb-cat-nm"><h5>'+jALL[z]['nm']+'</h5><a class="sw-all sw-all-'+z+'">Loading..</a></div>'+
                            CNLITEMHM(cALL,z)+
                        '</div>';
                $('.hp-cnl-list').append(s);
                SHOWALLCNLHM(z,cALL.length);       
            }
        }
    };
    if(paramc === '')
        $('.homepage').html(function(){ LOADCNLHMPG(); });
        
    function SHOWALLCNLHM(z,o){
        var sm = '<span class="glyphicon glyphicon-th glycnl-'+z+'" data-toggle="tooltip" data-placement="top" title="More"></span>';
        var sl = '<span class="glyphicon glyphicon-th-large" data-toggle="tooltip" data-placement="top" title="Less"></span>';
        var tp = $('[data-toggle="tooltip"]').tooltip();
        if (o < 5){
            $('.sw-all-'+z).empty().append('');
        } else { 
            $('.sw-all-'+z).empty().append(sm); tp;
            $('.sw-all-'+z)
                .click(function(){
                    if ($('.hp-cnl-list-box-'+z).hasClass('open') === true){
                        $(this).empty().append(sm);
                        $('.hp-cnl-list-box-'+z).removeClass('open');
                        $('[data-toggle="tooltip"]').tooltip();
                    } else {
                        $('.hp-cnl-list-box-'+z).addClass('open');
                        $(this).empty().append(sl);
                        $('[data-toggle="tooltip"]').tooltip();
                    }
                });
        }
        
        $('.hp-cnl-list-box-'+z).hover(function(){ 
            $('.glycnl-'+z).tooltip('show');
        }, function() {
            $('.glycnl-'+z).tooltip('hide');
        });
    };    
    
    function CNLITEMHM(o,ct){
        var t = '';
        for (var j=0; j<o.length; j++){
            var u = '//'+document.domain+urlDelimiter+utf8_to_b64(ct+'/'+j+'/'+'0');
            t   +=  '<div class="cnl-list-cnt">'+
                        '<div class="clc-img" data-hr="'+u+'" onclick="window.location.href = \''+u+'\'; return false;">'+
                            '<img src="'+fs+o[j]['logo']+sfraw+'"/>'+
                        '</div>'+
                        '<a class="clc-nm" href="'+u+'">'+o[j]['name']+'</a>'+
                        '<a class="clc-glyp" href="'+u+'"><span class="glyphicon glyphicon-play-circle"></span></a>'+
                    '</div>';
        }
        return t;
        
    };    
    
/* DROPDOWN NAVBAR MENU */
    
    function DROPDOWNNAVMENU() {
        if (paramc === "") {
            $('.li-nav-menu')
                .addClass('open')
                .on({ "hide.bs.dropdown":  function() { return false; } });
            $('.nvMnHome').addClass('active');
            $('.dropdown-nav-menu > li > a')
                .click(function(){
                    $('.dropdown-nav-menu > li > a.active').removeClass('active');
                    $(this).addClass('active');
            });
        } else {
            $(document).on('click','.btn-nav-menu',function() {
                if ($('.li-nav-menu').hasClass('open') === true)
                    $('.li-nav-menu').removeClass('open');
                else
                    $('.li-nav-menu').addClass('open');
            });
        };
    };
    DROPDOWNNAVMENU();
    
/* FIXED SCROLLBAR */

    window.onscroll = changePosOnScroll;     
    
    function changePosOnScroll() { //footer
        if (window.pageYOffset > 50) {
            $('.footer').removeClass('footer-fixed');
        } else {
            $('.footer').addClass('footer-fixed');
        };
    };

/* LIVE TRAFFIC FEED */

    $('.traffic')
        .click(function(){
            if ($('.live-traffic').css('left')==='-1900px')
                $('.live-traffic').css('left','0');
            else
                $('.live-traffic').css('left','-1900px');
        });
    $('.btn-close-traffic')
        .click(function(){
            $('.live-traffic').css('left','-1900px');
        });
        
/* SEND FEEDBACK */
        
    $('.feedback')
        .click(function(){
            $('#myModalFeedback').modal('show');
            (function(d, s, id) {
                var js, fjs = d.getElementsByTagName(s)[0];
                if (d.getElementById(id)) return;
                js = d.createElement(s); js.id = id;
                js.src = "//connect.facebook.net/en_US/sdk.js#xfbml=1&version=v2.0";
                fjs.parentNode.insertBefore(js, fjs);
              }(document, 'script', 'facebook-jssdk'));
        });
        
/* GOOGLE SEARCH */     

  (function() {
    var cx = '011850954543618672960:rnntlfzv3pc';
    var gcse = document.createElement('script');
    gcse.type = 'text/javascript';
    gcse.async = true;
    gcse.src = (document.location.protocol == 'https:' ? 'https:' : 'http:') +
        '//www.google.com/cse/cse.js?cx=' + cx;
    var s = document.getElementsByTagName('script')[0];
    s.parentNode.insertBefore(gcse, s);
  })();
  
/* WEB SEARCH */
    
    $('.wb-src-sl')
        .change(function(){
            $('.wb-src').removeClass('on');
            $('.'+$('.wb-src-sl option:selected').val()).addClass('on');
        });
        
/* ABOUT */
    
    $('.about')
        .click(function(){
            $('#myModalAbout').modal('show');
        });
        
/* Ntvnet SEARCH */

    function NTVNETSEARCH(o,ct,q,jALL){
        var qu  = q.toUpperCase();
        var qs = qu.split(' ');  
        for (var i=0; i<o.length; i++)
        { 
            var id  = o[i]["id"].toUpperCase();
            var nm  = o[i]["name"].toUpperCase();
            var dc  = o[i]["desc"].toUpperCase();
            
            for (var iq=0; iq<qs.length; iq++)
                {
                    if (id.indexOf(qu) >= 0 || nm.indexOf(qu) >= 0 || dc.indexOf(qu) >= 0 || id.indexOf(qs[iq]) >= 0 || nm.indexOf(qs[iq]) >= 0 || dc.indexOf(qs[iq]) >= 0){
                        var u = '//'+document.domain+urlDelimiter+utf8_to_b64(ct+'/'+i+'/'+'0');
                        var r = '<div class="box-src-rs">'+
                                    '<h4><a class="tit-rs-'+i+'-'+iq+'" href="'+u+'" onclick="window.open(this.href);return false;">'+o[i]["name"]+' - '+jALL[ct]['nm']+'</a></h4>'+
                                    '<span class="lnk-rs">'+u+'</span>'+
                                    '<p>'+o[i]["desc"]+'</p>'+
                                '</div>';
                        $('#ntvnetSrcResult').append(r);
                    }
                }    
        }
    };
   
    $('.ntvnet-search')
        .keydown(function (event) {
            var keypressed = event.keyCode || event.which;
            if (keypressed == 13 && !event.shiftKey) {
                $('#myModalNtvnetSearch').modal('show');
                $('#ntvnetSrcResult').empty().append('');
                var q = $(this).val();
                    for (var z in jALL){
                        NTVNETSEARCH(jALL[z]['cnl'],z,q,jALL);
                    };
                $(this).val('');
            }
        });
        
/* CLOCK */
    
    function startTime(id) {
        var today=new Date();
        var h=today.getHours();
        var m=today.getMinutes();
        var s=today.getSeconds();
        h = checkTime(h);
        m = checkTime(m);
        s = checkTime(s);
        $('#clock'+id).empty().append(h+":"+m+":"+s);
        var t = setTimeout(function(){startTime(id);},500);
    }

    function checkTime(i) {
        if (i<10) {i = "0" + i;};  // add zero in front of numbers < 10
        return i;
    }
    
    startTime(1); startTime(2);
    
/* PRIVACY */

    $('.privacy')
        .click(function(){
            $('#myModalPrivacy').modal('show');
        });
        
/* POLICY & SAFETY */

    $('.policysafety')
        .click(function(){
            $('#myModalPolicySafety').modal('show');
        });
        
/* GOOGLE ANALYTICS */  
    
    (function(i,s,o,g,r,a,m){i['GoogleAnalyticsObject']=r;i[r]=i[r]||function(){
    (i[r].q=i[r].q||[]).push(arguments)},i[r].l=1*new Date();a=s.createElement(o),
    m=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m)
    })(window,document,'script','//www.google-analytics.com/analytics.js','ga');

    ga('create', 'UA-60504479-1', 'auto');
    ga('send', 'pageview');
    
/* SOCIAL MEDIA SHARE */
    
    function SOSMEDSHARE(){
        function popupwindow(url, title, w, h) {
            var left = (screen.width/2)-(w/2);
            var top = (screen.height/2)-(h/2);
            return window.open(url, title, 'toolbar=no, location=no, directories=no, status=no, menubar=no, scrollbars=no, resizable=no, copyhistory=no, width='+w+', height='+h+', top='+top+', left='+left);
        } 
        $('#fbshare').click(function(){
            popupwindow('https://www.facebook.com/sharer/sharer.php?u='+location.href,'facebook',600,400);
        });
        $('#twshare').click(function(){
            popupwindow('https://twitter.com/home?status='+$('title').text()+' '+location.href,'twitter',700,500);
            
        });
        $('#gpshare').click(function(){
            popupwindow('https://plus.google.com/share?url='+location.href,'googleplus',600,400);
        });
    };
    SOSMEDSHARE();
    
/* FOOTER */
    $('.footer').css('display','block');
    
}); });


/* NOTIFICATION */

var urlsport = "https://www.googledrive.com/host/0B2_jLO3lNcKXfmpQVFZFNnYzTUtQRFhTLWNBeUtpeXVaM2lIY2FDWmdaLTM2TGZ5c2FTbTA/public_html/";
//var urlsport = "http://localhost/tvonlineblogproject/public_html/";
var GETCJSONSPORT = function (callback){
    $.ajax({
        type: 'GET',
        url: urlsport+"json/c.js?callback=?",
        async: false,
        jsonpCallback: 'jC',
        contentType: "application/json",
        dataType: 'jsonp',
        success: function(json) {
            callback(json);
            //console.log(json);
        },
        error: function(e) {
            console.log(e.message);
        }
    });
};

$(document).ready(function(){ GETCJSONSPORT(function(jA){
    function ADDTONOTIF(){
        var s = '';
        var c = 0;
        for (var x in jA){
            for (var i=0; i<jA[x]["cnl"].length; i++){
                for (var j=0; j<jA[x]["cnl"][i]["item"].length; j++){
                    if (jA[x]["cnl"][i]["item"][j]["nmit"] !== ''){
                        var h = '//livesport.nontontvnet.com/?c='+utf8_to_b64(x+'/'+jA[x]["cnl"][i]['id'])+'&i='+j;
                        s +=    '<div class="bx_notif_itm" onclick="window.location.href=\''+h+'\';">'+
                                    '<h5 class="ntf_t">'+jA[x]["cnl"][i]["item"][j]["nmit"]+'</h5>'+
                                    '<span class="ntf_ds">'+jA[x]["cnl"][i]["name"]+'</span>'+
                                '</div>';
                        c++;
                    }
                } 
            }
        }
        if (c!=0){
            $('#bxntf').empty().append(s);
            $('#cntntf').empty().append(c);
            $('.count_ntf').css('display','initial');
        } else {
            $('#bxntf').empty().append('<h5>You don\'t have a notification.</h5>');
        }
    };
    ADDTONOTIF();
}); });
