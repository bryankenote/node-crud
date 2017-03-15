$(function () {
    $('.quote > .delete-btn').on('click', function () {
       console.log($(this));
    });
    $('.quote > .update-btn').on('click', function () {
        if ($(this).siblings('.update-info').hasClass('hidden'))
            $(this).siblings('.update-info').removeClass('hidden');
        else
            $(this).siblings('.update-info').addClass('hidden');
    });
    $('.quote > .update-info > .update-confirm').on('click', function () {
        var thisElem = $(this);
        var updatedData = {
            'id': thisElem.attr('id'),
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