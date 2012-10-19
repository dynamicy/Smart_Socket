#ifndef __MMW_H__
#define __MMW_H__

#include <common.h>

class MMWindow
{
private:
	// one dialog manager for each window loaded from xml
        MMSDialogManager welcome_dm;
	MMSDialogManager menu_dm;

	// load the windows
	MMSWindow *welcome_window;
	MMSWindow *menu_window;
public:
        MMWindow();
        ~MMWindow();

        void start();
};

#endif /* __MMW_H__ */
