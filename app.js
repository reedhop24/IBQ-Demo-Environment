$('document').ready(() => {
    let quoteNumber = '';

    $('#rates-ibq').on('click', async () => {
        $('#main-button').css('display', 'none')
        const form = new Form('https://test.ibqagents.com/OLDTEST:API/BOP/Quote/Start', starterData);
        $.LoadingOverlay("show");
        const data = await form.request();
        $.LoadingOverlay("hide");
        quoteNumber = data.QuoteNumber;
        $('#class-cd-container').css('display', 'block');
        $('#class-cd-answers').append(form.parseHTML(data));
    });

    $('#class-cd-btn').on('click', async () => {
        $('#class-cd-container').css('display', 'none');
        const data = parseAnswers('class-cd-answers');;
        const form = new Form('https://test.ibqagents.com/OLDTEST:API/BOP/Quote/ClassCodes/'+quoteNumber, data);
        $.LoadingOverlay("show");
        const responseData = await form.request();
        $.LoadingOverlay("hide");
        $('#questions-container').css('display', 'block');
        $('#question-cd-answers').append(form.parseHTML(responseData));
    });

    $('#question-cd-btn').on('click', async () => {
        $('#questions-container').css('display', 'none');
        const data = parseAnswers('question-cd-answers');
        const form = new Form('https://test.ibqagents.com/OLDTEST:API/BOP/Quote/Questions/'+quoteNumber, data);
        $.LoadingOverlay("show");
        const responseData = await form.request();
        $.LoadingOverlay("hide");
        $('#rates-container').css('display', 'block');
        $('#rate-table').append(form.parseHTML(responseData));
    });
});

const parseAnswers = (container) => {

    let data;

    if(container === 'class-cd-answers') {
        data = {
            "ClassCode": []
        }
    
        for(let i = 0; i < $(`#${container}`)[0].children.length; i++) {
            let parent = $(`#${container}`)[0].children[i];
            let newAnswer = {
                'CompanyID': parent.children[1].children[0].id,
                'ClassID': parent.children[1].children[0].value,
                'CompanyName': parent.children[0].innerHTML
            }
            data['ClassCode'].push(newAnswer);
        }
    } else {
        data = {
            "Questions": []
        }

        for(let i = 0; i < $(`#${container}`)[0].children.length; i++) {
            let parent = $(`#${container}`)[0].children[i];

            let newAnswer = {
                'PlacementID': parseInt(parent.children[0].id),
                'Code': parent.children[1].children[1].id,
                'Answer': parent.children[1].children[1].value
            }
            data['Questions'].push(newAnswer);
        }
    }

    return data;
}