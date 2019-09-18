
const express = require('express');
const app = express();

var mongoose = require("mongoose");
//var count = ;

mongoose.connect(process.env.MONGODB_URL || 'mongodb://localhost:27017/mongo-1', { useNewUrlParser: true, useUnifiedTopology: true });
mongoose.connection.on("error", function(e) { console.error(e); });

// definimos el schema
var schema = mongoose.Schema({
  count: { type: Number, default: 1  },
  name: { type: String, default: "Anónimo" },

});

var Visitor = mongoose.model("Visitor", schema);

app.get('/', (req, res) => {

  if (!req.query.name) {
    var first = new Visitor({});
    first.save(function(err) {
      if (err) return console.error(err);
    });

//Guardando todos los datos
    Visitor.find({}, function(err, visitor) {
    if (err) return console.error(err);
    var datosTabla = visitor;
    //crea la tabla html

    var $html = "<table><tr><th>Id</th><th>Name</th><th>Visits</th></tr>"
      for (var i = 0; i < datosTabla.length; i++){
        $html += '<tr>';
        $html += '<td>'+datosTabla[i]._id+'</td>';
        $html += '<td>'+datosTabla[i].name+'</td>'
        $html += '<td>'+datosTabla[i].count+'</td></tr>'
      }
      $html += "</table>";
      res.send($html);
    });
// este codigo lo repito en todos los if

  }else if(req.query.name) {

    Visitor.findOne({name: req.query.name} , function(err, visitor) {
      if (err) return console.error(err);
      if(!visitor) {
          first = new Visitor({name: req.query.name});
          first.save(function(err) {
            if (err) return console.error(err);
          });

          //Guardando todos los datos
              Visitor.find({}, function(err, visitor) {
              if (err) return console.error(err);
              var datosTabla = visitor;
              //crea la tabla html

              var $html = "<table><tr><th>Id</th><th>Name</th><th>Visits</th></tr>"
                for (var i = 0; i < datosTabla.length; i++){
                  $html += '<tr>';
                  $html += '<td>'+datosTabla[i]._id+'</td>';
                  $html += '<td>'+datosTabla[i].name+'</td>'
                  $html += '<td>'+datosTabla[i].count+'</td></tr>'
                }
                $html += "</table>";
                res.send($html);
              });
          // este codigo lo repito en todos los if

      }else{
        visitor.count += 1;
        visitor.save(function(err) {
          if (err) return console.error(err);
        });
        //Guardando todos los datos
            Visitor.find({}, function(err, visitor) {
            if (err) return console.error(err);
            var datosTabla = visitor;
            //crea la tabla html

            var $html = "<table><tr><th>Id</th><th>Name</th><th>Visits</th></tr>"
              for (var i = 0; i < datosTabla.length; i++){
                $html += '<tr>';
                $html += '<td>'+datosTabla[i]._id+'</td>';
                $html += '<td>'+datosTabla[i].name+'</td>'
                $html += '<td>'+datosTabla[i].count+'</td></tr>'
              }
              $html += "</table>";
              res.send($html);
            });
        // este codigo lo repito en todos los if
      }

    //  res.send("Hola");

    });
  }


});



app.listen(3000, () => console.log('Listening on port 3000!'));

/*
var $html = "<table><tr><th>Flag</th><th>Code</th><th>Name</th></tr>"
  for (var i = 0; i < countries.length; i++){
    $html += '<tr>';
    $html += '<td><img src="'+countries[i].flag_url+'"></td>';
    $html += '<td>'+countries[i].code+'</td>'
    $html += '<td>'+countries[i].name+'</td></tr>'
  }
  $html += "</table>";

  //************************** Codigo de David

  const express = require('express');
const app = express();

var mongoose = require("mongoose");
mongoose.connect(process.env.MONGODB_URL || 'mongodb://localhost:27017/visitantes', { useNewUrlParser: true, useUnifiedTopology: true });
//mongoose.connect('mongodb://localhost:27017/test', { useUnifiedTopology: true, useNewUrlParser: true });
mongoose.connection.on("error", function(e) { console.error(e); });

var schema = mongoose.Schema({
    count: { type: Number, default: 1 },
    name: { type: String, default: "Anónimo" },
})

var Visitor = mongoose.model("Visitor", schema);

app.get('/', (req, res) => {

    if (!req.query.name) {

        Visitor.create({}, function(err) {
            if (err) return console.error(err);
            Visitor.find({}, function(err, visitor) {
                if (err) return console.error(err);
                var na = visitor;

                var $html = ('<table class="table"><tr><th>Id</th><th>Name</th><th>Count</th></tr>')

                for (var i = 0; i < na.length; i++) {
                    $html += '<tr>';
                    $html += '<td>' + na[i].id + '</td>';
                    $html += '<td>' + na[i].name + '</td>'
                    $html += '<td>' + na[i].count + '</td></tr>'
                }
                $html += '</table>';
                res.send($html);
            });

        });
    } else if (req.query.name) {
        Visitor.findOne({ name: req.query.name }, function(err, visitor) {

            if (err) return console.error(err);

            if (!visitor) {
                Visitor.create({ name: req.query.name }, function(err) {
                    if (err) return console.error(err);

                    Visitor.find({}, function(err, visitor) {
                        if (err) return console.error(err);
                        var na = visitor;

                        var $html = ('<table class="table"><tr><th>Id</th><th>Name</th><th>Count</th></tr>')

                        for (var i = 0; i < na.length; i++) {
                            $html += '<tr>';
                            $html += '<td>"' + na[i].id + '"></td>';
                            $html += '<td>' + na[i].name + '</td>'
                            $html += '<td>' + na[i].count + '</td></tr>'
                        }
                        $html += '</table>';

                        res.send($html);
                    });


                });
            } else {
                visitor.count += 1;
                visitor.save(function(err) {
                    if (err) return console.error(err);
                    Visitor.find({}, function(err, visitor) {
                        if (err) return console.error(err);
                        var na = visitor;

                        var $html = ('<table class="table"><tr><th>Id</th><th>Name</th><th>Count</th></tr>')

                        for (var i = 0; i < na.length; i++) {
                            $html += '<tr>';
                            $html += '<td>"' + na[i].id + '"></td>';
                            $html += '<td>' + na[i].name + '</td>'
                            $html += '<td>' + na[i].count + '</td></tr>'
                        }
                        $html += '</table>';

                        res.send($html);
                    });


                });

            }

        });
    }

});

app.listen(3000, () => console.log('Listening on port 3000!'))
*/