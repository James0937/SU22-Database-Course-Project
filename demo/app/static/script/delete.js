function searchClick() {
    console.log($('#filter').val());
    $.ajax({
        type: 'POST',
        url: '/search-delete',
        contentType: 'application/json;charset=UTF-8',
        data: JSON.stringify({
            'name': $('#filter').val()
        }),
        success: function (res) {
            console.log(res.response);
            const query_result = JSON.parse(res.response);
            const table = document.getElementById("tableBody");
            
            // Clean old results
            var tableRows = table.getElementsByTagName('tr');
            var rowCount = tableRows.length;
            for (var i = rowCount - 1; i >= 0; i--) {
                table.removeChild(tableRows[i]);
            }

            // Insert data
            query_result.map(query => {
                let row = table.insertRow();
                let home_id = row.insertCell(0);
                home_id.innerHTML = query.home_id;
                let house_name = row.insertCell(1);
                house_name.innerHTML = query.house_name;
                let price = row.insertCell(2);
                price.innerHTML = query.price;
                let district = row.insertCell(3);
                district.innerHTML = query.district;
            });

            // Insert checkboxes
            for (var i = 0, row; row = table.rows[i]; i++) {
                var del = row.insertCell(-1);
                var home_id = row.cells[0].innerHTML;
                del.innerHTML = `<input type="checkbox" id="${home_id}">`;
            }
            
        },
        error: function () {
            console.log('Error');
        }
    });
}

function deleteClick() {
    var del_arr = [];
    var table = document.getElementById("tableBody");
    for (var i = 0, row; row = table.rows[i]; i++) {
        var home_id = row.cells[0].innerHTML;
        if (document.getElementById(home_id).checked == true) {
            console.log(home_id);
            del_arr.push(home_id);
        }
    }

    $.ajax({
        type: 'POST',
        url: '/delete',
        contentType: 'application/json;charset=UTF-8',
        data: JSON.stringify(del_arr),
        success: function (res) {
            console.log(res.response);
            alert("Delete successfully.");
            location.reload();
        },
        error: function () {
            console.log('Error');
        }
    });
}