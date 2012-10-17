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
	if(!mmsInit(MMSINIT_WINDOWS, argc, argv, "web/diskorc.xml", "Server UI", "Server UI"))
	{
		printf("[Error] Please check your diskorc.xml\n");
		return -1;
	}

	try 
	{
		// backend_window: for playing video in the backend

		// one dialog manager for each window loaded from xml
		MMSDialogManager welcome_dm;
		MMSDialogManager menu_dm;

		// load the windows, rootwindow is used for playing video
		MMSRootWindow *backend_window = new MMSRootWindow("","100%","100%", MMSALIGNMENT_CENTER, MMSW_VIDEO);
		MMSVideo *backend_video = NULL;
		
		MMSWindow *welcome_window  = welcome_dm.loadDialog("web/welcome.xml");
		MMSWindow *menu_window  = menu_dm.loadDialog("web/menu.xml");

		welcome_window->show();
		sleep(1);
		welcome_window->hide();
		sleep(1);
		
		menu_window->show();
		sleep(1);
		menu_window->hide();
		sleep(2);

		if(backend_window) 
		{
			backend_window->show();
			// construct video class
			backend_video = new MMSVideo(backend_window);
		}

		if(backend_video) 
		{ 	
			// play a video, demo.mp4
			backend_video->startPlaying("http://www.cs.ccu.edu.tw/~u93410102/demo.mp4");
		}

		while(1)
		{
//			menu_window->show();
		}
		return 0;
	}

	catch(MMSError *error) 
	{
		fprintf(stderr, "Abort due to: %s\n", error->getMessage().c_str());
		return 1;
	}
}

