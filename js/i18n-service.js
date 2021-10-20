

var gTrans = {
    headTitle: {
        en:'Styilng HTML Tables' ,
        he:'חנות ספרים' 
    },
    addBook: {
        en:'',
        he:''
    },
    clear: {
        en:'',
        he:''
    },
    id: {
        en:'',
        he:''
    },
    title: {
        en:'',
        he:''
    },
    price: {
        en:'',
        he:''
    },
    actions: {
        en:'',
        he:''
    },


}
var gCurrLang = 'en';

function getTrans(transKey) {

    var keyTrans = gTrans[transKey]
    // TODO: if key is unknown return 'UNKNOWN'
    if(!keyTrans) return 'UNKNOWN';
    // TODO: get from gTrans
    var txt = keyTrans[gCurrLang]
    // TODO: If translation not found - use english
    if(!txt) txt = keyTrans.en;
    return txt;
}

function doTrans() {
    // TODO: 
    // for each el:
    //    get the data-trans and use getTrans to replace the innerText 
    var els = document.querySelectorAll('[data-trans]')
    els.forEach((el) => {
        var elTrans = el.dataset.trans
    //  ITP: support placeholder    
        if(el.nodeName === 'INPUT'){
            el.placeholder = getTrans(elTrans)
        } else {
            el.innerText = getTrans(elTrans)
        }
    })

}

function setLang(lang) {
    gCurrLang = lang;
}

function formatNumOlder(num) {
    return num.toLocaleString('es')
}

function formatNum(num) {
    return new Intl.NumberFormat(gCurrLang).format(num);
}

function formatCurrency(num) {
    return new Intl.NumberFormat('he-IL',{ style: 'currency', currency: 'ILS' }).format(num);
}

function formatDate(time) {

    var options = {
        year: 'numeric', month: 'short', day: 'numeric',
        hour: 'numeric', minute: 'numeric',
        hour12: true,
    };

    return new Intl.DateTimeFormat(gCurrLang,options).format(time);
}

function kmToMiles(km) {
    return km / 1.609;
}