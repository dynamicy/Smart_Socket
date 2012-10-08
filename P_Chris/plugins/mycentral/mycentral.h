/*
 * plugina.h
 *
 *  Created on: Jan 6, 2010
 *      Author: sxs
 */

#ifndef MYCENTRAL_H_
#define MYCENTRAL_H

#include <disko.h>

class MyCentral : public IMMSCentralPlugin {
	public:
		bool initialize(MMSPluginData data, IMMSSwitcher *switcher);
		bool onEvent(IMMSEvent event);
		bool shutdown();
    	bool showPreview(void *data);
    	bool show(void *data);
    	MyCentral();
    	~MyCentral();

	private:
		IMMSSwitcher *switcher;
		MMSPluginData data;
		MMSDialogManager dm;
		MMSWindow *win;
		void onMenuReturn(MMSWidget *wid);

};

#endif /* PLUGINA_H_ */
