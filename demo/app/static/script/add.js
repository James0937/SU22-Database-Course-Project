function addClick() {
    if ($('#name').val() == "" || $('#price').val() == "" || $('#district').val() == "" || $('#latitude').val() == "" || $('#longtitude').val() == "") {
        alert("Inputs must not be empty!");
        return;
    }
    
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
            if (res.success == false) {
                alert(res.response);
                return;
            }
            console.log(res.response);
            
            alert("Add successfully, assigned home_id with " + res.response);
            location.reload()
        },
        error: function () {
            console.log('Error');
        }
    });
}