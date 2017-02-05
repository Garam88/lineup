$(function(){
    $("#tbd").html("<tr><td colspan='4' style='text-align:center; padding:70px'><img src='img/loading.gif' width='50' height='50'/></td></tr>");
    
    $.ajax({
        type: "POST",
        url: "/selectScheduleList.do",    
        success: function(res){
            var tbody = "";
            
            console.log(res);
            
            res.forEach(function(value, index){
                                
                tbody += "<tr nid='"+value.nid+"' class='line'>";
                tbody += "<td>"+value.num+"</td>";
                tbody += "<td>"+value.name+"</td>";
                if(value.category == 1){
                    tbody += "<td>시합</td>";
                }
                else if(value.category == 2){
                    tbody += "<td>연습시합</td>";
                }
                else if(value.category == 3){
                    tbody += "<td>연습(or레슨)</td>";
                }
                
                tbody += "<td>"+value.date.substr(0, 10) +"</td>";
                
                tbody += "</tr>";
            });
            
            $("#tbd").html(tbody);
            
        },     
        error:function(e){  
            console.log(e);
        }
    });
    
    $("#tbd").on("click", ".line", function(){
        
        location.href = "/selectSchedule?nid="+$(this).attr("nid");
        
    });
});