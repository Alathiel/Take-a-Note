/* eslint-disable prettier/prettier */
var RNFS = require('react-native-fs');
export default function deleteFile(filepath){
    RNFS.exists(filepath).then( (result) => {
        console.log("file exists: ", result);

        if (result){
            return RNFS.unlink(filepath);
        }
    }).catch((err) => {console.log(err.message);});
}

