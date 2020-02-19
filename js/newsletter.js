$(document).ready(function(e) {
	$(".newsletter_container #submit").click(function() {
		var email = $(".newsletter_container input[name=email]").val();
		var status = $(".newsletter_container input[name=status]:checked").val();
		
		if(email=="") {
			alert('Please fill email');
			return false;
		}
		
		$.ajax({ 
			url: "api/api.php",
			type: "POST",
			data: 'action=subscribe&email='+email+'&status='+status
		})
		.success(function(result) { 
			var data = $.parseJSON(result);
			if(data.status) {
				alert(data.msg);
				location.reload();
			} else {
				alert(data.msg);
			}
		});
		
		return false;
	});
	$(".newsletter_container_m #submit").click(function() {
		var email = $(".newsletter_container_m input[name=email]").val();
		var status = $(".newsletter_container_m input[name=status]:checked").val();
		
		if(email=="") {
			alert('Please fill email');
			return false;
		}
		
		$.ajax({ 
			url: "api/api.php",
			type: "POST",
			data: 'action=subscribe&email='+email+'&status='+status
		})
		.success(function(result) { 
			var data = $.parseJSON(result);
			if(data.status) {
				alert(data.msg);
				location.reload();
			} else {
				alert(data.msg);
			}
		});
		
		return false;
	});
});