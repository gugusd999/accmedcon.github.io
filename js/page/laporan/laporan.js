define(['jquery', 'main', 'axios', 'crud', 'helper'], function($, main, axios, crud, helper) {
  let obj2 = {
    view: async function() {
      await helper.createLocalData('type_barang', 'get-data');
      await helper.createLocalData('metode_pembayaran', 'get-data');
      await helper.createLocalData2('data_barang', 'get-table-data');
      await helper.createLocalData('status_barang', 'get-data');
      await helper.createLocalData('status_barang_2', 'get-data');
      await helper.createLocalData('debit_kredit', 'get-data');
      await helper.createLocalData('type_akun', 'get-data');
      await helper.createLocalData('akun', 'get-data');
      await helper.createLocalData('supplier', 'get-data');
      await helper.createLocalData('data_vendor', 'get-data');
      await helper.createLocalData('data_satuan', 'get-data');
      await helper.createLocalData('customer', 'get-data');
      await helper.createLocalData('data_laporan', 'get-data');
      await helper.createLocalData('kelompok_penyusutan', 'get-data');
      await helper.createLocalData('transaksi_pengeluaran_umum', 'get-data');
      await helper.createLocalData('transaksi_pembelian_barang', 'get-data');
      await helper.createLocalData('transaksi_pengeluaran', 'get-data');
      await helper.createLocalData('tbl_permintaan_sjp', 'get-data');
      await helper.createLocalData('tbl_permintaan_sj', 'get-data');
      await helper.createLocalData('tbl_permintaan_po_fres', 'get-data');
      await helper.createLocalData('kelompok_penyusutan', 'get-data');
      await helper.createLocalData('data_pembelian_barang', 'get-data');

      let data = await axios.get('html/laporan.html');
      main.html(data.data);
    }
  }

  return obj2;
})
