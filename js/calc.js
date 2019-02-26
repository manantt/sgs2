 $(document).ready(function(){
 	calc();
 	$(".food-range").change(function(){
 		calc();
 	});
 });

 function calc(){
 	var quantity = 0;
 	$(".food-range").each(function(){
 		quantity += parseInt($(this).val());
 	});
 	$("#food-quantity").html(quantity);
 }
