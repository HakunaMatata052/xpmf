exports.install = function(Vue, options) {
	Vue.prototype.ajax_json = function(url, data, fn) {
		this.$http.post(url, data, fn).then(res => {
			var fnc;
			if(fn == undefined) {
				fnc = data;
			} else {
				fnc = fn;
			}
			fnc(res.data);
		}, error => {
			if(error.status == 401) {
				this.$message('登陆异常！请重新登陆');
				this.$router.push({
					path: '/login'
				})
			} else {
				this.$message('操作失败！');
			}
			//console.info(error)
		})
	};
	Vue.prototype.jump_href = function(url) {
		window.location.href = url;
	};
};