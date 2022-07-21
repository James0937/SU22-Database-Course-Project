function initMap() {
  const uluru = { lat: -25.344, lng: 131.031 };
  const map = new google.maps.Map(document.getElementById("map"), {
    zoom: 4,
    center: uluru,
  });
  const marker = new google.maps.Marker({
    position: uluru,
    map: map,
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
  document.getElementById(tabName).style.display = "block";
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
    success: function(res) {
      console.log(res.response);
      const query_result = JSON.parse(res.response);
      const table = document.getElementById("tableBody");

      query_result.map(query=>{
        let row = table.insertRow();
        let house_name = row.insertCell(0);
        house_name.innerHTML = query.house_name;
        let price = row.insertCell(1);
        price.innerHTML = query.price;
        let safety_score = row.insertCell(2);
        safety_score.innerHTML = query.safety_score;
        let district = row.insertCell(2);
        district.innerHTML = query.district;
      });     
    },
    error: function() {
      console.log('Error');
    }
});
}