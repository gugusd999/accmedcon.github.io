define(['jquery', 'main', 'axios', 'crud', 'crud3', 'helper', 'crudtransaksi'], function($, main, axios, crud, crud3, helper, crudtransaksi) {

  const transaksiUmum3 = {}

  transaksiUmum3.view = async function() {
    await helper.createLocalData2('data_barang', 'get-table-data');
    await helper.createLocalData('data_pembelian_barang', 'get-data');

    await helper.template('html/transaksi4.html');

    let dataTypeTransaksi = helper.decryptG(helper.sesiGet('data-type-transaksi-umum'));

    console.log(dataTypeTransaksi);

    crud3.set("data_barang",{
      key: "id",
      headname: ['No', 'Nama Barang', 'Jenis Barang', 'Kategori Barang', 'Satuan'],
      table: ['id', 'nama_barang', 'status_barang_id', 'status_barang_2_id', 'satuan_id'],
      form: ["no", "text", "select", "select", "select"],
      listData: [
        null,
        null,
        {
            id: 'id',
            nama: 'status_barang',
            table: 'status_barang'
        },
        {
            id: 'id',
            nama: 'status',
            table: 'status_barang_2'
        },
        {
            id: 'id',
            nama: 'satuan',
            table: 'data_satuan'
        }
        // {
          //   id: 'id',
          //   nama: 'nama',
          //   table: 'akun'
          // }
        ],
        width: ["50px", "200px", "", "", ""],
      })

    crudtransaksi.set("data_pembelian_barang",{
      key: "id",
      headname: ['No', 'Barang', 'Pajak PPN Masukan', 'Jumlah', 'Harga Satuan', 'Harga Total'],
      table: ['id', 'barang_id', 'pajak_ppn_masukan', 'jml', 'harga_satuan', 'pajak_ppn_masukan'],
      form: ["no", 'select', 'ppn', 'text', 'text', 'no'],
      perhitungan: ['no', 'no', 'no', 'no', 'no', 'multipiclation'],
      filter: {
        key: "transaksi_pembelian_barang_id",
        value: dataTypeTransaksi.id
      },
      dataSend: {
        transaksi_pembelian_barang_id: dataTypeTransaksi.id
      },
      listData: [
        null,
        {
          id: 'id',
          nama: 'nama_barang',
          table: 'data_barang'
        },
        null,
        null,
        null,
        null
      ],
      width: ["50px", "", "", "", "", ""],
      domp: 'crud'
    })

    crudtransaksi.view("data_pembelian_barang");

  }

  return transaksiUmum3;

})
