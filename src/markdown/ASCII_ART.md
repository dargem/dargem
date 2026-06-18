<video src="/files/videos/tree.mp4" controls></video>

A procedurally generated ASCII art tree written in Java. 
It was an interesting mini computer graphics project.
Briefly it works by internally having a "world" which consists of segments making up the tree.
Then for each frame I rasterize these segments (if they're in the camera's view) into tiles.
I used Bresenham's line algorithm paired with scan line rasterization to do this.
The angle of the segment additionally determined what tile was produced.