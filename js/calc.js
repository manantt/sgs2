 $(document).ready(function(){
 	customRange();
 	calc();
 	generarTabla();
 	$(".food-range").change(function(){
 		calc();
 	});
 });

 function calc(){
 	var totalQuantity = 0;
 	var totalCalcium = 0;
 	var totalPhosphor = 0;
 	$("#food-container .food-range").each(function(){
 		var quantity = parseInt($(this).val());
 		var calcium = parseFloat(food[$(this).data("food")].calcium);
 		var phosphor = parseFloat(food[$(this).data("food")].phosphor);
 		totalQuantity += quantity;
 		totalCalcium += (calcium*quantity);
 		totalPhosphor += (phosphor*quantity);
 	});
 	var ratium = totalPhosphor != 0 ? totalCalcium/totalPhosphor : 0;
 	$("#food-quantity").html(totalQuantity);
 	$("#food-ratium").html(ratium.toFixed(2));
 }

 function generarTabla(){
 	var prototype = '<div class="food"><img src="images/__img__.svg"><div class="slider-wrapper slider-ghost"><input class="food-range input-range" data-slider-id="ex__id__Slider" type="text" data-slider-min="0" data-slider-tooltip="always" data-slider-max="1000" data-slider-step="1" data-slider-value="0" data-food="__id__"/></div></div>';
 	$.each(food, function(key, value){
 		var html = prototype.replace("__img__", value.icono).replace(/__id__/g, key);
 		$("#food-container").append(html);
 	});
 	customRange();
 	calc();
 }
