var fs = require("fs");
var recursive = require('recursive-readdir');
var util = require('util');

var getNotebooks = function(path) {
  return fs.readdirSync(path).map(function(filePath){
    var notebookDir = [path, filePath].join("/");
    return getNotebook(notebookDir);
  }).filter(function(n) {return n; });
}

var getNotebook = function(path) {
  var info = getNotebookInfo(path);
  if(!info) return;

  info.notes = getNotes(path);
  return info;
}

var getNotebookInfo = function(path) {
  var infoPath = [path, "info.json"].join("/");
  try {
    var infoJSON = fs.readFileSync(infoPath, 'utf8');
    return JSON.parse(infoJSON);
  } catch(e) {}
}

var getNotes = function(path) {
  var htmlFiles = fs.readdirSync(path).filter(function(f) {
    return f.substr(f.lastIndexOf('.') + 1) == "html";
  });
  return htmlFiles.map(function(filename){
    var notePath = [path, filename].join("/");
    return getNote(notePath);
  });
}

var getNote = function(path) {
  try {
    var noteContents = fs.readFileSync(path, 'utf8');
    return parseNote(noteContents);
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

exports.getNotebooks = getNotebooks;

// var n = getNotebooks("/Users/wkjagt/.espresso/notes");
//
// console.log(util.inspect(n, false, null));
