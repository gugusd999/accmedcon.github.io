define(['jquery', 'main', 'axios', 'crud', 'helper'], function($, main, axios, crud, helper) {

  const permintaan_sj = {}

  permintaan_sj.view = async function(a = "sjp") {
    if (a === "sjp") {

      await helper.createLocalData('tbl_permintaan_sjp', 'get-data');
      await helper.template('html/order2.html');

      let dataTypeTransaksi = helper.decryptG(helper.sesiGet('permintaan_sjp'));

      console.log(dataTypeTransaksi);

      crud.set("tbl_permintaan_sjp",{
        key: "id",
        headname: ['No', 'Barang', 'jml'],
        table: ['id', 'data_barang_id', 'jml'],
        form: ["no", "select", "text", "text"],
        filter: {
          key: "permintaan_sjp_id",
          value: dataTypeTransaksi.id
        },
        dataSend: {
          permintaan_sjp_id: dataTypeTransaksi.id
        },
        listData: [
          null,
          {
            id: 'id',
            nama: 'nama_barang',
            table: 'data_barang'
          },
          null,
          null
          // {
          //   id: 'id',
          //   nama: 'nama',
          //   table: 'akun'
          // }
        ],
        width: ["50px", "", "", ""],
        domp: 'crud'
      })

      crud.view("tbl_permintaan_sjp");
    }

    if (a === "pengeluaran_barang") {

      await helper.createLocalData('permintaan_pengeluaran_barang', 'get-data');
      await helper.template('html/order2.html');

      let dataTypeTransaksi = helper.decryptG(helper.sesiGet('pengeluaran_barang'));

      console.log(dataTypeTransaksi);

      crud.set("permintaan_pengeluaran_barang",{
        key: "id",
        headname: ['No', 'Barang', 'jml'],
        table: ['id', 'data_barang_id', 'jml'],
        form: ["no", "select", "text", "text"],
        filter: {
          key: "pengeluaran_barang_id",
          value: dataTypeTransaksi.id
        },
        dataSend: {
          pengeluaran_barang_id: dataTypeTransaksi.id
        },
        listData: [
          null,
          {
            id: 'id',
            nama: 'nama_barang',
            table: 'data_barang'
          },
          null,
          null
          // {
          //   id: 'id',
          //   nama: 'nama',
          //   table: 'akun'
          // }
        ],
        width: ["50px", "", "", ""],
        domp: 'crud'
      })

      crud.view("permintaan_pengeluaran_barang");
    }

  }

  return permintaan_sj;
})
