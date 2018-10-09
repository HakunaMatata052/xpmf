exports.install = function(Vue, options) {
	Vue.prototype.get_json = function(url, fn) {
		var that = this;
		if(that.timex() > 0) {
			that.$http.get(url, {
				headers: {
					'Authorization': 'Bearer ' + localStorage.getItem('token')
				}
			}).then(res => {
				if(fn != undefined) {
					fn(res.data);
				}
			}, error => {
				that.ajax_error(error.status)
			})
		} else if(that.timex() <= 0) {
			that.refresh_token(function() {
				that.$http.get(url, {
					headers: {
						'Authorization': 'Bearer ' + localStorage.getItem('token')
					}
				}).then(res => {
					if(fn != undefined) {
						fn(res.data);
					}
				}, error => {
					that.ajax_error(error.status)
				})
			})
		} else {
			that.$message(that.$store.state.status[status]);
			that.$router.push({
				path: '/login'
			})
		}

	};
	Vue.prototype.post_json = function(url, data, fn) {
		var that = this;
		if(that.timex() > 0) {
			that.$http.post(url, data, {
				headers: {
					'Authorization': 'Bearer ' + localStorage.getItem('token')
				}
			}).then(res => {
				if(fn != undefined) {
					fn(res.data);
				}
			}, error => {
				this.ajax_error(error.status)
			})
		} else if(that.timex() <= 0) {
			that.refresh_token(function() {

				that.$http.post(url, data, {
					headers: {
						'Authorization': 'Bearer ' + localStorage.getItem('token')
					}
				}).then(res => {
					if(fn != undefined) {
						fn(res.data);
					}
				}, error => {
					this.ajax_error(error.status)
				})
			})
		} else {
			that.$message(that.$store.state.status[status]);
			that.$router.push({
				path: '/login'
			})
		}

	};
	Vue.prototype.del_json = function(url, fn) {
		var that = this;
		if(that.timex() > 0) {
			that.$http.delete(url, {
				headers: {
					'Authorization': 'Bearer ' + localStorage.getItem('token')
				}
			}).then(res => {
				if(fn != undefined) {
					fn(res.data);
				}
			}, error => {
				this.ajax_error(error.status)
			})
		} else if(that.timex() <= 0) {
			that.refresh_token(function() {

				that.$http.delete(url, {
					headers: {
						'Authorization': 'Bearer ' + localStorage.getItem('token')
					}
				}).then(res => {
					if(fn != undefined) {
						fn(res.data);
					}
				}, error => {
					this.ajax_error(error.status)
				})
			})
		} else {
			that.$message(that.$store.state.status[status]);
			that.$router.push({
				path: '/login'
			})
		}
	};
	Vue.prototype.put_json = function(url, fn) {
		var that = this;
		if(that.timex() > 0) {
			that.$http.put(url, {},{
				headers: {
					'Authorization': 'Bearer ' + localStorage.getItem('token')
				}
			}).then(res => {
				if(fn != undefined) {
					fn(res.data);
				}
			}, error => {
				this.ajax_error(error.status)
			})
		} else if(that.timex() <= 0) {
			that.refresh_token(function() {
				that.$http.put(url, {},{
					headers: {
						'Authorization': 'Bearer ' + localStorage.getItem('token')
					}
				}).then(res => {
					if(fn != undefined) {
						fn(res.data);
					}
				}, error => {
					this.ajax_error(error.status)
				})
			})
		} else {
			that.$message(that.$store.state.status[status]);
			that.$router.push({
				path: '/login'
			})
		}

	};
	//跳转页面 
	Vue.prototype.jump_href = function(url, target) {
		if(target == '_blank') {
			window.open(url);
		} else {
			window.location.href = url;
		}

	};
	//Ajax请求错误执行的函数
	Vue.prototype.ajax_error = function(status) {
		if(status == 401 || status == 403) {
			this.$router.push({
				path: '/login'
			})
		} else {
			this.$message(this.$store.state.status[status]);
			this.$router.push({
				path: '/login'
			})
			//console.info(error)
		}
	};
	//刷新Token请求
	Vue.prototype.refresh_token = function(fn) {
		this.$http.post(this.$store.state.refresh_token, {
			'Token': localStorage.getItem('token')
		}).then(res => {
			localStorage.setItem('token', res.data.token);
			localStorage.setItem('expires', res.data.expires);
			if(fn != undefined) {
				fn();
			}
		}, error => {
			this.ajax_error(error.status)
		})
	};

	//计算时间差
	Vue.prototype.timex = function(fn) {
		var startTime = new Date();
		var endTime = localStorage.getItem('expires');
		console.log(new Date(endTime).getTime() - startTime.getTime());
		return new Date(endTime).getTime() - startTime.getTime();
	};
	//退出登录 
	Vue.prototype.logout = function() {
		localStorage.clear();
	};
};