function ercAutopopulate() {
  
  // set the sheet where all the schools' ERC data should autopopulate
 
  var ss = SpreadsheetApp.openById('1wwA6lk14FAx-8Dj3uOOEhz_BHukFAQiRtYOwMKpoFFI');
  var ercSheet = ss.setActiveSheet(ss.getSheetByName('ERC AUTOPOPULATE'));
  
  // folder where all the schools' sheets are stored
 
  var mainFolder = DriveApp.getFolderById('0B-Z7OUgXBAAbRFQxQVg1OFNDZEU');
  var schoolSheets = mainFolder.getFiles();
  
  // other variables
  
  var fileId;
  var file;
  var sourceBook;
  var sourceSheet;
  var startRow = 3;
  var numRow;
  var startCol = 1;
  var numCol = 13;
  var sourceRange;
  var sourceValues;
  var destValues;
  var sheetName;
  
  // autopopulate the ERC tab
  
  ercSheet.clearContents();
  ercSheet.appendRow(['School Name', 'First Name', 'Last Name', 'Relationship', 'Scholar First Name', 'Scholar Last Name', 'Cell Phone', 'Email Address', 'Street Address', 'NYS Assembly District', 'NYC Council District', 'NYS Senate District', 'Notes']);
  
  
  while(schoolSheets.hasNext()) {
    fileId = schoolSheets.next().getId();
    file = SpreadsheetApp.openById(fileId);
    sheetName = file.getName();
    sourceSheet = file.setActiveSheet(file.getSheetByName('Ed Reform Council'));
    numRow = sourceSheet.getLastRow()-startRow;
    
    if (sourceSheet.getLastRow()>startRow) {
    sourceRange = sourceSheet.getRange(startRow, startCol, numRow+1, numCol);
    sourceValues = sourceRange.getValues();
    
    var i = ercSheet.getLastRow()+1
    ercSheet.getRange(i, startCol+1, numRow+1, numCol).setValues(sourceValues);
    SpreadsheetApp.flush();
    ercSheet.getRange(i, startCol, numRow+1, 1).setValue(sheetName);
    
  } else {
    Logger.log(sheetName);
  }
  }
  
}
