define(['jquery', 'main', 'axios', 'helper'], function($, main, axios, helper){

  let form = {};

  form.no = function(a, b = null, c = null, d = null, e = null, f = null, g = null, h = null){
    return `
      <span>
        ${a}
      </span>
    `;
  }

  form.text = function(a, b = null, c = null, d = null, e = null, f = null, g = null, h = null){
    let value = a;
    if (value === null) {
      value = "";
    }
    return `
      <input data-id="${g}" type="text" class="form-control" data-key="${h}" crud-table-update-data table-name="${c}" data-row="${b}" value="${value}" />
    `;
  }

  form.rupiah = function(a, b = null, c = null, d = null, e = null, f = null, g = null, h = null){
    let value = a;
    if (value === null) {
      value = "";
    }
    return `
      <input data-id="${g}" type="text" class="form-control" data-key="${h}" crud-table-update-data table-name="${c}" data-row="${b}" value="${value}" />
    `;
  }

  form.number = function(a, b = null, c = null, d = null, e = null, f = null, g = null, h = null){
    let value = a;
    if (value === null) {
      value = "";
    }
    return `
      <input data-id="${g}" type="number" class="form-control" data-key="${h}" crud-table-update-data table-name="${c}" data-row="${b}" value="${value}" />
    `;
  }

  form.tanggal = function(a, b = null, c = null, d = null, e = null, f = null, g = null, h = null){
    let value = a;
    if (value === null) {
      value = "";
    }
    return `
      <input data-id="${g}" type="text" class="form-control tanggal" data-key="${h}" crud-table-update-data table-name="${c}" placeholder="yyyy-mm-dd" data-row="${b}" value="${value}" />
    `;
  }

  form.select = function(a, b = null, c = null, d = null, e = null, f = null, g = null, h = null){
    let data = {
      id: d,
      nama: e
    }
    return `
      <select data-id="${g}" type="number" data-key="${h}" style="float:left; width: calc(100% - 50px);" crud-table-update-data table-name="${c}" data-row="${b}" class="form-control select2">
        ${helper.option(f, a, data)}
      </select>
      <button modal-show-data table-name="${c}" table-show="${f}">+</button>
    `;
  }

  form.select2 = function(a, b = null, c = null, d = null, e = null, f = null, g = null, h = null){
    let data = {
      id: d,
      nama: e
    }
    return `
      <select data-id="${g}" type="number" data-key="${h}" style="float:left; width: calc(100% - 50px);" crud-table-update-data table-name="${c}" data-row="${b}" class="form-control select2">
        ${helper.option(f, a, data)}
      </select>
      <button modal-show-data table-name="${c}" table-show="${f}">+</button>
    `;
  }

  form.percent = function(a, b = null, c = null, d = null, e = null, f = null, g = null, h = null){
    let value = a;
    if (value === null) {
      value = "";
    }

    let opsi = ``;

    for (var i = 1; i <= 100; i++) {
      if (value == i) {
        opsi += `<option selected value="${i}">${i} %</option>`;
      }else{
        opsi += `<option value="${i}">${i} %</option>`;
      }
    }

    return `
      <select data-id="${g}" type="number" data-key="${h}" crud-table-update-data table-name="${c}" data-row="${b}" class="form-control select2">
        ${opsi}
      </select>
    `;

  }

  form.ppn = function(a, b = null, c = null, d = null, e = null, f = null, g = null, h = null){

    let value = a;
    if (value === null) {
      value = "";
    }

    let opsi = ``;

    let ppn = [0,10]

    for (var i = 0; i < ppn.length ; i++) {
      if (value == ppn[i]) {
        opsi += `<option selected value="${ppn[i]}"> ${ppn[i]} %</option>`;
      }else{
        opsi += `<option value="${ppn[i]}">${ppn[i]} %</option>`;
      }
    }

    return `
      <select data-id="${g}" type="number" data-key="${h}" crud-table-update-data table-name="${c}" data-row="${b}" class="form-control select2">
        ${opsi}
      </select>
    `;
  }

  return form;

})
