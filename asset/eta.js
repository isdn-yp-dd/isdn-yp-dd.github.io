// const
const eta = document.querySelectorAll('div.eta');
const ppl = document.querySelectorAll('div.ppl');
const bus = document.querySelectorAll('div.bus');
const magic_num = [8, 7, 5, 4, 3, 0];

function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min)) + min;
}

function showBus(i) {
  let ETA = eta[i].innerText;
  if ((ETA == '---') || (parseInt(ETA) > 9)) {
    bus[i].style.display = 'none';
  }
  else {
    for (let j = 0; j < magic_num.length; j++) {
      if (parseInt(ETA) > magic_num[j]) {
        bus[i].style.display = 'block';
        bus[i].style.top = (715 + 105 * j) + 'px';
        let value = 19 - parseInt(ppl[i].innerText) + getRandomInt(-1,2);
        bus[i].innerText = value + '/19';
        if (value > 13) {
          bus[i].style.backgroundImage = "url('/asset/bus-2.png')";
        }
        else {
          bus[i].style.backgroundImage = "url('/asset/bus-1.png')";
        }
        break;
      }
    }
  }
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
        else if ((oldETA == 0) || (oldETA != newETA['diff'])) {  // eta changed
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
          showBus(i);
        }
      }
    });
}

// main
updateETA();
ppl.forEach(p => p.innerText = getRandomInt(5, 8));  // init
setInterval(updateETA, 20000);