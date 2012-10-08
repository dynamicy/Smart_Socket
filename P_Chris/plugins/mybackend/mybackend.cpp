/*
 * mybacked.cpp
 *
 *  Created on: Jan 6, 2010
 *      Author: sxs
 */

#include "mybackend.h"
#include <cstdio>

MMS_EXPORT_BACKEND_PLUGIN(MyBackend);

bool MyBackend::initialize(MMSPluginData data, IMMSSwitcher *switcher) {
	this->switcher = switcher;
	this->data = data;

	this->signup = new MMSEventSignup(data);
	signup->add("PRINTMSG");

	signup->executeSignup();

	return true;
}

bool MyBackend::onEvent(IMMSEvent event) {
	printf("got event: %s\n", event->getHeading().c_str());
	return true;
}

bool MyBackend::shutdown() {
	return true;
}

MyBackend::MyBackend() {

}

MyBackend::~MyBackend() {

}
