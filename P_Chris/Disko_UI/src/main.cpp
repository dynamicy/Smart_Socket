/***************************************************************************
 *   Copyright (C) 2005-2007 Stefan Schwarzer, Jens Schneider,             *
 *                           Matthias Hardt, Guido Madaus                  *
 *                                                                         *
 *   Copyright (C) 2007-2008 Berlinux Solutions GbR                        *
 *                           Stefan Schwarzer & Guido Madaus               *
 *                                                                         *
 *   Authors:                                                              *
 *      Stefan Schwarzer <SSchwarzer@berlinux-solutions.de>,               *
 *      Matthias Hardt   <MHardt@berlinux-solutions.de>,                   *
 *      Jens Schneider   <pupeider@gmx.de>                                 *
 *      Guido Madaus     <GMadaus@berlinux-solutions.de>                   *
 *                                                                         *
 *   This program is free software; you can redistribute it and/or modify  *
 *   it under the terms of the GNU General Public License as published by  *
 *   the Free Software Foundation; either version 2 of the License.        *
 *                                                                         *
 *   This program is distributed in the hope that it will be useful,       *
 *   but WITHOUT ANY WARRANTY; without even the implied warranty of        *
 *   MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the         *
 *   GNU General Public License for more details.                          *
 *                                                                         *
 *   You should have received a copy of the GNU General Public License     *
 *   along with this program; if not, write to the                         *
 *   Free Software Foundation, Inc.,                                       *
 *   59 Temple Place - Suite 330, Boston, MA  02111-1307, USA.             *
 ***************************************************************************/

#include <mms.h>

int main(int argc, char *argv[]) 
{
	// initialize disko
	mmsInit(MMSINIT_WINDOWS, argc, argv, "web/diskorc.xml", "Server UI", "Server UI");

	try 
	{
		// one dialog manager for each window loaded from xml
		MMSDialogManager dm;
		MMSDialogManager dm2;

		// load the windows
		MMSWindow *window  = dm.loadDialog("web/main.xml");
		MMSWindow *window2 = dm2.loadDialog("web/main2.xml");

		// start show sequence of the main/root windows
		window->show();
		sleep(2);

		MMSLabel *label = (MMSLabel *)dm["label1"];
		label->setText("Updated");
		sleep(1);
		label->setText("Hello");
		sleep(1);
		label->setText("World");
		sleep(1);

		window2->show();
		sleep(2);

		while(1);

		// now we get access to the child windows of the window4
//		MMSChildWindow *childwin1 = dynamic_cast<MMSChildWindow*>(window4->searchForWindow("childwin1"));
//		MMSChildWindow *childwin2 = dynamic_cast<MMSChildWindow*>(window4->searchForWindow("childwin2"));
//		MMSChildWindow *childwin3 = dynamic_cast<MMSChildWindow*>(window4->searchForWindow("childwin3"));
//		MMSChildWindow *childwin4 = dynamic_cast<MMSChildWindow*>(window4->searchForWindow("childwin4"));

		// until user press <ctrl+c> or <power> button on the remote control
/*		while (1) 
		{
			childwin1->hide();
			sleep(2);
			childwin1->show();
			sleep(2);
			childwin2->hide();
			sleep(2);
			childwin2->show();
			sleep(2);
			childwin3->hide();
			sleep(2);
			childwin3->show();
			sleep(2);
			childwin4->show();
			sleep(2);
			childwin4->hide();
			sleep(2);
		}
*/		
		return 0;
	}
	catch(MMSError *error) 
	{
		fprintf(stderr, "Abort due to: %s\n", error->getMessage().c_str());
		return 1;
	}
}

