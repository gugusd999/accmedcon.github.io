define(['jquery', 'axios', 'form', 'helper', 'live', 'select2', 'jQueryInputmask'], function($, axios, form, helper,  live, select2){

  let crud = {};

  crud.tableData = [];

  crud.set = function(name, data){
    crud.tableData.push({
      nama: name,
      data:data
    });
  }

  crud.view = async function(a = null){

    live(a);

    let crudAct = await crud.tableData.filter(function(res){

      if (res.nama === a) {
        return res;
      }

    })[0];

    let crudData = await crudAct.data;

    crudData.tablename = a;

    let html = `

        <style>
          th{
            text-align: center;
          }

        </style>

    `;

    html +=  `<button table-name="${a}" go-crud-edit-duo class="btn btn-primary btn-sm mb-3">Ubah</button>`;

    html +=  `<table id="${a}" class="table table-bordered" style="min-width: 100%;">`;
    html +=  `<thead>`;
    html +=  `<tr class="text-white" style="background-color: #DA251C;">`;
    crudData.headname.forEach((res) => {
      html +=  `<th>`;
        html +=  res;
      html +=  `</th>`;
    });
    if(crudData.customeButtonDataView === true){
      html +=  `<th>`;
        html +=  `#`;
      html +=  `</th>`;
    }
    html +=  `</tr>`;
    html +=  `</thead>`;
    html +=  `<tbody>`;

    let dataIsiTable = await helper.getDataTable(a, crudData.filter);

    function compare( a, b ) {
        if ( a.tanggal_transaksi < b.tanggal_transaksi ){
            return -1;
        }
        if ( a.tanggal_transaksi > b.tanggal_transaksi ){
            return 1;
        }
        return 0;
    }

    let objk = dataIsiTable.sort( compare );


    console.log(objk);

    let numero = 1;
    let dateTerakhir = ``;
    let noTransaksi = 1;
    objk.forEach((item) => {
      html +=  `<tr>`;
      let number = 0;
      crudData.table.forEach((res) => {
        if (crudData.headname[number] === 'Tanggal Transaksi') {
          if (dateTerakhir === '') {
            dateTerakhir = eval(`item.${res}`);
          }else{
            if (dateTerakhir === eval(`item.${res}`)) {
              dateTerakhir = eval(`item.${res}`);
            }else{
              dateTerakhir = eval(`item.${res}`);
              noTransaksi += 1;
            }
          }
        }

        let data1 = 0;
        let jlm = 0;
        let hargas = 0;

        if (crudData.headname[number] === 'No Bukti Transaksi') {
          html +=  `<td style="min-width:${crudData.width[number]}; max-width:${crudData.width[number]}; width:${crudData.width[number]};">`;
          html += eval(`item.${res}`)+'-'+noTransaksi;
          html +=  `</td>`;
        }else if(crudData.headname[number] === 'Pajak PPN Masukan'){
          data1 = Number(eval(`item.${res}`))/100;
          html +=  `<td style="min-width:${crudData.width[number]}; max-width:${crudData.width[number]}; width:${crudData.width[number]};">`;
          html += eval(`item.${res}`)+' %';
          html +=  `</td>`;
        }else if(crudData.headname[number] === 'Harga Total'){
          console.log(item);
          html +=  `<td style="min-width:${crudData.width[number]}; max-width:${crudData.width[number]}; width:${crudData.width[number]}; text-align: right;">`;
          html +=  '<span style="float: left;">Rp</span> '+helper.formatRupiah((Number(item.harga_satuan) * Number(item.jml)) - (Number(item.harga_satuan) * Number(item.jml) * Number(item.pajak_ppn_masukan) / 100));
          html +=  `</td>`;
        }else{
          if (number === 0) {
            html +=  `<td style="min-width:${crudData.width[number]}; max-width:${crudData.width[number]}; width:${crudData.width[number]};">`;
            html +=  numero;
            html +=  `</td>`;
          }else{
            if (crudData.form[number] === "select") {
              html +=  `<td  style="min-width:${crudData.width[number]}; max-width:${crudData.width[number]}; width:${crudData.width[number]};">`;
              html +=  helper.optionName(eval(`item.${res}`), crudData.listData[number]);
              html +=  `</td>`;
            }else if(crudData.form[number] === "rupiah"){
              html +=  `<td  style="min-width:${crudData.width[number]}; max-width:${crudData.width[number]}; width:${crudData.width[number]}; text-align: right;">`;
              html +=  '<span style="float: left;">Rp </span>'+helper.formatRupiah(Math.ceil(Number(eval(`item.${res}`))));
              html +=  `</td>`;
            }else if(crudData.form[number] === "tanggal"){
              html +=  `<td  style="min-width:${crudData.width[number]}; max-width:${crudData.width[number]}; width:${crudData.width[number]}; text-align: center;">`;
              html +=  helper.tanggal(eval(`item.${res}`)).sekarang;
              html +=  `</td>`;
            }else{

              let nilaiNull = eval(`item.${res}`);
              if (nilaiNull === null) {
                nilaiNull = 'N/A';
              }

              html +=  `<td  style="min-width:${crudData.width[number]}; max-width:${crudData.width[number]}; width:${crudData.width[number]};">`;
              html +=  nilaiNull;
              html +=  `</td>`;
            }
          }
        }
        number++;
      });

      if(crudData.customeButtonDataView === true){
        html +=  `<td>`;
          html +=  `<button crud-view-data-on-hide data-key="${crudData.customeButtonViewData}" data-go="${crudData.customeButtonViewGo}" data-keep="${helper.encryptG(item)}" class="btn" style="background-color: #0066D5; color: white;">Tampilkan</button>`;
        html +=  `</td>`;
      }

      html +=  `</tr>`;
      numero++;
    });

    html +=  `</tbody>`;
    html +=  `</table>`;



    document.querySelector(`#${crudData.domp}`)
    .innerHTML = html;

    $(`#${a}`).DataTable({
        "scrollX": true
    });


  }

  crud.edit = async function(a = null){

    let crudAct = crud.tableData.filter(function(res){
      if (res.nama === a) {
        return res;
      }
    })[0];

    let crudData = crudAct.data;

    let dataIsiTable = await helper.getDataTable(a, crudData.filter);

    let dataSend = "";

    if (crudData.dataSend != undefined) {
      dataSend = helper.encryptG(crudData.dataSend);
    }

    crudData.tablename = a;

    let html = ``;

    html +=  `<button table-name="${a}" go-back-crud-view-duo class="btn btn-default btn-sm mb-3 mr-3">Kembali</button>`;
    html +=  `<button table-name="${a}" data-send="${dataSend}" tambah-data-baru-crud-duo class="btn btn-primary btn-sm mb-3">Tambah</button>`;

    html +=  `<table id="${a}" class="table" style="min-width: 100%;">`;
    html +=  `<thead>`;
    html +=  `<tr  class="text-white" style="background-color: #DA251C;">`;
    crudData.headname.forEach((res) => {
      if (res === 'No') {
        html +=  `<th>`;
        html +=  'Id';
        html +=  `</th>`;
      }else if(res === 'Harga Total'){
      }else{
        html +=  `<th>`;
        html +=  res;
        html +=  `</th>`;
      }
    });
    html +=  `<th>#</th>`;
    html +=  `</tr>`;
    html +=  `</thead>`;
    html +=  `<tbody>`;



    function compare( a, b ) {
        if ( a.tanggal_transaksi < b.tanggal_transaksi ){
            return -1;
        }
        if ( a.tanggal_transaksi > b.tanggal_transaksi ){
            return 1;
        }
        return 0;
    }

    let objk = dataIsiTable.sort( compare );


    let numero = 1;
    let dateTerakhir = ``;
    let noTransaksi = 1;
    objk.forEach((item) => {
      html +=  `<tr>`;
      let number = 0;
      crudData.table.forEach((res) => {

        if (crudData.headname[number] === 'Tanggal Transaksi') {
          if (dateTerakhir === '') {
            dateTerakhir = eval(`item.${res}`);
          }else{
            if (dateTerakhir === eval(`item.${res}`)) {
              dateTerakhir = eval(`item.${res}`);
            }else{
              dateTerakhir = eval(`item.${res}`);
              noTransaksi += 1;
            }
          }
        }

        let dataO = crudData.listData[number];

        console.log(dataO);

        let id = null;
        let nama = null;
        let table = null;
        if (dataO != null) {
          id = dataO.id;
          nama = dataO.nama;
          table = dataO.table;
        }

        if (crudData.headname[number] === 'No Bukti Transaksi') {
          html +=  `<td style="min-width:${crudData.width[number]}; max-width:${crudData.width[number]}; width:${crudData.width[number]};">`;

          console.log(res);

          html +=  eval(`
            form.${crudData.form[number]}(item.${res}+'-'+noTransaksi, "${res}", "${crudData.tablename}"
            , "${id}", "${nama}", "${table}", "${eval(`item.${crudData.key}`)}", "${crudData.key}")
            `);
            html +=  `</td>`;

        }else if(crudData.headname[number] === 'Harga Total'){
        }else{
          html +=  `<td style="min-width:${crudData.width[number]}; max-width:${crudData.width[number]}; width:${crudData.width[number]};">`;

          console.log(res);

          html +=  eval(`
            form.${crudData.form[number]}(item.${res}, "${res}", "${crudData.tablename}"
            , "${id}", "${nama}", "${table}", "${eval(`item.${crudData.key}`)}", "${crudData.key}")
            `);
            html +=  `</td>`;

        }

        number++;
      });

      html +=  `<td width="80px"><button table-name="${crudData.tablename}" data-key="${crudData.key}" crud-data-hapus-duo data-id="${eval(`item.${crudData.key}`)}" class="btn btn-danger">Hapus</button></td>`;

      html +=  `</tr>`;
    });

    html +=  `</tbody>`;
    html +=  `</table>`;

    html +=  `

    <div id="modal-${a}" class="gg-modal">
      <div id="id01" class="gg-modal-container">
      <div class="row">
        <div class="col-sm-12">
          <div class="card relative">
            <div class="card-header">
              <span close-modal master="${a}" class="top-right">&times;</span>
              <h2>Modal Header</h2>
            </div>
            <div class="modal-body" id="include-master-data">

            </div>
            <div class="card-footer">
              <p>Modal Footer</p>
            </div>
          </div>
        </div>
      </div>
    </div>
    </div>
  </div>

    `;

    document.querySelector(`#${crudData.domp}`)
    .innerHTML = html;

    $(`#${a}`).DataTable({
        "order": [[ 0, "desc" ]],
        "scrollX": true
    });

    $("body .tanggal").inputmask({mask: "9999-99-99"});


    $("body .select2").select2();

  }

  return crud;

})
