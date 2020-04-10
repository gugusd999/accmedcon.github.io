define(['jquery', 'main', 'axios', 'crud', 'helper'], function($, main, axios, crud, helper) {
  let obj2 = {
    view: async function() {
      await helper.createLocalData('data_pembayaran_hutang_barang', 'get-data');
      let data = await axios.get('html/home1.html');
      main.html(data.data);


      let dataTypeTransaksi = helper.decryptG(helper.sesiGet('data-hutang-barang'));

      console.log(dataTypeTransaksi);


      crud.set("data_pembayaran_hutang_barang",{
        key: "id",
        headname: ['No', 'nominal'],
        table: ['id', 'nominal'],
        form: ["no", "text"],
        filter: {
          key: "transaksi_pembelian_barang_id",
          value: dataTypeTransaksi.id
        },
        dataSend: {
          transaksi_pembelian_barang_id: dataTypeTransaksi.id
        },
        listData: [
          null,
          null,
          null,
          null,
          null
          // {
          //   id: 'id',
          //   nama: 'nama',
          //   table: 'akun'
          // }
        ],
        width: ["50px", "", "", "", ""],
        domp: 'crud'
      })
      

      crud.view("data_pembayaran_hutang_barang");
    }
  }
  return obj2;
})
