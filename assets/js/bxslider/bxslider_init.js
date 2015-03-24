$(window).on("load", function(){
		console.log(bxoption)
	$("#slider_box").css("visibility", "visible");
	(function sliderInit () {
		var bxoption = {};
		if(devicename === "iPhone") {
			bxoption = {
				/* --------------- 20140523 ---------------  */
				/*touchEnabled: true,
				controls: false,
				infiniteLoop: true,
				auto: true*/
				touchEnabled: false,
				infiniteLoop: true,
				auto: true
			}
		} else { // Android
			bxoption = {
				touchEnabled: false,
				infiniteLoop: true,
				auto: true
			}
		}
		bxoption.controls = false;
		$('.bxslider').bxSlider(bxoption)

	})();
});