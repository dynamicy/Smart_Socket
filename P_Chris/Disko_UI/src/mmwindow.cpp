#include <mmw.h>
#include <common.h>

MMWindow::MMWindow() 
{
	try 
	{
		//
		backend_window = new MMSRootWindow("", "100%", "100%", MMSALIGNMENT_CENTER, MMSW_VIDEO)	;
		backend_video = NULL;
	
		// load the windows
		welcome_window = welcome_dm.loadDialog("web/welcome.xml");
		menu_window = menu_dm.loadDialog("web/menu.xml");
		weather_window = weather_dm.loadDialog("web/weather.xml");
		media_window = media_dm.loadDialog("web/media.xml");
		news_window = news_dm.loadDialog("web/news.xml");
		device_window = device_dm.loadDialog("web/device.xml");
//		osgi_window = osgi_dm.loadDialog("web/osgi_status.xml");
	} 
	catch(MMSError *e) 
	{
		cout << e->getMessage() << endl;
	}
}

MMWindow::~MMWindow() 
{
}

void MMWindow::start() 
{
	if(this->backend_window)
	{
		this->backend_window->show();
		this->backend_video = new MMSVideo(this->backend_window);
	}
	// start show sequence of the main/root windows
//	this->welcome_window->show();
//	sleep(1);
//	this->menu_window->show();
//	sleep(1);
/*
	this->media_window->show();
	sleep(1);
	this->news_window->show();
	sleep(1);
	this->weather_window->show();
	sleep(1);
	this->device_window->show();
*/
}

void MMWindow::media_control(char *control) 
{

	if(this->backend_video)
	{
		if(strcmp(control, "play") == 0)
		{
			cout<<"play"<<endl;
			this->backend_video->startPlaying("http://www.cs.ccu.edu.tw/~u93410102/demo.mp4");
		}
		else if(strcmp(control, "pause") == 0)
		{
			cout<<"pause"<<endl;
			this->backend_video->pause();
		}
		else if(strcmp(control, "stop") == 0)
		{
			cout<<"stop"<<endl;
			this->backend_video->stop();
		}
		else if(strcmp(control, "slow") == 0)
		{
			cout<<"slow"<<endl;
			this->backend_video->slow();
		}
		else if(strcmp(control, "fast") == 0)
		{
			cout<<"fast"<<endl;
			this->backend_video->ffwd();
		}
		else
		{
			cout<<"unknown command"<<endl;
		}
	}
}
