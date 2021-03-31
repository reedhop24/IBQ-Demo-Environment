class Form {
    constructor(url, data) {
        this.url = url,
        this.data = data
    }

    request() {
        return fetch(this.url, {
            method: 'POST',
            body: JSON.stringify(this.data)
        }).then((response) => {
            return response.json();
        }).then((json) => {
            return json;
        });
    }

    parseHTML(resData) {
        let html = '';
        if(resData.Carrier) {
            for(let i = 0; i < resData.Carrier.length; i++) {
                const currCarrier = resData.Carrier[i];
                html += `<div class="table-row"><h4 class="question-header">${currCarrier.Name}</h4>`;
                let option = `<div class="form-group col-lg-12"><select id=${currCarrier.id} class="custom-select">`
                for(let j = 0; j < currCarrier.Classification.length; j++) {
                    option += `<option value="${currCarrier.Classification[j].id}">${currCarrier.Classification[j].Description}</option>`;
                }
                option += '</select></div>';
                html += option + '</div>';
            }
        } else if(resData.Question) {
            for(let i = 0; i < resData.Question.length; i++) {
                const currQuestion = resData.Question[i];
                let carrier;
                if(typeof(currQuestion.Carrier) === 'undefined') {
                    carrier = 'IBQ Question'
                } else if(typeof(currQuestion.Carrier) === 'object') {
                    carrier = currQuestion.Carrier.join(', ');
                } else {
                    carrier = currQuestion.Carrier;
                }
                html += `<div class="table-row"><h4 class="question-header" id=${currQuestion.PlacementID}>${carrier}</h4>`;
                if(currQuestion.Type === 'SELECT') {
                    let option = `<div class="form-group col-lg-12"><label for=${currQuestion.Code}>${currQuestion.Prompt}</label><select id=${currQuestion.Code} class="custom-select">`
                    for(let j = 0; j < currQuestion.Child.length; j++) {
                        if(currQuestion.Child[j].Type === 'OPTION') {
                            option += `<option value=${currQuestion.Child[j].Value}>${currQuestion.Child[j].Value}</option>`
                        }
                    }
                    option += '</select></div>';
                    html += option + '</div>';
                } else {
                    let input = `<div class="form-group col-lg-12"><label for=${currQuestion.Code}>${currQuestion.Prompt}</label><input id=${currQuestion.Code} class="custom-select"></div></div>`
                    html += input;
                }
            }
        } else if(resData.Rate) {
            html += '<tbody>';
            for(let i = 0; i < resData.Rate.length; i++) {
                const rate = resData.Rate[i].Rate ? '$'+resData.Rate[i].Rate : '';
                html += `<tr class="company-url"><td>${resData.Rate[i].Description}</td><td class="rate"><b>${rate}</b></td><td> <a href=${resData.Rate[i].BridgeURL}>Company's URL</a></td></tr>`;
            }
            html += '</tbody>';
        }
        return html;
    }
}