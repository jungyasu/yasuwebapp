// $(document).ready(function() {
//
// var clickEvent = false;
// $('#myCarousel').carousel({
// interval : 4000
// }).on('click', '.list-group li', function() {
// clickEvent = true;
// $('.list-group li').removeClass('active');
// $(this).addClass('active');
// }).on('slid.bs.carousel', function(e) {
// if (!clickEvent) {
// var count = $('.list-group').children().length - 1;
// var current = $('.list-group li.active');
// current.removeClass('active').next().addClass('active');
// var id = parseInt(current.data('slide-to'));
// if (count == id) {
// $('.list-group li').first().addClass('active');
// }
// }
// clickEvent = false;
// });
//
// });

// $(window).load(function() {
// var boxheight = $('#myCarousel .carousel-inner').innerHeight();
// var itemlength = $('#myCarousel .item').length;
// var triggerheight = Math.round(boxheight / itemlength + 1);
// $('#myCarousel .list-group-item').outerHeight(triggerheight);
//
// });

/*
 *
 */
$(document).ready(function() {
	$('.material-button-toggle').click(function() {
		$(this).toggleClass('open');
		$('.option').toggleClass('scale-on');
	});
});
/*
*
*/
// jQuery(document).ready(function($) {
//
// $('#myCarousel').carousel({
// interval : 5000
// });
//
// //Handles the carousel thumbnails
// $('[id^=carousel-selector-]').click(function() {
// var id_selector = $(this).attr("id");
// try {
// var id = /-(\d+)$/.exec(id_selector)[1];
// console.log(id_selector, id);
// jQuery('#myCarousel').carousel(parseInt(id));
// } catch (e) {
// console.log('Regex failed!', e);
// }
// });
// // When the carousel slides, auto update the text
// $('#myCarousel').on('slid.bs.carousel', function(e) {
// var id = $('.item.active').data('slide-number');
// $('#carousel-text').html($('#slide-content-' + id).html());
// });
// });

/*
 * jspdf
 */

/*
 * end jspdf
 */

/*
 * /////////////////////////////////////////////////////////////////////////////
 *
 */

function scaleDown() {

	$('.work > figure').removeClass('current').addClass('not-current');
	$('nav > ul > li').removeClass('current-li');

}

function show(category) {

	scaleDown();

	$('#' + category).addClass('current-li');
	$('.' + category).removeClass('not-current');
	$('.' + category).addClass('current');

	if (category == "all") {
		$('nav > ul > li').removeClass('current-li');
		$('#all').addClass('current-li');
		$('.work > figure').removeClass('current, not-current');
	}

}


$(document).ready(function() {

	$('#all').addClass('current-li');

	$("nav > ul > li").click(function() {
		show(this.id);
	});

});

/*
 *
 * /////////////////////////////////////////////////////////////////////////////
 *
 *
 */

