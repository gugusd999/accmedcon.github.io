define(['jquery', 'main', 'axios', 'crud', 'helper'], function($, main, axios, crud, helper) {

  const permintaan_sj = {}

  permintaan_sj.view = async function() {
    await helper.createLocalData('tbl_permintaan_sj', 'get-data');
    await helper.template('html/order2.html');

    let dataTypeTransaksi = helper.decryptG(helper.sesiGet('permintaan_sj'));

    console.log(dataTypeTransaksi);

    crud.set("tbl_permintaan_sj",{
      key: "id",
      headname: ['No', 'Barang', 'jml', 'Harga'],
      table: ['id', 'data_barang_id', 'jml', 'bsu'],
      form: ["no", "select", "text", "text"],
      filter: {
        key: "permintaan_sj_id",
        value: dataTypeTransaksi.id
      },
      dataSend: {
        permintaan_sj_id: dataTypeTransaksi.id
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

    crud.view("tbl_permintaan_sj");

  }

  return permintaan_sj;
})
