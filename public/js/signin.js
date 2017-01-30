var idUseable = false;

$(function(){
    $('#sendButton').on('click', function(){
        
        if(!idUseable){
            alert("사용 불가능한 ID 입니다.")
            return;
        }
        
        if($('#userID').val() == ''){
            alert("ID를 입력해주세요.")
            return;
        }
        if($('#userPW').val() == ''){
            alert("PW를 입력해주세요.")
            return;
        }
        if($('#userName').val() == ''){
            alert("이름을 입력해주세요.")
            return;
        }
        
        
        $.ajax({      
            type: "POST",
            url: "/submit.do",
            data: {
                id : $("#userID").val(),
                pw : $("#userPW").val(),
                name : $("#userName").val()
            },      
            success: function(res){
                alert('회원가입 완료');
                location.href = "/";
            },     
            error:function(e){  
                alert('회원가입이 완료되지 못했습니다. 다시 시도해주세요');  
            }
        });
    });

    $('#userID').blur(function(){
        
        if($('#userID').val() == ''){
            $('#idHelpMsg').text('ID를 입력해주세요.');
            return;
        }
        else{
            $('#idHelpMsg').text('ID 사용 가능 여부를 확인중입니다. 잠시 기다려주세요.');
        }
        
        $.ajax({      
            type: "POST",
            url: "/checkid.do",
            data: {
                id : $("#userID").val()
            },      
            success: function(res){
                if(res){
                    $('#idHelpMsg').text('사용 가능한 ID입니다.');
                    idUseable = true;
                }
                else {
                    $('#idHelpMsg').text('이미 존재하는 ID입니다. 다른 ID를 입력해주세요');
                    idUseable = false;
                }
            },     
            error:function(e){  
                alert(e.message);  
            }
        });
    });
    
});