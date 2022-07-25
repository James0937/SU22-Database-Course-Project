function searchClick() {
    console.log($('#filter').val());
    $.ajax({
        type: 'POST',
        url: '/search-edit',
        contentType: 'application/json;charset=UTF-8',
        data: JSON.stringify({
            'home_id': $('#filter').val()
        }),
        success: function (res) {
            console.log(res.response);
            const query_result = JSON.parse(res.response);
            document.getElementById("HomeIdText").textContent = query_result[0].home_id;
            document.getElementById("HouseNameText").value = query_result[0].house_name;
            document.getElementById("PriceText").value = query_result[0].price;
            document.getElementById("DistrictText").value = query_result[0].district;
        },
        error: function () {
            console.log('Error');
        }
    });
}

function editClick() {
    const home_id = document.getElementById("HomeIdText").textContent;
    const house_name = document.getElementById("HouseNameText").value;
    const price = document.getElementById("PriceText").value;
    const district = document.getElementById("DistrictText").value;
    if (home_id == "" || house_name == "" || price == "" || district == "") {
        alert("Inputs must not be empty, or you have not found a valid home entity!");
        return;
    }

    $.ajax({
        type: 'POST',
        url: '/edit',
        contentType: 'application/json;charset=UTF-8',
        data: JSON.stringify({
            'home_id': home_id,
            'name': house_name,
            'price': price,
            'district': district
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