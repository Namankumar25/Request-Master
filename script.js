
let count = 2;
let get = document.getElementById('get')
let url = document.getElementById('url');

if (get.checked == true) {
    let json = document.getElementById('json').disabled = true;
    let cusparams = document.getElementById('cusparams').disabled = true;

    //blocking json parameters
    let jsontext = document.getElementById('jsontext');
    jsontext.style.display = "none";

    //hiding custom params
    let customparams = document.getElementById('customparams');
    customparams.style.display = "none";
}

get.addEventListener('click', function () {
    let cusparams = document.getElementById('cusparams')
    let json = document.getElementById('json')

    json.checked = false;
    cusparams.checked = false;

    json.disabled = true;
    cusparams.disabled = true;



    //blocking json parameters
    let jsontext = document.getElementById('jsontext');
    jsontext.style.display = "none";

    //hiding custom params
    let customparams = document.getElementById('customparams');
    customparams.style.display = "none";


});

let post = document.getElementById('post');
post.addEventListener('click', function () {

    let cusparams = document.getElementById('cusparams')
    let json = document.getElementById('json')
    json.disabled = false;
    cusparams.disabled = false;
    json.checked = true;

    //blocking json parameters
    let jsontext = document.getElementById('jsontext');
    jsontext.style.display = "block";

    //hiding custom params
    let customparams = document.getElementById('customparams');
    customparams.style.display = "none";


});

//adding event listner on custom parameters
let cusparams = document.getElementById('cusparams');
cusparams.addEventListener('click', function () {

    //blocking json parameters
    let jsontext = document.getElementById('jsontext');
    jsontext.style.display = "none";

    //hiding custom params
    let customparams = document.getElementById('customparams');
    customparams.style.display = "block";

});


//adding event listner to json button
let json = document.getElementById('json').addEventListener('click', function () {

    //blocking json parameters
    let jsontext = document.getElementById('jsontext');
    jsontext.style.display = "block";

    //hiding custom params
    let customparams = document.getElementById('customparams');
    customparams.style.display = "none";
})

//Adding diffrent values and custom parameters
let addpara = document.getElementById('addpara');
addpara.addEventListener('click', function (e) {

    let div = document.createElement('div');
    div.className = "row customparameters my-2"
    let customparams = document.getElementById('customparams');
    div.innerHTML =
        `
                <div class="col-lg-5">
                    <input type="text" class="form-control key" placeholder="write your key here.." id="key${count}">
                </div>
                <div class="col-lg-5">
                    <input type="text" class="form-control Value" placeholder="write your value here.." id="value${count}">
                </div>
                                        
                <button type="button" class="btn btn-primary col-lg-1 sub" value=${count} id="subpara${count}">
                    -
                </button>
                                         
            `
    customparams.appendChild(div);


    //deleting additional value and key boxes  
    let subpara = document.getElementById('subpara' + count);
    subpara.addEventListener('click', function (e) {
        let customparametersarray = document.getElementsByClassName('customparameters');
        e.target.parentElement.remove();

    });

    count++;
});

//logic for get request
function submitrequest() {
    let a = getresponse(url.value);
    a.then(function (data) {

        if (url.value == "") {
            let response = document.getElementById('response')
            response.innerText = "Please enter a valid URL ! ";
        }
        else {
            if (data=="") {
                console.log("no response")
            }
            let response = document.getElementById('response')
            response.innerText = data;
        }

    });
}
//fetching request
async function getresponse(urlinput) {
    const response = await fetch(urlinput)
    const responsedata = await response.text();
    return responsedata;
}


let submit = document.getElementById('submit')
submit.addEventListener('click', () => {

    let response = document.getElementById('response')
    response.innerText = "Please wait we are processing your Request..";

    if (get.checked == true) {
        submitrequest();
    }

    else if (post.checked == true) {

        let json = document.querySelector('input[name="parapass"]:checked')
        let obj = {};

        if (json.value == "Customparams") {
            let key = document.getElementsByClassName('key')
            let keyValue = document.getElementsByClassName('Value')

            //creating an object of custom parameters
            for (let i = 0; i < key.length; i++) {
                obj[key[i].value] = keyValue[i].value
            }

            obj = JSON.stringify(obj);

            fetch(url.value, {
                method: 'POST',
                body: obj,
                headers: {
                    'Content-type': 'application/json; charset=UTF-8',
                },
            }).then(
                (response) => response.text()
            ).then(
                (data) => {

                    let response = document.getElementById('response')
                    response.innerText = data;
                }
            ).catch(() => {
                let response = document.getElementById('response')
                response.innerText = "We are facing some problem on fetching your results..";
            })
        }

        else if (json.value == "JSON") 
        {
            let jsontext = document.getElementById('jsontext')
            obj = jsontext.value;

            fetch(url.value, {
                method: 'POST',
                body: obj,
                headers: {
                    'Content-type': 'application/json; charset=UTF-8',
                },
            }).then(
                (response) => response.text()
            ).then(
                (data) => {
                    let response = document.getElementById('response')
                    response.innerText = data;
                }
            ).catch(() => {  
                let response = document.getElementById('response')
                response.innerText = "We are facing some problem on fetching your results..";
            }
            )
        }

        else {
            alert("We are facing some problem Try again Later !");
        }

    }
})