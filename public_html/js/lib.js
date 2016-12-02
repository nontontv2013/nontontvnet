/* 
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */
$(document).ready(function(){
    
    $(document).on('click','#adver',function(){ $('#myModalAdv').modal('show'); });
    $(document).on('click','#btn-ads-footer',function(){ $('#myModalAdv').modal('show'); });
    
    var ADSPA = [
        {
            'id'    : '1',
            'cd'    : '<a href=""><embed src="https://nonton-tv-net-project.googlecode.com/git/public_html/image/iklan710x100copy.jpg"></a>',
            'exdt'  : '2012-02-9'
        }
    ];
    
    var ADSSB = [
        {
            'id'    : '1',
            'cd'    : '<a href=""><embed src="https://nonton-tv-net-project.googlecode.com/git/public_html/image/iklan200x200.jpg"></a>',
            'exdt'  : '2012-02-9'
        }
    ];
    
    function MODALADS(id,ct){
        $.ajax({
            success : function(){
                $('#adver-'+ct+'-'+id).click(function(){ $('#myModalAdv').modal('show'); });
            }
        });
    };
    
    Date.prototype.yyyymmdd = function() {                             
        var yyyy = this.getFullYear().toString();                                    
        var mm = (this.getMonth()+1).toString(); // getMonth() is zero-based         
        var dd  = this.getDate().toString();             

        return yyyy + '-' + (mm[1]?mm:"0"+mm[0]) + '-' + (dd[1]?dd:"0"+dd[0]);
    };
    
    function CalculateDate(DtA,DtB){
        var DtA_S = DtA.split('-');
        var DtB_S = DtB.split('-');
        var d = new Date();

        var DtA_L = d.setFullYear(DtA_S[0],DtA_S[1],DtA_S[2]);
        var DtB_L = d.setFullYear(DtB_S[0],DtB_S[1],DtB_S[2]);
        var Hsl = (DtA_L - DtB_L)/(60*60*24*1000);
        return Hsl;
    };
    
    function ADSL(o,ct){
        var ADVERTISE = '';
        
        for (var i=0; i<o.length; i++)
        {
            if (ct === 'sb')
                var sz = '<h1>200 x 200</h1>';
            else
                var sz = '<h3>710 x 100</h3>';
            
            var d = new Date();
            var hasil = CalculateDate(o[i]["exdt"],d.yyyymmdd());
            ADVERTISE += '<div class="adv-'+ct+'-content adv-'+ct+'-'+o[i]["id"]+'">';
            if (hasil < 0){
                ADVERTISE += sz+'<p>Click <button id="adver-'+ct+'-'+o[i]["id"]+'" class="btn btn-warning btn-ads">Advertising</button> button to put your advertising</p>';  
            } else {
                ADVERTISE += o[i]["cd"];
            }
            ADVERTISE += '</div>';
            MODALADS(o[i]["id"],ct);
        }
        
        $('#adv-'+ct).empty().append(ADVERTISE);
    };
    
    ADSL(ADSPA,'pa');
    ADSL(ADSSB,'sb');
    
/* PLAYER AREA ADS 
    $('.pa-ads').html(function(){
        $(this).append('');
    });
*/ 
           
/* ALERT */
    var cALERT = 
    [
        {
            "ct"    : "info",
            "text"  : "<strong>NEW! Chat Room.</strong> Channel Tab > Chat. Have fun guys.",
            "exdt"  : "2012-01-01"
        }
    ];
    
    function ALERT(o){
        var s = '';
        for (var i=0; i<o.length; i++)
        { 
            var d = new Date();
            var hasil = CalculateDate(o[i]["exdt"],d.yyyymmdd());
            if (hasil > 0){
                s += '<div class="alert alert-'+o[i]["ct"]+' alert-sidebar" role="alert">'+
                        '<button type="button" class="close" data-dismiss="alert" aria-label="Close"><span aria-hidden="true">&times;</span></button>'+
                        o[i]["text"]+
                    '</div>';
            }
        };
        $('.alert-view').empty().append(s);
    };
    ALERT(cALERT);
});



