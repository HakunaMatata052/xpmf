<template>
	<router-view></router-view>
</template>
<script>
export default {
  components: {},
  data() {
    return {};
  },
  mounted: function() {},
  beforeCreate() {
    var that = this;
    if (that.$store.state.userinfo.username == null) {
      that.get_json(that.$store.state.api + "/user/mine", function(data) {
        that.$store.state.userinfo = data;
        console.log(that.$store.state.userinfo);
      });
    }
    if (that.$store.state.siteinfo.seoTitle == null) {
      that.get_json(that.$store.state.api + "/SiteSetting", function(data) {
        that.$store.state.siteinfo = data;
        console.log(that.$store.state.siteinfo);
      });
    }
  }
};
</script>
<style>
::-webkit-scrollbar {
  width: 8px;
  height: 8px;
  background-color: #f5f5f5;
}

::-webkit-scrollbar-track {
  border-radius: 10px;
  background-color: #e2e2e2;
}

::-webkit-scrollbar-thumb {
  border-radius: 10px;
  -webkit-box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.3);
  background-color: #555;
}

* {
  box-sizing: border-box;
  padding: 0;
  margin: 0;
  font-family: "Microsoft YaHei", arial, helvetica, clean, sans-serif;
}

html {
  height: 100%;
}

body {
  font: 14px/1.231 "Microsoft YaHei", arial, helvetica, clean, sans-serif;
  color: #333;
  margin: 0;
  line-height: 1.5;
  height: 100%;
  background: #fff9f1;
}

:focus {
  outline: 1;
}

article,
aside,
canvas,
details,
figcaption,
figure,
footer,
header,
hgroup,
menu,
nav,
section,
summary {
  display: block;
}

a {
  color: #333;
  text-decoration: none;
  -webkit-transition: all 0.3s ease-out;
  transition: all 0.3s ease-out;
}

a:link,
a:hover,
a:active,
a:visited {
  text-decoration: none;
}

ins {
  background-color: #ff9;
  color: #000;
  text-decoration: none;
}

mark {
  background-color: #ff9;
  color: #000;
  font-style: italic;
  font-weight: bold;
}

del {
  text-decoration: line-through;
}

table {
  border-collapse: collapse;
  border-spacing: 0;
}

hr {
  display: block;
  height: 1px;
  border: 0;
  border-top: 1px solid #cccccc;
  margin: 1em 0;
  padding: 0;
}

input,
select {
  vertical-align: middle;
}

li,
ul {
  list-style-type: none;
}

img {
  border: none;
}

input,
textarea {
  outline: 0;
  border: 0;
}

textarea {
  resize: none;
}

h1,
h2,
h3,
h4,
h5,
h6,
dl,
dd,
dt,
i,
em {
  font-weight: normal;
  font-style: normal;
}

.clearfix {
  clear: both;
}

.el-card {
  border: 0;
  -webkit-box-shadow: 0 1px 2px rgba(0, 0, 0, 0.05);
  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.05);
}

.el-card__header span {
  font-size: 16px;
}
</style>