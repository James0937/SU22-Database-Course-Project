function deleteClick() {
    $.ajax({
        type: 'POST',
        url: '/delete',
        contentType: 'application/json;charset=UTF-8',
        data: JSON.stringify({
            'home_id': $('#name').val(),
        }),
        success: function (res) {
            console.log(res.response);
            alert("Delete successfully.");
            location.reload()
        },
        error: function () {
            console.log('Error');
        }
    });
}