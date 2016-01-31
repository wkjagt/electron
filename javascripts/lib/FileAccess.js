var fs = require("fs");
var recursive = require('recursive-readdir');
var util = require('util');
const NOTEBOOKPATH = "/Users/wkjagt/.espresso/notes";

var dump = function(v) {
  console.log(JSON.stringify(v, null, ' '));
}

var getNotebooks = function() {
  return fs.readdirSync(NOTEBOOKPATH).map(function(filename){
    var notebook = getNotebook(filename);
    if(!notebook) return;
    notebook.path = filename;
    return notebook;
  }).filter(function(n) {return n; });
}

var getNotebook = function(filename) {
  var info = getNotebookInfo(filename);

  if(!info) return;

  info.notes = getNotes(filename);
  return info;
}

var getNotebookDir = function(filename) {
  return [NOTEBOOKPATH, filename].join("/");
}

var getInfoFilePath = function(filename) {
  return [NOTEBOOKPATH, filename, "info.json"].join("/");
}

var getNotebookInfo = function(filename) {
  var infoPath = [getNotebookDir(filename), "info.json"].join("/");
  try {
    var infoJSON = fs.readFileSync(infoPath, 'utf8');
    return JSON.parse(infoJSON);
  } catch(e) {}
}

var getNotePath = function(notebookFilename, filename) {
  return [getNotebookDir(notebookFilename), filename].join("/");
}

var getNotes = function(notebookFilename) {
  var htmlFiles = fs.readdirSync(getNotebookDir(notebookFilename)).filter(function(f) {
    return f.substr(f.lastIndexOf('.') + 1) == "html";
  });
  return htmlFiles.map(function(filename){
    var note = getNote(filename, notebookFilename);
    return note;
  });
}

var getNote = function(filename, notebookFilename) {
  try {
    var noteContents = fs.readFileSync(getNotePath(notebookFilename, filename), 'utf8');
    var note = parseNote(noteContents);
    note.path = [notebookFilename, filename].join("/");
    return note;
  } catch(e) {}
}

var parseNote = function(contents) {
  var parts = contents.split("---");
  try {
    var info = JSON.parse(parts[0]);
    info.content = parts[1] || "";
    return info;
  } catch(e){}
}

var createNotebook = function(info) {
  info.path = safeDirName(info.name);

  if (!fs.existsSync(getNotebookDir(info.path))) {
    fs.mkdirSync(getNotebookDir(info.path));
  }
  writeNotebookInfo(info);
  return info;
}

var safeDirName = function(name) {
  return name.replace(/[^a-z0-9]/gi, '_').toLowerCase();
}

var writeNotebookInfo = function(info) {
  var infoJSON = JSON.stringify(info, null, '  ');
  fs.writeFileSync(getInfoFilePath(info.path), infoJSON);
}

var notebook = createNotebook({
  id: "3456789",
  name: "MORE notes"
});
dump(notebook);


exports.getNotebooks = getNotebooks;
