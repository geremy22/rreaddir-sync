var fs = require('fs'),
	p = require('path'),
	u = require('util');

function doFilter(filters,path,stat){
	return filters.every((f)=>{
		(u.isRegExp(f)) && console.log("Path: " + path + " RegExp: " + f + " RES: " + f.test(path));
		return (u.isFunction(f))
			? f(path,stat) :
		(u.isRegExp(f)) 
			? f.test(path) :
		true;
	});
}	

function rreaddirSync(path, pfilters, depth, plist, pcurrDepth) {
  var list = plist || [], filters = u.isArray(pfilters) ? pfilters : [pfilters],
	files = fs.readdirSync(path), currDepth = u.isNumber(pcurrDepth) ? pcurrDepth : 1;

	files.forEach(function (file) {
		var subPath = p.join(path, file),
			stats = fs.lstatSync(subPath);
		if(doFilter(filters,subPath,stats)){
			list.push(subPath);
			(!u.isNumber(depth) || currDepth < depth) && 
			stats.isDirectory() && rreaddirSync(subPath, filters, depth, list, currDepth + 1);
		}
	});
  return list;
}

var exp = (p,f,l,d)=>rreaddirSync(p,f,d,l);

exp.ONLY_DIR = (p,s)=>s.isDirectory();
exp.ONLY_FILE = (p,s)=>s.isFile();

module.exports = exp;
