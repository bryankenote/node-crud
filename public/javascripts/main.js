$(function () {
    // create quote btn
    $('#save-quote').on('click', function () {
        var createData = {
            'name': $('#create-name').val(),
            'quote': $('#create-quote').val()
        };
        
        if(!validParams(createData.name, createData.quote)) {
            return;
        }
        
        $.ajax({
            type: 'POST',
            url: '/quotes',
            dataType: 'json',
            headers: {'Content-Type': 'application/json'},
            data: JSON.stringify(createData),
            success: function (data) {
                var quoteTemplate = $('#quotes > li').first().clone(true, true);
                quoteTemplate.attr('id', data._id);
                quoteTemplate.find('.name-text').html(data.name);
                quoteTemplate.find('.quote-text').html(data.quote);
                $('#quotes').append(quoteTemplate);
            }
        });
    });
    
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
            success: function (data) {
                $('#' + data._id).remove();
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
    
    $('.cancel').on('click', function () {
        $(this).last().parent().addClass('hidden');
    });
    
    // update quote btn
    $('.quote > .update-info > .update-confirm').on('click', function () {
        var thisElem = $(this);
        var updatedData = {
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