Module for listing files and directories of a root directory, recursively and synchronously.

###Install
`npm install rreaddir-sync`

###Usage
`rreadSync(path[,filters][,outList])`
#####Arguments
* `path` (String) The path from where you want to list files and directories
* `filters` (Mixed) Function, RegExp or Array of Function/RegExp. Each function will take a path and fs.Stats object as arguments and must return a Boolean, true if you want to prevent adding current path in the outList. Each RegExp will be applied to each path.
* `outList` (Array) Array to push each path, same as the response.

#####Simple listing
List all files and subdirectories from current dir.
```
var rreadSync = require("rreaddir-sync");
console.log(rreadSync("."));
```
#####Apply filters
```
var rreadSync = require("rreaddir-sync");
//list only files
console.log(rreadSync(".",rreadSync.ONLY_FILE)); //rreadSync.ONLY_FILE is a shortcut for (p,stat)=>stat.isFile();
//list only directories
console.log(rreadSync(".",rreadSync.ONLY_DIR)); //rreadSync.ONLY_DIR is a shortcut for (p,stat)=>stat.isDirectory();
//list only js files
console.log(rreadSync(".",[rreadSync.ONLY_FILE,/.*\.js$/]))
```
######Note: Sorry if my english is not good

