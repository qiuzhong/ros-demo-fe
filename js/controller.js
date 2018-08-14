'use strict';

function WebRosController(ros) {
  this.ros = ros;

  this.currentVelocity = {
    linear: {x: 0.0, y: 0.0, z: 0.0},
    angular: {x: 0.0, y: 0.0, z: 0.0}
  };
  this.zeroVelocity = {
    linear: {x: 0.0, y: 0.0, z: 0.0},
    angular: {x: 0.0, y: 0.0, z: 0.0}
  };
  this.defaultVelocity = {
    linear: {x: 0.15, y: 0.0, z: 0.0},
    angular: {x: 0.0, y: 0.0, z: 0.0}
  };

  this.pubVelTopicTimer = null;
  this.pubVelTopicInterval = 100;
  this.isRobotMoving = false;
  this.velocityTopic = new ROSLIB.Topic({
    ros: this.ros,
    name: '/cmd_vel',
    messageType: 'geometry_msgs/Twist'
  });

  this.log = '';
}

WebRosController.prototype.sendVelTopic = function(vel) {
  console.log('send velocity topic');

  if (this.pubVelTopicTimer) {
    clearInterval(this.pubVelTopicTimer);
    this.pubVelTopicTimer = null;
  }

  this.pubVelTopicTimer = setInterval(() => {
    this.velocityTopic.publish(vel);
  }, this.pubVelTopicInterval);
};

WebRosController.prototype.shutdownTimer = function() {
  if (this.pubVelTopicTimer) {
    clearInterval(this.pubVelTopicTimer);
    this.pubVelTopicTimer = null;
  }
};

WebRosController.prototype.moveForward = function() {
  console.log('web ros controller: move forward');
  console.log(this.currentVelocity);
  console.log(this.defaultVelocity);

  if (this.currentVelocity.linear.x > 0) {
    this.sendVelTopic(this.currentVelocity);
    this.log = 'Publish sensor_msgs/Twist: ' + JSON.stringify(this.currentVelocity);
  } else {
    this.sendVelTopic(this.defaultVelocity);
    this.log = 'Publish sensor_msgs/Twist: ' + JSON.stringify(this.defaultVelocity);
  }
  this.isRobotMoving = true;
};

WebRosController.prototype.turnLeft = function() {
  console.log('web ros controller: turn left');

  let turnLeftMsg = {
    linear: {x: 0.0, y: 0.0, z: 0.0},
    angular: {x: 0.0, y: 0.0, z: Math.PI / 2}
  };

  this.shutdownTimer();
  this.log = 'Publishing sensor_msgs/Twist: ' + JSON.stringify(turnLeftMsg);
  this.pubVelTopicTimer = setInterval(() => {
    this.velocityTopic.publish(turnLeftMsg);
  }, this.pubVelTopicInterval);
  setTimeout(() => {
    clearInterval(this.pubVelTopicTimer);
    this.stop();
  }, 1200);
};

WebRosController.prototype.turnRight = function() {
  console.log('web ros controller: turn left');

  let turnRightMsg = {
    linear: {x: 0.0, y: 0.0, z: 0.0},
    angular: {x: 0.0, y: 0.0, z: -Math.PI / 2}
  };
  this.shutdownTimer();
  this.log = 'Publishing sensor_msgs/Twist: ' + JSON.stringify(turnRightMsg);
  this.pubVelTopicTimer = setInterval(() => {
    this.velocityTopic.publish(turnRightMsg);
  }, this.pubVelTopicInterval);

  setTimeout(() => {
    clearInterval(this.pubVelTopicTimer);
    this.stop();
  }, 1200);
};

WebRosController.prototype.moveBack = function() {
  console.log('web ros controller: move back');

  console.log(this.currentVelocity);
  console.log(this.defaultVelocity);
  if (this.currentVelocity.linear.x) {
    if (this.currentVelocity.linear.x > 0) {
      this.currentVelocity.linear.x = -this.currentVelocity.linear.x;
    }
    this.sendVelTopic(this.currentVelocity);
    this.log = 'Publish sensor_msgs/Twist: ' + JSON.stringify(this.currentVelocity);
  } else {
    let backVel = {
      linear: {x: 0.0, y: 0.0, z: 0.0},
      angular: {x: 0.0, y: 0.0, z: 0.0}
    };
    backVel.linear.x = -this.defaultVelocity.linear.x;

    this.sendVelTopic(backVel);
    this.log = 'Publish sensor_msgs/Twist: ' + JSON.stringify(backVel);
  }
  this.isRobotMoving = true;
};

WebRosController.prototype.start = function() {
  console.log('web ros controller: start');

  if (this.currentVelocity.linear.x) {
    this.sendVelTopic(this.currentVelocity);
    this.log = 'Publish sensor_msgs/Twist: ' + JSON.stringify(this.currentVelocity);
  } else {
    this.currentVelocity.linear.x = -this.defaultVelocity.linear.x;
    this.sendVelTopic(this.defaultVelocity);
    this.log = 'Publish sensor_msgs/Twist: ' + JSON.stringify(this.defaultVelocity);
  }

  this.isRobotMoving = true;
};

WebRosController.prototype.stop = function() {
  console.log('web ros controller: stop');

  this.sendVelTopic(this.zeroVelocity);
  this.isRobotMoving = false;
};
