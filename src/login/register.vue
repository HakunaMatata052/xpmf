<template>
	<div id="login">
		<div class="login-box" v-loading="interdiction">
			<div class="logo"><img src="../assets/images/LOGO.png" alt="" /></div>

			<el-input placeholder="用户名" v-model="reg.username" class="login-input" @keyup.enter.native="regFn">
				<i slot="suffix" class="el-input__icon el-icon-edit"></i>
			</el-input>
			<div class="em"></div>
			<el-input placeholder="公司名称" v-model="reg.companyName" class="login-input" @keyup.enter.native="regFn">
				<i slot="suffix" class="el-input__icon el-icon-edit"></i>
			</el-input>
			<div class="em"></div>
			<el-input placeholder="密码" v-model="reg.password" type="password" class="login-input" @keyup.enter.native="regFn">
				<i slot="suffix" class="el-input__icon el-icon-view"></i>
			</el-input>
			<div class="em"></div>
			<el-input placeholder="密码" v-model="reg.confirmPassword" type="password" class="login-input" @keyup.enter.native="regFn">
				<i slot="suffix" class="el-input__icon el-icon-view"></i>
			</el-input>
			<div class="em"></div>
			<el-button type="danger" class="submit" @click="regFn">注册</el-button>
			<div class="em"></div>
			<p>已经有账号了? 去
				<router-link to="/login">登陆</router-link>
			</p>
			<div id="bg">
				<canvas></canvas>
				<canvas></canvas>
				<canvas></canvas>
			</div>
		</div>
	</div>
</template>

<script>
export default {
	data() {
		return {
			reg: {
				companyName: '',
				username: '',
				password: '',
				confirmPassword: ''
			},
			interdiction: false
		}
	},
	methods: {
		regFn() {
			var that = this;
			var uPattern = /^[a-zA-Z0-9_]{4,16}$/;
			var pPattern = /(^(?=.*[a-zA-Z])|(?=.*\d)|(?=.*[~!@#$%^&*()_+`\-={}:";'<>?,.\/])).{4,16}$/;
			if (!uPattern.test(that.reg.username)) {
				that.$message({
					type: 'error',
					message: '用户名只能包含数字、字母、_且必须是4-16个字符！'
				});
			} else if (that.reg.companyName.length < 4 || that.reg.companyName.length > 200) {
				that.$message({
					type: 'error',
					message: '公司名称的长度必须在4-250个字符内!'
				});
			} else if (!pPattern.test(that.reg.password)) {
				alert(that.reg.password.length)
				that.$message({
					type: 'error',
					message: '密码必须在4-16位以！'
				});
			} else if (that.reg.password !== that.reg.confirmPassword) {
				that.$message({
					type: 'error',
					message: '两次密码不一致！'
				});
			} else {
				that.interdiction = true;
				that.$http.post(that.$store.state.api + 'User', that.reg).then(res => {
					that.$message({
						type: 'success',
						message: '注册成功！'
					});
					that.$http.post(that.$store.state.api + 'login', that.reg, {
						headers: {
							'Authorization': 'Bearer ' + localStorage.getItem('token')
						}
					}).then(res => {
						localStorage.setItem('token', res.data.token);
						localStorage.setItem('role', res.data.role);
						localStorage.setItem('expires', res.data.expires);
						that.$message({
							type: 'success',
							message: '登陆成功！'
						});
						if (res.data.role == "Admin") {
							that.$router.push({
								path: '/admin/config'
							})
						} else {

							that.$router.push({
								path: '/'
							})
						};
						that.interdiction = false;
					}, error => {
						this.ajax_error(error.status)
						that.interdiction = false;
					})
					that.interdiction = false;
				}, error => {
					this.ajax_error(error.status)
					that.interdiction = false;
				})
			}

		}
	},
	created() {

	},
	mounted() {
		(function () {
			var canvas = document.getElementsByTagName("canvas"),
				background = canvas[0],
				foreground1 = canvas[1],
				foreground2 = canvas[2],
				config = {
					circle: {
						amount: 18,
						layer: 3,
						color: [238, 50, 49],
						alpha: 0.3
					},
					line: {
						amount: 12,
						layer: 3,
						color: [246, 170, 38],
						alpha: 0.3
					},
					speed: 0.5,
					angle: 20
				};
			if (background.getContext) {
				var bctx = background.getContext('2d'),
					fctx1 = foreground1.getContext('2d'),
					fctx2 = foreground2.getContext('2d'),
					M = window.Math, // Cached Math
					degree = config.angle / 360 * M.PI * 2,
					circles = [],
					lines = [],
					wWidth, wHeight, timer;

				requestAnimationFrame = window.requestAnimationFrame ||
					window.mozRequestAnimationFrame ||
					window.webkitRequestAnimationFrame ||
					window.msRequestAnimationFrame ||
					window.oRequestAnimationFrame ||
					function (callback, element) {
						setTimeout(callback, 1000 / 60);
					};

				cancelAnimationFrame = window.cancelAnimationFrame ||
					window.mozCancelAnimationFrame ||
					window.webkitCancelAnimationFrame ||
					window.msCancelAnimationFrame ||
					window.oCancelAnimationFrame ||
					clearTimeout;

				var setCanvasHeight = function () {
					wWidth = document.body.clientWidth //$(window).width();
					wHeight = document.body.clientHeight //$(window).height(),
					canvas[0].width = wWidth;
					canvas[0].height = wHeight;
					canvas[1].width = wWidth;
					canvas[1].height = wHeight;
					canvas[2].width = wWidth;
					canvas[2].height = wHeight;
				};

				var drawCircle = function (x, y, radius, color, alpha) {
					var gradient = fctx1.createRadialGradient(x, y, radius, x, y, 0);
					gradient.addColorStop(0, 'rgba(' + color[0] + ',' + color[1] + ',' + color[2] + ',' + alpha + ')');
					gradient.addColorStop(1, 'rgba(' + color[0] + ',' + color[1] + ',' + color[2] + ',' + (alpha - 0.1) + ')');

					fctx1.beginPath();
					fctx1.arc(x, y, radius, 0, M.PI * 2, true);
					fctx1.fillStyle = gradient;
					fctx1.fill();
				};

				var drawLine = function (x, y, width, color, alpha) {
					var endX = x + M.sin(degree) * width,
						endY = y - M.cos(degree) * width,
						gradient = fctx2.createLinearGradient(x, y, endX, endY);
					gradient.addColorStop(0, 'rgba(' + color[0] + ',' + color[1] + ',' + color[2] + ',' + alpha + ')');
					gradient.addColorStop(1, 'rgba(' + color[0] + ',' + color[1] + ',' + color[2] + ',' + (alpha - 0.1) + ')');

					fctx2.beginPath();
					fctx2.moveTo(x, y);
					fctx2.lineTo(endX, endY);
					fctx2.lineWidth = 3;
					fctx2.lineCap = 'round';
					fctx2.strokeStyle = gradient;
					fctx2.stroke();
				};

				var drawBack = function () {
					bctx.clearRect(0, 0, wWidth, wHeight);

					var gradient = [];

					gradient[0] = bctx.createRadialGradient(wWidth * 0.3, wHeight * 0.1, 0, wWidth * 0.3, wHeight * 0.1, wWidth * 0.9);
					gradient[0].addColorStop(0, '#ee3231');
					gradient[0].addColorStop(1, 'transparent');

					bctx.translate(wWidth, 0);
					bctx.scale(-1, 1);
					bctx.beginPath();
					bctx.fillStyle = gradient[0];
					bctx.fillRect(0, 0, wWidth, wHeight);

					gradient[1] = bctx.createRadialGradient(wWidth * 0.1, wHeight * 0.1, 0, wWidth * 0.3, wHeight * 0.1, wWidth);
					gradient[1].addColorStop(0, '#f6aa26');
					gradient[1].addColorStop(0.8, 'transparent');

					bctx.translate(wWidth, 0);
					bctx.scale(-1, 1);
					bctx.beginPath();
					bctx.fillStyle = gradient[1];
					bctx.fillRect(0, 0, wWidth, wHeight);

					gradient[2] = bctx.createRadialGradient(wWidth * 0.1, wHeight * 0.5, 0, wWidth * 0.1, wHeight * 0.5, wWidth * 0.5);
					gradient[2].addColorStop(0, '#ee3231');
					gradient[2].addColorStop(1, 'transparent');

					bctx.beginPath();
					bctx.fillStyle = gradient[2];
					bctx.fillRect(0, 0, wWidth, wHeight);
				};

				var animate = function () {
					var sin = M.sin(degree),
						cos = M.cos(degree);

					if (config.circle.amount > 0 && config.circle.layer > 0) {
						fctx1.clearRect(0, 0, wWidth, wHeight);
						for (var i = 0, len = circles.length; i < len; i++) {
							var item = circles[i],
								x = item.x,
								y = item.y,
								radius = item.radius,
								speed = item.speed;

							if (x > wWidth + radius) {
								x = -radius;
							} else if (x < -radius) {
								x = wWidth + radius
							} else {
								x += sin * speed;
							}

							if (y > wHeight + radius) {
								y = -radius;
							} else if (y < -radius) {
								y = wHeight + radius;
							} else {
								y -= cos * speed;
							}

							item.x = x;
							item.y = y;
							drawCircle(x, y, radius, item.color, item.alpha);
						}
					}

					if (config.line.amount > 0 && config.line.layer > 0) {
						fctx2.clearRect(0, 0, wWidth, wHeight);
						for (var j = 0, len = lines.length; j < len; j++) {
							var item = lines[j],
								x = item.x,
								y = item.y,
								width = item.width,
								speed = item.speed;

							if (x > wWidth + width * sin) {
								x = -width * sin;
							} else if (x < -width * sin) {
								x = wWidth + width * sin;
							} else {
								x += sin * speed;
							}

							if (y > wHeight + width * cos) {
								y = -width * cos;
							} else if (y < -width * cos) {
								y = wHeight + width * cos;
							} else {
								y -= cos * speed;
							}

							item.x = x;
							item.y = y;
							drawLine(x, y, width, item.color, item.alpha);
						}
					}

					timer = requestAnimationFrame(animate);
				};

				var createItem = function () {
					circles = [];
					lines = [];

					if (config.circle.amount > 0 && config.circle.layer > 0) {
						for (var i = 0; i < config.circle.amount / config.circle.layer; i++) {
							for (var j = 0; j < config.circle.layer; j++) {
								circles.push({
									x: M.random() * wWidth,
									y: M.random() * wHeight,
									radius: M.random() * (20 + j * 5) + (20 + j * 5),
									color: config.circle.color,
									alpha: M.random() * 0.2 + (config.circle.alpha - j * 0.1),
									speed: config.speed * (1 + j * 0.5)
								});
							}
						}
					}

					if (config.line.amount > 0 && config.line.layer > 0) {
						for (var m = 0; m < config.line.amount / config.line.layer; m++) {
							for (var n = 0; n < config.line.layer; n++) {
								lines.push({
									x: M.random() * wWidth,
									y: M.random() * wHeight,
									width: M.random() * (20 + n * 5) + (20 + n * 5),
									color: config.line.color,
									alpha: M.random() * 0.2 + (config.line.alpha - n * 0.1),
									speed: config.speed * (1 + n * 0.5)
								});
							}
						}
					}

					cancelAnimationFrame(timer);
					timer = requestAnimationFrame(animate);
					drawBack();
				};

				setCanvasHeight();
				createItem();
				window.onresize = function () {
					setCanvasHeight();
					createItem();
				}
			}
		})();
	},
	destroyed() {
		//document.body.classList.remove('login');
		window.onresize = null
	}
}
</script>

<style scoped>
#login * {
  box-sizing: border-box;
}

#login {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
  padding: 10px;
}

.logo {
  text-align: center;
  margin-bottom: 20px;
}

.login-box {
  width: 440px;
  padding: 40px;
  background: #fff;
  border-radius: 5px;
}

.login-box p {
  text-align: center;
}

.login-box a {
  color: #ee3231;
}

.login-box .em {
  height: 20px;
}

.submit {
  width: 100%;
}

#bg {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: -1;
}

#bg canvas {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
}

.el-button {
  background-color: #ee3231;
  border-color: #ee3231;
}
</style>