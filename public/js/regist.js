$(function(){
    
    $('#sendButton').on('click', function(){
        var param ={
            name : $("#scheduleName").val(),
            category : $("#scheduleCategory option:selected").val(),
            date : $("#scheduleDate").val(),
            time : $("#scheduleTime").val()
        }
        
        if(param.name == "" || param.date == "" || param.time == ""){
            alert("입력되지 않은 항목이 있습니다. 확인해주세요.");
            return;
        }
        
        $.ajax({      
            type: "POST",
            url: "/registSchedule.do",
            data: param,      
            success: function(res){
                
                if(res == 'fail'){
                    alert('스케쥴 입력에 실패했습니다.');
                    return;
                }
                else {
                    alert('스케쥴 입력 완료');
                }
                
                location.href = "/main";
            },     
            error:function(e){  
                alert('스케쥴 입력 중 문제가 발생하였습니다.');
            }
        });
    });
})