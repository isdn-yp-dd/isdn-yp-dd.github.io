const eta = document.querySelectorAll('div.eta');
const ppl = document.querySelectorAll('div.ppl');

function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min)) + min;
}

function updateETA() {
  fetch('https://data.etagmb.gov.hk/eta/route-stop/2004791/1/7')
    .then(response => response.json())
    .then(data => {
      for (let i = 0; i < 3; i++) {
        let oldETA = eta[i].innerText;
        let newETA = data['data']['eta'][i];
        if (newETA == undefined) {  // not exist
          eta[i].innerText = '---';
          ppl[i].innerText = '0';
        }
        else if (oldETA != newETA['diff']) {  // eta changed
          let value = newETA['diff'];
          if (value < 0) {
            value = 0;
          }
          eta[i].innerText = value;  // update eta
          if (value > 9) {
            ppl[i].innerText = 6;  // default 6 if Scheduled 
          }
          else {
            switch (newETA['diff']) {
              case 9:
              case 8:
              case 7:
              case 5:
              case 3:
                ppl[i].innerText = parseInt(ppl[i].innerText) + getRandomInt(-1, 2);  // +-1 if leaving a stop
                break;
              default:
                break;  // no change
            }
          }
        }
      }
    });
}

updateETA();
ppl.forEach(p => p.innerText = getRandomInt(5, 8));  // init
setInterval(updateETA, 20000);