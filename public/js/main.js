$(function(){
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
            alert('데이터 로딩 중 문제가 발생하였습니다.');
        }
    });
    
    $("#tbd").on("click", ".line", function(){
       console.log($(this).attr("nid"));
    });
});