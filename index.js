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

function rreaddirSync(path, pfilters, plist) {
  var list = plist || [], filters = u.isArray(pfilters) ? pfilters : [pfilters],
	files = fs.readdirSync(path);

	files.forEach(function (file) {
		var subPath = p.join(path, file),
			stats = fs.lstatSync(subPath);
		doFilter(filters,subPath,stats) && list.push(subPath);
		stats.isDirectory() && rreaddirSync(subPath, filters, list);
	});

  return list;
}

rreaddirSync.ONLY_DIR = (p,s)=>s.isDirectory();
rreaddirSync.ONLY_FILE = (p,s)=>s.isFile();

module.exports = rreaddirSync;
