function searchClick() {
    console.log($('#filter').val());
    $.ajax({
        type: 'POST',
        url: '/search',
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
                let safety_score = row.insertCell(4);
                safety_score.innerHTML = query.safety_score;
            });

            // Insert checkboxes
            for (var i = 0, row; row = table.rows[i]; i++) {
                var del = row.insertCell(-1);
                del.innerHTML = `<input type="checkbox">`;
            }
            
        },
        error: function () {
            console.log('Error');
        }
    });
}

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