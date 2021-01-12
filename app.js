// 1:20:34
// elements required
const balanceEl = document.querySelector('.total #total');
const incomeTotalEl = document.querySelector('.income #income-total');
const outcomeTotalEl = document.querySelector('.outgoings #outgoings-total');
const incomeEl = document.querySelector('#incoming-container');
const outgoingEl = document.querySelector('#outgoings-container');
const allEl = document.querySelector('#all-div')
const incomeList = document.querySelector('#incomings-list');
const outgoingList = document.querySelector('#outgoing-list');
const allList = document.querySelector('#all-ul');
const outgoingUpdate = document.querySelector('#outgoings-total')
const incomingUpdate = document.querySelector('#income-total')


//toggles
const allBtn = document.querySelector('#all');
const outgoingsBtn = document.querySelector('#outgoings');
const incomingsBtn = document.querySelector('#incomings');

//input-buttons
const addoutgoings = document.querySelector('.add-outgoings');
const outGoingTitle = document.querySelector('#outgoing-title');
const outGoingAmount = document.querySelector('#outgoing-amount');

const addIncomings = document.querySelector('.add-incomings');
const incomeTitle = document.querySelector('#incoming-input');
const incomeAmount = document.querySelector('#incoming-amount');

let ENTRY_LIST = [];
let balance = 0, income = 0, outgoing = 0;


//event listeners
incomingsBtn.addEventListener('click', () => {
    show(incomeEl);
    hide([outgoingEl, allEl]);
    active(incomingsBtn);
    inactive([outgoingsBtn, allBtn]);
})

outgoingsBtn.addEventListener('click', () => {
    show(outgoingEl);
    hide([incomeEl, allEl]);
    active(outgoingsBtn);
    inactive([incomingsBtn, allBtn]);
})

allBtn.addEventListener('click', () => {
    show(allEl);
    hide([incomeEl, outgoingEl]);
    active(allBtn);
    inactive([incomingsBtn, outgoingsBtn]);
})



addoutgoings.addEventListener('click', () => {
        if (!outGoingTitle.value|| !outGoingAmount.value) return;
        let outgoing = {
            type: "outgoing",
            title: outGoingTitle.value,
            amount: outGoingAmount.value
        }

    ENTRY_LIST.push(outgoing);
    updateUI();
    clearInput([outGoingTitle, outGoingAmount]);

})

addIncomings.addEventListener('click', () => {
    if (!incomeTitle.value || !incomeAmount.value) return;
    let income = {
        type: "income",
        title: incomeTitle.value,
        amount: incomeAmount.value
    }

    ENTRY_LIST.push(income);
    updateUI();
    clearInput([incomeTitle, incomeAmount]);


})


//function
function show(element) {
    element.classList.remove('hide');
}

function hide( element ) {
    element.forEach(element => {
        element.classList.add('hide');
})
}

function active(element) {
    element.classList.add('active');
}

function inactive(element) {
    element.forEach(element => {
        element.classList.remove('active');
    })
    
}

function updateUI() {
    income = calculateTotal("income", ENTRY_LIST);
    outgoing = calculateTotal("outgoing", ENTRY_LIST);
    balance = Math.abs(calculateBalance(income, outgoing));
    

    let sign = (income >= outgoing) ? "$" : "-$";

    
    balanceEl.innerHTML = `Balance:${sign}${balance}`;
    outgoingUpdate.innerHTML = `Outgoing:${sign}${outgoing}`;
    incomingUpdate.innerHTML = `Income${sign}${income}`;

    clearElement ([outgoingList, incomeList, allList] )

  
    

    ENTRY_LIST.forEach( (entry, index) => {
        if( entry.type == "expense" ){
            showEntry(outgoingList, entry.type, entry.title, entry.amount, index)
        }else if( entry.type == "income" ){
            showEntry(incomeList, entry.type, entry.title, entry.amount, index)
        }
        showEntry(allList, entry.type, entry.title, entry.amount, index)
    });
}



function showEntry(list, type, title, amount, id) {
    const entry = `<li id = "${id}" class="${type}">
                        <div class="entry">${title}: $${amount}</div>
                        <div class="edit-btn" aria-role="button"><i class="fas fa-edit"></i></div>
                        <div class="remove-btn" aria-role="button"><i class="fas fa-minus"></i></div>
                    </li>`;
    
    const position = "afterbegin"

    list.insertAdjacentHTML(position, entry);
}

function clearElement(elements) {
    elements.forEach(element => {
        element.innerHTML = '';
    })
    
}

function calculateTotal(type, list){
    let sum = 0;
    list.forEach( entry => {
        if( entry.type == type ){
            sum += entry.amount;
        }
    })

    return sum;
}

function calculateBalance(income, outgoing) {
    return income - outgoing;
}




function clearInput(inputs) {
    inputs.forEach(input => {
        input.value = '';
    })
}

