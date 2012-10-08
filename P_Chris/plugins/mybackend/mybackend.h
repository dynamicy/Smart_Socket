/*
 * mybackend.h
 *
 *  Created on: Jan 6, 2010
 *      Author: sxs
 */

#ifndef MYBACKEND_H_
#define MYBACKEND_H_

#include <disko.h>

class MyBackend : public IMMSBackendPlugin {
	public:
		bool initialize(MMSPluginData data, IMMSSwitcher *switcher);
		bool onEvent(IMMSEvent event);
		bool shutdown();

		MyBackend();
		~MyBackend();

	private:
		IMMSSwitcher *switcher;
		MMSPluginData data;
		MMSEventSignup *signup;

};

#endif /* MYBACKEND_H_ */
