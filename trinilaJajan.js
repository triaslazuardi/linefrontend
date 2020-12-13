function loadCatatan(){
    if(localStorage.list_data && localStorage.id_data){
        list_data = JSON.parse(localStorage.getItem('list_data'));
        var data_app = "";
        if(list_data.length > 0){
            data_app = '<table class="table table-striped table-dark">';
            data_app += '<thead>' + 
                '<th>ID</th>' +
                '<th>Nama</th>' +
                '<th>Tanggal</th>' +
                '<th>Agenda</th>' +
                '<th>Hapus Agenda</th>' +
                '<th>Lihat Agenda</th>' +
                '<th>Edit Agenda</th>' +
                '</thead> <tbody>'
            ;

            for(i in list_data){
                data_app = '<tr>';
                data_app += '<td>' + list_data[i].id_data + ' </td>' +
                '<td>' + list_data[i].nama + ' </td>' +
                '<td>' + list_data[i].tanggal + ' </td>' +
                '<td>' + list_data[i].agenda + ' </td>' +
                '<td><a class="btn btn-danger btn-small" href="javascript:void(0)" onclick="hapusData(\'' + list_data[i].id_data + '\')">Hapus</a></td>' +
                '<td><a class="btn btn-danger btn-small" href="javascript:void(0)" onclick="lihatData(\'' + list_data[i].id_data + '\')">Lihat</a></td>' +
                '<td><a class="btn btn-warning btn-small" href="javascript:void(0)" onclick="editData(\'' + list_data[i].id_data + '\')">Edit</a></td>'
                ;
                data_app += '</tr>'; 
            }

            data_app += '</tbody></table>';
        }
    }else{
        data_app = "Catatan masih kosong nih";
    }

    $('#list-catatan').html(data_app);
    $('#list-catatan').hide();
    $('#list-catatan').fadeIn(100);
}

function editData(id){
    if(localStorage.list_data && localStorage.id_data){
        list_data = JSON.parse(localStorage.getItem('list_data'));
        idx_data = 0;

        for(i in list_data){
            if (list_data[i].id_data == id) {
                $("#eid_data").val(list_data[i].id_data);
                $("#enama").val(list_data[i].nama);
                $("#etanggal").val(list_data[i].tanggal);
                $("#eagenda").val(list_data[i].agenda);
                list_data.splice(idx_data, 1);
            }
            idx_data++;
        }

        gantiMenu('edit-data');
    }
}

function lihatData(id){
    if (localStorage.list_data && localStorage.id_data) {
        list_data = JSON.parse(localStorage.getItem('list_data'));
        idx_data = 0;
        for (i in list_data) {
            if (list_data[i].id_data == id) {
                $("#lid_data").val(list_data[i].id_data);
                $("#lnama").val(list_data[i].nama);
                $("#ltanggal").val(list_data[i].tanggal);
                $("#lagenda").val(list_data[i].agenda);
                list_data.splice(idx_data, 1);
            }
            idx_data++;
        }
        gantiMenu('lihat-data');
    }
}


// mengirimkan pesan setiap kali pengguna membuat catatan baru, menyimpan catatan yang telah diubah, dan menghapus catatan. Kembalilah ke script catatan-config.js kemudian tambahkan method liff.sendMessage() pada function simpanData(), function simpanEditData(), dan function hapusData() seperti di bawah ini:
function simpanData(){

    if (!liff.isInClient()) {
        sendAlertIfNotInClient();
    } else {
        liff.sendMessages([{
            'type': 'text',
            'text': "Catatan baru berhasil disimpan"
        }]).then(function() {
            alert('Catatan Tersimpan');
        }).catch(function(error) {
            alert('Aduh kok error ya...');
        });
    }

    nama = $('#nama').val();
    tanggal = $('#tanggal').val();
    agenda = $('#agenda').val();
 
    if (localStorage.list_data && localStorage.id_data) {
        list_data = JSON.parse(localStorage.getItem('list_data'));
        id_data = parseInt(localStorage.getItem('id_data'));
    }
    else {
        list_data = [];
        id_data = 0;
    }

    id_data++;
    list_data.push({ 'id_data': id_data, 'nama': nama, 'tanggal': tanggal, 'agenda': agenda });
    localStorage.setItem('list_data', JSON.stringify(list_data));
    localStorage.setItem('id_data', id_data);
    document.getElementById('form-data').reset();
    gantiMenu('list-catatan');

    return false;
}

function simpanEditData(){
    // Sebelum sendMessages dijalankan, sistem akan mengecek apakah aplikasi catatan sederhana dijalankan di eksternal browser atau tidak. Apabila dijalankan pada browser maka fitur sendMessages tidak dapat digunakan. Namun, apabila dijalankan di LINE berdasarkan kode di atas, sendMessages yang dijalankan akan mengirim pesan bertipe text dengan isi “Anda telah menggunakan fitur Send Message!”. Sehingga menampilkan notifikasi alert yang menunjukkan bahwa pengguna telah berhasil menggunakan fitur sendMessages.
    if (!liff.isInClient()) {
        sendAlertIfNotInClient();
    } else {
        liff.sendMessages([{
            'type': 'text',
            'text': "Catatan yang diedit sudah tersimpan"
        }]).then(function() {
            alert('Catatan tersimpan');
        }).catch(function(error) {
            alert('Aduh kok error ya...');
        });
    }

    id_data = $('#eid_data').val();
    nama = $('#enama').val();
    tanggal = $('#etanggal').val();
    agenda = $('#eagenda').val();
 
    list_data.push({ 'id_data': id_data, 'nama': nama, 'tanggal': tanggal, 'agenda': agenda });
    localStorage.setItem('list_data', JSON.stringify(list_data));
    document.getElementById('eform-data').reset();
    gantiMenu('list-catatan');
 
    return false;
}

function hapusData(id){
    if (localStorage.list_data && localStorage.id_data) {
        list_data = JSON.parse(localStorage.getItem('list_data'));
 
        idx_data = 0;
        for (i in list_data) {
            if (list_data[i].id_data == id) {
                list_data.splice(idx_data, 1);
            }
            idx_data++;
        }
 
        localStorage.setItem('list_data', JSON.stringify(list_data));
        loadCatatan();
    }
}

function gantiMenu(menu){
    if (menu == "list-catatan") {
        loadCatatan();
        $('#tambah-catatan').hide();
        $('#list-catatan').fadeIn();
        $('#edit-data').hide();
        $('#lihat-data').hide();
    }
    else if (menu == "tambah-catatan") {
        $('#tambah-catatan').fadeIn();
        $('#list-catatan').hide();
        $('#edit-data').hide();
        $('#lihat-data').hide();
    } else if (menu == "edit-data") {
        $('#edit-data').fadeIn();
        $('#tambah-catatan').hide();
        $('#list-catatan').hide();
        $('#lihat-data').hide();
    } else if (menu == "lihat-data") {
        $('#lihat-data').fadeIn();
        $('#edit-data').hide();
        $('#tambah-catatan').hide();
        $('#list-catatan').hide();
    }
}

