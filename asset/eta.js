const eta = document.querySelectorAll('div.eta');
const ppl = document.querySelectorAll('div.ppl');

function updateETA() {
  fetch('https://data.etagmb.gov.hk/eta/route-stop/2004791/1/7')
    .then(response => response.json())
    .then(data => {
      for (let i = 0; i < 3; i++) {
        let oldETA = eta[i].innerText;
        let newETA = data['data']['eta'][i];
        if (newETA == undefined) {  // so cursed
          eta[i].innerText = '---';
          ppl[i].innerText = '0';
        }
        else if (oldETA != newETA['diff']) {
          eta[i].innerText = newETA['diff'];
        }
      }
    });
}

updateETA();
setInterval(updateETA, 20000);