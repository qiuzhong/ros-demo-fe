# Introduction
Setup environments for ROSCon 2018 demo

## Installation
### Setup the `ros2-web-bridge`
* Install and launch `ros2-web-bridge` server in a new terminal:
  ```
  $ source <path/to/ros2-linux/local_setup.bash>
  $ git clone https://github.com/RobotWebTools/ros2-web-bridge.git
  $ cd ros2-web-bridge
  $ npm install
  $ cd ros2-web-bridge
  $ node bin/rosbridge.js
  ```

### Optional: only for simulator
* Install **turtlebot3** package from source, it doesn't work if you install it by the `apt` way.
```
$ sudo apt install ros-kinetic-turtlebot3-msgs
$ source /opt/ros/kinetic/setup.bash
$ cd ~/catkin_ws/src
$ git clone https://github.com/ROBOTIS-GIT/turtlebot3.git
$ cd ~/catkin_ws
$ catkin_make
```

### Configuration
Set TURTLEBOT3_MODEL environment variable
```
$ echo "export TURTLEBOT3_MODEL=burger" >> ~/.bashrc
```

## Run and control turtlebot3 gazebo simulator
### Launch the gazebo simulator
In terminal 1:
```
$ cd ~/catkin_ws
$ source devel/setup.bash
$ roslaunch turtlebot3_gazebo turtlebot3_empty_world.launch
```

### Launch `ros1_bridge`:
  ```
  $ export ROS_MASTER_URI=http://localhost:11311
  $ ros2 run ros1_bridge dynamic_bridge --bridge-all-topics
  ```

### Play the demo
* Host demo html:
  ```
  $ cd ros-demo-fe
  $ http-server .
  ```

* Access `http://127.0.0.1:8080/`, you can start/stop the TB3 robot and control it by click different direction buttons.
