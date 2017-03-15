$(function () {
    // delete quote btn
    $('.quote > .delete-btn').on('click', function () {
        var thisElem = $(this);
        var deleteData = {
            'id': $(this).last().parent().prop('id'),
        };
        
        $.ajax({
            type: 'DELETE',
            url: '/quotes',
            dataType: 'json',
            headers: {'Content-Type': 'application/json'},
            data: JSON.stringify(deleteData),
            success: function(data) {
                alert('Delete was performed.');
            }
        });       
    });
    
    // edit quote btn
    $('.quote > .update-btn').on('click', function () {
        if ($(this).siblings('.update-info').hasClass('hidden'))
            $(this).siblings('.update-info').removeClass('hidden');
        else
            $(this).siblings('.update-info').addClass('hidden');
    });
    
    $('.cancel').on('click', function() {
        $(this).last().parent().addClass('hidden');
    });
    
    // update quote btn
    $('.quote > .update-info > .update-confirm').on('click', function () {
        var thisElem = $(this);
        var updatedData = {
            //'id': thisElem.attr('id'),
            'id': thisElem.last().parent().parent().prop('id'),
            'name': thisElem.siblings('input.update-name').val(),
            'quote': thisElem.siblings('input.update-quote').val(),
        };
        
        $.ajax({
            type: 'PUT',
            url: '/quotes',
            dataType: 'json',
            headers: {'Content-Type': 'application/json'},
            data: JSON.stringify(updatedData),
            success: function(data) {
                alert('Load was performed.');
            }
        });
    });
});