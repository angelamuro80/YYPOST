$(function (){
	var $contents=$('#g_contents'),
		$contents_area=$contents.find('.g_contents_area'),
		$contents_box=$contents_area.find('.g_contents_box'),
		$contents=$contents_box.find('.g_cont_box'),
		$button_box=$contents_area.find('.g_button_box'),
		$copy=$button_box.find('.copy');

	$contents.each(function() {
		var $this=$(this),
			$take=$this.find('.g_cont'),
			$take_txt=$take.html().replace(/</gi,'&lt;').trim(),
			$give=$this.find('.g_pre_box');

		$('<pre><code>'+$take_txt+'</code></pre>').appendTo($give);
	});

	$copy.on('click',function(){
		var $this=$(this),
			$parent=$this.parents('.g_button_box'),
			$take=$parent.siblings('.g_cont'),
			$take_txt=$take.html().replace(/</gi,'&lt;').trim();

		$('<textarea class="g_textarea">'+$take_txt+'</textarea>').appendTo($take).select();
		document.execCommand('copy');
		$('.g_textarea').remove();
		return false;
	});
});