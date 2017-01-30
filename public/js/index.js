$(function(){
    $('#login').on('click', function(){
        
        if($('#userID').val() == ''){
            alert("ID를 입력해주세요.")
            return;
        }
        if($('#userPW').val() == ''){
            alert("PW를 입력해주세요.")
            return;
        }
        
        
        $.ajax({      
            type: "POST",
            url: "/login.do",
            data: {
                id : $("#userID").val(),
                pw : $("#userPW").val()
            },      
            success: function(res){
                
                if(!res){
                    alert('아이디와 비밀번호를 확인해주세요.');
                    return;
                }
                
                location.href = "/main";
            },     
            error:function(e){  
                alert('로그인 중 문제가 발생하였습니다.');
            }
        });
    });
})