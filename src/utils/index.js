exports.install = function(Vue, options) {
	Vue.prototype.get_json = function(url, fn) {
		this.$http.get(url, fn).then(res => {
			if(fn!=undefined){
				fn(res.data);
			}
		}, error => {
			this.$message(this.$store.state.status[error.status]);
			//console.info(error)
		})
	};
	Vue.prototype.post_json = function(url, data, fn) {
		this.$http.post(url, data, fn).then(res => {
			fn(res.data);
		}, error => {
			this.$message(this.$store.state.status[error.status]);
			//console.info(error)
		})
	};
	Vue.prototype.del_json = function(url, fn) {
		this.$http.delete(url, fn).then(res => {
			fn(res.data);
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
	//跳转页面 
	Vue.prototype.jump_href = function(url, target) {
		if(target == '_blank') {
			window.open(url);
		} else {
			window.location.href = url;
		}

	};
};