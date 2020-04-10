define(['jquery', 'main', 'axios', 'aes', 'baseurl'], function($, main, axios, option, aes, baseurl){

  let helper = {};


  helper.formatAngka = function(a, b){
      let newA = b + '';
      let format = a;
      let dataNew = a.substring(0, format.length - newA.length) + newA;
      return dataNew;
  }

  helper.potongText = function(a, b, c){
    let data = a.substring(b,c);
    return data;
  }

  helper.formatRupiah = function(angka, prefix){
    var number_string = angka.replace(/[^,\d]/g, '').toString(),
    split       = number_string.split(','),
    sisa        = split[0].length % 3,
    rupiah        = split[0].substr(0, sisa),
    ribuan        = split[0].substr(sisa).match(/\d{3}/gi);

    // tambahkan titik jika yang di input sudah menjadi angka ribuan
    if(ribuan){
      separator = sisa ? '.' : '';
      rupiah += separator + ribuan.join('.');
    }

    rupiah = split[1] != undefined ? rupiah + ',' + split[1] : rupiah;
    return prefix == undefined ? rupiah : (rupiah ? 'Rp. ' + rupiah : '');
  }


  helper.rowDataLocal = function(a, b, c, d){
    let tableName = a;
    let id = b;
    let key = c;
    let rowName = d;

    let data = helper.decryptG(helper.localGet(tableName)).filter(function(item){
      if (eval(`item.${key}`) === id) {
        return item;
      }
    })[0];

    let dataS = eval(`data.${rowName}`);

    return dataS;

  }


  helper.monthChoice = function(attribut = "", className = "form-control"){

    let option = `<option value=""> pilih bulan </option>`;

    for (var i = 1; i <= 12; i++) {
      if (helper.sesiGet('bulan') == helper.formatId("00",i)) {
        option += `<option selected value="${helper.formatId("00",i)}">${helper.formatId("00",i)}</option>`;
      }else{
        option += `<option value="${helper.formatId("00",i)}">${helper.formatId("00",i)}</option>`;
      }
    }

    return `

      <select ${attribut} class="${className}">
        ${option}
      </select>

    `;


  }

  helper.formatId = function(a, b){
    var str = "" + b;
    var pad = a;
    var ans = pad.substring(0, pad.length - str.length) + str;

    return ans;
  }

  helper.yearChoice = function(a = 10, attribut = "", className = "form-control"){
    let tahunOpsi = new Date();

      let tahun = tahunOpsi.getFullYear();


      makeList = ``;

      listMakeStart = a;

      for (var i = 0; i <= listMakeStart; i++) {

        let tahunN = tahun - (10 - i);

        if (helper.sesiGet('tahun') == tahunN) {
          makeList += `<option selected >${tahunN}</option>`
        }else{
          makeList += `<option>${tahunN}</option>`
        }


      }


      for (var i = 1; i <= listMakeStart; i++) {

        let tahunN = tahun + i;

        if (helper.sesiGet('tahun') == tahunN) {
          makeList += `<option selected >${tahunN}</option>`
        }else{
          makeList += `<option>${tahunN}</option>`
        }


      }


      let selectN = `
    <select ${attribut} class="${className}">
      ${makeList}
    </select>
      `;

      return selectN;
  }




  helper.printDiv = function(divName) {
    var divToPrint=document.getElementById(divName);

    var newWin=window.open('','Print-Window');

    newWin.document.open();

    newWin.document.write(`
      <html>
        <style type="text/css" media="print">
          @page
          {
            size: auto;
            margin: 0mm;
          }
          body
          {
            background-color:#FFFFFF;
            margin: 20px;
          }
        </style>
        <body onload="window.print()">
          ${divToPrint.innerHTML}
        </body>

      </html>
      `);

    newWin.document.close();

    setTimeout(function(){newWin.close();},10);
  }



  helper.getDataTable = async function(a, b = null){
    let dataA = await helper.localGet(a);
    dataA = await helper.decryptG(dataA);

    dataA = await dataA.filter(function(res){
      if (b != null) {
        if (eval(`res.${b.key}`) === b.value) {
          return res;
        }
      }else{
        return res;
      }
    });

    return dataA;
  }

  helper.optionName = function(a, c){
    let data = helper.decryptG(helper.localGet(c.table));
    let dataF = data.filter(function(item){
      if (eval(`item.${c.id}`) === a) {
        return item;
      }
    })[0];
    if (dataF != undefined) {
      return eval(`dataF.${c.nama}`);
    }else{
      return '';
    }
  }

  helper.option = function(a, b, c){
      let data = helper.decryptG(helper.localGet(a));
      let datab = b;
      let html = `<option value="">pilih data</option>`;

      data.forEach((item) => {
        if (eval(`item.${c.id}`) === datab) {
          html += `<option selected value="${eval(`item.${c.id}`)}">${eval(`item.${c.nama}`)}</option>`;
        }else{
          html += `<option value="${eval(`item.${c.id}`)}">${eval(`item.${c.nama}`)}</option>`;
        }
      });

      return html;
  }

  helper.baseurl = `http://192.168.161.100/accounting_server/accounting_server/data.php?key=`;

  // helper.baseurl = `http://localhost/accounting_server/data.php?key=`;

  helper.createLocalData = async function(a, url){
    if(localStorage.getItem(a) == null){
        var params = new URLSearchParams();
        params.append('table', a);
        let dataAkun = await axios.post(helper.baseurl+url, params)
        .then(res =>{
            console.log(res.data);
            helper.localNew(a, helper.encryptG(res.data));
        });
    }
  }

  helper.template = async function(a){
      let data = await axios.get(a);
      main.html(data.data);
  }

  helper.dateKnow = function(){
      let newDate = new Date();
      let year = newDate.getFullYear();
      let month = (newDate.getMonth() + 1)+ '';
      let day = (newDate.getDate()) + '';
      let format = '00';
      let ansMonth = format.substring(0, format.length - month.length ) + month;
      let ansDay = format.substring(0, format.length - day.length ) + day;
      let dayKnow = year+'-'+ansMonth+'-'+ansDay;
      return dayKnow;
  }

  helper.localNew = function(a, b){
      localStorage.setItem(a, b);
  }

  helper.localGet = function(a){
      return localStorage.getItem(a);
  }

  helper.sesiNew = function(a, b){
      sessionStorage.setItem(a, b);
  }

  helper.sesiGet = function(a){
      return sessionStorage.getItem(a);
  }

  helper.encryptG = function(data){

    let dataB = JSON.stringify(data);
    return CryptoJS.AES.encrypt(dataB, "Secret Passphrase");

  }

  helper.decryptG = function(data){

    return JSON.parse(CryptoJS.AES.decrypt(data, "Secret Passphrase").toString(CryptoJS.enc.Utf8));

  }

  return helper;

});
