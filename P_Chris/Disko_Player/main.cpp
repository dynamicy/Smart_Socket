#include <mms.h>

int main(int argc, char *argv[]) 
{

	// initialize disko
	if(!mmsInit(MMSINIT_WINDOWS, argc, argv, "./diskorc.xml",
			"Disko Tutorial: firststeps/01", "DT: firststeps/01")) 
	{
		printf("\tCheck your diskorc.xml\n");
		return -1;
	}

	// create a root window
	MMSRootWindow *window = new MMSRootWindow("","100%","100%", MMSALIGNMENT_CENTER, MMSW_VIDEO);
	MMSVideo *video = NULL;

	if (window) 
	{
		    // show it
		    window->show();
		    // construct video class
		    video = new MMSVideo(window);
	}
		            
	if (video) 
	{
		    // play a video, demo.mp4
		    video->startPlaying("url");
	}


	// until user press <ctrl+c> or <power> button on the remote control
	while (1) sleep(1);
	return 0;
}
