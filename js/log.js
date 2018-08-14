function Logger(logDivId, controller) {
  this.logDivId = logDivId;
  this.lineNum = 40;
  this.title = '';
  this.rosController = controller;

  this.log = '';
  this.opCount = 0;
};

Logger.prototype.debugArray = function(divId, msgs) {
  var nextText = '';
  for (let i = 0; i < msgs.length; i++) {
    nextText += '[' + this.moduleName + ']' + msgs[i] + '<br />';
  }

  document.getElementById(divId).innerHTML = nextText;
}

Logger.prototype.mergeMsgs = function(nodeName, msgs) {
  let log = '';

  for (let i = 0; i < msgs.length; i++) {
    log += '[' + nodeName + '] ' + msgs[i] + '<br />';
  }

  return log;
}

Logger.prototype.setLog = function() {
  document.getElementById(this.logDivId).innerHTML = this.log;
}

Logger.prototype.showLog = function(btnDirection) {
  this.title = '[roslibjs] ' + this.rosController.log + '<br /><br />';
  this.log = this.title;
  switch (btnDirection) {
    case 'up':
      this.log = this.title;
      // let bridgeLogs = ['JSON command received: {"op":"publish","id":"publish:/cmd_vel:9286","topic":"/cmd_vel", "msg": ' + JSON.stringify(msg) + ',"latch":false}',
      //   'Publish a topic named /cmd_vel with ' + JSON.stringify(msg),
      //   'Response: {"op":"set_level","level":"none"}'
      // ];

      // let logBody = this.mergeMsgs('ros2-web-bridge:Bridge', bridgeLogs);
      // let logFeet = '[rclnodejs] Publishing sensor_msgs/Twist :' + JSON.stringify(msg) + ' to /cmd_vel';
      // this.log += logBody;
      msg = {"linear":{"x":0.15,"y":0,"z":0},"angular":{"x":0,"y":0,"z":0}};
      this.log += ('[ros2-web-bridge:Bridge] JSON command received: ' + 
                  '{"op":"publish","id":"publish:/cmd_vel","topic":"/cmd_vel", "msg": ' +
                  JSON.stringify(msg) + ',"latch":false}' + '<br /><br />');
      this.log += ('[ros2-web-bridge:Bridge] Publish a topic named /cmd_vel with ' +
                  JSON.stringify(msg) + '<br /><br />');
      this.log += ('[rclnodejs] Publishing sensor_msgs/Twist :' + 
                  JSON.stringify(msg) + ' to topic /cmd_vel' + '<br /><br />');
      this.log += ('[ros2-web-bridge:Bridge] Response: {"op":"set_level","level":"none"}' +
                  '<br /><br />');

      // console.log(this.log);
      this.setLog();
      break;

    case 'down':
      msg = {"linear":{"x": -0.15,"y":0,"z":0},"angular":{"x":0,"y":0,"z":0}};
      this.log += ('[ros2-web-bridge:Bridge] JSON command received: ' + 
                  '{"op":"publish","id":"publish:/cmd_vel","topic":"/cmd_vel", "msg": ' +
                  JSON.stringify(msg) + ',"latch":false}' + '<br /><br />');
      this.log += ('[ros2-web-bridge:Bridge] Publish a topic named /cmd_vel with ' +
                  JSON.stringify(msg) + '<br /><br />');
      this.log += ('[rclnodejs] Publishing sensor_msgs/Twist :' + 
                  JSON.stringify(msg) + ' to topic /cmd_vel' + '<br /><br />');
      this.log += ('[ros2-web-bridge:Bridge] Response: {"op":"set_level","level":"none"}' +
                  '<br /><br />');
      this.setLog();
      break;

    case 'left':
    msg = {"linear":{"x": 0,"y":0,"z":0},"angular":{"x":0,"y":0,"z": Math.PI / 4}};
    this.log += ('[ros2-web-bridge:Bridge] JSON command received: ' + 
                '{"op":"publish","id":"publish:/cmd_vel","topic":"/cmd_vel", "msg": ' +
                JSON.stringify(msg) + ',"latch":false}' + '<br /><br />');
    this.log += ('[ros2-web-bridge:Bridge] Publish a topic named /cmd_vel with ' +
                JSON.stringify(msg) + '<br /><br />');
    this.log += ('[rclnodejs] Publishing sensor_msgs/Twist :' + 
                JSON.stringify(msg) + ' to topic /cmd_vel' + '<br /><br />');
    this.log += ('[ros2-web-bridge:Bridge] Response: {"op":"set_level","level":"none"}' +
                '<br /><br />');
    this.setLog();
      break;

    case 'right':
    msg = {"linear":{"x": 0,"y":0,"z":0},"angular":{"x":0,"y":0,"z": -Math.PI / 4}};
    this.log += ('[ros2-web-bridge:Bridge] JSON command received: ' + 
                '{"op":"publish","id":"publish:/cmd_vel","topic":"/cmd_vel", "msg": ' +
                JSON.stringify(msg) + ',"latch":false}' + '<br /><br />');
    this.log += ('[ros2-web-bridge:Bridge] Publish a topic named /cmd_vel with ' +
                JSON.stringify(msg) + '<br /><br />');
    this.log += ('[rclnodejs] Publishing sensor_msgs/Twist :' + 
                JSON.stringify(msg) + ' to topic /cmd_vel' + '<br /><br />');
    this.log += ('[ros2-web-bridge:Bridge] Response: {"op":"set_level","level":"none"}' +
                '<br /><br />');
    this.setLog();
      break;

    default:
      return;
  }
}
