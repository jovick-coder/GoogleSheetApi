const messageDom = document.querySelector('#showMessage')
const allUlDom = document.querySelector('#allUlDom')
const subUlDom = document.querySelector('#subUlDom')
const notSubUlDom = document.querySelector('#notSubUlDom')
/**
   * Sample JavaScript code for sheets.spreadsheets.get
   * See instructions for running APIs Explorer code samples locally:
   * https://developers.google.com/explorer-help/guides/code_samples#javascript
   */

   function authenticate() {
    return gapi.auth2.getAuthInstance()
        .signIn({scope: "https://www.googleapis.com/auth/drive https://www.googleapis.com/auth/drive.file https://www.googleapis.com/auth/drive.readonly https://www.googleapis.com/auth/spreadsheets https://www.googleapis.com/auth/spreadsheets.readonly"})
        .then(function() { console.log("Sign-in successful");messageDom.innerHTML += `<div class='alert alert-info'>Sign-in successful</div>` },
            function (err) {
                console.error("Error signing in", err);
                messageDom.innerHTML += `<div class='alert alert-danger'>Error signing in: ${err.error}</div>`
            });
  }
  function loadClient() {
    gapi.client.setApiKey("AIzaSyCKbZcdLE6t1tUySSIfX2Q32E-bfGTbvjY");
    return gapi.client.load("https://sheets.googleapis.com/$discovery/rest?version=v4")
        .then(function () {
            console.log("GAPI client loaded for API");
            messageDom.innerHTML += `<div class='alert alert-info'>GAPI client loaded for API</div>`;
            execute()
        },
            function (err) {
                console.error("Error loading GAPI client for API", err);
                messageDom.innerHTML += `<div class='alert alert-danger'>Error loading GAPI client for API ${err}</div>`
            });
}
  
  // Make sure the client is loaded and sign-in is complete before calling this method.
  let allArrayValue = []
  let subArray = []
  
  function execute() {
      gapi.client.sheets.spreadsheets.get({
          "spreadsheetId": "1O38ZJmrgFFEraGy0NvLaXgmno4kCuikEXmluDaXJRDA",
        "includeGridData": true,
        "ranges": [
            "A2:A20"
        ]
    })
    .then(function(response) {
        // Handle the results here (response.result has the parsed body).
        // console.log("Response", response);
     
            let dataObj = response.result.sheets[0].data[0].rowData;
            dataObj.forEach((item, index)=>{
                console.log(index, item.values[0].formattedValue)
                // allArrayValue.push(item.values[0].formattedValue)
                subArray.push(item.values[0].formattedValue)
            })
            mapData(subArray, subUlDom)
                // console.log("Response", dataObj);
              },
            function (err) { console.error("Execute error", err); });
    // Second Sheet 
    gapi.client.sheets.spreadsheets.get({
        "spreadsheetId": "1wHgbEzqT8eqIglf7Z6Xc31-ajWuvG8aTxzgRSiib4WQ",
        "includeGridData": true,
        "ranges": [
          "A2:A51"
        ]
      })
        .then(function(response) {
                // Handle the results here (response.result has the parsed body).
                // console.log("Response", response);
            let dataObj = response.result.sheets[0].data[0].rowData;
            dataObj.forEach((item, index)=>{
                console.log(index, item.values[0].formattedValue)
                allArrayValue.push(item.values[0].formattedValue)
            })
                // console.log("Response", dataObj);
            console.log(allArrayValue);
            mapData(allArrayValue, allUlDom)
              },
            function (err) { console.error("Execute error", err); });
    
  }


  gapi.load("client:auth2", function() {
    gapi.auth2.init({client_id: "325022260177-v744sla61vd78dt9iu4rmgiu677hc1l5.apps.googleusercontent.com"});
  });

const mapData = (arr,dom) => {
    arr.forEach((item, index)=>{
        dom.innerHTML += `<li>${item}</li>`
    })
}
  
const getStudent = () => {
    // alert('Get')
       let allArrayValueNew = [...allArrayValue, ...subArray]
    let uniqueChars = [];
    allArrayValueNew.forEach((c) => {
    if (!uniqueChars.includes(c)) {
        uniqueChars.push(c);
    }
});

//     console.log('uniqueChars', uniqueChars);
    mapData(removeDup(uniqueChars), notSubUlDom)
//    let allArrayValueNew = [...allArrayValue, ...subArray]
    // mapData(removeDup(allArrayValueNew), notSubUlDom)
        //   newElement = '<p style="background:blue; color:#ddd;">List Of Student who did Not Submit</p>'
       
    //      uniqueChars.forEach((item, index)=>{
    //     newElement += `<div>${item}</div>`
    // })
                // domElment.innerHTML+= newElement;
    
            }
            function removeDup(arr) {
                // let result = []
                // arr.forEach((item, index) => {
                //     if (result.indexOf(item) === -1) result.push(item)
                // });
                // return result;
                console.log('All Array', arr);
let unique = [...new Set(names)]; console.log(unique);
            }

const names = ['John', 'Paul', 'George', 'Ringo', 'John'];
console.log('namesArray', names);
let unique = [...new Set(names)]; console.log(unique);