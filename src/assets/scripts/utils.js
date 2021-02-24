jQuery.prototype.serializeObject = function () {
	var obj = new Object()
	$.each(this.serializeArray(), function(index, param){
		if (!(param.name in obj)) {
			obj[param.name]=param.value
		}
	})
	return obj
}

// 加载 dayjs 的插件
dayjs.extend(window.dayjs_plugin_relativeTime)

// 修改 art-template 的界定符为 [[  ]]
const rule = template.defaults.rules[1];
rule.test = new RegExp(rule.test.source.replace('{{', '\\\[\\\[').replace('}}', '\\\]\\\]'));

// art-template 过滤器，获取相对时间
template.defaults.imports.relativeTime = function(value) {
	return dayjs().to(dayjs(value))
}

// 获取url上的参数
function getQuery () {
	let query = {}
	let queryStr = location.search
	queryStr = queryStr.replace('?', '')
	const arr = queryStr.split('&')
	arr.forEach(item => {
		// item => id=1
		const keyValuePair = item.split('=')
		query[keyValuePair[0]] = keyValuePair[1]
	})
	return query
}
