define(['jquery', 'main', 'axios', 'crud', 'helper', 'select2', 'terbilang', 'live'], function($, main, axios, crud, helper, select2, angkaTerbilang, live) {
  let bkkP = null;
  let bkkP2 = null;
  let dataB = "";
  let obj2 = {}


  obj2.persediaan = async function(a = null) {
    live('data_barang');
    live('data_pembelian_barang');
    live('status_barang');
    console.log('selamat datan di persediaan');


    // tampilkan view dong
    let view = await axios.get('html/laporan/persediaan.html');
    main.html(view.data);

    // dapatkan jenis persediaan
    let jenis_persediaan_list = `<option> Pilih </option>`;

    let jenis_persediaan = helper.decryptG(helper.localGet('status_barang'));
    // console.log(jenis_persediaan);
    let optJp = jenis_persediaan.map((item, i) => {
      let {id, status_barang} = item;
      let html = `<tr>`;
      if (a === null) {
        if (i === 0) {
          html += `<option selected value="${id}">${status_barang}</option>`;
        }else{
          html += `<option value="${id}">${status_barang}</option>`;
        }
      }else{
        if (a === id) {
          html += `<option selected value="${id}">${status_barang}</option>`;
        }else{
          html += `<option value="${id}">${status_barang}</option>`;
        }
      }
      return {
        html: html,
        id: id
      }
    });

    optJp.forEach((item, i) =>{
      jenis_persediaan_list += item.html;
    })

    let fistIdoptJp = optJp[0].id;

    if (a != null) {
      fistIdoptJp = a;
    }

    console.log(fistIdoptJp);

    let listJenisPersediaan = `
      <select go-to-persediaan class="form-control" style="max-width:200px; display: inline-block;">
        ${jenis_persediaan_list}
      </select>
    `;

    // tampilakan pilihan

    $("body #pilihan").html(listJenisPersediaan)


    // persediaan

    let persediaan = helper.decryptG(helper.localGet('data_barang'));

    let table_persediaan = ``;
    let table_persediaan_total_stock = 0;

     persediaan.filter((item, i) => {
       let {id, nama_barang, status_barang_id, status_barang_2_id, satuan_id, stok} = item;
       if (status_barang_id === fistIdoptJp) {
         return item;
       }
     }).map((item, i) =>{
       let {id, nama_barang, status_barang_id, status_barang_2_id, satuan_id, stok} = item;

       let dataBarangdiBeli =  helper.decryptG(helper.localGet('data_pembelian_barang'));

       let barangId = id;


       let totalB = 0;

       if (stok != null) {
         totalB = stok;
       }

       dataBarangdiBeli.forEach((itemS, i) =>{
         let {id, barang_id, jml} = itemS;
         if (barang_id === barangId) {
           totalB += jml;
         }
       });

       // console.log(status_barang_id);
       let html = `<tr>`;
       html += `<td>${i+1}</td>`;
       html += `<td>${nama_barang}</td>`;
       html += `<td style="text-align: right;">${totalB}</td>`;
       html += `</tr>`;
       return {
         html: html,
         total: totalB
       };
    }).forEach((item, i) => {
      table_persediaan += item.html;
      table_persediaan_total_stock += Number(item.total);
      // console.log(item.total);
    })

    // console.log(table_persediaan_total_stock);

    // buat table dong
    let table =  `
      <div style="width: 210mm;">
        <div style="text-align: center;">
          <h1>Persediaan</h1>
        </div>

        <style>
            .table-border, .table-no-border{
              border-collapse: collapse;
              width: 100%;
            }

            .table-no-border th, .table-no-border td{
              padding: 5px;
            }

            .table-border th, .table-border td{
              padding: 5px;
              border: 1px solid #dfdfdf;
            }

            th{
              text-align: center;
            }

            .border{
              border: 1px solid #dfdfdf;
            }
        </style>

        <table class="table-border">
          <thead>
            <tr>
              <th>No</th>
              <th>Nama Barang</th>
              <th>Total</th>
            </tr>
          </thead>
          <tbody>
            ${table_persediaan}
            <tr>
              <td colspan="2" style="text-align: center;">Total</td>
              <td style="text-align: right;">${table_persediaan_total_stock}</td>
            <tr>
          </tbody>
        <table>
      </div>
    `;

    // tampilkan table
    $('body #jurnal').html(table);

  }

  obj2.view = async function() {
      await this.persediaan();
  }

  return obj2;

})
