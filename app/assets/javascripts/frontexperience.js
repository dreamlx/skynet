$(function(){
	$("#resetBtn").click(function(e){
		$('#experience_form input').removeClass('error');
		$('.formerrspan').remove();
		$('.help-inline').show().css('display',"inline");
		e.preventDefault();

	});
	var exValidator = new FormValidator('experience_form', [{
	    name: 'experience[name]',
	    display: 'required',    
	    rules: 'required|max_length[10]'
	}, {
	    name: 'experience[mail]',
	    rules: 'required|valid_email'
	}, {
	    name: 'experience[qq]',
	    rules: 'numeric|max_length[20]'
	}, {
	    name: 'experience[company]',
	    rules: 'required|max_length[30]'
	}, {
	    name: 'experience[mobile]',
	    rules: 'required|numeric|max_length[15]'
	}, {
	    name: 'experience[phone]',
	    rules: 'alpha_dash|max_length[15]'
	}, {
	    name: 'experience[msg]',
	    rules: 'max_length[255]'
	}], function(errors) {
	    if (errors.length > 0) {
			console.info(errors);
			$('#experience_form input').removeClass('error');
			$('.formerrspan').remove();
			$('.help-inline').hide();
			for(var err in errors)
			{
				var input = $("#"+errors[err].id);
				input.attr('value','').addClass('error').after('<span class=formerrspan>'+errors[err].message+'</span>');
			}
	    }
	});
	exValidator.setMessage('required','请填必填项！');
	exValidator.setMessage('max_length','字符长度过长！');
	exValidator.setMessage('valid_email','邮箱格式错误！');
	exValidator.setMessage('numeric',"只能输入数字！");
	exValidator.setMessage('alpha_dash',"只能输入数字字母下划线和横线！");

});