const uri = 'api/Horses';
let horses = [];

//Receives Items from DB
function getItems() {
    fetch(uri)
        //Checks the response
        .then(response => response.json())
        //Refreshes the Stable Data
        .then(data => _displayHorses(data))
        //Sends any Errors to Console
        .catch(error => console.error('ERROR: Unable to get Items.', error));
}

//Displaying Add Horse form
function displayAddForm() {

    //Displays Modal
    document.getElementById('AddHModal').style.display = 'block';
}

//Adding Horse
function addHorse() {
    //Getting TxtBoxes
    const addHnameTextbox = document.getElementById('Hname');
    const addHspeedTextbox = document.getElementById('Hspeed');
    const addHbreedTextbox = document.getElementById('Hbreed');
    const addHDOBTextbox = document.getElementById('HDOB');
    const addHgenderTextbox = document.getElementById('Hgender');
    const addHnotesTextbox = document.getElementById('Hnotes');

    //Getting Values of TxtBoxes
    const Hstats = {
        name: addHnameTextbox.value.trim(),
        topSpeed: parseInt(addHspeedTextbox.value),
        breed: addHbreedTextbox.value.trim(),
        dob: addHDOBTextbox.value.trim(),
        gender: parseInt(addHgenderTextbox.value),
        notes: addHnotesTextbox.value.trim()
    };

    //Adds Horse to DB
    fetch(uri, {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(Hstats)
    })

        //Checks the response
        .then(response => response.json())
        //Empties Form Inputs
        .then(() => {
            getItems();
            addHnameTextbox.value = '';
            addHspeedTextbox.value = '';
            addHbreedTextbox.value = '';
            addHDOBTextbox.value = '';
            addHgenderTextbox.value = '';
            addHnotesTextbox.value = '';
        })
        //Sends any Errors to Console
        .catch(error => console.error('ERROR: Unable to Add Horse to Stable.', error));

    //Closes Modal
    document.getElementById('AddHModal').style.display = 'none';

}//Adding Horse Ends

//Hides Adding Element
function closeAddInput() {
    document.getElementById('AddHModal').style.display = 'none';
}


//Deleting Horse
function deleteItem(id) {

    //Checks for confirmation before Deleting Horse
    var confirmResult = confirmDel("Are you sure you want to Delete?");
    if (confirmResult) {

        fetch(`${uri}/${id}`, {
            method: 'DELETE'
        })
            .then(() => getItems())
            .catch(error => console.error('ERROR: Unable to Delete Horse.', error));
    }

}//Deleting Horse Ends


//Displaying Edit form for Horse selected
function displayEditForm(id) {
    const item = horses.find(item => item.horseID === id);

    document.getElementById('edit-Id').value = item.horseID;

    document.getElementById('edit-Hname').value = item.name;
    document.getElementById('edit-Hspeed').value = item.topSpeed;
    document.getElementById('edit-Hbreed').value = item.breed;
    //Pushes values of only yyyy-mm-dd from DB
    document.getElementById('edit-HDOB').value = item.dob.slice(0, 10);
    //Selects option with DB value
    document.getElementById('edit-Hgender').value = item.gender;
    document.getElementById('edit-Hnotes').value = item.notes;

    //Displays Modal
    document.getElementById('EditHModal').style.display = 'block';
}


//Updating Horse Data
function updateHorse() {
    const itemId = document.getElementById('edit-Id').value;
    const item = {
        horseID: parseInt(itemId, 10),

        //Getting values from fields
        name: document.getElementById('edit-Hname').value.trim(),
        topSpeed: parseInt(document.getElementById('edit-Hspeed').value),
        breed: document.getElementById('edit-Hbreed').value.trim(),
        dob: document.getElementById('edit-HDOB').value.trim(),
        gender: parseInt(document.getElementById('edit-Hgender').value),
        notes: document.getElementById('edit-Hnotes').value
    };
    console.log(item);
    //Updates Horse in DB
    fetch(`${uri}/${itemId}`, {
        method: 'PUT',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(item)
    })
        .then(() => getItems())
        //Sends any Errors to Console
        .catch(error => console.error('ERROR: Unable to Update Horse.', error));

    //Closes Modal
    document.getElementById('EditHModal').style.display = 'none';

    closeInput();

    return false;
}


//Hides Editing Element
function closeEditInput() {
    document.getElementById('EditHModal').style.display = 'none';
}


//Checks how many horses are in DB
function _displayCount(itemCount) {
    const amount = (itemCount === 1) ? 'Horse' : 'Horses';

    document.getElementById('counter').innerText = `${itemCount} ${amount} in Stable`;
} //Put in <p> amount of horses in stables


//Displaying Horses in Stable
function _displayHorses(data) {
    //Getting <p> B4 Use
    const tBody = document.getElementById('horses');
    tBody.innerHTML = '';

    _displayCount(data.length);
    //Create Btn B4 Use
    const button = document.createElement('button');

    data.forEach(item => {

        //Defining the Edit Btn with HorseID before placing it
        let editButton = button.cloneNode(false);
        editButton.innerText = 'Edit';
        editButton.setAttribute("class", "EditHBtn");
        editButton.setAttribute('onclick', `displayEditForm(${item.horseID})`);
        //Defining the Delete Btn with HorseID before placing it
        let deleteButton = button.cloneNode(false);
        deleteButton.innerText = 'Delete';
        deleteButton.setAttribute("class", "DelHBtn");
        deleteButton.setAttribute('onclick', `deleteItem(${item.horseID})`);

        //Allows to add data to row
        let tr = tBody.insertRow();

        //Adds data to Row by Column Num
        let td1 = tr.insertCell(0);
        let textNode1 = document.createTextNode(item.name);
        td1.appendChild(textNode1);

        let td2 = tr.insertCell(1);
        //Adds km/h for viewing reasons
        let textNode2 = document.createTextNode(item.topSpeed + " km/h");
        td2.appendChild(textNode2);

        let td3 = tr.insertCell(2);
        let textNode3 = document.createTextNode(item.breed);
        td3.appendChild(textNode3);

        let td4 = tr.insertCell(3);
        //Calculates Horses Age after slicing only yyyy-mm-dd from DB
        let textNode4 = document.createTextNode(AgeCalc(item.dob.slice(0, 10)));
        td4.appendChild(textNode4);

        let td5 = tr.insertCell(4);
        //Shows M or F for Gender
        let textNode5 = document.createTextNode((item.gender === 0) ? 'M' : 'F');
        td5.appendChild(textNode5);

        let td6 = tr.insertCell(5);
        //If null just leave blank
        let textNode6 = document.createTextNode((item.notes === null) ? '' : item.notes);
        td6.appendChild(textNode6);

        //Edit Btn
        let td7 = tr.insertCell(6);
        td7.appendChild(editButton);
        //Delete Btn
        let td8 = tr.insertCell(7);
        td8.appendChild(deleteButton);
    });

    horses = data;
}

//Horse Age Calculator
function AgeCalc(Hdob) {
    //Getting dates
    var Today = new Date();
    var Bday = new Date(Hdob);

    //Minusing year and month from today
    var Hage = Today.getFullYear() - Bday.getFullYear();
    var Mnth = Today.getMonth() - Bday.getMonth();

    //If Bday hasn't already been this year
    if (Mnth < 0 || (Mnth === 0 && Today.getDate() < Bday.getDate())) {
        Hage--;
    }

    //Adding yr or yrs
    Hage += (Hage == 1) ? " yr" : " yrs";

    return Hage;
}