$(function(){
   $('#sendButton').on('click', function(){
      $.ajax({      
        type: "POST",
        url: "/submit.do",
        data: {
            id : $("#userID").val(),
            pw : $("#userPW").val(),
            name : $("#userName").val()
        },      
        success: function(args){
            
        },     
        error:function(e){  
            alert(e.responseText);  
        }
      });
   });
});