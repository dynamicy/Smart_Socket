#include <mmw.h>
#include <common.h>

MMWindow::MMWindow() 
{
	try 
	{
		// load the windows
		welcome_window = welcome_dm.loadDialog("web/welcome.xml");
		menu_window = menu_dm.loadDialog("web/menu.xml");
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
	// start show sequence of the main/root windows
	this->welcome_window->show();
}

