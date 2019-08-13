/*Codigo referencia de Creaticode*/

/* Class HTML
* accordion, que corresponde al contenedor del menu, en este caso <ul>
* open, se agregará a los li padre al ejecutar las funciones javascript
* link, corresponde a el contenedor de los <i> y el titulo de cada submenu
* submenu, corresponde a el submenu y se aplica a <ul> hijo de <li>
*/

/* Id HTML
* accordion, identifica al menu tipo acordion, en este caso <ul> padre
*/


$(function(){
	var Accordion = function(el, multiple) {
		this.el = el || {};
		this.multiple = multiple || false;

		// Variables
		var link = this.el.find('.link');
		// Eventos
		link.on('click', {el: this.el, multiple: this.multiple},this.dropdown)
	}

	Accordion.prototype.dropdown = function(e) {
		var $el = e.data.el;
			$this = $(this),
			$next = $this.next();

		// Desencadena evento de apertura en los elementos siguientes a la clase link = ul.submenu
		$next.slideToggle();
		// Agregar clase open a elemento padre del elemento con clase link = li
		$this.parent().toggleClass('open');
		
		//Parametro inicial que permite ver 1 solo submenu abierto 
		if(!e.data.multiple){
			$el.find('.submenu').not($next).slideUp().parent().removeClass('open');
		}
    
	}
	// Elegir submenus multiples (true) submenus uno a la vez (false)
	var accordion = new Accordion($('#accordion'), false);
});