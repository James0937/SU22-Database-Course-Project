function addClick() {
    $.ajax({
        type: 'POST',
        url: '/add',
        contentType: 'application/json;charset=UTF-8',
        data: JSON.stringify({
            'name': $('#name').val(),
            'price': $('#price').val(),
            'district': $('#district').val(),
            'latitude': $('#latitude').val(),
            'longtitude': $('#longtitude').val()
        }),
        success: function (res) {
            console.log(res.response);
            alert("Add successfully, assigned home_id with " + res.response);
            location.reload()
        },
        error: function () {
            console.log('Error');
        }
    });
}