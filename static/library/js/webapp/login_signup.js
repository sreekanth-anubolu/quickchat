$(function() {

    $('#login-form-link').click(function(e) {
		$("#login-form").delay(100).fadeIn(100);
 		$("#register-form").fadeOut(100);
		$('#register-form-link').removeClass('active');
		$(this).addClass('active');
		e.preventDefault();
	});

	$('#register-form-link').click(function(e) {
		$("#register-form").delay(100).fadeIn(100);
 		$("#login-form").fadeOut(100);
		$('#login-form-link').removeClass('active');
		$(this).addClass('active');
		e.preventDefault();
	});

	$('#login-submit').click(function(e) {
		e.preventDefault();
		username = $("#login_username").val();
		password = $("#login_password").val();
		csrftoken = $('input[name="csrfmiddlewaretoken"]').val();
		$.ajax({
             url : window.location.href,
             type : "POST",
             data : { 'csrfmiddlewaretoken' : csrftoken, 'username' : username, 'password' : password },
             success : function(json) {
                console.log(json);
                if(json['success']){
                    window.location.href = "/";
                }else{
                    $("#login_error").text(json['msg']);
                    $("#login_error").show();
                }

             },
             error : function(xhr,errmsg,err) {
                console.log(xhr.status + ": " + xhr.responseText);
             }
         });
	});

	$('#register-submit').click(function(e) {
		e.preventDefault();
		email = $("#register_email").val();
		username = $("#register_username").val();
		password1 = $("#password1").val();
		password2 = $("#password2").val();
		csrftoken = $('input[name="csrfmiddlewaretoken"]').val();
		$.ajax({
             url : '/register/',
             type : "POST",
             data : { 'csrfmiddlewaretoken' : csrftoken, 'email' : email, 'username' : username, 'password1' : password1, 'password2' : password2  },
             success : function(json) {
                console.log(json);
                if(json['success']){
                    $("#register_success").text(json['msg']);
                    $("#register_success").show();
                }else{
                    $("#register_error").text(json['msg']);
                    $("#register_error").show();
                }

             },
             error : function(xhr,errmsg,err) {
                console.log(xhr.status + ": " + xhr.responseText);
             }
         });
	});
});