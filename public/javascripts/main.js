$(function () {
    // create quote btn
    $('#save-quote').on('click', function () {
        var createData = {
            'name': $('#create-name').val(),
            'quote': $('#create-quote').val()
        };
        
        if(!validParams(createData.name, createData.quote))
            return;
        
        $.ajax({
            type: 'POST',
            url: '/quotes',
            dataType: 'json',
            headers: {'Content-Type': 'application/json'},
            data: JSON.stringify(createData),
            success: function (data) {
                $('#create-name').val('');
                $('#create-quote').val('');
                var quoteTemplate = $('#quotes > li').first().clone(true, true);
                if (quoteTemplate.length === 0)
                    /* global location */
                    location.reload();
                quoteTemplate.attr('id', data._id);
                quoteTemplate.find('.name-text').html(data.name);
                quoteTemplate.find('.quote-text').html(data.quote);
                $('#quotes').append(quoteTemplate);
            }
        });
    });
    
    // delete quote btn
    $('.delete-btn').on('click', function () {
        var thisElem = $(this);
        var deleteData = {
            'id': $(this).parent().parent().parent().prop('id'),
        };
        
        $.ajax({
            type: 'DELETE',
            url: '/quotes',
            dataType: 'json',
            headers: {'Content-Type': 'application/json'},
            data: JSON.stringify(deleteData),
            success: function (data) {
                $('#' + data._id).remove();
            }
        });       
    });
    
    // edit quote btn
    $('.update-btn').on('click', function () {
        $(this).parent().parent().siblings('.update-info').toggleClass('hidden');
        $(this).parent().parent().siblings('.update-info').toggleClass('fade-in');
    });
    
    $('.cancel').on('click', function () {
        $(this).parent().parent().parent().toggleClass('hidden');
        $(this).parent().parent().parent().toggleClass('fade-in');
    });
    
    // update quote btn
    $('.quote > .update-info > .update-confirm').on('click', function () {
        var thisElem = $(this);
        var updatedData = {
            'id': thisElem.last().parent().parent().prop('id'),
            'name': thisElem.siblings('input.update-name').val(),
            'quote': thisElem.siblings('input.update-quote').val(),
        };
        
        if(!validParams(updatedData.name, updatedData.quote))
            return;
        
        $.ajax({
            type: 'PUT',
            url: '/quotes',
            dataType: 'json',
            headers: {'Content-Type': 'application/json'},
            data: JSON.stringify(updatedData),
            success: function (data) {
                $('#' + data._id + ' > .quote-text').html(data.quote);
                $('#' + data._id + ' > .name-text').html(data.name);
                $('#' + data._id + ' > .update-info').addClass('hidden');
            }
        });
    });
});

function validParams() {
    var result = true;
    var args = Array.prototype.slice.call(arguments);
    args.forEach(function (arg) {
        if(arg.trim() === '')
            result = false;
    });
    return result;
}