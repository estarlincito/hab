const data__estandar = document.getElementById("data__estandar");
const data__superior = document.getElementById("data__superior");
const data__doble = document.getElementById("data__doble");
const data__suit = document.getElementById("data__suit");
const data__ocupadas = document.getElementById("data__ocupadas");

//localStorage validando por primera vez
function validando__ls(){
if (!localStorage.getItem("hab__data")) {
        const N__hab = {
            "N__101": "Disponible",
            "N__102": "Disponible",
            "N__103": "Disponible",
            "N__204": "Disponible",
            "N__301": "Disponible",
            "N__303": "Disponible",
            "N__206": "Disponible",
            "N__209": "Disponible",
            "N__304": "Disponible",
            "N__306": "Disponible",
            "N__307": "Disponible",
            "N__310": "Disponible",
            "N__104": "Disponible",
            "N__207": "Disponible",
            "N__208": "Disponible",
            "N__210": "Disponible",
            "N__302": "Disponible",
            "N__305": "Disponible",
            "N__308": "Disponible",
            "N__309": "Disponible",
            "N__311": "Disponible",
            "N__312": "Disponible"
        }

        localStorage.setItem("hab__data", JSON.stringify(N__hab));
    };
};

validando__ls();


//obteniendo estado del ls
function hab__estado(arr = JSON.parse(localStorage.getItem('hab__data'))){
    var numero = [];
    if (localStorage.getItem("hab__data")) {
        for(let key in arr){
            document.getElementById(key).value = arr[key]        
            if(arr[key] === "Ocupada") {
                numero.push(key);
                document.getElementById(`${key}__N`).classList = 'td__color1';
                data__ocupadas.innerHTML += `   
                <tr">
                    <td id="OC_${key}" class="td__color1">${numero.length}- ${key}</td>
                </tr>`;
            }if(arr[key] === "Reservada") {
                document.getElementById(`${key}__N`).classList = 'td__color2';
            }if(arr[key] === "Disponible") {
                document.getElementById(`${key}__N`).classList = 'td__color3';
            }
        }
    }
    
}


//mostrando hab
async function hab__fetch() {
    const response = await fetch('data.json');
    const data = await response.json();
    
    // Estandar
    for (let i = 0; i < data.estandar.length; i++){
        data__estandar.innerHTML += `
            <tr">
                <td id="N__${data.estandar[i].hab}__N">- ${data.estandar[i].hab}</td>
                <td>
                    <select id="N__${data.estandar[i].hab}" onchange="add__hab__state(${data.estandar[i].hab})">
                        <option value="Disponible">Disponible</option>
                        <option value="Ocupada">Ocupada</option>
                        <option value="Reservada">Reservada</option>
                    </select>
                </td>
            </tr>
        `;
    }

    // Superior
    for (let i = 0; i < data.superior.length; i++){
        data__superior.innerHTML += `
            <tr">
                <td id="N__${data.superior[i].hab}__N">- ${data.superior[i].hab}</td>
                <td>
                    <select id="N__${data.superior[i].hab}" onchange="add__hab__state(${data.superior[i].hab})">
                        <option value="Disponible">Disponible</option>
                        <option value="Ocupada">Ocupada</option>
                        <option value="Reservada">Reservada</option>
                    </select>
                </td>
            </tr>
        `;
    }

    // Doble
    for (let i = 0; i < data.doble.length; i++){
        data__doble.innerHTML += `
            <tr">
                <td id="N__${data.doble[i].hab}__N">- ${data.doble[i].hab}</td>
                <td>
                    <select id="N__${data.doble[i].hab}" onchange="add__hab__state(${data.doble[i].hab})">
                        <option value="Disponible">Disponible</option>
                        <option value="Ocupada">Ocupada</option>
                        <option value="Reservada">Reservada</option>
                    </select>
                </td>
            </tr>
        `;
    }

    // Suit
    for (let i = 0; i < data.suit.length; i++){
        data__suit.innerHTML += `
            <tr">
                <td id="N__${data.suit[i].hab}__N">- ${data.suit[i].hab}</td>
                <td>
                    <select id="N__${data.suit[i].hab}" onchange="add__hab__state(${data.suit[i].hab})">
                        <option value="Disponible">Disponible</option>
                        <option value="Ocupada">Ocupada</option>
                        <option value="Reservada">Reservada</option>
                    </select>
                </td>
            </tr>
        `;
    }
    
    hab__estado();
}

hab__fetch();

//reset ls
function reset() {
    localStorage.clear();
    location.reload();
}



//agregando estado al ls
function add__hab__state(hab) {
    hab__id = `N__${hab}`;
    N__hab__ls__state = JSON.parse(localStorage.getItem('hab__data'));
    N__hab__ls__state[hab__id] = document.getElementById(hab__id).value;
    localStorage.setItem("hab__data", JSON.stringify(N__hab__ls__state));
    data__ocupadas.innerHTML = "";// aqui deveria de validar...
    if (JSON.parse(localStorage.getItem('hab__data'))){
        hab__estado();
    }
}

