function initMap() {
    const chicago = { lat: 41.867258, lng: -87.639156 };
    const map = new google.maps.Map(document.getElementById("map"), {
        zoom: 10,
        center: chicago,
    });
}

window.initMap = initMap;

function openTab(evt, tabName) {
    var i, tabcontent, tablinks;
    tabcontent = document.getElementsByClassName("tabcontent");
    for (i = 0; i < tabcontent.length; i++) {
        tabcontent[i].style.display = "none";
    }
    tablinks = document.getElementsByClassName("tablinks");
    for (i = 0; i < tablinks.length; i++) {
        tablinks[i].className = tablinks[i].className.replace(" active", "");
    }
    document.getElementById(tabName).style.display = "inline";
    evt.currentTarget.className += " active";
}

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
            
            var tableRows = table.getElementsByTagName('tr');
            var rowCount = tableRows.length;
            for (var i = rowCount - 1; i >= 0; i--) {
                table.removeChild(tableRows[i]);
            }

            query_result.map(query => {
                let row = table.insertRow();
                let house_name = row.insertCell(0);
                house_name.innerHTML = query.house_name;
                let price = row.insertCell(1);
                price.innerHTML = query.price;
                let safety_score = row.insertCell(2);
                safety_score.innerHTML = query.safety_score;
                let district = row.insertCell(3);
                district.innerHTML = query.district;
            });

            setMarkers(query_result);
        },
        error: function () {
            console.log('Error');
        }
    });
}

function setMarkers(query_result) {
    const chicago = { lat: 41.867258, lng: -87.639156 };
    const map = new google.maps.Map(document.getElementById("map"), {
        zoom: 10,
        center: chicago,
    });

    const infoWindow = new google.maps.InfoWindow();

    for (let i = 0; i < query_result.length; i++) {
        const home = query_result[i];

        const marker = new google.maps.Marker({
            position: { lat: home['latitude'], lng: home['longtitude'] },
            map,
            title: home['house_name'],
            zIndex: home['home_id'],
            customInfo: " | District: " + home["district"] + " | Price: " + home["price"],
        });

        marker.addListener("click", () => {
            infoWindow.close();
            infoWindow.setContent("Name: " + marker.getTitle() + marker.customInfo);
            infoWindow.open(marker.getMap(), marker);
        });
    }
}

function overviewClick() {
    $.ajax({
        type: 'POST',
        url: '/overview',
        contentType: 'application/json;charset=UTF-8',
        success: function (res) {
            console.log(res.response);
            const query_result = JSON.parse(res.response);
            const table = document.getElementById("tableBody2");
            
            var tableRows = table.getElementsByTagName('tr');
            var rowCount = tableRows.length;
            for (var i = rowCount - 1; i >= 0; i--) {
                table.removeChild(tableRows[i]);
            }

            query_result.map(query => {
                let row = table.insertRow();
                let district = row.insertCell(0);
                district.innerHTML = query.district;
                let price_range = row.insertCell(1);
                price_range.innerHTML = query.price_range;
                let total_homes = row.insertCell(2);
                total_homes.innerHTML = query.total_homes;
            });
        },
        error: function () {
            console.log('Error');
        }
    });
}