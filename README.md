# Monte-Carlo path-tracing
A project on implementation of path-tracing Monte Carlo method with GLSL using EasyCppOGL library. This project consists of 3 phases of implementation:
* Illumination of objects in the scene without transparency or reflections (Path: ./tp/motecarlo.frag)
* Illumination of objects in the scene with reflections (Path: ./tp/motecarlo_mat.frag)
* Illumination of objects in the scene with reflections and transparency (Path: ./tp/motecarlo_mat_tr.frag)

## EasyCppOGL

### Dependencies

* eigen3
* glfw3
* assimp

## Build

The project was built on an Ubuntu system. To build requires running the following commands in the project directory:
```
mkdir build ; cd build
cmake ..
make -j 8
```

To launch the program, go to the MontecarloGPU directory in the build directory and run the command ```./MontecarloGPU```.

## Usage

Testing takes place in already created scenes. To select the scene, press one of the keys Q,W,E,R,T,Y,U,I. The O,P (previous and next) buttons are used to change phases (shader change).

In the menu you can choose: 
* Subsampling: choose the size of the calculated image 
* Number of bounces of the path (passed in uniform to the shader) 
* Number of paths launched in "interactive" mode 
* K_op: opacity factor


If you check lock the interface will freeze and the images will accumulate (and average). If you check freeze, the image is then frozen and the calculations are stopped.

## Images

* Phase 1:
<img width="964" alt="jarray reverse exampl" src="https://github.com/OOps717/Path-tracing-Monte-Carlo/blob/master/Images/Screenshot%20from%202022-01-03%2011-20-08.png">
* Phase 2:
<img width="964" alt="jarray reverse exampl" src="https://github.com/OOps717/Path-tracing-Monte-Carlo/blob/master/Images/Screenshot%20from%202022-01-03%2011-20-36.png">
* Phase 3:
<img width="964" alt="jarray reverse exampl" src="https://github.com/OOps717/Path-tracing-Monte-Carlo/blob/master/Images/Screenshot%20from%202022-01-03%2011-21-06.png">
