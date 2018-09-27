exports.install = function(Vue, options) {
	Vue.prototype.get_json = function(url, fn) {
		this.$http.get(url).then(res => {
			if(fn != undefined) {
				fn(res.data);
			}
		}, error => {
			this.$message(this.$store.state.status[error.status]);
			//console.info(error)
		})
	};
	Vue.prototype.post_json = function(url, data, fn) {
		this.$http.post(url, data).then(res => {
			fn(res.data);
		}, error => {
			this.$message(this.$store.state.status[error.status]);
			//console.info(error)
		})
	};
	Vue.prototype.del_json = function(url, fn) {
		this.$http.delete(url).then(res => {
			fn(res.data);
		}, error => {
			this.$message(this.$store.state.status[error.status]);
		})
	};
	Vue.prototype.put_json = function(url, fn) {
		this.$http.put(url).then(res => {
			fn(res.data);
		}, error => {
			this.$message(this.$store.state.status[error.status]);
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