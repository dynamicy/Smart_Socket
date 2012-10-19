#ifndef __MMW_H__
#define __MMW_H__

#include <common.h>

class MMWindow
{
private:
	// one dialog manager for each window loaded from xml
        MMSDialogManager welcome_dm;
	MMSDialogManager menu_dm;
	MMSDialogManager weather_dm;
	MMSDialogManager media_dm;
	MMSDialogManager device_dm;
	MMSDialogManager news_dm;

	// load the windows
	MMSWindow *welcome_window;
	MMSWindow *menu_window;
	MMSWindow *weather_window;
	MMSWindow *media_window;
	MMSWindow *device_window;
	MMSWindow *news_window;
public:
        MMWindow();
        ~MMWindow();

        void start();
};

#endif /* __MMW_H__ */
