// import { useEffect } from 'react';
// // import { google } from 'googleapis'
// const {google} = require('googleapis')

// // const CLIENT_ID = '794003993201-uff34hnkefdicv11g4kdtako4jbm73di.apps.googleusercontent.com';
// // const API_KEY = 'AIzaSyD6h8g14NpALf-E2FNtzBzij2YWjkzdsZU';
// // const DISCOVERY_DOCS = ['https://www.googleapis.com/discovery/v1/apis/drive/v3/rest'];
// // const SCOPES = 'https://www.googleapis.com/auth/drive.readonly';

// // function Prediction() {
// //   useEffect(() => {
// //     const handleClientLoad = () => {
// //       gapi.load('client:auth2', initClient);
// //     };

// //     const initClient = () => {
// //       gapi.client
// //         .init({
// //           apiKey: API_KEY,
// //           clientId: CLIENT_ID,
// //           discoveryDocs: DISCOVERY_DOCS,
// //           scope: SCOPES,
// //         })
// //         .then(() => {
// //           // Check if user is signed in
// //           if (!gapi.auth2.getAuthInstance().isSignedIn.get()) {
// //             // Sign in the user
// //             gapi.auth2.getAuthInstance().signIn();
// //           }

// //           // Use the Google Drive API to get the file ID of 'logistic.csv' in the 'output' folder
// //           gapi.client.drive.files
// //             .list({
// //               q: "name='output' and mimeType='application/vnd.google-apps.folder'",
// //             })
// //             .then((response) => {
// //               const folderId = response.result.files[0].id;

// //               // List files in the 'output' folder
// //               gapi.client.drive.files
// //                 .list({
// //                   q: `'${folderId}' in parents and name='logistic.csv'`,
// //                 })
// //                 .then((fileResponse) => {
// //                   const fileId = fileResponse.result.files[0].id;

// //                   // Get the contents of 'logistic.csv'
// //                   gapi.client.drive.files
// //                     .export({
// //                       fileId: fileId,
// //                       mimeType: 'text/csv',
// //                     })
// //                     .then((downloadResponse) => {
// //                       const csvData = downloadResponse.body;

// //                       // Process the CSV data as needed
// //                       console.log('CSV Data:', csvData);
// //                     });
// //                 });
// //             });
// //         });
// //     };

// //     // Load the Google API client library
// //     handleClientLoad();
// //   }, []);

//   return (
//     <div>
//       <p>Test</p>
//     </div>
//   );
// }

// export default Prediction;