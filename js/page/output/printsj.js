define(['jquery', 'main', 'axios', 'helper', 'live'], function(
  $, main, axios, helper, live
){
    let obj = {}

    // panggil template laporan
    obj.view = async function(a){
      // tampilkan view dong

      await helper.createLocalData2('tbl_permintaan_sj', 'get-table-data');

      await helper.createLocalData2('data_barang', 'get-table-data');

      live('tbl_permintaan_sj');

      await helper.createLocalData2('customer', 'get-table-data');

      await helper.createLocalData2('data_satuan', 'get-table-data');

      let view = await axios.get('html/laporan/suratjalan.html');
      main.html(view.data);

      let {awal, akhir} = helper.tanggal();



      let dataPrint = helper.decryptG(helper.sesiGet('dataprint'));

      let {id, no_permintaan, customer_id, up, telp, date, status_id} = dataPrint;


      let data_barang = helper.callData('data_barang');

      let barang = helper.callData('tbl_permintaan_sj');

      let data_satuan = helper.callData('data_satuan');

      let customer = helper.callData('customer').filter((item, i) => {
        if (item.id === customer_id) {
          return item;
        }
      })[0];

      // console.log(customer);

      let htmlTab = ``;

      let idSj = id;

      barang.filter((item, i) =>{
        let {id, permintaan_sj_id, data_barang_id, jml} = item;
        if (permintaan_sj_id === idSj) {
          return item;
        }
      }).forEach((item, i) => {
        let {id, data_barang_id, jml} = item;
        console.log(item);

        let getting = data_barang.filter((item, i) => {
          let {id} = item;
          if (id === data_barang_id) {
            return item;
          }
        })[0];

        let satuan = data_satuan.filter((item, i) => {
          let {id} = item;
          if (id === getting.satuan_id) {
            return item;
          }
        })[0];

        htmlTab += `
          <tr>
            <td>${jml}</td>
            <td>${getting.nama_barang}</td>
            <td>${satuan.satuan}</td>
          </tr>
        `;
      });

      let html = `
      <div style="width: 210mm; border: 1px solid black; padding: 10px;">
      <style>
      .table-border, .table-no-border{
        border-collapse: collapse;
        width: 100%;
      }

      .table-border th,
      .table-no-border th
      {
        text-align: center;
      }

      .table-no-border th, .table-no-border td{
        padding: 5px;
      }

      .table-border th, .table-border td{
        padding: 5px;
        border: 1px solid #dfdfdf;
      }

      .border{
        border: 1px solid #dfdfdf;
      }
      </style>
        <table class="table-no-border">
          <thead>
            <tr>
              <td colspan="6">PT SINARMED JAYA</td>
              <td width="200px">Hal 1/1 SURAT JALAN</td>
            </tr>
            <tr>
              <td colspan="6">Jl. Taman Borobudur Indah Block B 15 C</td>
              <td rowspan="5">
                <div style="min-height: 160px; padding: 10px; border: 1px solid black;">
                  <p>Kepada Yth.</p>
                  <p>${customer.nama},</p>
                  <p>${customer.alamat},</p>
                  <p>${customer.tlpn},</p>
                </div>
              </td>
            </tr>
            <tr>
              <td colspan="6">Blimbing, Malang, Indonesia 65142</td>
            </tr>
            <tr>
              <td colspan="6">Telp : 0341-492294</td>
            </tr>
            <tr>
              <td width="80px">No.</td>
              <td width="5px">:</td>
              <td width="150px">${no_permintaan}</td>
              <td width="120px">Tanggal</td>
              <td width="5px">:</td>
              <td width="150px">${date}</td>
            </tr>
            <tr>
              <td width="80px">No. PO</td>
              <td width="5px">:</td>
              <td width="150px">${no_permintaan}</td>
              <td width="120px">Tanggal PO</td>
              <td width="5px">:</td>
              <td width="150px">${date}</td>
            </tr>
          </thead>
          <tbody>
          </tbody>
        <table>
        <table class="table-border">
          <thead>
            <tr>
            <th>Jumlah</th>
            <th>Satuan</th>
            <th>Nama Barang</th>
          </tr>
          </thead>
          <tbody>
            ${htmlTab}
          </tbody>
        <table>
        <table class="table-no-border">
          <thead>
            <tr>
              <th>Ditrima oleh,</th>
              <th>Pengirim</th>
              <th>Hormat Kami,</th>
            </tr>
            <tr>
              <th style="padding: 20px;"></th>
              <th style="padding: 20px;"></th>
              <th style="padding: 20px;"></th>
            </tr>
            <tr>
              <th style="padding: 20px;"></th>
              <th style="padding: 20px;"></th>
              <th style="padding: 20px;"></th>
            </tr>
            <tr>
              <th style="padding: 20px;"></th>
              <th style="padding: 20px;"></th>
              <th style="padding: 20px;"></th>
            </tr>
            <tr>
              <th>...............................</th>
              <th>...............................</th>
              <th>LUCY</th>
            </tr>
          </thead>
          <tbody>

          </tbody>
        <table>
      <div>
      `;

      $('body #jurnal').html(html);

    }

    return obj;

})
