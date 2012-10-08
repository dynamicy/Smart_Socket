/*
 * mycentral.cpp
 *
 *  Created on: Jan 6, 2010
 *      Author: sxs
 */

#include "mycentral.h"

MMS_EXPORT_CENTRAL_PLUGIN(MyCentral);

bool MyCentral::initialize(MMSPluginData data, IMMSSwitcher *switcher) {
	this->switcher = switcher;
	this->data = data;

	win = this->dm.loadDialog("root.xml",NULL);

	//search for the menu and connect the Return callback
	//this works for clicks too
	MMSWidget *wid = win->searchForWidget("mymenu");
	wid->onReturn->connect(sigc::mem_fun(this,&MyCentral::onMenuReturn));
	this->win->show();
	return true;
}

bool MyCentral::onEvent(IMMSEvent event) {
	return true;
}
bool MyCentral::shutdown() {
	return true;
}

bool MyCentral::showPreview(void *data) {
	return false;
}

bool MyCentral::show(void *data) {
	this->win->show();
	return true;
}

MyCentral::MyCentral() {

}

MyCentral::~MyCentral() {

}

void MyCentral::onMenuReturn(MMSWidget *wid) {
	MMSEvent *ev = new MMSEvent("PRINTMSG");
	ev->send();
}
