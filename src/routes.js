const { 
    addNoteHandler, 
    getAllNotesHandler, 
    getNoteByIdHandler, 
    editNoteByIdHandler,
    deleteNoteByIdHandler, 
                        } = require('./handler');//-----------> ini dari handler.js; cek code bwh ada komen sama

const routes = [//-----------> ini maksudnya rute kemana saja sih? jwbnnya ya code dibwhnya
    {
        method: 'POST', //------------> method post
        path: '/notes',
        handler: addNoteHandler, //-------> ini dari handler.js yaitu module.exports = { addNoteHandler, ... };
    },

    {
        method: 'GET', //------------> method get
        path: '/notes',
        handler: getAllNotesHandler, //-------> ini dari handler.js yaitu module.exports = { ..., getAllNoteHandler };
    },

    {
        method: 'GET',
        path: '/notes/{id}', //-----------------> ngambil id note yg sdh dibuat, misal sdh kebuat id no 1, maka jika note tsb dipencet, maka tidak hilang dan bisa membuka detail note tsb
        handler: getNoteByIdHandler,
    },

    {
        method: 'PUT',
        path: '/notes/{id}',
        handler: editNoteByIdHandler,
    },

    {
        method: 'DELETE',
        path: '/notes/{id}',
        handler: deleteNoteByIdHandler,
    },
  ];
   
  module.exports = routes;