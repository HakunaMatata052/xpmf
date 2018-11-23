exports.install = function (Vue, options) {
	Vue.prototype.get_json = function (url, fn) {
		var that = this;
		if (that.timex() > 0) {
			that.$http.get(url, {
				headers: {
					'Authorization': 'Bearer ' + localStorage.getItem('token')
				}
			}).then(res => {
				if (fn != undefined) {
					fn(res.data);
				}
			}, error => {
				if (that.$store.state.status[status] != null) {
					this.$message({
						type: 'error',
						message: error.data
					});
				} else {
					this.ajax_error(error.status)
				}
			})
		} else if (that.timex() <= 0) {
			that.refresh_token(function () {
				that.$http.get(url, {
					headers: {
						'Authorization': 'Bearer ' + localStorage.getItem('token')
					}
				}).then(res => {
					if (fn != undefined) {
						fn(res.data);
					}
				}, error => {
					if (that.$store.state.status[status] != null) {
						this.$message({
							type: 'error',
							message: error.data
						});
					} else {
						this.ajax_error(error.status)
					}
				})
			})
		} else {
			that.$message(that.$store.state.status[status]);
			this.goToLogin()
		}

	};
	Vue.prototype.post_json = function (url, data, fn) {
		var that = this;
		if (that.timex() > 0) {
			that.$http.post(url, data, {
				headers: {
					'Authorization': 'Bearer ' + localStorage.getItem('token')
				}
			}).then(res => {
				if (fn != undefined) {
					fn(res.data);
				}
			}, error => {
				if (that.$store.state.status[status] != null) {
					this.$message({
						type: 'error',
						message: error.data
					});
				} else {
					this.ajax_error(error.status)
				}
			})
		} else if (that.timex() <= 0) {
			that.refresh_token(function () {

				that.$http.post(url, data, {
					headers: {
						'Authorization': 'Bearer ' + localStorage.getItem('token')
					}
				}).then(res => {
					if (fn != undefined) {
						fn(res.data);
					}
				}, error => {
					if (that.$store.state.status[status] != null) {
						this.$message({
							type: 'error',
							message: error.data
						});
					} else {
						this.ajax_error(error.status)
					}
				})
			})
		} else {
			that.$message(that.$store.state.status[status]);
			this.goToLogin()
		}

	};
	Vue.prototype.del_json = function (url, fn) {
		var that = this;
		that.$confirm('确认删除？', '提示', {
			confirmButtonText: '确定',
			cancelButtonText: '取消',
			type: 'warning'
		}).then(() => {
			if (that.timex() > 0) {
				that.$http.delete(url, {
					headers: {
						'Authorization': 'Bearer ' + localStorage.getItem('token')
					}
				}).then(res => {
					if (fn != undefined) {
						fn(res.data);
					}
				}, error => {
					if (that.$store.state.status[status] != null) {
						this.$message({
							type: 'error',
							message: error.data
						});
					} else {
						this.ajax_error(error.status)
					}

				})
			} else if (that.timex() <= 0) {
				that.refresh_token(function () {

					that.$http.delete(url, {
						headers: {
							'Authorization': 'Bearer ' + localStorage.getItem('token')
						}
					}).then(res => {
						if (fn != undefined) {
							fn(res.data);
						}
					}, error => {
						if (that.$store.state.status[status] != null) {
							this.$message({
								type: 'error',
								message: error.data
							});
						} else {
							this.ajax_error(error.status)
						}
					})
				})
			} else {
				that.$message(that.$store.state.status[status]);
				this.goToLogin()
			}
		}).catch(() => {
			this.$message({
				type: 'info',
				message: '已取消删除'
			});
		});

	};
	Vue.prototype.put_json = function (url, data, fn) {
		var that = this;
		if (that.timex() > 0) {
			that.$http.put(url, data, {
				headers: {
					'Authorization': 'Bearer ' + localStorage.getItem('token')
				}
			}).then(res => {
				if (fn != undefined) {
					fn(res.data);
				}
			}, error => {
				this.ajax_error(error.status)
			})
		} else if (that.timex() <= 0) {
			that.refresh_token(function () {
				that.$http.put(url, data, {
					headers: {
						'Authorization': 'Bearer ' + localStorage.getItem('token')
					}
				}).then(res => {
					if (fn != undefined) {
						fn(res.data);
					}
				}, error => {
					if (that.$store.state.status[status] != null) {
						this.$message({
							type: 'error',
							message: error.data
						});
					} else {
						this.ajax_error(error.status)
					}
				})
			})
		} else {
			that.$message(that.$store.state.status[status]);
			this.goToLogin()
		}

	};
	//跳转页面 
	Vue.prototype.jump_router = function (url) {
		this.$router.push({
			path: url
		})

	};
	//跳转路由 
	Vue.prototype.jump_href = function (url, target) {
		if (target == '_blank') {
			window.open(url);
		} else {
			window.location.href = url;
		}

	};
	//Ajax请求错误执行的函数
	Vue.prototype.ajax_error = function (status) {
		var that = this;
		if (status == 401) {
			this.goToLogin()
		} else {
			that.$message({
				type: 'error',
				message: that.$store.state.status[status]
			});
			//console.info(error)
		}
	};
	//刷新Token请求
	Vue.prototype.refresh_token = function (fn) {
		var that = this;
		if (localStorage.getItem('token') && localStorage.getItem('token').length > 0) {
			this.$http.post(this.$store.state.refresh_token, {
				'Token': localStorage.getItem('token')
			}).then(res => {
				localStorage.setItem('token', res.data.token);
				localStorage.setItem('expires', res.data.expires);
				if (fn != undefined) {
					fn();
				}
			}, error => {
				if (that.$store.state.status[status] != null) {
					this.$message({
						type: 'error',
						message: error.data
					});
				} else {
					localStorage.clear();
					this.goToLogin()

				}
			})
		} else {
			this.goToLogin()
		}

	};

	//计算时间差
	Vue.prototype.timex = function () {
		var startTime = new Date();
		var endTime = localStorage.getItem('expires');
		if (endTime == null) {
			this.goToLogin();
			return false;
		} else {
			//console.log(new Date(endTime).getTime() - startTime.getTime());
			return new Date(endTime).getTime() - startTime.getTime();
		}
	};

	// 返回顶部
	Vue.prototype.gotop = function () {
		window.scrollTo(0, 0);
	}

	// 跳转登录页
	Vue.prototype.goToLogin = function () {
		if (this.$route.path=='/login') {
			return false;
		} else {
			this.$store.state.num++;
			this.$store.state.callbackUrl = this.$route.path;
			this.$router.push({
				path: '/login'
			})
		}
		
	}
};