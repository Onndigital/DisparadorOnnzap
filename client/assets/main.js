// made with <3 by afarhansib | visit me on https://afarhansib.github.io/
console.log('%cmade with <3 by afarhansib', 'font-weight: bold; font-size: 30px;color: #ff2600; text-shadow: 1px 1px 0px black , -1px -1px 0px white')
console.log('%cvisit me on https://afarhansib.github.io/', 'font-weight: bold; font-size: 20px;color: black; text-shadow: 1px 1px 0px #fc0 , -1px -1px 0px white')


// global variable
let rawData, formattedData, rawMsg = []
let basicValidation = true
let dataIsFormatted = false


// resize textarea template sesuai dengan textarea data
// let resizeInt = null
// let resizeEvent = function() {
// 	document.querySelector("#template").style.height = `calc(${document.querySelector("#data").style.height} - 0rem)`
// }
// 
// document.querySelector("#data").addEventListener("mousedown", function(e) {
// 	resizeInt = setInterval(resizeEvent, 1000/15)
// })
// document.querySelector("#data").addEventListener("touchstart", function(e) {
// 	resizeInt = setInterval(resizeEvent, 1000/15)
// })
// 
// window.addEventListener("mouseup", function(e) {
// 	if (resizeInt !== null) {
// 		clearInterval(resizeInt)
// 	}
// 	resizeEvent()
// })
// window.addEventListener("touchend", function(e) {
// 	if (resizeInt !== null) {
// 		clearInterval(resizeInt)
// 	}
// 	resizeEvent()
// })


// toast
function toast(text = "This is Toast!", code = "default") {
	let toastId = "toast" + Math.round(Math.random()*1000)

	if (document.querySelector(".toast"))	{
		document.querySelector(".toast").remove()
	}
	
	document.querySelector("body").insertAdjacentHTML("beforeend", `<div class="toast toast-${code}" id="${toastId}">${text}</div>`)
	let timot = setTimeout(function() {
		if(document.querySelector("#" + toastId)) {
			document.querySelector("#" + toastId).classList.toggle('hide');
        setTimeout(function(){
					document.querySelector("#" + toastId).remove()
            // box.style.display = 'none';
        },500);
		}
	}, 3000)
}


// logic
let formatData = () => {
	document.querySelector(".data-input table thead").innerHTML = ""
	document.querySelector(".data-input table tbody").innerHTML = ""

	rawData = document.getElementById("data").value
	let tmp1 = encodeURI(rawData).replace(/%20/g, ' ').split("%0A")
	let tmp2 = []

	tmp1.forEach((e, i) =>{
		let tmp3 = e.split("%09")
		if (i == 0) {
			tmp3.push("status")
			tmp3.unshift("#")
		} else {
			tmp3.push("ready")
			tmp3.unshift(i)
		}
		tmp2.push(tmp3)
	})


	// basic validation
	let dataIsValid = true
	if (basicValidation) {
		if (tmp2.length < 2) {
				dataIsValid = false
		}
		tmp2.forEach((e, i) => {
			if(e.length !== tmp2[0].length) {
				dataIsValid = false
			}
		})
	}


	if (dataIsValid) {
		formattedData = tmp2
		dataIsFormatted = true
		// console.log(formattedData)

		formattedData.forEach((e, i) => {
			if (i == 0) {
				let str = "<tr>"
					e.forEach((f, j) => {
						str += `<th>${f}</th>`
					})
				str += "</tr>"
				document.querySelector(".data-input table thead").insertAdjacentHTML("beforeend", str)
			} else {
				let str = "<tr class='data-item'>"
				e.forEach((f, j) => {
					if (j == 1) {
						str += `<td>${f}</td>`
						// str += `<td><a href="https://wa.me/${f}">${f}</a></td>`
					} else {
						str += `<td>${f}</td>`
					}
				})
				str += "</tr>"
				document.querySelector(".data-input table tbody").insertAdjacentHTML("beforeend", str)
			}
		})

		document.querySelector(".data-input table").style.display = "table"
		document.querySelector(".data-input textarea").style.display = "none"
		document.querySelector(".pull-tab").style.display = "none"
	} else {
		toast("error! data tidak valid", "danger")
		editData()
	}
}

let editData = () => {
	dataIsFormatted = false
	document.querySelector(".preview-card").classList.add("preview-hidden")
	document.querySelector(".preview-card").classList.remove("preview-shown")
	document.querySelector(".data-input table").style.display = "none"
	document.querySelector(".data-input textarea").style.display = "block"
	document.querySelector(".pull-tab").style.display = "block"
	document.querySelector(".data-input textarea").focus()

	document.querySelector(".data-input table thead").innerHTML = ""
	document.querySelector(".data-input table tbody").innerHTML = ""
}

let resetData = () => {
	dataIsFormatted = false	
	document.querySelector(".preview-card").classList.add("preview-hidden")
	document.querySelector(".preview-card").classList.remove("preview-shown")
	document.querySelector(".data-input table").style.display = "none"
	document.querySelector(".data-input textarea").style.display = "block"
	document.querySelector(".pull-tab").style.display = "block"
	document.querySelector(".data-input textarea").value = ""
	document.querySelector(".data-input textarea").focus()

	document.querySelector(".data-input table thead").innerHTML = ""
	document.querySelector(".data-input table tbody").innerHTML = ""
}

let previewMessage = () => {
	if (!dataIsFormatted) {
		toast("error! silakan format data dulu", "danger")
	} else {
		formatData()
		document.querySelector(".preview-wrapper").innerHTML = ""
		document.querySelector(".preview-card").classList.remove("preview-hidden")
		document.querySelector(".preview-card").classList.add("preview-shown")
		rawMsg = []
		formattedData.forEach((e, i) => {
			if (i !== 0) {
				rawMsg.push(interpolateString(document.getElementById("template").value, formattedData[0], formattedData[i]))
				document.querySelector(".preview-wrapper").insertAdjacentHTML("beforeend", 
					`<div class="preview-chat"><div>${interpolateString((document.getElementById("template").value).replace(new RegExp('\r?\n','g'), '<br />'), formattedData[0], formattedData[i])}</div></div>`)
			}
		})
	}
}

// function untuk convert string template jadi beneran bisa dipakai
// sumber: jawaban Mohit Pandey di https://stackoverflow.com/questions/29182244/convert-a-string-to-a-template-strin

// String.prototype.interpolate = function(params) {
//   let template = this
//   for (let key in params) {
//     template = template.replace(new RegExp('\\$\\{' + key + '\\}', 'g'), params[key])
//   }
//   return template
// }

// const template = 'Example text: ${text}',
//   result = template.interpolate({
//     text: 'Foo Boo'
//   })

// versi saya:
let interpolateString = (string, ref, params) => {
	ref.forEach((e, i) => {
		string = string.replace(new RegExp('\\{' + e + '\\}', 'g'), params[i])
	})

	return string
}


// complicated things lol
// source: PeterMader at https://stackoverflow.com/questions/45498873/add-a-delay-after-executing-each-iteration-with-foreach-loop
let sendMessages = () => {
	clearConsole()
	document.querySelector(".loading-dots").style.display = "block"
	document.querySelector(".progress-area-wrapper").style.display = "block"
	document.querySelector(".template-area-wrapper").style.display = "none"
	document.querySelector(".preview-card").classList.add("preview-hidden")
	document.querySelector(".preview-card").classList.remove("preview-shown")
  
	var interval = parseInt(document.getElementById("tempo-disparo").value) * 1000; // Obtenha o valor do tempo de disparo e converta para milissegundos
	var promise = Promise.resolve()
	formattedData.forEach(function (e, i) {
	  if (i !== 0) {
		promise = promise.then(function () {
		  updateStatus(i - 1, "sending...")
		  updateProgress(`${i}/${formattedData.length - 1}`)
		  console.log(`Mengirimkan pesan ke ${e[2]}`)
		  fetch(document.getElementById("server").value + "send-message", {
			method: "POST",
			headers: {
			  'Content-Type': 'application/json'
			},
			body: JSON.stringify({ number: e[1], message: rawMsg[i - 1] })
		  })
			.then(r => r.json())
			.then(res => {
			  console.log(res)
			  // console.log("Request complete! response:", res.text())
			  if (res.status) {
				updateStatus(i - 1, "success")
			  } else {
				updateStatus(i - 1, "failed")
				toast("error! silakan buka console", "danger")
			  }
			}).catch(err => {
			  console.log("Fetch gagal! err:", err)
			  updateStatus(i - 1, "failed")
			  toast("error! silakan buka console", "danger")
			})
		  return wait(interval); // Aguarde o intervalo de tempo antes de prosseguir para a próxima iteração
		})
	  }
	})
  
	promise.then(function () {
	  console.log('Envio de mensagem .')
	  updateProgress("Disparo completo")
	  document.querySelector(".loading-dots").style.display = "none"
	  setTimeout(() => {
		document.querySelector(".progress-area-wrapper").style.display = "none"
		document.querySelector(".template-area-wrapper").style.display = "block"
	  }, 1000)
	})
  }
  

// fungsi wait
// sumber: https://stackoverflow.com/questions/42529476/let-promise-wait-a-couple-of-seconds-before-return
function wait(milliseconds) {
  return new Promise(resolve => setTimeout(resolve, milliseconds));
}

let updateStatus = (n, status) => {
	document.querySelectorAll(".data-item")[n].lastElementChild.innerText = status
	document.querySelectorAll(".data-item")[n].lastElementChild.dataset.status = status
}

let updateProgress = (value) => {
	document.querySelector(".progress-area-wrapper h3").innerText = value
}

let clearConsole = () => {
	console.clear()
	// made with <3 by afarhansib | visit me on https://afarhansib.github.io/
	console.log('%cmade with <3 by afarhansib', 'font-weight: bold; font-size: 30px;color: #ff2600; text-shadow: 1px 1px 0px black , -1px -1px 0px white')
	console.log('%cvisit me on https://afarhansib.github.io/', 'font-weight: bold; font-size: 20px;color: black; text-shadow: 1px 1px 0px #fc0 , -1px -1px 0px white')
}
function loadCSVData() {
	var csvFileInput = document.getElementById('csvFileInput');
	var dataTextArea = document.getElementById('data');
  
	if (csvFileInput.files.length > 0) {
	  var file = csvFileInput.files[0];
	  var reader = new FileReader();
  
	  reader.onload = function (e) {
		var contents = e.target.result;
		var csvData = parseCSV(contents);
  
		if (csvData) {
		  renderTable(csvData);
		  dataTextArea.value = contents;
		} else {
		  alert('Falha ao processar o arquivo CSV.');
		}
	  };
  
	  reader.readAsText(file);
	}
  }
  
  function parseCSV(csvText) {
	var rows = csvText.split('\n');
	var data = [];
  
	if (rows.length > 0) {
	  var headers = rows[0].split(',');
  
	  for (var i = 1; i < rows.length; i++) {
		var row = rows[i].split(',');
  
		if (row.length === headers.length) {
		  var rowData = {};
  
		  for (var j = 0; j < headers.length; j++) {
			rowData[headers[j]] = row[j];
		  }
  
		  data.push(rowData);
		} else {
		  return null; // Arquivo CSV inválido
		}
	  }
	}
  
	return data;
  }
  
  function renderTable(data) {
	var tableBody = document.querySelector('.data-area .table-wrapper tbody');
	tableBody.innerHTML = '';
  
	for (var i = 0; i < data.length; i++) {
	  var row = data[i];
	  var tableRow = document.createElement('tr');
  
	  for (var key in row) {
		var tableCell = document.createElement('td');
		tableCell.textContent = row[key];
		tableRow.appendChild(tableCell);
	  }
  
	  tableBody.appendChild(tableRow);
	}
  }
  
  let isScheduled = false;

function scheduleMessage() {
  const datetimeInput = document.getElementById('datetime');
  const datetimeValue = datetimeInput.value;

  if (datetimeValue === '') {
    toast('Selecione uma data e hora para agendar o disparo.');
    return;
  }

  const now = new Date();
  const selectedDatetime = new Date(datetimeValue);

  if (selectedDatetime <= now) {
    toast('Selecione uma data e hora no futuro para agendar o disparo.');
    return;
  }

  const timeDifference = selectedDatetime - now;

  setTimeout(() => {
    if (!isScheduled) {
      isScheduled = true;
      sendMessages();
    }
  }, timeDifference);

  toast(`Disparo agendado para ${datetimeValue}.`);
}

function cancelSchedule() {
  // Aqui você pode adicionar a lógica para cancelar o agendamento de disparo.

  isScheduled = false;
  toast('Agendamento de disparo cancelado.');
}

/*function sendMessages() {
  // Aqui está a lógica existente para o botão "Disparar" no arquivo index.html.
  // Certifique-se de ajustar a lógica conforme necessário para o seu projeto.

  const dataInput = document.getElementById('data');
  const messages = dataInput.value.split('\n');

  for (let i = 1; i < messages.length; i++) {
    const phoneNumber = messages[i].split(',')[0];
    const message = messages[i].split(',')[1];

    // Lógica para enviar mensagem para o número de telefone usando a mensagem fornecida.
    // Substitua essa parte com a lógica específica do seu projeto.
    console.log(`Enviando mensagem para ${phoneNumber}: ${message}`);
  }

  isScheduled = false;
  
}	*/  
