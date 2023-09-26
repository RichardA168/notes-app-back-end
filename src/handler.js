const { nanoid } = require('nanoid');//---> pihak ketiga, ini library, tanya chatgpt kalau bingung
const notes = require('./notes');//---------> bikin note push buat masukkan nilai

const addNoteHandler = (request, h) => { //------->fungsi handler
    const { title, tags, body } = request.payload; //--------->client ngirim catatan disini pakai request.payload

    const id = nanoid(16);//------> ini pihak ketiga(library), punya string 16, cek di notepad kriteria proyek lebih lanjut
    const createdAt = new Date().toISOString();//------> nambah catatan baru pakai date().toISOString()
    const updatedAt = createdAt;

    //bikin note push buat masukkan nilai
    const newNote = {
        title, tags, body, id, createdAt, updatedAt,
    };

    notes.push(newNote);//------> metode push

    const isSuccess = notes.filter((note) => note.id === id).length > 0;//------> menentukan newNote masuk ke array notes atau belum?

    //menentukan response yg diberikan server
    if (isSuccess) {

        const response = h.response({//------> method response
          status: 'success',
          message: 'Catatan berhasil ditambahkan',
          data: {
            noteId: id,
          },
        });
        response.code(201);
        return response;
      }

      const response = h.response({//------> method response
        status: 'fail',
        message: 'Catatan gagal ditambahkan',
      });
      response.code(500);
      return response;
};

const getAllNotesHandler = () => ({ //------------> bikin fungsi utk ambil semua notes
  status: 'success',
  data: {
    notes,
  },
});

const getNoteByIdHandler = (request, h) => { //--------> maksud dri fungsi ini adalah guna mengambil id note yang telah dibuat, misal sdh kebuat id 1, jika kita pencet notenya tidak akan hilang, melainkan bisa membuka detail note tsb
  const { id } = request.params; //----------------------> ambil id

  const note = notes.filter((n) => n.id === id)[0];//----------------------> id yg sdh diambil, bisa mendapatkan objek note dgn id dari objek array notes pakek filter()

  //dibawah ini gunanya memastikan biar note tidak bernilai undefined
  if (note !== undefined) {
    return {
      status: 'success',
      data: {
        note,
      },
    };
  }

  const response = h.response({
    status: 'fail',
    message: 'Catatan tidak ditemukan',
  });
  response.code(404);
  return response;

};

const editNoteByIdHandler = (request, h) => {
  const { id } = request.params;
 
  const { title, tags, body } = request.payload;
  const updatedAt = new Date().toISOString();
 
  const index = notes.findIndex((note) => note.id === id); //-------------> dapatkan dulu index array pada objek catatan sesuai id yang ditentukan pake method findIndex()

  if (index !== -1) { //-------------> Bila note dengan id yang dicari ditemukan, index akan bernilai array index dari objek catatan yang dicari
    notes[index] = {
      ...notes[index],
      title,
      tags,
      body,
      updatedAt,
    };

  //Namun, bila tidak ditemukan, index akan bernilai -1. Jadi, kita bisa menentukan gagal atau tidaknya permintaan dari nilai index menggunakan if else
  const response = h.response({
    status: 'success',
    message: 'Catatan berhasil diperbarui',
  });
  response.code(200);
  return response;
  }
  
  const response = h.response({
    status: 'fail',
    message: 'Gagal memperbarui catatan. Id tidak ditemukan',
  });
  response.code(404);
  return response;

};

const deleteNoteByIdHandler = (request, h) => {
  const { id } = request.params;
 
  const index = notes.findIndex((note) => note.id === id);

  //Lakukan pengecekan terhadap nilai index, pastikan nilainya tidak -1 bila hendak menghapus catatan
  if (index !== -1) {
    notes.splice(index, 1);//-------------------------> method array splice() buat hapus data
    const response = h.response({
      status: 'success',
      message: 'Catatan berhasil dihapus',
    });
    response.code(200);
    return response;
  }

  const response = h.response({
    status: 'fail',
    message: 'Catatan gagal dihapus. Id tidak ditemukan',
  });
  response.code(404);
  return response;

};

module.exports = { 
  addNoteHandler, 
  getAllNotesHandler, 
  getNoteByIdHandler,
  editNoteByIdHandler,
  deleteNoteByIdHandler,
};