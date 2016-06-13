var fs = require('fs'),
	p = require('path'),
	u = require('util');

function doFilter(filters,path,stat){
	return filters.every((f)=>{
		if(u.isFunction(f))
			return f(path,stat);
		if(u.isRegExp(f)) 
			return f.test(path);
		return true;
	});
}	

function rreaddirSync(path, pfilters, depth, plist, pcurrDepth) {
  var list = plist || [], filters = u.isArray(pfilters) ? pfilters : [pfilters],
	files = fs.readdirSync(path), currDepth = u.isNumber(pcurrDepth) ? pcurrDepth : 1;

	files.forEach((file) =>{
		var subPath = p.join(path, file),
			stats = fs.lstatSync(subPath);
		doFilter(filters,subPath,stats) && list.push(subPath);
		(!u.isNumber(depth) || currDepth < depth) && 
		stats.isDirectory() && rreaddirSync(subPath, filters, depth, list, currDepth + 1);
	});
  return list;
}

var exp = (p,f,l,d)=>rreaddirSync(p,f,d,l);

exp.ONLY_DIR = (p,s)=>s.isDirectory();
exp.ONLY_FILE = (p,s)=>s.isFile();
exp.ONLY_JS_FILE = (p,s)=>(exp.ONLY_FILE(p,s) && /^.*\.js$/.test(p));

module.exports = exp;