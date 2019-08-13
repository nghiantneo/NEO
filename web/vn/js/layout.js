$(document).foundation();

//filter controls
$(document).ready(function() {
  $('#FilterControl dd a').click(function() {
    // get class from filter that is clicked
    var filtered = $(this).attr('class');
    // reset the active class on all buttons
    $('#FilterControl dd').removeClass('active');
    // update the active state on  clicked button
    $(this).parent().addClass('active');
//filter objects
    // show all items
    if(filtered == "all") {
      $('#FilterHolder').children('li').show();
    }
    else {
      // hide elements that don't share class
      $('#FilterHolder').children('li:not(.' + filtered + ')').hide();
      // show all elements that do share class
      $('#FilterHolder').children('li.' + filtered).show();
    }
    return false;
  });
});

//change layout 
$('#LayoutControl input').on('click',function() {
    if ($(this).hasClass('grid')) {
        $('#LayoutHolder ul').removeClass('list_item full_row').addClass('list_item');
    }
    else if($(this).hasClass('list')) {
        $('#LayoutHolder ul').removeClass('list_item').addClass('list_item full_row');
    }
});

