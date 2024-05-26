const eta = document.querySelectorAll('div.eta');
const ppl = document.querySelectorAll('div.ppl');

function updateETA() {
  fetch('https://data.etagmb.gov.hk/eta/route-stop/2004791/1/7')
    .then(response => response.json())
    .then(data => {
      for (let i = 0; i < 3; i++) {
        eta[i].innerText = data['data']['eta'] [i]['diff'];
      }
    });
}

updateETA();
setInterval(updateETA, 20000);