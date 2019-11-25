var foodOxalatesRanges = [10, 50];
var oxalatesRanges = [8, 16];
var oxalatesHealthTexts = {
	"low": '<i class="fa fa-2x fa-check-circle color-success" aria-hidden="true" data-toggle="popover" data-placement="top" data-trigger="hover" data-html="true" data-content="Bajos" data-html="true" title="<b>Bajos</b>"></i>',
	"medium": '<i class="fa fa-2x fa-exclamation-triangle color-warning" aria-hidden="true" data-toggle="popover" data-placement="top" data-trigger="hover" data-html="true" data-content="Medios" data-html="true" title="<b>Medios</b>"></i>',
	"high": '<i class="fa fa-2x fa-exclamation-triangle color-danger" aria-hidden="true" data-toggle="popover" data-placement="top" data-trigger="hover" data-html="true" data-content="Altos" data-html="true" title="<b>Altos</b>"></i>'
};
var chart;

$(document).ready(function(){
 	initChart();
 	customRange();
 	calc();
 	generateTable();
 	$(".food-range").change(function(){
 		calc();
 	});
});

function calc(){
 	calcFood();
 	//popovers
 	$('[data-toggle="popover"]').popover();
}

function calcFood(){
 	var totalQuantity = 0;
 	var totalCalcium = 0;
 	var totalPhosphor = 0;
 	var totalOxalates = 0;
 	var totalCh = 0;
 	var totalFats = 0;
 	var totalProteins = 0;
 	$("#food-container .food-range").each(function(){
 		var quantity = parseInt($(this).val());
 		var calcium = parseFloat(food[$(this).data("food")].calcium);
 		var phosphor = parseFloat(food[$(this).data("food")].phosphor);
 		var oxalates = parseFloat(food[$(this).data("food")].oxalates);
 		var ch = parseFloat(food[$(this).data("food")].carbohydrates);
 		var fats = parseFloat(food[$(this).data("food")].fats);
 		var proteins = parseFloat(food[$(this).data("food")].proteins);
 		totalQuantity += quantity;
 		totalCalcium += (calcium*quantity/100);
 		totalPhosphor += (phosphor*quantity/100);
 		totalOxalates += (oxalates*quantity/100);
 		totalCh += (ch*quantity/100);
 		totalFats += (fats*quantity/100);
 		totalProteins += (proteins*quantity/100);
 	});
 	//quantity
 	$("#food-quantity").html(totalQuantity);
 	//ratium
 	var ratium = totalPhosphor != 0 ? totalCalcium/totalPhosphor : 0;
 	$("#food-ratium").html(ratium.toFixed(2));
 	//oxalates
 	var totalOxalates = totalQuantity != 0 ? (totalOxalates * 100 / totalQuantity).toFixed(2) : 0;
 	var oxalatesHealth = totalOxalates > oxalatesRanges[0] ? totalOxalates > oxalatesRanges[1] ? oxalatesHealthTexts["high"] : oxalatesHealthTexts["medium"] : oxalatesHealthTexts["low"];
 	$("#food-oxalates").html(totalOxalates);
 	$("#food-oxalates-health").html(oxalatesHealth);
 	//macros
 	if(totalQuantity != 0){
	 	chart.data.datasets[0].data = [totalFats,totalCh,totalProteins];
	 	chart.update();
 	}
 	calcPap(totalQuantity);
}

function calcPap(totalQuantity){
	$("#pap-food").html(totalQuantity);
	$("#pap-lineseeds").html((totalQuantity * 15 / 450).toFixed(2).replace(/\.?0+$/, ''));
	$("#pap-prots").html((totalQuantity * 10 / 450).toFixed(2).replace(/\.?0+$/, ''));
	$("#pap-yogurt").html((totalQuantity * 15 / 450).toFixed(2).replace(/\.?0+$/, ''));
	$("#pap-egg").html((totalQuantity * 65 / 450).toFixed(2).replace(/\.?0+$/, ''));
	$("#pap-acacia").html((totalQuantity * 1.25 / 450).toFixed(2).replace(/\.?0+$/, ''));
	$("#pap-polen").html((totalQuantity * 5 / 450).toFixed(2).replace(/\.?0+$/, ''));
	$("#pap-calcium").html((totalQuantity * 2.5 / 450).toFixed(2).replace(/\.?0+$/, ''));
	$("#pap-oatmeal").html((totalQuantity * 2.5 / 450).toFixed(2).replace(/\.?0+$/, ''));
	$("#pap-spirulina").html((totalQuantity * 2.5 / 450).toFixed(2).replace(/\.?0+$/, ''));
}

function generateTable(){
 	var prototype = '<div class="food"><img src="images/__img__.svg" title="<h4>__name__</h4>" data-toggle="popover" data-trigger="hover" data-content="__description__<br><br>Ratio: __ratio__<br>Oxalatos: __oxalates__" data-html="true" data-placement="top"><div class="slider-wrapper slider-ghost __oxalate-range__"><input class="food-range input-range" data-slider-id="ex__id__Slider" type="text" data-slider-min="0" data-slider-tooltip="always" data-slider-max="1000" data-slider-step="1" data-slider-value="0" data-food="__id__"/></div></div>';
 	$.each(food, function(key, value){
 		var html = prototype.replace(/__img__/g, value.icono)
 			.replace(/__id__/g, key).replace(/__name__/g, value.name)
 			.replace(/__description__/g, value.description)
 			.replace(/__ratio__/g, (value.calcium/value.phosphor).toFixed(2) + " : 1")
 			.replace(/__oxalates__/g, value.oxalates)
 			.replace(/__oxalate-range__/g, value.oxalates < foodOxalatesRanges[0] ? "oxa-low" : value.oxalates < foodOxalatesRanges[1] ? "oxa-medium" : "oxa-high");
 		$("#food-container").append(html);
 	});
 	$('[data-toggle="popover"]').popover(); 
 	customRange();
 	calc();
 }

function initChart(){
 	chart = new Chart(document.getElementById("macros-chart"), {
	    type: 'pie',
	    data: {
	      labels: ["Grasas", "Carbohidratos", "Proteinas"],
	      datasets: [{
	        backgroundColor: ["#102238","#ABC8E2", "#375D81"],
	        data: [1,1,1]
	      }]
	    },
	    options: {
		    legend: {
	            display: false,
	            position: 'left',
	            labels: {
	                fontColor: '#232323',
	            }
	        },
		    title: {
		        display: false,
		    },
		    /*tooltips: {
	            backgroundColor: "#fff",
	            borderColor: '#ff0000',
	            borderWidth: 5,
	            bodyFontColor: "#232323"

	        }*/
	    }
	});
}