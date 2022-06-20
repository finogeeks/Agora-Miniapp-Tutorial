const APPID = "1fa54c6d47074eea98833162a292497a";
const TOKEN = "";

if(APPID === ""){
  wx.showToast({
    title: `请在config.js中提供正确的appid`,
    icon: 'none',
    duration: 5000
  });
}

module.exports = {
  APPID: APPID,
  TOKEN: TOKEN
}
