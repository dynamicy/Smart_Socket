#include <mms.h>

bool getDefaultWidgets(MMSWindow *window, MMSLabelWidget **info1_label, 
		MMSLabelWidget **info2_label, MMSLabelWidget **fps_cnt_label) 
{
	if (!(*info1_label = dynamic_cast<MMSLabelWidget*>(window->searchForWidget("info1")))) 
		return false;

	if (!(*info2_label = dynamic_cast<MMSLabelWidget*>(window->searchForWidget("info2")))) 
		return false;

	if (!(*fps_cnt_label = dynamic_cast<MMSLabelWidget*>(window->searchForWidget("fps_cnt")))) 
		return false;

	return true;
}

int getFPS(void) 
{
	static int fps_cnt = 0;
	static time_t fps_time_old = 0;

	// get time
	time_t fps_time;
	time(&fps_time);

	// second changed?
	if (fps_time!=fps_time_old) 
	{
		// yes
		int ret_fps_cnt = fps_cnt;
		fps_cnt = 0;
		fps_time_old = fps_time;
		return ret_fps_cnt;
	}

	// inc counter
	fps_cnt++;

	return -1;
}

void show_fps_and_cnt(MMSLabelWidget *fps_cnt_label, int *cnt) 
{
	// get frame rate
	int fps = getFPS();

	if (fps >= 0) 
	{
		// show frame rate and increase external counter
		fps_cnt_label->setText(iToStr(fps) + " fps");
		(*cnt)++;
	}
}

void show_mpps_and_cnt(MMSLabelWidget *mpps_cnt_label, int *cnt, int factor) 
{
	// get frame rate
	int fps = getFPS();

	if (fps >= 0) 
	{
		// show frame rate and increase external counter
		mpps_cnt_label->setText(iToStr((fps*factor)/1000000) + " mpps");
		(*cnt)++;
	}
}

void show_pixelformats(MMSWindow *window, MMSLabelWidget *info_label) 
{
	MMSFBSurfacePixelFormat pf1, pf2;

	// get the pixelformat of the window
	window->getSurface()->getPixelFormat(&pf1);

	// get the pixelformat of the layer on which the window will be displayed (mainly the graphics layer)
	window->getLayer()->getPixelFormat(&pf2);

	// show the source and destination pixelformat
	info_label->setText("WindowPF=" + getMMSFBPixelFormatString(pf1) + ", LayerPF=" + getMMSFBPixelFormatString(pf2));
}

