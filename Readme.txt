1. Install latest nodejs: (I have installed v7.1.0)
https://nodejs.org/en/download/package-manager/

2. Download the project from GITHUB into a folder:


3. Install dependency folders:   
   npm install basho-riak-client --save
   Others if any

4. Start Riak.

5. Run the node using the following command from root directory of project:
   node app/index.js (currently the first index is inside app folder)

6. Type localhost:3000 in Google Chrome
    - if port 3000 is already used, update app/index.js file to listen to a different port

7. Close node when finised using CLTRL + C.

8. Commit any changes to trunk.