function editClick() {
    $.ajax({
        type: 'POST',
        url: '/edit',
        contentType: 'application/json;charset=UTF-8',
        data: JSON.stringify({
            'home_id': $('#name').val(),
            'name': $('#name').val(),
            'price': $('#price').val(),
            'district': $('#district').val(),
            'latitude': $('#latitude').val(),
            'longtitude': $('#longtitude').val()
        }),
        success: function (res) {
            console.log(res.response);
            alert("Edit successfully.");
            location.reload()
        },
        error: function () {
            console.log('Error');
        }
    });
}