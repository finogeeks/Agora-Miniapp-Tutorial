(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
  typeof define === 'function' && define.amd ? define(factory) :
  (global = typeof globalThis !== 'undefined' ? globalThis : global || self, global.umd = factory());
})(this, (function () { 'use strict';

  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }

  function _defineProperties(target, props) {
    for (var i = 0; i < props.length; i++) {
      var descriptor = props[i];
      descriptor.enumerable = descriptor.enumerable || false;
      descriptor.configurable = true;
      if ("value" in descriptor) descriptor.writable = true;
      Object.defineProperty(target, descriptor.key, descriptor);
    }
  }

  function _createClass(Constructor, protoProps, staticProps) {
    if (protoProps) _defineProperties(Constructor.prototype, protoProps);
    if (staticProps) _defineProperties(Constructor, staticProps);
    Object.defineProperty(Constructor, "prototype", {
      writable: false
    });
    return Constructor;
  }

  function sendToSdk(api, params, context) {
    var success = params.success;
    var fail = params.fail;
    delete params.success;
    delete params.fail;
    context.debug && console.log('Client Bridge Api:', api, params);
    ft && ft.invoke(api, params, function (res) {
      var _res$errMsg = res.errMsg,
          errMsg = _res$errMsg === void 0 ? ':fail' : _res$errMsg;

      if (res.errMsg) {
        res.errMsg = res.errMsg.replace('agoraSDK', "agoraSDK ".concat(params.method || ''));
      }

      context.debug && console.log('Invoke Callback:', api, res);
      var isOk = errMsg.indexOf(':ok') !== -1;
      var isFail = errMsg.indexOf(':fail') !== -1;

      if (isOk) {
        typeof success === 'function' && success(res.data || {});
      } else if (isFail) {
        typeof fail === 'function' && fail(res.data || {});
      }
    });
  }

  function onMethod(context) {
    ft && ft.on('onAgoraSDKEvent', function (payload) {
      context.debug && console.log('onAgoraSDKEvent', payload);
      var type = payload.type,
          data = payload.data;
      context.invokeCallback(type, data);
    });
  }

  var Client = /*#__PURE__*/function () {
    function Client(options) {
      _classCallCheck(this, Client);

      var _ref = options || {},
          _ref$debug = _ref.debug,
          debug = _ref$debug === void 0 ? false : _ref$debug;

      this.listeners = {};
      this.delayTasks = [];
      this.debug = debug;
      onMethod(this);
    }

    _createClass(Client, [{
      key: "init",
      value: function init(appId, onSuccess, onFailure) {
        this.appId = appId;
        sendToSdk('agoraSDK', {
          method: 'init',
          params: {
            appId: appId
          },
          success: onSuccess,
          fail: onFailure
        }, this);
      }
    }, {
      key: "setRole",
      value: function setRole(role, onSuccess, onFailure) {
        sendToSdk('agoraSDK', {
          method: 'setRole',
          params: {
            role: role
          },
          success: onSuccess,
          fail: onFailure
        }, this);
      }
    }, {
      key: "join",
      value: function join(channelKey, channel, uid, onSuccess, onFailure) {
        sendToSdk('agoraSDK', {
          method: 'join',
          params: {
            channelKey: channelKey,
            channel: channel,
            uid: uid
          },
          success: onSuccess,
          fail: onFailure
        }, this);
      }
    }, {
      key: "publish",
      value: function publish(onSuccess, onFailure) {
        sendToSdk('agoraSDK', {
          method: 'publish',
          params: {},
          success: onSuccess,
          fail: onFailure
        }, this);
      }
    }, {
      key: "destroy",
      value: function destroy(onSuccess, onFailure) {
        sendToSdk('agoraSDK', {
          method: 'destroy',
          params: {},
          success: onSuccess,
          fail: onFailure
        }, this);
      }
    }, {
      key: "muteLocal",
      value: function muteLocal(target, onSuccess, onFailure) {
        sendToSdk('agoraSDK', {
          method: 'muteLocal',
          params: {
            target: target
          },
          success: onSuccess,
          fail: onFailure
        }, this);
      }
    }, {
      key: "unmuteLocal",
      value: function unmuteLocal(target, onSuccess, onFailure) {
        sendToSdk('agoraSDK', {
          method: 'unmuteLocal',
          params: {
            target: target
          },
          success: onSuccess,
          fail: onFailure
        }, this);
      }
    }, {
      key: "mute",
      value: function mute(uid, target, onSuccess, onFailure) {
        sendToSdk('agoraSDK', {
          method: 'mute',
          params: {
            uid: uid,
            target: target
          },
          success: onSuccess,
          fail: onFailure
        }, this);
      }
    }, {
      key: "unmute",
      value: function unmute(uid, target, onSuccess, onFailure) {
        sendToSdk('agoraSDK', {
          method: 'unmute',
          params: {
            uid: uid,
            target: target
          },
          success: onSuccess,
          fail: onFailure
        }, this);
      }
    }, {
      key: "renewToken",
      value: function renewToken(token, onSuccess, onFailure) {
        sendToSdk('agoraSDK', {
          method: 'renewToken',
          params: {
            token: token
          },
          success: onSuccess,
          fail: onFailure
        }, this);
      }
    }, {
      key: "setRemoteVideoStreamType",
      value: function setRemoteVideoStreamType(uid, type, onSuccess, onFailure) {
        sendToSdk('agoraSDK', {
          method: 'setRemoteVideoStreamType',
          params: {
            uid: uid,
            type: type
          },
          success: onSuccess,
          fail: onFailure
        }, this);
      }
    }, {
      key: "startChannelMediaRelay",
      value: function startChannelMediaRelay(config, onSuccess, onFailure) {
        sendToSdk('agoraSDK', {
          method: 'startChannelMediaRelay',
          params: {
            config: config
          },
          success: onSuccess,
          fail: onFailure
        }, this);
      }
    }, {
      key: "updateChannelMediaRelay",
      value: function updateChannelMediaRelay(config, onSuccess, onFailure) {
        sendToSdk('agoraSDK', {
          method: 'updateChannelMediaRelay',
          params: {
            config: config
          },
          success: onSuccess,
          fail: onFailure
        }, this);
      }
    }, {
      key: "stopChannelMediaRelay",
      value: function stopChannelMediaRelay(onSuccess, onFailure) {
        sendToSdk('agoraSDK', {
          method: 'stopChannelMediaRelay',
          params: {},
          success: onSuccess,
          fail: onFailure
        }, this);
      }
    }, {
      key: "on",
      value: function on(eventName, callback) {
        if (typeof eventName === 'string' && typeof callback === 'function') {
          this.listeners[eventName] = callback;
        }

        this.runDelayTasks();
      }
    }, {
      key: "subscribe",
      value: function subscribe(uid, onSuccess, onFailure) {
        this.listeners[uid] = function (data) {
          var url = data.url,
              rotation = data.rotation;
          typeof onSuccess === 'function' && onSuccess(url, rotation);
        };

        this.runDelayTasks();
      }
    }, {
      key: "unsubscribe",
      value: function unsubscribe(uid, onSuccess) {
        delete this.listeners[uid];
        typeof onSuccess === 'function' && onSuccess();
      }
    }, {
      key: "runDelayTasks",
      value: function runDelayTasks() {
        var _this = this;

        this.delayTasks = this.delayTasks.filter(function (task) {
          var eventName = task.eventName,
              payload = task.payload;
          var callback = _this.listeners[eventName];

          if (typeof callback === 'function') {
            try {
              callback(payload);
            } catch (e) {
              console.error(e);
            }

            return false;
          } else {
            return true;
          }
        });
      }
    }, {
      key: "invokeCallback",
      value: function invokeCallback(eventName, payload) {
        var callback = this.listeners[eventName];

        if (typeof callback === 'function') {
          callback(payload);
        } else if (!callback) {
          this.delayTasks.push({
            eventName: eventName,
            payload: payload
          });
        }
      }
    }]);

    return Client;
  }();

  var index = {
    Client: Client,
    // mock Log
    LOG: {
      setLogLevel: function setLogLevel() {}
    }
  };

  return index;

}));
//# sourceMappingURL=finclip-agora-client-sdk.js.map
