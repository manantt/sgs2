 $(document).ready(function(){
 	customRange();
 	calc();
 	generarTabla();
 	$(".food-range").change(function(){
 		calc();
 	});
 });

 function calc(){
 	var quantity = 0;
 	$("#food-container .food-range").each(function(){
 		quantity += parseInt($(this).val());
 	});
 	$("#food-quantity").html(quantity);
 }

 function generarTabla(){
 	var prototype = '<div class="food"><img src="images/__img__.svg"><div class="slider-wrapper slider-ghost"><input class="food-range input-range" data-slider-id="ex__id__Slider" type="text" data-slider-min="0" data-slider-tooltip="always" data-slider-max="1000" data-slider-step="1" data-slider-value="0"/></div></div>';
 	$.each(food, function(key, value){
 		var html = prototype.replace("__img__", value.icono).replace("__id__", key);
 		$("#food-container").append(html);
 	});
 	customRange();
 	calc();
 }
